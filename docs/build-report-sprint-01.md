# Accurate Black — Build Report Sprint 01

**Experience:** BLACK APERTURE  
**Scope:** homepage hero, global header/navigation, logo and 10X scramble  
**Branch/worktree:** `homepage/sprint-01` in an isolated worktree  
**Status:** implemented and verified; not committed, pushed, merged or deployed

## 1. Result

Sprint 01 replaces the former autoplay carousel/video hero with one editorial, SSR-rendered featured release. The current Firestore source resolves to **ACB047 — MUNE (NL), THINK ABOUT NOTHING**. The result follows the approved aperture, grid, typography, signal, catalog and motion system on desktop, tablet and mobile.

The existing route order and destinations are preserved in a rebuilt full-screen navigation. The header now has scroll intent, keyboard-safe menu control, focus containment, body scroll locking, inert background content and reduced-motion handling. The preloader is removed.

No year is shown because the live release document has no verified year. No signal color is stored either, so the approved fallback `#9AA49D` is used. No content was fabricated.

## 2. Sources of truth used

- `docs/accurate-black-codebase-audit.md`
- `docs/homepage-design-masterplan.md`
- `docs/homepage-cinematic-storyboard.md`

The implementation treats these documents as fixed design and motion specifications. No additional hero movement, carousel behavior, video, parallax, scale effect, canvas or WebGL layer was introduced.

## 3. New architecture and components

### Global shell

- `components/Header.vue` — header state, menu orchestration, focus return and session logo intro.
- `components/Navigation.vue` — preserved eight-route IA, active state, 10X decode and responsive overlay.
- `components/Logo.vue` — retained letter resolve/compression narrative, GPU-safe transforms and static expanded footer state.
- `composables/useHeaderVisibility.ts` — passive, requestAnimationFrame-throttled header scroll intent.

The replaced legacy files `Navbar.vue`, `LogoText.vue` and `PreLoader.vue` were removed after all consumers moved to the new components.

### Hero

- `components/Hero.vue` — typed composition and the 24 px first-scroll aperture fallback.
- `components/hero/Layout.vue` — two-rail/ten-track desktop layout and four-track mobile layout.
- `components/hero/Artwork.vue` — one 74.6 kB priority WebP, fixed dimensions and responsive aperture.
- `components/hero/Metadata.vue`
- `components/hero/Catalog.vue`
- `components/hero/Scramble.vue`
- `components/hero/CTA.vue`
- `components/hero/Background.vue`
- `components/hero/Signal.vue`

### Data boundary

- `types/release.ts` — public featured-release contract.
- `server/api/homepage/hero.get.ts` — cached SSR endpoint with a five-minute SWR window.
- `server/utils/featuredRelease.ts` — defensive Firestore-to-public-model adapter.
- `tests/featuredRelease.test.ts` — three dependency-free Node tests for mapping, optional data and invalid documents.

The former homepage and hero duplicate client queries are gone. Hero semantics, title, artwork alt text and metadata are present in the first HTML response.

## 4. Design system

`assets/style/scss/abstracts/_design-tokens.scss` introduces the approved:

- Void, Carbon, Paper, Ash, Muted, Hairline, status and Signal colors;
- Suisse International/Suisse Mono font targets with safe system fallbacks;
- page margins, rails, gutters, header heights, logo widths and interaction targets;
- direct, fast, utility, reveal, hero, exit and logo-compression timings;
- standard, reveal and exit easing curves;
- shared z-index layers.

Legacy aliases remain temporarily available for unchanged pages. Global SCSS is now imported once instead of being injected into every scoped component.

## 5. Motion and interaction

- overline: starts at 140 ms, 480 ms Resolve;
- Signal seam: starts at 180 ms;
- artwork aperture: 220–840 ms, 620 ms hero easing;
- title Resolve: starts at 300 ms, 480 ms;
- catalog 10X Decode: starts at 560 ms, 320 ms;
- CTA: starts at 700 ms, 240 ms;
- artwork intent: 70 ms, opens in 280 ms;
- first scroll: full artwork after the specified 24 px fallback threshold;
- logo: letter entry from 80 ms, compression from 1040–1380 ms, once per session;
- navigation: 360 ms plane, 120 ms first-route delay, 36 ms stagger capped after item five;
- reduced motion: static compact logo, full artwork, no Decode and near-zero transition/animation durations.

The scramble implementation retains `10X`, is deterministic, preserves whitespace and punctuation, runs at no more than 30 fps, allows only one active decode per element and cleans up timers/listeners on unmount.

## 6. Accessibility and semantics

- Exactly one homepage `h1`: the current release title.
- Existing lower homepage headings were corrected to `h2` without redesigning those sections.
- Semantic `header`, `nav`, `main`, `section`, `figure`, `dl` and footer landmarks.
- Skip link to `#main-content`.
- Native menu button with 48/44 px targets and explicit expanded/control state.
- Menu focus moves to `HOME` after opening, traps Tab navigation, closes with Escape and restores focus.
- Main content becomes `inert` and body scrolling is locked while navigation is open.
- Visible `:focus-visible` treatment and route-current state.
- Artwork has fixed dimensions and descriptive alt/figcaption text.
- Browser smoke test: no console errors, warnings or hydration mismatches.

The minified-output Lighthouse audit scored **97 accessibility**. Two remaining findings originate in untouched legacy content below the hero (contrast and a visible-label/accessibility-name mismatch) and are not introduced by Sprint 01.

## 7. Responsive verification

| Viewport | Verified result |
|---|---|
| 1920 × 1080 | two-line title, 600 px artwork, zero horizontal overflow |
| 1440 × 900 | 522 px artwork at x=773/y=209, two-line title, zero horizontal overflow |
| 1024 × 768 | 399 px artwork, complete CTA and metadata, zero horizontal overflow |
| 390 × 844 | 350 px artwork at x=20/y=300, metadata immediately above, CTA 24 px below, zero horizontal overflow |

Additional interaction verification:

- downward travel to 340 px produces `site-header--scrolled site-header--hidden`;
- 40 px upward travel removes the hidden state;
- mobile menu opens with `HOME` focused;
- Escape returns focus to `Open menu`;
- open navigation sets `main[inert]` and `body { overflow: hidden; }`.

## 8. Screenshots

Captured deliverables:

- `sprint-01-hero-1920.png`
- `sprint-01-hero-1440.png`
- `sprint-01-hero-tablet-1024.png`
- `sprint-01-hero-mobile-390.png`
- `sprint-01-navigation-mobile-390.png`

## 9. Quality gates

All final Sprint-01 gates pass:

```text
pnpm test       3 passed, 0 failed
pnpm lint       passed with 0 warnings/errors in Sprint-01 scope
pnpm typecheck  passed
pnpm build      completed successfully
browser smoke   0 warnings, 0 errors, 0 hydration mismatches
```

The lint command is deliberately scoped to files introduced or materially changed in Sprint 01. A first full-repository lint exposed 14 errors and 234 warnings in legacy pages outside this sprint; they are not hidden or claimed as resolved.

## 10. Performance

### Measured improvements

| Metric | Baseline | Sprint 01 | Change |
|---|---:|---:|---:|
| Global entry CSS | 100.75 kB | 17.21 kB | −82.9% |
| Global entry CSS gzip | not recorded | 3.73 kB | — |
| Largest client chunk | 750.80 kB | 710.31 kB | −5.4% |
| Largest client chunk gzip | 245.77 kB | 231.25 kB | −5.9% |
| Hero LCP artwork transfer | four eager images + video | one 74.6 kB WebP | major reduction |
| Hero CLS in browser/Lighthouse | — | 0 | target met |

The hero has no video, canvas, autoplay loop, client dominant-color extraction, progress timer, carousel watcher or duplicate release query. Scroll handling is passive and frame-throttled; animated properties are limited to transform, opacity and clip-path.

### Production Lighthouse baseline

The minified Vercel static output was measured through a local static server. That adapter does not apply production Brotli/Gzip and cannot execute the Vercel IPX fallback; legacy footer icons therefore return 404 in this local audit. Transfer timings and Best Practices are conservative. The audit is reproducible and useful as a Sprint baseline, but a deployed Vercel preview is required for the authoritative release score:

| Category/metric | Result |
|---|---:|
| Performance | 62 |
| Accessibility | 97 |
| Best Practices | 73 |
| SEO | 100 |
| FCP | 5.4 s |
| LCP | 8.3 s |
| CLS | 0 |
| TBT | 10 ms |
| Total transfer | 2,777 KiB |

The requested **>95 performance** and **<2 s LCP** targets are therefore **not yet honestly claimable for the full legacy homepage**. The zero CLS and 10 ms TBT show that the new hero is stable and non-blocking; the remaining load cost is dominated by global client code, third-party media, cache policy and unchanged below-fold content. Best Practices 73 additionally includes the local adapter's missing IPX fallback and is not a deploy-preview score.

The remaining 231.25 kB gzip global chunk still contains the legacy globally loaded Firebase client, auth and other page-wide dependencies. Those dependencies and below-fold third-party embeds are outside the explicitly limited Hero + Navigation implementation scope and require a dedicated performance/content-boundary sprint.

## 11. Known limitations

1. The licensed Suisse International/Suisse Mono WOFF2 files are not present in the repository or system. The token system targets them and uses Helvetica Neue/SFMono fallbacks. Supplying licensed font files remains a design gate.
2. ACB047 has no verified year and no stored signal color. Year is omitted; the approved Signal fallback is used.
3. Production Lighthouse is 62/97/73/100 with 8.3 s LCP. The >95 performance target is blocked by legacy global Firebase/auth loading, cache policy and below-fold third-party media.
4. Existing build warnings remain for the missing `/img/demo-submit3.webp`, stale Browserslist data, the local Node `localStorage` warning and missing local Sharp binary. None originates in the new hero.
5. Full-repository lint debt remains outside Sprint 01.
6. No production deployment, analytics mutation, content write or infrastructure change was performed.

## 12. Awwwards-style jury review

**Visual design — 8.8/10.** The single-artwork aperture, large editorial typography and controlled empty space now establish an immediate authored identity. The 1440 and mobile compositions are particularly disciplined.

**UX — 8.5/10.** One release, one action and a predictable navigation model remove the former carousel ambiguity. Header intent and keyboard behavior feel considered rather than decorative.

**Motion — 8.9/10.** The motion vocabulary is coherent and ends quickly. Aperture, Resolve and 10X Decode support hierarchy without becoming a showreel.

**Accessibility — 8.4/10.** The new experience has strong semantics, focus handling and reduced-motion behavior. The overall homepage score is held back by legacy contrast/name issues below the fold.

**Performance — 6.6/10.** The hero itself is lean and the CSS reduction is substantial, but a jury will still experience the cost of global Firebase and third-party embeds on the complete page.

**Overall — 8.3/10.** Sprint 01 is visually award-caliber at the threshold and technically credible in its own scope. It is not yet submission-ready as a full site until the global client boundary, licensed typography and below-fold media strategy are resolved.

## 13. Recommended Sprint 02 sequence

1. Move remaining public Firestore reads behind typed server repositories and stop loading Firebase/auth on public initial routes.
2. Introduce consent-aware, click-to-load facades for SoundCloud and YouTube so below-fold embeds do not participate in initial page load.
3. Supply and self-host licensed Suisse WOFF2 subsets with preload only for the critical face.
4. Continue the approved BLACK APERTURE storyboard into the next homepage moment without changing the completed hero contract.
5. Add production Lighthouse CI with fixed budgets after the legacy global dependencies are isolated.

Sprint 01 stops here as requested.
