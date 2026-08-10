# Accurate Black — Build report Sprint 02

Date: 9 August 2026  
Branch/worktree: `homepage/sprint-01` in the isolated Codex worktree  
Status: implemented locally; no commit, push, merge or deployment performed

## Delivered scope

Sprint 02 establishes a public homepage content boundary and adds the Label Thesis and Selected Catalogue acts. The homepage now renders its release data from a typed, cached server endpoint instead of loading Firebase in the public client. Legacy homepage sections and initial SoundCloud/YouTube embeds are no longer rendered.

The refinement pass following live user review also delivers:

- the original loader timing, full-screen presentation and letter-by-letter logo animation;
- the original animated navbar wordmark and compression gesture, with only the low-hanging `black` submark vertically corrected;
- the canonical Accurate Black image asset retained in the footer;
- an exact centered hamburger-to-X transition;
- an editorial footer preserving every existing route, social destination, legal link and maker credit;
- a code-native dotted infinity/torus field behind the Thesis/Catalogue passage;
- subtle pointer response, catalogue intent/focus behavior and footer micro-interactions;
- static final rendering for reduced motion and animation pausing when offscreen or when the page is hidden.

All hero, catalogue and footer images remain fully visible. No `object-fit: cover`, `clip-path`, aperture crop or image mask was introduced.

## Public content boundary

- `GET /api/homepage` exposes only a minimal `featuredRelease` plus at most six valid catalogue records.
- Firestore records are mapped defensively and sorted deterministically by catalogue suffix.
- Invalid/incomplete records are rejected and optional fields are never fabricated.
- Cold upstream failure returns a stable empty public payload; cached data can be served stale through the route cache policy.
- Firebase/Auth initialization was removed from global client plugins and moved to the routes that need it.
- Login/admin and legacy data routes retain route-local compatibility.

## Motion/performance design

The dot field is procedural Canvas rather than a downloaded video or third-party asset. It draws 280 infinity points plus a 12 × 22 torus field, runs at a capped 30 fps, caps backing-store density, ignores touch pointer tracking, and stops outside the observer range or while the document is hidden. `prefers-reduced-motion: reduce` renders one calm static composition.

The animation is decorative and does not alter the reading order or hide information. Catalogue selection remains available by keyboard focus and the active preview only changes after its replacement image has decoded.

## Bundle and initial-load checks

Production output was inspected from `.vercel/output/static/index.html`.

- Initial homepage JavaScript: 276,005 bytes raw / 104,374 bytes gzip across six scripts.
- Largest client chunk: 239,136 bytes raw / 89,202 bytes gzip.
- Initial homepage scripts contain no Firebase, Firestore or Auth SDK identifiers.
- Initial prerendered HTML contains zero iframes.
- Initial HTML/scripts contain no SoundCloud player or YouTube embed URL.
- The new dot field adds no runtime dependency or external request.

For reference, the earlier Sprint 01 build's largest client chunk was approximately 710 kB raw / 231 kB gzip. The public-boundary work therefore preserves the material bundle reduction while adding the new homepage acts and refinement motion.

## Verification

Passed:

- `pnpm test` — 6/6 tests
- `pnpm lint` — scoped Sprint 02 lint, zero errors
- `pnpm typecheck` — passed
- `pnpm build` — production build completed
- live smoke/visual checks on `localhost:3000`
- fresh-load loader and navbar logo check
- menu open/close and symmetric X check
- complete hero/catalogue artwork check
- Thesis/Catalogue dot-field rendering check
- footer routes, socials, brand art and legal destinations check

The full legacy repository lint remains at 10 errors and 198 warnings. None are in the new/refined Sprint 02 files; they are concentrated in untouched legacy components/routes and the existing SoundCloud API. Scoped lint is green.

Production build warnings remain for the pre-existing unresolved `/img/demo-submit3.webp`, stale Browserslist data, the local Nuxt Image `sharp` binary warning and Node's prerender `localStorage` experimental warning. They do not fail the build.

## Files central to this sprint

- `server/api/homepage.get.ts`
- `server/repositories/homepageRepository.ts`
- `server/utils/featuredRelease.ts`
- `server/utils/homepageContent.ts`
- `types/homepage.ts`
- `types/release.ts`
- `pages/index.vue`
- `components/Header.vue`
- `components/PreLoader.vue`
- `components/Footer.vue`
- `components/home/LabelThesis.vue`
- `components/home/SelectedCatalogue.vue`
- `components/home/DotLoop.vue`
- `components/catalogue/CatalogueRow.vue`
- `components/catalogue/CataloguePreview.vue`

## Deferred

Artist Roster, Transmission, Closing Signal, slug-page redesigns, legacy lint cleanup and deployment remain outside this sprint. The original repository at `/Users/christoph/Desktop/FB-ACB` was not modified.
