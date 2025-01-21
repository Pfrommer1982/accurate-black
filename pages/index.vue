<script setup>
import { ref, onMounted, computed } from 'vue';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';


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

useHead({
  title: 'Accurate Black | Deep. Dark. Authentic. Profound.',
  meta: [
    {
      name: 'description',
      content: 'Explore deep, dark, and authentic electronic music with Accurate Black. Feel the beats, not just hear them. Discover our latest releases and our artists.'
    },
    {
      property: 'og:title',
      content: 'Accurate Black | Deep. Dark. Authentic. Profound.'
    },
    {
      property: 'og:description',
      content: 'Explore deep, dark, and authentic electronic music with Accurate Black. Feel the beats, not just hear them. Discover our latest releases and our artists.'
    },
    {
      property: 'og:image',
      content: '/public/img/accurate-black.png'
    },
    {
      property: 'og:url',
      content: 'https://www.accurateblack.nl'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'Accurate Black | Deep. Dark. Authentic. Profound.'
    },
    {
      name: 'twitter:description',
      content: 'Explore deep, dark, and authentic electronic music with Accurate Black. Feel the beats, not just hear them. Discover our latest releases and top artists.'
    },
    {
      name: 'twitter:image',
      content: '/public/img/accurate-black.png'
    }
  ],
  script: [
    // Website Structured Data
    {
      type: 'application/ld+json',
      json: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://www.accurateblack.nl",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.accurateblack.nl/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    },
    // Breadcrumb Structured Data
    {
      type: 'application/ld+json',
      json: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.accurateblack.nl"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Releases",
            "item": "https://www.accurateblack.nl/releases"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Artists",
            "item": "https://www.accurateblack.nl/artists"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Accurate Sessions",
            "item": "https://www.accurateblack.nl/accurate-sessions"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Techtonic",
            "item": "https://www.accurateblack.nl/techtonic"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Demo Submission",
            "item": "https://www.accurateblack.nl/demo-submission"
          },
          {
            "@type": "ListItem",
            "position": 7,
            "name": "About Us",
            "item": "https://www.accurateblack.nl/about"
          }
        ]
      }
    }
  ]
});

</script>


<template>
  <div class="page-container">
    <Hero :spotlightItems="spotlightItems" />
    <FeaturedArtists />
    <SpotlightShow />

    
  </div>
</template>

<style lang="scss" scoped>


.page-container {
  display: flex;
  flex-direction: column;
  gap: 4rem;

}
</style>
