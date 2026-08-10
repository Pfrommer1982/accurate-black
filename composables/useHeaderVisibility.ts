const HEADER_SCROLL_START = 24
const HEADER_HIDE_START = 160
const DOWNWARD_INTENT = 48
const UPWARD_INTENT = 20

export const useHeaderVisibility = (isMenuOpen: Ref<boolean>) => {
  const isScrolled = ref(false)
  const isVisible = ref(true)
  let previousY = 0
  let downwardTravel = 0
  let upwardTravel = 0
  let frameId: number | null = null

  const evaluateScroll = () => {
    frameId = null
    const currentY = Math.max(window.scrollY, 0)
    const delta = currentY - previousY
    isScrolled.value = currentY > HEADER_SCROLL_START

    if (delta > 0) {
      downwardTravel += delta
      upwardTravel = 0
      if (currentY > HEADER_HIDE_START && downwardTravel >= DOWNWARD_INTENT && !isMenuOpen.value) {
        isVisible.value = false
        downwardTravel = 0
      }
    } else if (delta < 0) {
      upwardTravel += Math.abs(delta)
      downwardTravel = 0
      if (upwardTravel >= UPWARD_INTENT) {
        isVisible.value = true
        upwardTravel = 0
      }
    }

    if (currentY <= HEADER_SCROLL_START || isMenuOpen.value) isVisible.value = true
    previousY = currentY
  }

  const handleScroll = () => {
    if (frameId === null) frameId = window.requestAnimationFrame(evaluateScroll)
  }

  onMounted(() => {
    previousY = window.scrollY
    evaluateScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
    if (frameId !== null) window.cancelAnimationFrame(frameId)
  })

  watch(isMenuOpen, (open) => {
    if (open) isVisible.value = true
  })

  return {
    isScrolled,
    isVisible,
    showHeader: () => { isVisible.value = true },
  }
}
