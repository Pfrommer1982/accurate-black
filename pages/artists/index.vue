<script setup lang="ts">
import type { ArtistIndexResponse } from '~/types/release'

const { data, pending, error } = await useFetch<ArtistIndexResponse>('/api/artists', {
  key: 'artist-index', default: () => ({ artists: [] }),
})
const artists = computed(() => data.value?.artists ?? [])
usePageSeo(
  'Artists',
  'Explore the artists releasing on Accurate Black.',
  () => artists.value[0]?.imageUrl ?? artists.value[0]?.latestRelease.artworkUrl,
  { path: '/artists' },
)
</script>

<template>
  <article class="artist-index" aria-labelledby="artist-index-title">
    <header class="artist-index__head">
      <div class="artist-index__rail"><span>[01] / ARTIST ARCHIVE</span><span>{{ artists.length }} ARTISTS</span></div>
      <h1 id="artist-index-title">ARTIST<br><span>INDEX</span></h1>
      <p>ACCURATE BLACK / ARTISTS</p>
    </header>
    <p v-if="pending" class="artist-index__state" role="status">Resolving artist archive…</p>
    <p v-else-if="error" class="artist-index__state" role="alert">The artist archive is temporarily unavailable.</p>
    <ol v-else-if="artists.length" class="artist-wall">
      <li v-for="artist in artists" :key="artist.id">
        <NuxtLink :id="`artist-${artist.id}`" :to="`/artists/${artist.id}`" :aria-label="`Open artist page for ${artist.name}`">
          <span class="artist-wall__image"><img :src="withImageKitTransform(artist.imageUrl ?? artist.latestRelease.artworkUrl, { width: 720, quality: 70 })" :alt="`${artist.name} artist image`" width="900" height="900" loading="lazy" decoding="async"></span>
          <span class="artist-wall__copy"><strong>{{ artist.name }}</strong><small>{{ String(artist.releaseCount).padStart(2, '0') }} RELEASES / {{ artist.latestRelease.catalogNumber }}</small></span>
        </NuxtLink>
      </li>
    </ol>
    <p v-else class="artist-index__state">No artists are available right now.</p>
  </article>
</template>

<style scoped>
.artist-index { min-height: 100vh; padding-top: var(--header-height); background: var(--color-void); color: var(--color-paper); }
.artist-index__head { padding: clamp(2rem, 4vw, 4rem) var(--page-margin) 2rem; background: var(--color-paper); color: var(--color-void); }
.artist-index__rail { display: flex; justify-content: space-between; gap: 1rem; padding-bottom: .8rem; border-bottom: 1px solid currentColor; font-family: var(--font-mono); font-size: .65rem; letter-spacing: .08em; }
.artist-index h1 { margin: clamp(2rem, 5vw, 5rem) 0 0; font-size: clamp(4.5rem, 14vw, 13rem); font-weight: 700; line-height: .7; letter-spacing: -.09em; }
.artist-index h1 span { color: #777570; }
.artist-index__head > p { margin: 1rem 0 0; font-family: var(--font-mono); font-size: .65rem; letter-spacing: .08em; }
.artist-index__state { margin: 0; padding: 4rem var(--page-margin); font-family: var(--font-mono); font-size: .75rem; letter-spacing: .08em; }
.artist-wall { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 1px; margin: 0; padding: 1px 0 0; background: var(--color-hairline); list-style: none; }
.artist-wall li { min-width: 0; background: var(--color-void); }
.artist-wall a { position: relative; display: block; aspect-ratio: 1; color: var(--color-paper); text-decoration: none; }
.artist-wall__image { display: grid; place-items: center; width: 100%; height: 100%; background: var(--color-carbon); }
.artist-wall img { display: block; width: 100%; height: 100%; object-fit: contain; }
.artist-wall__copy { position: absolute; right: 0; bottom: 0; left: 0; display: grid; gap: .35rem; padding: .9rem; background: linear-gradient(transparent, rgb(0 0 0 / 90%)); transform: translateY(15%); transition: transform 220ms var(--ease-standard); }
.artist-wall strong { font-size: clamp(1rem, 1.8vw, 1.65rem); line-height: .9; letter-spacing: -.04em; overflow-wrap: anywhere; }
.artist-wall small { font-family: var(--font-mono); font-size: .55rem; letter-spacing: .06em; }
.artist-wall a:hover .artist-wall__copy, .artist-wall a:focus-visible .artist-wall__copy { transform: translateY(0); }
.artist-wall a:focus-visible { z-index: 1; outline: 3px solid var(--color-paper); outline-offset: -3px; }
@media (width < 900px) { .artist-wall { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (width < 520px) { .artist-index__rail { align-items: flex-start; flex-direction: column; } .artist-index h1 { font-size: clamp(4rem, 22vw, 6.5rem); } .artist-wall { grid-template-columns: repeat(2, minmax(0, 1fr)); } .artist-wall__copy { padding: .6rem; transform: none; } .artist-wall strong { font-size: 1rem; } }
</style>
