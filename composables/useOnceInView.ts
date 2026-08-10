import type { Ref } from 'vue'

const shouldRevealImmediately = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect()
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  // In view, or already scrolled past (restored scroll / BFCache).
  // Only keep waiting for blocks still clearly below the fold.
  return rect.top < viewportHeight - 8
}

export const useOnceInView = (
  target: Ref<HTMLElement | null>,
  rootMargin = '0px 0px -12% 0px',
): {
  isReady: Ref<boolean>
  isVisible: Ref<boolean>
} => {
  const isReady = ref(false)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null
  let safetyTimer: ReturnType<typeof setTimeout> | null = null

  const reveal = () => {
    isVisible.value = true
    if (safetyTimer) {
      clearTimeout(safetyTimer)
      safetyTimer = null
    }
    observer?.disconnect()
    observer = null
  }

  onMounted(() => {
    const element = target.value

    if (
      !element
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || !('IntersectionObserver' in window)
    ) {
      isVisible.value = true
      isReady.value = true
      return
    }

    // Reveal immediately when already on/above screen, then enable reveal CSS.
    if (shouldRevealImmediately(element)) {
      isVisible.value = true
      isReady.value = true
      return
    }

    observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      reveal()
    }, { rootMargin, threshold: 0.01 })

    observer.observe(element)
    isReady.value = true

    // Never leave content permanently clipped if IO misses (iOS / restored scroll).
    safetyTimer = setTimeout(() => {
      if (!isVisible.value) reveal()
    }, 900)
  })

  onBeforeUnmount(() => {
    if (safetyTimer) clearTimeout(safetyTimer)
    observer?.disconnect()
  })

  return { isReady, isVisible }
}
