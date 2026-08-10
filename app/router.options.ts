import type { RouterConfig } from '@nuxt/schema'

const HEADER_OFFSET_PX = 80

const waitForElement = async (selector: string, attempts = 40): Promise<Element | null> => {
  for (let index = 0; index < attempts; index += 1) {
    const element = document.querySelector(selector)
    if (element) return element
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
  }
  return null
}

const positionFor = (element: Element) => {
  const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX
  return { left: 0, top: Math.max(0, top), behavior: 'auto' as const }
}

export default <RouterConfig>{
  async scrollBehavior(to) {
    if (to.hash) {
      const exact = await waitForElement(to.hash)
      if (exact) return positionFor(exact)

      // Release tile anchors may still be loading; land on the homepage catalogue section.
      if (to.hash.startsWith('#release-') || to.hash === '#releases') {
        const section = await waitForElement('#releases')
        if (section) return positionFor(section)
      }
    }

    // Default: always start at the top for normal page changes.
    return { left: 0, top: 0, behavior: 'auto' }
  },
}
