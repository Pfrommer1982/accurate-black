<script setup>
import { ref, onMounted, computed } from 'vue';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

definePageMeta({
  title: 'Home'
})

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
  <div class="page-container">
    <!-- Toegevoegde semantische HTML structuur -->
    <main>
      <h1 class="sr-only">Accurate Black - Electronic Music Label</h1>
      <Hero :spotlightItems="spotlightItems" />
      <FeaturedArtists class="featuredArtist"/>
      <SpotlightShow />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  
  }}
  
</style>