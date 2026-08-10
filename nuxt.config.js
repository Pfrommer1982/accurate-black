export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  // Modules
  modules: [
    '@nuxt/eslint',
    '@vueuse/motion/nuxt',
    '@nuxt/image',
    'nuxt-icon',
    '@nuxtjs/robots',
  ],

  // Image Module Config
  image: {
    provider: 'ipx',
    preload: false,
    quality: 80,
    format: ['webp', 'avif'],
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
    },
    densities: [1, 2],
    domains: ['www.accurateblack.nl', 'ik.imagekit.io'],
  },

  // CSS
  css: ['@/assets/style/main.scss'],

  // SCSS Preprocessing
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use 'assets/style/scss/abstracts/_mixins' as *;`,
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

  // Robots (classic search + AI crawlers)
  robots: {
    groups: [
      {
        userAgent: ['*'],
        allow: ['/'],
        disallow: ['/admin', '/login'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'Google-Extended',
          'PerplexityBot',
          'ClaudeBot',
          'Anthropic-AI',
          'Applebot-Extended',
          'Bytespider',
          'CCBot',
        ],
        allow: ['/', '/llms.txt', '/sitemap.xml'],
        disallow: ['/admin', '/login'],
      },
    ],
    sitemap: 'https://www.accurateblack.nl/sitemap.xml',
  },

  // Site URL (SEO)
  site: {
    url: 'https://www.accurateblack.nl',
    name: 'Accurate Black',
    description: 'Accurate Black is an independent electronic music label for deep, dark underground techno and related electronic music.',
    defaultLocale: 'en',
  },

  // Build Config (Removed legacy Nuxt 2 Webpack build options)
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

  // Render & Performance Config (Removed legacy Nuxt 2 optimizations)

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
          rel: 'preload',
          as: 'style',
          href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
          onload: "this.onload=null;this.rel='stylesheet'",
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      meta: [
        {
          name: 'description',
          content: 'Accurate Black is an independent electronic music label for deep, dark underground techno. Explore releases, artists, radio archives, demos and DJ bookings.',
        },
        {
          name: 'keywords',
          content: 'Accurate Black, electronic music label, dark techno, underground techno, Robbi Altidore, Techtonic, Accurate Sessions, demo submission, DJ bookings',
        },
        {
          name: 'robots',
          content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          property: 'og:title',
          content: 'Accurate Black | Independent Electronic Music Label',
        },
        {
          property: 'og:description',
          content: 'Deep. Dark. Authentic. Profound. Independent electronic music label for underground techno, catalogue releases, radio and bookings.',
        },
        {
          property: 'og:image',
          content: 'https://ik.imagekit.io/pweehbu88/icons/Accurate-menu.webp?updatedAt=1738326085492',
        },
        {
          property: 'og:url',
          content: 'https://www.accurateblack.nl/',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:site_name',
          content: 'Accurate Black',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: 'Accurate Black | Independent Electronic Music Label',
        },
        {
          name: 'twitter:description',
          content: 'Deep. Dark. Authentic. Profound. Independent electronic music label for underground techno, catalogue releases, radio and bookings.',
        },
        {
          name: 'twitter:image',
          content: 'https://ik.imagekit.io/pweehbu88/icons/Accurate-menu.webp?updatedAt=1738326085492',
        },
      ],
    },
  },

  routeRules: {
    '/techtonic': { prerender: false },
    '/accurate-sessions': { prerender: false },
    '/login': { robots: 'noindex, nofollow' },
    '/admin/**': { robots: 'noindex, nofollow' },
  },

  // Plugins
  plugins: [
    '~/plugins/directives.js',
  ],

  // Nitro Config
  nitro: {
    preset: 'vercel',
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },
    prerender: {
      routes: await fetchDynamicRoutes(),
      ignore: ['/_ipx/', '/artists/_payload'],
      crawlLinks: false,
    },
    routeRules: {
      '/**': {
        headers: {
          'X-Frame-Options': 'SAMEORIGIN',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
          'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
        },
      },
      '/admin/**': {
        headers: {
          'X-Robots-Tag': 'noindex, nofollow',
        },
      },
    },
  },

  // Contact forms + public Firebase web config (set these in Vercel env for Production/Preview).
  runtimeConfig: {
    contactInbox: process.env.CONTACT_INBOX || 'info.accurateblack@gmail.com',
    public: {
      contactInbox: process.env.CONTACT_INBOX || 'info.accurateblack@gmail.com',
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY || '',
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN || '',
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || '',
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET || '',
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID || '',
    },
  },

  compatibilityDate: '2025-01-31',
  future: {
    compatibilityVersion: 4,
  }
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
