<script setup lang="ts">
import type { ReleaseSummary } from '~/types/release'

const props = withDefaults(defineProps<{
  releases: ReleaseSummary[]
  eyebrow?: string
  level?: 'h1' | 'h2'
  titleId?: string
}>(), {
  eyebrow: '[01] / INDEX',
  level: 'h1',
  titleId: undefined,
})

const catalogueDigits = (value?: string): string => {
  const digits = value?.match(/\d+/)?.[0]
  return digits ? digits.padStart(3, '0') : '—'
}

const range = computed(() => {
  const newest = catalogueDigits(props.releases[0]?.catalogNumber)
  const oldest = catalogueDigits(props.releases.at(-1)?.catalogNumber)
  return `${oldest}—${newest}`
})

const header = ref<HTMLElement | null>(null)
const { isReady, isVisible } = useOnceInView(header)
</script>

<template>
  <header
    ref="header"
    class="release-index-header"
    :class="{
      'release-index-header--ready': isReady,
      'release-index-header--visible': isVisible,
    }"
  >
    <div class="release-index-header__utility">
      <p>{{ eyebrow }}</p>
      <p>ACCURATE BLACK / PUBLIC ARCHIVE</p>
      <p>{{ String(releases.length).padStart(2, '0') }} ITEMS</p>
    </div>
    <component :is="level" :id="titleId" class="release-index-header__title">
      <span>RELEASES</span>
      <span>{{ range }}</span>
    </component>
  </header>
</template>

<style scoped>
.release-index-header {
  position: relative;
  padding: 1.25rem var(--page-margin) clamp(2rem, 4vw, 4rem);
  background: var(--color-paper);
  color: var(--color-void);
}

.release-index-header::before,
.release-index-header::after {
  position: absolute;
  right: 0;
  left: 0;
  height: 1px;
  background: var(--color-void);
  content: '';
  transform-origin: left;
  transition: transform 900ms var(--ease-reveal);
}

.release-index-header::before { top: 0; }
.release-index-header::after { bottom: 0; transition-delay: 120ms; }

.release-index-header__utility {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 1rem;
  align-items: baseline;
  margin-bottom: clamp(3rem, 6vw, 6.5rem);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .08em;
}

.release-index-header__utility p { margin: 0; }
.release-index-header__utility p:nth-child(2) { text-align: center; }
.release-index-header__utility p:last-child { color: #696762; text-align: right; }

.release-index-header__title {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 2rem;
  align-items: end;
  margin: 0;
  font-size: var(--archive-title-size);
  font-weight: var(--archive-title-weight);
  line-height: var(--archive-title-line-height);
  letter-spacing: var(--archive-title-letter-spacing);
  white-space: nowrap;
}

.release-index-header__title span { display: block; padding-inline-end: .08em; }

.release-index-header__title span:last-child {
  padding-inline: .05em .12em;
  color: #777570;
  font-family: var(--font-mono);
  font-size: var(--archive-range-size);
  font-weight: 400;
  letter-spacing: -.05em;
}

.release-index-header__utility,
.release-index-header__title span { clip-path: inset(0); transition: clip-path 920ms var(--ease-reveal); }

.release-index-header__title span:last-child { transition-delay: 120ms; }

.release-index-header--ready:not(.release-index-header--visible)::before,
.release-index-header--ready:not(.release-index-header--visible)::after { transform: scaleX(0); }

.release-index-header--ready:not(.release-index-header--visible) .release-index-header__utility {
  clip-path: inset(0 100% 0 0);
}

.release-index-header--ready:not(.release-index-header--visible) .release-index-header__title span {
  clip-path: inset(0 100% 0 0);
}

.release-index-header--ready:not(.release-index-header--visible) .release-index-header__title span:last-child { clip-path: inset(0 0 0 100%); }

@media (width < 768px) {
  .release-index-header { padding-inline: var(--page-margin); }
  .release-index-header__utility { grid-template-columns: 1fr auto; margin-bottom: 1.75rem; }
  .release-index-header__utility p:nth-child(2) { display: none; }
  .release-index-header__title { grid-template-columns: 1fr; gap: 1.25rem; white-space: nowrap; }
  .release-index-header__title span:last-child { justify-self: end; }
}

@media (prefers-reduced-motion: reduce) {
  .release-index-header::before,
  .release-index-header::after,
  .release-index-header__utility,
  .release-index-header__title span { opacity: 1 !important; clip-path: none !important; transform: none !important; transition: none; }
}
</style>
