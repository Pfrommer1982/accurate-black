<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore'


const props = defineProps({
  spotlightItems: {
    type: Array,
    required: true
  }
});

const tableData = ref([])

const getHighestPropertyValue = (property) => {
  return tableData.value.length > 0 ? tableData.value[0][property] || (property === 'ACB' ? null : '') : null
}

const sortedTableData = computed(() => {
  return tableData.value.slice().sort((a, b) => {
    if (a.ACB === b.ACB) {
      return a.releaseName.localeCompare(b.releaseName)
    } else {
      return b.ACB - a.ACB
    }
  })
})

const spotlightItems = computed(() => {
  return sortedTableData.value.slice(0, 4)
})

let currentSpotlightIndex = ref(0)
let carouselInterval = null
let progressWidth = ref(100)

const nextSpotlight = () => {
  currentSpotlightIndex.value = (currentSpotlightIndex.value + 1) % 4
  progressWidth.value = 100
}

const changeSlide = (index) => {
  currentSpotlightIndex.value = index
  progressWidth.value = 100
}
onMounted(async () => {
  try {
    const db = getFirestore()
    const usersCollection = collection(db, 'users')
    const q = query(usersCollection, orderBy('ACB', 'desc'))
    const querySnapshot = await getDocs(q)

    const uniqueReleases = new Set()
    const uniqueTableData = []

    querySnapshot.forEach(doc => {
      const data = { id: doc.id, ...doc.data() }
      if (!uniqueReleases.has(data.ACB)) {
        uniqueReleases.add(data.ACB)
        uniqueTableData.push(data)
      }
    })

    tableData.value = uniqueTableData.slice(0, 4)
    
    if (process.client) {
      carouselInterval = setInterval(() => {
        progressWidth.value -= 1
        if (progressWidth.value <= 0) {
          nextSpotlight()
        }
      }, 80)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})




onBeforeUnmount(() => {
  clearInterval(carouselInterval)
})
</script>

<template>

    <section class="section-releases">
      <div class="break-line top">
        <p class="break-line-text" v-once>WELCOME</p>
      </div>
      <div class="header">
        <h1 class="h1">LATEST RELEASES</h1>
        <NuxtLink to="/releases" class="btn-more-link top-btn">
          <p class="btn-more-p">VIEW ALL RELEASES</p>
        </NuxtLink>
      </div>

      <div v-for="(spotlightItem, index) in spotlightItems" :key="spotlightItem.id" class="hero" v-show="currentSpotlightIndex === index">
        <div>
          <img :src="spotlightItem.imageUrl" alt="bg" class="bg-image"  />
        </div>
        <div class="spotlight-container">
          <NuxtImg :src="spotlightItem.imageUrl" alt="Spotlight" class="spotlight-image"  />
          <div class="spotlight-text">
            <p class="title">{{ spotlightItem.releaseName }}</p>
            <p class="artist">{{ spotlightItem.artist }}</p>
            <p class="desc">{{ spotlightItem.description }}</p>
            <div class="btn-more container">
              <NuxtLink :to="`/releases/${spotlightItem.ACB}`" class="btn-more-link check-out">
                <p class="btn-more-p">CHECK OUT & LISTEN</p>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="progress-bars" v-if="spotlightItems.length > 0">
        <div v-for="(item, index) in Array(4)" :key="index" class="progress-bar" :class="{ active: index === currentSpotlightIndex }" @click="changeSlide(index)">
          <div class="progress" :style="{ width: (index === currentSpotlightIndex ? progressWidth : 0) + '%' }"></div>
          <p class="slide-title">{{ spotlightItems[index].releaseName }}</p>
          <p class="slide-artist">{{ spotlightItems[index].artist }}</p>
        </div>
      </div>

      <div class="single-progress-bar" v-if="spotlightItems.length > 0">
        <div class="progress" :style="{ width: progressWidth + '%' }"></div>
      </div>
    </section>

</template>


<style scoped lang="scss">

.section-releases {
  padding: 0 2rem; 
  width: 100%;
  height: 100%;
  min-height: 75vh;
  box-sizing: border-box;
  margin-bottom: 4rem;

  @include respond(phone) {
    padding: 0 1em;
  }
}

.header {
  display: flex;
  align-items: center; 
  justify-content: space-between; 
  width: 100%;
  margin-bottom: -4rem; 
  position: relative;
  z-index: 100;
  @include respond(phone){
    margin-bottom: .5rem;
  }
}

.h1 {
  font-size: 2rem;
  @include respond(phone){
    font-size: 1.4rem;  
  }  
}

.btn-more-link {
  margin: 0; 
}

.btn-more-p {
  margin: 0; 
}

.top-btn {
  justify-content: end;
  width: 50%;
}

.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  z-index: -1;

  filter: opacity(.55) blur(30px);
  object-fit: cover;

  @include respond(tab-land) {
    height: 58%;
  }
  @include respond(tab-port) {
    height: 74%;
  }
  @include respond(phone) {
    height: 100%;

  }
}



.hero {
  display: flex;
  justify-items: center;
  align-items: center;
  width: 100%;
}

.spotlight-container {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
  min-height: 40vh;

  @include respond(tab-port) {
    flex-direction: column;
    margin-top: 2rem;
  }
  @include respond(phone) {
    flex-direction: column;
    margin-top: 0rem;
  }
}

.spotlight-image {
  width: 30rem;
  height: 30rem;
  max-width: 750px;
  aspect-ratio: 4/3;
  display: flex;
  justify-content: center;
  margin: 6rem;
  border-radius: 3px;
  z-index: 2;
  box-shadow: 0 25px 25px rgba(0, 0, 0, 0.4);


  @include respond(tab-land) {
    width: 20rem;
    height: 20rem;
  }
  @include respond(tab-port) {
    width: 18rem;
    height: 18rem;
    margin-top: 1rem;
  }
}

@keyframes slideInLetter {
  0% {
    transform: translateX(-20rem);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.spotlight-text {
  display: flex;
  flex-direction: column;
  text-align: left;
  animation: slideInLetter 1s ease forwards;
  @include respond(tab-port) {
    height: 18rem;
  }
  @include respond(phone) {
    height: 1rem;
  }
}

.title {
  margin-top: -4rem;
  margin-bottom: 2rem;
  font-size: 4rem;


  @include respond(tab-land) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  @include respond(phone) {   
 
}
}

.artist {
  font-size: 2.5rem;
  color: var(--primary-grey-light1);
  margin-top: -1.5rem;

  @include respond(tab-land) {
    font-size: 2rem;
    margin-top: -2.5rem;
  }
  @include respond(phone) {
    margin-bottom: 0;

  }
}

.desc {
  font-size: 1.2rem;
  margin-top: 1rem;
  width: 75%;
  text-transform: none;
  font-style: italic;
  font-weight: 300;
  margin-bottom: 3rem;
  color: rgba(255, 255, 255, 0.76);

  @include respond(tab-land) {
    font-size: 1rem;
  }
  @include respond(tab-port) {
    width: 60%;
  }
  @include respond(phone) {
    opacity: 0;
    visibility: hidden;
    display: none;
  }
}

.check-out {
  margin-bottom: -2rem;
  display: flex;
  justify-content: flex-start;
  margin-right: 3rem;
  @include respond(phone) {
    margin-top: 1rem;
    justify-content: center;
  }
}

.progress-bars {
  display: flex;
  justify-content: space-between;
  margin-top: -2rem;
  cursor: pointer;

  @include respond(phone) {
    display: none;
  }
}

.progress-bar {
  width: calc(25% - 6rem);
  height: 2px;
  background-color: var(--primary-grey-light2);
  position: relative;
}

.progress {
  height: 100%;
  transition: width 0.04s;
  top: 0;
  right: 0;

}

.active .progress {
  background-color: white;
}

.slide-title,
.slide-artist {
  margin: 0.5rem 0;
  font-weight: 100;
  width: 20rem;
  color: var(--primary-grey-light1);
  

}

.slide-artist {
  margin-top: -0.5rem;
}

.active .slide-title,
.active .slide-artist {
  font-weight: 400;
  color: white;
  letter-spacing: 0.05rem;
  transition: all 0.4s ease;
}

.single-progress-bar {
  position: absolute;
  bottom: 0;
  display: none;
  width: 100%;
  height: 2px;
  background-color: var(--primary-grey-light2);
  position: relative;
  margin-top: 4rem;

  @include respond(phone) {
    display: block;
  }

  .progress {
    height: 100%;
    transition: width 0.04s;
    background-color: white;
  }
}



</style>
