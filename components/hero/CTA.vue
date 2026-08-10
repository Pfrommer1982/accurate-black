<script setup lang="ts">
import type { FeaturedRelease } from '~/types/release'
defineProps<{ release: FeaturedRelease }>()
</script>

<template>
  <NuxtLink v-scramble.hover="{ duration: 220, intent: 70 }" :to="`/releases/${release.catalogNumber}`" class="hero-cta" :aria-label="`Open ${release.title} by ${release.artist}`">
    <span>OPEN RELEASE</span><span aria-hidden="true">↗</span>
  </NuxtLink>
</template>

<style scoped>
.hero-cta { grid-column: 2 / 5; grid-row: 6; z-index: 2; align-self: end; display: flex; align-items: center; justify-content: space-between; min-height: 3rem; padding: .7rem 0; border-top: 1px solid var(--color-hairline); border-bottom: 1px solid var(--color-hairline); color: var(--color-paper); font-family: var(--font-mono); font-size: .6875rem; letter-spacing: .09em; text-decoration: none; opacity: 0; animation: cta-resolve var(--duration-utility) var(--ease-standard) 700ms both; transition: border-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard); }
.hero-cta:hover,
.hero-cta:focus-visible { border-color: var(--color-signal); color: var(--color-signal); }
@keyframes cta-resolve { from { opacity: 0; transform: translateY(.5rem); } to { opacity: 1; transform: none; } }

@media (width < 768px) {
  .hero-cta { grid-column: 1 / -1; grid-row: 5; align-self: start; margin-top: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-cta { opacity: 1; animation: none; }
}
</style>
