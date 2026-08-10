import { getReleaseCatalogue } from '~/server/repositories/releaseRepository'
import type { ReleaseCatalogueResponse } from '~/types/release'

export default defineCachedEventHandler(async (): Promise<ReleaseCatalogueResponse> => {
  return { releases: await getReleaseCatalogue() }
}, {
  maxAge: 900,
  swr: true,
})
