<template>
  <div v-if="!accepted" class="cookie-consent-overlay">
    <div class="cookie-consent">
      <p class="cookie-text">
        This website uses cookies to enhance your experience. By continuing, you consent to our use of cookies.
      </p>
      <div class="cookie-actions">
        <button class="btn-accept" @click="acceptCookies">ACCEPT</button>
        <NuxtLink class="privacy-link" to="/privacy-policy">Privacy Policy</NuxtLink>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';

const accepted = ref(false);

const acceptCookies = () => {
  localStorage.setItem('cookieConsent', 'true');
  accepted.value = true;
  document.body.classList.remove('blurred');
};

const checkCookieConsent = () => {
  if (localStorage.getItem('cookieConsent')) {
    accepted.value = true;
  } else {
    document.body.classList.add('blurred');
  }
};

onMounted(() => {
  checkCookieConsent();
});
</script>



<style scoped lang="scss">


.cookie-consent-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.cookie-consent {
  background-color: var(--primary-grey-light2);
  padding: 2rem;
  color: white;
  text-align: center;
  border-radius: 8px;
  animation: moveInBottom 0.7s ease-out;
}

.cookie-text {
  margin-bottom: 1rem;
  font-size: 1rem;
}

.cookie-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.btn-accept {
  background-color: var(--primary-color);
  border: none;
  color: #fff;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-color-dark);
  }
}

.privacy-link {
  color: var(--primary-grey-light1);
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.9rem;
  position: relative;

  &:after {
    content: '';
    display: block;
    height: 1px;
    background: #fff;
    transition: width 0.3s ease, left 0.3s ease;
    width: 0;
    position: absolute;
    bottom: -2px;
    left: 50%;
  }

  &:hover:after {
    width: 100%;
    left: 0;
  }
}


.blurred {
  filter: blur(5px);
  pointer-events: none; 
}

@keyframes moveInBottom {
  0% {
    opacity: 0;
    transform: translateY(3rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>



