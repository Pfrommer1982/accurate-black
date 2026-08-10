import { getPublicReleaseDocuments } from '~/server/repositories/releaseRepository'
import { compareCatalogueDescending, safeHttpUrl, toReleaseSummary, type ReleaseDocument } from '~/server/utils/releaseContent'
import type { ArtistDetail, ArtistLink, ArtistSocialProvider, ArtistSummary, ReleaseSummary } from '~/types/release'

interface ArtistRecord { summary: ReleaseSummary, data: Record<string, unknown> }
const artistKey = (value: string) => value.trim().toLocaleLowerCase('en')
export const artistId = (value: string) => value.trim().toLocaleLowerCase('en').normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'artist'
const stringValue = (data: Record<string, unknown>, field: string): string | null => typeof data[field] === 'string' && (data[field] as string).trim() ? (data[field] as string).trim() : null

const providerForUrl = (url: string): ArtistSocialProvider | null => {
  const host = new URL(url).hostname.toLowerCase().replace(/^www\./, '')
  if (host === 'open.spotify.com' || host === 'spotify.com') return 'Spotify'
  if (host === 'soundcloud.com') return 'SoundCloud'
  if (host === 'instagram.com') return 'Instagram'
  if (host === 'youtube.com' || host === 'youtu.be') return 'YouTube'
  if (host === 'facebook.com') return 'Facebook'
  if (host === 'tiktok.com') return 'TikTok'
  if (host === 'x.com' || host === 'twitter.com') return 'X'
  if (host === 'beatport.com') return 'Beatport'
  return null
}

const linksFrom = (data: Record<string, unknown>): ArtistLink[] => {
  if (!Array.isArray(data.socialLinks)) return []
  const seen = new Set<string>()
  return data.socialLinks.flatMap(value => {
    const url = safeHttpUrl(value); const provider = url ? providerForUrl(url) : null
    if (!url || !provider || seen.has(url)) return []
    seen.add(url); return [{ provider, url }]
  })
}

const recordsFrom = (documents: ReleaseDocument[]): ArtistRecord[] => documents.flatMap(document => {
  if (!document.data || typeof document.data !== 'object' || Array.isArray(document.data)) return []
  const summary = toReleaseSummary(document.id, document.data)
  return summary ? [{ summary, data: document.data as Record<string, unknown> }] : []
})
const grouped = (documents: ReleaseDocument[]) => {
  const map = new Map<string, ArtistRecord[]>()
  recordsFrom(documents).forEach(record => { const key = artistKey(record.summary.artist); map.set(key, [...(map.get(key) ?? []), record]) })
  return map
}
const ordered = (records: ArtistRecord[]) => [...records].sort((a, b) => compareCatalogueDescending(a.summary, b.summary))
const makeSummary = (records: ArtistRecord[]): ArtistSummary => {
  const sorted = ordered(records); const first = sorted[0]!
  const imageUrl = sorted.map(record => safeHttpUrl(record.data.artistImageUrl)).find((url): url is string => Boolean(url)) ?? null
  return { id: artistId(first.summary.artist), name: first.summary.artist, imageUrl, releaseCount: sorted.length, latestRelease: first.summary }
}
export const getArtistIndex = async (): Promise<ArtistSummary[]> => [...grouped(await getPublicReleaseDocuments()).values()].map(makeSummary).sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }))

const recordsForRequest = (documents: ReleaseDocument[], requested: string): ArtistRecord[] | null => {
  const groups = grouped(documents)
  const byName = groups.get(artistKey(requested))
  if (byName?.length) return byName

  const requestedId = artistId(requested)
  for (const records of groups.values()) {
    if (!records.length) continue
    if (artistId(records[0]!.summary.artist) === requestedId) return records
  }
  return null
}

export const getArtistDetail = async (requestedName: string): Promise<ArtistDetail | null> => {
  const records = recordsForRequest(await getPublicReleaseDocuments(), requestedName)
  if (!records?.length) return null
  const sorted = ordered(records)
  const summary = makeSummary(sorted)
  const bio = sorted.map(record => stringValue(record.data, 'bio')).find((value): value is string => Boolean(value)) ?? null
  const links = sorted.flatMap(record => linksFrom(record.data)).filter((link, index, all) => all.findIndex(candidate => candidate.url === link.url) === index)
  return { ...summary, bio, links, releases: sorted.map(record => record.summary) }
}
