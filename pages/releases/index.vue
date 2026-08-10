<script setup lang="ts">
import ReleaseIndexHeader from '~/components/releases/ReleaseIndexHeader.vue'
import ReleaseWall from '~/components/releases/ReleaseWall.vue'
import type { ReleaseCatalogueResponse } from '~/types/release'

const { data, pending, error } = await useFetch<ReleaseCatalogueResponse>('/api/releases', {
  key: 'release-catalogue',
  default: () => ({ releases: [] }),
})

const releases = computed(() => data.value?.releases ?? [])

usePageSeo(
  'Releases',
  'Explore the Accurate Black catalogue of underground electronic music releases.',
  () => releases.value[0]?.artworkUrl,
  { path: '/releases' },
)
</script>

<template>
  <article class="release-index">
    <ReleaseIndexHeader :releases="releases" eyebrow="[02] / CATALOGUE" />
    <div v-if="pending" class="release-index__state" role="status">Resolving public archive…</div>
    <div v-else-if="error" class="release-index__state" role="alert">The release archive is temporarily unavailable.</div>
    <ReleaseWall v-else-if="releases.length" :releases="releases" />
    <div v-else class="release-index__state">No releases are available right now.</div>
  </article>
</template>

<style scoped>
.release-index {
  min-height: 100vh;
  padding-top: var(--header-height);
  overflow: clip;
  background: var(--color-void);
}

.release-index__state {
  min-height: 16rem;
  padding: 2rem var(--page-margin);
  border-top: 1px solid var(--color-hairline);
  color: var(--color-ash);
  font-family: var(--font-mono);
  font-size: .75rem;
  letter-spacing: .07em;
}
</style>
