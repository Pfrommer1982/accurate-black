<script>

export default {

  data() {
    return {
      isMenuOpen: false,
      isTop: true,
      isScrolled: false,
    };
  },

  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      event.preventDefault();
    },
    handleScroll() {
      this.isTop = window.scrollY === 0;
      this.isScrolled = window.scrollY > 0;
    },
    handleAdminLinkClick(event) {
      const isCtrlOrCmdPressed = event.ctrlKey || event.metaKey;
      if (isCtrlOrCmdPressed) {
        return;
      }
      this.toggleMenu();
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<template>
  <div class="main">
    <div class="navbar" :class="{
      'transparent-bg': isTop && isScrolled,
      'black-bg': !isTop || isScrolled,
    }">
      <div class="overlay"></div>
      <a href="/" class="logo">

        <logo-text />
      </a>

      <div class="demo-menu" :class="{ 'space-between': !isMenuOpen }">
    
        <div class="hamburger" :class="{ active: isMenuOpen }" @click="toggleMenu">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>
      </div>
    </div>

    <nav class="navigation" :class="{ open: isMenuOpen }">
      <div class="break-line top">
        <p class="break-line-text">MENU</p>
      </div>
      <NuxtImg src="https://ik.imagekit.io/pweehbu88/icons/Accurate-menu.webp?updatedAt=1738326085492" alt="menu logo" class="menu-logo" loading="lazy" />

      <ul class="navigation__list">
        <li class="navigation__item">
          <NuxtLink to="/" class="navigation__link" @click="toggleMenu">HOME</NuxtLink>
        </li>
        <li class="navigation__item">
          <NuxtLink to="/releases" class="navigation__link" @click="toggleMenu">( NEW ) RELEASES</NuxtLink>
        </li>
        <li class="navigation__item">
          <NuxtLink to="/artists" class="navigation__link" @click="toggleMenu">ARTISTS</NuxtLink>
        </li>
        <li class="navigation__item">
          <NuxtLink to="/accurate-sessions" class="navigation__link" @click="toggleMenu">ACCURATE SESSIONS</NuxtLink>
        </li>
        <li class="navigation__item">
          <NuxtLink to="/techtonic" class="navigation__link" @click="toggleMenu">TECHTONIC</NuxtLink>
        </li>
        <li class="navigation__item">
          <NuxtLink to="/demo-submission" class="navigation__link" @click="toggleMenu">DEMO SUBMISSION</NuxtLink>
        </li>
        <li class="navigation__item">
          <NuxtLink to="/about" class="navigation__link" @click="toggleMenu">ABOUT US</NuxtLink>
        </li>
        <li class="navigation__item">
          <NuxtLink to="/login" class="navigation__link admin" @click="handleAdminLinkClick && toggleMenu">ADMIN
          </NuxtLink>
        </li>
        <li class="navigation__item ">
        
          <div class="cp">

            <a href="https://www.linkedin.com/in/christoph-pfrommer/" target="_blank" >
              <p class="website">WEBSITE BY</p>
              <NuxtImg src="https://ik.imagekit.io/pweehbu88/icons/CPWD-logo.png?updatedAt=1738326085392" alt="Christoph Pfrommer" class="cp-logo" loading="lazy" />
            </a>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped lang="scss">


.main {
  overflow: hidden;
}


.transparent-bg {
  background-color: transparent;

}

.black-bg {
  background-color: #000000;
}

.scicon {
  transform: scale(3);
  color: var(--primary-grey-light2);
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.5rem;
  padding: 0 2rem;
  z-index: 1000;
  width: 100%;


  @include respond(phone) {
    padding: 0 1rem;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: inherit;
    opacity: 0.7;
    z-index: -1;

  }
}

.transparent-bg {
  background-color: transparent;

}

.black-bg {
  background-color: #000000a7;

}

.demo-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.space-between {
  justify-content: flex-end;
}

.demo {
  transform: translateY(1rem);
  padding: 0 1rem;
}


.hamburger {
  height: 1rem;
  width: 2rem;
  padding-right: 2rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.line {
  background-color: white;
  height: 1px;
  width: 2rem;
  transition: all 0.5s ease;
}


.hamburger.active .line:nth-child(1) {
  transform-origin: center center;
  transform: rotate(-45deg) translate(-5px, 5px);
}

.hamburger.active .line:nth-child(2) {
  opacity: 0;
}

.hamburger.active .line:nth-child(3) {
  transform-origin: center center;
  transform: rotate(45deg) translate(-5px, -5px);
}

.navigation {
  position: fixed;
  padding: 0 2rem;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100vh;
  background: #000000;
  transition: left 0.5s ease;
  z-index: 999;

  @include respond(phone) {
    padding: 0 1rem;
  }
}

.navigation.open {
  left: 0;
}

.menu-logo {
  position: fixed;

  width: 90rem;
  height: auto;
  top: 15%;
  left: 50%;
  visibility: hidden;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.1);
  transition: opacity 1s ease, transform 1s ease;

  @include respond(tab-land) {
    min-width: 100rem;
  }

  @include respond(tab-port) {
    min-width: 100rem;
  }

  @include respond(phone) {

    margin-top: 2rem;
  }
}

.navigation.open .menu-logo {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, -50%) scale(0.5);

  @include respond(tab-port) {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%) scale(0.4);
  }

  @include respond(phone) {
    opacity: 1;
    top: 13%;
    visibility: visible;
    transform: translate(-50%, -50%) scale(0.22);
  }
}

.navigation__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 12rem;

  @include respond(phone) {
    margin-top: 6rem;
  }

}

.navigation__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--primary-grey);
  width: 100%;
  box-sizing: border-box;
}

.admin__panel {
  opacity: 0.2;

}

.navigation__item:first-child {
  border-top: 1px solid var(--primary-grey);
}

.navigation__item:last-child {
  border: none
}

.navigation__item:hover .navigation__link,
.router-link-active {
  color: white;
  padding-left: 3rem;

  @include respond(phone) {
    padding-left: 1.3rem;
  }
}

.navigation__link,
.router-link-active {
  font-size: 3rem;
  font-weight: 100;
  letter-spacing: .3rem;
  text-decoration: none;
  color: var(--primary-grey);
  width: 100%;

  @include respond(tab-port) {
    font-size: 3rem;
  }

  @include respond(phone) {
    font-size: 1.5rem;
  }

  &:hover,
  &:active {
    background-position: 100%;
    color: white;
  }
}

.navigation__link:link,
.navigation__link:visited,
.router-link-active {
  display: inline-block;
  background-image: linear-gradient(120deg,
      transparent 0%,
      transparent 50%,
      var(--primary-grey-dark) 50%);
  background-size: 220%;
  transition: all 0.5s;
}

.navigation__link:hover,
.navigation__link:active,
.router-link-active {
  background-position: 100%;
  color: white;
}

.admin {
  opacity: 0.25;
  cursor: not-allowed;
}

.socials {
  color: var(--primary-grey-light2);
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  margin-top: .2rem;
}

.privacy-link {
  color: var(--primary-grey-light2);
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    color: var(--primary-grey-light1);
    border-bottom: 1px solid var(--primary-grey-light1);
  }

}

.text {
  color: rgba(255, 255, 255, 0.786);
}


.cp {
  display: flex;
  flex-direction: column;
  padding: .5rem 0;
  border-bottom: none;
  opacity: .6;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
}

.cp-logo {
  width: 4rem;
  height: 4rem;
 


}

.website {
  text-decoration: none;
  font-size: .9rem;
  color: var(--primary-grey-light2);
  display: flex;
  padding-top: .3rem;

}
</style>
