<script setup lang="ts">
import TransmissionCard from '~/components/home/TransmissionCard.vue'
import type { VideoSummary } from '~/types/video'

defineProps<{
  videos: VideoSummary[]
  pending?: boolean
  error?: boolean
}>()

const section = ref<HTMLElement | null>(null)
const { isReady, isVisible } = useOnceInView(section)
</script>

<template>
  <section
    id="transmissions"
    ref="section"
    class="transmission-archive"
    :class="{
      'transmission-archive--ready': isReady,
      'transmission-archive--visible': isVisible,
    }"
    aria-labelledby="transmission-archive-title"
  >
    <header class="transmission-archive__masthead">
      <div class="transmission-archive__utility">
        <p>[04] / BROADCAST ARCHIVE</p>
        <p>ACCURATE BLACK / YOUTUBE CHANNEL</p>
        <p>{{ String(videos.length).padStart(2, '0') }} TRANSMISSIONS</p>
      </div>

      <h2 id="transmission-archive-title" class="transmission-archive__title">
        <span>TRANSMISSIONS</span>
        <span>{{ videos.length ? `001—${String(videos.length).padStart(3, '0')}` : 'NO SIGNAL' }}</span>
      </h2>
    </header>

    <div v-if="pending" class="transmission-archive__state" role="status">Tuning broadcast archive…</div>
    <div v-else-if="error" class="transmission-archive__state" role="alert">The broadcast archive is temporarily unavailable.</div>
    <ol v-else-if="videos.length" class="transmission-archive__grid" aria-label="Latest Accurate Black video transmissions">
      <TransmissionCard
        v-for="(video, index) in videos"
        :key="video.id"
        :video="video"
        :index="index"
      />
    </ol>
    <div v-else class="transmission-archive__state">No transmissions are available right now.</div>
  </section>
</template>

<style scoped>
.transmission-archive {
  position: relative;
  width: 100%;
  padding-top: clamp(4.5rem, 7vw, 7.5rem);
  overflow: hidden;
  background: var(--color-void);
  color: var(--color-paper);
}

.transmission-archive__masthead {
  position: relative;
  padding: 1.25rem var(--page-margin) clamp(2rem, 4vw, 4rem);
}

.transmission-archive__masthead::before,
.transmission-archive__masthead::after {
  position: absolute;
  right: 0;
  left: 0;
  height: 1px;
  background: var(--color-hairline);
  content: '';
  transform-origin: left;
  transition: transform 900ms var(--ease-reveal);
}

.transmission-archive__masthead::before { top: 0; }
.transmission-archive__masthead::after { bottom: 0; transition-delay: 120ms; }

.transmission-archive__utility {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 1rem;
  margin-bottom: clamp(3rem, 6vw, 6.5rem);
  color: var(--color-ash);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .08em;
}

.transmission-archive__utility p { margin: 0; }
.transmission-archive__utility p:nth-child(2) { text-align: center; }
.transmission-archive__utility p:last-child { text-align: right; }

.transmission-archive__title {
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

.transmission-archive__title span { display: block; padding-inline-end: .08em; }

.transmission-archive__title span:last-child {
  padding-inline: .05em .12em;
  color: var(--color-muted);
  font-size: var(--archive-range-size);
  font-family: var(--font-mono);
  font-weight: 400;
  letter-spacing: -.05em;
}

.transmission-archive__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  margin: 0;
  padding: 1px 0 0;
  background: var(--color-hairline);
  list-style: none;
}

.transmission-archive__state {
  min-height: 18rem;
  padding: 2rem var(--page-margin);
  border-top: 1px solid var(--color-hairline);
  color: var(--color-ash);
  font-family: var(--font-mono);
  font-size: .75rem;
  letter-spacing: .07em;
}

.transmission-archive--ready:not(.transmission-archive--visible) .transmission-archive__masthead::before,
.transmission-archive--ready:not(.transmission-archive--visible) .transmission-archive__masthead::after { transform: scaleX(0); }

.transmission-archive--ready:not(.transmission-archive--visible) .transmission-archive__utility,
.transmission-archive--ready:not(.transmission-archive--visible) .transmission-archive__title span:first-child { clip-path: inset(0 100% 0 0); }

.transmission-archive--ready:not(.transmission-archive--visible) .transmission-archive__title span:last-child { clip-path: inset(0 0 0 100%); }

.transmission-archive--ready:not(.transmission-archive--visible) .transmission-archive__utility { clip-path: inset(0 100% 0 0); }

.transmission-archive__utility,
.transmission-archive__title span { clip-path: inset(0); transition: clip-path 920ms var(--ease-reveal) 120ms; }

.transmission-archive__title span:last-child { transition-delay: 240ms; }

@media (width < 1100px) {
  .transmission-archive__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (width < 768px) {
  .transmission-archive { padding-top: 4.5rem; }
  .transmission-archive__masthead { padding-inline: var(--page-margin); }
  .transmission-archive__utility { grid-template-columns: 1fr auto; margin-bottom: 3.5rem; }
  .transmission-archive__utility p:nth-child(2) { display: none; }
  .transmission-archive__title { grid-template-columns: 1fr; gap: 1.25rem; }
  .transmission-archive__title span:last-child { justify-self: end; }
  .transmission-archive__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (width < 600px) {
  .transmission-archive__grid { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .transmission-archive__masthead::before,
  .transmission-archive__masthead::after,
  .transmission-archive__utility,
  .transmission-archive__title span { opacity: 1 !important; clip-path: none !important; transform: none !important; transition: none; }
}
</style>
