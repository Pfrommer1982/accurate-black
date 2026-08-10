export interface FeaturedRelease {
  id: string
  catalogNumber: string
  artist: string
  title: string
  artworkUrl: string
  description: string
  year: string | null
}

export type ReleaseSummary = FeaturedRelease

export interface ReleaseTrack {
  position: number
  title: string
  audio: ReleaseTrackAudio | null
}

export interface ReleaseTrackAudio {
  provider: 'spotify'
  previewUrl: string
  providerUri: string
  durationMs: number
}

export interface ReleaseLink {
  kind: 'stream' | 'buy' | 'video'
  label: string
  url: string
}

export interface ReleasePlayer {
  provider: 'spotify' | 'soundcloud'
  embedUrl: string
  title: string
}

export interface ReleaseDetail extends ReleaseSummary {
  artistImageUrl: string | null
  tracks: ReleaseTrack[]
  links: ReleaseLink[]
  player: ReleasePlayer | null
}

export interface ReleaseCatalogueResponse {
  releases: ReleaseSummary[]
}

export interface ReleaseDetailResponse {
  release: ReleaseDetail
  relatedReleases: ReleaseSummary[]
}

export interface FeaturedReleaseResponse {
  release: FeaturedRelease | null
}

export type ArtistSocialProvider = 'Spotify' | 'SoundCloud' | 'Instagram' | 'YouTube' | 'Facebook' | 'TikTok' | 'X' | 'Beatport'
export interface ArtistLink { provider: ArtistSocialProvider, url: string }
export interface ArtistSummary { id: string, name: string, imageUrl: string | null, releaseCount: number, latestRelease: ReleaseSummary }
export interface ArtistDetail extends ArtistSummary { bio: string | null, links: ArtistLink[], releases: ReleaseSummary[] }
export interface ArtistIndexResponse { artists: ArtistSummary[] }
export interface ArtistDetailResponse { artist: ArtistDetail }
