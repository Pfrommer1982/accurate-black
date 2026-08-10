import type {
  ReleaseDetail,
  ReleaseLink,
  ReleasePlayer,
  ReleaseSummary,
  ReleaseTrack,
} from '~/types/release'

export interface ReleaseDocument {
  id: string
  data: unknown
}

const readString = (source: Record<string, unknown>, key: string): string => {
  const value = source[key]
  return typeof value === 'string' ? value.trim() : ''
}

const readYear = (source: Record<string, unknown>): string | null => {
  const value = source.year ?? source.releaseYear

  if (typeof value === 'number' && Number.isInteger(value) && value >= 1900 && value <= 2100) {
    return String(value)
  }

  if (typeof value === 'string' && /^(19|20)\d{2}$/.test(value.trim())) return value.trim()
  return null
}

export const normaliseCatalogueNumber = (value: string): string => value.trim().toUpperCase()

export const safeHttpUrl = (value: unknown): string | null => {
  if (typeof value !== 'string' || !value.trim()) return null

  try {
    const url = new URL(value.trim())
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null
  } catch {
    return null
  }
}

const extractEmbeddedUrl = (value: unknown): string | null => {
  if (typeof value !== 'string') return null
  const source = value.trim().replaceAll('&amp;', '&')
  const embeddedSource = /\bsrc\s*=\s*["']([^"']+)["']/i.exec(source)?.[1]
  return safeHttpUrl(embeddedSource ?? source)
}

const trustedMediaUrl = (value: unknown): string | null => {
  const urlValue = extractEmbeddedUrl(value)
  if (!urlValue) return null

  const url = new URL(urlValue)
  const hostname = url.hostname.toLowerCase()
  const allowedHosts = [
    'open.spotify.com',
    'soundcloud.com',
    'w.soundcloud.com',
    'youtube.com',
    'www.youtube.com',
    'youtu.be',
  ]

  return allowedHosts.includes(hostname) ? url.toString() : null
}

const spotifyEmbedUrl = (url: URL): string | null => {
  const segments = url.pathname.split('/').filter(Boolean)
  if (segments[0]?.toLowerCase().startsWith('intl-')) segments.shift()
  if (segments[0]?.toLowerCase() === 'embed') segments.shift()

  const [kind, id, ...remainder] = segments
  const supportedKinds = new Set(['album', 'track', 'playlist', 'episode'])
  if (!kind || !supportedKinds.has(kind.toLowerCase()) || !id || remainder.length) return null
  if (!/^[a-z0-9]+$/i.test(id)) return null

  return `https://open.spotify.com/embed/${kind.toLowerCase()}/${id}`
}

const soundcloudEmbedUrl = (url: URL): string | null => {
  if (url.hostname.toLowerCase() === 'w.soundcloud.com') {
    if (url.pathname !== '/player/' || !url.searchParams.get('url')) return null
    url.protocol = 'https:'
    return url.toString()
  }

  if (url.hostname.toLowerCase() !== 'soundcloud.com' || url.pathname === '/') return null
  const contentUrl = `https://soundcloud.com${url.pathname}`
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(contentUrl)}`
}

const mapPlayer = (
  value: unknown,
  release: ReleaseSummary,
): ReleasePlayer | null => {
  const urlValue = extractEmbeddedUrl(value)
  if (!urlValue) return null

  const url = new URL(urlValue)
  const hostname = url.hostname.toLowerCase()

  if (hostname === 'open.spotify.com') {
    const embedUrl = spotifyEmbedUrl(url)
    return embedUrl
      ? { provider: 'spotify', embedUrl, title: `${release.title} by ${release.artist} on Spotify` }
      : null
  }

  if (hostname === 'soundcloud.com' || hostname === 'w.soundcloud.com') {
    const embedUrl = soundcloudEmbedUrl(url)
    return embedUrl
      ? { provider: 'soundcloud', embedUrl, title: `${release.title} by ${release.artist} on SoundCloud` }
      : null
  }

  return null
}

const mapTracks = (value: unknown): ReleaseTrack[] => {
  if (!Array.isArray(value)) return []

  return value.flatMap((track, index) => {
    if (!track || typeof track !== 'object' || Array.isArray(track)) return []
    const title = readString(track as Record<string, unknown>, 'trackName')
    return title ? [{ position: index + 1, title, audio: null }] : []
  })
}

const mapLinks = (source: Record<string, unknown>): ReleaseLink[] => {
  const links: ReleaseLink[] = []
  const buyUrl = safeHttpUrl(source.digDisLink)
  const videoUrl = trustedMediaUrl(source.releaseTrailer)

  if (buyUrl) links.push({ kind: 'buy', label: 'Stream / buy', url: buyUrl })
  if (videoUrl) links.push({ kind: 'video', label: 'Watch release video', url: videoUrl })

  return links.filter((link, index) => links.findIndex(candidate => candidate.url === link.url) === index)
}

export const toReleaseSummary = (id: string, value: unknown): ReleaseSummary | null => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null

  const source = value as Record<string, unknown>
  const catalogNumber = normaliseCatalogueNumber(readString(source, 'ACB'))
  const artist = readString(source, 'artist')
  const title = readString(source, 'releaseName')
  const artworkUrl = safeHttpUrl(source.imageUrl)

  if (!catalogNumber || !artist || !title || !artworkUrl) return null

  return {
    id,
    catalogNumber,
    artist,
    title,
    artworkUrl,
    description: readString(source, 'description'),
    year: readYear(source),
  }
}

export const toReleaseDetail = (id: string, value: unknown): ReleaseDetail | null => {
  const summary = toReleaseSummary(id, value)
  if (!summary || !value || typeof value !== 'object' || Array.isArray(value)) return null

  const source = value as Record<string, unknown>
  return {
    ...summary,
    artistImageUrl: safeHttpUrl(source.artistImageUrl),
    tracks: mapTracks(source.tracks),
    links: mapLinks(source),
    player: mapPlayer(source.soundcloudUrl, summary),
  }
}

const parseCatalogue = (value: string): { prefix: string, number: number } | null => {
  const match = /^([A-Z]+)[-\s]?(\d+)$/i.exec(value.trim())
  if (!match) return null

  return {
    prefix: match[1]?.toUpperCase() ?? '',
    number: Number.parseInt(match[2] ?? '', 10),
  }
}

export const compareCatalogueDescending = (left: ReleaseSummary, right: ReleaseSummary): number => {
  const parsedLeft = parseCatalogue(left.catalogNumber)
  const parsedRight = parseCatalogue(right.catalogNumber)

  if (parsedLeft && parsedRight && parsedLeft.prefix === parsedRight.prefix) {
    if (parsedLeft.number !== parsedRight.number) return parsedRight.number - parsedLeft.number
  }

  const catalogOrder = right.catalogNumber.localeCompare(left.catalogNumber, 'en', {
    numeric: true,
    sensitivity: 'base',
  })

  return catalogOrder || left.id.localeCompare(right.id)
}

export const mapReleaseCatalogue = (documents: ReleaseDocument[]): ReleaseSummary[] => {
  const seen = new Set<string>()

  return documents
    .map(document => toReleaseSummary(document.id, document.data))
    .filter((release): release is ReleaseSummary => release !== null)
    .sort(compareCatalogueDescending)
    .filter(release => {
      const key = normaliseCatalogueNumber(release.catalogNumber)
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
}

export const findReleaseDetail = (
  documents: ReleaseDocument[],
  catalogNumber: string,
): ReleaseDetail | null => {
  const normalizedTarget = normaliseCatalogueNumber(catalogNumber)
  const matchingDocument = documents.find(document => {
    if (!document.data || typeof document.data !== 'object' || Array.isArray(document.data)) return false
    return normaliseCatalogueNumber(readString(document.data as Record<string, unknown>, 'ACB')) === normalizedTarget
  })

  return matchingDocument ? toReleaseDetail(matchingDocument.id, matchingDocument.data) : null
}
