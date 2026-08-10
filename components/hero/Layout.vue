<template>
  <div class="hero-layout"><slot /></div>
</template>

<style scoped>
.hero-layout { position: relative; z-index: 2; display: grid; grid-template-columns: var(--page-rail) repeat(10, minmax(0, 1fr)) var(--page-rail); grid-template-rows: var(--header-height) repeat(6, minmax(0, 1fr)); gap: 0 var(--grid-gutter); min-height: 100svh; padding: 0 var(--page-margin) 1rem; }

@media (width < 768px) {
  .hero-layout {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: var(--header-height) auto auto auto auto;
    gap: .85rem var(--grid-gutter);
    min-height: 100svh;
    padding-bottom: 1.25rem;
  }
}
</style>
