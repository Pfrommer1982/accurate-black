<script setup>
import { ref, onMounted, computed, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  spotlightItems: {
    type: Array,
    required: true
  }
});

const loading = ref(true)
const tableData = ref([])
const backgroundColors = ref({})
const currentSpotlightIndex = ref(0)
const progressWidth = ref(100)
let animationFrameId = null

// Snelheidsregeling (pas de delay aan om de snelheid te wijzigen)
const delay = 80; // 80ms vertraging tussen updates

const getDominantColor = async (imageUrl) => {
  const thumbnailUrl = `${imageUrl}?tr=w-1,h-1`;
  try {
    const response = await fetch(thumbnailUrl);
    const blob = await response.blob();
    const img = await createImageBitmap(blob);
    const canvas = new OffscreenCanvas(1, 1);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return `rgb(${r}, ${g}, ${b})`;
  } catch (error) {
    console.error('Error getting dominant color:', error);
    return 'rgb(42, 42, 42)';
  }
};

const currentSpotlightItem = computed(() => 
  spotlightItems.value[currentSpotlightIndex.value]
)

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

const currentBackgroundColor = computed(() => {
  const currentItem = spotlightItems.value[currentSpotlightIndex.value];
  return currentItem ? backgroundColors.value[currentItem.ACB] || 'rgb(42, 42, 42)' : 'rgb(42, 42, 42)';
});

const nextSpotlight = () => {
  currentSpotlightIndex.value = (currentSpotlightIndex.value + 1) % 4
  progressWidth.value = 100
}

const changeSlide = (index) => {
  currentSpotlightIndex.value = index
  progressWidth.value = 100
}

watch(() => spotlightItems.value, async (items) => {
  if (items && items.length > 0) {
    for (const item of items) {
      if (!backgroundColors.value[item.ACB]) {
        backgroundColors.value[item.ACB] = await getDominantColor(item.imageUrl);
      }
    }
  }
}, { immediate: true });

const head = {
  link: computed(() => [
    {
      rel: 'preload',
      as: 'image',
      href: spotlightItems.value?.[currentSpotlightIndex.value]?.imageUrl + '?tr=w-800,q-80'
    }
  ])
}

const animateProgress = () => {
  if (progressWidth.value > 0) {
    progressWidth.value -= 1; // Verlaag de progressie
    setTimeout(() => {
      animationFrameId = requestAnimationFrame(animateProgress); // Voeg een vertraging toe
    }, delay);
  } else {
    nextSpotlight(); // Ga naar de volgende slide
    progressWidth.value = 100; // Reset de progressie
    animationFrameId = requestAnimationFrame(animateProgress); // Start de animatie opnieuw
  }
};

onMounted(async () => {
  try {
    const { getFirestore, collection, getDocs, query, orderBy, limit } = await import('firebase/firestore');
    const db = getFirestore();
    const q = query(
      collection(db, 'users'), 
      orderBy('ACB', 'desc'),
      limit(4)
    );
    
    const querySnapshot = await getDocs(q);
    tableData.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    loading.value = false;
    
    if (process.client && tableData.value.length) {
      animateProgress(); // Start de carousel animatie
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    loading.value = false;
  }
});

onBeforeUnmount(() => {
  // Zorg ervoor dat de animatie stopt wanneer de component wordt vernietigd
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>
<template>
  <section class="section-releases">
    <div v-if="loading" class="skeleton-loader">
      <div class="skeleton-image"></div>
      <div class="skeleton-text">
        <div class="skeleton-title"></div>
        <div class="skeleton-description"></div>
      </div>
    </div>

    <template v-else>
      <div class="break-line top">
        <p class="break-line-text" v-once>WELCOME</p>
      </div>
      <div class="header">
        <h1 class="h1">LATEST RELEASES</h1>
        <NuxtLink to="/releases" class="btn-more-link top-btn">
          <p class="btn-more-p">VIEW ALL RELEASES</p>
        </NuxtLink>
      </div>

      <div v-for="(spotlightItem, index) in spotlightItems" 
           :key="spotlightItem.ACB" 
           class="hero" 
           v-show="currentSpotlightIndex === index">
        <div class="bg-container" :style="{
          background: `linear-gradient(45deg, ${currentBackgroundColor}, rgba(26, 26, 26, 0.9))`
        }">
          <div class="bg-overlay"></div>
        </div>
        <div class="spotlight-container">
          <NuxtImg 
            :src="spotlightItem.imageUrl" 
            :alt="spotlightItem.releaseName" 
            class="spotlight-image" 
            sizes="sm:100vw md:50vw lg:400px"
            format="webp"
            loading="eager"
        
          />
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
        <div v-for="(item, index) in Array(4)" 
             :key="spotlightItems[index]?.ACB" 
             class="progress-bar" 
             :class="{ active: index === currentSpotlightIndex }" 
             @click="changeSlide(index)">
          <div class="progress" :style="{ width: (index === currentSpotlightIndex ? progressWidth : 0) + '%' }"></div>
          <p class="slide-title">{{ spotlightItems[index].releaseName }}</p>
          <p class="slide-artist">{{ spotlightItems[index].artist }}</p>
        </div>
      </div>

      <div class="single-progress-bar" v-if="spotlightItems.length > 0">
        <div class="progress" :style="{ width: progressWidth + '%' }"></div>
      </div>
    </template>
  </section>
</template>

<style scoped lang="scss">
.section-releases {
  padding: 0 2rem; 
  width: 100%;
  height: 100%;
  min-height: 55vh;
  box-sizing: border-box;
  margin-bottom: 4rem;

  @include respond(phone) {
    padding: 0 1em;
  }
}

.skeleton-loader {
  width: 100%;
  height: 55vh;
  background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton-image {
  width: 30rem;
  height: 30rem;
  background-color: #2a2a2a;
  margin: 6rem;
}

.skeleton-text {
  width: 50%;
}

.skeleton-title {
  height: 4rem;
  background-color: #2a2a2a;
  margin-bottom: 2rem;
}

.skeleton-description {
  height: 1.2rem;
  background-color: #2a2a2a;
  width: 75%;
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

.bg-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80vh;
  z-index: -1;
  filter: opacity(.55) blur(30px);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  will-change: background-image;

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
  will-change: transform;

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
    transform: translate3d(-20rem, 0, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.spotlight-text {
  display: flex;
  flex-direction: column;
  text-align: left;
  animation: slideInLetter 1s ease forwards;
  will-change: transform;
  
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
  will-change: width;
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