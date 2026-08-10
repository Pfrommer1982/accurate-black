<script setup lang="ts">
import type { FeaturedRelease } from '~/types/release'

const props = defineProps<{ release: FeaturedRelease | null }>()

const portals = computed(() => [
  { index: '01', label: 'FEATURED', to: props.release ? `/releases/${props.release.catalogNumber}` : '/#releases' },
  { index: '02', label: 'RELEASES', to: '/#releases' },
  { index: '03', label: 'ARTISTS', to: '/artists' },
  { index: '04', label: 'TECHTONIC', to: '/techtonic' },
  { index: '05', label: 'SESSIONS', to: '/accurate-sessions' },
])
</script>

<template>
  <nav class="portal-nav" aria-label="Explore Accurate Black">
    <NuxtLink v-for="portal in portals" :key="portal.index" :to="portal.to" class="portal-nav__link">
      <span>{{ portal.index }}</span>
      <strong>{{ portal.label }}</strong>
      <span aria-hidden="true">↗</span>
    </NuxtLink>
  </nav>
</template>

<style scoped>
.portal-nav { grid-column: 1 / -1; grid-row: 7; z-index: 5; align-self: end; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); border-top: 1px solid var(--color-hairline); border-bottom: 1px solid var(--color-hairline); opacity: var(--hero-portal-opacity); transform: translate3d(0, var(--hero-portal-y), 0); transition: opacity 120ms linear; }
.portal-nav__link { display: grid; grid-template-columns: 2rem 1fr auto; gap: .65rem; align-items: center; min-width: 0; min-height: 3.4rem; padding: .65rem .75rem; border-right: 1px solid var(--color-hairline); color: var(--color-ash); font-family: var(--font-mono); font-size: .625rem; letter-spacing: .07em; text-decoration: none; transition: background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard); }
.portal-nav__link:last-child { border-right: 0; }
.portal-nav__link span:first-child { color: var(--color-muted); }
.portal-nav__link strong { min-width: 0; font-weight: 400; overflow: hidden; text-overflow: ellipsis; }
.portal-nav__link:hover,
.portal-nav__link:focus-visible { background: var(--color-paper); color: var(--color-void); }
.portal-nav__link:focus-visible { outline: 2px solid var(--color-paper); outline-offset: -2px; }
:global(.hero--portals-hidden) .portal-nav { pointer-events: none; }

@media (width < 768px) {
  .portal-nav { grid-column: 1 / -1; grid-row: 5; display: flex; max-width: 100%; overflow-x: auto; scroll-snap-type: x proximity; scrollbar-width: none; }
  .portal-nav::-webkit-scrollbar { display: none; }
  .portal-nav__link { flex: 0 0 44%; grid-template-columns: 1.5rem 1fr auto; min-height: 3.25rem; padding-inline: .5rem; scroll-snap-align: start; }
}

@media (prefers-reduced-motion: reduce) {
  .portal-nav { opacity: 1; transform: none; }
}
</style>
