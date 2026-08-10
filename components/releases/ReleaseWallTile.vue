<script setup lang="ts">
import ReleaseArtwork from '~/components/releases/ReleaseArtwork.vue'
import type { ReleaseSummary } from '~/types/release'

defineProps<{
  release: ReleaseSummary
  eager?: boolean
  revealOrder?: number
}>()
</script>

<template>
  <li class="release-wall-tile" :style="{ '--release-reveal-order': revealOrder ?? 0 }">
    <NuxtLink
      :id="`release-${release.catalogNumber}`"
      :to="`/releases/${encodeURIComponent(release.catalogNumber)}`"
      class="release-wall-tile__link"
      :aria-label="`Open ${release.catalogNumber}: ${release.title} by ${release.artist}`"
    >
      <ReleaseArtwork :release="release" :eager="eager" />
      <span class="release-wall-tile__overlay" aria-hidden="true">
        <span>{{ release.catalogNumber }}</span>
        <strong>{{ release.title }}</strong>
        <span>{{ release.artist }}</span>
        <i class="release-wall-tile__direction">↗</i>
      </span>
    </NuxtLink>
  </li>
</template>

<style scoped>
.release-wall-tile { min-width: 0; list-style: none; }

.release-wall-tile__link {
  position: relative;
  display: block;
  aspect-ratio: 1;
  background: var(--color-carbon);
  color: var(--color-paper);
  text-decoration: none;
}

.release-wall-tile__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: .25rem;
  padding: .65rem;
  background: rgb(8 8 8 / 86%);
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-standard);
}

.release-wall-tile__overlay span {
  font-family: var(--font-mono);
  font-size: .5625rem;
  line-height: 1.2;
  letter-spacing: .06em;
}

.release-wall-tile__overlay strong {
  font-size: clamp(.75rem, 1vw, 1rem);
  font-weight: 600;
  line-height: .95;
  overflow-wrap: anywhere;
}

.release-wall-tile__direction {
  position: absolute;
  top: .65rem;
  right: .65rem;
  color: var(--color-paper);
  font-family: var(--font-mono);
  font-size: .75rem;
  font-style: normal;
  transition: transform var(--duration-fast) var(--ease-standard);
}

.release-wall-tile__link:hover .release-wall-tile__overlay,
.release-wall-tile__link:focus-visible .release-wall-tile__overlay { opacity: 1; }

.release-wall-tile__link:hover .release-wall-tile__direction,
.release-wall-tile__link:focus-visible .release-wall-tile__direction { transform: translate(3px, -3px); }

.release-wall-tile__link:focus-visible {
  z-index: 2;
  outline: 3px solid var(--color-paper);
  outline-offset: -3px;
}

@media (hover: none) {
  .release-wall-tile__overlay { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .release-wall-tile__overlay,
  .release-wall-tile__direction { transition: none; }
}
</style>
