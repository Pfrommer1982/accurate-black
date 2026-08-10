import { mapVideoCatalogue } from '~/server/utils/videoContent'
import type { VideoSummary } from '~/types/video'

const CHANNEL_ID_PATTERN = /^UC[A-Za-z0-9_-]{22}$/

export const getVideoCatalogue = async (): Promise<VideoSummary[]> => {
  const apiKey = process.env.YOUTUBE_API_KEY ?? process.env.VITE_YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID ?? process.env.VITE_YOUTUBE_CHANNEL_ID
  if (!apiKey || !channelId || !CHANNEL_ID_PATTERN.test(channelId)) return []

  const query = new URLSearchParams({
    part: 'snippet',
    channelId,
    maxResults: '12',
    order: 'date',
    type: 'video',
    key: apiKey,
  })

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${query}`, {
      headers: { accept: 'application/json' },
      signal: controller.signal,
    })
    if (!response.ok) return []
    return mapVideoCatalogue(await response.json())
  } catch {
    return []
  } finally {
    clearTimeout(timeout)
  }
}
