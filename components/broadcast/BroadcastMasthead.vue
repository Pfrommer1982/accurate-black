<script setup lang="ts">
const props = defineProps<{
  title: string
  kicker: string
  description: string
  sourceLabel: string
  archiveNumber: string
  episodeCount: number
  externalUrl?: string
  externalLabel?: string
  refreshedAt?: string
}>()

const masthead = ref<HTMLElement | null>(null)
const { isReady, isVisible } = useOnceInView(masthead)
const refreshedLabel = computed(() => {
  if (!props.refreshedAt) return 'LIVE / ≤ 05 MIN'
  const date = new Date(props.refreshedAt)
  return Number.isNaN(date.getTime())
    ? 'LIVE / ≤ 05 MIN'
    : `SYNC ${date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })} UTC`
})
</script>

<template>
  <header
    ref="masthead"
    class="broadcast-masthead"
    :class="{
      'broadcast-masthead--ready': isReady,
      'broadcast-masthead--visible': isVisible,
    }"
  >
    <div class="broadcast-masthead__utility">
      <p>{{ archiveNumber }} / BROADCAST ARCHIVE</p>
      <p>{{ sourceLabel }}</p>
      <p>{{ String(episodeCount).padStart(2, '0') }} EPISODES</p>
      <p :title="refreshedAt">{{ refreshedLabel }}</p>
    </div>

    <h1 class="broadcast-masthead__title">{{ title }}</h1>

    <div class="broadcast-masthead__context">
      <p class="broadcast-masthead__kicker">{{ kicker }}</p>
      <p class="broadcast-masthead__description">{{ description }}</p>
      <a
        v-if="externalUrl"
        class="broadcast-masthead__external"
        :href="externalUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ externalLabel ?? 'SOURCE' }} <span aria-hidden="true">↗</span>
      </a>
    </div>
  </header>
</template>

<style scoped>
.broadcast-masthead {
  position: relative;
  padding: 1.25rem var(--page-margin) clamp(3.5rem, 7vw, 7rem);
  border-block: 1px solid var(--color-hairline);
}

.broadcast-masthead__utility {
  display: grid;
  grid-template-columns: 1fr 1fr auto auto;
  gap: .75rem 1rem;
  margin-bottom: clamp(3rem, 7vw, 8rem);
  color: var(--color-ash);
  font-family: var(--font-mono);
  font-size: .625rem;
  line-height: 1.3;
  letter-spacing: .08em;
}

.broadcast-masthead__utility p {
  margin: 0;
  min-width: 0;
  overflow-wrap: anywhere;
}

.broadcast-masthead__utility p:nth-child(2) { text-align: center; }
.broadcast-masthead__utility p:nth-child(n + 3) { text-align: right; }
.broadcast-masthead__utility p:last-child { color: var(--color-paper); }

.broadcast-masthead__title {
  max-width: 100%;
  margin: 0;
  color: var(--color-paper);
  font-size: clamp(2.35rem, 6.2vw + 0.6rem, 7rem);
  font-weight: var(--archive-title-weight);
  line-height: .9;
  letter-spacing: -.05em;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.broadcast-masthead__context {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 32rem) auto;
  gap: 1.5rem 2rem;
  align-items: end;
  margin-top: clamp(2.5rem, 5vw, 6rem);
}

.broadcast-masthead__context p { margin: 0; min-width: 0; }

.broadcast-masthead__kicker,
.broadcast-masthead__external {
  font-family: var(--font-mono);
  font-size: .6875rem;
  line-height: 1.35;
  letter-spacing: .07em;
}

.broadcast-masthead__kicker { color: var(--color-paper); }

.broadcast-masthead__description {
  color: var(--color-ash);
  font-size: clamp(1rem, 1.4vw, 1.25rem);
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.broadcast-masthead__external {
  min-height: 2.75rem;
  padding-top: .75rem;
  color: var(--color-paper);
  text-decoration: underline;
  text-decoration-color: var(--color-hairline);
  text-underline-offset: .4rem;
  white-space: nowrap;
  transition: text-decoration-color var(--duration-fast) var(--ease-standard);
}

.broadcast-masthead__external:hover { text-decoration-color: var(--color-paper); }
.broadcast-masthead__external:focus-visible { outline: 2px solid var(--color-paper); outline-offset: .35rem; }

.broadcast-masthead__utility,
.broadcast-masthead__title,
.broadcast-masthead__context {
  clip-path: inset(0);
  transition: clip-path 950ms var(--ease-reveal);
}

.broadcast-masthead__title { transition-delay: 100ms; }
.broadcast-masthead__context { transition-delay: 200ms; }

.broadcast-masthead--ready:not(.broadcast-masthead--visible) .broadcast-masthead__utility,
.broadcast-masthead--ready:not(.broadcast-masthead--visible) .broadcast-masthead__title { clip-path: inset(0 100% 0 0); }

.broadcast-masthead--ready:not(.broadcast-masthead--visible) .broadcast-masthead__context { clip-path: inset(100% 0 0); }

@media (width < 960px) {
  .broadcast-masthead__utility { grid-template-columns: 1fr auto; }
  .broadcast-masthead__utility p:nth-child(2) { display: none; }
  .broadcast-masthead__utility p:nth-child(3) { text-align: right; }
  .broadcast-masthead__utility p:last-child { text-align: left; }
  .broadcast-masthead__context { grid-template-columns: minmax(0, 1fr); }
  .broadcast-masthead__external { justify-self: start; white-space: normal; }
}

@media (width < 600px) {
  .broadcast-masthead { padding-block: 1rem 3.25rem; }
  .broadcast-masthead__utility { margin-bottom: 2.5rem; gap: .55rem 1rem; }
  .broadcast-masthead__title {
    font-size: clamp(2.1rem, 10.5vw, 3.1rem);
    line-height: .92;
    letter-spacing: -.04em;
  }
  .broadcast-masthead__context { gap: 1.1rem; margin-top: 2.25rem; }
}

@media (prefers-reduced-motion: reduce) {
  .broadcast-masthead__utility,
  .broadcast-masthead__title,
  .broadcast-masthead__context { clip-path: none !important; transition: none; }

  .broadcast-masthead__external { transition: none; }
}
</style>
