import { cleanEnvValue } from '~/utils/envValue'

export type ServerFirebaseConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

export { cleanEnvValue }

const readEnv = (...keys: string[]): string => {
  for (const key of keys) {
    const value = cleanEnvValue(process.env[key])
    if (value) return value
  }
  return ''
}

export const getServerFirebaseConfig = (): ServerFirebaseConfig => {
  const runtime = useRuntimeConfig()
  const publicConfig = runtime.public as Record<string, unknown>

  const config = {
    apiKey: cleanEnvValue(publicConfig.firebaseApiKey)
      || readEnv('NUXT_PUBLIC_FIREBASE_API_KEY', 'VITE_FIREBASE_API_KEY', 'FIREBASE_API_KEY'),
    authDomain: cleanEnvValue(publicConfig.firebaseAuthDomain)
      || readEnv('NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 'VITE_FIREBASE_AUTH_DOMAIN', 'FIREBASE_AUTH_DOMAIN'),
    projectId: cleanEnvValue(publicConfig.firebaseProjectId)
      || readEnv('NUXT_PUBLIC_FIREBASE_PROJECT_ID', 'VITE_FIREBASE_PROJECT_ID', 'FIREBASE_PROJECT_ID'),
    storageBucket: cleanEnvValue(publicConfig.firebaseStorageBucket)
      || readEnv('NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET', 'VITE_FIREBASE_STORAGE_BUCKET', 'FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: cleanEnvValue(publicConfig.firebaseMessagingSenderId)
      || readEnv(
        'NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
        'VITE_FIREBASE_MESSAGING_SENDER_ID',
        'FIREBASE_MESSAGING_SENDER_ID',
      ),
    appId: cleanEnvValue(publicConfig.firebaseAppId)
      || readEnv('NUXT_PUBLIC_FIREBASE_APP_ID', 'VITE_FIREBASE_APP_ID', 'FIREBASE_APP_ID'),
  }

  if (!config.apiKey || !config.projectId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Firebase is not configured on the server (missing API key / project id env vars)',
    })
  }

  return config
}
