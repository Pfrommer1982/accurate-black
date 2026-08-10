import assert from 'node:assert/strict'
import test from 'node:test'
import { toFeaturedRelease } from '../server/utils/featuredRelease.ts'

test('maps verified Firestore fields into the public hero model', () => {
  const release = toFeaturedRelease('document-id', {
    ACB: ' ACB047 ',
    artist: ' MUNE (NL) ',
    releaseName: ' THINK ABOUT NOTHING ',
    imageUrl: 'https://example.com/artwork.webp',
    description: 'Selected work',
    releaseYear: 2024,
  })

  assert.deepEqual(release, {
    id: 'document-id',
    catalogNumber: 'ACB047',
    artist: 'MUNE (NL)',
    title: 'THINK ABOUT NOTHING',
    artworkUrl: 'https://example.com/artwork.webp',
    description: 'Selected work',
    year: '2024',
  })
})

test('does not fabricate missing optional content', () => {
  const release = toFeaturedRelease('document-id', {
    ACB: 'ACB047',
    artist: 'MUNE (NL)',
    releaseName: 'THINK ABOUT NOTHING',
    imageUrl: 'https://example.com/artwork.webp',
  })

  assert.equal(release?.description, '')
  assert.equal(release?.year, null)
})

test('rejects incomplete release documents', () => {
  assert.equal(toFeaturedRelease('document-id', { ACB: 'ACB047' }), null)
  assert.equal(toFeaturedRelease('document-id', null), null)
})
