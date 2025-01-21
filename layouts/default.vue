<template>
  <div id="app">
    <PreLoader />
    <LazyNavbar />

    <main>
      <slot />
    </main>
    <LazyFooter />
    <CookieConsent />
  </div>
</template>

<script>



</script>

<style lang="scss" scoped>


html, body {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
}

main {
  flex: 1;
}
</style>
