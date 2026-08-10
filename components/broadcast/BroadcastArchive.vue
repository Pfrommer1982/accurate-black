<script setup lang="ts">
import BroadcastEpisodeList from '~/components/broadcast/BroadcastEpisodeList.vue'
import BroadcastFeatured from '~/components/broadcast/BroadcastFeatured.vue'
import BroadcastMasthead from '~/components/broadcast/BroadcastMasthead.vue'
import type { BroadcastEpisode } from '~/types/broadcast'

const props = defineProps<{
  title: string
  kicker: string
  description: string
  sourceLabel: string
  archiveNumber: string
  episodes: BroadcastEpisode[]
  refreshedAt?: string
  pending?: boolean
  error?: boolean
  externalUrl?: string
  externalLabel?: string
}>()

const latest = computed(() => props.episodes[0] ?? null)
const archive = computed(() => props.episodes.slice(1))
</script>

<template>
  <article class="broadcast-archive">
    <BroadcastMasthead
      :title="title"
      :kicker="kicker"
      :description="description"
      :source-label="sourceLabel"
      :archive-number="archiveNumber"
      :episode-count="episodes.length"
      :external-url="externalUrl"
      :external-label="externalLabel"
      :refreshed-at="refreshedAt"
    />

    <div v-if="pending" class="broadcast-archive__state" role="status">Tuning archive frequency…</div>
    <div v-else-if="error" class="broadcast-archive__state broadcast-archive__state--error" role="alert">
      Broadcast signal temporarily unavailable. Please try again shortly.
    </div>
    <template v-else-if="latest">
      <BroadcastFeatured :episode="latest" />
      <BroadcastEpisodeList v-if="archive.length" :episodes="archive" />
    </template>
    <div v-else class="broadcast-archive__state">No public episodes are transmitting right now.</div>
  </article>
</template>

<style scoped>
.broadcast-archive {
  min-height: 100vh;
  padding-top: var(--header-height);
  overflow-x: clip;
  background: var(--color-void);
  color: var(--color-paper);
}

.broadcast-archive__state {
  min-height: 26rem;
  padding: 2rem var(--page-margin);
  border-bottom: 1px solid var(--color-hairline);
  color: var(--color-ash);
  font-family: var(--font-mono);
  font-size: .75rem;
  letter-spacing: .07em;
}

.broadcast-archive__state--error { color: var(--color-error); }
</style>
