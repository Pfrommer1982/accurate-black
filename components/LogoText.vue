<template>
  <div class="big-text-container" v-once>
    <div class="logo-text" id="logo-text" v-once>
      <span class="A">A</span>
      <span class="C">C</span>
      <span class="C">C</span>
      <span class="U">U</span>
      <span class="R" id="R">R</span>
      <span class="A2" id="A2">A</span>
      <span class="T" id="T">T</span>
      <span class="E" id="E">E</span>
      <span class="black" id="black">
        <img src="https://ik.imagekit.io/pweehbu88/icons/black.webp?updatedAt=1738326085405" alt="black" loading="lazy" />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>


.big-text-container {
  font-family: 'montserrat';
  display: flex;
  background-color: transparent;
  position: relative;
  z-index: 1;
  font-weight: 850;
  letter-spacing: -0.06rem;
  color: white;
  width: 100%;
  font-size: 2rem;


}

.logo-text {
  display: flex;
  justify-content: center;
  width: 100%;

  @include respond(phone) {
   
  }
}

.A,
.U,
.R,
.T {
  letter-spacing: -0.14rem;
}

.C {
  letter-spacing: -0.4rem;
}

.U {
  padding-left: 0.34rem;
}

.A2 {
  padding-left: 0.2rem;
}

.T {
  margin-left: -0.2rem;
}

.E {
  margin-left: 0.1rem;
}

.black img {
  margin-left: 0.12rem;
  width: 2.6rem;
  height: 1.2rem;
  transform: translateY(0.96rem);
}

@keyframes slideInLetter {
  0% {
    transform: translateX(-20px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutLetter {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-20px);
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes slideBackImage {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-110px);
    }
}
@include respond(phone){
  @keyframes slideBackImage {
    100% {
      transform: translateX(0);
    }
  }
}


.logo-text span {
  opacity: 0;
}

.logo-text span:nth-child(1) {
  animation: slideInLetter 0.5s ease forwards;
  animation-delay: .1s;
}

.logo-text span:nth-child(2) {
  animation: slideInLetter 0.5s ease forwards .2s;
}

.logo-text span:nth-child(3) {
  animation: slideInLetter 0.5s ease forwards .3s;
}

.logo-text span:nth-child(4) {
  animation: slideInLetter 0.5s ease forwards .4s, slideOutLetter 0.5s ease forwards 3.4s;
  @include respond(phone){
    display: none;
    visibility: hidden;
  }
}

.logo-text span:nth-child(5) {
  animation: slideInLetter 0.5s ease forwards .5s, slideOutLetter 0.5s ease forwards 3.5s;
  @include respond(phone){
    display: none;
    visibility: hidden;
  }
}

.logo-text span:nth-child(6) {
  animation: slideInLetter 0.5s ease forwards .6s, slideOutLetter 0.5s ease forwards 3.6s;
  @include respond(phone){
    display: none;
    visibility: hidden;
  }
}

.logo-text span:nth-child(7) {
  animation: slideInLetter 0.5s ease forwards .7s, slideOutLetter 0.5s ease forwards 3.7s;
  @include respond(phone){
    display: none;
    visibility: hidden;
  }
}

.logo-text span:nth-child(8) {
  animation: slideInLetter 0.5s ease forwards .8s, slideOutLetter 0.5s ease forwards 3.8s;
  @include respond(phone){
    display: none;
    visibility: hidden;
  }
}

.logo-text span:nth-child(9) {
  animation: slideInLetter 0.5s ease forwards .9s, slideBackImage 0.5s ease forwards 3.85s;
  @include respond(phone){
    animation: slideInLetter 0.5s ease forwards .4s;
    margin-left: 6px;
  }

}
</style>
