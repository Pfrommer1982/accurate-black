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
  // Verbeterde title tag met belangrijke keywords vooraan
  title: 'Electronic Music Label | Accurate Black - Deep Dark Techno',
  
  meta: [
    {
      name: 'description',
      // Verbeterde meta description met call-to-action
      content: 'Discover cutting-edge techno & electronic music at Accurate Black label. Stream exclusive releases, connect with underground artists, and submit your demos. Dark, deep, and authentic sound.'
    },
    // Keywords meta tag (optioneel, maar kan helpen)
    {
      name: 'keywords',
      content: 'techno music, electronic music label, dark techno, underground music, techno artists, music releases, demo submission'
    },
    // Canonical URL om duplicate content te voorkomen
    {
      rel: 'canonical',
      href: 'https://www.accurateblack.nl'
    },
    // Verbeterde social media tags
    {
      property: 'og:title',
      content: 'Electronic Music Label | Accurate Black - Deep Dark Techno'
    },
    {
      property: 'og:description',
      content: 'Discover cutting-edge techno & electronic music at Accurate Black label. Stream exclusive releases, connect with underground artists, and submit your demos.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:image',
      content: '/public/img/accurate-black.png'
    },
    {
      property: 'og:url',
      content: 'https://www.accurateblack.nl'
    },
    // Twitter Cards optimalisatie
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'Electronic Music Label | Accurate Black - Deep Dark Techno'
    },
    {
      name: 'twitter:description',
      content: 'Discover cutting-edge techno & electronic music at Accurate Black label. Stream exclusive releases, connect with underground artists, and submit your demos.'
    },
    {
      name: 'twitter:image',
      content: '/public/img/accurate-black.png'
    },
    // Extra meta tags voor betere indexering
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
    // Verbeterde Website Structured Data
    {
      type: 'application/ld+json',
      json: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Accurate Black",
        "url": "https://www.accurateblack.nl",
        "logo": "https://www.accurateblack.nl/public/img/accurate-black.png",
        "description": "Electronic music label specializing in deep, dark techno music",
        "sameAs": [
          "https://www.facebook.com/accurateblack",
          "https://www.instagram.com/accurateblack",
          "https://soundcloud.com/accurateblack"
        ],
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.accurateblack.nl/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    },
    // Verbeterde Breadcrumb Structured Data
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
            "name": "Latest Releases",
            "item": "https://www.accurateblack.nl/releases"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Featured Artists",
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
            "name": "Techtonic Events",
            "item": "https://www.accurateblack.nl/techtonic"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Submit Demo",
            "item": "https://www.accurateblack.nl/demo-submission"
          },
          {
            "@type": "ListItem",
            "position": 7,
            "name": "About Accurate Black",
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
    <!-- Toegevoegde semantische HTML structuur -->
    <main>
      <h1 class="sr-only">Accurate Black - Electronic Music Label</h1>
      <Hero :spotlightItems="spotlightItems" />
      <FeaturedArtists />
      <SpotlightShow />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
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
</style>