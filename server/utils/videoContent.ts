import type { VideoSummary } from '~/types/video'

const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/
const THUMBNAIL_HOSTS = new Set(['i.ytimg.com'])

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const stringValue = (value: unknown): string | null => {
  if (typeof value !== 'string') return null
  const normalized = value.trim().replace(/\s+/g, ' ')
  return normalized || null
}

const decodeTitle = (value: string): string => {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&lt;': '<',
    '&gt;': '>',
  }

  return value.replace(/&(amp|quot|#39|apos|lt|gt);/g, entity => entities[entity] ?? entity)
}

const safePublishedAt = (value: unknown): string | null => {
  const text = stringValue(value)
  if (!text) return null
  const timestamp = Date.parse(text)
  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : null
}

export const safeVideoThumbnailUrl = (value: unknown, videoId: string): string | null => {
  const text = stringValue(value)
  if (!text) return null

  try {
    const url = new URL(text)
    if (url.protocol !== 'https:' || !THUMBNAIL_HOSTS.has(url.hostname.toLowerCase())) return null
    const pathParts = url.pathname.split('/').filter(Boolean)
    if (pathParts[0] !== 'vi' || pathParts[1] !== videoId) return null
    return url.toString()
  } catch {
    return null
  }
}

export const toVideoSummary = (value: unknown): VideoSummary | null => {
  if (!isRecord(value) || !isRecord(value.id) || !isRecord(value.snippet)) return null

  const id = stringValue(value.id.videoId)
  const titleValue = stringValue(value.snippet.title)
  const publishedAt = safePublishedAt(value.snippet.publishedAt)
  if (!id || !VIDEO_ID_PATTERN.test(id) || !titleValue || !publishedAt) return null

  const thumbnails = isRecord(value.snippet.thumbnails) ? value.snippet.thumbnails : null
  if (!thumbnails) return null

  const candidates = ['maxres', 'standard', 'high', 'medium', 'default']
  let thumbnailUrl: string | null = null
  for (const candidate of candidates) {
    const thumbnail = thumbnails[candidate]
    if (!isRecord(thumbnail)) continue
    thumbnailUrl = safeVideoThumbnailUrl(thumbnail.url, id)
    if (thumbnailUrl) break
  }

  if (!thumbnailUrl) return null

  return {
    id,
    title: decodeTitle(titleValue),
    publishedAt,
    thumbnailUrl,
    watchUrl: `https://www.youtube.com/watch?v=${id}`,
  }
}

export const mapVideoCatalogue = (value: unknown, limit = 12): VideoSummary[] => {
  if (!isRecord(value) || !Array.isArray(value.items)) return []

  const videos = value.items
    .map(toVideoSummary)
    .filter((video): video is VideoSummary => video !== null)
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))

  const unique = new Map(videos.map(video => [video.id, video]))
  return [...unique.values()].slice(0, Math.max(0, Math.min(limit, 12)))
}
