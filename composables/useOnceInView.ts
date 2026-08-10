import type { Ref } from 'vue'

export const useOnceInView = (target: Ref<HTMLElement | null>, rootMargin = '0px 0px -24% 0px'): {
  isReady: Ref<boolean>
  isVisible: Ref<boolean>
} => {
  const isReady = ref(false)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    isReady.value = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isVisible.value = true
      return
    }

    if (!target.value || !('IntersectionObserver' in window)) {
      isVisible.value = true
      return
    }

    observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      isVisible.value = true
      observer?.disconnect()
      observer = null
    }, { rootMargin, threshold: .01 })

    observer.observe(target.value)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { isReady, isVisible }
}
