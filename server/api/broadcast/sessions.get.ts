import { getAccurateSessionEpisodes } from '~/server/repositories/broadcastRepository'
import type { BroadcastArchiveResponse } from '~/types/broadcast'

export default defineCachedEventHandler(async (): Promise<BroadcastArchiveResponse> => ({
  episodes: await getAccurateSessionEpisodes(),
  refreshedAt: new Date().toISOString(),
}), {
  maxAge: 300,
  swr: true,
})
