# Accurate Black — Cursor handoff

## Project shape

- Nuxt 3 / Vue 3 / TypeScript application, built with `pnpm`.
- Global design tokens and base styles live under `assets/style/`.
- Route-level composition lives in `pages/`; reusable UI lives in `components/`.
- Public data is fetched through typed Nitro endpoints under `server/api/`.
- Repositories access Firestore or external providers; UI never accesses raw documents.
- Mapping, validation and URL trust rules live under `server/utils/`.
- Public DTOs live in `types/` and are the contract between server and UI.
- `composables/useOnceInView.ts` owns one-shot reveal geometry.
- `plugins/scramble.ts` owns accessible text-scramble behavior.
- `app/router.options.ts` owns route scroll behavior.
- `plugins/scroll-restoration.client.ts` disables saved browser scroll restoration.

## Homepage composition

`pages/index.vue` renders these sections in order:

1. `components/Hero.vue`
   - Composes the primitives in `components/hero/`.
   - Featured release artwork remains `object-fit: contain`.
   - Motion is scroll-driven; there is no pointer parallax.
2. `components/home/PortalBanner.vue`
   - Five-column Explore destination index.
3. `components/home/LabelThesis.vue`
   - Deep / Dark / Authentic / Profound statement.
   - Uses `SignalInterferenceField.vue` behind the typography.
4. Releases section
   - `components/releases/ReleaseIndexHeader.vue`.
   - `components/releases/ReleaseWall.vue` and `ReleaseWallTile.vue`.
5. `components/home/TransmissionArchive.vue`
   - Uses `TransmissionCard.vue` for YouTube items.

The homepage fetches `/api/releases` and `/api/videos` with typed defaults.
Pending, error and empty states are deliberately rendered in `pages/index.vue`.

## Public API and content boundaries

- `GET /api/releases` returns `{ releases: ReleaseSummary[] }`.
- `GET /api/releases/:acb` returns one safe detail DTO plus related releases.
- `GET /api/videos` returns `{ videos: VideoSummary[] }`.
- `GET /api/homepage` returns a featured release and six-item selection.
- Public endpoints use Nitro caching with stale-while-revalidate.
- Firestore access is isolated in `server/repositories/releaseRepository.ts`.
- Never pass raw Firestore records, iframe HTML or provider payloads to components.
- `server/utils/releaseContent.ts` validates required fields and normalises ACB values.
- Only `http:` and `https:` URLs survive general URL validation.
- Embedded players are restricted to supported Spotify and SoundCloud shapes.
- Trailer links are restricted to trusted media hosts.
- Invalid catalogue records are dropped instead of receiving fabricated content.
- Release detail parameters are normalised and rejected unless they match an ACB shape.
- Spotify track enrichment must fail closed and retain readable source track titles.
- Keep DTO changes synchronized across `types/`, mapper tests and consuming components.

## Broadcast archives and freshness

- `/techtonic` and `/accurate-sessions` share `components/broadcast/`.
- Both pages consume `BroadcastEpisode` DTOs from `types/broadcast.ts`.
- The DTO exposes only `id`, `title`, `publishedAt`, `sourceUrl` and `embedUrl`.
- `/api/broadcast/techtonic` reads the current SoundCloud RSS feed server-side.
- `/api/broadcast/sessions` reads at most 15 Firestore sessions, newest first.
- `server/utils/broadcastContent.ts` accepts plain SoundCloud URLs or stored iframe HTML.
- Legacy Accurate Sessions iframes often nest `https://api.soundcloud.com/tracks/<id>`; that shape is accepted and rewritten to a trusted player URL plus a human `soundcloud.com/tracks/<id>` source link.
- It emits only canonical `https://w.soundcloud.com/player/` URLs with a trusted nested target.
- Shared components bind the safe URL directly to `<iframe :src>`; never add `v-html`.
- Public session reads are strictly read-only and must never delete old documents.
- Both endpoints cache for 300 seconds with SWR; newly published items appear within minutes.
- Both page routes have `prerender: false` and are filtered from Nitro prerender routes.
- Keep them dynamic on Vercel; never add either route to an immutable/static page cache.

## Protected files

Do not change these without explicit approval:

- `components/LogoText.vue`
- `components/PreLoader.vue`
- `components/Header.vue`
- `components/Navigation.vue`
- `components/Footer.vue`
- `layouts/default.vue`

Do not alter LogoText markup, scaling, alignment, colors or internal animation.
Do not crop artwork or video imagery; preserve all `object-fit: contain` behavior.

## Motion contract

- Normal reveal trigger: section content crosses 76% of the viewport height.
- Geometry is controlled by `useOnceInView` with bottom root margin `-24%`.
- SSR output stays visible; hidden pre-reveal states apply only after `isReady`.
- Reduced motion is immediately visible and static.
- Explore rail: 900 ms; destination shutters: 960 ms with 100 ms gaps.
- Thesis field: 1000 ms; words: 900–980 ms with 100 ms gaps.
- Thesis statement: 940 ms after 360 ms; hairline: 1000 ms after 260 ms.
- Release masthead: 900–920 ms; range delay: 120 ms.
- Release tiles: 850–900 ms with 85 ms gaps, capped at 12 reveal orders.
- Transmission masthead: 900–920 ms; range delay: 240 ms.
- Transmission shutters: 900 ms with 100 ms gaps, capped at 9 reveal orders.
- Loader holds until 1400 ms, then retracts as a 1000 ms split shutter.
- The loader signal line is decorative; the plane itself never uses an opacity fade.
- Loader DOM is removed after exit and is non-interactive during the handoff.
- Reduced motion removes the loader at 1400 ms without the extended exit.
- Deep/Dark field contains five continuous phase lines and one vertical scan line.
- It contains no fragments, dash particles, ticks, or pointer response.
- The canvas pauses outside its viewport, caps DPR at 1.5 and renders static in reduced motion.

## Scroll contract

- Normal page loads, refreshes, route changes and history navigation start at `0,0`.
- Browser `history.scrollRestoration` is set to `manual` on the client.
- Vue Router ignores `savedPosition` and returns `{ left: 0, top: 0 }`.
- Intentional hashes remain authoritative: `/#releases` lands on `#releases`.
- Do not add component-level scroll resets; keep this behavior centralized.

## Commands

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

An existing dev server normally runs at `http://127.0.0.1:3000`.
Do not start a second server when one is already active.

## Next safe work

1. Add or refine content through typed DTOs and server-side mappers.
2. Build new page sections as isolated components using existing design tokens.
3. Reuse `useOnceInView` instead of creating competing observers or timeouts.
4. Preserve the motion caps and reduced-motion branch when adding reveal items.
5. Test desktop, tablet, 390 px and 320 px widths for horizontal overflow.
6. Test fresh load, hard refresh, route navigation and `/#releases` scroll behavior.
7. Run lint, typecheck, tests and build before handoff.
8. Treat existing unrelated worktree changes as user-owned and do not reset them.
