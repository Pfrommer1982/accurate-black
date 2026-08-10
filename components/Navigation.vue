<script setup lang="ts">
interface NavigationItem {
  label: string
  to: string
  admin?: boolean
}

defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const items: NavigationItem[] = [
  { label: 'HOME', to: '/' },
  { label: '( NEW ) RELEASES', to: '/releases' },
  { label: 'ARTISTS', to: '/artists' },
  { label: 'ACCURATE SESSIONS', to: '/accurate-sessions' },
  { label: 'TECHTONIC', to: '/techtonic' },
  { label: 'DEMO SUBMISSION', to: '/demo-submission' },
  { label: 'ABOUT US', to: '/about' },
  { label: 'ADMIN', to: '/login', admin: true },
]
</script>

<template>
  <nav id="primary-navigation" class="navigation" :class="{ 'navigation--open': open }" aria-label="Primary navigation" :aria-hidden="!open">
    <div class="navigation__meta" aria-hidden="true"><span>MENU</span><span>ACCURATE BLACK</span></div>
    <ol class="navigation__list">
      <li v-for="(item, index) in items" :key="item.to" class="navigation__item">
        <NuxtLink v-scramble.hover="{ duration: 320, intent: 70 }" :to="item.to" class="navigation__link" :class="{ 'navigation__link--admin': item.admin }" @click="emit('close')">
          <span class="navigation__index">{{ String(index + 1).padStart(2, '0') }}</span><span>{{ item.label }}</span>
        </NuxtLink>
      </li>
    </ol>
    <div class="navigation__footer">
      <span>INDEPENDENT ELECTRONIC MUSIC LABEL</span>
      <a
        href="https://cpwd.nl"
        class="navigation__credit"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/cpwd-logo.png" alt="" width="56" height="56" loading="lazy" decoding="async">
        <span>Website build by cpwd.nl</span>
      </a>
    </div>
  </nav>
</template>

<style scoped>
.navigation {
  position: fixed;
  inset: 0;
  z-index: var(--z-navigation);
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100dvh;
  padding: calc(var(--header-height) + 2rem) var(--page-margin) 1.5rem;
  overflow: auto;
  visibility: hidden;
  background: var(--color-void);
  color: var(--color-paper);
  transform: translateX(-100%);
  transition: transform 360ms var(--ease-reveal), visibility 0s 360ms;
}

.navigation--open { visibility: visible; transform: translateX(0); transition-delay: 0s; }
.navigation__meta,
.navigation__footer { display: flex; justify-content: space-between; gap: 1rem; color: var(--color-muted); font-family: var(--font-mono); font-size: .6875rem; letter-spacing: .08em; }
.navigation__meta { padding-bottom: .75rem; border-bottom: 1px solid var(--color-hairline); }
.navigation__list { align-self: center; padding: 2rem 0; margin: 0; list-style: none; }
.navigation__item { min-height: 4rem; border-bottom: 1px solid var(--color-hairline); opacity: 0; transform: translateY(.75rem); transition: opacity var(--duration-reveal) var(--ease-reveal), transform var(--duration-reveal) var(--ease-reveal); }
.navigation__item:first-child { border-top: 1px solid var(--color-hairline); }
.navigation--open .navigation__item { opacity: 1; transform: none; }
.navigation--open .navigation__item:nth-child(1) { transition-delay: 120ms; }
.navigation--open .navigation__item:nth-child(2) { transition-delay: 156ms; }
.navigation--open .navigation__item:nth-child(3) { transition-delay: 192ms; }
.navigation--open .navigation__item:nth-child(4) { transition-delay: 228ms; }
.navigation--open .navigation__item:nth-child(5),
.navigation--open .navigation__item:nth-child(n + 6) { transition-delay: 264ms; }
.navigation__link { display: grid; grid-template-columns: 3rem 1fr; align-items: center; min-height: 4rem; color: var(--color-ash); font-size: clamp(1.75rem, 4.2vw, 4.5rem); font-weight: 400; line-height: .95; letter-spacing: -.035em; text-decoration: none; transition: color var(--duration-fast) var(--ease-standard), padding-left var(--duration-utility) var(--ease-standard); }
.navigation__link:hover,
.navigation__link:focus-visible,
.navigation__link.router-link-active { padding-left: 1rem; color: var(--color-paper); }
.navigation__link--admin { opacity: .55; }
.navigation__index { color: var(--color-muted); font-family: var(--font-mono); font-size: .6875rem; letter-spacing: .08em; }
.navigation__footer { padding-top: .75rem; border-top: 1px solid var(--color-hairline); }
.navigation__credit {
  display: inline-flex;
  align-items: center;
  gap: .7rem;
  color: var(--color-ash);
  text-decoration: none;
}
.navigation__credit img {
  display: block;
  width: 3rem;
  height: 3rem;
  object-fit: contain;
  background: transparent;
  flex: 0 0 auto;
}
.navigation__credit:hover,
.navigation__credit:focus-visible { color: var(--color-paper); }

@media (width < 768px) {
  .navigation { padding-top: calc(var(--header-height) + 1rem); }
  .navigation__item,
  .navigation__link { min-height: 3.25rem; }
  .navigation__link { grid-template-columns: 2.25rem 1fr; font-size: clamp(1.45rem, 7vw, 2.25rem); }
  .navigation__link:hover,
  .navigation__link:focus-visible,
  .navigation__link.router-link-active { padding-left: .5rem; }
  .navigation__footer { flex-direction: column; }
}

@media (prefers-reduced-motion: reduce) {
  .navigation,
  .navigation__item,
  .navigation__link { transition: none; }
}
</style>
