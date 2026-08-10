import type { DirectiveBinding } from 'vue'

interface ScrambleOptions {
  duration?: number
  delay?: number
  intent?: number
  trigger?: boolean
}

interface ScrambleState {
  originalTexts: string[]
  textNodes: Text[]
  frameTimer: ReturnType<typeof setInterval> | null
  intentTimer: ReturnType<typeof setTimeout> | null
  ranOnce: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onFocus: () => void
}

const CHARACTERS = '10X'
const FRAME_INTERVAL = 34
const DEFAULT_DURATION = 400
const DEFAULT_INTENT = 70
const states = new WeakMap<HTMLElement, ScrambleState>()

const getTextNodes = (root: Node): Text[] => {
  const nodes: Text[] = []
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let current = walker.nextNode()

  while (current) {
    if (current.nodeValue?.trim()) nodes.push(current as Text)
    current = walker.nextNode()
  }

  return nodes
}

const resolveOptions = (binding: DirectiveBinding<ScrambleOptions | undefined>): Required<ScrambleOptions> => ({
  duration: binding.value?.duration ?? DEFAULT_DURATION,
  delay: binding.value?.delay ?? 0,
  intent: binding.value?.intent ?? DEFAULT_INTENT,
  trigger: binding.value?.trigger ?? true,
})

const scheduleOnce = (state: ScrambleState, options: Required<ScrambleOptions>) => {
  if (state.ranOnce || !options.trigger) return
  state.ranOnce = true
  state.intentTimer = setTimeout(() => scramble(state, options.duration), options.delay)
}

const scramble = (state: ScrambleState, duration: number) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (state.frameTimer) clearInterval(state.frameTimer)

  const totalFrames = Math.max(1, Math.ceil(duration / FRAME_INTERVAL))
  let frame = 0

  state.frameTimer = setInterval(() => {
    frame += 1
    const progress = frame / totalFrames

    state.textNodes.forEach((node, nodeIndex) => {
      const original = state.originalTexts[nodeIndex] ?? ''
      node.nodeValue = [...original].map((character, characterIndex) => {
        if (!/[\p{L}\p{N}]/u.test(character)) return character
        const characterProgress = characterIndex / Math.max(original.length, 1)
        if (progress >= .35 + characterProgress * .65) return character
        return CHARACTERS[(frame + characterIndex + nodeIndex) % CHARACTERS.length]
      }).join('')
    })

    if (frame >= totalFrames) {
      if (state.frameTimer) clearInterval(state.frameTimer)
      state.frameTimer = null
      state.textNodes.forEach((node, index) => { node.nodeValue = state.originalTexts[index] ?? '' })
    }
  }, FRAME_INTERVAL)
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<HTMLElement, ScrambleOptions | undefined>('scramble', {
    getSSRProps: () => ({}),
    mounted(element, binding) {
      const textNodes = getTextNodes(element)
      const options = resolveOptions(binding)
      const state: ScrambleState = {
        textNodes,
        originalTexts: textNodes.map(node => node.nodeValue ?? ''),
        frameTimer: null,
        intentTimer: null,
        ranOnce: false,
        onMouseEnter: () => {
          state.intentTimer = setTimeout(() => scramble(state, options.duration), options.intent)
        },
        onMouseLeave: () => {
          if (state.intentTimer) clearTimeout(state.intentTimer)
        },
        onFocus: () => scramble(state, options.duration),
      }

      states.set(element, state)

      if (binding.modifiers.once) {
        scheduleOnce(state, options)
      }

      if (binding.modifiers.hover || !binding.modifiers.once) {
        element.addEventListener('mouseenter', state.onMouseEnter)
        element.addEventListener('mouseleave', state.onMouseLeave)
        element.addEventListener('focus', state.onFocus)
      }
    },
    updated(element, binding) {
      if (!binding.modifiers.once) return
      const state = states.get(element)
      if (!state) return
      scheduleOnce(state, resolveOptions(binding))
    },
    unmounted(element) {
      const state = states.get(element)
      if (!state) return
      if (state.frameTimer) clearInterval(state.frameTimer)
      if (state.intentTimer) clearTimeout(state.intentTimer)
      element.removeEventListener('mouseenter', state.onMouseEnter)
      element.removeEventListener('mouseleave', state.onMouseLeave)
      element.removeEventListener('focus', state.onFocus)
      states.delete(element)
    },
  })
})
