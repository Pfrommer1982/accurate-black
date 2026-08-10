<script setup lang="ts">
import type { ReleaseLink } from '~/types/release'

defineProps<{ links: ReleaseLink[] }>()
</script>

<template>
  <nav v-if="links.length" class="release-actions" aria-label="Listen to or buy this release">
    <a
      v-for="link in links"
      :key="link.url"
      :href="link.url"
      class="release-actions__link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>{{ link.label }}</span>
      <span aria-hidden="true">↗</span>
    </a>
  </nav>
</template>

<style scoped>
.release-actions { margin-top: 3rem; border-top: 1px solid var(--color-hairline); }
.release-actions__link {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  min-height: 3.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-hairline);
  color: var(--color-paper);
  font-family: var(--font-mono);
  font-size: .6875rem;
  letter-spacing: .08em;
  text-decoration: none;
  transition: padding-inline var(--duration-utility) var(--ease-standard), background var(--duration-fast) var(--ease-standard);
}
.release-actions__link:hover,
.release-actions__link:focus-visible { padding-inline: .75rem; background: rgb(255 255 255 / 3%); }
.release-actions__link:focus-visible { outline: 2px solid var(--color-paper); outline-offset: -2px; }
</style>
