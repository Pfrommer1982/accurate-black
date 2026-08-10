<script setup lang="ts">
import ReleaseArtwork from '~/components/releases/ReleaseArtwork.vue'
import type { ReleaseSummary } from '~/types/release'

const props = defineProps<{
  release: ReleaseSummary
  index: number
  eager?: boolean
}>()

const { prefetchRelease } = useReleasePrefetch()
</script>

<template>
  <li class="release-card" :class="`release-card--position-${index % 6}`">
    <NuxtLink
      :id="`release-${release.catalogNumber}`"
      :to="`/releases/${encodeURIComponent(release.catalogNumber)}`"
      class="release-card__link"
      :aria-label="`Open ${release.catalogNumber}: ${release.title} by ${release.artist}`"
      @pointerenter="prefetchRelease(props.release.catalogNumber)"
      @focus="prefetchRelease(props.release.catalogNumber)"
    >
      <span class="release-card__index">{{ String(index + 1).padStart(2, '0') }}</span>
      <ReleaseArtwork :release="release" :eager="eager" />
      <span class="release-card__rule" aria-hidden="true" />
      <span class="release-card__meta">
        <span>{{ release.catalogNumber }}</span>
        <span v-if="release.year">{{ release.year }}</span>
      </span>
      <span class="release-card__artist">{{ release.artist }}</span>
      <span class="release-card__title">{{ release.title }}</span>
      <span class="release-card__open" aria-hidden="true">OPEN RELEASE <span>↗</span></span>
    </NuxtLink>
  </li>
</template>

<style scoped>
.release-card { min-width: 0; list-style: none; }
.release-card--position-0 { grid-column: 1 / span 6; }
.release-card--position-1 { grid-column: 8 / span 5; margin-top: clamp(5rem, 12vw, 12rem); }
.release-card--position-2 { grid-column: 2 / span 4; margin-top: clamp(2rem, 5vw, 5rem); }
.release-card--position-3 { grid-column: 6 / span 6; margin-top: clamp(8rem, 16vw, 15rem); }
.release-card--position-4 { grid-column: 9 / span 4; margin-top: clamp(2rem, 6vw, 6rem); }
.release-card--position-5 { grid-column: 1 / span 5; margin-top: clamp(8rem, 13vw, 12rem); }

.release-card__link {
  position: relative;
  display: flex;
  flex-direction: column;
  color: var(--color-paper);
  text-decoration: none;
}

.release-card__index {
  position: absolute;
  top: 0;
  right: calc(100% + .75rem);
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .08em;
  writing-mode: vertical-rl;
}

.release-card__rule {
  width: 100%;
  height: 1px;
  margin-top: 1rem;
  background: var(--color-hairline);
  transform: scaleX(.16);
  transform-origin: left;
  transition: transform 480ms var(--ease-reveal), background-color var(--duration-fast) var(--ease-standard);
}

.release-card__meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: .7rem;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .6875rem;
  letter-spacing: .07em;
}

.release-card__artist {
  margin-top: 1.5rem;
  color: var(--color-ash);
  font-size: clamp(.8rem, 1vw, 1rem);
  letter-spacing: .06em;
}

.release-card__title {
  max-width: 16ch;
  margin-top: .25rem;
  font-size: clamp(2.1rem, 4.35vw, 5rem);
  font-weight: 500;
  line-height: .86;
  letter-spacing: -.065em;
  overflow-wrap: anywhere;
}

.release-card__open {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  min-height: 2.75rem;
  margin-top: 1.5rem;
  padding: .75rem 0;
  border-top: 1px solid var(--color-hairline);
  border-bottom: 1px solid var(--color-hairline);
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .08em;
  transition: color var(--duration-fast) var(--ease-standard), padding-inline var(--duration-utility) var(--ease-standard);
}

.release-card__link:hover .release-card__rule,
.release-card__link:focus-visible .release-card__rule { background: var(--color-signal); transform: scaleX(1); }

.release-card__link:hover .release-card__open,
.release-card__link:focus-visible .release-card__open { padding-inline: .75rem; color: var(--color-paper); }

.release-card__link:focus-visible { outline: 2px solid var(--color-paper); outline-offset: .5rem; }

@media (width < 1100px) {
  .release-card--position-0 { grid-column: 1 / span 4; }
  .release-card--position-1 { grid-column: 4 / span 3; }
  .release-card--position-2 { grid-column: 1 / span 3; }
  .release-card--position-3 { grid-column: 2 / span 5; }
  .release-card--position-4 { grid-column: 4 / span 3; }
  .release-card--position-5 { grid-column: 1 / span 4; }
}

@media (width < 768px) {
  .release-card,
  .release-card--position-0,
  .release-card--position-1,
  .release-card--position-2,
  .release-card--position-3,
  .release-card--position-4,
  .release-card--position-5 {
    grid-column: 1;
    margin-top: 0;
  }

  .release-card__index { display: none; }
  .release-card__title { max-width: none; font-size: clamp(2.25rem, 12vw, 4.25rem); }
}

@media (prefers-reduced-motion: reduce) {
  .release-card__rule,
  .release-card__open { transition: none; }
}
</style>
