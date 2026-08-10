<script setup lang="ts">
import ReleaseArtwork from '~/components/releases/ReleaseArtwork.vue'
import type { ReleaseSummary } from '~/types/release'

defineProps<{
  artist: string
  releases: ReleaseSummary[]
}>()
</script>

<template>
  <section class="related" aria-labelledby="related-title">
    <p class="related__index">03 / SAME ARTIST</p>
    <h2 id="related-title" class="related__heading">MORE BY<br>{{ artist }}</h2>
    <ol v-if="releases.length" class="related__list">
      <li v-for="release in releases" :key="release.id">
        <NuxtLink
          :to="`/releases/${encodeURIComponent(release.catalogNumber)}`"
          class="related__link"
          :aria-label="`Open ${release.title} by ${release.artist}`"
        >
          <ReleaseArtwork :release="release" compact />
          <span class="related__copy">
            <span>{{ release.catalogNumber }}</span>
            <strong>{{ release.title }}</strong>
          </span>
          <span class="related__arrow" aria-hidden="true">↗</span>
        </NuxtLink>
      </li>
    </ol>
    <p v-else class="related__empty">No other catalogue entries by this artist yet.</p>
  </section>
</template>

<style scoped>
.related__index,
.related__empty { color: var(--color-muted); font-family: var(--font-mono); font-size: .6875rem; letter-spacing: .08em; }
.related__index { margin: 0 0 2rem; }
.related__heading { margin: 0 0 2rem; font-size: clamp(2.5rem, 4.5vw, 5rem); font-weight: 500; line-height: .84; letter-spacing: -.06em; overflow-wrap: anywhere; }
.related__list { margin: 0; padding: 0; border-top: 1px solid var(--color-hairline); list-style: none; }
.related__list li { border-bottom: 1px solid var(--color-hairline); }
.related__link { display: grid; grid-template-columns: 4.5rem 1fr auto; align-items: center; gap: 1rem; min-height: 6rem; padding: .75rem 0; color: var(--color-paper); text-decoration: none; transition: padding-inline var(--duration-utility) var(--ease-standard), background var(--duration-fast) var(--ease-standard); }
.related__link:hover,
.related__link:focus-visible { padding-inline: .75rem; background: rgb(255 255 255 / 3%); }
.related__link:focus-visible { outline: 2px solid var(--color-paper); outline-offset: -2px; }
.related__copy { display: grid; gap: .25rem; min-width: 0; }
.related__copy > span { color: var(--color-muted); font-family: var(--font-mono); font-size: .625rem; letter-spacing: .08em; }
.related__copy strong { font-size: clamp(1rem, 1.4vw, 1.25rem); font-weight: 500; line-height: 1; overflow-wrap: anywhere; }
.related__arrow { color: var(--color-muted); }
.related__empty { margin: 0; padding-top: 1rem; border-top: 1px solid var(--color-hairline); line-height: 1.5; }
</style>
