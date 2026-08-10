<script setup lang="ts">
import type { ArtistDetailResponse } from '~/types/release'

definePageMeta({
  validate: (route) => {
    const value = String(route.params.artist ?? '').trim()
    // Prevent Nuxt payload/data routes from being captured as artist names.
    return Boolean(value) && !value.startsWith('_') && !value.includes('.')
  },
})

const route = useRoute()
const rawName = String(route.params.artist ?? '')
const { data, error } = await useFetch<ArtistDetailResponse>(`/api/artists/${encodeURIComponent(rawName)}`, { key: `artist-${rawName}` })
if (error.value || !data.value?.artist) throw createError({ statusCode: 404, statusMessage: 'Artist not found' })
const artist = computed(() => data.value!.artist)
const visual = computed(() => artist.value.imageUrl ?? artist.value.latestRelease.artworkUrl)
usePageSeo(
  () => `${artist.value.name} | Artists`,
  () => artist.value.bio ?? `${artist.value.name} releases on Accurate Black, an independent electronic music label.`,
  visual,
  {
    path: () => `/artists/${encodeURIComponent(artist.value.id)}`,
    type: 'profile',
  },
)

useHead({
  script: [{
    key: 'artist-jsonld',
    type: 'application/ld+json',
    children: computed(() => JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'MusicGroup',
      name: artist.value.name,
      description: artist.value.bio || `${artist.value.name} on Accurate Black.`,
      url: `https://www.accurateblack.nl/artists/${encodeURIComponent(artist.value.id)}`,
      image: visual.value || undefined,
      album: artist.value.releases.map(release => ({
        '@type': 'MusicAlbum',
        name: release.title,
        url: `https://www.accurateblack.nl/releases/${encodeURIComponent(release.catalogNumber)}`,
        image: release.artworkUrl,
        catalogNumber: release.catalogNumber,
      })),
      sameAs: artist.value.links.map(link => link.url),
      memberOf: {
        '@type': 'RecordLabel',
        name: 'Accurate Black',
        url: 'https://www.accurateblack.nl/',
      },
    })),
  }],
})
</script>

<template>
  <article class="artist-detail">
    <aside class="artist-detail__stage" :aria-label="`${artist.name} portrait`">
      <img v-if="visual" :src="visual" :alt="`${artist.name} artist image`" width="1200" height="1200">
      <p v-else>{{ artist.name }}</p>
    </aside>
    <div class="artist-detail__paper">
      <NuxtLink :to="`/artists#artist-${artist.id}`" class="artist-detail__close" aria-label="Close artist and return to index"><i /><i /></NuxtLink>
      <header><p>[ ARTIST ]</p><h1>{{ artist.name }}</h1></header>
      <dl><div><dt>ARTIST</dt><dd>{{ artist.name }}</dd></div><div><dt>RELEASES</dt><dd>{{ String(artist.releaseCount).padStart(2, '0') }}</dd></div><div><dt>LATEST</dt><dd>{{ artist.latestRelease.catalogNumber }}</dd></div></dl>
      <section><p class="artist-detail__label">[A] BIOGRAPHY</p><p>{{ artist.bio ?? 'Biography unavailable.' }}</p></section>
      <section><p class="artist-detail__label">[B] LINKS</p><nav v-if="artist.links.length"><a v-for="link in artist.links" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.provider }} ↗</a></nav><p v-else class="artist-detail__quiet">No verified links available.</p></section>
      <section class="artist-detail__releases"><p class="artist-detail__label">[C] RELEASES</p><ol><li v-for="release in artist.releases" :key="release.id"><NuxtLink :to="`/releases/${encodeURIComponent(release.catalogNumber)}`" :aria-label="`Open ${release.title} by ${release.artist}`"><img :src="release.artworkUrl" :alt="`Release artwork for ${release.title}`" width="300" height="300"><span>{{ release.catalogNumber }}<strong>{{ release.title }}</strong></span></NuxtLink></li></ol></section>
    </div>
  </article>
</template>

<style scoped>
.artist-detail { display: grid; grid-template-columns: minmax(0, 58fr) minmax(28rem, 42fr); min-height: calc(100svh - var(--header-height)); background: var(--color-void); }
.artist-detail__stage { position: sticky; top: var(--header-height-compact); display: grid; place-items: center; min-height: calc(100svh - var(--header-height-compact)); padding: clamp(2rem, 4vw, 4rem); color: var(--color-paper); }
.artist-detail__stage img { display: block; width: min(100%, calc(100svh - var(--header-height-compact) - 5rem)); max-height: calc(100svh - var(--header-height-compact) - 5rem); object-fit: contain; }
.artist-detail__stage p { margin: 0; font-size: clamp(4rem, 10vw, 10rem); font-weight: 700; line-height: .75; text-align: center; overflow-wrap: anywhere; }
.artist-detail__paper { position: relative; display: flex; flex-direction: column; min-width: 0; min-height: calc(100svh - var(--header-height)); padding: clamp(1.5rem, 2.5vw, 3rem); background: var(--color-paper); color: var(--color-void); }
.artist-detail__close { position: fixed; top: calc((var(--header-height) - 2.375rem) / 2); right: calc(var(--page-margin) + var(--header-target) + .625rem); z-index: calc(var(--z-header) + 1); display: grid; place-items: center; width: 2.375rem; height: 2.375rem; border: 1px solid var(--color-void); background: var(--color-void); color: var(--color-paper); }
.artist-detail__close i { position: absolute; width: .95rem; height: 1px; background: currentColor; } .artist-detail__close i:first-child { transform: rotate(45deg); } .artist-detail__close i:last-child { transform: rotate(-45deg); }
.artist-detail header { padding-right: 3.5rem; } .artist-detail header > p, .artist-detail__label, .artist-detail dt { margin: 0 0 .7rem; color: #777570; font-family: var(--font-mono); font-size: .625rem; letter-spacing: .08em; }
.artist-detail h1 { margin: 0 0 2rem; font-size: clamp(3.5rem, 6vw, 7rem); font-weight: 700; line-height: .76; letter-spacing: -.08em; overflow-wrap: anywhere; word-break: normal; hyphens: none; }
.artist-detail dl { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin: 0; padding: .9rem 0; border-block: 1px solid var(--color-void); } .artist-detail dl div { min-width: 0; } .artist-detail dd { margin: 0; font-family: var(--font-mono); font-size: .7rem; font-weight: 700; overflow-wrap: anywhere; }
.artist-detail section { margin-top: 2rem; } .artist-detail section > p:last-child { margin: 0; font-size: 1rem; line-height: 1.5; text-transform: none; } .artist-detail__quiet { color: #777570; font-family: var(--font-mono); font-size: .7rem !important; letter-spacing: .06em; text-transform: uppercase !important; }
.artist-detail nav { display: flex; flex-wrap: wrap; gap: .5rem; } .artist-detail nav a { min-height: 2.2rem; padding: .55rem .75rem; border: 1px solid var(--color-void); color: inherit; font-family: var(--font-mono); font-size: .625rem; letter-spacing: .07em; text-decoration: none; } .artist-detail nav a:hover, .artist-detail nav a:focus-visible { background: var(--color-void); color: var(--color-paper); }
.artist-detail__releases { margin-top: auto !important; padding-top: 3rem; } .artist-detail__releases ol { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1px; margin: 0; padding: 0; list-style: none; } .artist-detail__releases li { min-width: 0; border: 1px solid var(--color-void); } .artist-detail__releases a { display: grid; gap: .5rem; height: 100%; padding-bottom: .45rem; color: inherit; font-family: var(--font-mono); font-size: .55rem; text-decoration: none; } .artist-detail__releases a:hover, .artist-detail__releases a:focus-visible { background: #e7e5df; } .artist-detail__releases a:focus-visible { outline: 2px solid var(--color-void); outline-offset: 2px; } .artist-detail__releases img { display: block; width: 100%; aspect-ratio: 1; object-fit: contain; background: var(--color-carbon); } .artist-detail__releases span { padding-inline: .45rem; } .artist-detail__releases strong { display: block; margin-top: .2rem; font-family: inherit; font-size: .6rem; overflow-wrap: anywhere; }
@media (width < 768px) { .artist-detail { display: block; } .artist-detail__stage { position: relative; top: auto; min-height: min(100svh, 100vw); padding: 1rem; } .artist-detail__stage img { width: min(100%, calc(100svh - var(--header-height) - 2rem)); max-height: calc(100svh - var(--header-height) - 2rem); } .artist-detail__paper { min-height: 100svh; padding: 1.25rem 1rem; } .artist-detail h1 { font-size: clamp(3.1rem, 15vw, 5.5rem); } .artist-detail dl { grid-template-columns: 1fr 1fr; gap: 1rem; } .artist-detail dl div:last-child { grid-column: 1 / -1; } }
@media (width < 360px) { .artist-detail h1 { font-size: 3.25rem; } .artist-detail__releases ol { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
</style>
