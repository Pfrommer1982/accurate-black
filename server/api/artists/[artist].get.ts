import { getArtistDetail } from '~/server/repositories/artistRepository'
import type { ArtistDetailResponse } from '~/types/release'

export default defineCachedEventHandler(async (event): Promise<ArtistDetailResponse> => {
  const parameter = getRouterParam(event, 'artist') ?? ''
  let name = ''
  try { name = decodeURIComponent(parameter).trim() } catch { /* invalid input */ }

  if (!name || name.startsWith('_') || name.includes('.')) {
    throw createError({ statusCode: 404, statusMessage: 'Artist not found' })
  }

  const artist = await getArtistDetail(name)
  if (!artist) throw createError({ statusCode: 404, statusMessage: 'Artist not found' })
  return { artist }
}, {
  getKey: event => `artist-detail-v2:${getRouterParam(event, 'artist') ?? ''}`,
  maxAge: 900,
  swr: true,
})
