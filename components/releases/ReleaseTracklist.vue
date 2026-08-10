<script setup lang="ts">
import type { ReleaseTrack } from '~/types/release'

defineProps<{ tracks: ReleaseTrack[] }>()
</script>

<template>
  <section class="tracklist" aria-labelledby="tracklist-title">
    <p class="tracklist__index">01 / TRACKLIST</p>
    <h2 id="tracklist-title" class="tracklist__heading">TRACKS</h2>
    <ol v-if="tracks.length" class="tracklist__list">
      <li v-for="track in tracks" :key="`${track.position}-${track.title}`">
        <span>{{ String(track.position).padStart(2, '0') }}</span>
        <span>{{ track.title }}</span>
      </li>
    </ol>
    <p v-else class="tracklist__empty">Tracklist unavailable.</p>
  </section>
</template>

<style scoped>
.tracklist__index,
.tracklist__empty { color: var(--color-muted); font-family: var(--font-mono); font-size: .6875rem; letter-spacing: .08em; }
.tracklist__index { margin: 0 0 2rem; }
.tracklist__heading { margin: 0 0 2rem; font-size: clamp(3rem, 6vw, 6rem); font-weight: 500; line-height: .82; letter-spacing: -.065em; }
.tracklist__list { margin: 0; padding: 0; border-top: 1px solid var(--color-hairline); list-style: none; }
.tracklist__list li { display: grid; grid-template-columns: 3.5rem 1fr; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--color-hairline); }
.tracklist__list li span:first-child { color: var(--color-muted); font-family: var(--font-mono); font-size: .6875rem; letter-spacing: .08em; }
.tracklist__list li span:last-child { color: var(--color-ash); font-size: clamp(1rem, 1.5vw, 1.3rem); line-height: 1.2; }
.tracklist__empty { margin: 0; padding-top: 1rem; border-top: 1px solid var(--color-hairline); }
</style>
