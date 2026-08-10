import { getHomepagePayload } from '~/server/repositories/homepageRepository'
import type { HomepagePayload } from '~/types/homepage'

const emptyPayload = (): HomepagePayload => ({
  featuredRelease: null,
  selectedCatalogue: [],
})

export default defineCachedEventHandler(async (): Promise<HomepagePayload> => {
  try {
    return await getHomepagePayload()
  } catch {
    console.error('[homepage] Public content is temporarily unavailable')
    return emptyPayload()
  }
}, {
  maxAge: 900,
  swr: true,
})
