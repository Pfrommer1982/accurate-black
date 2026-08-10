export default defineNuxtPlugin((nuxtApp) => {
  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'

  const resetInitialPosition = () => {
    // Keep hash landings (e.g. /#releases after closing a release) intact.
    if (window.location.hash) return
    window.scrollTo({ left: 0, top: 0, behavior: 'auto' })
  }

  const forceTopUnlessHash = () => {
    if (window.location.hash) return
    resetInitialPosition()
    // iOS Safari / BFCache can restore scroll after the first paint.
    requestAnimationFrame(resetInitialPosition)
    window.setTimeout(resetInitialPosition, 50)
    window.setTimeout(resetInitialPosition, 220)
  }

  forceTopUnlessHash()

  window.addEventListener('pageshow', () => {
    forceTopUnlessHash()
  })

  nuxtApp.hook('app:mounted', () => {
    forceTopUnlessHash()
  })
})
