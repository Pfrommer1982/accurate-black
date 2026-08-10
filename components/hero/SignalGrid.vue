<script setup lang="ts">
const rails = [
  { position: '5.5%', group: 'slow' },
  { position: '20%', group: 'fast' },
  { position: '37%', group: 'slow' },
  { position: '53.5%', group: 'fast' },
  { position: '68.5%', group: 'focus' },
  { position: '84%', group: 'slow' },
  { position: '96%', group: 'fast' },
]

const pulses = [
  { position: '5.5%', delay: '-1.6s', duration: '8.4s', size: '2px', staticTop: '18%' },
  { position: '20%', delay: '-5.9s', duration: '10.2s', size: '3px', staticTop: '67%' },
  { position: '37%', delay: '-3.2s', duration: '7.8s', size: '2px', staticTop: '42%' },
  { position: '53.5%', delay: '-8.1s', duration: '11.4s', size: '2px', staticTop: '79%' },
  { position: '68.5%', delay: '-4.7s', duration: '9.1s', size: '3px', staticTop: '31%' },
  { position: '84%', delay: '-7.3s', duration: '10.7s', size: '2px', staticTop: '56%' },
]
</script>

<template>
  <div class="signal-grid" aria-hidden="true">
    <span
      v-for="(rail, index) in rails"
      :key="rail.position"
      class="signal-grid__rail"
      :class="`signal-grid__rail--${rail.group}`"
      :style="{ '--rail-left': rail.position, '--rail-delay': `${120 + index * 85}ms` }"
    ><i /></span>
    <i
      v-for="(pulse, index) in pulses"
      :key="`${pulse.position}-${pulse.delay}`"
      class="signal-grid__pulse"
      :class="`signal-grid__pulse--${index + 1}`"
      :style="{
        '--pulse-left': pulse.position,
        '--pulse-delay': pulse.delay,
        '--pulse-duration': pulse.duration,
        '--pulse-size': pulse.size,
        '--pulse-static-top': pulse.staticTop,
      }"
    />
    <span class="signal-grid__threshold" />
  </div>
</template>

<style scoped>
.signal-grid { position: absolute; inset: var(--header-height) 0 0; z-index: 0; overflow: hidden; pointer-events: none; }
.signal-grid__rail { position: absolute; inset-block: 0; left: var(--rail-left); width: 1px; opacity: var(--hero-rail-opacity); will-change: transform, opacity; }
.signal-grid__rail i { display: block; width: 100%; height: 100%; background: var(--color-signal); transform: scaleY(0); transform-origin: top; animation: rail-draw 780ms var(--ease-reveal) var(--rail-delay) forwards; }
.signal-grid__rail--slow { transform: translate3d(0, var(--hero-rail-slow-y), 0); }
.signal-grid__rail--fast { transform: translate3d(0, var(--hero-rail-fast-y), 0); }
.signal-grid__rail--focus { transform: translate3d(0, var(--hero-rail-focus-y), 0); opacity: var(--hero-focus-rail-opacity); }
.signal-grid__pulse { position: absolute; z-index: 2; top: -.5rem; left: var(--pulse-left); width: var(--pulse-size); height: var(--pulse-size); margin-left: calc(var(--pulse-size) / -2); border-radius: 50%; background: var(--color-paper); box-shadow: 0 0 5px rgb(241 239 233 / 48%); opacity: .72; animation: signal-pulse-descend var(--pulse-duration) linear var(--pulse-delay) infinite, signal-pulse-breathe 2.4s ease-in-out var(--pulse-delay) infinite alternate; will-change: transform, opacity; }
.signal-grid__threshold { position: absolute; right: 0; bottom: 0; left: 0; height: 1px; background: var(--color-signal); opacity: var(--hero-threshold-opacity); transform: scaleX(var(--hero-progress)); transform-origin: center; }

@keyframes rail-draw { to { transform: scaleY(1); } }
@keyframes signal-pulse-descend { to { transform: translate3d(0, calc(100svh - var(--header-height) + 1rem), 0); } }
@keyframes signal-pulse-breathe { from { opacity: .28; } to { opacity: .82; } }

@media (width < 768px) {
  .signal-grid__rail:nth-child(2),
  .signal-grid__rail:nth-child(4),
  .signal-grid__rail:nth-child(7) { display: none; }
  .signal-grid__rail { opacity: .16; }
  .signal-grid__pulse--2,
  .signal-grid__pulse--4 { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .signal-grid__rail,
  .signal-grid__rail--focus { opacity: .18; transform: none; }
  .signal-grid__rail i { animation: none; transform: none; }
  .signal-grid__pulse { top: var(--pulse-static-top); animation: none; opacity: .42; transform: none; }
  .signal-grid__threshold { opacity: .2; transform: none; }
}
</style>
