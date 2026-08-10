<script setup lang="ts">
import CataloguePreview from '~/components/catalogue/CataloguePreview.vue'
import CatalogueRow from '~/components/catalogue/CatalogueRow.vue'
import type { FeaturedRelease } from '~/types/release'

const props = defineProps<{ releases: FeaturedRelease[] }>()
const { prefetchRelease } = useReleasePrefetch()

const section = ref<HTMLElement | null>(null)
const { isReady, isVisible } = useOnceInView(section, '10% 0px -5%')
const activeIndex = ref(0)
const previewRelease = shallowRef<FeaturedRelease | null>(props.releases[0] ?? null)
let intentTimer: ReturnType<typeof setTimeout> | null = null
let previewRequest = 0

const activeRelease = computed(() => props.releases[activeIndex.value] ?? props.releases[0] ?? null)
const catalogueRange = computed(() => {
  if (!props.releases.length) return ''
  const newest = props.releases[0]?.catalogNumber
  const oldest = props.releases.at(-1)?.catalogNumber
  return oldest && newest && oldest !== newest ? `${oldest}—${newest}` : newest ?? ''
})

const updatePreviewWhenReady = async (release: FeaturedRelease) => {
  if (!import.meta.client || previewRelease.value?.id === release.id) {
    previewRelease.value = release
    return
  }

  const request = ++previewRequest
  const image = new Image()
  image.src = release.artworkUrl

  try {
    await image.decode()
    if (request === previewRequest) previewRelease.value = release
  } catch {
    // Keep the last complete artwork visible if the next asset cannot decode.
  }
}

const activate = (index: number) => {
  if (index < 0 || index >= props.releases.length) return
  activeIndex.value = index
  const release = props.releases[index]
  if (release) void updatePreviewWhenReady(release)
}

const queuePointerActivation = (index: number) => {
  if (intentTimer) clearTimeout(intentTimer)
  intentTimer = setTimeout(() => {
    activate(index)
    intentTimer = null
  }, 70)
}

const cancelPointerActivation = () => {
  if (!intentTimer) return
  clearTimeout(intentTimer)
  intentTimer = null
}

onBeforeUnmount(() => {
  cancelPointerActivation()
  previewRequest += 1
})
</script>

<template>
  <section
    ref="section"
    class="catalogue"
    :class="{ 'catalogue--ready': isReady, 'catalogue--visible': isVisible }"
    aria-labelledby="selected-catalogue-title"
  >
    <header class="catalogue__header">
      <p class="catalogue__index" aria-label="Section 3 of 6">03</p>
      <h2 id="selected-catalogue-title" class="catalogue__title">SELECTED CATALOGUE</h2>
      <p v-if="catalogueRange" class="catalogue__range">{{ catalogueRange }}</p>
      <NuxtLink to="/releases" class="catalogue__all">VIEW COMPLETE CATALOGUE</NuxtLink>
    </header>

    <div v-if="releases.length && activeRelease && previewRelease" class="catalogue__desktop">
      <div class="catalogue__list-wrap" :style="{ '--active-index': activeIndex }">
        <span class="catalogue__marker" aria-hidden="true" />
        <ul class="catalogue__list">
          <CatalogueRow
            v-for="(release, index) in releases"
            :key="release.id"
            :release="release"
            :active="index === activeIndex"
            :section-visible="isVisible"
            @pointer-intent="queuePointerActivation(index)"
            @pointer-leave="cancelPointerActivation"
            @focus="activate(index)"
          />
        </ul>
      </div>

      <CataloguePreview :release="previewRelease" class="catalogue__preview" />
    </div>

    <ul v-if="releases.length" class="catalogue__mobile">
      <li v-for="release in releases.slice(0, 4)" :key="release.id" class="catalogue-plate">
        <NuxtLink
          :to="`/releases/${encodeURIComponent(release.catalogNumber)}`"
          class="catalogue-plate__link"
          :aria-label="`Open ${release.catalogNumber} — ${release.title} by ${release.artist}`"
          @pointerenter="prefetchRelease(release.catalogNumber)"
          @focus="prefetchRelease(release.catalogNumber)"
        >
          <span class="catalogue-plate__meta">
            <span>{{ release.catalogNumber }}</span>
            <span v-if="release.year">{{ release.year }}</span>
          </span>
          <span class="catalogue-plate__artwork">
            <img
              :src="release.artworkUrl"
              :alt="`Release artwork for ${release.title} by ${release.artist}`"
              width="600"
              height="600"
              loading="lazy"
              decoding="async"
            >
          </span>
          <span class="catalogue-plate__artist">{{ release.artist }}</span>
          <span class="catalogue-plate__title">{{ release.title }}</span>
        </NuxtLink>
      </li>
    </ul>

    <p v-if="!releases.length" class="catalogue__empty">Catalogue temporarily unavailable.</p>
  </section>
</template>

<style scoped>
.catalogue {
  --row-height: 4.5rem;
  position: relative;
  padding: 9rem var(--page-margin) 10rem;
  background: var(--color-void);
  color: var(--color-paper);
}

.catalogue__header,
.catalogue__desktop {
  display: grid;
  grid-template-columns: var(--page-rail) repeat(10, minmax(0, 1fr)) var(--page-rail);
  gap: 0 var(--grid-gutter);
}

.catalogue__header { align-items: baseline; }
.catalogue__index { grid-column: 1; }
.catalogue__title { grid-column: 2 / 7; }
.catalogue__range { grid-column: 7 / 10; }
.catalogue__all { grid-column: 10 / 13; justify-self: end; }

.catalogue__index,
.catalogue__range,
.catalogue__all {
  margin: 0;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .6875rem;
  line-height: 1.3;
  letter-spacing: .07em;
}

.catalogue__title {
  margin: 0;
  font-size: clamp(1.25rem, 2vw, 1.75rem);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -.025em;
}

.catalogue__all {
  color: var(--color-paper);
  text-decoration: underline;
  text-decoration-color: var(--color-hairline);
  text-underline-offset: .4rem;
  transition: text-decoration-color var(--duration-direct) var(--ease-direct);
}

.catalogue__all:hover,
.catalogue__all:focus-visible { text-decoration-color: var(--color-paper); }
.catalogue__all:focus-visible { outline: 2px solid var(--color-paper); outline-offset: .4rem; }

.catalogue__desktop {
  align-items: start;
  margin-top: 4rem;
}

.catalogue__list-wrap {
  position: relative;
  grid-column: 2 / 9;
  min-width: 0;
}

.catalogue__list {
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--color-hairline);
  list-style: none;
}

.catalogue__marker {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 2px;
  height: var(--row-height);
  background: var(--color-signal);
  transform: translateY(calc(var(--active-index) * var(--row-height)));
  transition: transform var(--duration-utility) var(--ease-standard);
  pointer-events: none;
}

.catalogue__preview {
  grid-column: 9 / 13;
  justify-self: end;
}

.catalogue__mobile { display: none; }

.catalogue__empty {
  margin: 5rem 0 0 calc(var(--page-rail) + var(--grid-gutter));
  color: var(--color-ash);
}

.catalogue--ready:not(.catalogue--visible) .catalogue__header,
.catalogue--ready:not(.catalogue--visible) .catalogue__desktop,
.catalogue--ready:not(.catalogue--visible) .catalogue__mobile,
.catalogue--ready:not(.catalogue--visible) .catalogue__empty {
  opacity: 0;
  transform: translateY(.75rem);
}

.catalogue__header,
.catalogue__desktop,
.catalogue__mobile,
.catalogue__empty {
  transition: opacity var(--duration-reveal) var(--ease-reveal), transform var(--duration-reveal) var(--ease-reveal);
}

@media (width < 1100px) {
  .catalogue { --row-height: 5rem; padding-block: 7rem 8rem; }
  .catalogue__title { grid-column: 2 / 7; }
  .catalogue__range { grid-column: 7 / 9; }
  .catalogue__all { grid-column: 9 / 13; }
  .catalogue__list-wrap { grid-column: 2 / 8; }
  .catalogue__preview { grid-column: 8 / 13; }
}

@media (width < 768px) {
  .catalogue { padding-block: 6rem 7.5rem; }

  .catalogue__header { display: grid; grid-template-columns: 1fr auto; gap: 1rem; }
  .catalogue__index { grid-column: 1; grid-row: 1; }
  .catalogue__range { grid-column: 2; grid-row: 1; }
  .catalogue__title { grid-column: 1 / -1; grid-row: 2; margin-top: 1rem; font-size: 1.5rem; }
  .catalogue__all { grid-column: 1 / -1; grid-row: 3; justify-self: start; min-height: 2.75rem; margin-top: 1rem; padding-top: .75rem; }
  .catalogue__desktop { display: none; }

  .catalogue__mobile {
    display: grid;
    gap: 4rem;
    margin: 4rem 0 0;
    padding: 0;
    list-style: none;
  }

  .catalogue-plate__link {
    display: flex;
    flex-direction: column;
    color: var(--color-paper);
    text-decoration: none;
  }

  .catalogue-plate__link:focus-visible { outline: 2px solid var(--color-paper); outline-offset: .5rem; }

  .catalogue-plate__meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: .75rem;
    color: var(--color-muted);
    font-family: var(--font-mono);
    font-size: .6875rem;
    letter-spacing: .06em;
  }

  .catalogue-plate__artwork {
    display: grid;
    place-items: center;
    width: 100%;
    aspect-ratio: 1;
    margin-bottom: 1rem;
    background: var(--color-carbon);
  }

  .catalogue-plate__artwork img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .catalogue-plate__artist {
    margin-bottom: .35rem;
    color: var(--color-ash);
    font-size: .875rem;
    letter-spacing: .04em;
    text-transform: uppercase;
  }

  .catalogue-plate__title {
    font-size: clamp(1.65rem, 8vw, 2.5rem);
    line-height: .98;
    letter-spacing: -.04em;
    text-transform: uppercase;
  }

  .catalogue__empty { margin: 4rem 0 0; }
}

@media (prefers-reduced-motion: reduce) {
  .catalogue__header,
  .catalogue__desktop,
  .catalogue__mobile,
  .catalogue__empty { opacity: 1 !important; transform: none !important; transition: none; }
  .catalogue__marker { transition: none; }
}
</style>
