<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const releaseDetails = ref({});
const otherTracks = ref([]);
const otherTracksImage = ref('');
const otherTracksHaveImage = ref(false);

const route = useRoute();

onMounted(async () => {
  const db = getFirestore();
  const releasesCollection = collection(db, 'users');

  try {
    const qMain = query(releasesCollection, where('ACB', '==', route.params.id));
    const querySnapshotMain = await getDocs(qMain);

    if (!querySnapshotMain.empty) {
      querySnapshotMain.forEach(doc => {
        releaseDetails.value = doc.data();
      });

      const qOther = query(releasesCollection, where('artist', '==', releaseDetails.value.artist));
      const querySnapshotOther = await getDocs(qOther);

      if (!querySnapshotOther.empty) {
        querySnapshotOther.forEach(doc => {
          const data = doc.data();
          if (data.ACB !== route.params.id) {
            otherTracks.value.push(data);
            if (data.imageUrl) {
              otherTracksImage.value = data.imageUrl;
              otherTracksHaveImage.value = true;
            }
          }
        });
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});


</script>

<template>
  <main class="section-release-details">
    <article>
      <header>
        <div v-once class="break-line top">
          <h1 class="break-line-text">{{ releaseDetails.artist }}</h1>
        </div>
      </header>

      <div class="details-container">
        <section v-if="releaseDetails" class="details-left" aria-label="Release Details">
          <div class="details-left-header">
            <div class="btn-more back">
              <NuxtLink to="/releases" class="btn-more-link">
                <span class="btn-more-p">BACK TO RELEASES</span>
              </NuxtLink>
            </div>
            <p class="acb">ACB{{ releaseDetails.ACB }}</p>
          </div>

          <div class="embedded" v-html="releaseDetails.soundcloudUrl" :title="`${releaseDetails.releaseName} by ${releaseDetails.artist} on SoundCloud`"></div>

          <h2 class="break-line-text artistname">ARTIST</h2>
          <NuxtLink :to="`/artists/${releaseDetails.artist}`" class="h1a">
            <p class="artist">{{ releaseDetails.artist }}</p>
          </NuxtLink>

          <h2 class="break-line-text">EP / TRACK TITLE</h2>
          <p class="release-name">{{ releaseDetails.releaseName }}</p>

          <h2 class="break-line-text">TRACKLIST</h2>
          <div class="tracks-container">
            <div 
              v-for="(track, index) in releaseDetails.tracks" 
              :key="index" 
              class="tracks" 
              :class="{'border-right': index < releaseDetails.tracks.length - 1}"
            >
              <p><span class="middot" aria-hidden="true">&middot;</span>{{ track.trackName }}</p>
            </div>
          </div>
        </section>

        <aside v-if="releaseDetails" class="details-right">
          <img 
            v-if="releaseDetails.imageUrl" 
            v-lazy="releaseDetails.imageUrl" 
            :alt="`${releaseDetails.releaseName} by ${releaseDetails.artist} - Album Cover`" 
            class="release-image"
            loading="lazy" 
            width="200" 
            height="200" 
          />
          <div v-if="releaseDetails.digDisLink" class="btn-big buy">
            <a :href="releaseDetails.digDisLink" class="btn-more-link" target="_blank" rel="noopener">
              <span class="btn-big-p">STREAM NOW!</span>
            </a>
          </div>
        </aside>
      </div>

      <section v-if="releaseDetails.releaseTrailer" class="rl-trailer" aria-label="Release Video">
        <h2 class="break-line bottom">
          <span class="break-line-text">RELEASE VIDEO</span>
        </h2>
        <div class="trailer">
          <div class="trailer-embed" v-html="releaseDetails.releaseTrailer"></div>
        </div>
      </section>

      <section aria-label="Other Tracks">
        <h2 class="break-line bottom">
          <span class="break-line-text">OTHER TRACKS</span>
        </h2>

        <div v-if="otherTracks.length > 0" class="more-container">
          <h3 class="player-header">
            MORE MUSIC FROM
            <span class="player-header-p">{{ releaseDetails.artist }}</span>
          </h3>
          <div class="other-tracks-grid">
            <article 
              v-for="track in otherTracks" 
              :key="track.ACB" 
              class="other-track"
            >
              <NuxtLink :to="`/releases/${track.ACB}`">
                <img 
                  v-if="track.imageUrl" 
                  :src="track.imageUrl" 
                  :alt="`${track.releaseName} by ${track.artist} - Album Cover`" 
                  class="other-track-image"
                  loading="lazy" 
                  width="200" 
                  height="200" 
                />
                <p v-else>{{ track.releaseName }}</p>
              </NuxtLink>
            </article>
          </div>
        </div>
        <div v-else class="more-container">
          <p class="no-more">NO OTHER TRACKS YET</p>
        </div>
      </section>
    </article>
  </main>
</template>

<style scoped lang="scss">


.section-release-details {
  padding: 0 2rem;
  min-height: 100vh;
  color: var(--primary-grey-light2);
  position: relative;
  overflow: hidden;

  @include respond(tab-port) {
    padding: 0 1rem;
  }

  @include respond(phone) {
    padding: 0 1rem;
  }
}

.details-container {
  display: flex;
  width: 100%;
  min-height: 40vh;
  text-transform: uppercase;

  @include respond(tab-port) {
    flex-direction: column;
  }
}

.details-left {
  flex: 1;
  margin-top: 1rem;

}

.back {
  margin-top: 2.4rem;
}

.btn-more-p {
  @include respond(phone) {
    width: 6.2rem;
  }
}

.details-left-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 5rem;
  width: 100%;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--primary-grey-light2);
}

.acb {
  font-size: 3rem;

  @include respond(tab-land) {
    font-size: 2rem;
    padding: 1rem 0;
  }
}

.artist,
.release-name {
  font-size: 3rem;
  text-transform: uppercase;
  border-bottom: 1px solid var(--primary-grey-light2);
  padding: 2rem 0;
  text-decoration: none;


  @include respond(tab-land) {
    font-size: 2rem;
    padding: 1rem 0;
  }

  @include respond(phone) {
    font-size: 1.5rem;
    padding: 0.5rem 0;
  }
}



.artistname {
  border-top: 1px solid var(--primary-grey-light2);
}

.artist {
  color: var(--primary-grey-light1);
  text-align: center;

  &:hover {
    color: white;
    font-weight: 500;
    transition: all 1s ease-in-out;

  }
}

.h1a {
  text-decoration: none;
  cursor: pointer;
}

.tracks-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 0;
  font-size: 1.3rem;
  flex-direction: column;
  align-items: flex-start;

  @include respond(phone) {
    font-size: 1rem;
    padding: 1rem 0;
  }
}

.middot {
  padding-right: 1rem;
  font-weight: 700;
}

.artist-image,
.artist-image2 {
  max-width: 5rem;
  border-radius: 3px;
  border: 1px solid var(--primary-grey-dark);
}

.details-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.release-image {
  width: 100%;
  max-width: 500px;
  border-radius: 3px;
  margin: 0 auto 6rem auto;
  transform: perspective(150rem) rotateY(-15deg);
  -webkit-box-reflect: below 5px -webkit-gradient(linear,
      left top,
      left bottom,
      from(transparent),
      color-stop(65%, transparent),
      to(rgba(250, 250, 250, 0.3)),
    );

  @include respond(tab-port) {
    width: 18rem;
    max-width: 750px;
    display: flex;
    justify-content: center;
    transform: perspective(150rem) rotateY(-15deg);
    margin: 0 auto 6rem auto;
    -webkit-box-reflect: below 5px -webkit-gradient(linear,
        left top,
        left bottom,
        from(transparent),
        color-stop(65%, transparent),
        to(rgba(250, 250, 250, 0.5)),

      );
  }


}

.embedded {
  display: flex;
  width: 100%;
  height: auto;
  margin: 1rem 0;
}

.details {
  color: var(--primary-grey-light2);
}

.more-container {
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.player-header {
  color: var(--primary-grey-light2);
  justify-content: center;
  align-items: center;
  text-align: center;

  @include respond(phone) {
    font-size: 1rem;
  }
}

.player-header-p {
  color: var(--primary-grey-light1);

  @include respond(phone) {
    font-size: 1rem;
  }
}

.trailer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem 0 4rem 0;

  @include respond(phone) {
    padding: 1rem 0 2rem 0;
  }
}

.trailer-embed {

  transform: scale(1.4);

  @include respond(tab-port) {
    transform: scale(1);
  }

  @include respond(phone) {
    transform: scale(.6);




  }
}


.other-tracks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
  justify-items: center;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;

  @include respond(tab-port) {
    margin-bottom: 4rem;
  }

  @include respond(phone) {
    margin-bottom: 1rem;
  }
}

.other-track {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.other-track-image {
  justify-self: center;
  width: 100%;
  max-width: 10rem;
  height: auto;
  border-radius: 6px;

}

.buy {
  transform: translateY(6rem);

  @include respond(tab-land) {
    transform: translateY(4rem);
  }

  @include respond(tab-port) {
    transform: translateY(4rem);
  }

  @include respond(phone) {
    transform: translateY(4rem);
  }
}

.no-more {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

}
</style>
