<template>
  <div id="app">
    <PreLoader />
    <Header />
    <main id="main-content">
      <slot />
    </main>
    <LazyFooter />
  </div>
</template>

<style scoped>

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
