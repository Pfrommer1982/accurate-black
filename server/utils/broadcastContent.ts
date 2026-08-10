import type { BroadcastEpisode } from '~/types/broadcast'

export interface BroadcastDocument {
  id: string
  data: unknown
}

const MAX_EPISODES = 15
const SOUNDCLOUD_API_PATH = /^\/(tracks|playlists)\/(\d+)\/?$/

const textValue = (value: unknown): string => {
  if (typeof value === 'string') return value.trim()
  if (!value || typeof value !== 'object' || Array.isArray(value)) return ''

  const source = value as Record<string, unknown>
  return typeof source._text === 'string'
    ? source._text.trim()
    : typeof source._cdata === 'string'
      ? source._cdata.trim()
      : ''
}

const iframeSource = (value: string): string => {
  const normalized = value.replaceAll('&amp;', '&').replaceAll('&quot;', '"')
  return /\bsrc\s*=\s*["']([^"']+)["']/i.exec(normalized)?.[1]?.trim() ?? normalized.trim()
}

const normalizeApiResource = (url: URL): { embedResourceUrl: string, sourceUrl: string } | null => {
  if (url.hostname.toLowerCase() !== 'api.soundcloud.com') return null
  if (url.username || url.password || url.port) return null

  const match = SOUNDCLOUD_API_PATH.exec(url.pathname)
  if (!match) return null

  const [, resourceType, resourceId] = match
  return {
    embedResourceUrl: `https://api.soundcloud.com/${resourceType}/${resourceId}`,
    sourceUrl: `https://soundcloud.com/${resourceType}/${resourceId}`,
  }
}

const normalizeCanonicalResource = (url: URL): { embedResourceUrl: string, sourceUrl: string } | null => {
  if (!['soundcloud.com', 'www.soundcloud.com'].includes(url.hostname.toLowerCase())) return null
  if (url.username || url.password || url.port) return null
  if (url.pathname.split('/').filter(Boolean).length < 2) return null

  url.hostname = 'soundcloud.com'
  url.search = ''
  url.hash = ''
  const sourceUrl = url.toString()
  return { embedResourceUrl: sourceUrl, sourceUrl }
}

const sourceFromCandidate = (value: unknown): { embedResourceUrl: string, sourceUrl: string } | null => {
  if (typeof value !== 'string' || !value.trim()) return null

  try {
    const candidate = new URL(iframeSource(value))
    if (candidate.protocol !== 'https:') return null

    if (candidate.hostname.toLowerCase() === 'w.soundcloud.com') {
      if (candidate.pathname !== '/player/') return null
      const nested = candidate.searchParams.get('url')
      return nested ? sourceFromCandidate(nested) : null
    }

    return normalizeApiResource(candidate) ?? normalizeCanonicalResource(candidate)
  } catch {
    return null
  }
}

export const toTrustedSoundCloudEmbed = (value: unknown): { sourceUrl: string, embedUrl: string } | null => {
  const resource = sourceFromCandidate(value)
  if (!resource) return null

  const query = new URLSearchParams({
    url: resource.embedResourceUrl,
    color: '#f1efe9',
    auto_play: 'false',
    hide_related: 'true',
    show_comments: 'false',
    show_user: 'true',
    show_reposts: 'false',
    show_teaser: 'false',
    visual: 'false',
  })

  return {
    sourceUrl: resource.sourceUrl,
    embedUrl: `https://w.soundcloud.com/player/?${query}`,
  }
}

const toIsoDate = (value: unknown): string | null => {
  let candidate: unknown = value

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const source = value as Record<string, unknown>
    if (typeof source.toDate === 'function') {
      try {
        candidate = (source.toDate as () => unknown)()
      } catch {
        return null
      }
    } else if (typeof source.seconds === 'number') {
      candidate = source.seconds * 1000
    }
  }

  const date = candidate instanceof Date ? candidate : new Date(candidate as string | number)
  return Number.isNaN(date.getTime()) ? null : date.toISOString()
}

const titleFromSource = (sourceUrl: string): string => {
  const pathname = new URL(sourceUrl).pathname
  const apiMatch = SOUNDCLOUD_API_PATH.exec(pathname) || /^\/(tracks|playlists)\/(\d+)\/?$/.exec(pathname)
  if (apiMatch) {
    return apiMatch[1] === 'playlists' ? 'Accurate Session Playlist' : 'Accurate Session'
  }

  const slug = pathname.split('/').filter(Boolean).at(-1) ?? 'Accurate session'
  try {
    return decodeURIComponent(slug).replaceAll(/[-_]+/g, ' ').replace(/\b\w/g, character => character.toUpperCase())
  } catch {
    return slug.replaceAll(/[-_]+/g, ' ')
  }
}

export const cleanBroadcastTitle = (value: string): string => {
  const cleaned = value
    .replace(/^\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}\s+/u, '')
    .replace(/\s*@\s*www\.[^\s]+/giu, '')
    .replace(/\s*@\s*https?:\/\/\S+/giu, '')
    .replace(/^Accurate Black Presents\s+/iu, '')
    .replace(/\s+/gu, ' ')
    .trim()

  return cleaned || value.trim()
}

const uniqueNewestFirst = (episodes: BroadcastEpisode[]): BroadcastEpisode[] => {
  const seen = new Set<string>()
  return episodes
    .sort((left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt))
    .filter((episode) => {
      if (seen.has(episode.sourceUrl)) return false
      seen.add(episode.sourceUrl)
      return true
    })
    .slice(0, MAX_EPISODES)
}

export const mapTechtonicRssItems = (value: unknown): BroadcastEpisode[] => {
  const items = Array.isArray(value) ? value : value ? [value] : []

  return uniqueNewestFirst(items.flatMap((item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return []
    const source = item as Record<string, unknown>
    const title = textValue(source.title)
    if (!title.toLocaleLowerCase('en').includes('techtonic')) return []

    const player = toTrustedSoundCloudEmbed(textValue(source.link))
    const publishedAt = toIsoDate(textValue(source.pubDate) || textValue(source.published))
    if (!player || !publishedAt) return []

    return [{
      id: textValue(source.guid) || player.sourceUrl,
      title: cleanBroadcastTitle(title),
      publishedAt,
      ...player,
    }]
  }))
}

export const mapAccurateSessionDocuments = (documents: BroadcastDocument[]): BroadcastEpisode[] => {
  return uniqueNewestFirst(documents.flatMap((document) => {
    if (!document.data || typeof document.data !== 'object' || Array.isArray(document.data)) return []
    const source = document.data as Record<string, unknown>
    const player = toTrustedSoundCloudEmbed(source.sessionLink)
    const publishedAt = toIsoDate(source.sessionDate)
    if (!player || !publishedAt) return []

    const storedTitle = [source.title, source.sessionTitle, source.name]
      .map(textValue)
      .find(Boolean)

    return [{
      id: document.id,
      title: cleanBroadcastTitle(storedTitle ?? titleFromSource(player.sourceUrl)),
      publishedAt,
      ...player,
    }]
  }))
}

export const rssItemsFrom = (value: unknown): unknown[] => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return []
  const source = value as Record<string, unknown>
  const rss = source.rss
  if (!rss || typeof rss !== 'object' || Array.isArray(rss)) return []
  const channel = (rss as Record<string, unknown>).channel
  if (!channel || typeof channel !== 'object' || Array.isArray(channel)) return []
  const items = (channel as Record<string, unknown>).item
  return Array.isArray(items) ? items : items ? [items] : []
}
