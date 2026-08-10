const warmed = new Set<string>()

export const useReleasePrefetch = () => {
  const prefetchRelease = (catalogNumber: string) => {
    const key = catalogNumber.trim().toUpperCase()
    if (!key || warmed.has(key) || !import.meta.client) return
    warmed.add(key)

    const path = `/releases/${encodeURIComponent(key)}`
    void preloadRouteComponents(path)
    void $fetch(`/api/releases/${encodeURIComponent(key)}`).catch(() => {
      warmed.delete(key)
    })
  }

  return { prefetchRelease }
}
