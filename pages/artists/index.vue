<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

useHead({ title: 'Artists' })
const artists = ref([]);
let ctx;

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

    nextTick(async () => {
      if (import.meta.client) {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        ctx = gsap.context(() => {
          gsap.set('.artist-card', { y: 50, opacity: 0 });

          ScrollTrigger.batch('.artist-card', {
            onEnter: elements => {
              gsap.to(elements, {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                duration: 0.8,
                ease: "power2.out"
              });
            },
            start: "top 85%",
            once: true
          });
        });
      }
    });

  } catch (error) {
    console.error('Error fetching artists:', error);
  }
};

onMounted(fetchArtists);

const handleImageError = (artist) => {
  artist.artistImageUrl = "https://www.accurateblack.nl/public/img/artistprofiledummy.png";
};

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <section class="section-artist">
    <div class="break-line top">
      <p class="break-line-text" v-once>ACCURATE BLACK ARTISTS</p>
    </div>

    <div class="grid-container">
      <NuxtLink
        v-for="(artist, index) in artists"
        :key="index"
        :to="`/artists/${artist.artist}`"
        class="artist-card"
      >
        <NuxtImg
          :src="artist.artistImageUrl"
          alt="Artist Image"
          class="artist-image"
          @error="handleImageError(artist)"
          loading="lazy"
          width="450"
          height="450"
        />
        <div class="artist-overlay">
          <p class="artist-name" v-scramble.hover>{{ artist.artist }}</p>
          <span class="artist-cta">VIEW PROFILE</span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section-artist {
  padding: 0 2rem 4rem;

  @include respond(phone) {
    padding: 0 1rem 2rem;
  }
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 2px;
  margin-top: 2rem;

  @include respond(tab-port) {
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }

  @include respond(phone) {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 1rem;
  }
}

.artist-card {
  position: relative;
  display: block;
  overflow: hidden;
  text-decoration: none;
  background-color: #111;
  aspect-ratio: 1 / 1;

  &:hover .artist-image {
    filter: grayscale(0) brightness(0.55);
    transform: scale(1.04);
  }

  &:hover .artist-overlay {
    opacity: 1;
  }

  &:hover .artist-name {
    transform: translateY(0);
    opacity: 1;
  }

  &:hover .artist-cta {
    transform: translateY(0);
    opacity: 1;
  }
}

.artist-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) brightness(0.65);
  transition: filter 0.5s ease, transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  display: block;
}

.artist-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.2rem 1.4rem;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.artist-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 0.3rem;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.35s ease 0.05s, transform 0.35s cubic-bezier(0.25, 1, 0.5, 1) 0.05s;

  @include respond(phone) {
    font-size: 1rem;
  }
}

.artist-cta {
  font-size: 0.7rem;
  font-weight: 400;
  color: var(--primary-grey-light2);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.35s ease 0.1s, transform 0.35s cubic-bezier(0.25, 1, 0.5, 1) 0.1s;
}
</style>