<script setup lang="ts">
import type { FeaturedRelease } from '~/types/release'

defineProps<{ release: FeaturedRelease }>()
</script>

<template>
  <figure class="catalogue-preview">
    <img
      :key="release.id"
      :src="release.artworkUrl"
      :alt="`Release artwork for ${release.title} by ${release.artist}`"
      class="catalogue-preview__image"
      width="480"
      height="480"
      loading="lazy"
      decoding="async"
    >
    <figcaption class="sr-only">{{ release.title }} by {{ release.artist }}</figcaption>
  </figure>
</template>

<style scoped>
.catalogue-preview {
  display: grid;
  place-items: center;
  width: min(31vw, 52svh, 30rem);
  max-width: 100%;
  aspect-ratio: 1;
  margin: 0;
  background: var(--color-carbon);
  contain: layout paint;
}

.catalogue-preview__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (width < 1100px) {
  .catalogue-preview { width: min(42vw, 26.25rem); }
}
</style>
