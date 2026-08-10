export const SITE_URL = 'https://www.accurateblack.nl'

export const SITE_NAME = 'Accurate Black'

export const SITE_TAGLINE = 'Deep. Dark. Authentic. Profound.'

export const SITE_DESCRIPTION =
  'Accurate Black is an independent electronic music label for deep, dark underground techno and related electronic music. Catalogue releases, artists, radio shows, demo submissions and DJ bookings.'

export const SITE_DEFAULT_IMAGE =
  'https://ik.imagekit.io/pweehbu88/icons/Accurate-menu.webp?updatedAt=1738326085492'

export const SITE_EMAIL = 'info.accurateblack@gmail.com'

export const SITE_SAME_AS = [
  'https://open.spotify.com/user/31dtsb4cdpslbtgu672zypx7jnxa',
  'https://soundcloud.com/accuratemusic',
  'https://www.youtube.com/channel/UCyl1a0TvGcYpysq3i3l9_qQ',
  'https://www.facebook.com/profile.php?id=100063451548903',
  'https://www.instagram.com/accurate_black/',
  'https://www.tiktok.com/@accurateblack',
  'https://twitter.com/AccurateBlack',
  'https://www.beatport.com/label/accurate-black/71241',
  'https://inprogressradio.com/index.php/members/robbi-altidore/',
] as const

export const absoluteUrl = (path = '/'): string => {
  if (/^https?:\/\//i.test(path)) return path
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export const siteGraphSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'RecordLabel'],
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ['ACB', 'Accurate Black Records'],
      description: SITE_DESCRIPTION,
      url: `${SITE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        url: SITE_DEFAULT_IMAGE,
      },
      image: SITE_DEFAULT_IMAGE,
      email: SITE_EMAIL,
      foundingLocation: {
        '@type': 'Place',
        name: 'Netherlands',
      },
      sameAs: [...SITE_SAME_AS],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: SITE_EMAIL,
          availableLanguage: ['English', 'Dutch'],
        },
        {
          '@type': 'ContactPoint',
          contactType: 'bookings',
          email: SITE_EMAIL,
          availableLanguage: ['English', 'Dutch'],
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en',
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#robbi-altidore`,
      name: 'Robbi Altidore',
      alternateName: 'Robin Plompen',
      jobTitle: ['DJ', 'Producer', 'Label Owner'],
      url: absoluteUrl('/about'),
      worksFor: { '@id': `${SITE_URL}/#organization` },
      sameAs: [
        'https://inprogressradio.com/index.php/members/robbi-altidore/',
        'https://soundcloud.com/accuratemusic',
      ],
    },
  ],
})

export const aboutFaqSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Accurate Black?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Accurate Black is an independent electronic music label focused on deep, dark, authentic underground music. The label releases catalogue titles, supports artists, and runs radio shows including Techtonic and Accurate Sessions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I submit a demo to Accurate Black?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the demo submission form at https://www.accurateblack.nl/demo-submission. Send links only (SoundCloud, Bandcamp or a private stream). Every demo gets a listen. Contact email: info.accurateblack@gmail.com.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I book Robbi Altidore for a DJ set?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Send a booking request via the About page bookings form at https://www.accurateblack.nl/about#bookings, or email info.accurateblack@gmail.com with date, city, venue and format.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where can I listen to Accurate Black music and radio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Browse releases at https://www.accurateblack.nl/releases. Techtonic and Accurate Sessions archives are at /techtonic and /accurate-sessions. The label is also on Spotify, SoundCloud, Beatport and YouTube.',
      },
    },
  ],
})
