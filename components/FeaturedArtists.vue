<script setup>
import { ref, computed, onMounted } from 'vue';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

const tableData = ref([]);

const sortedTableData = computed(() => {
  return tableData.value;
});

const spotlightItems = computed(() => {
  return sortedTableData.value.slice(0, 4);
});

const featuredArtistImages = computed(() => {
  return spotlightItems.value.map(item => item.artistImageUrl);
});

const uniqueFeaturedArtistImages = computed(() => {
  const uniqueImages = [];
  const addedUrls = new Set();
  for (const imageUrl of featuredArtistImages.value) {
    if (!addedUrls.has(imageUrl)) {
      uniqueImages.push(imageUrl);
      addedUrls.add(imageUrl);
    }
  }
  return uniqueImages;
});

onMounted(async () => {
  const db = getFirestore();
  const usersCollection = collection(db, 'users');
  const q = query(usersCollection, orderBy('ACB', 'desc'));
  const querySnapshot = await getDocs(q);
  tableData.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});
</script>

<template>

    <section class="section-featured">
      <div class="header">
        <h1 class="h1">FEATURED ARTISTS</h1>
        <NuxtLink to="/artists" class="btn-more-link check-out">
          <p class="btn-more-p">VIEW ALL ARTISTS</p>
        </NuxtLink>
      </div>
      <div class="featured-grid">
        <div v-for="(imageUrl, index) in uniqueFeaturedArtistImages" :key="index" class="featured-artist">
          <NuxtLink :to="`/artists/${spotlightItems[index].artist}`">
            <img v-lazy="imageUrl" alt="Featured Artist" class="featured-artist-image" loading="lazy" width="200" height="200" />
            <p class="featured-name">{{ spotlightItems[index].artist }}</p>
            <p class="profile">VIEW PROFILE</p>
          </NuxtLink>
        </div>
      </div>
    </section>

</template>

<style scoped lang="scss">


.section-featured {
  padding: 0 2rem;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  background-color: black;
  min-height: 40vh;

  @include respond(phone) {
    padding: 0 1em;
    margin-top: -6rem;
    margin-bottom: -6rem;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: -4rem;
  position: relative;
  z-index: 100;
}

.h1 {
  font-size: 2rem;
  margin: 0;
  width: 50%;
  
  @include respond(phone) {
    font-size: 1.4rem;
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

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
  gap: 1rem;
  margin: 6rem 0;
  justify-content: center;
  align-items: center;


}

.featured-artist {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  filter: grayscale(1) contrast(0.75);
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
}

.featured-artist-image {
  aspect-ratio: 1/1;
  width: 40rem;
  height: 40rem;
  object-fit: cover;
  border-radius: 3px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @include respond(tab-land) {
    height: 25rem;
    width: 25rem;
    object-position: center;
  }
  
  @include respond(tab-port) {
    height: 20rem;
    width: 20rem;
    object-position: center;
  }
  
  @include respond(phone) {
    height: 15rem;
    width: 15rem;
    object-position: center;
  }
}

.featured-name {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 5;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 1rem;
}

.profile {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  @include respond(tab-land) {
    font-size: 1.2rem;
  }
}

.featured-artist:hover .profile {
  opacity: 1;
}
</style>
