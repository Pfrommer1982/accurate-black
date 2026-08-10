<script setup lang="ts">
import HeroCatalog from '~/components/hero/Catalog.vue'
defineProps<{ catalogNumber: string; year: string | null }>()
</script>

<template>
  <dl class="hero-metadata">
    <div><dt>CAT.</dt><dd><HeroCatalog :catalog-number="catalogNumber" /></dd></div>
    <div v-if="year"><dt>YEAR</dt><dd>{{ year }}</dd></div>
  </dl>
</template>

<style scoped>
.hero-metadata { grid-column: 12 / 13; grid-row: 3 / 5; z-index: 2; align-self: center; margin: 0; color: var(--color-ash); font-family: var(--font-mono); font-size: .6875rem; line-height: 1.3; letter-spacing: .08em; opacity: 0; animation: metadata-resolve var(--duration-reveal) var(--ease-reveal) 560ms both; }
.hero-metadata div + div { margin-top: 1.25rem; }
.hero-metadata dt { margin-bottom: .25rem; color: var(--color-muted); }
.hero-metadata dd { margin: 0; }
@keyframes metadata-resolve { from { opacity: 0; } to { opacity: 1; } }

@media (width < 768px) {
  .hero-metadata { grid-column: 1 / -1; grid-row: 3; align-self: start; justify-self: end; display: flex; gap: 2rem; padding-bottom: 0; text-align: right; }
  .hero-metadata div + div { margin-top: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-metadata { opacity: 1; animation: none; }
}
</style>
