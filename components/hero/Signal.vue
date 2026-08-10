<template><span class="hero-signal" aria-hidden="true" /></template>

<style scoped>
.hero-signal { position: absolute; top: var(--header-height); bottom: 0; left: 68.5%; z-index: 0; width: 1px; background: var(--color-signal); opacity: 0; transform: scaleY(0); transform-origin: top; animation: signal-open var(--duration-hero) var(--ease-reveal) 180ms both; }

@keyframes signal-open {
  from { opacity: 0; transform: scaleY(0); }
  to { opacity: .34; transform: scaleY(1); }
}

@media (width < 768px) {
  .hero-signal { top: 18.5rem; right: var(--page-margin); bottom: auto; left: var(--page-margin); width: auto; height: 1px; transform: scaleX(0); transform-origin: left; }
  @keyframes signal-open {
    from { opacity: 0; transform: scaleX(0); }
    to { opacity: .34; transform: scaleX(1); }
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-signal { opacity: .34; animation: none; transform: none; }
}
</style>
