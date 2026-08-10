<script setup lang="ts">
import BroadcastPlayer from '~/components/broadcast/BroadcastPlayer.vue'
import type { BroadcastEpisode } from '~/types/broadcast'

defineProps<{ episode: BroadcastEpisode }>()

const panel = ref<HTMLElement | null>(null)
const { isReady, isVisible } = useOnceInView(panel)
const signal = [18, 42, 72, 28, 56, 88, 36, 64, 24, 80, 48, 94, 32, 68, 20, 58, 84, 40, 74, 26, 62, 90, 34, 70, 22, 52, 82, 30, 66, 46, 92, 38]
const formatDate = (value: string) => new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(value)).toUpperCase()
</script>

<template>
  <section
    ref="panel"
    class="broadcast-featured"
    :class="{
      'broadcast-featured--ready': isReady,
      'broadcast-featured--visible': isVisible,
    }"
    aria-labelledby="featured-broadcast-title"
  >
    <div class="broadcast-featured__identity">
      <p>001 / LATEST SIGNAL</p>
      <span class="broadcast-featured__number" aria-hidden="true">01</span>
      <time :datetime="episode.publishedAt">{{ formatDate(episode.publishedAt) }}</time>
    </div>

    <div class="broadcast-featured__content">
      <p class="broadcast-featured__eyebrow">NOW TRANSMITTING</p>
      <h2 id="featured-broadcast-title">{{ episode.title }}</h2>
      <div class="broadcast-featured__signal" aria-hidden="true">
        <span v-for="(amplitude, index) in signal" :key="index" :style="{ '--amplitude': `${amplitude}%` }" />
      </div>
      <BroadcastPlayer :episode="episode" />
      <a
        class="broadcast-featured__source"
        :href="episode.sourceUrl"
        target="_blank"
        rel="noopener noreferrer"
      >OPEN ON SOUNDCLOUD <span aria-hidden="true">↗</span></a>
    </div>
  </section>
</template>

<style scoped>
.broadcast-featured {
  display: grid;
  grid-template-columns: minmax(10rem, 3fr) minmax(0, 9fr);
  min-height: clamp(28rem, 52vw, 48rem);
  border-bottom: 1px solid var(--color-hairline);
}

.broadcast-featured__identity,
.broadcast-featured__content {
  min-width: 0;
  padding: clamp(1.5rem, 3vw, 3rem) var(--page-margin);
}

.broadcast-featured__identity {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-hairline);
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .08em;
}

.broadcast-featured__identity p { margin: 0; }
.broadcast-featured__identity time { margin-top: auto; }

.broadcast-featured__number {
  margin: auto 0;
  color: var(--color-paper);
  font-family: var(--font-sans);
  font-size: clamp(5.5rem, 12vw, 15rem);
  font-weight: 400;
  line-height: .75;
  letter-spacing: -.08em;
}

.broadcast-featured__content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1.25rem 1.5rem;
  align-content: center;
}

.broadcast-featured__eyebrow,
.broadcast-featured__source {
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .08em;
}

.broadcast-featured__eyebrow { grid-column: 1 / -1; margin: 0; color: var(--color-muted); }

.broadcast-featured h2 {
  grid-column: 1 / -1;
  max-width: 100%;
  margin: 0;
  font-size: clamp(1.75rem, 3.4vw + 0.4rem, 4.25rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -.04em;
  overflow-wrap: anywhere;
  word-break: break-word;
  hyphens: auto;
}

.broadcast-featured__signal {
  grid-column: 1 / -1;
  display: flex;
  gap: clamp(3px, .45vw, 8px);
  align-items: center;
  height: 4.5rem;
  margin-block: .5rem 1rem;
  border-block: 1px solid var(--color-hairline);
  transform-origin: left;
}

.broadcast-featured__signal span {
  flex: 1;
  min-width: 1px;
  height: var(--amplitude);
  background: var(--color-paper);
  opacity: .42;
}

.broadcast-featured :deep(.broadcast-player) { grid-column: 1 / -1; min-width: 0; }

.broadcast-featured__source {
  grid-column: 2;
  justify-self: end;
  min-height: 2.75rem;
  padding-top: .75rem;
  color: var(--color-paper);
  text-decoration: underline;
  text-decoration-color: var(--color-hairline);
  text-underline-offset: .4rem;
}

.broadcast-featured__source:hover { text-decoration-color: var(--color-paper); }
.broadcast-featured__source:focus-visible { outline: 2px solid var(--color-paper); outline-offset: .35rem; }

.broadcast-featured__identity,
.broadcast-featured__content,
.broadcast-featured__signal {
  clip-path: inset(0);
  transition: clip-path 950ms var(--ease-reveal), transform 950ms var(--ease-reveal);
}

.broadcast-featured__content { transition-delay: 100ms; }
.broadcast-featured__signal { transition-delay: 200ms; }

.broadcast-featured--ready:not(.broadcast-featured--visible) .broadcast-featured__identity { clip-path: inset(0 100% 0 0); }
.broadcast-featured--ready:not(.broadcast-featured--visible) .broadcast-featured__content { clip-path: inset(100% 0 0); }
.broadcast-featured--ready:not(.broadcast-featured--visible) .broadcast-featured__signal { transform: scaleX(0); }

@media (width < 1100px) {
  .broadcast-featured { grid-template-columns: minmax(8rem, 2.2fr) minmax(0, 1fr); }
  .broadcast-featured h2 { font-size: clamp(1.6rem, 3.2vw + 0.5rem, 3rem); }
}

@media (width < 860px) {
  .broadcast-featured { grid-template-columns: 1fr; min-height: 0; }
  .broadcast-featured__identity {
    display: grid;
    grid-template-columns: 1fr auto;
    border-right: 0;
    border-bottom: 1px solid var(--color-hairline);
  }
  .broadcast-featured__number {
    grid-column: 1 / -1;
    margin: 2.5rem 0 1rem;
    font-size: clamp(4.5rem, 24vw, 8rem);
  }
  .broadcast-featured__content { display: block; padding-block: 2.25rem 3.25rem; }
  .broadcast-featured h2 {
    margin-block: 1rem 1.75rem;
    font-size: clamp(1.5rem, 6.8vw, 2.35rem);
    line-height: 1.08;
  }
  .broadcast-featured__signal { display: flex; height: 3.75rem; margin-bottom: 1.75rem; }
  .broadcast-featured__source { display: inline-block; margin-top: 1.1rem; }
}

@media (prefers-reduced-motion: reduce) {
  .broadcast-featured__identity,
  .broadcast-featured__content,
  .broadcast-featured__signal { clip-path: none !important; transform: none !important; transition: none; }
}
</style>
