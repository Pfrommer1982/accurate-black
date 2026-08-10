<script setup lang="ts">
import BroadcastPlayer from '~/components/broadcast/BroadcastPlayer.vue'
import type { BroadcastEpisode } from '~/types/broadcast'

defineProps<{
  episode: BroadcastEpisode
  index: number
}>()

const formatDate = (value: string) => new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(value)).toUpperCase()
</script>

<template>
  <li class="broadcast-strip">
    <span class="broadcast-strip__number">{{ String(index + 2).padStart(3, '0') }}</span>
    <span class="broadcast-strip__identity">
      <time :datetime="episode.publishedAt">{{ formatDate(episode.publishedAt) }}</time>
      <strong>{{ episode.title }}</strong>
    </span>
    <BroadcastPlayer :episode="episode" compact />
    <a
      class="broadcast-strip__source"
      :href="episode.sourceUrl"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="`Open ${episode.title} on SoundCloud`"
    >↗</a>
  </li>
</template>

<style scoped>
.broadcast-strip {
  display: grid;
  grid-template-columns: clamp(5.5rem, 10vw, 10rem) minmax(0, 1fr) minmax(0, 1.35fr) 4rem;
  align-items: stretch;
  min-width: 0;
  border-bottom: 1px solid var(--color-hairline);
  background: var(--color-void);
}

.broadcast-strip > * { min-width: 0; }

.broadcast-strip__number,
.broadcast-strip__identity,
.broadcast-strip__source { padding: 1.1rem 1rem; }

.broadcast-strip__number {
  display: flex;
  align-items: center;
  border-right: 1px solid var(--color-hairline);
  font-size: clamp(2rem, 4vw, 4.5rem);
  font-weight: 400;
  line-height: .8;
  letter-spacing: -.06em;
}

.broadcast-strip__identity {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.25rem;
}

.broadcast-strip__identity time {
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .08em;
}

.broadcast-strip__identity strong {
  font-size: clamp(1.05rem, 1.8vw, 1.85rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -.03em;
  overflow-wrap: anywhere;
}

.broadcast-strip :deep(.broadcast-player) { align-self: center; }

.broadcast-strip__source {
  display: grid;
  place-items: center;
  border-left: 1px solid var(--color-hairline);
  color: var(--color-paper);
  font-size: 1.5rem;
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard);
}

.broadcast-strip__source:hover,
.broadcast-strip__source:focus-visible { background: var(--color-paper); color: var(--color-void); }
.broadcast-strip__source:focus-visible { outline: 3px solid var(--color-paper); outline-offset: -3px; }

@media (width < 1100px) {
  .broadcast-strip { grid-template-columns: 5.5rem minmax(0, 1fr) 3.5rem; }
  .broadcast-strip :deep(.broadcast-player) {
    grid-column: 1 / -1;
    border-top: 1px solid var(--color-hairline);
  }
  .broadcast-strip__source { grid-column: 3; grid-row: 1; }
  .broadcast-strip__number { grid-row: 1; }
}

@media (width < 600px) {
  .broadcast-strip { display: flex; flex-direction: column; }
  .broadcast-strip__number {
    min-height: 5.5rem;
    padding-block: 1.5rem;
    border-right: 0;
    border-bottom: 1px solid var(--color-hairline);
    font-size: clamp(3rem, 18vw, 4.5rem);
  }
  .broadcast-strip__identity { gap: 1rem; padding-block: 1.25rem 1.5rem; }
  .broadcast-strip :deep(.broadcast-player) { width: 100%; border-top: 0; }
  .broadcast-strip__source {
    min-height: 3.25rem;
    border-top: 1px solid var(--color-hairline);
    border-left: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .broadcast-strip__source { transition: none; }
}
</style>
