import { getArtistIndex } from '~/server/repositories/artistRepository'
import type { ArtistIndexResponse } from '~/types/release'
export default defineCachedEventHandler(async (): Promise<ArtistIndexResponse> => ({ artists: await getArtistIndex() }), { maxAge: 900, swr: true })
