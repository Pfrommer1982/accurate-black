<script setup lang="ts">
interface FooterLink {
  label: string
  to: string
}

interface SocialLink {
  label: string
  href: string
  icon: string
}

const year = new Date().getFullYear()

const navigation: FooterLink[] = [
  { label: 'HOME', to: '/' },
  { label: 'RELEASES', to: '/releases' },
  { label: 'ARTISTS', to: '/artists' },
  { label: 'ACCURATE SESSIONS', to: '/accurate-sessions' },
  { label: 'TECHTONIC', to: '/techtonic' },
  { label: 'DEMO SUBMISSION', to: '/demo-submission' },
  { label: 'ABOUT US', to: '/about' },
]

const socials: SocialLink[] = [
  { label: 'Spotify', href: 'https://open.spotify.com/user/31dtsb4cdpslbtgu672zypx7jnxa?si=265ee0fc0f23402a', icon: 'https://ik.imagekit.io/pweehbu88/icons/spotify.svg?updatedAt=1738326108910' },
  { label: 'SoundCloud', href: 'https://soundcloud.com/accuratemusic', icon: 'https://ik.imagekit.io/pweehbu88/icons/soundcloud.svg?updatedAt=1738326109033' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCyl1a0TvGcYpysq3i3l9_qQ', icon: 'https://ik.imagekit.io/pweehbu88/icons/youtube.svg?updatedAt=1738326109085' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100063451548903', icon: 'https://ik.imagekit.io/pweehbu88/icons/facebook.svg?updatedAt=1738326109074' },
  { label: 'Instagram', href: 'https://www.instagram.com/accurate_black/', icon: 'https://ik.imagekit.io/pweehbu88/icons/instagram.svg?updatedAt=1738326109056' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@accurateblack', icon: 'https://ik.imagekit.io/pweehbu88/icons/tiktok.svg?updatedAt=1738326109056' },
  { label: 'X', href: 'https://twitter.com/AccurateBlack', icon: 'https://ik.imagekit.io/pweehbu88/icons/x.svg?updatedAt=1738326109023' },
  { label: 'Beatport', href: 'https://www.beatport.com/label/accurate-black/71241', icon: 'https://ik.imagekit.io/pweehbu88/icons/beatport.svg' },
]
</script>

<template>
  <footer id="site-footer" class="footer">
    <div class="footer__heading">
      <p class="footer__index">END / FRAME</p>
      <p class="footer__descriptor">INDEPENDENT ELECTRONIC MUSIC LABEL</p>
    </div>

    <div class="footer__body">
      <nav class="footer__navigation" aria-label="Footer navigation">
        <ul>
          <li v-for="(item, index) in navigation" :key="item.to">
            <NuxtLink v-scramble.hover :to="item.to" class="footer__route">
              <span class="footer__route-index">{{ String(index + 1).padStart(2, '0') }}</span>
              <span>{{ item.label }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="footer__socials" aria-label="Accurate Black on social media">
        <a
          v-for="social in socials"
          :key="social.href"
          :href="social.href"
          class="footer__social"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img :src="social.icon" alt="" width="24" height="24" loading="lazy" decoding="async">
          <span>{{ social.label }}</span>
        </a>
      </div>
    </div>

    <div class="footer__brand">
      <img
        src="https://ik.imagekit.io/pweehbu88/icons/Accurate-menu.webp?updatedAt=1738326085492"
        alt="Accurate Black"
        class="footer__brand-art"
        width="480"
        height="96"
        loading="lazy"
        decoding="async"
      >
      <img
        src="https://ik.imagekit.io/pweehbu88/icons/Accurate-menu.webp?updatedAt=1738326085492"
        alt="Accurate Black"
        class="footer__mobile-wordmark"
        width="480"
        height="96"
        loading="lazy"
        decoding="async"
      >
    </div>

    <div class="footer__legal">
      <a
        href="https://cpwd.nl"
        class="footer__maker"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/cpwd-logo.png"
          alt="CPWD"
          width="96"
          height="96"
          loading="lazy"
          decoding="async"
        >
        <span>Website build by cpwd.nl</span>
      </a>
      <div class="footer__legal-copy">
        <NuxtLink to="/privacy-policy">Privacy policy</NuxtLink>
        <p>&copy; copyright {{ year }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  padding: 2rem var(--page-margin) 1.5rem;
  border-top: 1px solid var(--color-hairline);
  background: var(--color-void);
  color: var(--color-paper);
}

.footer__heading {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-hairline);
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .6875rem;
  letter-spacing: .08em;
}

.footer__heading p,
.footer__legal p { margin: 0; }

.footer__body {
  display: grid;
  grid-template-columns: minmax(18rem, 1.1fr) minmax(21rem, .9fr);
  gap: clamp(3rem, 8vw, 8rem);
  padding: 4.5rem 0 5.5rem;
}

.footer__navigation ul {
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--color-hairline);
  list-style: none;
}

.footer__navigation li { border-bottom: 1px solid var(--color-hairline); }

.footer__route {
  display: grid;
  grid-template-columns: 3rem 1fr;
  align-items: center;
  min-height: 3.5rem;
  color: var(--color-ash);
  font-size: clamp(1rem, 1.6vw, 1.4rem);
  letter-spacing: -.015em;
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard);
}

.footer__route::after {
  justify-self: end;
  width: 1.5rem;
  height: 1px;
  background: var(--color-hairline);
  content: '';
  transition: width var(--duration-utility) var(--ease-standard), background var(--duration-fast) var(--ease-standard);
}

.footer__route:hover,
.footer__route:focus-visible { color: var(--color-paper); }
.footer__route:hover::after,
.footer__route:focus-visible::after { width: 3rem; background: var(--color-signal); }
.footer__route:focus-visible { outline: 2px solid var(--color-paper); outline-offset: -2px; }

.footer__route-index {
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .6875rem;
  letter-spacing: .08em;
}

.footer__socials {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-content: start;
  border-top: 1px solid var(--color-hairline);
}

.footer__social {
  display: grid;
  grid-template-columns: 2rem 1fr;
  align-items: center;
  min-height: 3.5rem;
  border-bottom: 1px solid var(--color-hairline);
  color: var(--color-ash);
  font-family: var(--font-mono);
  font-size: .6875rem;
  letter-spacing: .05em;
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard);
}

.footer__social:nth-child(odd) { padding-right: 1rem; }
.footer__social:nth-child(even) { padding-left: 1rem; border-left: 1px solid var(--color-hairline); }

.footer__social img {
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  object-fit: contain;
  opacity: .62;
  filter: grayscale(1);
  transition: opacity var(--duration-fast) var(--ease-standard), filter var(--duration-fast) var(--ease-standard);
}

.footer__social:hover,
.footer__social:focus-visible { background: rgb(255 255 255 / 2%); color: var(--color-paper); }
.footer__social:hover img,
.footer__social:focus-visible img { opacity: 1; filter: grayscale(0); }
.footer__social:focus-visible { outline: 2px solid var(--color-paper); outline-offset: -2px; }

.footer__brand {
  display: grid;
  place-items: center;
  min-height: clamp(9rem, 18vw, 15rem);
  border-top: 1px solid var(--color-hairline);
  border-bottom: 1px solid var(--color-hairline);
}

.footer__brand-art {
  display: block;
  width: min(52vw, 40rem);
  height: auto;
  object-fit: contain;
}

.footer__mobile-wordmark { display: none; }

.footer__legal {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 2rem;
  padding-top: 1.5rem;
}

.footer__maker {
  display: inline-flex;
  align-items: center;
  gap: .9rem;
  max-width: min(100%, 22rem);
  color: var(--color-ash);
  font-family: var(--font-mono);
  font-size: .75rem;
  letter-spacing: .04em;
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard);
}

.footer__maker:hover,
.footer__maker:focus-visible { color: var(--color-paper); }
.footer__maker:focus-visible { outline: 2px solid var(--color-paper); outline-offset: .25rem; }

.footer__maker img {
  display: block;
  width: 4.5rem;
  height: 4.5rem;
  object-fit: contain;
  background: transparent;
  flex: 0 0 auto;
}

.footer__legal-copy {
  display: grid;
  justify-items: end;
  gap: .5rem;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .6875rem;
  letter-spacing: .04em;
}

.footer__legal-copy a { color: inherit; text-underline-offset: .25rem; }
.footer__legal-copy a:hover,
.footer__legal-copy a:focus-visible { color: var(--color-paper); }

@media (width < 768px) {
  .footer { padding-inline: var(--page-margin); }
  .footer__heading { align-items: start; flex-direction: column; gap: .5rem; }
  .footer__body { grid-template-columns: 1fr; gap: 2.75rem; padding-block: 2.5rem 3.25rem; }
  .footer__route {
    grid-template-columns: 2.25rem 1fr;
    min-height: 2.5rem;
    font-size: .875rem;
    letter-spacing: -.01em;
  }
  .footer__route::after { width: 1rem; }
  .footer__route:hover::after,
  .footer__route:focus-visible::after { width: 1.75rem; }
  .footer__route-index { font-size: .5625rem; }
  .footer__socials { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .footer__social { min-height: 3.15rem; font-size: .625rem; }
  .footer__social:nth-child(odd) { padding-right: .75rem; }
  .footer__social:nth-child(even) { padding-left: .75rem; border-left: 1px solid var(--color-hairline); }
  .footer__brand { min-height: 10rem; }
  .footer__brand-art { display: none; }
  .footer__mobile-wordmark { display: block; width: min(100%, 17rem); height: auto; object-fit: contain; }
  .footer__legal { align-items: center; }
}

@media (prefers-reduced-motion: reduce) {
  .footer__route,
  .footer__route::after,
  .footer__social,
  .footer__social img,
  .footer__maker { transition: none; }
}
</style>
