<script setup>
import { ref, computed, onMounted } from 'vue';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

const tableData = ref([]);

const spotlightItems = computed(() => {
  const seen = new Set();
  const unique = [];
  for (const item of tableData.value) {
    if (!seen.has(item.artist)) {
      seen.add(item.artist);
      unique.push(item);
    }
    if (unique.length >= 4) break;
  }
  return unique;
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
      <NuxtLink to="/artists" class="btn-more-link" v-scramble.hover>
        <p class="btn-more-p">VIEW ALL ARTISTS</p>
      </NuxtLink>
    </div>

    <div class="artist-strip" v-if="spotlightItems.length">
      <NuxtLink
        v-for="(item, index) in spotlightItems"
        :key="item.id"
        :to="`/artists/${item.artist}`"
        class="artist-panel"
        :style="{ backgroundImage: item.artistImageUrl ? `url('${item.artistImageUrl}')` : 'none' }"
        :aria-label="`View profile of ${item.artist}`"
      >
        <div class="panel-overlay"></div>
        <div class="panel-content">
          <p class="panel-name">{{ item.artist }}</p>
          <span class="panel-cta" v-scramble.hover>VIEW PROFILE</span>
        </div>
      </NuxtLink>
    </div>

    <div class="artist-strip" v-else>
      <div v-for="n in 4" :key="n" class="artist-panel skeleton-panel"></div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-featured {
  padding: 0 2rem 4rem;
  background-color: #000;
  overflow: hidden;

  @include respond(phone) {
    padding: 0 1rem 2rem;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;
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

.artist-strip {
  display: flex;
  width: 100%;
  height: 36vh;
  gap: 2px;

  @include respond(tab-port) {
    height: 30vh;
  }

  @include respond(phone) {
    height: auto;
    flex-direction: column;
    gap: 2px;
  }
}

.skeleton-panel {
  background: linear-gradient(90deg, #111 25%, #1c1c1c 50%, #111 75%);
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.artist-panel {
  position: relative;
  flex: 1;
  min-width: 0;
  background-size: cover;
  background-position: center;
  background-color: #111;
  overflow: hidden;
  text-decoration: none;
  cursor: pointer;
  transition: flex 0.5s cubic-bezier(0.25, 1, 0.5, 1), filter 0.4s ease;
  filter: grayscale(0.6) contrast(0.85);

  @include respond(phone) {
    flex: none;
    height: 36vw;
    width: 100%;
    filter: grayscale(0.3);
  }

  &:hover {
    flex: 2.2;
    filter: grayscale(0) contrast(1);

    .panel-overlay {
      background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);
    }

    .panel-name {
      opacity: 1;
      transform: translateY(0);
    }

    .panel-cta {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.panel-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.05) 60%, transparent 100%);
  transition: background 0.4s ease;
}

.panel-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem 1.2rem;
  z-index: 2;
}

.panel-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 0.3rem;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.35s ease 0.05s, transform 0.35s cubic-bezier(0.25, 1, 0.5, 1) 0.05s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.panel-cta {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--primary-grey-light2);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.35s ease 0.1s, transform 0.35s cubic-bezier(0.25, 1, 0.5, 1) 0.1s;
}
</style>
