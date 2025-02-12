<template>
    <div class="main">
        <div class="error">
            <div class="message">{{ error.statusCode }}</div>
            <div class="sorry">SORRY, NO PAGE HERE</div>
            <p class="sorry">{{ error.message }}</p>
        </div>
        <div  class="btn-big back">
            <NuxtLink to="/" class="btn-more-link">
              <p class="btn-big-p">TAKE ME BACK</p>
            </NuxtLink>
          </div>

    </div>
</template>

<script setup>
 defineProps(['error'])

</script>

<style lang="scss" scoped>




.main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    padding: 0 2rem;

    @include respond(phone) {
        padding: 0 1rem;
    }
}

.error {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'montserrat', sans-serif;
    font-weight: 800;
    border: 2px solid white;
    padding: 2rem 6rem;

    @include respond(phone) {
        padding: .5rem 2rem;
    }
}

.message {
    font-size: 20rem;

    @include respond(tab-land) {
        font-size: 12rem;
    }

    @include respond(phone) {
        font-size: 8rem;
    }
}

.sorry {
    font-size: 2rem;

    @include respond(phone) {
        font-size: 1rem;
    }
}

.back {
    margin-top: 4rem;
}
</style>