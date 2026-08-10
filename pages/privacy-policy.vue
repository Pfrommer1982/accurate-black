<script setup lang="ts">
usePageSeo(
  'Privacy Policy',
  'How Accurate Black handles contact data, site technical data and third-party players on accurateblack.nl.',
  undefined,
  { path: '/privacy-policy' },
)

const inbox = 'info.accurateblack@gmail.com'
const updated = '10 August 2026'

const sections = [
  {
    id: '01',
    title: 'Who we are',
    paragraphs: [
      'Accurate Black is an independent electronic music label. This policy explains what data we process when you use www.accurateblack.nl.',
      'Controller contact: info.accurateblack@gmail.com.',
    ],
  },
  {
    id: '02',
    title: 'What we collect',
    paragraphs: [
      'We do not run advertising pixels or first-party analytics cookies on this website.',
      'If you send a demo or booking request, we process the details you submit (name, email, message and related fields) so we can review and reply.',
      'Our hosting and content systems may process standard technical request data such as IP address, browser type, pages requested and timestamps in server logs.',
    ],
  },
  {
    id: '03',
    title: 'Cookies and local storage',
    paragraphs: [
      'This site does not use a cookie consent banner because we do not set non-essential marketing or analytics cookies ourselves.',
      'Strictly technical storage may be used for basic site function (for example admin login state when you sign into the private admin area).',
      'When you play SoundCloud, Spotify or YouTube content embedded or linked from the site, those providers may set their own cookies or similar technologies under their policies.',
    ],
  },
  {
    id: '04',
    title: 'Third parties',
    paragraphs: [
      'Content and media may be delivered through Firebase, ImageKit, Google Fonts, SoundCloud, Spotify, YouTube and FormSubmit (form delivery).',
      'We use these services to run the website, show catalogue media and deliver contact forms. Each provider processes data under its own terms where applicable.',
    ],
  },
  {
    id: '05',
    title: 'How we use data',
    paragraphs: [
      'Contact and form data: to handle demos, bookings and support requests.',
      'Technical logs: to keep the site secure and working.',
      'We do not sell personal data.',
    ],
  },
  {
    id: '06',
    title: 'Retention',
    paragraphs: [
      'Form messages are kept only as long as needed to handle the request and ordinary label administration, unless a longer period is required by law.',
      'Server logs are kept for a limited operational period.',
    ],
  },
  {
    id: '07',
    title: 'Your rights',
    paragraphs: [
      'Depending on your location, you may have rights to access, correct, delete or restrict processing of your personal data, and to object or complain to a supervisory authority.',
      'To exercise a right, email info.accurateblack@gmail.com with the subject Privacy Request.',
    ],
  },
  {
    id: '08',
    title: 'Changes',
    paragraphs: [
      'We may update this policy when the site or our practices change. The date at the top of this page shows the latest revision.',
    ],
  },
] as const
</script>

<template>
  <article class="privacy-page">
    <header class="privacy-page__masthead">
      <div class="privacy-page__utility">
        <p>09 / LEGAL</p>
        <p>PRIVACY</p>
        <p>UPDATED / {{ updated.toUpperCase() }}</p>
      </div>

      <h1 class="privacy-page__title">PRIVACY POLICY</h1>

      <div class="privacy-page__context">
        <p class="privacy-page__kicker">ACCURATE BLACK / DATA NOTICE</p>
        <p class="privacy-page__description">
          Plain-language notice for visitors, demo submissions and booking requests.
          No advertising trackers on this site.
        </p>
        <a
          class="privacy-page__external"
          :href="`mailto:${inbox}?subject=Privacy%20Request`"
        >
          {{ inbox }} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>

    <section
      v-for="section in sections"
      :key="section.id"
      class="privacy-page__section"
      :aria-labelledby="`privacy-${section.id}`"
    >
      <aside class="privacy-page__rail">
        <p class="privacy-page__rail-label">{{ section.id }} / SECTION</p>
        <h2 :id="`privacy-${section.id}`">{{ section.title }}</h2>
      </aside>
      <div class="privacy-page__copy">
        <p
          v-for="(paragraph, index) in section.paragraphs"
          :key="`${section.id}-${index}`"
        >
          {{ paragraph }}
        </p>
      </div>
    </section>

    <section class="privacy-page__footer-rail" aria-label="Privacy actions">
      <p class="privacy-page__rail-label">END / ACTIONS</p>
      <div class="privacy-page__actions">
        <NuxtLink
          v-scramble.hover
          class="privacy-page__action"
          to="/"
        >
          BACK HOME
        </NuxtLink>
        <a
          v-scramble.hover
          class="privacy-page__action"
          :href="`mailto:${inbox}?subject=Privacy%20Request`"
        >
          EMAIL PRIVACY
        </a>
      </div>
    </section>
  </article>
</template>

<style scoped>
.privacy-page {
  min-height: 100vh;
  padding-top: var(--header-height);
  overflow-x: clip;
  background: var(--color-void);
  color: var(--color-paper);
}

.privacy-page__masthead,
.privacy-page__section,
.privacy-page__footer-rail {
  border-bottom: 1px solid var(--color-hairline);
}

.privacy-page__masthead {
  padding: clamp(2rem, 5vw, 4.5rem) var(--page-margin) clamp(2.5rem, 5vw, 4rem);
}

.privacy-page__utility {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: .75rem;
  margin-bottom: clamp(2rem, 4vw, 3.5rem);
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.privacy-page__utility p { margin: 0; }
.privacy-page__utility p:nth-child(2) { text-align: center; }
.privacy-page__utility p:last-child { text-align: right; }

.privacy-page__title {
  margin: 0 0 1.75rem;
  max-width: 12ch;
  font-size: clamp(2.6rem, 9vw, 6rem);
  font-weight: 400;
  letter-spacing: -.05em;
  line-height: .92;
}

.privacy-page__context {
  display: grid;
  gap: .85rem;
  max-width: 38rem;
}

.privacy-page__kicker,
.privacy-page__rail-label {
  margin: 0;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.privacy-page__description {
  margin: 0;
  color: var(--color-ash);
  font-size: .95rem;
  line-height: 1.5;
}

.privacy-page__external {
  justify-self: start;
  color: var(--color-paper);
  font-family: var(--font-mono);
  font-size: .7rem;
  letter-spacing: .06em;
  text-decoration: underline;
  text-underline-offset: .25rem;
}

.privacy-page__section {
  display: grid;
  grid-template-columns: minmax(12rem, 2fr) minmax(0, 5fr);
}

.privacy-page__rail,
.privacy-page__copy,
.privacy-page__footer-rail {
  min-width: 0;
  padding: clamp(1.5rem, 3vw, 2.75rem) var(--page-margin);
}

.privacy-page__rail {
  border-right: 1px solid var(--color-hairline);
}

.privacy-page__rail h2 {
  margin: .75rem 0 0;
  font-size: clamp(1.25rem, 2.4vw, 1.85rem);
  font-weight: 400;
  letter-spacing: -.03em;
  line-height: 1.1;
  text-transform: uppercase;
}

.privacy-page__copy {
  display: grid;
  gap: 1rem;
  max-width: 46rem;
}

.privacy-page__copy p {
  margin: 0;
  color: var(--color-ash);
  font-size: .95rem;
  line-height: 1.55;
}

.privacy-page__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.75rem;
  margin-top: 1rem;
}

.privacy-page__action {
  color: var(--color-paper);
  font-size: .8rem;
  letter-spacing: .08em;
  text-decoration: underline;
  text-underline-offset: .3rem;
  text-transform: uppercase;
}

@media (width < 960px) {
  .privacy-page__utility { grid-template-columns: 1fr auto; }
  .privacy-page__utility p:nth-child(2) { text-align: right; }
  .privacy-page__utility p:last-child { grid-column: 1 / -1; text-align: left; }
  .privacy-page__section { grid-template-columns: minmax(0, 1fr); }
  .privacy-page__rail { border-right: 0; border-bottom: 1px solid var(--color-hairline); }
}
</style>
