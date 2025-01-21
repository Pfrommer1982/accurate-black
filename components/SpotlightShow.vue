<script setup>
import { ref, onMounted } from 'vue';
import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

const latestRadioshow = ref(null);
const latestAccurateSession = ref(null);

const fetchLatestContent = async () => {
  try {
    const db = getFirestore();

    const radioshowQuery = query(collection(db, 'radioshow'), orderBy('uploadDate', 'desc'), limit(1));
    const accurateSessionQuery = query(collection(db, 'accurate-sessions'), orderBy('sessionDate', 'desc'), limit(1));

    const [radioshowSnapshot, accurateSessionSnapshot] = await Promise.all([
      getDocs(radioshowQuery),
      getDocs(accurateSessionQuery)
    ]);

    radioshowSnapshot.forEach(doc => {
      latestRadioshow.value = doc.data();
    });

    accurateSessionSnapshot.forEach(doc => {
      latestAccurateSession.value = doc.data();
    });

  } catch (error) {
    
  }
};

onMounted(fetchLatestContent);
</script>

<template>
  <section class="section-content">
    <h1>ACCURATE BLACK PRESENTS:</h1>
    <div class="header">
      <h1 class="h1 inprogress">ROBBI ALTIDORE - TECHTONIC <a href="https://inprogressradio.com/index.php/members/robbi-altidore/" target="_blank">@INPROGRESSRADIO.COM</a></h1>
      <NuxtLink to="/techtonic" class="btn-more-link check-out">
        <p class="btn-more-p">TECHTONIC SHOWS</p>
      </NuxtLink>
    </div>

    <div v-if="latestRadioshow">
      <div class="sc-embed" v-html="latestRadioshow.embeddedLink"></div>
      <div v-once class="break-line top">
        <p class="break-line-text"></p>
      </div>
    </div>
    <div v-else>
      <p>No radioshow available.</p>
    </div>

    <h4>ACCURATE BLACK PRESENTS:</h4>
    <div class="header">
      <h1 class="h1">ACCURATE SESSIONS</h1>
      <NuxtLink to="/accurate-sessions" class="btn-more-link check-out">
        <p class="btn-more-p">ACCURATE SESSIONS</p>
      </NuxtLink>
    </div>

    <div v-if="latestAccurateSession">
      <div class="sc-embed" v-html="latestAccurateSession.sessionLink"></div>
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
  padding: 0 2rem;
  min-height: 80vh;
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
