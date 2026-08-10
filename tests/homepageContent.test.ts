import assert from 'node:assert/strict'
import test from 'node:test'
import {
  selectHomepageReleases,
  toPublicRelease,
} from '../server/utils/homepageContent.ts'
import { compareCatalogueDescending } from '../server/utils/releaseContent.ts'

const document = (catalogNumber: string, overrides: Record<string, unknown> = {}) => ({
  id: `id-${catalogNumber}`,
  data: {
    ACB: catalogNumber,
    artist: `Artist ${catalogNumber}`,
    releaseName: `Title ${catalogNumber}`,
    imageUrl: `https://example.com/${catalogNumber}.webp`,
    ...overrides,
  },
})

test('sorts numeric catalogue suffixes deterministically instead of subtracting strings', () => {
  const releases = selectHomepageReleases([
    document('ACB9'),
    document('ACB047'),
    document('ACB100'),
    document('ACB10'),
  ])

  assert.deepEqual(releases.map(release => release.catalogNumber), [
    'ACB100',
    'ACB047',
    'ACB10',
    'ACB9',
  ])
  assert.equal(compareCatalogueDescending(releases[0]!, releases[1]!), -53)
})

test('rejects invalid public documents and keeps the response to six unique releases', () => {
  const releases = selectHomepageReleases([
    document('ACB008'),
    document('ACB007'),
    document('ACB006'),
    document('ACB005'),
    document('ACB004'),
    document('ACB003'),
    document('ACB002'),
    document('ACB008', { releaseName: 'Duplicate' }),
    document('ACB009', { imageUrl: 'javascript:alert(1)' }),
    { id: 'invalid', data: { ACB: 'ACB010' } },
  ])

  assert.equal(releases.length, 6)
  assert.deepEqual(releases.map(release => release.catalogNumber), [
    'ACB008',
    'ACB007',
    'ACB006',
    'ACB005',
    'ACB004',
    'ACB003',
  ])
})

test('omits unverified optional fields without inventing values', () => {
  const release = toPublicRelease('id', {
    ACB: 'ACB047',
    artist: 'MUNE',
    releaseName: 'THINK ABOUT NOTHING',
    imageUrl: 'https://example.com/art.webp',
    year: 'unknown',
  })

  assert.equal(release?.year, null)
  assert.equal(release?.description, '')
})
