export type ServerFirebaseConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

const readEnv = (...keys: string[]): string => {
  for (const key of keys) {
    const value = process.env[key]?.trim()
    if (value) return value
  }
  return ''
}

export const getServerFirebaseConfig = (): ServerFirebaseConfig => {
  const config = {
    apiKey: readEnv('NUXT_PUBLIC_FIREBASE_API_KEY', 'VITE_FIREBASE_API_KEY', 'FIREBASE_API_KEY'),
    authDomain: readEnv('NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 'VITE_FIREBASE_AUTH_DOMAIN', 'FIREBASE_AUTH_DOMAIN'),
    projectId: readEnv('NUXT_PUBLIC_FIREBASE_PROJECT_ID', 'VITE_FIREBASE_PROJECT_ID', 'FIREBASE_PROJECT_ID'),
    storageBucket: readEnv('NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET', 'VITE_FIREBASE_STORAGE_BUCKET', 'FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: readEnv(
      'NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
      'VITE_FIREBASE_MESSAGING_SENDER_ID',
      'FIREBASE_MESSAGING_SENDER_ID',
    ),
    appId: readEnv('NUXT_PUBLIC_FIREBASE_APP_ID', 'VITE_FIREBASE_APP_ID', 'FIREBASE_APP_ID'),
  }

  if (!config.apiKey || !config.projectId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Firebase is not configured on the server (missing API key / project id env vars)',
    })
  }

  return config
}
