import { deleteApp, initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, limit, orderBy, query, terminate } from 'firebase/firestore'
import { xml2js } from 'xml-js'
import {
  mapAccurateSessionDocuments,
  mapTechtonicRssItems,
  rssItemsFrom,
  type BroadcastDocument,
} from '~/server/utils/broadcastContent'
import type { BroadcastEpisode } from '~/types/broadcast'

const TECHTONIC_FEED = 'https://feeds.soundcloud.com/users/soundcloud:users:198991864/sounds.rss'

const firebaseConfig = () => ({
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
})

export const getTechtonicEpisodes = async (): Promise<BroadcastEpisode[]> => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const response = await fetch(TECHTONIC_FEED, {
      headers: { accept: 'application/rss+xml, application/xml;q=0.9' },
      signal: controller.signal,
    })
    if (!response.ok) throw new Error(`SoundCloud RSS returned ${response.status}`)

    const parsed = xml2js(await response.text(), { compact: true }) as unknown
    return mapTechtonicRssItems(rssItemsFrom(parsed))
  } finally {
    clearTimeout(timeout)
  }
}

export const getAccurateSessionEpisodes = async (): Promise<BroadcastEpisode[]> => {
  const config = firebaseConfig()
  if (!config.apiKey || !config.projectId) throw new Error('Session content source is not configured')

  const app = initializeApp(config, `broadcast-content-${crypto.randomUUID()}`)
  const database = getFirestore(app)

  try {
    const snapshot = await getDocs(
      query(collection(database, 'accurate-sessions'), orderBy('sessionDate', 'desc'), limit(15)),
    )
    const documents: BroadcastDocument[] = snapshot.docs.map(document => ({
      id: document.id,
      data: document.data() as unknown,
    }))
    return mapAccurateSessionDocuments(documents)
  } finally {
    await terminate(database)
    await deleteApp(app)
  }
}
