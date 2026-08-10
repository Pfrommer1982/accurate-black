<script setup lang="ts">
import ReleaseArtwork from '~/components/releases/ReleaseArtwork.vue'
import ReleaseTracklistPlayer from '~/components/releases/ReleaseTracklistPlayer.vue'
import type { ReleaseDetail, ReleaseSummary } from '~/types/release'

const props = defineProps<{
  release: ReleaseDetail
  relatedReleases: ReleaseSummary[]
}>()

const catalogueNumber = computed(() => props.release.catalogNumber.match(/\d+/)?.[0]?.padStart(2, '0')
  ?? props.release.catalogNumber)
</script>

<template>
  <article class="release-split">
    <aside class="release-split__stage" aria-label="Release artwork">
      <div class="release-split__artwork">
        <ReleaseArtwork :release="release" eager />
      </div>
    </aside>

    <div class="release-split__paper">
      <NuxtLink
        :to="`/#release-${release.catalogNumber}`"
        class="release-split__close"
        aria-label="Close release and return to index"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </NuxtLink>

      <header class="release-split__heading">
        <NuxtLink
          :to="`/artists/${encodeURIComponent(release.artist)}`"
          class="release-split__artist"
          :class="{ 'release-split__artist--with-image': release.artistImageUrl }"
          :aria-label="`Open artist page for ${release.artist}`"
        >
          <span v-if="release.artistImageUrl" class="release-split__artist-image"><img :src="release.artistImageUrl" alt="" width="48" height="48"></span>
          <span>{{ release.artist }}</span>
        </NuxtLink>
        <h1 id="release-title" tabindex="-1">
          {{ release.title }}<br>
          <span>Nº{{ catalogueNumber }}</span>
        </h1>
      </header>

      <dl class="release-split__metadata">
        <div><dt>CATALOGUE</dt><dd>{{ release.catalogNumber }}</dd></div>
        <div><dt>ARTIST</dt><dd>{{ release.artist }}</dd></div>
        <div><dt>{{ release.year ? 'YEAR' : 'TRACKS' }}</dt><dd>{{ release.year || String(release.tracks.length).padStart(2, '0') }}</dd></div>
      </dl>

      <nav v-if="release.links.length" class="release-split__actions" aria-label="Release links">
        <a
          v-for="link in release.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
        >{{ link.label }}</a>
      </nav>

      <section class="release-split__section release-split__section--summary" aria-labelledby="release-summary-title">
        <p class="release-split__label">[A] RELEASE</p>
        <h2 id="release-summary-title" class="sr-only">Release notes</h2>
        <p v-if="release.description">{{ release.description }}</p>
        <p v-else class="release-split__quiet">Release notes unavailable.</p>
      </section>

      <section class="release-split__section" aria-labelledby="split-tracklist-title">
        <p class="release-split__label">[B] TRACKLIST</p>
        <h2 id="split-tracklist-title" class="sr-only">Tracklist</h2>
        <ReleaseTracklistPlayer v-if="release.tracks.length" :tracks="release.tracks" />
        <p v-else class="release-split__quiet">Tracklist unavailable.</p>
      </section>

      <section class="release-split__section release-split__related" aria-labelledby="split-related-title">
        <p class="release-split__label">[D] RELATED</p>
        <h2 id="split-related-title" class="sr-only">Other releases by {{ release.artist }}</h2>
        <ol v-if="relatedReleases.length">
          <li v-for="related in relatedReleases" :key="related.id">
            <NuxtLink
              :to="`/releases/${encodeURIComponent(related.catalogNumber)}`"
              :aria-label="`Open ${related.catalogNumber}: ${related.title}`"
            >
              <ReleaseArtwork :release="related" compact />
              <span>{{ related.catalogNumber }}</span>
            </NuxtLink>
          </li>
        </ol>
        <p v-else class="release-split__quiet">No related catalogue entries.</p>
      </section>
    </div>
  </article>
</template>

<style scoped>
.release-split {
  display: grid;
  grid-template-columns: minmax(0, 58fr) minmax(30rem, 42fr);
  align-items: start;
  min-height: calc(100svh - var(--header-height));
  background: var(--color-void);
}

.release-split__stage {
  position: sticky;
  top: var(--header-height-compact);
  display: grid;
  place-items: center;
  min-height: calc(100svh - var(--header-height-compact));
  padding: clamp(2rem, 3.5vw, 4rem);
  background: var(--color-void);
}

.release-split__artwork { width: min(100%, calc(100svh - var(--header-height-compact) - 5rem)); }

.release-split__paper {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: calc(100svh - var(--header-height));
  padding: clamp(1.5rem, 2.3vw, 2.75rem) clamp(1.5rem, 2.5vw, 3rem) 1.5rem;
  background: var(--color-paper);
  color: var(--color-void);
  animation: paper-enter 480ms var(--ease-reveal) both;
}

.release-split__close {
  position: fixed;
  top: calc((var(--header-height) - 2.375rem) / 2);
  right: calc(var(--page-margin) + var(--header-target) + .625rem);
  z-index: calc(var(--z-header) + 1);
  display: grid;
  place-items: center;
  width: 2.375rem;
  height: 2.375rem;
  border: 1px solid var(--color-hairline);
  background: var(--color-void);
  color: var(--color-paper);
}

.release-split__close::before { position: absolute; inset: -.25rem; content: ''; }
.release-split__close span { position: absolute; top: 50%; left: 50%; width: .95rem; height: 1px; background: currentColor; transform-origin: center; }
.release-split__close span:first-child { transform: translate(-50%, -50%) rotate(45deg); }
.release-split__close span:last-child { transform: translate(-50%, -50%) rotate(-45deg); }
.release-split__close:hover,
.release-split__close:focus-visible { border-color: var(--color-paper); background: var(--color-paper); color: var(--color-void); }
.release-split__close:focus-visible { outline: 1px solid var(--color-paper); outline-offset: 3px; }

.release-split__heading { padding-right: 3.5rem; }
.release-split__artist { display: inline-flex; align-items: center; gap: .65rem; min-height: 2rem; margin: 0 0 .65rem; color: inherit; font-family: var(--font-mono); font-size: .6875rem; letter-spacing: .09em; text-decoration: none; }
.release-split__artist-image { display: grid; place-items: center; width: 2.75rem; height: 2.75rem; background: var(--color-carbon); }
.release-split__artist-image img { display: block; width: 100%; height: 100%; object-fit: contain; }
.release-split__artist:hover,
.release-split__artist:focus-visible { text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: .3rem; }
.release-split__artist:focus-visible { outline: 1px solid currentColor; outline-offset: .25rem; }
.release-split__heading h1 { max-width: none; margin: 0 0 clamp(1.5rem, 2.5vw, 2.5rem); font-size: clamp(3.5rem, 5.3vw, 6.6rem); font-weight: 700; line-height: .76; letter-spacing: -.078em; overflow-wrap: break-word; word-break: normal; hyphens: none; text-wrap: balance; }
.release-split__heading h1:focus { outline: 0; }
.release-split__heading h1 span { white-space: nowrap; }

.release-split__metadata {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 0;
  padding: .9rem 0;
  border-top: 1px solid var(--color-void);
  border-bottom: 1px solid var(--color-void);
}
.release-split__metadata div { min-width: 0; padding-right: .75rem; }
.release-split__metadata dt,
.release-split__label { color: #777570; font-family: var(--font-mono); font-size: .625rem; letter-spacing: .08em; }
.release-split__metadata dd { margin: .25rem 0 0; font-family: var(--font-mono); font-size: .6875rem; font-weight: 700; line-height: 1.25; overflow-wrap: anywhere; }

.release-split__actions { display: flex; flex-wrap: wrap; gap: .5rem; margin: 1.25rem 0; }
.release-split__actions a { min-height: 2.2rem; padding: .55rem .75rem; border: 1px solid var(--color-void); color: var(--color-void); font-family: var(--font-mono); font-size: .625rem; letter-spacing: .07em; text-decoration: none; }
.release-split__actions a:hover,
.release-split__actions a:focus-visible { background: var(--color-void); color: var(--color-paper); }

.release-split__section { margin-top: clamp(1.5rem, 2.25vw, 2.25rem); }
.release-split__label { margin: 0 0 .7rem; }
.release-split__section > p:last-child { margin: 0; font-size: clamp(.95rem, 1.15vw, 1.1rem); line-height: 1.45; text-transform: none; }
.release-split__quiet { color: #66645f; font-family: var(--font-mono); font-size: .6875rem !important; letter-spacing: .04em; text-transform: uppercase !important; }
.release-split__related { margin-top: auto; padding-top: clamp(2.5rem, 4vw, 4rem); }
.release-split__related ol { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1px; margin: 0; padding: 0; background: var(--color-void); list-style: none; }
.release-split__related li { min-width: 0; background: var(--color-paper); }
.release-split__related a { position: relative; display: block; color: var(--color-paper); text-decoration: none; }
.release-split__related a > span:last-child { position: absolute; right: .35rem; bottom: .35rem; padding: .2rem .3rem; background: var(--color-void); font-family: var(--font-mono); font-size: .5rem; letter-spacing: .05em; }
.release-split__related a:focus-visible { z-index: 1; outline: 3px solid var(--color-void); outline-offset: -3px; }

@keyframes paper-enter {
  from { opacity: 0; }
}

@media (width < 1100px) {
  .release-split { grid-template-columns: minmax(0, 54fr) minmax(26rem, 46fr); }
  .release-split__heading h1 { font-size: clamp(3.25rem, 5.4vw, 5.5rem); }
}

@media (width < 768px) {
  .release-split { display: block; }
  .release-split__stage { position: relative; top: auto; min-height: min(100svh, 100vw); padding: 1rem; }
  .release-split__artwork { width: min(100%, calc(100svh - var(--header-height) - 2rem)); }
  .release-split__paper { min-height: 100svh; padding: 1.25rem 1rem 1rem; }
  .release-split__heading { padding-right: 3rem; }
  .release-split__heading h1 { max-width: none; font-size: clamp(3.15rem, 15vw, 5.75rem); line-height: .79; }
  .release-split__metadata { grid-template-columns: 1fr 1fr; gap: 1rem 0; }
  .release-split__metadata div:last-child { grid-column: 1 / -1; }
  .release-split__related ol { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (width < 360px) {
  .release-split__heading h1 { font-size: 3.35rem; }
  .release-split__related ol { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (prefers-reduced-motion: reduce) {
  .release-split__paper { animation: none; }
}
</style>
