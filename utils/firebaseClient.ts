import { getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { cleanEnvValue } from '~/utils/envValue'

let clientApp: FirebaseApp | null = null

export const getFirebaseClientApp = (): FirebaseApp => {
  if (clientApp) return clientApp

  const runtime = useRuntimeConfig()
  const apiKey = cleanEnvValue(runtime.public.firebaseApiKey || import.meta.env.VITE_FIREBASE_API_KEY)
  const projectId = cleanEnvValue(runtime.public.firebaseProjectId || import.meta.env.VITE_FIREBASE_PROJECT_ID)

  if (!apiKey || !projectId) {
    throw new Error('Firebase client is not configured (missing public Firebase env vars)')
  }

  clientApp = getApps()[0] ?? initializeApp({
    apiKey,
    authDomain: cleanEnvValue(runtime.public.firebaseAuthDomain || import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
    projectId,
    storageBucket: cleanEnvValue(runtime.public.firebaseStorageBucket || import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
    messagingSenderId: cleanEnvValue(runtime.public.firebaseMessagingSenderId || import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
    appId: cleanEnvValue(runtime.public.firebaseAppId || import.meta.env.VITE_FIREBASE_APP_ID),
  })

  return clientApp
}
