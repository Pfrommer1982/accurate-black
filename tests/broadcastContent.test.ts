import assert from 'node:assert/strict'
import test from 'node:test'
import {
  cleanBroadcastTitle,
  mapAccurateSessionDocuments,
  mapTechtonicRssItems,
  toTrustedSoundCloudEmbed,
} from '../server/utils/broadcastContent.ts'

test('maps plain SoundCloud content URLs to canonical trusted embeds', () => {
  const player = toTrustedSoundCloudEmbed('https://soundcloud.com/accuratemusic/techtonic-42?utm_source=clipboard')

  assert.equal(player?.sourceUrl, 'https://soundcloud.com/accuratemusic/techtonic-42')
  assert.match(player?.embedUrl ?? '', /^https:\/\/w\.soundcloud\.com\/player\/\?url=/)
  assert.equal(new URL(player!.embedUrl).searchParams.get('url'), player?.sourceUrl)
})

test('accepts stored iframe HTML but never returns raw HTML', () => {
  const player = toTrustedSoundCloudEmbed('<iframe src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Faccuratemusic%2Fsession-12&amp;color=%23ff5500"></iframe>')

  assert.equal(player?.sourceUrl, 'https://soundcloud.com/accuratemusic/session-12')
  assert.equal(JSON.stringify(player).includes('<iframe'), false)
})

test('accepts legacy SoundCloud API track embeds used by Accurate Sessions', () => {
  const player = toTrustedSoundCloudEmbed('<iframe width="100%" height="166" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1234567890&amp;color=%23ff5500"></iframe>')

  assert.equal(player?.sourceUrl, 'https://soundcloud.com/tracks/1234567890')
  assert.equal(new URL(player!.embedUrl).searchParams.get('url'), 'https://api.soundcloud.com/tracks/1234567890')
  assert.equal(JSON.stringify(player).includes('<iframe'), false)
})

test('rejects untrusted, insecure and malformed player sources', () => {
  const invalid = [
    'http://soundcloud.com/accuratemusic/episode',
    'https://evil.example/accuratemusic/episode',
    'https://w.soundcloud.com/not-player/?url=https://soundcloud.com/accuratemusic/episode',
    'https://w.soundcloud.com/player/?url=https://evil.example/episode',
    'https://api.soundcloud.com/tracks/not-a-number',
    'https://api.soundcloud.com/users/1234567890',
    '<iframe src="javascript:alert(1)"></iframe>',
  ]

  invalid.forEach(value => assert.equal(toTrustedSoundCloudEmbed(value), null))
})

test('cleans verbose Techtonic RSS titles for archive display', () => {
  assert.equal(
    cleanBroadcastTitle('26-7-2026 Accurate Black Presents Robbi Altidore - Techtonic @ www.inprogressradio.com'),
    'Robbi Altidore - Techtonic',
  )
})

test('filters Techtonic RSS items, sorts newest first and caps at fifteen', () => {
  const items = Array.from({ length: 18 }, (_, index) => ({
    title: {
      _text: index === 0
        ? 'Unrelated show'
        : `${index}-1-2026 Accurate Black Presents Robbi Altidore - Techtonic ${index} @ www.inprogressradio.com`,
    },
    link: { _text: `https://soundcloud.com/accuratemusic/techtonic-${index}` },
    pubDate: { _text: new Date(Date.UTC(2026, 0, index + 1)).toUTCString() },
    guid: { _text: `episode-${index}` },
  }))

  const episodes = mapTechtonicRssItems(items)
  assert.equal(episodes.length, 15)
  assert.equal(episodes[0]?.title, 'Robbi Altidore - Techtonic 17')
  assert.equal(episodes.at(-1)?.title, 'Robbi Altidore - Techtonic 3')
})

test('maps stored sessions to safe DTOs and orders by session date', () => {
  const episodes = mapAccurateSessionDocuments([
    { id: 'older', data: { sessionLink: 'https://soundcloud.com/accuratemusic/accurate-session-01', sessionDate: '2026-01-01' } },
    { id: 'newer', data: { sessionLink: '<iframe src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Faccuratemusic%2Faccurate-session-02"></iframe>', sessionDate: { seconds: 1769904000 }, sessionTitle: 'Guest Transmission' } },
    { id: 'api-legacy', data: { sessionLink: '<iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/9988776655"></iframe>', sessionDate: '2025-12-01' } },
  ])

  assert.deepEqual(episodes.map(episode => episode.id), ['newer', 'older', 'api-legacy'])
  assert.equal(episodes[0]?.title, 'Guest Transmission')
  assert.equal(episodes[1]?.title, 'Accurate Session 01')
  assert.equal(episodes[2]?.title, 'Accurate Session')
  assert.equal(episodes[2]?.sourceUrl, 'https://soundcloud.com/tracks/9988776655')
  assert.deepEqual(Object.keys(episodes[0]!).sort(), ['embedUrl', 'id', 'publishedAt', 'sourceUrl', 'title'])
})
