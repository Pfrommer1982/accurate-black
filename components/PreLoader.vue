  <script setup>
  import { ref, onMounted } from 'vue';

  const isLoading = ref(true);

  onMounted(() => {

    setTimeout(() => {
      isLoading.value = false;
    }, 1400);

  });
</script>
  
<template>
  <div class="preloader" v-if="isLoading">
    <LogoText class="logo-text" />
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
}

.logo-text {
  transform: scale(5);

  @include respond(tab-land) {
    transform: scale(4);
  }

  @include respond(tab-port) {
    transform: scale(2.6);
  }
}
</style>
