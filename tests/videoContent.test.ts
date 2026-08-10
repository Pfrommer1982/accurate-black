import assert from 'node:assert/strict'
import test from 'node:test'
import {
  mapVideoCatalogue,
  safeVideoThumbnailUrl,
  toVideoSummary,
} from '../server/utils/videoContent.ts'

const video = (id: string, overrides: Record<string, unknown> = {}) => ({
  id: { videoId: id },
  snippet: {
    title: 'Signal &amp; Form',
    publishedAt: '2026-08-09T12:00:00Z',
    thumbnails: {
      high: { url: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` },
    },
    ...overrides,
  },
})

test('maps valid provider items into newest-first safe public DTOs', () => {
  const videos = mapVideoCatalogue({ items: [
    video('abcdefghijk', { publishedAt: '2026-08-08T12:00:00Z' }),
    video('lmnopqrstuv', { publishedAt: '2026-08-09T12:00:00Z' }),
  ] })

  assert.equal(videos.length, 2)
  assert.deepEqual(videos[0], {
    id: 'lmnopqrstuv',
    title: 'Signal & Form',
    publishedAt: '2026-08-09T12:00:00.000Z',
    thumbnailUrl: 'https://i.ytimg.com/vi/lmnopqrstuv/hqdefault.jpg',
    watchUrl: 'https://www.youtube.com/watch?v=lmnopqrstuv',
  })
  assert.equal(JSON.stringify(videos).includes('snippet'), false)
})

test('rejects malicious or mismatched thumbnail URLs', () => {
  assert.equal(safeVideoThumbnailUrl('https://evil.example/vi/abcdefghijk/hqdefault.jpg', 'abcdefghijk'), null)
  assert.equal(safeVideoThumbnailUrl('http://i.ytimg.com/vi/abcdefghijk/hqdefault.jpg', 'abcdefghijk'), null)
  assert.equal(safeVideoThumbnailUrl('https://i.ytimg.com/vi/lmnopqrstuv/hqdefault.jpg', 'abcdefghijk'), null)
})

test('rejects invalid YouTube video IDs', () => {
  assert.equal(toVideoSummary(video('too-short')), null)
  assert.equal(toVideoSummary(video('invalid$id!')), null)
})

test('drops malformed provider items without fabricating fields', () => {
  const videos = mapVideoCatalogue({ items: [
    null,
    {},
    { id: { videoId: 'abcdefghijk' }, snippet: { title: 'Missing date' } },
    video('abcdefghijk', { thumbnails: {} }),
  ] })

  assert.deepEqual(videos, [])
})
