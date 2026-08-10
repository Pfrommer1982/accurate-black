<script setup lang="ts">
import type { ReleaseSummary } from '~/types/release'

const props = withDefaults(defineProps<{
  release: ReleaseSummary
  eager?: boolean
  compact?: boolean
}>(), {
  eager: false,
  compact: false,
})

const transitionName = computed(() => {
  const key = props.release.catalogNumber.toLowerCase().replace(/[^a-z0-9-]/g, '-')
  return `release-${key}-artwork`
})
</script>

<template>
  <span
    class="release-artwork"
    :class="{ 'release-artwork--compact': compact }"
    :style="{ viewTransitionName: transitionName }"
  >
    <img
      :src="release.artworkUrl"
      :alt="`Release artwork for ${release.title} by ${release.artist}`"
      width="900"
      height="900"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      decoding="async"
    >
  </span>
</template>

<style scoped>
.release-artwork {
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 1;
  overflow: visible;
  background: var(--color-carbon);
  contain: layout paint;
}

.release-artwork img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.release-artwork--compact { background: #0d0d0d; }
</style>
