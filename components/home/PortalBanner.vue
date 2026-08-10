<script setup lang="ts">
import type { FeaturedRelease } from '~/types/release'

const props = defineProps<{ release: FeaturedRelease | null }>()

const banner = ref<HTMLElement | null>(null)
const { isReady, isVisible } = useOnceInView(banner)

const destinations = computed(() => [
  {
    index: '01',
    label: 'FEATURED',
    to: props.release ? `/releases/${props.release.catalogNumber}` : '/#releases',
    detail: props.release ? `${props.release.artist} — ${props.release.title}` : 'LATEST RELEASE',
    featured: true,
  },
  { index: '02', label: 'RELEASES', to: '/#releases', detail: 'FULL CATALOGUE', featured: false },
  { index: '03', label: 'ARTISTS', to: '/artists', detail: 'LABEL ROSTER', featured: false },
  { index: '04', label: 'TECHTONIC', to: '/techtonic', detail: 'RADIO ARCHIVE', featured: false },
  { index: '05', label: 'SESSIONS', to: '/accurate-sessions', detail: 'ACCURATE SESSIONS', featured: false },
])
</script>

<template>
  <section
    ref="banner"
    class="portal-banner"
    :class="{ 'portal-banner--ready': isReady, 'portal-banner--visible': isVisible }"
    aria-labelledby="portal-banner-title"
  >
    <header class="portal-banner__rail">
      <h2 id="portal-banner-title">[NAV] / EXPLORE INDEX</h2>
      <p>05 DESTINATIONS</p>
    </header>

    <nav class="portal-banner__nav" aria-label="Explore Accurate Black">
      <NuxtLink
        v-for="(destination, itemIndex) in destinations"
        :key="destination.index"
        :to="destination.to"
        class="portal-banner__link"
        :class="{ 'portal-banner__link--featured': destination.featured }"
        :style="{ '--item-index': itemIndex }"
        @click="destination.to.startsWith('/releases/') ? rememberReleaseReturn('/#releases') : undefined"
      >
        <span class="portal-banner__number">{{ destination.index }}</span>
        <span class="portal-banner__content">
          <strong>{{ destination.label }}</strong>
          <small>{{ destination.detail }}</small>
        </span>
        <span class="portal-banner__arrow" aria-hidden="true">↗</span>
      </NuxtLink>
    </nav>
  </section>
</template>

<style scoped>
.portal-banner {
  position: relative;
  z-index: 2;
  width: 100%;
  overflow: hidden;
  background: var(--color-paper);
  color: var(--color-void);
}

.portal-banner__rail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 4.25rem;
  padding-inline: var(--page-margin);
  border-bottom: 1px solid var(--color-void);
  font-family: var(--font-mono);
  font-size: .6875rem;
  letter-spacing: .09em;
}

.portal-banner__rail h2,
.portal-banner__rail p { margin: 0; font: inherit; }

.portal-banner__nav {
  display: grid;
  grid-template-columns: 1.35fr repeat(4, minmax(0, 1fr));
  border-bottom: 1px solid var(--color-void);
}

.portal-banner__link {
  position: relative;
  display: grid;
  grid-template-columns: 1.5rem minmax(0, 1fr) auto;
  grid-template-rows: 1fr auto;
  gap: 1.25rem .75rem;
  min-width: 0;
  min-height: clamp(12.5rem, 17vw, 16.5rem);
  padding: 1.15rem 1rem 1.25rem;
  border-right: 1px solid var(--color-void);
  color: var(--color-void);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard);
}

.portal-banner__link:last-child { border-right: 0; }

.portal-banner__number {
  grid-column: 1;
  color: currentColor;
  font-family: var(--font-mono);
  font-size: .6875rem;
  letter-spacing: .08em;
}

.portal-banner__content {
  grid-column: 1 / -1;
  grid-row: 2;
  align-self: end;
  min-width: 0;
}

.portal-banner__content strong {
  display: block;
  font-size: clamp(1.65rem, 2.65vw, 3.25rem);
  font-weight: 400;
  line-height: .9;
  letter-spacing: -.055em;
  text-transform: uppercase;
  transition: transform var(--duration-fast) var(--ease-standard);
}

.portal-banner__content small {
  display: block;
  margin-top: .75rem;
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: .5625rem;
  line-height: 1.35;
  letter-spacing: .07em;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.portal-banner__arrow {
  grid-column: 3;
  grid-row: 1;
  justify-self: end;
  font-size: 1.25rem;
  line-height: 1;
  transition: transform var(--duration-fast) var(--ease-standard);
}

.portal-banner__link:hover,
.portal-banner__link:focus-visible {
  background: var(--color-void);
  color: var(--color-paper);
}

.portal-banner__link:hover .portal-banner__content strong,
.portal-banner__link:focus-visible .portal-banner__content strong { transform: translateX(.3rem); }

.portal-banner__link:hover .portal-banner__arrow,
.portal-banner__link:focus-visible .portal-banner__arrow { transform: translate(.25rem, -.25rem); }

.portal-banner__link:focus-visible {
  z-index: 1;
  outline: 2px solid var(--color-void);
  outline-offset: -3px;
}

.portal-banner--ready:not(.portal-banner--visible) .portal-banner__rail { clip-path: inset(0 100% 0 0); }

.portal-banner--ready:not(.portal-banner--visible) .portal-banner__link {
  clip-path: inset(0 0 100%);
}

.portal-banner--ready:not(.portal-banner--visible) .portal-banner__link:nth-child(even) { clip-path: inset(100% 0 0); }

.portal-banner__rail { clip-path: inset(0); transition: clip-path 900ms var(--ease-reveal); }

.portal-banner__link {
  clip-path: inset(0);
  transition-property: color, background, clip-path;
  transition-duration: var(--duration-fast), var(--duration-fast), 960ms;
  transition-timing-function: var(--ease-standard), var(--ease-standard), var(--ease-reveal);
  transition-delay: 0ms, 0ms, calc(var(--item-index) * 100ms);
}

@media (width < 1024px) {
  .portal-banner__nav { grid-template-columns: 1.25fr repeat(4, minmax(0, 1fr)); }
  .portal-banner__link { gap-inline: .45rem; padding-inline: .7rem; }
  .portal-banner__content strong { font-size: clamp(1.35rem, 2.6vw, 2.2rem); }
}

@media (width < 768px) {
  .portal-banner__rail { min-height: 3.75rem; font-size: .625rem; }
  .portal-banner__nav { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .portal-banner__link { min-height: 8.25rem; padding: .85rem .75rem 1rem; border-bottom: 1px solid var(--color-void); }
  .portal-banner__link:nth-child(odd) { border-right: 0; }
  .portal-banner__link--featured { grid-column: 1 / -1; min-height: 11.5rem; border-right: 0; }
  .portal-banner__link:last-child { border-bottom: 0; }
  .portal-banner__content strong { font-size: clamp(1.35rem, 6.8vw, 1.9rem); }
  .portal-banner__link--featured .portal-banner__content strong { font-size: clamp(2.5rem, 13vw, 4rem); }
  .portal-banner__content small { margin-top: .55rem; }
}

@media (width < 390px) {
  .portal-banner__rail { align-items: flex-start; flex-direction: column; justify-content: center; gap: .3rem; }
  .portal-banner__link { min-height: 7.75rem; }
  .portal-banner__link--featured { min-height: 10.5rem; }
  .portal-banner__content strong { font-size: clamp(1.4rem, 8vw, 2rem); }
}

@media (prefers-reduced-motion: reduce) {
  .portal-banner__rail,
  .portal-banner__link { opacity: 1 !important; clip-path: none !important; transform: none !important; transition: none; }
  .portal-banner__content strong,
  .portal-banner__arrow { transition: none; }
}
</style>
