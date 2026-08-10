  <script setup>
  import { ref, onBeforeUnmount, onMounted } from 'vue';

  const isLoading = ref(true);
  const isExiting = ref(false);
  let exitTimer;
  let removeTimer;

  onMounted(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seenBefore = window.sessionStorage.getItem('ab:preloader-seen') === '1';
    const isNarrow = window.matchMedia('(width < 768px)').matches;
    // First visit keeps presence; return visits / mobile exit faster so content arrives sooner.
    const holdMs = seenBefore || isNarrow ? 500 : 1100;
    const exitMs = reducedMotion ? 0 : (seenBefore || isNarrow ? 420 : 900);

    exitTimer = window.setTimeout(() => {
      window.sessionStorage.setItem('ab:preloader-seen', '1');

      if (reducedMotion || exitMs === 0) {
        isLoading.value = false;
        return;
      }

      isExiting.value = true;
      removeTimer = window.setTimeout(() => {
        isLoading.value = false;
      }, exitMs);
    }, holdMs);
  });

  onBeforeUnmount(() => {
    window.clearTimeout(exitTimer);
    window.clearTimeout(removeTimer);
  });
</script>
  
<template>
  <div class="preloader" :class="{ 'preloader--exiting': isExiting }" v-if="isLoading">
    <LogoText class="logo-text" />
    <span class="preloader__signal" aria-hidden="true" />
  </div>
</template>


<style lang="scss" scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
  isolation: isolate;
}

.preloader::before,
.preloader::after {
  position: absolute;
  right: 0;
  left: 0;
  z-index: 0;
  height: calc(50% + 1px);
  background: black;
  content: '';
  transition: transform 1000ms cubic-bezier(.76, 0, .24, 1);
  will-change: transform;
}

.preloader::before {
  top: 0;
  transform-origin: top;
}

.preloader::after {
  bottom: 0;
  transform-origin: bottom;
}

.preloader--exiting {
  background: transparent;
  pointer-events: none;
}

.preloader--exiting::before { transform: translateY(-100%); }
.preloader--exiting::after { transform: translateY(100%); }

.preloader__signal {
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  z-index: 2;
  height: 1px;
  background: rgba(241, 239, 233, .7);
  opacity: 0;
  transform: scaleX(0);
}

.preloader--exiting .preloader__signal {
  animation: preloader-signal 1000ms cubic-bezier(.76, 0, .24, 1) both;
}

.logo-text {
  position: relative;
  z-index: 1;
  transform: scale(5);
  transition: clip-path 760ms cubic-bezier(.76, 0, .24, 1);

  @include respond(tab-land) {
    transform: scale(4);
  }

  @include respond(tab-port) {
    transform: scale(2.6);
  }
}

.preloader--exiting .logo-text { clip-path: inset(50% 0); }

@keyframes preloader-signal {
  0% { opacity: 0; transform: scaleX(0); }
  12% { opacity: .75; transform: scaleX(1); }
  72% { opacity: .5; transform: scaleX(1); }
  100% { opacity: 0; transform: scaleX(.16); }
}

@media (prefers-reduced-motion: reduce) {
  .preloader::before,
  .preloader::after,
  .logo-text { transition: none; }

  .preloader__signal { display: none; }
}
</style>
