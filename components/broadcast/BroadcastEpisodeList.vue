<script setup lang="ts">
import BroadcastEpisodeStrip from '~/components/broadcast/BroadcastEpisodeStrip.vue'
import type { BroadcastEpisode } from '~/types/broadcast'

defineProps<{ episodes: BroadcastEpisode[] }>()

const list = ref<HTMLOListElement | null>(null)
const { isReady, isVisible } = useOnceInView(list)
</script>

<template>
  <ol
    ref="list"
    class="broadcast-list"
    :class="{
      'broadcast-list--ready': isReady,
      'broadcast-list--visible': isVisible,
    }"
    aria-label="Previous broadcasts"
  >
    <BroadcastEpisodeStrip
      v-for="(episode, index) in episodes"
      :key="episode.id"
      :episode="episode"
      :index="index"
      :style="{ '--broadcast-order': Math.min(index, 8) }"
    />
  </ol>
</template>

<style scoped>
.broadcast-list { margin: 0; padding: 0; overflow: hidden; list-style: none; }

.broadcast-list :deep(.broadcast-strip) {
  clip-path: inset(0);
  transition: clip-path 900ms var(--ease-reveal) calc(var(--broadcast-order) * 100ms);
}

.broadcast-list--ready:not(.broadcast-list--visible) :deep(.broadcast-strip) { clip-path: inset(0 100% 0 0); }
.broadcast-list--ready:not(.broadcast-list--visible) :deep(.broadcast-strip:nth-child(even)) { clip-path: inset(0 0 0 100%); }

@media (prefers-reduced-motion: reduce) {
  .broadcast-list :deep(.broadcast-strip) { clip-path: none !important; transition: none; }
}
</style>
