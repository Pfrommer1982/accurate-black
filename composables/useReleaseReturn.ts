const RETURN_KEY = 'ab:release-return'

/** Remember where to land after closing a release detail. */
export const rememberReleaseReturn = (target: string) => {
  if (!import.meta.client || !target) return
  sessionStorage.setItem(RETURN_KEY, target)
}

/** Read (and keep) the close target for the current detail visit. */
export const peekReleaseReturn = (fallback = '/#releases'): string => {
  if (!import.meta.client) return fallback
  return sessionStorage.getItem(RETURN_KEY) || fallback
}
