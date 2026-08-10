import { getTechtonicEpisodes } from '~/server/repositories/broadcastRepository'
import type { BroadcastArchiveResponse } from '~/types/broadcast'

export default defineCachedEventHandler(async (): Promise<BroadcastArchiveResponse> => ({
  episodes: await getTechtonicEpisodes(),
  refreshedAt: new Date().toISOString(),
}), {
  maxAge: 300,
  swr: true,
})
