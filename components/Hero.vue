<script setup lang="ts">
import HeroArtwork from '~/components/hero/Artwork.vue'
import HeroBackground from '~/components/hero/Background.vue'
import HeroLayout from '~/components/hero/Layout.vue'
import HeroMetadata from '~/components/hero/Metadata.vue'
import HeroScrollCue from '~/components/hero/ScrollCue.vue'
import HeroSignalGrid from '~/components/hero/SignalGrid.vue'
import type { FeaturedRelease } from '~/types/release'

defineProps<{ release: FeaturedRelease | null }>()

const hero = ref<HTMLElement | null>(null)
let frameId: number | null = null
let observer: IntersectionObserver | null = null
let motionQuery: MediaQueryList | null = null
let isNearViewport = true

const clamp = (value: number, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value))

const updateFrame = () => {
  frameId = null
  const element = hero.value
  if (!element || document.hidden || !isNearViewport) return

  const bounds = element.getBoundingClientRect()
  const runway = Math.max(1, bounds.height - window.innerHeight)
  const progress = motionQuery?.matches ? 0 : clamp(-bounds.top / runway)
  const lateProgress = clamp((progress - .66) / .34)

  element.style.setProperty('--hero-progress', progress.toFixed(4))
  element.style.setProperty('--hero-late-progress', lateProgress.toFixed(4))
  element.style.setProperty('--hero-title-y', `${(-progress * 8).toFixed(3)}svh`)
  element.style.setProperty('--hero-mobile-title-y', `${(-progress * 2).toFixed(3)}rem`)
  element.style.setProperty('--hero-title-opacity', (1 - progress * .92).toFixed(4))
  element.style.setProperty('--hero-title-blur', `${(lateProgress * 8).toFixed(3)}px`)
  element.style.setProperty('--hero-art-y', `${(-progress * 5).toFixed(3)}svh`)
  element.style.setProperty('--hero-mobile-art-y', `${(-progress * 1.5).toFixed(3)}rem`)
  element.style.setProperty('--hero-art-scale', (1 - progress * .12).toFixed(4))
  element.style.setProperty('--hero-mobile-art-scale', (1 - progress * .05).toFixed(4))
  element.style.setProperty('--hero-art-opacity', (1 - lateProgress * .28).toFixed(4))
  element.style.setProperty('--hero-rail-slow-y', `${(progress * 4).toFixed(3)}svh`)
  element.style.setProperty('--hero-rail-fast-y', `${(-progress * 6).toFixed(3)}svh`)
  element.style.setProperty('--hero-rail-focus-y', `${(-progress * 3).toFixed(3)}svh`)
  element.style.setProperty('--hero-rail-opacity', (.12 + progress * .28).toFixed(4))
  element.style.setProperty('--hero-focus-rail-opacity', (.26 + progress * .35).toFixed(4))
  element.style.setProperty('--hero-threshold-opacity', (.12 + lateProgress * .5).toFixed(4))
  element.style.setProperty('--hero-portal-opacity', (1 - lateProgress).toFixed(4))
  element.style.setProperty('--hero-veil-y', `${((1 - lateProgress) * 35).toFixed(3)}%`)
  document.documentElement.style.setProperty('--hero-progress', progress.toFixed(4))
  document.documentElement.style.setProperty('--hero-thesis-y', `${((1 - progress) * 2.5).toFixed(3)}rem`)
}

const scheduleFrame = () => {
  if (frameId === null && !document.hidden && isNearViewport) frameId = requestAnimationFrame(updateFrame)
}

const handleVisibility = () => {
  if (document.hidden && frameId !== null) {
    cancelAnimationFrame(frameId)
    frameId = null
  } else {
    scheduleFrame()
  }
}

onMounted(() => {
  const element = hero.value
  if (!element) return

  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  observer = new IntersectionObserver(([entry]) => {
    isNearViewport = Boolean(entry?.isIntersecting)
    if (isNearViewport) scheduleFrame()
  }, { rootMargin: '100% 0px' })
  observer.observe(element)

  window.addEventListener('scroll', scheduleFrame, { passive: true })
  window.addEventListener('resize', scheduleFrame, { passive: true })
  window.visualViewport?.addEventListener('resize', scheduleFrame)
  window.visualViewport?.addEventListener('scroll', scheduleFrame)
  document.addEventListener('visibilitychange', handleVisibility)
  motionQuery.addEventListener('change', scheduleFrame)
  scheduleFrame()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scheduleFrame)
  window.removeEventListener('resize', scheduleFrame)
  window.visualViewport?.removeEventListener('resize', scheduleFrame)
  window.visualViewport?.removeEventListener('scroll', scheduleFrame)
  document.removeEventListener('visibilitychange', handleVisibility)
  motionQuery?.removeEventListener('change', scheduleFrame)
  observer?.disconnect()
  if (frameId !== null) cancelAnimationFrame(frameId)
  document.documentElement.style.removeProperty('--hero-progress')
  document.documentElement.style.removeProperty('--hero-thesis-y')
})
</script>

<template>
  <section ref="hero" class="hero" aria-labelledby="hero-title">
    <div class="hero__stage">
      <HeroBackground />
      <HeroSignalGrid />

      <HeroLayout v-if="release">
        <div class="hero__copy">
          <p class="hero__overline">LATEST RELEASE / SELECTED WORK</p>
          <p class="hero__artist">{{ release.artist }}</p>
          <h1 id="hero-title" class="hero__title">{{ release.title }}</h1>
        </div>

        <HeroArtwork :release="release" />
        <HeroMetadata :catalog-number="release.catalogNumber" :year="release.year" />
        <HeroScrollCue />
        <p class="hero__position" aria-label="Section 1 of 4">01 / 04</p>
      </HeroLayout>

      <HeroLayout v-else>
        <div class="hero__copy hero__copy--fallback">
          <p class="hero__overline">INDEPENDENT ELECTRONIC MUSIC LABEL</p>
          <h1 id="hero-title" class="hero__title">ACCURATE BLACK</h1>
        </div>
        <HeroScrollCue />
      </HeroLayout>

      <div class="hero__veil" aria-hidden="true" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  --hero-progress: 0;
  --hero-late-progress: 0;
  --hero-title-y: 0px;
  --hero-mobile-title-y: 0px;
  --hero-title-opacity: 1;
  --hero-title-blur: 0px;
  --hero-art-y: 0px;
  --hero-mobile-art-y: 0px;
  --hero-art-scale: 1;
  --hero-mobile-art-scale: 1;
  --hero-art-opacity: 1;
  --hero-rail-slow-y: 0px;
  --hero-rail-fast-y: 0px;
  --hero-rail-focus-y: 0px;
  --hero-rail-opacity: .12;
  --hero-focus-rail-opacity: .26;
  --hero-threshold-opacity: .12;
  --hero-portal-opacity: 1;
  --hero-veil-y: 35%;

  position: relative;
  z-index: var(--z-hero);
  height: 158svh;
  background: var(--color-void);
  color: var(--color-paper);
  isolation: isolate;
}

.hero__stage {
  position: sticky;
  top: 0;
  height: 100svh;
  min-height: 40rem;
  overflow: hidden;
  background: var(--color-void);
  isolation: isolate;
}

.hero__copy {
  grid-column: 2 / 8;
  grid-row: 3 / 6;
  z-index: 3;
  align-self: center;
  max-width: 46rem;
  animation: hero-copy-resolve 720ms var(--ease-reveal) 220ms both;
  transform: translate3d(0, var(--hero-title-y), 0);
  opacity: var(--hero-title-opacity);
  filter: blur(var(--hero-title-blur));
  will-change: transform, opacity, filter;
}

.hero__overline { margin: 0 0 2.25rem; color: var(--color-muted); font-family: var(--font-mono); font-size: .6875rem; line-height: 1.2; letter-spacing: .1em; }
.hero__artist { margin: 0 0 .6rem; color: var(--color-ash); font-size: clamp(1rem, 1.4vw, 1.25rem); line-height: 1.1; letter-spacing: .03em; text-transform: uppercase; }
.hero__title { max-width: 46rem; margin: 0; font-size: clamp(4rem, 7.6vw, 7rem); font-weight: 400; line-height: .84; letter-spacing: -.07em; text-transform: uppercase; text-wrap: balance; }
.hero__position { grid-column: 12 / 13; grid-row: 6; z-index: 3; align-self: center; justify-self: end; margin: 0; color: var(--color-muted); font-family: var(--font-mono); font-size: .625rem; letter-spacing: .08em; writing-mode: vertical-rl; opacity: var(--hero-portal-opacity); }
.hero__copy--fallback { grid-column-end: 12; }

.hero__veil {
  position: absolute;
  inset: 55% 0 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(to bottom, transparent, rgb(18 18 18 / 72%) 68%, var(--color-void));
  opacity: var(--hero-late-progress);
  transform: translate3d(0, var(--hero-veil-y), 0);
  will-change: transform, opacity;
}

@keyframes hero-copy-resolve {
  from { opacity: 0; translate: 0 .9rem; }
}

@media (width < 1024px) {
  .hero__copy { grid-column: 2 / 7; }
  .hero__title { font-size: clamp(3.5rem, 7.8vw, 5.75rem); }
}

@media (width < 768px) {
  /* Keep a sticky runway on mobile so the hero scroll choreography still runs. */
  .hero { height: 145svh; min-height: 145svh; }
  .hero__stage { position: sticky; top: 0; height: 100svh; min-height: 100svh; overflow: hidden; }
  .hero__copy { grid-column: 1 / -1; grid-row: 2; align-self: start; max-width: none; padding-top: .75rem; transform: translate3d(0, var(--hero-mobile-title-y), 0); filter: none; }
  .hero__overline { margin-bottom: 1rem; font-size: .625rem; }
  .hero__artist { margin-bottom: .35rem; }
  .hero__title { max-width: 22rem; font-size: clamp(2.625rem, 13vw, 3.5rem); line-height: .9; }
  .hero__position { display: none; }
  .hero__veil { inset-block-start: 68%; }
}

@media (prefers-reduced-motion: reduce) {
  .hero { height: auto; min-height: 100svh; }
  .hero__stage { position: relative; height: auto; min-height: 100svh; }
  .hero__copy { opacity: 1; filter: none; animation: none; transform: none; }
  .hero__veil { display: none; }
}
</style>
