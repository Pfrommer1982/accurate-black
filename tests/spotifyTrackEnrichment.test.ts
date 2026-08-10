import assert from 'node:assert/strict'
import test from 'node:test'
import {
  enrichSpotifyReleaseTracks,
  pairSpotifyTracks,
  parseSpotifyEmbedTrackList,
} from '../server/utils/spotifyTrackEnrichment.ts'
import type { ReleasePlayer, ReleaseTrack } from '../types/release.ts'
import { spotifyEmbedFixture } from './fixtures/spotifyEmbed.ts'

const tracks = (titles: string[]): ReleaseTrack[] => titles.map((title, index) => ({
  position: index + 1,
  title,
  audio: null,
}))

const player: ReleasePlayer = {
  provider: 'spotify',
  embedUrl: 'https://open.spotify.com/embed/album/7xE7ppAsga750s9WepUHfw',
  title: 'Release by Artist on Spotify',
}

test('extracts only typed safe playback metadata from Spotify __NEXT_DATA__', () => {
  const parsed = parseSpotifyEmbedTrackList(spotifyEmbedFixture)

  assert.equal(parsed.length, 2)
  assert.deepEqual(parsed[0], {
    title: 'Think About Nothing',
    audio: {
      provider: 'spotify',
      previewUrl: 'https://p.scdn.co/mp3-preview/794eefb3ea67d72936d1718f58e0925e2625bbeb',
      providerUri: 'spotify:track:4IZzzMQEMXrRZzr5FBYlaQ',
      durationMs: 230000,
    },
  })
  assert.equal(JSON.stringify(parsed).includes('accessToken'), false)
})

test('rejects malformed JSON and malicious preview hosts', () => {
  assert.deepEqual(parseSpotifyEmbedTrackList('<script id="__NEXT_DATA__">{broken</script>'), [])
  const malicious = spotifyEmbedFixture.replaceAll('https://p.scdn.co/', 'https://evil.example/')
  assert.deepEqual(parseSpotifyEmbedTrackList(malicious), [])
})

test('pairs normalized title matches before using aligned-index fallback', () => {
  const providerTracks = parseSpotifyEmbedTrackList(spotifyEmbedFixture)
  const matched = pairSpotifyTracks(tracks(['THINK ABOUT NOTHING', 'Second Signal']), providerTracks)
  const fallback = pairSpotifyTracks(tracks(['Untitled A', 'Untitled B']), providerTracks)

  assert.equal(matched[0]?.audio?.providerUri, 'spotify:track:4IZzzMQEMXrRZzr5FBYlaQ')
  assert.equal(matched[1]?.audio?.providerUri, 'spotify:track:6tYVvA9Ed1z1Qq8AbCdEfG')
  assert.equal(fallback[0]?.audio?.providerUri, 'spotify:track:4IZzzMQEMXrRZzr5FBYlaQ')
  assert.equal(fallback[1]?.audio?.providerUri, 'spotify:track:6tYVvA9Ed1z1Qq8AbCdEfG')
})

test('reserves reordered exact matches before assigning index fallbacks', () => {
  const providerTracks = parseSpotifyEmbedTrackList(spotifyEmbedFixture)
  const result = pairSpotifyTracks(tracks(['Unknown intro', 'Think About Nothing']), providerTracks)

  assert.equal(result[0]?.audio, null)
  assert.equal(result[1]?.audio?.providerUri, 'spotify:track:4IZzzMQEMXrRZzr5FBYlaQ')
})

test('fails closed when titles and counts cannot establish a match', () => {
  const providerTracks = parseSpotifyEmbedTrackList(spotifyEmbedFixture)
  const result = pairSpotifyTracks(tracks(['Different title']), providerTracks)
  assert.equal(result[0]?.audio, null)
})

test('enrichment returns original readable tracks on fetch failure', async () => {
  const original = tracks(['Think About Nothing'])
  const result = await enrichSpotifyReleaseTracks(original, player, async () => {
    throw new Error('offline')
  })

  assert.deepEqual(result, original)
})

test('enrichment aborts a provider request after the configured timeout', async () => {
  const original = tracks(['Think About Nothing'])
  let aborted = false
  const result = await enrichSpotifyReleaseTracks(original, player, (_input, init) => new Promise<Response>((_resolve, reject) => {
    init?.signal?.addEventListener('abort', () => {
      aborted = true
      reject(new DOMException('Timed out', 'AbortError'))
    })
  }), 5)

  assert.equal(aborted, true)
  assert.deepEqual(result, original)
})

test('enrichment rejects untrusted collection embed URLs without fetching', async () => {
  let called = false
  const result = await enrichSpotifyReleaseTracks(tracks(['Think About Nothing']), {
    ...player,
    embedUrl: 'https://evil.example/embed/album/7xE7ppAsga750s9WepUHfw',
  }, async () => {
    called = true
    return new Response(spotifyEmbedFixture)
  })

  assert.equal(called, false)
  assert.equal(result[0]?.audio, null)
})
