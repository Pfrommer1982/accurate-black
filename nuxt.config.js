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

  // Image Module Config
  image: {
    provider: 'ipx',
    preload: true,
    quality: 80,
    format: ['webp', 'avif'],
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
    },
    densities: [1, 2],
    domains: ['www.accurateblack.nl'],
  },

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

  // Experimental Features
  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
    viewTransition: true,
  },

  // Robots
  robots: {
    UserAgent: '*',
    Disallow: '/admin/',
    Allow: '/',
  },

  // Site URL (SEO)
  site: {
    url: 'https://www.accurateblack.nl',
    name: 'Accurate Black',
    description: 'Discover cutting-edge techno & electronic music at Accurate Black label.',
    defaultLocale: 'en',
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
      minimize: true,
      minimizer: {
        minifyCSS: true,
        minifyJS: true,
      },
    },
    terser: {
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === 'production',
          drop_debugger: true,
        },
      },
    },
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
      },
    },
  },

  // Render Optimization
  render: {
    http2: { push: true },
    compressor: {
      brotli: { threshold: 10240 },
      gzip: { threshold: 10240 },
    },
    static: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dagen cache
    },
  },

  // Performance Config
  performance: {
    prefetch: true,
    preload: true,
    serviceWorker: true,
  },

  // App Meta and Links
  app: {
    head: {
      titleTemplate: '%s | Accurate Black',
      defaultTitle: 'Accurate Black - Electronic Music Label',
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
        { rel: 'canonical', href: 'https://www.accurateblack.nl' },
      ],
      meta: [
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
          content: 'https://www.accurateblack.nl/public/img/accurate-black.png',
        },
        {
          property: 'og:url',
          content: 'https://www.accurateblack.nl',
        },
        {
          property: 'og:type',
          content: 'website',
        },
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
          content: 'https://www.accurateblack.nl/public/img/accurate-black.png',
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Accurate Black",
            "description": "Deep. Dark. Authentic. Profound. We delve into the depths of electronic music. This is where the beats are felt, not just heard. We are Accurate Black.",
            "url": "https://www.accurateblack.nl",
            "logo": "https://www.accurateblack.nl/public/img/accurate-black.png",
            "image": "https://www.accurateblack.nl/public/img/accurate-black.png",
            "sameAs": [
              "https://facebook.com/accurateblack",
              "https://twitter.com/accurateblack",
              "https://instagram.com/accurateblack"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "info.accurateblack@gmail.com"
            }
          }),
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
    preset: 'vercel',
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
      image: 'https://www.accurateblack.nl/public/img/accurate-black.png',
      url: 'https://www.accurateblack.nl',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Electronic Music Label | Accurate Black - Deep Dark Techno',
      description: 'Discover cutting-edge techno & electronic music at Accurate Black label. Stream exclusive releases, connect with underground artists, and submit your demos.',
      image: 'https://www.accurateblack.nl/public/img/accurate-black.png',
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