<script setup lang="ts">
import type { ReleaseTrack } from '~/types/release'

const props = defineProps<{ tracks: ReleaseTrack[] }>()

type PlaybackState = 'idle' | 'loading' | 'playing' | 'paused' | 'ended' | 'unavailable' | 'error'

const activeIndex = ref<number | null>(null)
const playbackState = ref<PlaybackState>('idle')
const currentTime = ref(0)
const measuredDuration = ref(0)
let audio: HTMLAudioElement | null = null
let pendingSeek: number | null = null

const durationFor = (track: ReleaseTrack, index: number): number => {
  if (activeIndex.value === index && measuredDuration.value > 0) return measuredDuration.value
  return (track.audio?.durationMs ?? 0) / 1000
}

const progressFor = (track: ReleaseTrack, index: number): number => {
  const duration = durationFor(track, index)
  return activeIndex.value === index && duration > 0
    ? Math.min(100, Math.max(0, currentTime.value / duration * 100))
    : 0
}

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const minutes = Math.floor(seconds / 60)
  return `${minutes}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`
}

const resetActiveAudio = () => {
  if (!audio) return
  audio.pause()
  audio.currentTime = 0
  audio.removeAttribute('src')
  audio.load()
  currentTime.value = 0
  measuredDuration.value = 0
  pendingSeek = null
}

const loadTrack = (index: number): boolean => {
  const track = props.tracks[index]
  if (!audio || !track?.audio) return false
  if (activeIndex.value === index && audio.src) return true

  resetActiveAudio()
  activeIndex.value = index
  playbackState.value = 'loading'
  audio.src = track.audio.previewUrl
  audio.preload = 'metadata'
  audio.load()
  return true
}

const toggleTrack = async (index: number) => {
  if (!loadTrack(index) || !audio) return

  if (playbackState.value === 'playing') {
    audio.pause()
    return
  }

  if (playbackState.value === 'ended') audio.currentTime = 0
  playbackState.value = 'loading'

  try {
    await audio.play()
  } catch {
    playbackState.value = 'error'
  }
}

const seekTrack = (index: number, event: Event) => {
  const target = event.currentTarget as HTMLInputElement
  const nextTime = Number(target.value)
  if (!Number.isFinite(nextTime) || !loadTrack(index) || !audio) return

  currentTime.value = nextTime
  if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) audio.currentTime = nextTime
  else pendingSeek = nextTime
  if (playbackState.value === 'loading') playbackState.value = 'paused'
}

const buttonLabel = (track: ReleaseTrack, index: number): string => {
  const prefix = activeIndex.value === index && playbackState.value === 'playing' ? 'Pause' : 'Play'
  return `${prefix} Spotify preview of ${track.title}`
}

const visibleState = (index: number): PlaybackState => {
  if (!props.tracks[index]?.audio) return 'unavailable'
  return activeIndex.value === index ? playbackState.value : 'idle'
}

onMounted(() => {
  audio = new Audio()
  audio.addEventListener('loadstart', () => { playbackState.value = 'loading' })
  audio.addEventListener('loadedmetadata', () => {
    measuredDuration.value = Number.isFinite(audio?.duration) ? audio?.duration ?? 0 : 0
    if (pendingSeek !== null && audio) {
      audio.currentTime = pendingSeek
      currentTime.value = pendingSeek
      pendingSeek = null
    }
    if (audio?.paused) playbackState.value = 'paused'
  })
  audio.addEventListener('timeupdate', () => { currentTime.value = audio?.currentTime ?? 0 })
  audio.addEventListener('playing', () => { playbackState.value = 'playing' })
  audio.addEventListener('pause', () => {
    if (playbackState.value !== 'ended' && audio?.src) playbackState.value = 'paused'
  })
  audio.addEventListener('waiting', () => { playbackState.value = 'loading' })
  audio.addEventListener('ended', () => {
    playbackState.value = 'ended'
    currentTime.value = measuredDuration.value || currentTime.value
  })
  audio.addEventListener('error', () => { playbackState.value = 'error' })
})

onBeforeUnmount(() => {
  resetActiveAudio()
  audio = null
})
</script>

<template>
  <ol class="release-tracklist">
    <li v-for="(track, index) in tracks" :key="`${track.position}-${track.title}`">
      <span class="release-tracklist__position">{{ String(track.position).padStart(2, '0') }}</span>
      <span class="release-tracklist__title">{{ track.title }}</span>

      <template v-if="track.audio">
        <button
          type="button"
          class="release-tracklist__toggle"
          :class="`release-tracklist__toggle--${visibleState(index)}`"
          :aria-label="buttonLabel(track, index)"
          :aria-pressed="activeIndex === index && playbackState === 'playing'"
          @click="toggleTrack(index)"
        >
          <span class="release-tracklist__icon" aria-hidden="true" />
        </button>

        <div class="release-tracklist__progress">
          <input
            type="range"
            min="0"
            :max="durationFor(track, index)"
            step="0.1"
            :value="activeIndex === index ? currentTime : 0"
            :style="{ '--track-progress': `${progressFor(track, index)}%` }"
            :aria-label="`Seek Spotify preview of ${track.title}`"
            @input="seekTrack(index, $event)"
          >
          <span class="sr-only" :aria-live="activeIndex === index ? 'polite' : 'off'">
            {{ visibleState(index) }}. {{ formatTime(activeIndex === index ? currentTime : 0) }} of {{ formatTime(durationFor(track, index)) }}.
          </span>
        </div>
      </template>

      <span v-else class="release-tracklist__unavailable">PREVIEW N/A</span>
    </li>
  </ol>
</template>

<style scoped>
.release-tracklist {
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--color-void);
  list-style: none;
}

.release-tracklist li {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr) 2.75rem minmax(5rem, .72fr);
  gap: .5rem;
  align-items: center;
  min-width: 0;
  min-height: 3rem;
  border-bottom: 1px solid rgb(8 8 8 / 28%);
}

.release-tracklist__position,
.release-tracklist__unavailable {
  color: #777570;
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .05em;
}

.release-tracklist__title {
  min-width: 0;
  font-size: .9rem;
  line-height: 1.2;
  overflow-wrap: break-word;
}

.release-tracklist__toggle {
  position: relative;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-void);
  cursor: pointer;
}

.release-tracklist__toggle:hover { background: rgb(8 8 8 / 7%); }
.release-tracklist__toggle:focus-visible { outline: 2px solid var(--color-void); outline-offset: -2px; }

.release-tracklist__icon {
  width: 0;
  height: 0;
  margin-left: .12rem;
  border-top: .28rem solid transparent;
  border-bottom: .28rem solid transparent;
  border-left: .46rem solid currentColor;
}

.release-tracklist__toggle--playing .release-tracklist__icon {
  width: .48rem;
  height: .58rem;
  margin: 0;
  border: 0;
  border-right: .14rem solid currentColor;
  border-left: .14rem solid currentColor;
}

.release-tracklist__toggle--loading .release-tracklist__icon {
  width: .75rem;
  height: .75rem;
  margin: 0;
  border: 1px solid rgb(8 8 8 / 24%);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: track-loading 700ms linear infinite;
}

.release-tracklist__toggle--error { color: #8b3e3e; }
.release-tracklist__toggle--error .release-tracklist__icon { width: .65rem; height: 1px; margin: 0; border: 0; background: currentColor; transform: rotate(-45deg); }

.release-tracklist__progress { min-width: 0; padding-right: .15rem; }

.release-tracklist__progress input {
  display: block;
  width: 100%;
  height: 2.75rem;
  margin: 0;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

.release-tracklist__progress input::-webkit-slider-runnable-track {
  height: 1px;
  background: linear-gradient(to right, var(--color-void) 0 var(--track-progress), rgb(8 8 8 / 24%) var(--track-progress) 100%);
}

.release-tracklist__progress input::-moz-range-track { height: 1px; background: rgb(8 8 8 / 24%); }
.release-tracklist__progress input::-moz-range-progress { height: 1px; background: var(--color-void); }
.release-tracklist__progress input::-webkit-slider-thumb { width: .5rem; height: .5rem; margin-top: calc(-.25rem + .5px); appearance: none; border: 1px solid var(--color-void); border-radius: 50%; background: var(--color-paper); }
.release-tracklist__progress input::-moz-range-thumb { width: .5rem; height: .5rem; border: 1px solid var(--color-void); border-radius: 50%; background: var(--color-paper); }
.release-tracklist__progress input:focus-visible { outline: 2px solid var(--color-void); outline-offset: -7px; }

.release-tracklist__unavailable {
  grid-column: 3 / -1;
  justify-self: end;
  padding-right: .25rem;
}

@keyframes track-loading { to { transform: rotate(1turn); } }

@media (width < 768px) {
  .release-tracklist li {
    grid-template-columns: 2rem minmax(0, 1fr) 2.75rem;
    gap: .25rem .5rem;
    padding: .35rem 0;
  }

  .release-tracklist__toggle { grid-column: 3; grid-row: 1; }
  .release-tracklist__progress { grid-column: 2 / -1; grid-row: 2; }
  .release-tracklist__progress input { height: 2rem; }
  .release-tracklist__unavailable { grid-column: 2 / -1; grid-row: 2; justify-self: start; padding: 0 0 .25rem; }
}

@media (prefers-reduced-motion: reduce) {
  .release-tracklist__toggle--loading .release-tracklist__icon { animation: none; }
}
</style>
