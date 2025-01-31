

<template>
  <section class="section-about">
    <div class="break-line top">
      <p class="break-line-text" v-once>ABOUT US...</p>
    </div>

    <div class="header-text">
      <div class="keywords">
        <p class="p1">Deep.</p>
        <p class="p2">Dark.</p>
        <p class="p3">Authentic.</p>
        <p class="p4">Profound.</p>
      </div>
      <p class="p5">
        We delve into the depths of electronic music. <br />
        This is where the beats are felt, not just heard.
      </p>
      <h2 class="h2">WE ARE ACCURATE BLACK</h2>
    </div>

    <div class="break-line top">
      <p class="break-line-text" v-once>Robin</p>
    </div>

    <div class="robin">
      <div
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, scale: 1 }"
        :variants="{ custom: { scale: 2 } }"
        :delay="6500"
        class="intro"
      >
        <h2 class="name">
          ROBIN PLOMPEN<br />
          <p class="artist-name">ROBBI ALTIDORE</p>
        </h2>
        <div class="function">
          <p class="title">OWNER.</p>
          <p class="title">CONTENT CREATOR.</p>
          <p class="title">PRODUCER.</p>
          <p class="title">DJ / RADIO SHOW.</p>
        </div>
        <div class="contact">
          <a href="mailto:info.accurateblack@gmail.com">info.accurateblack@gmail.com</a>
        </div>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, x: 100 }"
        :enter="{ opacity: 1, x: 0, scale: 1 }"
        :variants="{ custom: { scale: 2 } }"
        :delay="6000"
        class="pic"
      >
        <NuxtImg
          src="https://ik.imagekit.io/pweehbu88/icons/Robbi%20Altidore.webp?updatedAt=1738326085511"
          alt="Robin Plompen Accurate Black"
          loading="lazy"
          class="mp"
          width="1000"
          height="1000"
        />
      </div>
    </div>
    <div class="break-line top">
      <p class="break-line-text" v-once></p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-about {
  overflow: hidden;
  padding: 0 2rem;
  @include respond(phone) {
    padding: 0 1rem;
  }
}

.header-text {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 10rem 0;
  width: 100%;
  @include respond(phone) {
    margin: 5rem 0;
  }
}

.keywords {
  margin-top: -2rem;
  display: flex;
  margin-bottom: 1rem;
}

.p1,
.p2,
.p3,
.p4 {
  font-size: 3rem;
  color: var(--primary-grey-light1);
  text-transform: uppercase;
  font-weight: 200;
  letter-spacing: 5px;
  margin-left: 1rem;
  @include respond(tab-land) {
    font-size: 2rem;
    letter-spacing: 4px;
  }
  @include respond(tab-port) {
    font-size: 1.7rem;
    letter-spacing: 3px;
  }
  @include respond(phone) {
    font-size: 1.1rem;
    margin-left: 0.5rem;
    letter-spacing: 3px;
  }
}

.p5,
.p6 {
  font-size: 2rem;
  @include respond(tab-land) {
    font-size: 1.5rem;
    letter-spacing: 3px;
  }
  @include respond(tab-port) {
    font-size: 1.3rem;
    letter-spacing: 2px;
    padding: 0 2rem;
  }
  @include respond(phone) {
    font-size: 0.9rem;
    margin-left: 0.5rem;
    letter-spacing: 3px;
  }
}

.h2 {
  font-size: 3rem;
  color: var(--primary-grey-light1);
  margin-top: 1rem;

  animation-name: blurFadeIn;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  opacity: 0;
  animation: fadeInOpacity 7s ease-out forwards;

  @include respond(tab-land) {
    font-size: 2rem;
  }

  @include respond(tab-port) {
    font-size: 1.8rem;
  }
  @include respond(phone) {
    font-size: 1.3rem;
  }
}

.p1 {
  animation-name: blurFadeIn;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  opacity: 0;
  animation: fadeInOpacity 1s ease-out forwards;
}
.p2 {
  animation-name: blurFadeIn;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  opacity: 0;
  animation: fadeInOpacity 2s ease-out forwards;
}
.p3 {
  animation-name: blurFadeIn;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  opacity: 0;
  animation: fadeInOpacity 3s ease-out forwards;
}
.p4 {
  animation-name: blurFadeIn;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  opacity: 0;
  animation: fadeInOpacity 4s ease-out forwards;
}

.p5 {
  color: var(--primary-grey-light2);
  text-transform: uppercase;
  font-weight: 200;
  letter-spacing: 5px;

  animation-name: blurFadeIn;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  opacity: 0;
  animation: fadeInOpacity 5s ease-out forwards;
}

.robin {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 6rem;
  @include respond(phone) {
    flex-direction: column;
    margin-top: 3rem;
  }
}

.intro {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
}

.name {
  font-size: 2rem;
  color: var(--primary-grey-light1);
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 5px;
  text-align: center;
  transform: translateY(-2rem);
  @include respond(tab-land) {
    font-size: 1.6rem;
  }
  @include respond(tab-port) {
    font-size: 1.3rem;
  }
  @include respond(phone) {
    font-size: 1.1rem;
  }
}
.artist-name {
  font-weight: 200;
  font-style: italic;
  font-size: 1.4rem;
  letter-spacing: 3px;
  @include respond(tab-land) {
    font-size: 1.3rem;
  }
  @include respond(tab-port) {
    font-size: 1.1rem;
  }
  @include respond(phone) {
    font-size: .9rem;
  }
}

.function {
  width: 100%;
  font-size: 1.2rem;
  color: var(--primary-grey-light1);
  text-transform: uppercase;
  font-weight: 200;
  letter-spacing: 5px;
  transform: translateY(-1rem);
  @include respond(phone) {
    font-size: 1.1rem;
  }
}

.title {
  font-size: 1.2rem;
  color: var(--primary-grey-light1);
  text-transform: uppercase;
  font-weight: 200;
  letter-spacing: 5px;
  text-align: center;
  margin-left: 1rem;
  @include respond(phone) {
    font-size: 1.1rem;
  }
}

.contact a {
  font-size: 1.2rem;
  color: var(--primary-grey-light2);
  font-weight: 200;
  letter-spacing: 2px;

  &:hover {
    color: var(--primary-grey-light1);
  }
}

.pic {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  filter: grayscale(1) contrast(.7);
}

.top {
  @include respond(phone) {
    margin-bottom: 2rem;
  }
}

.mp {
  display: flex;
  justify-content: center;
  width: 30rem;
  height: 30rem;
  filter: grayscale(2) contrast(2);
  border-radius: 3px;
  @include respond(tab-land) {
    width: 28rem;
    height: 28rem;
  }
  @include respond(tab-port) {
    width: 20rem;
    height: 20rem;
  }
  @include respond(phone) {
    width: 18rem;
    height: 18rem;
    margin: 2rem 0;
  }
}

.more-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.cp {
  @include respond(phone){
    margin-top: 2rem;
  }
}
</style>
