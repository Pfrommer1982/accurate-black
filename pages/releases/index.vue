<script setup>
import { ref, onMounted } from 'vue'
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore'

useHead({
  // Verbeterde title tag met focus keywords vooraan
  title: 'Latest Techno Releases | Accurate Black - Electronic Music Label',
  meta: [
    {
      name: 'description',
      // Verbeterde meta description met call-to-action en keywords
      content: 'Stream and download the latest techno releases from Accurate Black. New dark electronic music every month. Features top underground artists, exclusive tracks, and limited vinyl releases.'
    },
    // Canonical URL
    {
      rel: 'canonical',
      href: 'https://www.accurateblack.nl/releases'
    },
    // Verbeterde OpenGraph tags
    {
      property: 'og:title',
      content: 'Latest Techno Releases | Accurate Black - Electronic Music Label'
    },
    {
      property: 'og:description',
      content: 'Stream and download the latest techno releases from Accurate Black. New dark electronic music every month. Features top underground artists and exclusive tracks.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:image',
      content: 'https://www.accurateblack.nl/public/img/accurate-black.png'
    },
    {
      property: 'og:url',
      content: 'https://www.accurateblack.nl/releases'
    },
    // Verbeterde Twitter Cards
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'Latest Techno Releases | Accurate Black - Electronic Music Label'
    },
    {
      name: 'twitter:description',
      content: 'Stream and download the latest techno releases from Accurate Black. New dark electronic music every month. Features top underground artists and exclusive tracks.'
    },
    {
      name: 'twitter:image',
      content: 'https://www.accurateblack.nl/public/img/accurate-black.png'
    },
    // Verbeterde keywords
    {
      name: 'keywords',
      content: 'techno releases, electronic music, dark techno, underground music, vinyl releases, Accurate Black label, techno artists, new music releases'
    },
    // Extra meta tags
    {
      name: 'robots',
      content: 'index, follow'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }
  ],
  script: [
    // Verbeterd MusicPlaylist Schema
    {
      type: 'application/ld+json',
      json: {
        "@context": "https://schema.org",
        "@type": "MusicPlaylist",
        "name": "Accurate Black Latest Releases",
        "url": "https://www.accurateblack.nl/releases",
        "description": "Latest techno and electronic music releases from Accurate Black label",
        "numTracks": "10",
        "publisher": {
          "@type": "Organization",
          "name": "Accurate Black",
          "url": "https://www.accurateblack.nl",
          "logo": "https://www.accurateblack.nl/public/img/accurate-black.png",
          "sameAs": [
            "https://www.facebook.com/accurateblack",
            "https://www.instagram.com/accurate_black",
            "https://tiktok.com/@accurateblack",
            "https://soundcloud.com/accurateblack"
          ]
        }
      }
    }
  ]
})

// Rest van de setup code blijft hetzelfde
const showData = ref(false)
const spotlightItem = ref({})
const tableData = ref([])

const getHighestPropertyValue = (property) => {
  return tableData.value.length > 0 ? tableData.value[0][property] || (property === 'ACB' ? null : '') : null
}

const sortedTableData = ref([])

onMounted(async () => {
  const db = getFirestore()
  const usersCollection = collection(db, 'users')
  const q = query(usersCollection, orderBy('ACB', 'desc')) 
  const querySnapshot = await getDocs(q)
  tableData.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  
  sortedTableData.value = tableData.value.slice().sort((a, b) => {
    if (a.ACB === b.ACB) {
      return a.releaseName.localeCompare(b.releaseName)
    } else {
      return b.ACB - a.ACB
    }
  })

  spotlightItem.value = sortedTableData.value.length > 0 ? sortedTableData.value[0] : {};

  showData.value = true
})
</script>

<template>
  <main class="section-releases">
    <article>
      <header>
        <h1 class="sr-only">Latest Techno Releases - Accurate Black Label</h1>
        <div class="break-line top">
          <p class="break-line-text" v-once>OUR LATEST RELEASE!</p>
        </div>
      </header>
      
      <section v-if="spotlightItem.releaseName" aria-label="Featured Release">
        <div class="spotlight-container fade-in" v-motion-slide-visible-top>
          <div class="spotlight-left">
            <div class="spotlight-text">
              <h2 class="spotlight-text header">~ OUT NOW ~</h2>
              <p class="spotlight-text acb">{{ getHighestPropertyValue('ACB') }}</p>
              <h3 class="spotlight-text title">{{ spotlightItem.releaseName }}</h3>
              <p class="spotlight-text artist">{{ spotlightItem.artist }}</p>
              <div class="btn-more">
                <NuxtLink :to="`/releases/${spotlightItem.ACB}`" class="btn-more-link">
                  <span class="btn-more-p">CHECK OUT & LISTEN</span>
                </NuxtLink>
              </div>
              <div class="lights"></div>
            </div>
          </div>

          <div class="spotlight-right">
            <img 
              v-lazy="getHighestPropertyValue('imageUrl')" 
              :alt="`${spotlightItem.releaseName} by ${spotlightItem.artist}`" 
              class="spotlight-image" 
              loading="lazy" 
              width="200" 
              height="200"
            />
          </div>
        </div>
      </section>

      <section aria-label="All Releases">
        <div class="break-line bottom">
          <h2 class="break-line-text-bottom" v-once>ALL RELEASES</h2>
        </div>

        <div v-if="showData" class="grid-container fade-in">
          <article v-for="(item) in sortedTableData.slice(1)" :key="item.ACB" class="release-item">
            <div class="data-releases">
              <div>
                <img 
                  v-lazy="item.imageUrl" 
                  :alt="`${item.releaseName} by ${item.artist}`" 
                  class="grid-image" 
                  @click="openModal(item)" 
                  loading="lazy"
                  width="200" 
                  height="200"
                />
              </div>
              <div class="text-box">
                <p class="p-acb">{{ item.ACB }}</p>
                <h3 class="p-track">{{ item.releaseName }}</h3>
                <p class="p-artist">{{ item.artist }}</p>
                <div class="btn-more">
                  <NuxtLink :to="`/releases/${item.ACB}`" class="btn-more-link">
                    <span class="btn-more-p">CHECK OUT & LISTEN</span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </article>
  </main>
</template>



<style scoped lang="scss">
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


.section-releases {
  padding: 0 2rem;
  height: auto;
  min-height: 100vh;
  box-sizing: border-box;
  animation-name: fadeInOpacity;
      animation-duration: .4s;
      animation-timing-function: ease-out;

  @include respond(phone) {
    padding: 0 1em;
  }
}




.spotlight-container {
  display: flex;
  width: 100%;
  min-height: 90vh;

  animation-name: fadeInOpacity;
      animation-duration: .1s;
      animation-timing-function: ease-out;

  @include respond(tab-port) {
    flex-direction: column;
  }
}

.spotlight-left,
.spotlight-right {
  flex: 1;
  display: flex;
  align-items: center;
}

.spotlight-text {
  padding: 0 1rem;
  justify-content: center;
  width: 100%;
  text-align: center;
  color: var(--primary-grey-light2);
  text-transform: uppercase;

  @include respond(tab-port) {
    justify-content: center;
    width: 100%;
    text-align: center;
  }


  &.header {
    color: var(--primary-grey-light1);
    font-size: 3rem;
    font-weight: 700;
    background-color: transparent;
    margin-bottom: 2rem;

    @include respond(tab-port) {
      font-size: 2rem;
      margin-bottom: -1rem;
    }
    @include respond(phone){
      font-size: 1.6rem;
      margin-top: 1rem;
      margin-bottom: -2rem;    
  }
  }
  
  &.acb {
    color: var(--primary-grey-light2);
    font-size: 4rem;
    font-weight: 100;
    letter-spacing: 2.5rem;
    padding-left: 1rem;
    display: flex;
    justify-content: center;

    background-color: transparent;

    @include respond(tab-land) {
      font-size: 2rem;
      margin-bottom: 1rem;
      margin-top: 2rem;
      justify-content: center;
      padding-left: 2rem;
      letter-spacing: 1.5rem;
      text-align: center
    }
    @include respond(phone){
      font-size: 1.6rem;
     
      
  }
  }

  &.title {
    color: var(--primary-grey-light2);
    font-size: 3rem;
    font-weight: 500;
    margin-bottom: 1rem;
    background-color: transparent;    

    @include respond(tab-land) {
      font-size: 2rem;
    }
    @include respond(phone){
      font-size: 1.6rem;
      margin-top: -1rem;        
  }
  }

  &.artist {
    color: var(--primary-grey-light1);
    font-size: 3rem;
    font-weight: 700;
    background-color: transparent;
    margin-bottom: 5rem;

    @include respond(tab-port) {
      font-size: 2rem;
      margin-bottom: 3rem;
    }
    @include respond(phone){
      font-size: 1.6rem;
      margin-top: -1rem;
      margin-bottom: 1rem;      
  }
  }
}

.spotlight-image {
  width: 30rem;
  height: 30rem;
  max-width: 750px;
  display: flex;
  justify-content: center;
  transform: perspective(150rem) rotateY(-15deg);
  margin: 0 auto 2rem auto;

  &:hover {
    animation-name: glitch1;
    animation-duration: 2s;
    animation-timing-function: ease-out;
  }

  -webkit-box-reflect: below 5px -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(transparent),
    color-stop(65%, transparent),
    to(rgba(250, 250, 250, 0.5))
  );


@include respond(tab-port) {
  width: 18rem;
  height: 18rem;
  max-width: 750px;
  display: flex;
  justify-content: center;
  transform: perspective(150rem) rotateY(-15deg);

}

}

.grid-container {
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, .5fr));
  display: grid;
  width: 100%;
  justify-content: center;
  margin-bottom: 2rem;

  text-transform: uppercase;

  animation-name: fadeInOpacity;
      animation-duration: 1s;
      animation-timing-function: ease-out;

  @include respond(tab-land) {
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  }

  @include respond(tab-port) {
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));

  }

  @include respond(phone) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: .6rem;
    grid-row-gap: .5rem;
    margin-top: 2rem;
  
  
  }
}

.grid-image {
  width: 100%;
  height: auto;
  max-width: 100%;
  border-radius: 3px 3px 0 0;
  }

.data-releases {
  color: var(--primary-grey-light1);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--primay-grey-dark-opacity);
  border-radius: 3px;
  overflow: hidden;
  width: 100%;
  background-color: rgb(17, 17, 17);

  &:hover {
    animation-name: glitch1;
    animation-duration: 2s;
    animation-timing-function: ease-out;
  }
}

.text-box {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  padding: 0 1rem;
  @include respond(phone){
  height: 12rem;
  }
  
}

.p-acb {
  display: flex;
  justify-content: flex-end;
  margin-bottom: auto;
  @include respond(phone){
    margin-bottom: 1rem;
  }
}

.p-track,
.p-artist {
  font-size: 1.5rem;
  @include respond(tab-port){
    font-size: 1.1rem;
  }
  @include respond(phone){
    font-size: .8rem;
    width: 100%;
  }
}

.p-artist {
  padding-bottom: 3rem;
  color: var(--primary-grey-light2);
}

.social-icons {
  display: flex;
  justify-content: center;
}

.icon {
  color: var(--primary-grey-light2);
  margin-left: 1rem;

  &:hover {
    color: var(--primary-grey-light1);
  }
}
</style>
