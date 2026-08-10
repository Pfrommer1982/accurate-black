import { getReleaseDetail } from '~/server/repositories/releaseRepository'
import { normaliseCatalogueNumber } from '~/server/utils/releaseContent'
import type { ReleaseDetailResponse } from '~/types/release'

export default defineCachedEventHandler(async (event): Promise<ReleaseDetailResponse> => {
  const parameter = getRouterParam(event, 'acb') ?? ''
  const catalogNumber = normaliseCatalogueNumber(decodeURIComponent(parameter))
  const enrichTracks = getQuery(event).enrich === '1' || getQuery(event).enrich === 'true'

  if (!/^[A-Z]+[-\s]?\d+$/.test(catalogNumber)) {
    throw createError({ statusCode: 404, statusMessage: 'Release not found' })
  }

  const payload = await getReleaseDetail(catalogNumber, { enrichTracks })
  if (!payload) throw createError({ statusCode: 404, statusMessage: 'Release not found' })
  return payload
}, {
  getKey: (event) => {
    const acb = getRouterParam(event, 'acb') ?? ''
    const enrich = getQuery(event).enrich === '1' || getQuery(event).enrich === 'true'
    return `release-detail-v5:${acb}:enrich-${enrich ? '1' : '0'}`
  },
  maxAge: 900,
  swr: true,
})
