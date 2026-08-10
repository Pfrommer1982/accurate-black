<script setup lang="ts">
import type { FeaturedRelease } from '~/types/release'

const props = defineProps<{
  release: FeaturedRelease
  active: boolean
  sectionVisible: boolean
}>()

const emit = defineEmits<{
  pointerIntent: []
  pointerLeave: []
  focus: []
}>()

const { prefetchRelease } = useReleasePrefetch()

const markReturn = () => {
  rememberReleaseReturn('/#releases')
  prefetchRelease(props.release.catalogNumber)
}

const onPointerIntent = () => {
  markReturn()
  emit('pointerIntent')
}

const onFocus = () => {
  markReturn()
  emit('focus')
}
</script>

<template>
  <li class="catalogue-row" :class="{ 'catalogue-row--active': active }">
    <NuxtLink
      :to="`/releases/${encodeURIComponent(release.catalogNumber)}`"
      class="catalogue-row__link"
      :aria-label="`Open ${release.catalogNumber} — ${release.title} by ${release.artist}`"
      @mouseenter="onPointerIntent"
      @mouseleave="emit('pointerLeave')"
      @focus="onFocus"
      @click="markReturn"
    >
      <span
        v-scramble.once="{ duration: 320, trigger: active && sectionVisible }"
        class="catalogue-row__catalog"
      >{{ release.catalogNumber }}</span>
      <span class="catalogue-row__artist">{{ release.artist }}</span>
      <span class="catalogue-row__title">{{ release.title }}</span>
      <span v-if="release.year" class="catalogue-row__year">{{ release.year }}</span>
    </NuxtLink>
  </li>
</template>

<style scoped>
.catalogue-row {
  min-width: 0;
  min-height: 4.5rem;
  border-bottom: 1px solid var(--color-hairline);
}

.catalogue-row__link {
  display: grid;
  grid-template-columns: 5.5rem minmax(7.5rem, .85fr) minmax(10rem, 1.7fr) 3.5rem;
  align-items: center;
  min-height: 4.5rem;
  padding: 0 .75rem;
  color: var(--color-ash);
  text-decoration: none;
  transition: color var(--duration-direct) var(--ease-direct), background var(--duration-direct) var(--ease-direct);
}

.catalogue-row--active .catalogue-row__link,
.catalogue-row__link:hover,
.catalogue-row__link:focus-visible {
  color: var(--color-paper);
  background: rgb(255 255 255 / 2%);
}

.catalogue-row__catalog,
.catalogue-row__year {
  font-family: var(--font-mono);
  font-size: .6875rem;
  letter-spacing: .06em;
}

.catalogue-row__artist,
.catalogue-row__title {
  min-width: 0;
  overflow: hidden;
  font-size: clamp(.875rem, 1vw, 1rem);
  line-height: 1.2;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.catalogue-row__title { padding-right: 1rem; }
.catalogue-row__year { justify-self: end; }

.catalogue-row__link:focus-visible {
  outline: 2px solid var(--color-paper);
  outline-offset: -3px;
}

@media (width < 900px) {
  .catalogue-row { min-height: 5rem; }
  .catalogue-row__link { grid-template-columns: 5.5rem 1fr 3.5rem; min-height: 5rem; }
  .catalogue-row__artist,
  .catalogue-row__title { grid-column: 2; }
  .catalogue-row__artist { align-self: end; padding-bottom: .15rem; }
  .catalogue-row__title { align-self: start; padding-top: .15rem; }
  .catalogue-row__catalog { grid-row: 1 / 3; }
  .catalogue-row__year { grid-column: 3; grid-row: 1 / 3; }
}
</style>
