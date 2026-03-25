<script setup>
</script>

<template>
  <section class="intro-block" v-motion-fade-visible-once>
    <div class="intro-content">
      <h2 class="branding-title">
        <span class="fade-text" v-motion-slide-bottom :delay="100" v-scramble>DEEP.</span>
        <span class="fade-text" v-motion-slide-bottom :delay="300" v-scramble>DARK.</span>
        <span class="fade-text" v-motion-slide-bottom :delay="500" v-scramble>AUTHENTIC.</span>
        <span class="fade-text highlight-word" v-motion-slide-bottom :delay="700" v-scramble>PROFOUND.</span>
      </h2>
      <p class="branding-text" v-motion-fade :delay="900" v-scramble>
        We delve into the depths of electronic music.<br />
        This is where the beats are felt, not just heard.<br />
        <strong class="highlight">We are Accurate Black.</strong>
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.intro-block {
  width: 100%;
  padding: var(--spacing-xl) 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-bg-dark, #000);
  margin-top: -1px;
  min-height: 50vh;

  @include respond(phone) {
    padding: var(--spacing-lg) 1rem;
    min-height: 40vh;
  }
}

.intro-content {
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;

  @include respond(tab-port) {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
}

.branding-title {
  display: flex;
  flex-direction: column;
  font-size: 6rem;
  font-weight: 700;
  line-height: 1.05;
  color: var(--primary-grey-light1, #fff);
  text-transform: uppercase;
  letter-spacing: -2px;

  .fade-text {
    display: inline-block;
    color: #fff;
  }

  .highlight-word {
    color: transparent;
    -webkit-text-stroke: 2px rgba(255, 255, 255, 0.8);
    position: relative;

  }

  @include respond(tab-port) {
    font-size: 4rem;
  }

  @include respond(phone) {
    font-size: 3rem;
  }
}

.branding-text {
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--primary-grey-light2, #aaa);
  line-height: 1.6;
  max-width: 500px;
  text-align: left;

  .highlight {
    display: block;
    margin-top: 1.5rem;
    color: #fff;
    font-weight: 600;
  }

  @include respond(tab-port) {
    text-align: center;
    font-size: 1.2rem;
    max-width: 100%;
  }
}
</style>
