import type { ReleasePlayer, ReleaseTrack, ReleaseTrackAudio } from '~/types/release'

const MAX_EMBED_DOCUMENT_LENGTH = 1_000_000
const MAX_TRACK_DURATION_MS = 86_400_000
const DEFAULT_TIMEOUT_MS = 2_500

interface SpotifyProviderTrack {
  title: string
  audio: ReleaseTrackAudio
}

const asRecord = (value: unknown): Record<string, unknown> | null => {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null
}

const readRecord = (source: Record<string, unknown> | null, key: string): Record<string, unknown> | null => {
  return source ? asRecord(source[key]) : null
}

const readString = (source: Record<string, unknown> | null, key: string): string => {
  const value = source?.[key]
  return typeof value === 'string' ? value.trim() : ''
}

const safePreviewUrl = (value: unknown): string | null => {
  if (typeof value !== 'string') return null

  try {
    const url = new URL(value)
    return url.protocol === 'https:' && url.hostname.toLowerCase() === 'p.scdn.co'
      ? url.toString()
      : null
  } catch {
    return null
  }
}

const safeDuration = (value: unknown): number | null => {
  return typeof value === 'number'
    && Number.isInteger(value)
    && value > 0
    && value <= MAX_TRACK_DURATION_MS
    ? value
    : null
}

const safeProviderUri = (value: unknown): string | null => {
  return typeof value === 'string' && /^spotify:track:[a-z0-9]{10,64}$/i.test(value)
    ? value
    : null
}

const nextDataJson = (html: string): string | null => {
  const match = /<script\b(?=[^>]*\bid=["']__NEXT_DATA__["'])[^>]*>([\s\S]*?)<\/script>/i.exec(html)
  return match?.[1]?.trim() || null
}

export const parseSpotifyEmbedTrackList = (html: string): SpotifyProviderTrack[] => {
  if (!html || html.length > MAX_EMBED_DOCUMENT_LENGTH) return []
  const json = nextDataJson(html)
  if (!json) return []

  try {
    const parsed = asRecord(JSON.parse(json) as unknown)
    const props = readRecord(parsed, 'props')
    const pageProps = readRecord(props, 'pageProps')
    const state = readRecord(pageProps, 'state')
    const data = readRecord(state, 'data')
    const entity = readRecord(data, 'entity')
    const trackList = entity?.trackList
    if (!Array.isArray(trackList)) return []

    return trackList.flatMap((value): SpotifyProviderTrack[] => {
      const track = asRecord(value)
      const audioPreview = readRecord(track, 'audioPreview')
      const title = readString(track, 'title')
      const providerUri = safeProviderUri(track?.uri)
      const previewUrl = safePreviewUrl(audioPreview?.url)
      const durationMs = safeDuration(track?.duration)

      if (!title || title.length > 300 || !providerUri || !previewUrl || !durationMs) return []
      return [{
        title,
        audio: { provider: 'spotify', previewUrl, providerUri, durationMs },
      }]
    })
  } catch {
    return []
  }
}

const normalizeTitle = (value: string): string => value
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()

export const pairSpotifyTracks = (
  releaseTracks: ReleaseTrack[],
  providerTracks: SpotifyProviderTrack[],
): ReleaseTrack[] => {
  if (!providerTracks.length) return releaseTracks

  const countsAlign = releaseTracks.length === providerTracks.length
  const exactCandidates = releaseTracks.map(track => {
    const normalizedTitle = normalizeTitle(track.title)
    return providerTracks.flatMap((providerTrack, providerIndex) => (
      normalizeTitle(providerTrack.title) === normalizedTitle ? [providerIndex] : []
    ))
  })
  const exactAssignments = new Map<number, number>()

  exactCandidates.forEach((candidateIndexes, releaseIndex) => {
    if (candidateIndexes.length !== 1) return
    const providerIndex = candidateIndexes[0]
    const competingTracks = exactCandidates.filter(indexes => indexes.length === 1 && indexes[0] === providerIndex)
    if (providerIndex !== undefined && competingTracks.length === 1) exactAssignments.set(releaseIndex, providerIndex)
  })

  const usedProviderIndexes = new Set(exactAssignments.values())

  return releaseTracks.map((track, index) => {
    const exactIndex = exactAssignments.get(index)
    const fallbackIndex = countsAlign ? index : undefined
    const providerIndex = exactIndex !== undefined
      ? exactIndex
      : fallbackIndex !== undefined && !usedProviderIndexes.has(fallbackIndex)
        ? fallbackIndex
        : undefined

    if (providerIndex === undefined) return track
    const providerTrack = providerTracks[providerIndex]
    if (!providerTrack) return track
    usedProviderIndexes.add(providerIndex)
    return { ...track, audio: providerTrack.audio }
  })
}

const isTrustedSpotifyCollectionEmbed = (player: ReleasePlayer | null): player is ReleasePlayer => {
  if (player?.provider !== 'spotify') return false

  try {
    const url = new URL(player.embedUrl)
    return url.protocol === 'https:'
      && url.hostname.toLowerCase() === 'open.spotify.com'
      && /^\/embed\/(album|playlist)\/[a-z0-9]+\/?$/i.test(url.pathname)
  } catch {
    return false
  }
}

export const enrichSpotifyReleaseTracks = async (
  tracks: ReleaseTrack[],
  player: ReleasePlayer | null,
  fetcher: typeof fetch = fetch,
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<ReleaseTrack[]> => {
  if (!tracks.length || !isTrustedSpotifyCollectionEmbed(player)) return tracks

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetcher(player.embedUrl, {
      headers: {
        accept: 'text/html,application/xhtml+xml',
        'accept-language': 'en-US,en;q=0.9',
        'user-agent': 'Mozilla/5.0 (compatible; AccurateBlackCatalogue/1.0; +https://www.accurateblack.nl)',
      },
      redirect: 'error',
      signal: controller.signal,
    })
    if (!response.ok) return tracks

    const contentLength = Number(response.headers.get('content-length') ?? 0)
    if (contentLength > MAX_EMBED_DOCUMENT_LENGTH) return tracks
    const html = await response.text()
    return pairSpotifyTracks(tracks, parseSpotifyEmbedTrackList(html))
  } catch {
    return tracks
  } finally {
    clearTimeout(timeout)
  }
}
