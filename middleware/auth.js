import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirebaseClientApp } from '~/utils/firebaseClient'

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return

  const auth = getAuth(getFirebaseClientApp())
  if (auth.currentUser) return

  const user = await new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        unsubscribe()
        resolve(currentUser)
      },
      () => {
        unsubscribe()
        resolve(null)
      },
    )
  })

  if (!user) return navigateTo('/login')
})
