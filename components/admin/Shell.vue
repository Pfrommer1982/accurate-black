<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  index?: string
  lede?: string
  showNav?: boolean
}>(), {
  index: 'ADMIN',
  lede: '',
  showNav: true,
})

const route = useRoute()

const links = [
  { to: '/admin/releasesform', code: '01', label: 'Release' },
  { to: '/admin/radioshow', code: '02', label: 'Broadcast' },
  { to: '/admin/table', code: '03', label: 'Overview' },
] as const

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

useSeoMeta({
  robots: 'noindex, nofollow',
  title: `${props.title} · Admin`,
})
</script>

<template>
  <div class="admin-shell">
    <header class="admin-shell__masthead">
      <p class="admin-shell__eyebrow">{{ index }} / Accurate Black</p>
      <h1 class="admin-shell__title">{{ title }}</h1>
      <p v-if="lede" class="admin-shell__lede">{{ lede }}</p>

      <nav
        v-if="showNav"
        class="admin-shell__nav"
        aria-label="Admin sections"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="admin-shell__nav-link"
          :class="{ 'admin-shell__nav-link--active': route.path === link.to }"
          v-scramble.hover
        >
          <span>{{ link.code }}</span>
          {{ link.label }}
        </NuxtLink>
      </nav>
    </header>

    <div class="admin-shell__body">
      <slot />
    </div>
  </div>
</template>
