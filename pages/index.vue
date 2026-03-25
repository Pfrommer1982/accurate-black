<script setup>
import { ref, onMounted, computed } from 'vue';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

usePageSeo('Home')

const tableData = ref([]);

const sortedTableData = computed(() => {
  return tableData.value.sort((a, b) => {
    if (a.ACB === b.ACB) {
      return a.releaseName.localeCompare(b.releaseName);
    } else {
      return b.ACB - a.ACB;
    }
  });
});

const spotlightItems = computed(() => {
  return sortedTableData.value.slice(0, 4);
});

const fetchTableData = async () => {
  const db = getFirestore();
  const usersCollection = collection(db, 'users');
  const q = query(usersCollection, orderBy('ACB', 'desc'));
  const querySnapshot = await getDocs(q);
  tableData.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

onMounted(fetchTableData);
</script>

<template>
  <main class="main-homepage">
    <h1 class="sr-only">Accurate Black - Electronic Music Label</h1>
    <Hero :spotlightItems="spotlightItems" />
    <IntroBlock />
    <FeaturedArtists class="featuredArtist"/>
    <SpotlightShow />
    <MediaGrid />
  </main>
</template>

<style lang="scss" scoped>
.main-homepage {
  display: flex;
  flex-direction: column;
  background-color: #000;
  width: 100%;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.featuredArtist {
  @include respond(phone) {
    flex-direction: column;
    margin-top: 0rem;
  }
}
</style>