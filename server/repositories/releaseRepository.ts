import { deleteApp, initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, limit, orderBy, query, terminate } from 'firebase/firestore'
import { getServerFirebaseConfig } from '~/server/utils/firebaseConfig'
import {
  findReleaseDetail,
  mapReleaseCatalogue,
  type ReleaseDocument,
} from '~/server/utils/releaseContent'
import { enrichSpotifyReleaseTracks } from '~/server/utils/spotifyTrackEnrichment'
import type { ReleaseDetailResponse, ReleaseSummary } from '~/types/release'

const MAX_PUBLIC_RELEASES = 160

export const getPublicReleaseDocuments = async (): Promise<ReleaseDocument[]> => {
  const config = getServerFirebaseConfig()
  const app = initializeApp(config, `release-content-${crypto.randomUUID()}`)
  const database = getFirestore(app)

  try {
    const snapshot = await getDocs(
      query(collection(database, 'users'), orderBy('ACB', 'desc'), limit(MAX_PUBLIC_RELEASES)),
    )
    return snapshot.docs.map(document => ({ id: document.id, data: document.data() as unknown }))
  } finally {
    await terminate(database)
    await deleteApp(app)
  }
}

export const getReleaseCatalogue = async (): Promise<ReleaseSummary[]> => {
  return mapReleaseCatalogue(await getPublicReleaseDocuments())
}

export const getReleaseDetail = async (catalogNumber: string): Promise<ReleaseDetailResponse | null> => {
  const documents = await getPublicReleaseDocuments()
  const mappedRelease = findReleaseDetail(documents, catalogNumber)
  if (!mappedRelease) return null

  const release = {
    ...mappedRelease,
    tracks: await enrichSpotifyReleaseTracks(mappedRelease.tracks, mappedRelease.player),
  }

  const normalizedArtist = release.artist.trim().toLocaleLowerCase('en')
  const relatedReleases = mapReleaseCatalogue(documents).filter(candidate => (
    normaliseCatalogueNumber(candidate.catalogNumber) !== normaliseCatalogueNumber(release.catalogNumber)
    && candidate.artist.trim().toLocaleLowerCase('en') === normalizedArtist
  ))

  return { release, relatedReleases }
}
