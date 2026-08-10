export interface BroadcastEpisode {
  id: string
  title: string
  publishedAt: string
  sourceUrl: string
  embedUrl: string
}

export interface BroadcastArchiveResponse {
  episodes: BroadcastEpisode[]
  refreshedAt: string
}
