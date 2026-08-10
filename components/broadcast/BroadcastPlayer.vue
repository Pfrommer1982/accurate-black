<script setup lang="ts">
import type { BroadcastEpisode } from '~/types/broadcast'

withDefaults(defineProps<{
  episode: BroadcastEpisode
  compact?: boolean
}>(), {
  compact: false,
})
</script>

<template>
  <span class="broadcast-player" :class="{ 'broadcast-player--compact': compact }">
    <iframe
      :src="episode.embedUrl"
      :title="`Listen to ${episode.title} on SoundCloud`"
      width="100%"
      height="166"
      scrolling="no"
      frameborder="0"
      allow="autoplay"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    />
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

.broadcast-player iframe {
  display: block;
  width: 100%;
  height: 166px;
  border: 0;
}

.broadcast-player--compact iframe { height: 120px; }

@media (width < 700px) {
  .broadcast-player--compact iframe { height: 140px; }
}
</style>
