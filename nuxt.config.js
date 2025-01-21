export default defineNuxtConfig({
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
  css: ['@/assets/style/main.scss'],
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
          @import "@/assets/style/scss/components/_button-small.scss";`,
        },
      },
    },
  },

  robots: {
    UserAgent: '*',
    Disallow: '',
  },
  site: {
    url: 'https://www.accurateblack.nl',
  },

  sitemap: {
    hostname: 'https://www.accurateblack.nl',
    gzip: true,
    routes: async () => {
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
        console.error('Error fetching sitemap data', err);
        return ['/'];  
      }
    },
    exclude: ['/admin/**'],
  },

  generate: {
    routes: async () => {
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
        console.error('Error fetching generate routes data', err);
        return ['/']; 
      }
    },
  },

  build: {
    output: {
      dir: '.output'
    },
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
        compress: {
          drop_console: true,
        },
      },
    },
  },
  render: {
    http2: {
      push: true,
    },
    compressor: {
      brotli: {
        threshold: 10240,
      },
    },
  },
  performance: {
    prefetch: false,
    preload: true,
  },
  image: {
    formats: ['webp'],
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
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
          rel: 'preload',
          as: 'style',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        },
        {
          rel: 'preload',
          as: 'style',
          href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap',
        },
        {
          rel: 'preload',
          as: 'style',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
          onload: "this.onload=null;this.rel='stylesheet'",
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap',
          onload: "this.onload=null;this.rel='stylesheet'",
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
          onload: "this.onload=null;this.rel='stylesheet'",
        },
      ],
    },
  },
  plugins: [
    '~/plugins/firebase.client.js',
    '~/plugins/auth.client.js',
    '~/plugins/directives.js',
  ],
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
  target: 'server',  
});