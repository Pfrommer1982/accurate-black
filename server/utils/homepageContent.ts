import {
  mapReleaseCatalogue,
  toReleaseSummary,
} from './releaseContent.ts'
import type { FeaturedRelease } from '~/types/release'

export interface PublicDocument {
  id: string
  data: unknown
}

export const toPublicRelease = (id: string, value: unknown): FeaturedRelease | null => {
  return toReleaseSummary(id, value)
}

export const selectHomepageReleases = (documents: PublicDocument[], limit = 6): FeaturedRelease[] => {
  return mapReleaseCatalogue(documents)
    .slice(0, Math.max(0, Math.min(limit, 6)))
}
