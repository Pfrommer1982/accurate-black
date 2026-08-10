import { deleteApp, initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, limit, orderBy, query, terminate } from 'firebase/firestore'
import { getServerFirebaseConfig } from '~/server/utils/firebaseConfig'
import {
  findReleaseDetail,
  mapReleaseCatalogue,
  normaliseCatalogueNumber,
  type ReleaseDocument,
} from '~/server/utils/releaseContent'
import { enrichSpotifyReleaseTracks } from '~/server/utils/spotifyTrackEnrichment'
import type { ReleaseDetailResponse, ReleaseSummary } from '~/types/release'

const MAX_PUBLIC_RELEASES = 160
const DOCUMENT_CACHE_TTL_MS = 120_000

let documentCache: { expiresAt: number, documents: ReleaseDocument[] } | null = null
let documentCachePromise: Promise<ReleaseDocument[]> | null = null

const fetchPublicReleaseDocuments = async (): Promise<ReleaseDocument[]> => {
  const config = getServerFirebaseConfig()
  const app = initializeApp(config, `release-content-${crypto.randomUUID()}`)
  const database = getFirestore(app)

  try {
    const snapshot = await getDocs(
      query(collection(database, 'users'), orderBy('ACB', 'desc'), limit(MAX_PUBLIC_RELEASES)),
    )
    return snapshot.docs.map(document => ({ id: document.id, data: document.data() as unknown }))
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'unknown error'
    console.error('[releases] Firestore read failed:', detail)
    throw createError({
      statusCode: 502,
      statusMessage: `Firestore catalogue read failed: ${detail.slice(0, 160)}`,
    })
  } finally {
    await terminate(database)
    await deleteApp(app)
  }
}

export const getPublicReleaseDocuments = async (): Promise<ReleaseDocument[]> => {
  const now = Date.now()
  if (documentCache && documentCache.expiresAt > now) return documentCache.documents

  if (!documentCachePromise) {
    documentCachePromise = fetchPublicReleaseDocuments()
      .then((documents) => {
        documentCache = { documents, expiresAt: Date.now() + DOCUMENT_CACHE_TTL_MS }
        return documents
      })
      .finally(() => {
        documentCachePromise = null
      })
  }

  return documentCachePromise
}

export const getReleaseCatalogue = async (): Promise<ReleaseSummary[]> => {
  return mapReleaseCatalogue(await getPublicReleaseDocuments())
}

export const getReleaseDetail = async (
  catalogNumber: string,
  options: { enrichTracks?: boolean } = {},
): Promise<ReleaseDetailResponse | null> => {
  const documents = await getPublicReleaseDocuments()
  const mappedRelease = findReleaseDetail(documents, catalogNumber)
  if (!mappedRelease) return null

  const tracks = options.enrichTracks
    ? await enrichSpotifyReleaseTracks(mappedRelease.tracks, mappedRelease.player)
    : mappedRelease.tracks

  const release = {
    ...mappedRelease,
    tracks,
  }

  const normalizedArtist = release.artist.trim().toLocaleLowerCase('en')
  const relatedReleases = mapReleaseCatalogue(documents).filter(candidate => (
    normaliseCatalogueNumber(candidate.catalogNumber) !== normaliseCatalogueNumber(release.catalogNumber)
    && candidate.artist.trim().toLocaleLowerCase('en') === normalizedArtist
  ))

  return { release, relatedReleases }
}
