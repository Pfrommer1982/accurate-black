<script setup lang="ts">
import type { VideoSummary } from '~/types/video'

const props = defineProps<{
  video: VideoSummary
  index: number
}>()

const displayIndex = computed(() => String(props.index + 1).padStart(3, '0'))
const displayDate = computed(() => props.video.publishedAt.slice(0, 10).replaceAll('-', '.'))
const revealOrder = computed(() => Math.min(props.index, 8))
</script>

<template>
  <li class="transmission-card" :style="{ '--transmission-order': revealOrder }">
    <a
      class="transmission-card__link"
      :href="video.watchUrl"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="`Watch transmission ${displayIndex}: ${video.title} on YouTube`"
    >
      <figure class="transmission-card__figure">
        <span class="transmission-card__media">
          <img
            :src="video.thumbnailUrl"
            :alt="`Video thumbnail for ${video.title}`"
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
          >
          <span class="transmission-card__scan" aria-hidden="true" />
          <span class="transmission-card__shutter" aria-hidden="true" />
          <span class="transmission-card__play" aria-hidden="true">▶</span>
        </span>

        <figcaption class="transmission-card__caption">
          <span class="transmission-card__meta">
            <span>{{ displayIndex }}</span>
            <time :datetime="video.publishedAt">{{ displayDate }}</time>
          </span>
          <strong>{{ video.title }}</strong>
          <span class="transmission-card__direction" aria-hidden="true">WATCH / ↗</span>
        </figcaption>
      </figure>
    </a>
  </li>
</template>

<style scoped>
.transmission-card {
  min-width: 0;
  list-style: none;
  background: var(--color-void);
}

.transmission-card__link {
  display: block;
  height: 100%;
  padding: clamp(.75rem, 1vw, 1rem);
  color: var(--color-paper);
  text-decoration: none;
}

.transmission-card__figure { display: grid; gap: 1rem; margin: 0; }

.transmission-card__media {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--color-carbon);
}

.transmission-card__media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 360ms var(--ease-standard), opacity 240ms linear;
}

.transmission-card__scan {
  position: absolute;
  z-index: 2;
  top: -1px;
  right: 0;
  left: 0;
  height: 1px;
  background: var(--color-paper);
  opacity: 0;
  transition: top 480ms var(--ease-standard), opacity 80ms linear;
}

.transmission-card__shutter {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: var(--color-paper);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 900ms var(--ease-reveal) calc(var(--transmission-order) * 100ms);
}

.transmission-card__play {
  position: absolute;
  z-index: 4;
  top: .7rem;
  right: .7rem;
  display: grid;
  place-items: center;
  width: 2.5rem;
  aspect-ratio: 1;
  border: 1px solid var(--color-paper);
  background: var(--color-void);
  color: var(--color-paper);
  font-size: .75rem;
  transition: color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard);
}

.transmission-card__caption {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: .7rem 1rem;
  min-height: 6.25rem;
}

.transmission-card__meta {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .07em;
}

.transmission-card__caption strong {
  max-width: 24rem;
  font-size: clamp(1rem, 1.3vw, 1.35rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -.025em;
  transition: transform var(--duration-fast) var(--ease-standard);
}

.transmission-card__direction {
  align-self: end;
  color: var(--color-ash);
  font-family: var(--font-mono);
  font-size: .5625rem;
  letter-spacing: .07em;
  transition: transform var(--duration-fast) var(--ease-standard);
}

.transmission-card__link:hover .transmission-card__media img,
.transmission-card__link:focus-visible .transmission-card__media img { transform: translateY(-2px) scale(1.015); }

.transmission-card__link:hover .transmission-card__scan,
.transmission-card__link:focus-visible .transmission-card__scan { top: calc(100% - 1px); opacity: .8; }

.transmission-card__link:hover .transmission-card__play,
.transmission-card__link:focus-visible .transmission-card__play { background: var(--color-paper); color: var(--color-void); transform: translate(3px, -3px); }

.transmission-card__link:hover .transmission-card__caption strong,
.transmission-card__link:focus-visible .transmission-card__caption strong,
.transmission-card__link:hover .transmission-card__direction,
.transmission-card__link:focus-visible .transmission-card__direction { transform: translateX(4px); }

.transmission-card__link:focus-visible {
  position: relative;
  z-index: 2;
  outline: 3px solid var(--color-paper);
  outline-offset: -3px;
}

:global(.transmission-archive--ready:not(.transmission-archive--visible)) .transmission-card__shutter { transform: scaleY(1); }

@media (width < 600px) {
  .transmission-card__link { padding: .75rem 0 1.1rem; }
  .transmission-card__caption { min-height: auto; padding-inline: .25rem; }
  .transmission-card__caption strong { font-size: 1.2rem; }
}

@media (prefers-reduced-motion: reduce) {
  .transmission-card__shutter { display: none; }
  .transmission-card__media img,
  .transmission-card__scan,
  .transmission-card__play,
  .transmission-card__caption strong,
  .transmission-card__direction { transition: none; }
  .transmission-card__link:hover .transmission-card__media img,
  .transmission-card__link:focus-visible .transmission-card__media img { transform: none; }
  .transmission-card__scan { display: none; }
}
</style>
