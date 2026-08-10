import { getArtistDetail } from '~/server/repositories/artistRepository'
import type { ArtistDetailResponse } from '~/types/release'
export default defineCachedEventHandler(async (event): Promise<ArtistDetailResponse> => {
  const parameter = getRouterParam(event, 'artist') ?? ''
  let name = ''; try { name = decodeURIComponent(parameter).trim() } catch { /* invalid input */ }
  const artist = name ? await getArtistDetail(name) : null
  if (!artist) throw createError({ statusCode: 404, statusMessage: 'Artist not found' })
  return { artist }
}, { maxAge: 900, swr: true })
