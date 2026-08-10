<script setup lang="ts">
import ReleaseWallTile from '~/components/releases/ReleaseWallTile.vue'
import type { ReleaseSummary } from '~/types/release'

defineProps<{ releases: ReleaseSummary[] }>()

const wall = ref<HTMLOListElement | null>(null)
const { isReady, isVisible } = useOnceInView(wall)
</script>

<template>
  <ol
    ref="wall"
    class="release-wall"
    :class="{
      'release-wall--ready': isReady,
      'release-wall--visible': isVisible,
    }"
    aria-label="Accurate Black release index"
  >
    <ReleaseWallTile
      v-for="(release, index) in releases"
      :key="release.id"
      :release="release"
      :eager="index < 4"
      :reveal-order="Math.min(index, 11)"
    />
  </ol>
</template>

<style scoped>
.release-wall {
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  gap: 1px;
  margin: 0;
  padding: 0;
  background: var(--color-void);
  list-style: none;
}

.release-wall :deep(.release-wall-tile) {
  transition: opacity 850ms var(--ease-reveal) calc(var(--release-reveal-order) * 85ms), clip-path 900ms var(--ease-reveal) calc(var(--release-reveal-order) * 85ms), transform 900ms var(--ease-reveal) calc(var(--release-reveal-order) * 85ms);
}

.release-wall--ready:not(.release-wall--visible) :deep(.release-wall-tile) {
  opacity: 0;
  clip-path: inset(18% 12% 18% 12%);
  transform: translateY(.75rem) scale(.97);
}

@media (width >= 1600px) {
  .release-wall { grid-template-columns: repeat(12, minmax(0, 1fr)); }
}

@media (900px <= width < 1200px) {
  .release-wall { grid-template-columns: repeat(7, minmax(0, 1fr)); }
}

@media (600px <= width < 900px) {
  .release-wall { grid-template-columns: repeat(5, minmax(0, 1fr)); }
}

@media (360px <= width < 600px) {
  .release-wall { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (width < 360px) {
  .release-wall { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (prefers-reduced-motion: reduce) {
  .release-wall :deep(.release-wall-tile) { opacity: 1 !important; clip-path: none !important; transform: none !important; transition: none; }
}
</style>
