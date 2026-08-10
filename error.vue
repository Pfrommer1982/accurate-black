<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const statusCode = computed(() => props.error?.statusCode || 500)
const isNotFound = computed(() => statusCode.value === 404)

const title = computed(() => (isNotFound.value ? 'Page Not Found' : 'Something Went Wrong'))
const description = computed(() => (
  isNotFound.value
    ? 'This page is not in the Accurate Black archive. Return home or open the catalogue.'
    : 'The page could not be loaded. Try again or return to the Accurate Black homepage.'
))

useSeoMeta({
  title: () => title.value,
  description: () => description.value,
  robots: 'noindex, follow',
})

useHead({
  title: () => `${statusCode.value} | Accurate Black`,
})

const handleHome = async () => {
  await clearError({ redirect: '/' })
}
</script>

<template>
  <article class="error-page">
    <header class="error-page__masthead">
      <div class="error-page__utility">
        <p>00 / ERROR</p>
        <p>{{ isNotFound ? 'NOT FOUND' : 'SYSTEM FAULT' }}</p>
        <p>ARCHIVE MISS</p>
      </div>

      <p class="error-page__code">{{ statusCode }}</p>
      <h1 class="error-page__title">
        {{ isNotFound ? 'NO PAGE HERE' : 'SIGNAL BROKEN' }}
      </h1>

      <div class="error-page__context">
        <p class="error-page__kicker">ACCURATE BLACK / LOOKUP FAILED</p>
        <p class="error-page__description">
          {{ description }}
        </p>
        <p
          v-if="error?.message && !isNotFound"
          class="error-page__detail"
        >
          {{ error.message }}
        </p>
      </div>
    </header>

    <section class="error-page__actions" aria-label="Recovery links">
      <p class="error-page__rail-label">01 / CONTINUE</p>
      <div class="error-page__links">
        <button
          type="button"
          class="error-page__link"
          v-scramble.hover
          @click="handleHome"
        >
          <span class="error-page__link-index">01</span>
          <span>BACK HOME</span>
        </button>
        <NuxtLink
          v-scramble.hover
          class="error-page__link"
          to="/releases"
        >
          <span class="error-page__link-index">02</span>
          <span>RELEASES</span>
        </NuxtLink>
        <NuxtLink
          v-scramble.hover
          class="error-page__link"
          to="/artists"
        >
          <span class="error-page__link-index">03</span>
          <span>ARTISTS</span>
        </NuxtLink>
        <NuxtLink
          v-scramble.hover
          class="error-page__link"
          to="/about"
        >
          <span class="error-page__link-index">04</span>
          <span>ABOUT</span>
        </NuxtLink>
      </div>
    </section>
  </article>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  padding-top: var(--header-height);
  overflow-x: clip;
  background: var(--color-void);
  color: var(--color-paper);
}

.error-page__masthead {
  padding: clamp(2rem, 5vw, 4.5rem) var(--page-margin) clamp(2.5rem, 5vw, 4rem);
  border-bottom: 1px solid var(--color-hairline);
}

.error-page__utility {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: .75rem;
  margin-bottom: clamp(2rem, 4vw, 3.5rem);
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.error-page__utility p {
  margin: 0;
}

.error-page__utility p:nth-child(2) {
  text-align: center;
}

.error-page__utility p:last-child {
  text-align: right;
}

.error-page__code {
  margin: 0 0 .35rem;
  color: var(--color-ash);
  font-size: clamp(5rem, 18vw, 12rem);
  font-weight: 700;
  letter-spacing: -.08em;
  line-height: .8;
}

.error-page__title {
  margin: 0 0 1.75rem;
  max-width: 14ch;
  font-size: clamp(2.4rem, 8vw, 5.5rem);
  font-weight: 400;
  letter-spacing: -.05em;
  line-height: .92;
  text-transform: uppercase;
}

.error-page__context {
  display: grid;
  gap: .85rem;
  max-width: 36rem;
}

.error-page__kicker,
.error-page__rail-label {
  margin: 0;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.error-page__description,
.error-page__detail {
  margin: 0;
  color: var(--color-ash);
  font-size: .95rem;
  line-height: 1.5;
}

.error-page__detail {
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .7rem;
}

.error-page__actions {
  padding: clamp(1.75rem, 3.5vw, 3rem) var(--page-margin);
}

.error-page__links {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  margin-top: 1.25rem;
  border: 1px solid var(--color-hairline);
  background: var(--color-hairline);
}

.error-page__link {
  display: grid;
  gap: .65rem;
  min-height: 7rem;
  padding: 1.1rem 1rem;
  border: 0;
  background: var(--color-void);
  color: var(--color-paper);
  font: inherit;
  text-align: left;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
}

.error-page__link:hover,
.error-page__link:focus-visible {
  background: var(--color-carbon);
}

.error-page__link-index {
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .08em;
}

.error-page__link span:last-child {
  font-size: clamp(.95rem, 1.6vw, 1.15rem);
  letter-spacing: -.02em;
}

@media (width < 960px) {
  .error-page__utility {
    grid-template-columns: 1fr auto;
  }

  .error-page__utility p:nth-child(2) {
    text-align: right;
  }

  .error-page__utility p:last-child {
    grid-column: 1 / -1;
    text-align: left;
  }

  .error-page__links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (width < 520px) {
  .error-page__links {
    grid-template-columns: minmax(0, 1fr);
  }

  .error-page__link {
    min-height: 4.5rem;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .error-page__link {
    transition: none;
  }
}
</style>
