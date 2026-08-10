import { deleteApp, initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, limit, orderBy, query, terminate } from 'firebase/firestore'
import {
  findReleaseDetail,
  mapReleaseCatalogue,
  normaliseCatalogueNumber,
  type ReleaseDocument,
} from '~/server/utils/releaseContent'
import { enrichSpotifyReleaseTracks } from '~/server/utils/spotifyTrackEnrichment'
import type { ReleaseDetailResponse, ReleaseSummary } from '~/types/release'

const MAX_PUBLIC_RELEASES = 160

const firebaseConfig = () => ({
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
})

export const getPublicReleaseDocuments = async (): Promise<ReleaseDocument[]> => {
  const config = firebaseConfig()
  if (!config.apiKey || !config.projectId) throw new Error('Release content source is not configured')

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
