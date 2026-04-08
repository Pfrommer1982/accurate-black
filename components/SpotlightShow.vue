<script setup>
import { ref, computed, onMounted } from 'vue'

const { data: scData } = await useAsyncData('soundcloud-latest', () => $fetch('/api/soundcloud'))
const latestRadioshow = computed(() => {
  if (scData.value && 'items' in scData.value && scData.value.items.length > 0) {
    return scData.value.items[0]
  }
  return null
})

const latestAccurateSession = ref(null)

const addTitleToIframe = (embedHtml, title) => {
  if (!embedHtml) return ''
  return embedHtml.replace('<iframe', `<iframe title="${title}"`)
}

const fetchFirebaseData = async () => {
  try {
    const { getFirestore, collection, query, orderBy, limit, getDocs } = await import('firebase/firestore')
    const db = getFirestore()
    const accurateSessionQuery = query(collection(db, 'accurate-sessions'), orderBy('sessionDate', 'desc'), limit(1))
    const snapshot = await getDocs(accurateSessionQuery)
    snapshot.forEach(doc => {
      latestAccurateSession.value = doc.data()
    })
  } catch (error) {
    console.error('Error fetching firebase session:', error)
  }
}

onMounted(fetchFirebaseData)
</script>

<template>
  <section class="section-content">
    <h1>ACCURATE BLACK PRESENTS:</h1>
    <div class="header">
      <h1 class="h1 inprogress">ROBBI ALTIDORE - TECHTONIC <a
          href="https://inprogressradio.com/index.php/members/robbi-altidore/" target="_blank">@INPROGRESSRADIO.COM</a>
      </h1>
      <NuxtLink to="/techtonic" class="btn-more-link check-out" v-scramble.hover>
        <p class="btn-more-p">TECHTONIC SHOWS</p>
      </NuxtLink>
    </div>

    <div v-if="latestRadioshow">
      <div class="sc-embed" v-html="addTitleToIframe(
        latestRadioshow.embedHtml,
        'Latest Techtonic Radio Show by Robbi Altidore'
      )"></div>
      <div v-once class="break-line top">
        <p class="break-line-text"></p>
      </div>
    </div>
    <div v-else>
      <p>No radioshow available.</p>
    </div>

    <div>ACCURATE BLACK PRESENTS:</div>
    <div class="header">
      <h1 class="h1">ACCURATE SESSIONS</h1>
      <NuxtLink to="/accurate-sessions" class="btn-more-link check-out" v-scramble.hover>
        <p class="btn-more-p">ACCURATE SESSIONS</p>
      </NuxtLink>
    </div>

    <div v-if="latestAccurateSession">
      <div class="sc-embed" v-html="addTitleToIframe(
        latestAccurateSession.sessionLink,
        'Latest Accurate Session SoundCloud Player'
      )"></div>
      <div v-once class="break-line top">
        <p class="break-line-text"></p>
      </div>
    </div>
    <div v-else>
      <p>No accurate session available.</p>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section-content {
  padding: 2rem 2rem;

  overflow: hidden;
  background-color: var(--primary-grey-dark-opacity);

  @include respond(phone) {
    padding: 0 1rem;
    overflow: hidden;
  }
}

h4 {
  margin-top: 2rem;
  margin-bottom: -2rem;
}

.headers {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  color: var(--primary-grey-light1);
}

.sc-embed {
  margin-top: 2rem;
}

.date {
  color: white;
}

a {
  text-decoration: none;
  color: var(--primary-grey-light2);

  &:hover {
    color: var(--primary-grey-light1);
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
  position: relative;
  z-index: 100;
}

.h1 {
  font-size: 2rem;
  margin: 0;
  width: 50%;
  line-height: .9;
  margin-top: .9rem;

  @include respond(phone) {
    font-size: 1.2rem;
  }
}

.btn-more-link {
  margin: 0;
  justify-content: flex-end;
  width: 50%;
}

.btn-more-p {
  margin: 0;
}
</style>
