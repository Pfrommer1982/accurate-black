<script setup lang="ts">
import BroadcastArchive from '~/components/broadcast/BroadcastArchive.vue'
import type { BroadcastArchiveResponse } from '~/types/broadcast'

const { data, pending, error } = await useFetch<BroadcastArchiveResponse>('/api/broadcast/techtonic', {
  key: 'broadcast-techtonic',
  default: () => ({ episodes: [], refreshedAt: '' }),
})

const episodes = computed(() => data.value?.episodes ?? [])

usePageSeo(
  'Techtonic Radio Archive',
  "Listen to Robbi Altidore's Techtonic underground radio archive for Accurate Black on In Progress Radio.",
  undefined,
  { path: '/techtonic' },
)
</script>

<template>
  <BroadcastArchive
    title="TECHTONIC"
    kicker="ROBBI ALTIDORE / IN PROGRESS RADIO"
    description="Accurate Black's recurring underground radio transmission. A continuing frequency study in deep, dark and uncompromising electronic music."
    source-label="SOUNDCLOUD RSS / TECHTONIC"
    archive-number="05"
    :episodes="episodes"
    :refreshed-at="data?.refreshedAt"
    :pending="pending"
    :error="Boolean(error)"
    external-url="https://inprogressradio.com/index.php/members/robbi-altidore/"
    external-label="IN PROGRESS RADIO"
  />
</template>
