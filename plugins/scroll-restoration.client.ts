export default defineNuxtPlugin((nuxtApp) => {
  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'

  const resetInitialPosition = () => {
    if (!window.location.hash) window.scrollTo({ left: 0, top: 0, behavior: 'auto' })
  }

  resetInitialPosition()
  window.addEventListener('pageshow', resetInitialPosition, { once: true })
  nuxtApp.hook('app:mounted', () => {
    resetInitialPosition()
    requestAnimationFrame(resetInitialPosition)
  })
})
