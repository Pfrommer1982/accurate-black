<script>
import { ref, onMounted } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export default {
  setup() {
    const artists = ref([]);

    const fetchArtists = async () => {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, 'users'));
        const artistsMap = {};

        querySnapshot.forEach(doc => {
          const data = doc.data();
          const artistId = data.artist;
          if (!artistsMap[artistId]) {
            artistsMap[artistId] = {
              artist: data.artist,
              artistImageUrl: data.artistImageUrl,
              acbValues: []
            };
          }
          artistsMap[artistId].acbValues.push(data.ACB);
        });

        artists.value = Object.values(artistsMap);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    onMounted(fetchArtists);

    const handleImageError = (artist) => {
      artist.artistImageUrl = "https://www.accurateblack.nl/public/img/artistprofiledummy.png";
    };

    return {
      artists,
      handleImageError
    };
  }
};
</script>


<template>

    <section class="section-artist">
      <div class="break-line top">
        <p class="break-line-text" v-once>ACCURATE BLACK ARTISTS</p>
      </div>

      <div class="grid-container">
        <div v-for="(artist, index) in artists" :key="index" class="artist-profile-card">
          <NuxtLink :to="`/artists/${artist.artist}`">
            <NuxtImg 
  :src="artist.artistImageUrl" 
  alt="Artist Image" 
  class="artist-image" 
  @error="handleImageError" 
  loading="lazy"
  width="450" 
  height="450"/>

    
            <div class="text-box">
              <div class="artist-name">{{ artist.artist }}</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

</template>



<style lang="scss" scoped>
.section-artist {
  padding: 0 2rem;

  @include respond(phone) {
    padding: 0 1rem;
  }
}

.grid-container {
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  display: grid;
  margin-bottom: 2rem;
  margin-top: 6rem;
  width: 100%;
  justify-content: center;
  text-transform: uppercase;

  @include respond(tab-port) {
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }

  @include respond(phone) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 0.6rem;
    grid-row-gap: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}

.artist-profile-card {
  color: var(--primary-grey-light1);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--primay-grey-dark-opacity);
  border-radius: 3px;
  overflow: hidden;
  width: 100%;
  background-color: rgb(17, 17, 17);

  &:hover {
    transform: scale(1.01);
  }
}

.artist-image {
  filter: grayscale(1) contrast(.75);
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.text-box {
  height: 6rem;
}

.artist-name {
  font-size: 2rem;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  color: var(--primary-grey-light1);
  padding: 1rem;

  @include respond(phone) {
    font-size: 1.4rem;
  }
}
</style>