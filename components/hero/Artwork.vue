<script setup lang="ts">
import type { FeaturedRelease } from '~/types/release'

defineProps<{
  release: FeaturedRelease
}>()
</script>

<template>
  <figure class="hero-artwork">
    <div class="hero-artwork__aperture">
      <img
        :src="release.artworkUrl"
        :alt="`Release artwork for ${release.title} by ${release.artist}`"
        class="hero-artwork__image"
        width="600"
        height="600"
        loading="eager"
        fetchpriority="high"
        decoding="async"
      >
    </div>
    <figcaption class="sr-only">Artwork for {{ release.title }} by {{ release.artist }}</figcaption>
  </figure>
</template>

<style scoped>
.hero-artwork { grid-column: 7 / 12; grid-row: 2 / 7; z-index: 2; align-self: center; justify-self: center; width: min(39vw, 58svh, 37.5rem); max-width: 100%; margin: 0; contain: layout paint; transform: translate3d(0, var(--hero-art-y), 0) scale(var(--hero-art-scale)); opacity: var(--hero-art-opacity); will-change: transform, opacity; }
.hero-artwork__aperture { aspect-ratio: 1; animation: artwork-resolve var(--duration-hero) var(--ease-reveal) 220ms both; }
.hero-artwork__image { display: block; width: 100%; height: 100%; aspect-ratio: 1; object-fit: contain; }

@keyframes artwork-resolve {
  from { opacity: 0; transform: translateY(.75rem); }
  to { opacity: 1; transform: translateY(0); }
}

@media (width < 1024px) {
  .hero-artwork { grid-column: 7 / 13; width: min(45vw, 50svh, 30rem); }
}

@media (width < 768px) {
  .hero-artwork { grid-column: 1 / -1; grid-row: 4; align-self: start; width: min(100%, 42svh, 30rem); margin: 0; transform: translate3d(0, var(--hero-mobile-art-y), 0) scale(var(--hero-mobile-art-scale)); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-artwork { opacity: 1; transform: none; }
  .hero-artwork__aperture { animation: none; }
}
</style>
