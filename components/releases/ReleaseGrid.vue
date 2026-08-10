<script setup lang="ts">
import ReleaseCard from '~/components/releases/ReleaseCard.vue'
import type { ReleaseSummary } from '~/types/release'

withDefaults(defineProps<{
  releases: ReleaseSummary[]
  eagerFirst?: boolean
}>(), {
  eagerFirst: false,
})
</script>

<template>
  <ol class="release-grid">
    <ReleaseCard
      v-for="(release, index) in releases"
      :key="release.id"
      :release="release"
      :index="index"
      :eager="eagerFirst && index === 0"
    />
  </ol>
</template>

<style scoped>
.release-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: clamp(5rem, 9vw, 10rem) var(--grid-gutter);
  margin: 0;
  padding: 0 var(--page-margin);
  list-style: none;
}

@media (width < 1100px) {
  .release-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); }
}

@media (width < 768px) {
  .release-grid { grid-template-columns: 1fr; gap: 6rem; }
}
</style>
