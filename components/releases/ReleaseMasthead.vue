<script setup lang="ts">
defineProps<{
  count: number
  range?: string
  eyebrow?: string
  level?: 'h1' | 'h2'
  embedded?: boolean
}>()
</script>

<template>
  <header class="release-masthead" :class="{ 'release-masthead--embedded': embedded }">
    <div class="release-masthead__meta">
      <p>{{ eyebrow || 'ACCURATE BLACK CATALOGUE' }}</p>
      <p>{{ String(count).padStart(2, '0') }} RELEASES</p>
      <p v-if="range">{{ range }}</p>
    </div>
    <component :is="level || 'h1'" class="release-masthead__title">RELEASES</component>
  </header>
</template>

<style scoped>
.release-masthead {
  padding: calc(var(--header-height) + 5rem) var(--page-margin) 2rem;
  color: var(--color-paper);
}

.release-masthead__meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--grid-gutter);
  padding: .8rem 0;
  border-top: 1px solid var(--color-hairline);
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .6875rem;
  letter-spacing: .08em;
}

.release-masthead__meta p { margin: 0; }
.release-masthead__meta p:nth-child(2) { text-align: center; }
.release-masthead__meta p:last-child { text-align: right; }

.release-masthead__title {
  margin: clamp(2.5rem, 6vw, 6.5rem) 0 0;
  font-size: clamp(4rem, 15.4vw, 14rem);
  font-weight: 650;
  line-height: .72;
  letter-spacing: -.085em;
  text-indent: -.075em;
  text-wrap: nowrap;
}

.release-masthead--embedded { padding-top: clamp(8rem, 14vw, 14rem); }

@media (width < 768px) {
  .release-masthead { padding-top: calc(var(--header-height) + 3.5rem); }
  .release-masthead__meta { grid-template-columns: 1fr auto; }
  .release-masthead__meta p:nth-child(2) { text-align: right; }
  .release-masthead__meta p:last-child { grid-column: 1 / -1; text-align: left; }
  .release-masthead__title { margin-top: 3rem; font-size: clamp(3.45rem, 20vw, 7rem); line-height: .8; }
}
</style>
