export default defineNuxtConfig({
  // Modules
  modules: [
    '@vueuse/motion/nuxt',
    '@nuxt/ui',
    '@nuxt/image',
    'nuxt-icon',
    '@dargmuesli/nuxt-cookie-control',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/seo',
  ],

 

  // CSS
  css: ['@/assets/style/main.scss'],

  // SCSS Preprocessing
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/style/scss/abstracts/_mixins.scss";
            @import "@/assets/style/scss/abstracts/_variables.scss";
            @import "@/assets/style/scss/base/_animations.scss";
            @import "@/assets/style/scss/base/_base.scss";
            @import "@/assets/style/scss/base/_typography.scss";
            @import "@/assets/style/scss/base/_utilities.scss";
            @import "@/assets/style/scss/components/_breakline.scss";
            @import "@/assets/style/scss/components/_button-big.scss";
            @import "@/assets/style/scss/components/_button-small.scss";
          `,
        },
      },
    },
  },

  // Robots
  robots: {
    UserAgent: '*',
    Disallow: '',
  },

  // Site URL (SEO)
  site: {
    url: 'https://www.accurateblack.nl',
  },

  // Sitemap & Generate Routes Helper
  sitemap: {
    hostname: 'https://www.accurateblack.nl',
    gzip: true,
    routes: async () => await fetchDynamicRoutes(),
    exclude: ['/admin/**'],
  },

  generate: {
    routes: async () => await fetchDynamicRoutes(),
  },

  // Build Config
  build: {
    output: { dir: '.output' },
    extractCSS: true,
    optimization: {
      splitChunks: {
        layouts: true,
        pages: true,
        commons: true,
      },
    },
    terser: {
      terserOptions: {
        compress: { drop_console: true },
      },
    },
  },

  // Render Optimization
  render: {
    http2: { push: true },
    compressor: {
      brotli: { threshold: 10240 },
    },
  },

  // Performance Config
  performance: {
    prefetch: false,
    preload: true,
  },

  // Image Module Config
  image: {
    formats: ['webp'],
  },

  // App Meta and Links
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
          onload: "this.onload=null;this.rel='stylesheet'",
        },
      ],
      meta: [
        // Default meta tags
        {
          name: 'description',
          content: 'Discover cutting-edge techno & electronic music at Accurate Black label. Stream exclusive releases, connect with underground artists, and submit your demos.',
        },
        {
          name: 'keywords',
          content: 'techno music, electronic music label, dark techno, underground music, techno artists, music releases, demo submission',
        },
        {
          name: 'robots',
          content: 'index, follow',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        // Open Graph meta tags
        {
          property: 'og:title',
          content: 'Electronic Music Label | Accurate Black - Deep Dark Techno',
        },
        {
          property: 'og:description',
          content: 'Discover cutting-edge techno & electronic music at Accurate Black label. Stream exclusive releases, connect with underground artists, and submit your demos.',
        },
        {
          property: 'og:image',
          content: '/public/img/accurate-black.png',
        },
        {
          property: 'og:url',
          content: 'https://www.accurateblack.nl',
        },
        // Twitter Card meta tags
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: 'Electronic Music Label | Accurate Black - Deep Dark Techno',
        },
        {
          name: 'twitter:description',
          content: 'Discover cutting-edge techno & electronic music at Accurate Black label. Stream exclusive releases, connect with underground artists, and submit your demos.',
        },
        {
          name: 'twitter:image',
          content: '/public/img/accurate-black.png',
        },
        // Canonical URL
        {
          rel: 'canonical',
          href: 'https://www.accurateblack.nl',
        },
      ],
    },
  },

  // Plugins
  plugins: [
    '~/plugins/firebase.client.js',
    '~/plugins/auth.client.js',
    '~/plugins/directives.js',
  ],

  // Nitro Config
  nitro: {
    preset: 'firebase',
    firebase: {
      gen: 2,
      httpsOptions: {
        region: 'europe-west1',
        maxInstances: 3,
      },
    },
  },

  // Server Target
  target: 'server',

  // SEO Settings
  seo: {
    title: 'Accurate Black - Electronic Music Label',
    description: 'Discover cutting-edge techno & electronic music at Accurate Black label. Stream exclusive releases, connect with underground artists, and submit your demos.',
    og: {
      title: 'Electronic Music Label | Accurate Black - Deep Dark Techno',
      description: 'Discover cutting-edge techno & electronic music at Accurate Black label. Stream exclusive releases, connect with underground artists, and submit your demos.',
      image: '/public/img/accurate-black.png',
      url: 'https://www.accurateblack.nl',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Electronic Music Label | Accurate Black - Deep Dark Techno',
      description: 'Discover cutting-edge techno & electronic music at Accurate Black label. Stream exclusive releases, connect with underground artists, and submit your demos.',
      image: '/public/img/accurate-black.png',
    },
    canonical: 'https://www.accurateblack.nl',
    robots: 'index, follow',
  },
});

// Helper function for dynamic routes
async function fetchDynamicRoutes() {
  try {
    const releasesResponse = await fetch('https://www.accurateblack.nl/releases');
    const releasesHtml = await releasesResponse.text();
    const releasesIds = Array.from(releasesHtml.matchAll(/\/releases\/(\d+)/g)).map((match) => match[1]);

    const artistsResponse = await fetch('https://www.accurateblack.nl/artists');
    const artistsHtml = await artistsResponse.text();
    const artistIds = Array.from(artistsHtml.matchAll(/\/artists\/(\w+)/g)).map((match) => match[1]);

    const releaseRoutes = releasesIds.map((id) => `/releases/${id}`);
    const artistRoutes = artistIds.map((id) => `/artists/${id}`);

    return [
      '/',
      '/releases',
      ...releaseRoutes,
      '/artists',
      ...artistRoutes,
      '/techtonic',
      '/accurate-sessions',
      '/demo-submission',
      '/about',
      '/privacy-policy',
      '/login',
    ];
  } catch (err) {
    console.error('Error fetching routes:', err);
    return ['/'];
  }
}
