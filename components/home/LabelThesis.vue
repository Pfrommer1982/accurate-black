<script setup lang="ts">
import SignalInterferenceField from '~/components/home/SignalInterferenceField.vue'

const section = ref<HTMLElement | null>(null)
const { isReady, isVisible } = useOnceInView(section)
</script>

<template>
  <section
    ref="section"
    class="thesis"
    :class="{ 'thesis--ready': isReady, 'thesis--visible': isVisible }"
    aria-labelledby="label-thesis-title"
  >
    <SignalInterferenceField class="thesis__signal-field" />

    <p class="thesis__index" aria-label="Section 2 of 4">02 / 04</p>

    <h2
      id="label-thesis-title"
      class="thesis__words"
      aria-label="Deep. Dark. Authentic. Profound."
    >
      <span v-scramble.hover="{ duration: 280, intent: 60 }" aria-hidden="true">DEEP.</span>
      <span v-scramble.hover="{ duration: 280, intent: 60 }" aria-hidden="true">DARK.</span>
      <span v-scramble.hover="{ duration: 300, intent: 60 }" aria-hidden="true">AUTHENTIC.</span>
      <span
        v-scramble.once.hover="{ duration: 320, delay: 480, intent: 60, trigger: isVisible }"
        aria-hidden="true"
      >PROFOUND.</span>
    </h2>

    <p class="thesis__statement">
      We delve into the depths of electronic music. This is where the beats are felt, not just heard.
    </p>

    <span class="thesis__hairline" aria-hidden="true" />
  </section>
</template>

<style scoped>
.thesis {
  position: relative;
  display: grid;
  grid-template-columns: var(--page-rail) repeat(10, minmax(0, 1fr)) var(--page-rail);
  gap: 0 var(--grid-gutter);
  min-height: 78svh;
  padding: 12rem var(--page-margin);
  overflow: hidden;
  background: var(--color-void);
  color: var(--color-paper);
  isolation: isolate;
}

.thesis__signal-field { position: absolute; inset: 0; z-index: 0; }

.thesis__index,
.thesis__words,
.thesis__statement,
.thesis__hairline { position: relative; z-index: 1; }

.thesis__index {
  grid-column: 1;
  margin: .5rem 0 0;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .6875rem;
  letter-spacing: .08em;
  white-space: nowrap;
}

.thesis__words {
  grid-column: 2 / 8;
  margin: 0;
  font-size: clamp(4rem, 6.1vw, 5.5rem);
  font-weight: 400;
  line-height: .9;
  letter-spacing: -.055em;
}

.thesis__words span {
  display: block;
}

.thesis__statement {
  grid-column: 8 / 12;
  align-self: end;
  max-width: 26.25rem;
  margin: 0 0 .45rem;
  color: var(--color-ash);
  font-size: clamp(1rem, 1.35vw, 1.25rem);
  line-height: 1.45;
}

.thesis__hairline {
  position: absolute;
  right: var(--page-margin);
  bottom: 0;
  left: var(--page-margin);
  height: 1px;
  background: var(--color-hairline);
  transform-origin: left;
}

.thesis--ready:not(.thesis--visible) .thesis__statement {
  clip-path: inset(100% 0 0);
}

.thesis--ready:not(.thesis--visible) .thesis__signal-field {
  opacity: .16;
  filter: blur(3px);
  transform: scale(.97);
}

.thesis--ready:not(.thesis--visible) .thesis__words span {
  opacity: 0;
  clip-path: inset(0 0 100%);
  transform: translateY(.7em);
}

.thesis--ready:not(.thesis--visible) .thesis__hairline {
  transform: scaleX(0);
}

.thesis__signal-field { transition: opacity 1000ms var(--ease-reveal), filter 1000ms var(--ease-reveal), transform 1000ms var(--ease-reveal); }

.thesis__words span {
  clip-path: inset(0);
  transition: opacity 900ms var(--ease-reveal), clip-path 980ms var(--ease-reveal), transform 980ms var(--ease-reveal);
}

.thesis__words span:nth-child(2) { transition-delay: 100ms; }
.thesis__words span:nth-child(3) { transition-delay: 200ms; }
.thesis__words span:nth-child(4) { transition-delay: 300ms; }

.thesis__statement {
  clip-path: inset(0);
  transition: clip-path 940ms var(--ease-reveal) 360ms;
}

.thesis__hairline {
  transition: transform 1000ms var(--ease-reveal) 260ms;
}

@media (width < 1280px) {
  .thesis { min-height: auto; padding-block: 8rem 6rem; }
  .thesis__words { grid-column: 2 / 8; }
  .thesis__statement { grid-column: 8 / 12; }
}

@media (width < 768px) {
  .thesis {
    display: block;
    padding-block: 6rem;
  }

  .thesis__index { margin: 0 0 2rem; }
  .thesis__words { font-size: clamp(2.5rem, 13vw, 3.5rem); line-height: .94; }
  .thesis__statement { max-width: 31rem; margin-top: 3rem; font-size: 1rem; }
}

@media (prefers-reduced-motion: reduce) {
  .thesis__words,
  .thesis__words span,
  .thesis__statement,
  .thesis__hairline,
  .thesis__signal-field { opacity: 1 !important; clip-path: none !important; filter: none !important; transform: none !important; transition: none; }
}
</style>
