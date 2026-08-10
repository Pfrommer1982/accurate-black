import { getVideoCatalogue } from '~/server/repositories/videoRepository'
import type { VideoCatalogueResponse } from '~/types/video'

export default defineCachedEventHandler(async (): Promise<VideoCatalogueResponse> => {
  try {
    return { videos: await getVideoCatalogue() }
  } catch {
    return { videos: [] }
  }
}, {
  maxAge: 3600,
  swr: true,
})
