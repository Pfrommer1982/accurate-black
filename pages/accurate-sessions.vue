<script setup lang="ts">
import BroadcastArchive from '~/components/broadcast/BroadcastArchive.vue'
import type { BroadcastArchiveResponse } from '~/types/broadcast'

const { data, pending, error } = await useFetch<BroadcastArchiveResponse>('/api/broadcast/sessions', {
  key: 'broadcast-accurate-sessions',
  default: () => ({ episodes: [], refreshedAt: '' }),
})

const episodes = computed(() => data.value?.episodes ?? [])

usePageSeo(
  'Accurate Sessions Archive',
  'Listen to recorded Accurate Black label sessions and guest mixes from the archive.',
  undefined,
  { path: '/accurate-sessions' },
)
</script>

<template>
  <BroadcastArchive
    title="ACCURATE SESSIONS"
    kicker="LABEL SESSION ARCHIVE"
    description="Recorded Accurate Black sessions and guest transmissions, preserved as a living signal archive."
    source-label="FIRESTORE / ACCURATE SESSIONS"
    archive-number="06"
    :episodes="episodes"
    :refreshed-at="data?.refreshedAt"
    :pending="pending"
    :error="Boolean(error)"
  />
</template>
