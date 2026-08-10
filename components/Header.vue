<script setup lang="ts">
const MENU_FOCUS_DELAY = 420
const isMenuOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
let focusTimer: ReturnType<typeof setTimeout> | null = null

const { isScrolled, isVisible, showHeader } = useHeaderVisibility(isMenuOpen)

const focusableElements = (): HTMLElement[] => {
  const navigation = document.getElementById('primary-navigation')
  const links = navigation
    ? Array.from(navigation.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
    : []
  return menuButton.value ? [menuButton.value, ...links] : links
}

const closeMenu = () => { isMenuOpen.value = false }
const toggleMenu = () => { isMenuOpen.value = !isMenuOpen.value }

const handleKeydown = (event: KeyboardEvent) => {
  if (!isMenuOpen.value) return

  if (event.key === 'Escape') {
    event.preventDefault()
    closeMenu()
    return
  }

  if (event.key !== 'Tab') return
  const focusable = focusableElements()
  const first = focusable[0]
  const last = focusable.at(-1)
  if (!first || !last) return

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(isMenuOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
  const main = document.getElementById('main-content')
  if (main) main.inert = open

  if (focusTimer) clearTimeout(focusTimer)
  if (open) {
    focusTimer = setTimeout(() => { focusableElements()[1]?.focus() }, MENU_FOCUS_DELAY)
  } else {
    menuButton.value?.focus({ preventScroll: true })
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
  const main = document.getElementById('main-content')
  if (main) main.inert = false
  if (focusTimer) clearTimeout(focusTimer)
})
</script>

<template>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header" :class="{ 'site-header--scrolled': isScrolled, 'site-header--hidden': !isVisible, 'site-header--menu-open': isMenuOpen }" @focusin="showHeader">
    <NuxtLink to="/" class="site-header__logo" aria-label="Accurate Black — Home" @click="closeMenu">
      <LogoText />
    </NuxtLink>
    <button ref="menuButton" class="menu-button" :class="{ 'menu-button--open': isMenuOpen }" type="button" aria-controls="primary-navigation" :aria-expanded="isMenuOpen" :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'" @click="toggleMenu">
      <span class="menu-button__line" /><span class="menu-button__line" /><span class="menu-button__line" />
    </button>
  </header>
  <Navigation :open="isMenuOpen" @close="closeMenu" />
</template>

<style scoped>
.skip-link { position: fixed; top: .5rem; left: .5rem; z-index: calc(var(--z-header) + 1); padding: .75rem 1rem; background: var(--color-paper); color: var(--color-void); font-family: var(--font-mono); font-size: .75rem; text-decoration: none; transform: translateY(-150%); }
.skip-link:focus { transform: translateY(0); }
.site-header { position: fixed; inset: 0 0 auto; z-index: var(--z-header); display: flex; align-items: center; justify-content: space-between; height: var(--header-height); padding: 0 var(--page-margin); background: transparent; transform: translateY(0); transition: transform var(--duration-utility) var(--ease-standard), height var(--duration-utility) var(--ease-standard), background-color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard); will-change: transform; }
.site-header--scrolled { height: var(--header-height-compact); border-bottom: 1px solid var(--color-hairline); background: var(--color-header); }
.site-header--hidden { transform: translateY(-100%); }
.site-header--menu-open { height: var(--header-height); border-color: transparent; background: var(--color-void); transform: translateY(0); }
.site-header__logo { display: inline-flex; align-items: center; width: var(--header-logo-expanded); min-height: var(--header-target); color: inherit; text-decoration: none; }
.menu-button { position: relative; width: var(--header-target); height: var(--header-target); padding: 0; border: 0; background: transparent; color: var(--color-paper); cursor: pointer; }
.menu-button__line { position: absolute; top: 50%; left: 50%; display: block; width: 1.75rem; height: 1px; background: currentColor; transform-origin: center; transition: transform var(--duration-utility) var(--ease-standard), opacity var(--duration-fast) var(--ease-standard); }
.menu-button__line:nth-child(1) { transform: translate(-50%, calc(-50% - .35rem)); }
.menu-button__line:nth-child(2) { transform: translate(-50%, -50%); }
.menu-button__line:nth-child(3) { transform: translate(-50%, calc(-50% + .35rem)); }
.menu-button--open .menu-button__line:nth-child(1) { transform: translate(-50%, -50%) rotate(45deg); }
.menu-button--open .menu-button__line:nth-child(2) { opacity: 0; }
.menu-button--open .menu-button__line:nth-child(3) { transform: translate(-50%, -50%) rotate(-45deg); }

@media (prefers-reduced-motion: reduce) {
  .site-header,
  .menu-button__line { transition: none; }
}
</style>
