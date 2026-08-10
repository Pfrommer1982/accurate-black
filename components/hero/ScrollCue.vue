<template>
  <div class="scroll-cue" aria-label="Scroll to descend into the catalogue">
    <span>SCROLL / DESCEND</span>
    <i aria-hidden="true"><b /></i>
  </div>
</template>

<style scoped>
.scroll-cue { grid-column: 2 / 7; grid-row: 7; z-index: 4; align-self: end; display: grid; gap: .65rem; margin-bottom: .65rem; color: var(--color-muted); font-family: var(--font-mono); font-size: .5625rem; letter-spacing: .09em; opacity: var(--hero-portal-opacity); }
.scroll-cue i { display: block; width: 100%; height: 1px; overflow: hidden; background: var(--color-hairline); }
.scroll-cue b { display: block; width: 100%; height: 100%; background: var(--color-paper); transform: scaleX(var(--hero-progress)); transform-origin: left; }

@media (width < 768px) {
  .scroll-cue { grid-column: 1 / 3; grid-row: 3; align-self: start; margin: 0; padding-top: .15rem; }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-cue { opacity: 1; }
  .scroll-cue b { transform: scaleX(.35); }
}
</style>
