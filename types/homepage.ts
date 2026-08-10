import type { FeaturedRelease } from '~/types/release'

export interface HomepagePayload {
  featuredRelease: FeaturedRelease | null
  selectedCatalogue: FeaturedRelease[]
}
