export default defineNuxtPlugin((nuxtApp) => {
  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'

  const resetInitialPosition = () => {
    // Keep hash landings (e.g. /#releases after closing a release) intact.
    if (window.location.hash) return
    window.scrollTo({ left: 0, top: 0, behavior: 'auto' })
  }

  resetInitialPosition()
  window.addEventListener('pageshow', (event) => {
    // Back/forward with a hash should not be forced to the top.
    if (event.persisted && window.location.hash) return
    resetInitialPosition()
  })
  nuxtApp.hook('app:mounted', () => {
    resetInitialPosition()
    requestAnimationFrame(resetInitialPosition)
  })
})
