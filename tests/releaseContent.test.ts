import assert from 'node:assert/strict'
import test from 'node:test'
import {
  findReleaseDetail,
  mapReleaseCatalogue,
  normaliseCatalogueNumber,
  safeHttpUrl,
  toReleaseDetail,
} from '../server/utils/releaseContent.ts'

const releaseDocument = (catalogNumber: string, overrides: Record<string, unknown> = {}) => ({
  id: `id-${catalogNumber}`,
  data: {
    ACB: catalogNumber,
    artist: 'MUNE',
    releaseName: `Release ${catalogNumber}`,
    imageUrl: `https://example.com/${catalogNumber}.webp`,
    ...overrides,
  },
})

test('normalises, deduplicates and numerically sorts catalogue numbers', () => {
  const catalogue = mapReleaseCatalogue([
    releaseDocument('acb9'),
    releaseDocument('ACB010'),
    releaseDocument(' ACB010 ', { releaseName: 'Duplicate' }),
    releaseDocument('ACB047'),
  ])

  assert.equal(normaliseCatalogueNumber(' acb047 '), 'ACB047')
  assert.deepEqual(catalogue.map(release => release.catalogNumber), ['ACB047', 'ACB010', 'ACB9'])
})

test('extracts a safe Spotify player from stored iframe HTML without exposing raw HTML', () => {
  const release = toReleaseDetail('release-id', {
    ACB: 'ACB047',
    artist: 'MUNE',
    releaseName: 'Think About Nothing',
    imageUrl: 'https://example.com/art.webp',
    tracks: [{ trackName: 'First Track' }, { trackName: 'Second Track' }],
    soundcloudUrl: '<iframe src="https://open.spotify.com/embed/album/abc"></iframe>',
    releaseTrailer: '<iframe src="https://evil.example/video"></iframe>',
    digDisLink: 'https://www.beatport.com/release/example/1',
  })

  assert.deepEqual(release?.tracks, [
    { position: 1, title: 'First Track', audio: null },
    { position: 2, title: 'Second Track', audio: null },
  ])
  assert.deepEqual(release?.player, {
    provider: 'spotify',
    embedUrl: 'https://open.spotify.com/embed/album/abc',
    title: 'Think About Nothing by MUNE on Spotify',
  })
  assert.deepEqual(release?.links.map(link => link.kind), ['buy'])
  assert.equal(JSON.stringify(release).includes('<iframe'), false)
})

test('converts plain Spotify and SoundCloud content URLs into trusted embed URLs', () => {
  const spotify = toReleaseDetail('spotify-id', {
    ...releaseDocument('ACB040').data,
    soundcloudUrl: 'https://open.spotify.com/track/1abcDEF234?si=tracking',
  })
  const soundcloud = toReleaseDetail('soundcloud-id', {
    ...releaseDocument('ACB041').data,
    soundcloudUrl: 'https://soundcloud.com/accuratemusic/example-track?utm_source=clipboard',
  })

  assert.equal(spotify?.player?.embedUrl, 'https://open.spotify.com/embed/track/1abcDEF234')
  assert.equal(soundcloud?.player?.embedUrl, 'https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Faccuratemusic%2Fexample-track')
})

test('preserves trusted SoundCloud player embeds', () => {
  const release = toReleaseDetail('soundcloud-embed-id', {
    ...releaseDocument('ACB042').data,
    soundcloudUrl: '<iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/123&amp;color=%23080808"></iframe>',
  })

  assert.equal(release?.player?.provider, 'soundcloud')
  assert.match(release?.player?.embedUrl ?? '', /^https:\/\/w\.soundcloud\.com\/player\/\?url=/)
  assert.equal(JSON.stringify(release).includes('<iframe'), false)
})

test('rejects malicious, invalid and unsupported audio sources', () => {
  const values = [
    '<iframe src="javascript:alert(1)"></iframe>',
    'https://evil.example/track/abc',
    'https://www.youtube.com/watch?v=abc',
    'https://open.spotify.com/artist/abc',
    'https://w.soundcloud.com/not-a-player/?url=https://soundcloud.com/example/track',
  ]

  for (const soundcloudUrl of values) {
    const release = toReleaseDetail('unsafe-id', {
      ...releaseDocument('ACB043').data,
      soundcloudUrl,
    })
    assert.equal(release?.player, null)
  }
})

test('finds legacy records case-insensitively and rejects unsafe URLs', () => {
  const release = findReleaseDetail([releaseDocument(' acb047 ')], 'ACB047')

  assert.equal(release?.catalogNumber, 'ACB047')
  assert.equal(safeHttpUrl('javascript:alert(1)'), null)
  assert.equal(safeHttpUrl('https://example.com/release'), 'https://example.com/release')
})

test('maps only a safe artist image into the public release detail DTO', () => {
  const safe = toReleaseDetail('artist-image-safe', {
    ...releaseDocument('ACB046').data,
    artistImageUrl: 'https://example.com/artist.webp',
  })
  const unsafe = toReleaseDetail('artist-image-unsafe', {
    ...releaseDocument('ACB045').data,
    artistImageUrl: 'javascript:alert(1)',
  })

  assert.equal(safe?.artistImageUrl, 'https://example.com/artist.webp')
  assert.equal(unsafe?.artistImageUrl, null)
})
