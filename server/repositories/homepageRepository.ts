import { getReleaseCatalogue } from '~/server/repositories/releaseRepository'
import type { HomepagePayload } from '~/types/homepage'

export const getHomepagePayload = async (): Promise<HomepagePayload> => {
  const selectedCatalogue = (await getReleaseCatalogue()).slice(0, 6)
  return {
    featuredRelease: selectedCatalogue[0] ?? null,
    selectedCatalogue,
  }
}
