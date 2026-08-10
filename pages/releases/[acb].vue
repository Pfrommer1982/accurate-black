<script setup lang="ts">
import ReleaseSplitDetail from '~/components/releases/ReleaseSplitDetail.vue'
import type { ReleaseDetailResponse } from '~/types/release'

definePageMeta({ middleware: 'release-canonical' })

const route = useRoute()
const rawCatalogNumber = String(route.params.acb ?? '').trim()
const catalogNumber = rawCatalogNumber.toUpperCase()

const { data, error } = await useFetch<ReleaseDetailResponse>(
  `/api/releases/${encodeURIComponent(catalogNumber)}`,
  { key: `release-${catalogNumber}` },
)

if (error.value || !data.value?.release) {
  const statusCode = error.value?.statusCode === 404 ? 404 : 503
  throw createError({
    statusCode,
    statusMessage: statusCode === 404 ? 'Release not found' : 'Release temporarily unavailable',
  })
}

const release = computed(() => data.value!.release)
const relatedReleases = computed(() => data.value?.relatedReleases ?? [])
const canonicalUrl = computed(() => `https://www.accurateblack.nl/releases/${encodeURIComponent(release.value.catalogNumber)}`)
const seoDescription = computed(() => release.value.description
  || `${release.value.title} by ${release.value.artist}, released by Accurate Black.`)

usePageSeo(
  () => `${release.value.artist} - ${release.value.title}`,
  seoDescription,
  () => release.value.artworkUrl,
  {
    path: () => `/releases/${encodeURIComponent(release.value.catalogNumber)}`,
    type: 'music.album',
  },
)

useHead({
  bodyAttrs: { class: 'release-detail-route' },
  script: [{
    key: 'release-jsonld',
    type: 'application/ld+json',
    children: computed(() => JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'MusicAlbum',
      name: release.value.title,
      catalogNumber: release.value.catalogNumber,
      byArtist: { '@type': 'MusicGroup', name: release.value.artist },
      recordLabel: {
        '@type': 'RecordLabel',
        name: 'Accurate Black',
        url: 'https://www.accurateblack.nl/',
      },
      image: release.value.artworkUrl,
      url: canonicalUrl.value,
      description: seoDescription.value,
      datePublished: release.value.year || undefined,
      numTracks: release.value.tracks.length || undefined,
      track: release.value.tracks.map(track => ({
        '@type': 'MusicRecording',
        position: track.position,
        name: track.title,
      })),
    })),
  }],
})

onMounted(() => {
  requestAnimationFrame(() => document.getElementById('release-title')?.focus({ preventScroll: true }))
})
</script>

<template>
  <div class="release-detail-page">
    <ReleaseSplitDetail :release="release" :related-releases="relatedReleases" />
  </div>
</template>

<style scoped>
.release-detail-page {
  min-height: 100vh;
  padding-top: var(--header-height);
  overflow: clip;
  background: var(--color-void);
}

:global(body.release-detail-route .site-header) { pointer-events: none; }
:global(body.release-detail-route .site-header__logo),
:global(body.release-detail-route .menu-button) { pointer-events: auto; }
</style>
