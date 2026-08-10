<script setup lang="ts">
import type { BroadcastEpisode } from '~/types/broadcast'

const props = withDefaults(defineProps<{
  episode: BroadcastEpisode
  compact?: boolean
}>(), {
  compact: false,
})

const root = ref<HTMLElement | null>(null)
const shouldLoad = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  const element = root.value
  if (!element) return

  // Defer heavy SoundCloud iframes until they approach the viewport.
  if (!('IntersectionObserver' in window)) {
    shouldLoad.value = true
    return
  }

  observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    shouldLoad.value = true
    observer?.disconnect()
    observer = null
  }, { rootMargin: '240px 0px' })

  observer.observe(element)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <span
    ref="root"
    class="broadcast-player"
    :class="{ 'broadcast-player--compact': compact }"
  >
    <iframe
      v-if="shouldLoad"
      :src="props.episode.embedUrl"
      :title="`Listen to ${props.episode.title} on SoundCloud`"
      width="100%"
      height="166"
      scrolling="no"
      frameborder="0"
      allow="autoplay"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    />
    <span v-else class="broadcast-player__placeholder" aria-hidden="true" />
  </span>
</template>

<style scoped>
.broadcast-player {
  display: block;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  background: var(--color-carbon);
}

.broadcast-player iframe,
.broadcast-player__placeholder {
  display: block;
  width: 100%;
  height: 166px;
  border: 0;
}

.broadcast-player__placeholder {
  background:
    linear-gradient(90deg, transparent, rgb(255 255 255 / 4%), transparent),
    var(--color-carbon);
  background-size: 180% 100%;
  animation: player-shimmer 1.4s linear infinite;
}

.broadcast-player--compact iframe,
.broadcast-player--compact .broadcast-player__placeholder { height: 120px; }

@media (width < 700px) {
  .broadcast-player--compact iframe,
  .broadcast-player--compact .broadcast-player__placeholder { height: 140px; }
}

@keyframes player-shimmer {
  from { background-position: 100% 0; }
  to { background-position: -80% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .broadcast-player__placeholder { animation: none; }
}
</style>
