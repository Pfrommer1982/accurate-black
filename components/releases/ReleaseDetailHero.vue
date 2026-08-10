<script setup lang="ts">
import ReleaseActions from '~/components/releases/ReleaseActions.vue'
import ReleaseArtwork from '~/components/releases/ReleaseArtwork.vue'
import type { ReleaseDetail } from '~/types/release'

defineProps<{ release: ReleaseDetail }>()
</script>

<template>
  <header class="release-hero">
    <div class="release-hero__rail">
      <NuxtLink to="/releases" class="release-hero__back">← ALL RELEASES</NuxtLink>
      <span>{{ release.catalogNumber }}</span>
      <span v-if="release.year">{{ release.year }}</span>
    </div>

    <p class="release-hero__artist">{{ release.artist }}</p>
    <h1 id="release-title" class="release-hero__title" tabindex="-1">{{ release.title }}</h1>

    <div class="release-hero__art">
      <ReleaseArtwork :release="release" eager />
    </div>

    <div class="release-hero__summary">
      <p>CATALOGUE OBJECT</p>
      <dl>
        <div><dt>CATALOGUE</dt><dd>{{ release.catalogNumber }}</dd></div>
        <div><dt>ARTIST</dt><dd>{{ release.artist }}</dd></div>
        <div v-if="release.year"><dt>YEAR</dt><dd>{{ release.year }}</dd></div>
        <div><dt>TRACKS</dt><dd>{{ String(release.tracks.length).padStart(2, '0') }}</dd></div>
      </dl>
      <ReleaseActions :links="release.links" />
    </div>
  </header>
</template>

<style scoped>
.release-hero {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 0 var(--grid-gutter);
  min-height: 100svh;
  padding: calc(var(--header-height) + 2rem) var(--page-margin) clamp(6rem, 11vw, 11rem);
}
.release-hero__rail { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr auto auto; gap: 2rem; align-items: center; padding: .75rem 0; border-top: 1px solid var(--color-hairline); color: var(--color-muted); font-family: var(--font-mono); font-size: .6875rem; letter-spacing: .08em; }
.release-hero__back { color: var(--color-ash); text-decoration: none; }
.release-hero__back:hover,
.release-hero__back:focus-visible { color: var(--color-paper); }
.release-hero__artist { grid-column: 1 / -1; margin: clamp(3rem, 6vw, 6rem) 0 .6rem; color: var(--color-ash); font-size: clamp(1rem, 1.7vw, 1.5rem); letter-spacing: .08em; }
.release-hero__title { grid-column: 1 / -1; z-index: 1; max-width: 11ch; margin: 0 0 clamp(3rem, 7vw, 7rem); font-size: clamp(4rem, 12.8vw, 12.5rem); font-weight: 600; line-height: .76; letter-spacing: -.085em; overflow-wrap: anywhere; }
.release-hero__title:focus { outline: 0; }
.release-hero__art { grid-column: 1 / span 7; min-width: 0; }
.release-hero__summary { grid-column: 9 / span 4; align-self: end; min-width: 0; }
.release-hero__summary > p { margin: 0 0 2rem; color: var(--color-muted); font-family: var(--font-mono); font-size: .6875rem; letter-spacing: .08em; }
.release-hero__summary dl { margin: 0; border-top: 1px solid var(--color-hairline); }
.release-hero__summary dl div { display: grid; grid-template-columns: 1fr 1.5fr; gap: 1rem; padding: .8rem 0; border-bottom: 1px solid var(--color-hairline); }
.release-hero__summary dt { color: var(--color-muted); font-family: var(--font-mono); font-size: .625rem; letter-spacing: .07em; }
.release-hero__summary dd { margin: 0; color: var(--color-ash); font-size: .875rem; line-height: 1.25; overflow-wrap: anywhere; }

@media (width < 900px) {
  .release-hero { grid-template-columns: repeat(6, minmax(0, 1fr)); }
  .release-hero__art { grid-column: 1 / span 4; }
  .release-hero__summary { grid-column: 5 / span 2; }
}

@media (width < 768px) {
  .release-hero { display: flex; flex-direction: column; min-height: 0; padding-top: calc(var(--header-height) + 2rem); }
  .release-hero__rail { grid-template-columns: 1fr auto; }
  .release-hero__rail span:last-child { display: none; }
  .release-hero__artist { margin-top: 4rem; }
  .release-hero__title { max-width: none; margin-bottom: 3rem; font-size: clamp(3.6rem, 19vw, 6.5rem); line-height: .79; }
  .release-hero__summary { margin-top: 3rem; }
}
</style>
