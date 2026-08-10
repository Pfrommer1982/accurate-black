import { getReleaseDetail } from '~/server/repositories/releaseRepository'
import { normaliseCatalogueNumber } from '~/server/utils/releaseContent'
import type { ReleaseDetailResponse } from '~/types/release'

export default defineCachedEventHandler(async (event): Promise<ReleaseDetailResponse> => {
  const parameter = getRouterParam(event, 'acb') ?? ''
  const catalogNumber = normaliseCatalogueNumber(decodeURIComponent(parameter))

  if (!/^[A-Z]+[-\s]?\d+$/.test(catalogNumber)) {
    throw createError({ statusCode: 404, statusMessage: 'Release not found' })
  }

  const payload = await getReleaseDetail(catalogNumber)
  if (!payload) throw createError({ statusCode: 404, statusMessage: 'Release not found' })
  return payload
}, {
  getKey: event => `release-track-player-v4:${getRouterParam(event, 'acb') ?? ''}`,
  maxAge: 900,
  swr: true,
})
