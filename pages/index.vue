<script setup lang="ts">
import Hero from '~/components/Hero.vue'
import HomeLabelThesis from '~/components/home/LabelThesis.vue'
import HomePortalBanner from '~/components/home/PortalBanner.vue'
import HomeTransmissionArchive from '~/components/home/TransmissionArchive.vue'
import ReleaseIndexHeader from '~/components/releases/ReleaseIndexHeader.vue'
import ReleaseWall from '~/components/releases/ReleaseWall.vue'
import type { ReleaseCatalogueResponse } from '~/types/release'
import type { VideoCatalogueResponse } from '~/types/video'

const { data, pending, error } = await useFetch<ReleaseCatalogueResponse>('/api/releases', {
  key: 'release-catalogue',
  default: () => ({ releases: [] }),
})

const releases = computed(() => data.value?.releases ?? [])
const featuredRelease = computed(() => releases.value[0] ?? null)

const { data: videoData, pending: videosPending, error: videosError } = await useFetch<VideoCatalogueResponse>('/api/videos', {
  key: 'video-catalogue',
  default: () => ({ videos: [] }),
})

const videos = computed(() => videoData.value?.videos ?? [])

usePageSeo(
  'Independent Electronic Music Label',
  'Accurate Black is an independent label for deep, dark underground techno. Explore the catalogue, artists, radio archives, demos and DJ bookings.',
  () => releases.value[0]?.artworkUrl,
  { path: '/' },
)
</script>

<template>
  <div class="homepage">
    <Hero :release="featuredRelease" />

    <HomePortalBanner :release="featuredRelease" />

    <HomeLabelThesis />

    <section id="releases" class="homepage__releases" aria-labelledby="homepage-releases-title">
      <ReleaseIndexHeader
        :releases="releases"
        eyebrow="[03] / CATALOGUE"
        level="h2"
        title-id="homepage-releases-title"
      />
      <div v-if="pending" class="homepage__state" role="status">Resolving public archive…</div>
      <div v-else-if="error" class="homepage__state" role="alert">The release archive is temporarily unavailable.</div>
      <ReleaseWall v-else-if="releases.length" :releases="releases" />
      <div v-else class="homepage__state">No releases are available right now.</div>
    </section>

    <HomeTransmissionArchive
      :videos="videos"
      :pending="videosPending"
      :error="Boolean(videosError)"
    />
  </div>
</template>

<style scoped>
.homepage {
  --homepage-section-space: clamp(4.5rem, 7vw, 7.5rem);

  min-height: 100vh;
  /* Avoid overflow:clip here: it breaks position:sticky for the hero stage. */
  overflow-x: clip;
  background: var(--color-void);
}

.homepage :deep(.thesis) {
  min-height: auto;
  padding-block: var(--homepage-section-space);
  transform: translate3d(0, var(--hero-thesis-y, 0px), 0);
  will-change: transform;
}

.homepage__releases {
  padding-top: clamp(2.75rem, 4.5vw, 4.75rem);
  scroll-margin-top: var(--header-height);
  background: var(--color-void);
}

.homepage__state {
  min-height: 16rem;
  padding: 2rem var(--page-margin);
  border-top: 1px solid var(--color-hairline);
  color: var(--color-ash);
  font-family: var(--font-mono);
  font-size: .75rem;
  letter-spacing: .07em;
}

@media (width < 768px) {
  .homepage {
    --homepage-section-space: clamp(4.5rem, 16vw, 6rem);
  }

  .homepage__releases {
    padding-top: 2.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .homepage :deep(.thesis) { transform: none; }
}
</style>
