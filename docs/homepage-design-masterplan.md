# Accurate Black — Homepage Design Masterplan

**Phase 2 — Design, UX, motion and frontend architecture**  
**Creative direction:** BLACK APERTURE  
**Status:** approved direction translated into an implementation-ready specification  
**Date:** 6 August 2026  
**Scope:** documentation only; no application code, refactor, commit or pull request

---

## 0. Document authority

This document is the single design source of truth for the new Accurate Black homepage. It converts the approved BLACK APERTURE direction into measurable layout, behaviour, content, motion, responsive, accessibility and performance decisions.

Where this masterplan conflicts with an informal mock-up or an implementation convenience, this masterplan wins until the Creative Director explicitly approves a revision.

### Fixed decisions

The following are not open design questions:

1. The hero concept is **BLACK APERTURE**.
2. The existing navigation structure remains: fixed header, animated wordmark, hamburger control and full-screen menu.
3. The existing menu routes and order remain:
   1. Home
   2. ( New ) Releases
   3. Artists
   4. Accurate Sessions
   5. Techtonic
   6. Demo Submission
   7. About Us
   8. Admin
4. The logo animation remains recognisable as the current letter-by-letter reveal followed by the compression from **ACCURATE BLACK** to **ACC BLACK**.
5. The character set `1`, `0`, `X` remains the visual basis of the scrambling language.
6. Artwork, names, releases and existing label content remain the source material. The current homepage composition does not.
7. There is no autoplay audio, stock hero video, carousel, scrolljacking or effect without information value.

### Audit constraints that shape the design

The design must not reproduce the audited problems:

- no fixed 1.4-second preloader;
- no client-only empty homepage followed by multiple duplicate Firestore queries;
- no four eager hero images;
- no raw provider HTML or third-party iframe before consent;
- no hidden or hover-only essential content;
- no multiple `h1` elements or nested `main` landmarks;
- no animation without a reduced-motion state;
- no custom interaction implemented with anonymous clickable `div` elements;
- no mobile type below a readable minimum;
- no generic stock footage or twelve-video media wall;
- no incorrect canonical, soft 404 or missing social image inherited into the redesign.

### Critical self-evaluation

**Question:** is this merely a visual redesign brief?  
**Verdict:** no. The non-negotiables, audit boundaries and measurable acceptance rules make this a product specification. A visually attractive outcome that reintroduces the audited technical or accessibility failures does not satisfy the brief.

---

## 1. Experience thesis

### One-sentence concept

Accurate Black becomes a controlled black editorial space in which one release, one artist and one transmission are revealed at a time, with black acting as the frame rather than a passive background.

### Intended visitor response

The desired response is not “this is a nice music website.” It is:

> This label selects with conviction, and everything here is treated as a cultural object.

### The homepage narrative

The page moves through six deliberate acts:

| Act | Section | Visitor understanding | Rhythm |
|---:|---|---|---|
| 01 | Black Aperture | This is the release that matters now. | Suspended, cinematic |
| 02 | Label Thesis | This is the belief behind the selection. | Spacious, silent |
| 03 | Selected Catalogue | The belief is proven by a coherent body of work. | Dense, exact |
| 04 | Artist Roster | The catalogue contains distinct human voices. | Intimate, visual |
| 05 | Transmission | The label is active, broadcasting and current. | Temporal, functional |
| 06 | Closing Signal + Footer | The visitor can continue the relationship. | Quiet, conclusive |

### What makes it memorable

The memorable device is not a one-off animation. It is the repeated relationship between:

- a black frame that withholds;
- an aperture that reveals;
- a catalogue coordinate that identifies;
- a controlled `10X` decode that confirms an interaction.

Those four behaviours recur in the hero, menu, catalogue, artist sequence, media consent and page transitions. They form a recognisable system instead of a collection of effects.

### Content hierarchy

The order of importance is fixed:

1. current featured release;
2. label position;
3. selected catalogue;
4. selected artists;
5. latest verified session/show;
6. routes, contact and legal information.

There is one primary action in the initial viewport: **Open release**. The homepage does not display a row of streaming-provider icons before the visitor understands what the release is.

### Critical self-evaluation

**Risk:** a dark, minimal, oversized editorial site can easily become a fashionable template.  
**Correction:** every major visual gesture is attached to Accurate Black data: catalogue numbers determine coordinates, actual artwork determines the signal colour, actual release order determines the index and real programming determines Transmission. Remove the data and the system loses its form; that makes it ownable.

---

## 2. Information architecture and preserved navigation

## 2.1 Header structure

The existing structure remains:

- animated Accurate Black logo on the left;
- hamburger/menu control on the right;
- fixed header over the page;
- full-screen menu overlay;
- routes in the current order;
- decorative large menu wordmark retained as a secondary brand layer;
- Admin remains the final, visually secondary route to `/login` and remains protected by auth outside this design scope.

There is no desktop inline navigation. Changing to a conventional horizontal link row would violate the fixed navigation identity.

### Header dimensions

| Viewport | Height | Inline padding | Logo visual width | Menu control target |
|---|---:|---:|---:|---:|
| ≥ 1280 px | 72 px | 48–64 px, matching frame | 188 px expanded / 112 px compact | 48 × 48 px |
| 768–1279 px | 68 px | 32 px | 174 px / 108 px | 48 × 48 px |
| < 768 px | 64 px | 20 px | 148 px / 98 px | 48 × 48 px |
| < 390 px | 60 px | 16 px | 136 px / 92 px | 44 × 44 px |

The visible hamburger lines are 28 × 1 px on desktop and 24 × 1 px on mobile, placed inside the full target. The three-line form becomes a two-line close mark without shrinking the target.

### Header scroll behaviour

The header follows four states:

1. **Top:** transparent Void canvas; no blur and no border.
2. **Scrolled 24 px:** `rgba(8,8,8,.94)` plus a 1 px Hairline at 55% opacity.
3. **Downward intent after 160 px:** header moves out by its own height after at least 48 px cumulative downward movement.
4. **Upward intent:** header returns after 20 px cumulative upward movement. Keyboard focus or menu state always forces it visible.

The state change uses transform only, 240 ms, and never changes document layout. The header is always visible at the top and when the visitor tabs into it. Reduced motion makes visibility changes immediate.

## 2.2 Full-screen menu

### Desktop geometry

- Fixed to the viewport using `100dvh`, with `100vh` fallback.
- Void background at 100% opacity; no blur.
- Header remains the top control band.
- Content begins at 128 px and ends at a minimum 48 px bottom inset.
- Menu list occupies editorial tracks 1–8.
- The large existing Accurate Black menu artwork occupies tracks 6–10 behind the list at no more than 14% opacity.
- Every route is one horizontal row, 64 px minimum height at 1440 × 900.
- A 1 px Hairline separates rows; the first row also has a top Hairline.
- A two-digit index sits in the metadata rail: `01` through `08`.
- The route label begins on track 2. Active page status appears at the right edge as `CURRENT` in meta type.

### Mobile geometry

- Content begins 88 px from the top.
- Rows are at least 52 px high and may grow for Accurate Sessions or Demo Submission.
- Route labels use 28–34 px fluid type with 0.98 line-height.
- Index remains visible at 11 px; the decorative menu artwork becomes a low-opacity crop in the lower third and never impairs contrast.
- If the list exceeds available height at 200% zoom, the menu itself scrolls natively. The close control stays in the fixed header.

### Open/close sequence

**Open, total 420 ms:**

1. At 0 ms, the trigger changes `aria-expanded` and the page behind becomes inert.
2. From 0–360 ms, a black plane reveals from the menu-side edge using `cubic-bezier(.22,1,.36,1)`.
3. At 120 ms, the first five visible route rows move from 12 px below and 0 opacity to rest, staggered by 36 ms.
4. At 180 ms, the decorative wordmark moves from 98% to 100% scale and 0 to 14% opacity.
5. At 420 ms, focus moves to the first active/available menu link.

**Close, total 280 ms:** rows disappear as one group in 140 ms; the plane closes in 280 ms; focus returns to the menu trigger.

Escape closes. A route selection closes the menu but navigation begins immediately; the close animation may accompany the route transition but cannot delay it more than 280 ms.

### Link behaviour

- Hover or focus moves the label exactly 16 px on desktop and 8 px on mobile.
- The corresponding index performs one 320 ms scramble and resolves to its original value.
- The label itself only scrambles on deliberate focus/hover after a 70 ms intent delay; rapid pointer travel does not fire eight simultaneous effects.
- The active route uses Paper text plus `CURRENT`; other links use Ash and become Paper on interaction.
- Admin is at 55% default opacity but still meets contrast requirements. It must not use `cursor: not-allowed` because it is a valid login route.

## 2.3 Navigation semantics

- Header uses a `header` landmark.
- Menu control is a native `button` with visible text alternative, `aria-expanded` and `aria-controls`.
- Overlay uses a labelled `nav`; it is not announced as a modal dialog because it is the primary navigation region, but it receives the same focus containment and inert background behaviour.
- Each current route uses `aria-current="page"`.
- External “website by” content does not occupy a primary route row. It remains in the menu utility/footer area because preserving navigation does not require treating a credit as primary navigation.

### Critical self-evaluation

**Question:** is a full-screen hamburger on desktop unnecessarily hidden navigation?  
**Verdict:** in a generic site, possibly. Here it is a fixed brand asset and therefore retained. The correction is operational: the trigger is large, named and stable; the menu opens in 420 ms rather than performing a long reveal; route labels are immediately readable; and the home hero contains a direct release link so the primary content journey never depends on opening the menu.

---

## 3. Logo animation specification

## 3.1 Preserved narrative

The current logo behaviour tells a specific story:

1. the full **ACCURATE BLACK** identity arrives letter by letter;
2. `URATE` leaves;
3. the BLACK asset shifts left;
4. the persistent compact state reads **ACC BLACK**.

That narrative remains. It is modernised through shorter timing, smaller travel and compositor-safe transforms. It no longer lives inside a fixed-duration blocking preloader.

## 3.2 First-entry sequence

The first-entry logo animation runs in place in the visible header while the page is already interactive.

| Phase | Time | Behaviour |
|---|---:|---|
| Initial state | 0 ms | Full logo footprint is reserved to prevent layout shift. All letter layers have their final geometry. |
| Letter reveal | 80–640 ms | `A C C U R A T E` and BLACK enter left-to-right. Each starts 36 ms after the previous. Individual duration 300 ms. |
| Hold | 640–1040 ms | Full `ACCURATE BLACK` remains still for 400 ms. |
| Compression | 1040–1380 ms | `U R A T E` exit left with 24 ms stagger; BLACK moves into the compact position. |
| Settled | ≥ 1380 ms | Compact `ACC BLACK` remains stable. |

### Exact movement

- Entry translation: −8 px to 0; opacity 0 to 1.
- Exit translation: 0 to −8 px; opacity 1 to 0.
- BLACK translation: from expanded to compact measured logo position; no hard-coded −110 px. The final optical gap between the third C and BLACK is 6 px desktop, 5 px mobile.
- Entry easing: `cubic-bezier(.22,1,.36,1)`.
- Exit easing: `cubic-bezier(.4,0,1,1)`.
- BLACK compression easing: `cubic-bezier(.22,1,.36,1)`.
- No width animation. The logo wrapper reserves the final expanded footprint and moves internal layers with transforms.

## 3.3 Repeat rules

- Run the full sequence once per browser session on the first public page entry.
- On client-side route changes, render the settled compact state immediately.
- Opening the menu does not replay the entrance. The compact logo may expand to the complete static wordmark in 280 ms, then return on close; letters do not re-enter one by one.
- The footer shows the complete static brand asset and does not replay the header animation.
- If JavaScript fails, the compact logo remains visible.

## 3.4 Reduced motion and accessibility

- With `prefers-reduced-motion: reduce`, show the compact logo immediately.
- The accessible name is always “Accurate Black”; visual compression never changes the announced text.
- The BLACK image is part of one labelled home link and is not separately announced.
- The animation cannot delay navigation, focus or LCP content.

### Critical self-evaluation

**Risk:** preserving a logo animation can become nostalgia rather than identity.  
**Correction:** the recognisable full-to-compact narrative is preserved, but its total active time falls to 1.38 seconds, its travel falls to 8 px and it no longer blocks the page. The brand moment remains; the audited preloader cost does not.

---

## 4. Visual design system

## 4.1 Colour tokens

| Token | Value | Use |
|---|---:|---|
| `void` | `#080808` | Primary canvas and menu |
| `carbon` | `#121212` | Player, dialog and form surfaces |
| `paper` | `#F1EFE9` | Primary text |
| `ash` | `#A8A59F` | Secondary text; adjusted from the earlier proposal for safer contrast |
| `muted` | `#74716C` | Nonessential disabled metadata only; never normal body copy |
| `hairline` | `#2B2A27` | Structural rules |
| `error` | `#D87575` | Error text/border, always with icon/text |
| `success` | `#91A78E` | Success status, always with text |
| `signal` | per featured release | Controlled accent |

### Signal algorithm contract

`signal` is determined once when release artwork is ingested or curated. It is not calculated in the browser.

1. Extract up to three dominant candidates from a 64 × 64 colour-managed copy.
2. Reject candidates with perceptual distance below 18 from Void or Paper.
3. Convert the selected candidate to HSL and clamp saturation to 28–58% and lightness to 44–62%.
4. Test final use cases against Void and Paper.
5. If no candidate is valid, use the fixed mineral fallback `#9AA49D`.
6. Store the approved value as release content.

Signal may occupy no more than approximately 3% of a viewport. It is allowed for:

- 1–2 px rules;
- active catalogue marker;
- focus outer ring;
- player progress;
- the hero catalogue coordinate;
- a small loading/status signal.

Signal is forbidden as a body-text colour, full-section background, large gradient or simultaneous multi-release palette.

## 4.2 Typography

### Exact family choice

- **Interface and editorial family:** Suisse International.
- **Metadata family:** Suisse Int’l Mono.
- **Logo:** the existing custom Montserrat/image construction remains independent.

Required webfont files:

- Suisse International Book;
- Suisse International Medium;
- Suisse International Semibold;
- Suisse Int’l Mono Regular.

The implementation team must not silently substitute another font. If the licence or files are unavailable, font procurement is a design gate and requires Creative Director approval. Font loading uses self-hosted WOFF2 subsets; no Google Fonts request.

### Type scale

| Token | Desktop ≥1280 | Tablet 768–1279 | Mobile <768 | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display catalogue | clamp(112, 10vw, 176) | 88–120 | 56–80 | .84 | −.055 em |
| Hero title | clamp(64, 6.5vw, 104) | 56–76 | clamp(42, 12vw, 64) | .92 | −.045 em |
| Section statement | 64–88 | 52–68 | 40–56 | .94 | −.04 em |
| Section heading | 40–52 | 36–44 | 30–38 | 1.02 | −.025 em |
| Body lead | 22 | 21 | 19 | 1.5 | 0 |
| Body | 17 | 17 | 16 | 1.65 | .005 em |
| Navigation row | 44–56 | 38–48 | 28–34 | .98 | −.025 em |
| Action label | 13 | 13 | 13 | 1.2 | .06 em |
| Meta | 12 | 12 | 12 | 1.45 | .08 em |
| Overline | 11 | 11 | 10 | 1.3 | .16 em |

### Typography rules

- Body copy uses sentence case. Uppercase is restricted to navigation, actions, overlines and system metadata.
- A page has one visible `h1`; homepage sections use `h2`, component subsections use `h3` only when needed.
- Long copy has a maximum measure of 66 characters; lead copy 48 characters.
- Catalogue numbers use tabular figures.
- Release and artist names preserve their editorial casing from content.
- Automatic word splitting is disabled for names. Approved manual line-break hints may be stored separately from the semantic title.
- No text stroke. The outlined `PROFOUND` treatment from the current page is not retained because it weakens readability.
- No font size below 12 px, including legal and metadata.

## 4.3 Black Frame Grid

The site does not use a conventional twelve-column content grid. It uses two metadata rails and ten editorial tracks.

```text
Desktop / ultra-wide

| outer | rail L | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09 | 10 | rail R | outer |
```

### Grid constants

| Width | Outer margin | Rails | Tracks | Gutter | Max core |
|---|---:|---:|---:|---:|---:|
| ≥1920 | fluid, min 64 | 32 each | 10 | 32 | 1760 |
| 1280–1919 | clamp(40, 3.33vw, 64) | 32 each | 10 | 24 | 1600 |
| 1024–1279 | 32 | 24 left only | 6 | 24 | fluid |
| 768–1023 | 32 | 20 left only | 6 | 20 | fluid |
| 390–767 | 20 | metadata inline | 4 | 16 | fluid |
| <390 | 16 | metadata inline | 4 | 12 | fluid |

The tracks are equal within each breakpoint. Rails contain real section numbers, catalogue codes, dates or status. Decorative coordinates are prohibited.

### Grid behaviour

- Ultra-wide adds outside silence; it does not add content or enlarge type indefinitely.
- Content that spans ten tracks remains capped at the max core.
- Tablet removes the right rail first.
- Mobile uses a semantic four-track order; visual placement cannot contradict DOM order.
- Grid overlap is allowed by one track for title/artwork tension, never for body copy.

## 4.4 Spacing and vertical rhythm

Allowed spacing values are: **4, 8, 12, 16, 24, 32, 48, 64, 96, 144, 192 px**.

| Purpose | Desktop | Tablet | Mobile |
|---|---:|---:|---:|
| Major section top/bottom | 144–192 | 96–128 | 72–96 |
| Section heading to content | 64 | 48 | 32 |
| Content group | 48 | 40 | 32 |
| Text group | 24–32 | 24 | 20 |
| Compact metadata | 8–16 | 8–16 | 8–12 |

No local component may introduce an arbitrary 18, 30, 50 or 100 px spacing value. Optical logo and artwork alignment are the only documented exceptions.

## 4.5 Borders, elevation and shadows

- Primary structural border: 1 px Hairline.
- Active structural border: 2 px Signal.
- Focus: 2 px Paper inner outline plus 2 px Signal outer offset.
- Border radius: 0 for editorial surfaces and actions; 2 px maximum for native media clipping if the source asset requires antialiasing.
- Box shadows: none.
- Text shadows: none.
- Backdrop blur: none.
- Elevation is created through Void/Carbon luminance, overlap, scale and masking.

## 4.6 Containers and sections

There are three container modes:

1. **Frame:** includes rails and page margins.
2. **Editorial field:** ten/six/four content tracks.
3. **Measure:** maximum readable text width.

Sections never receive a card-like outer box. A section changes rhythm through whitespace, density and artwork scale.

## 4.7 Actions and links

### Primary text action

- Minimum target: 44 px high.
- Label plus a 1 px baseline.
- Baseline rests at 24% width and grows to 100% on hover/focus.
- No filled capsule, rounded corner or scale-up.
- Hover/focus duration: 180 ms.
- Pressed state: Paper opacity 72% for 80 ms.

### Quiet action

- Text plus `→` or contextually correct direction marker.
- Marker travels 4 px on hover/focus, 160 ms.
- Underline remains for links inside body copy.

### Icon action

- Minimum 44 × 44 px.
- Visible tooltip on hover/focus when the icon has no adjacent text.
- Accessible name required.

## 4.8 Editorial plates instead of cards

- Release plate: catalogue number, artist, title, year and artwork relation.
- Artist plate: name, portrait and one factual editorial line.
- Session plate: date, title, host, duration/status.
- No rounded container, shadow, genre-chip cloud or permanently hidden CTA.
- The content remains understandable without its image and without hover.

## 4.9 Forms and dialogs

Even though the homepage contains no primary form, global elements such as consent and Demo Submission share this system:

- visible labels, never placeholder-only;
- input minimum 52 px, 16 px text on mobile;
- Carbon surface, Hairline border, Paper text;
- inline error plus summary for multi-field failure;
- no shake animation;
- success replaces the form in the same region and persists;
- dialogs use Carbon on Void, no blur, visible title and close button;
- focus containment, Escape and focus restoration are mandatory.

### Critical self-evaluation

**Question:** does a strict dark neutral system become sterile?  
**Verdict:** it would if every section had identical density and monochrome imagery. The controlled Signal colour, unfiltered source artwork, 4:5 artist portraits and alternating section rhythm provide material variety. The interface itself remains quiet so the cultural work carries the emotion.

---

## 5. Interaction DNA

The site follows five physical laws.

### Law 1 — Reveal, do not decorate

Motion may reveal hierarchy, state, source or destination. It may not run merely because an element entered the viewport.

### Law 2 — One active signal

Only one primary motion event occurs in a region at a time. Hovering a catalogue row may switch artwork and scramble its catalogue number; it does not also move the cursor, tilt the row and animate every character.

### Law 3 — Enter slower, leave faster

Entrances establish context. Exits remove obstruction.

- Editorial enter: 420–620 ms.
- Utility enter/change: 160–240 ms.
- Exit: 140–320 ms.

### Law 4 — Content settles permanently

An element reveals once and then becomes still. Re-entering the viewport does not replay its introduction. Hover/focus remains reversible.

### Law 5 — Input equivalence

Hover, keyboard focus and touch receive equivalent information. Pointer-only enrichment is optional and never carries the action label or essential state.

## 5.1 Interaction matrix

| Context | Rest | Hover/focus | Press/active | Reduced motion |
|---|---|---|---|---|
| Header logo | Compact after first entry | Paper remains; no scale | Opacity 72% | Compact static |
| Menu control | Three 1 px lines | Signal marks outer edge | Two-line close state | Instant state |
| Menu route | Ash + index | Paper, +16 px, one scramble | Paper at 72% | Colour/underline only |
| Hero release | Partial aperture | Full aperture, action underline | Navigate | Full artwork static |
| Catalogue row | Paper/Ash hierarchy | Active rule + shared preview | Navigate | Preview may switch without motion |
| Artist portrait | Correct editorial crop | Overlay loses 12% darkness; action shown | Navigate | Static image/action |
| Text action | 24% rule | 100% rule + optional short scramble | 72% label | Rule changes instantly |
| Audio play | Play + duration | Paper emphasis | Pause/progress state | No decorative movement |
| Consent facade | Poster + source | Action line | Load approved provider | Instant replacement |
| Form field | Hairline | Focus outline | Input | Instant outline |
| Dialog | Closed | n/a | Open/close | Instant with focus control |

## 5.2 Scroll behaviour

- Native vertical scrolling only.
- No section snapping, pinning, velocity manipulation or horizontal conversion.
- The header intent logic is the only global scroll listener and must be passive.
- Section reveals use a single Intersection Observer with a 15% lower viewport threshold.
- The hero may use a bounded CSS scroll timeline for the first 12% of viewport travel; it never changes scroll position.
- If CSS scroll timelines are unsupported, the hero uses the completed aperture state after the first 24 px scroll threshold.
- Media never begins because it entered the viewport.

## 5.3 Cursor

The native cursor remains globally. A contextual label cursor is permitted only over the hero artwork on devices matching fine pointer and hover capability:

- label: `OPEN ACB047` using current catalogue number;
- 88 × 32 px maximum footprint;
- no magnetic lag; it follows with direct transform at the next animation frame;
- hides when stationary for 800 ms and returns on movement;
- is `aria-hidden` and never replaces the visible text action;
- disabled for reduced motion, coarse pointer, zoom above 150% and forced colours.

No other custom cursor is allowed.

## 5.4 Loading and failure

- Server-rendered text and the hero image URL are the default; no blank shell.
- A navigation taking under 300 ms shows no loader.
- From 300–1200 ms, show a 2 px Signal progress line at the top; do not obscure content.
- Above 1200 ms, add stable `Loading…` status text. Visual scramble may run once on a separate decorative layer, while the accessible text remains stable.
- Never run the full logo animation as a loading gate.
- On failure, retain navigation and already available content; show an inline recovery action.

## 5.5 Overlay and modal behaviour

- Open from the originating grid edge, never scale from an arbitrary centre.
- Background becomes inert; body scroll locks only while overlay is open.
- Close is always visible in the header/control corner.
- Escape closes unless a destructive confirmation is in progress.
- Focus returns to the exact trigger.
- Mobile browser back closes the overlay before leaving the page where platform conventions allow.

## 5.6 Image behaviour

- Reserve intrinsic ratio before load.
- Fade/crop reveal lasts 280–480 ms only for the first appearance.
- No universal blur-up; use a flat dominant-colour placeholder so artwork is not temporarily distorted.
- Source artwork remains in colour. No generic grayscale filter.
- Artist crops use stored focal points.

## 5.7 Video behaviour

- No video in the homepage hero.
- Homepage video is omitted entirely in Phase 2. Transmission is audio-first.
- Future editorial video uses a poster, title, duration and explicit play.
- No autoplay, background loop or provider iframe before consent.
- Captions and transcript are supplied when speech is meaningful.

## 5.8 Audio behaviour

- Never autoplay.
- Before consent: title, date, duration/source and a local poster/facade.
- After play/consent: one player loads in the same geometry.
- Required controls: play/pause, elapsed/total time, seek, mute/volume where supported and external fallback.
- Progress updates linearly without eased lag.
- Audio continues only for the current page. A site-wide persistent player is not part of this phase.

### Critical self-evaluation

**Risk:** defining interaction laws can still produce an over-animated site when every component applies them.  
**Correction:** only the hero, menu, active catalogue preview, three artist reveals and player transition receive editorial motion. All ordinary text, footer links and metadata remain static until direct interaction. The number of high-attention motion events on one complete homepage visit is therefore deliberately low.

---

## 6. Scrambling language — `10X Decode`

Scrambling represents data resolving from system state into human-readable label content. It is not a texture.

## 6.1 Character set and visual model

- Allowed replacement characters: `1`, `0`, `X`.
- Spaces, punctuation and line breaks never scramble.
- Original string length and element width are preserved.
- Each character resolves from left to right with a short overlapping window.
- The sequence is deterministic from string + character index; it does not use uncontrolled random changes that flicker differently on every frame.
- Update cadence is at most 30 frames per second.

## 6.2 Modes

| Mode | Duration | Purpose | Example |
|---|---:|---|---|
| Confirm | 220 ms | A direct control acknowledges intent | `OPEN RELEASE` on press/focus |
| Decode | 320 ms | A known route or identity becomes active | Menu label, artist name |
| Resolve | 420 ms | New route/context data becomes available | `ACB047`, page overline |

No scramble lasts longer than 420 ms. The old 20 ms interval running independently per element is not the interaction model.

## 6.3 Allowed placements

- menu label or index after hover/focus intent;
- hero catalogue number once after the aperture reaches 60% of its reveal;
- primary hero action on direct hover/focus, maximum once per pointer entry;
- active catalogue number when a different row becomes previewed;
- artist name only on direct focus/hover;
- route overline once when a client navigation resolves;
- loading visual label only after 300 ms;
- page transition coordinate.

## 6.4 Forbidden placements

- body copy, descriptions, legal text or form values;
- the complete hero title on every page load;
- audio time/progress;
- errors, consent choices or destructive confirmations;
- every item simultaneously on section entry;
- repeated loop, idle animation or scroll-driven scramble;
- content hidden until scrambling finishes.

## 6.5 Input, cancellation and accessibility

- Hover intent delay: 70 ms.
- Keyboard focus: start immediately.
- Pointer leave before the delay cancels without animation.
- Re-enter during an active scramble resolves the current run before a new one may start.
- Only one scramble runs inside a component region at once.
- Semantic DOM text remains the original string. The changing visual layer is hidden from assistive technology.
- Text selection/copy returns the original string.
- Reduced motion and forced colours disable all replacement characters; a simple underline/weight state remains.

### Critical self-evaluation

**Question:** is scrambling still a techno cliché?  
**Verdict:** looping random glyph noise would be. `10X Decode` becomes specific because it retains Accurate Black's existing three-character alphabet, only denotes state resolution and is limited to short identifiers/actions. It behaves like catalogue machinery, not cyberpunk decoration.

---

## 7. Motion system — Controlled Reveal

## 7.1 Tokens

| Token | Duration | Easing | Use |
|---|---:|---|---|
| `instant` | 80 ms | linear | pressed, play/pause |
| `fast` | 160 ms | `cubic-bezier(.2,0,0,1)` | underline, icon, focus support |
| `utility` | 240 ms | `cubic-bezier(.2,0,0,1)` | header, row state, overlay detail |
| `reveal` | 480 ms | `cubic-bezier(.22,1,.36,1)` | image/section reveal |
| `hero` | 620 ms | `cubic-bezier(.22,1,.36,1)` | aperture opening |
| `exit` | 280 ms | `cubic-bezier(.4,0,1,1)` | page/menu/image exit |

## 7.2 Stagger and delay

- Default stagger: 40 ms.
- Menu stagger: 36 ms.
- Logo entry stagger: 36 ms; compression stagger: 24 ms.
- Maximum staggered children: five. Later items appear as a group.
- No arbitrary delay above 180 ms, except the documented logo hold.
- Content needed for comprehension does not wait for motion.

## 7.3 Reveal grammar

There are only three reveal geometries:

1. **Aperture:** clip opens from a grid-aligned centre seam.
2. **Crop:** image is uncovered vertically or horizontally along its content edge.
3. **Resolve:** text moves no more than 12 px and reaches full opacity.

No rotating, elastic, perspective, 3D tilt or continuous floating behaviours are part of the language.

## 7.4 Page transition

### Same-site client navigation

1. Link activates; current content remains readable.
2. From 0–280 ms, a Void plane enters from the nearest Black Frame rail.
3. At 180 ms, route overline appears on the plane and resolves via 420 ms scramble if motion is allowed.
4. New route content must be ready or the plane changes to an honest loading status after 300 ms.
5. When ready, the plane opens as an aperture in 480 ms and exposes the new page.

Maximum planned transition without loading is 760 ms from action to fully revealed page, but navigation state and URL update are immediate. Browser back/forward uses the same direction neutrally; it does not infer fake spatial history.

### First load

No page-cover transition. Header logo and hero aperture provide the entry moment while semantic content is already present.

## 7.5 Reduced motion

With `prefers-reduced-motion: reduce`:

- logo displays compact state;
- aperture displays its fully open state;
- section and image reveals are removed;
- route plane uses at most an 80 ms opacity change or is omitted;
- all scrambling is removed;
- custom cursor is removed;
- header hide/show is immediate;
- audio progress remains functional but has no decorative animation;
- no content begins off-screen or transparent.

### Critical self-evaluation

**Question:** could the transition system slow the site in pursuit of premium feeling?  
**Verdict:** not if readiness is the controlling state. First load has no cover. Client transitions have a 280 ms covering action and open immediately when content is ready. The plane becomes loading feedback only when there is real latency. Motion follows system truth rather than inventing delay.

---

## 8. Homepage overview wireframe

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ FIXED HEADER: animated logo                                      MENU   │
├──────────────────────────────────────────────────────────────────────────┤
│ 01 / BLACK APERTURE                                                    │
│ Latest featured release: one artwork, title, artist, ACB number          │
│ One primary action                                                       │
├──────────────────────────────────────────────────────────────────────────┤
│ 02 / LABEL THESIS                                                        │
│ Deep. Dark. Authentic. Profound. + one approved statement                │
├──────────────────────────────────────────────────────────────────────────┤
│ 03 / SELECTED CATALOGUE                                                  │
│ Six release rows + one shared artwork stage + full catalogue route       │
├──────────────────────────────────────────────────────────────────────────┤
│ 04 / ARTIST ROSTER                                                       │
│ Three curated artists in an asymmetric portrait sequence                 │
├──────────────────────────────────────────────────────────────────────────┤
│ 05 / TRANSMISSION                                                        │
│ One chosen Accurate Session or Techtonic broadcast + consent facade      │
├──────────────────────────────────────────────────────────────────────────┤
│ 06 / CLOSING SIGNAL                                                      │
│ Contact/follow route + preserved route set + legal/social/footer identity│
└──────────────────────────────────────────────────────────────────────────┘
```

The homepage intentionally omits:

- a release carousel;
- generic stock video;
- a separate YouTube/media grid;
- social feed;
- unverified awards, metrics, press or partner logos;
- newsletter/demo capture without an approved operational and privacy flow;
- duplicated latest show and session players.

A proof section may only be introduced later if verified, useful evidence exists. It must not be reserved as an empty visual block.

### Critical self-evaluation

**Risk:** six sections can still resemble the standard hero–manifesto–grid–people–media–footer formula.  
**Correction:** the sections are not independent card bands. The hero aperture becomes the catalogue preview logic; the catalogue artwork changes proportion into the first portrait; the artist Signal line becomes player progress; and the player line becomes the closing marker. The homepage is one continuous editorial grammar.

---

## 9. Section 01 — BLACK APERTURE hero

## 9.1 Purpose and position

The hero exists to make the current featured release the most valuable object in the experience. It comes first because label philosophy is credible only after the label has shown what it selects.

### Required content

- overline: `LATEST RELEASE`;
- featured artist name;
- release title;
- catalogue number;
- verified release year, or full date if approved;
- 1:1 artwork;
- one stored Signal colour;
- one action: `OPEN RELEASE`;
- optional progress position `01/06` only if it refers to the six homepage acts, not a carousel.

No description paragraph, provider icon row, auto-rotation or second release appears in the hero.

## 9.2 Desktop composition

Reference viewport: **1440 × 900 px**.

### Geometry

- Hero occupies `max(780px, 100svh)` including the 72 px fixed header.
- Frame starts at x = 48 px and ends at x = 1392 px.
- Content top safe area begins at y = 112 px.
- Artwork square is `min(39vw, 58svh, 600px)`; at 1440 × 900 it is 522 × 522 px.
- Artwork centre is on editorial track boundary 7/8, approximately x = 986 px at the reference viewport.
- Artwork vertical centre is y = 470 px; top = 209 px, bottom = 731 px.
- The visible aperture at rest is 64% of artwork width and 100% of height: 334 × 522 px at reference size.
- The aperture is centred on the full square. The concealed image remains clipped, not dimmed.
- Artist and title occupy tracks 1–6. The title baseline may overlap the aperture by one track but never crosses essential artwork text if an artwork-specific safe area forbids it.
- Overline sits at y = 164 px on track 1.
- Artist begins 24 px above the title group in 14 px action/meta type.
- Hero title uses the 64–104 px token, maximum two lines and maximum width 680 px.
- Primary action sits at y = artwork bottom − 48 px, aligned to track 1.
- Catalogue number sits in the right rail, vertically aligned with the top of the artwork.
- Year sits in the right rail, aligned with artwork bottom.
- Section index `01/06` sits on the lower frame baseline at least 32 px above the viewport bottom.

### Desktop wireframe

```text
┌────────────────────────────────────────────────────────────────────────┐
│ ACC BLACK                                                       MENU  │
│                                                                        │
│  LATEST RELEASE                              ┆             ACB047      │
│                                              ┆                         │
│  MUNE                                        ┆██████████               │
│  THINK ABOUT                                 ┆██ ART ██                │
│  NOTHING ────────────────────────────────────┤██ WORK██                │
│                                              ┆██████████               │
│                                              ┆                         │
│  OPEN RELEASE ─────                                        2026        │
│                                                               01/06    │
└────────────────────────────────────────────────────────────────────────┘
```

The long title rule is part of the grid and terminates at the aperture seam. It is 1 px Hairline at rest, changes to Signal only during direct hero interaction and never passes through readable title glyphs.

## 9.3 Hero entrance sequence

The semantic title, artist and link are present from first paint. Their visual introduction is progressive enhancement.

| Time | Event |
|---:|---|
| 0 ms | Void canvas, semantic content at final layout with motion-start styles applied only after hydration. |
| 80 ms | Header logo sequence begins. |
| 140 ms | Hero overline resolves from 8 px below, 420 ms. |
| 180 ms | Aperture seam appears as a 2 px Signal line. |
| 220–840 ms | Aperture opens from 2 px to 64% width, 620 ms hero easing. |
| 300–780 ms | Artist/title resolve from 12 px below, 480 ms. |
| 560 ms | When aperture passes 60%, catalogue number performs one 320 ms Decode. |
| 700–940 ms | Primary action becomes fully visible, 240 ms. |
| ≥940 ms | Hero is still; logo may complete independently at 1380 ms. |

No single piece of content waits to become semantically available. The hero is visually complete within 940 ms.

## 9.4 Hero hover, focus and click

- The artwork and `OPEN RELEASE` form one interaction region with one semantic link, not nested links.
- Hover intent at 70 ms expands aperture from 64% to 100% in 280 ms.
- The title rule changes Hairline → Signal in 160 ms.
- `OPEN RELEASE` runs Confirm scramble once, 220 ms, and its underline grows to 100%.
- The custom cursor label appears only over the artwork on eligible pointers.
- Focus on the release link produces the exact open artwork state and visible double focus outline.
- Pointer leave returns aperture to 64% in 240 ms. Focus remains open until blur.
- Press changes label opacity for 80 ms; route navigation starts immediately.

## 9.5 Scroll transition

The page does not pin the hero.

- From page scroll 0 to 12svh, aperture inset reduces continuously from 18% each side to 0% using a bounded CSS scroll timeline.
- Title moves at most −8 px; artwork does not scale.
- Catalogue number remains fixed to the hero composition; it does not parallax.
- At 12svh, the artwork is fully visible and all properties stop changing.
- The final 96 px of the hero are pure Void. This creates a quiet handoff to the thesis.
- Fallback without scroll-timeline: at 24 px scroll, aperture opens to 100% in 280 ms.
- Reduced motion: artwork starts fully open; no scroll response.

## 9.6 Accent usage

Signal appears in exactly four hero locations:

1. the initial 2 px aperture seam;
2. the catalogue number after resolve;
3. the title rule during hover/focus;
4. the outer focus ring.

The title, artist and action remain Paper/Ash. The artwork itself supplies all other colour.

## 9.7 Tablet composition

At 768–1279 px:

- Hero minimum height remains 100svh, never below 720 px.
- Artwork is `min(58vw, 50svh, 520px)`.
- Six-track grid: title occupies tracks 1–4; artwork occupies tracks 3–6 and sits lower.
- Visual overlap is limited to one track and only in the title's final line.
- Catalogue number moves to the single left rail at artwork top.
- Action sits below title and remains above artwork bottom.
- At portrait tablet, composition becomes vertically sequenced: metadata → title → artwork → action, while the title rule still meets the aperture edge.

## 9.8 Mobile composition

Reference viewport: **390 × 844 px**.

- Header: 64 px.
- Hero min-height: `100svh`, minimum 720 px.
- Horizontal content inset: 20 px.
- Overline top: 104 px.
- Artist top: 137 px.
- Title top: 164 px, maximum two lines, 42–56 px depending on length.
- Artwork width: `calc(100vw - 40px)` = 350 px at reference.
- Artwork top target: 300 px; it may move down by up to 32 px for a two-line title.
- Mobile aperture is horizontal: initial visible height is 68% of the square, centred vertically; it opens from a 2 px horizontal Signal seam.
- Catalogue number sits directly above the artwork at left; year at right.
- Action sits 24 px below artwork.
- `01/06` sits at least 24 px above the safe-area-adjusted bottom.
- There is no custom cursor and no hover-only copy.

```text
┌──────────────────────────────┐
│ ACC BLACK              MENU │
│                              │
│ LATEST RELEASE              │
│ MUNE                         │
│ THINK ABOUT NOTHING          │
│                              │
│ ACB047                 2026 │
│ ┌──────────────────────────┐ │
│ │     horizontal          │ │
│ ├────── aperture ─────────┤ │
│ │        ARTWORK           │ │
│ └──────────────────────────┘ │
│ OPEN RELEASE ─────          │
│                       01/06 │
└──────────────────────────────┘
```

If the title exceeds two lines at 320 px, the font scales down to the 42 px minimum. If it still exceeds two lines, the approved display-break field is used; the content title remains unchanged for semantics.

## 9.9 Hero accessibility

- The visible release title is the sole homepage `h1`, formatted as “Release title — Artist”.
- The overline is not a heading.
- Artwork alt: `Cover artwork for [release] by [artist]: [approved visual description]`.
- The semantic link name is `Open [release] by [artist]`.
- Artwork state change is not announced; no necessary information changes.
- Contrast is tested for every Signal colour, but Signal never carries meaning alone.
- Focus state is visible against both artwork and Void.
- At 200% zoom, the mobile sequential layout activates before horizontal overflow.

## 9.10 Hero performance

- One priority image only.
- Responsive AVIF/WebP plus original fallback; explicit width/height.
- Reference LCP image budget: 180 KB preferred, 220 KB hard target at mobile test viewport.
- No client colour extraction, video, canvas, WebGL, carousel timer or animation library required.
- Clip animation uses one composited mask/clip layer and opacity/transform for text.
- SSR contains title, artist, link, catalogue, year and image element.

### Critical self-evaluation

**Question:** is a masked square plus large type enough to be iconic?  
**Verdict:** the mask alone is not. The icon is the exact choreography between seam, artwork, title rule and ACB coordinate, reinforced by the first-scroll release of the full artwork. The system would become generic if title and image were simply placed side by side or if the aperture were an arbitrary fashionable shape. Grid alignment and real catalogue data are therefore non-negotiable implementation details.

---

## 10. Section 02 — Label Thesis

## 10.1 Purpose, emotion and position

The thesis explains the selection after the visitor has encountered one real object. Its emotional role is release: the page becomes quieter after the hero's tension.

### Content

- `DEEP.`
- `DARK.`
- `AUTHENTIC.`
- `PROFOUND.`
- Approved statement: “We delve into the depths of electronic music. This is where the beats are felt, not just heard.”

`We are Accurate Black` may be included only if copy review confirms it adds meaning; it is not required as a second slogan.

## 10.2 Desktop composition

- Minimum section height: 78svh; no fixed viewport lock.
- Top/bottom padding: 192 px at ≥1280.
- Section index `02` in left rail.
- Four words occupy tracks 2–7, one per line, using 64–88 px section statement type.
- The statement occupies tracks 7–10, aligned to the baseline between `AUTHENTIC.` and `PROFOUND.`.
- Maximum statement width: 420 px / 48 characters.
- No CTA and no image.

```text
02       DEEP.
         DARK.                         We delve into the depths
         AUTHENTIC.                    of electronic music.
         PROFOUND.                     This is where the beats
                                       are felt, not just heard.
```

## 10.3 Motion and transition

- The four words resolve as one group from 12 px below in 480 ms.
- Only `PROFOUND.` performs a single 320 ms Decode after the group settles. The other words do not scramble.
- Statement opacity resolves in 420 ms, starting 80 ms after the word group.
- The baseline after `PROFOUND.` extends as a Hairline toward the first catalogue row.
- No replay when scrolling back.

## 10.4 Responsive

- Tablet: words tracks 1–4, statement tracks 4–6; section padding 128/96 px.
- Mobile: index inline above the words; words 40–56 px; statement follows after 48 px; left-aligned, never centred.
- Mobile padding 96 px top and bottom; minimum section height removed so zoomed content can flow naturally.

## 10.5 Accessibility, SEO and performance

- One `h2` announces the section, with the four words in a readable phrase/group.
- Visual line breaks do not create four redundant headings.
- Statement is normal text, not split into animated character spans for assistive technology.
- Text-only section adds negligible JS or media cost.
- Provides concise server-rendered label context for search/entity understanding.

### Critical self-evaluation

**Risk:** four oversized brand words can be generic manifesto design.  
**Correction:** the composition is deliberately restrained and immediately hands its final baseline to the catalogue. It does not become a showpiece of animated typography. If the approved copy remains vague, the solution is editorial refinement, not more visual effects.

---

## 11. Section 03 — Selected Catalogue

## 11.1 Purpose, emotion and position

The catalogue proves that the thesis reflects consistent curation. It is the densest section and introduces the technical archive character.

### Content

- Six curated releases, defaulting to the six latest valid releases unless editorial ordering is provided.
- Per release: catalogue number, artist, title, year and artwork.
- One action: `VIEW COMPLETE CATALOGUE`.
- No description, genre, streaming icons or redundant card CTA.

## 11.2 Desktop composition

- Top/bottom padding: 144 px.
- Heading row: `03`, `SELECTED CATALOGUE`, item range `ACB042—ACB047`, and route action.
- Content begins 64 px below heading.
- Rows occupy tracks 1–7.
- Shared artwork stage occupies tracks 8–10 and remains naturally positioned; it is not scroll-pinned.
- Artwork stage is square, `min(31vw, 52svh, 480px)`.
- Each row minimum height: 72 px.
- Row layout:
  - catalogue number: 88 px fixed area;
  - artist: 28% of remaining row;
  - title: flexible;
  - year: 56 px, right-aligned.
- Row border: bottom Hairline. Active row: 2 px Signal marker at left rail and Paper text.

```text
03  SELECTED CATALOGUE                 ACB042—047     VIEW ALL →

    ACB047   MUNE             THINK ABOUT NOTHING     2026  ┌──────┐
    ACB046   CLAUDIO MALZ     [TITLE]                 2026  │      │
    ACB045   HPSHT!           [TITLE]                 2025  │ ART  │
    ACB044   SERRA M.         [TITLE]                 2025  │STAGE │
    ACB043   [ARTIST]         [TITLE]                 2025  │      │
    ACB042   [ARTIST]         [TITLE]                 2025  └──────┘
```

Names above are illustrative only where existing content was observed; production ordering and titles come from valid content.

## 11.3 Interaction

- First row is preview-active when the section approaches.
- Hover/focus intent of 70 ms activates a row.
- Catalogue number runs one 320 ms Decode.
- Artwork changes via a vertical crop from the row's baseline direction, 360 ms.
- Outgoing and incoming artwork overlap for no more than 180 ms; no opacity soup or slide carousel.
- Active marker moves vertically in 240 ms using transform.
- Clicking anywhere in the semantic row link opens the release.
- Keyboard focus scrolls only through normal browser behaviour; preview changes do not move focus.

## 11.4 Transition from thesis and to artists

- The thesis baseline becomes the top border of the catalogue heading.
- At the end of the catalogue, the shared square artwork stage changes to a 4:5 portrait frame over 480 ms only when the Artist section first becomes visible.
- The image content itself switches to the first selected artist via a hard crop. The shape continuity expresses “work becomes maker.”
- Fallback/reduced motion: sections remain separate with no morph.

## 11.5 Tablet

- Heading retains route action.
- Shared artwork sits above the list, aligned right, maximum 420 px.
- Rows use six tracks: catalogue 1, artist 2–3, title 4–5, year 6.
- At widths below 900 px, artist and title stack inside each 80 px row while catalogue/year remain edges.

## 11.6 Mobile

- Show four releases, then `VIEW COMPLETE CATALOGUE`; the full route contains the rest.
- Each release is a vertical plate with its own 1:1 artwork.
- Order: catalogue/year meta → artwork → artist → title.
- Plate gap: 64 px; internal gaps 12/16 px.
- Artwork loads lazy except the first if it is near the initial mobile fold.
- No shared preview, pointer cursor or hover dependency.

## 11.7 Accessibility, SEO and performance

- Semantic list with one named link per release.
- Full information is readable without preview.
- Preview changes are not announced in a live region.
- Each release link contains readable artist + title context.
- First preview loads as the section nears; remaining five images load on idle/near-viewport, not at page start.
- At most two decoded images exist in the artwork stage at once.
- No scroll event or animation library is needed.

### Critical self-evaluation

**Question:** is a row list too archival and emotionally cold?  
**Verdict:** the single large, changing artwork stage prevents the list from becoming a spreadsheet, while the rows protect catalogue precision. Six individual desktop cards would feel like a store; an artwork wall would value quantity. The shared stage makes attention selective.

---

## 12. Section 04 — Artist Roster

## 12.1 Purpose, emotion and position

The artist sequence introduces the human voices after the catalogue has established label consistency. Its emotion is intimacy rather than promotion.

### Content

- Exactly three editorially selected artists for launch.
- Per artist: name, 4:5 portrait, one factual line of 70–110 characters and profile route.
- One route: `VIEW ALL ARTISTS`.
- No follower count, genre tags, social icons or generic `VIEW PROFILE` overlay repeated four times.

## 12.2 Desktop composition

- Top/bottom padding: 192 px.
- Section index and heading in left rail/track 1.
- Portrait 1: tracks 2–5, width about 420 px, top aligned after heading.
- Portrait 2: tracks 7–10, starts 176 px below portrait 1 top.
- Portrait 3: tracks 3–6, starts 144 px below portrait 2 bottom.
- Vertical overlap is visual only; DOM order remains 1, 2, 3.
- Each portrait text block sits outside the image, 24 px below or adjacent on two tracks.
- Section height is content-driven; no sticky narrative or forced viewport sequence.

```text
04  ARTIST ROSTER

        ┌────────────┐
        │ PORTRAIT 1 │  ARTIST 1
        │            │  Factual editorial line.
        └────────────┘

                                      ARTIST 2  ┌────────────┐
                                      Line.     │ PORTRAIT 2 │
                                                └────────────┘

             ┌────────────┐
             │ PORTRAIT 3 │  ARTIST 3
             └────────────┘

                                                    VIEW ALL ARTISTS →
```

## 12.3 Interaction and motion

- Each portrait reveals once through a top-to-bottom crop, 520 ms.
- Name/text resolves as a group 60 ms later, 420 ms.
- Hover/focus removes a 12% Void overlay and exposes the action underline; the image does not zoom.
- The artist name may Decode once for direct interaction, 320 ms.
- Portrait focal point remains fixed; no mouse-driven pan.
- The section route remains static until direct interaction.

## 12.4 Responsive

- Tablet: portraits alternate across six tracks, width 3–4 tracks; vertical offset reduced to 96 px.
- Mobile: one sequential 4:5 portrait at full four-track width; text below; 72 px between entries.
- On mobile action is always visible and overlay is reduced to 4% only if contrast requires it.
- Image width is `calc(100vw - 40px)` or `-32px` on compact mobile.

## 12.5 Accessibility, SEO and performance

- Each artist is one semantic link with name and meaningful context.
- Portrait alt and visible artist name are coordinated to avoid redundant announcement.
- Focus order matches DOM and apparent top-to-bottom reading order.
- Three responsive lazy-loaded images with stored focal points.
- No client query separate from the homepage payload.
- Artist names and copy provide crawlable entity context.

### Critical self-evaluation

**Risk:** asymmetrical portraits are common in fashion websites.  
**Correction:** portraits are anchored to the same Black Frame tracks and catalogue transition, use real label artists and preserve source colour. There is no ornamental editorial copy, parallax or art-directed crop chosen by CSS. The strength depends on commissioned/approved artist imagery; poor or inconsistent assets cannot be solved by layout effects.

---

## 13. Section 05 — Transmission

## 13.1 Purpose, emotion and position

Transmission proves that Accurate Black is active and temporal. It appears after the artists because audio now has context; asking for playback earlier would interrupt discovery.

### Content selection rule

Display exactly one item:

1. a verified current/featured Accurate Session, if editorially selected;
2. otherwise the latest valid Accurate Session;
3. otherwise the latest valid Techtonic episode;
4. otherwise an honest archive route without a player.

Never display “LIVE” without a verifiable live state. Never show two simultaneous embeds.

### Required fields

- format: Accurate Sessions or Techtonic;
- title;
- host/artist if verified;
- date;
- duration when known;
- provider/source;
- local poster or artwork;
- safe provider URL/ID;
- archive route.

## 13.2 Desktop composition

- Top/bottom padding: 144 px.
- Carbon surface is permitted here but does not form a floating card; it spans the complete frame horizontally.
- Content vertical height: 240–320 px depending on copy.
- Section index `05` left rail.
- Format/title occupy tracks 1–6.
- Poster occupies tracks 8–10, square, maximum 240 px.
- Play control is 56 × 56 px and aligned with the title baseline.
- Time sits in mono at the right of the functional progress line.
- Progress line spans tracks 1–7 and is 2 px: Hairline remaining, Signal elapsed.
- Archive route aligns to the bottom right rail.

```text
05  TRANSMISSION / ACCURATE SESSIONS                    [ POSTER ]

    [ PLAY ]  SESSION TITLE / HOST
              DATE / SOURCE

    ─────────────────────────────── progress ─────────  00:00 / 58:12
                                                    BROWSE ARCHIVE →
```

## 13.3 Consent facade and player states

### State A — unloaded

Local content only. Play label says `PLAY / LOAD SOUNDCLOUD` or the correct provider so the external request is not concealed. A short privacy note is available through `WHY?` or consent settings.

### State B — loading

After explicit action, the play control becomes `LOADING` with a stable accessible status. A 2 px Signal line may move once across 30% of the track; no infinite spinner if metadata is already known.

### State C — ready/playing

Player controls replace the facade in identical geometry. Playback never starts merely because consent was previously granted; the explicit play action may both load and begin playback if the label says so clearly.

### State D — provider failure

Title/date remain. Replace controls with `PLAYER UNAVAILABLE` and a named external listen link. Failure is announced once.

### State E — consent rejected

Keep the facade and offer the external provider link plus consent settings. Do not repeatedly prompt.

## 13.4 Motion

- Facade → player: horizontal aperture opens from the play control, 320 ms.
- Play/pause: 80 ms state change.
- Progress movement: direct linear representation, no easing.
- Poster reveals once in 480 ms.
- The Signal line arriving from Artist Roster becomes the initial player progress track in the visual transition; fallback is a static line.

## 13.5 Responsive

- Tablet: poster 200 px, title tracks 1–4, player spans six tracks.
- Mobile: format, title, poster, play/meta and progress stack in that order.
- Surface padding: 32 px mobile; outer margins remain 20/16 px.
- Seek target is at least 44 px high even though its visible line is 2 px.
- Time values use tabular figures and do not cause layout shift.

## 13.6 Accessibility, SEO and performance

- No autoplay.
- Native or fully keyboard-operable controls with named state.
- Seek has accessible value, minimum, maximum and text.
- Provider iframe/script count before action: zero.
- Session title/date/format are server-rendered and crawlable.
- AudioObject schema only if the factual fields and direct media relationship justify it.
- Player code is lazy-loaded after explicit interaction.

### Critical self-evaluation

**Question:** does an audio player turn the editorial experience back into a music platform?  
**Verdict:** not when there is one selected transmission, one calm control line and no waveform theatre, queue or recommendation UI. It proves the label is alive without becoming Spotify. If a provider cannot support this restrained accessible facade, the design falls back to an external link rather than inheriting the provider's full visual chrome.

---

## 14. Section 06 — Closing Signal and footer

## 14.1 Purpose, emotion and position

The final section gives one clear continuation and then exposes the preserved site routes, social channels and legal information. It restores the silence of the opening.

### Closing content

- Heading: `KEEP THE SIGNAL.` as working copy, subject to copy approval.
- One primary relationship route: `CONTACT ACCURATE BLACK` or the agreed direct channel.
- Demo status may appear as factual metadata: `DEMO SUBMISSIONS / CLOSED` or `OPEN` with route. It is not a pop-up or fake waitlist.

### Footer content

- Full static Accurate Black wordmark.
- Preserved route list in the same order as the menu, with Admin placed in utility/legal styling.
- Existing official social routes, text-labelled or icon + accessible name.
- Privacy Policy and consent settings.
- Copyright year.
- Website credit retained but visually secondary.

## 14.2 Desktop composition

- Closing Signal top/bottom padding: 192 px.
- Heading tracks 1–8, 64–88 px.
- Relationship action tracks 7–10, aligned with the final heading baseline.
- Footer begins with a Hairline.
- Footer padding top 64 px, bottom `max(48px, safe-area-inset-bottom)`.
- Route list uses two columns over tracks 1–5.
- Social/contact uses tracks 7–9.
- Legal/credit uses right rail/track 10.
- Static wordmark spans tracks 1–10 near the bottom, maximum height 112 px; it does not marquee or replay.

## 14.3 Motion and transition

- The final Transmission progress line shortens to a 32 px Signal marker at the Closing Signal index, 320 ms.
- Heading resolves once in 480 ms; no scramble across the full phrase.
- Primary relationship action may Confirm scramble on direct interaction.
- Footer links use the standard 180 ms underline/Decode rule.
- Social icons do not scale; luminance and focus outline indicate interaction.

## 14.4 Responsive

- Mobile heading 40–56 px with action 32 px below.
- Footer route list becomes two columns only if each label fits at 200% zoom; otherwise one column.
- Social links use text or 44 px icon targets and wrap naturally.
- Wordmark uses available width with fixed intrinsic ratio.
- Legal and credit come last in reading order.

## 14.5 Accessibility, SEO and performance

- Real `footer` landmark and separately labelled footer navigation.
- Icon-only socials have accessible names; decorative images have empty alt.
- Consent settings is always reachable.
- No third-party social scripts or feeds.
- Internal links reinforce crawlable site structure.
- Contact/organization claims remain verified and consistent.

### Critical self-evaluation

**Risk:** a giant footer wordmark and slogan can feel like another fashion-site convention.  
**Correction:** the wordmark is the preserved identity asset and appears static only after useful navigation/contact content. The Closing Signal contains one operational relationship, not a decorative slogan plus multiple conversion buttons. If the working copy is not strong enough, it must be rewritten rather than enlarged.

---

## 15. Responsive master rules

## 15.1 Breakpoint policy

Breakpoints respond to composition failure, not named devices:

- **Ultra-wide:** ≥1920 px.
- **Desktop:** 1280–1919 px.
- **Tablet landscape:** 1024–1279 px.
- **Tablet portrait:** 768–1023 px.
- **Mobile:** 390–767 px.
- **Compact mobile/reflow:** <390 px.

At 200% browser zoom, desktop may naturally enter the tablet/mobile composition. That is correct.

## 15.2 Ultra-wide

- Editorial core capped at 1760 px.
- Outer margins absorb extra width.
- Hero artwork capped at 600 px.
- Text measure and type caps remain fixed.
- No additional releases/artists are added.
- Menu decorative wordmark may grow only to the core width and remains 14% opacity maximum.

## 15.3 Tablet

- One metadata rail.
- Six tracks.
- Less overlap and earlier vertical stacking.
- Header/menu structure unchanged.
- Shared catalogue artwork moves above the list when the side-by-side rows fall below readable widths.
- Artist offsets shrink but remain asymmetric.

## 15.4 Mobile

- Four tracks and inline metadata.
- Native vertical sequence.
- No contextual cursor, shared hover preview or pointer-only label.
- 44 × 44 px minimum targets with preferably 8 px separation.
- Long labels wrap; they never shrink below minimum type.
- `100svh` and safe-area insets prevent browser UI overlap.
- No horizontal scroll at 320 CSS px.

## 15.5 Content stress cases

Design QA must include:

- 30-character artist name;
- 48-character release title;
- missing release description;
- missing artist portrait;
- Signal colour falling back to mineral;
- four-digit duration over one hour;
- menu at 200% zoom;
- German/Dutch browser UI does not matter because public content remains approved English;
- 320 × 568 viewport;
- landscape phone with 320 px height;
- 2560 × 1440 and 3440 × 1440 monitors.

If an asset is missing:

- artwork uses a designed Void/Carbon catalogue placeholder containing the real ACB number;
- artist portrait uses a neutral frame with the artist name, not a stock image;
- Transmission omits the poster and expands metadata, not a generic waveform.

### Critical self-evaluation

**Question:** is the mobile version only a simplified desktop?  
**Verdict:** no. The aperture changes axis, catalogue preview becomes individual plates, metadata leaves the rails, artist composition becomes a deliberate sequence and hover/cursor behaviours disappear. Brand identity survives through black framing, catalogue notation, typography and `10X Decode`, not through desktop overlap squeezed onto a phone.

---

## 16. Component and frontend architecture contract

This is a design/architecture specification, not component implementation.

## 16.1 Layering

```text
Homepage route
  ├─ resolves one typed, server-rendered homepage payload
  ├─ composes semantic sections
  └─ provides page metadata/schema

Sections
  ├─ Black Aperture
  ├─ Label Thesis
  ├─ Selected Catalogue
  ├─ Artist Roster
  ├─ Transmission
  └─ Closing Signal

Domain components
  ├─ release, artist, session/show and provider behaviour
  └─ know content semantics, not global page layout

UI primitives
  ├─ grid, type, action, focus, dialog, media and state
  └─ know interaction/accessibility, not Firestore or routes
```

## 16.2 Required component responsibilities

| Responsibility | Boundary |
|---|---|
| App shell | One header, one `main`, one footer, skip link, consent settings |
| Header | Logo state, menu trigger, scroll intent; no content query |
| Full-screen navigation | Route order, focus containment, active route, Decode interactions |
| Black Aperture | One release presentation; no fetching, sorting or carousel timer |
| Catalogue index | Six supplied releases, active preview state; no database access |
| Artist sequence | Three supplied artists and focal points; no database access |
| Transmission | One normalized media item and consent/player states |
| Responsive artwork | Source selection, dimensions, alt, placeholder and priority |
| Text action | Link/button semantics, underline, Confirm state and focus |
| Provider facade/player | Provider allowlist, consent and fallback; never raw HTML |
| Page transition | Route readiness, plane state and reduced motion |
| `10X Decode` | Deterministic visual layer, cancellation and accessibility |

No homepage component may independently query Firestore. The current duplicate-query pattern is explicitly forbidden.

## 16.3 Homepage payload

One server-resolved payload provides:

- featured release;
- six selected catalogue releases;
- three selected artists;
- one normalized Transmission item;
- demo status;
- global route/social/contact configuration;
- metadata timestamps for caching.

### Release contract

- stable id and slug;
- numeric sequence and display catalogue number;
- title and optional display-break hint;
- artist id/name/slug;
- release date/year;
- editorial excerpt where used off-home;
- artwork source set, dimensions, alt, credit, focal/safe area;
- stored Signal colour;
- provider IDs/URLs validated against allowlists.

### Artist contract

- stable id/slug/name;
- short factual homepage line;
- portrait sources, dimensions, alt, credit and focal point;
- editorial feature flag/order;
- relevant release relationship.

### Transmission contract

- format enum;
- id/slug/title;
- host/artist;
- date/duration;
- provider enum and normalized id/url;
- poster source/alt/credit;
- status and external fallback.

## 16.4 Rendering and state

- Homepage content is SSR or cached server-rendered content.
- Client hydration adds motion and media control, not basic visibility.
- No content is sorted by subtracting ACB strings; numeric sequence is explicit.
- Missing featured release produces an honest hero fallback: logo, label statement and `VIEW CATALOGUE`; it does not show an endless skeleton.
- A stale provider cannot fail the rest of the homepage.
- Content errors are logged privately and exposed as designed inline states, not raw exceptions.

## 16.5 Styling architecture

- Semantic CSS custom properties for colour, type, spacing, grid and motion.
- One global reset/token/type layer.
- SCSS `additionalData` contains only variables, functions and mixins; it does not inject base/animation/button CSS into every component.
- Section styles remain local.
- Motion tokens are shared; no component invents `ease`, `0.5s` or a spring in isolation.
- No visual component depends on DOM query selectors or global IDs for behaviour.

## 16.6 Dependency policy

- CSS/browser-native animation first.
- Existing GSAP may only be used if a documented effect cannot meet the specification with CSS or Web Animations and bundle impact is measured. The homepage specification does not currently require GSAP.
- No new carousel, cursor, text-scramble or smooth-scroll package.
- Player/provider code is dynamically loaded.
- Image processing and Signal extraction occur off the critical client path.

### Critical self-evaluation

**Question:** is this architecture unnecessarily elaborate for a small site?  
**Verdict:** the number of layers is modest: one route payload, six sections, a small domain layer and shared primitives. It specifically removes three duplicate content reads, large coupled SFCs and raw embeds. Storybook or an enterprise design-platform layer is not required. The architecture is only as broad as the audited failures demand.

---

## 17. Accessibility specification

WCAG 2.2 AA is the minimum release standard, not a Lighthouse score target.

## 17.1 Document structure

- `html lang="en"` for current public copy.
- Skip link is the first focusable element.
- One header, one primary nav overlay, one `main`, one footer.
- Homepage `h1` is featured release + artist.
- Each homepage act has one `h2`.
- Lists use list semantics; metadata uses appropriate description/list structure.

## 17.2 Keyboard path

Expected path:

1. Skip to content.
2. Home logo.
3. Menu trigger.
4. Hero release.
5. Catalogue route and six release links.
6. Three artist links and roster route.
7. Player controls and archive route.
8. Closing contact, footer routes, socials, privacy and consent settings.

Decorative preview layers, artwork morphs and section indices are not focusable.

## 17.3 Focus

- Double focus treatment visible on Void, Carbon and artwork.
- No focus obscured by fixed header; use correct scroll margin.
- Opening/closing menu restores focus.
- Provider replacement preserves logical focus or moves it to the ready play control with an explicit status announcement.

## 17.4 Contrast and colour

- Paper/Void and Ash/Void are tested at intended weights/sizes.
- Muted is never normal copy.
- Every Signal instance is tested per release.
- Active states combine colour with line, weight, text or position.
- Forced-colours receives borders and native system colours; masks do not hide content.

## 17.5 Motion, audio and media

- Complete reduced-motion variant defined in Chapter 7.
- No autoplay media.
- No flashing or rapid random character changes above the documented cadence.
- Audio controls have programmatic state/value.
- External provider fallback exists.

## 17.6 Zoom and reflow

- Pass 200% zoom at desktop widths.
- No two-dimensional scroll at 320 CSS px.
- Menu and dialogs remain closable at 400% text zoom/reflow.
- Content is not clipped by `100vh` or fixed section heights.

## 17.7 Test matrix

- Keyboard only in Chromium, Firefox and Safari.
- VoiceOver + Safari on macOS/iOS.
- NVDA + Firefox/Chrome on Windows where available.
- Reduced motion, forced colours/high contrast, 200% zoom and 320 px reflow.
- Automated axe on home in menu closed/open, player unloaded/loaded and failure states.

### Critical self-evaluation

**Question:** does accessibility flatten the visual idea?  
**Verdict:** no. The concept relies on withholding and revealing artwork, not withholding information. Semantic text remains present, focus reproduces hover states, mobile has its own composition and reduced motion shows the final artwork. The idea survives every access mode because it is rooted in hierarchy rather than spectacle.

---

## 18. Performance specification

## 18.1 Budgets

| Metric | Release target |
|---|---:|
| Lighthouse Performance | ≥95 in agreed mobile lab profile |
| Lighthouse Accessibility / SEO / Best Practices | ≥95, plus manual acceptance |
| LCP | ≤2.5 s p75 target |
| INP | ≤200 ms p75 target |
| CLS | ≤0.10 p75 target |
| Homepage initial app JS | ≤120 KB gzip target |
| Any initial JS chunk | <200 KB gzip hard ceiling |
| Initial homepage transfer | ≤1.2 MB target |
| Hero image | ≤220 KB hard target in mobile profile |
| Initial fonts | ≤120 KB total |
| Third-party iframes/scripts before action | 0 media providers |

These targets replace the audited baseline of 13.8 s LCP, 5.3 MiB and 119 requests.

## 18.2 Critical path

Initial critical content:

- compact/animated logo assets;
- header/menu trigger;
- hero title, artist, catalogue and route;
- one responsive hero image;
- critical token/type/grid CSS;
- self-hosted Book/Medium subsets required above the fold.

Not critical:

- catalogue images 2–6;
- artist portraits;
- Transmission poster/player;
- full menu decorative image if not cached;
- social icons.

## 18.3 Runtime controls

- One passive header scroll observer/listener.
- One shared Intersection Observer for reveals/lazy hints.
- At most one active scramble in a region.
- Cancel all animation frames/timeouts/listeners on state exit.
- Pause nonessential animation in hidden tabs.
- No browser-side dominant-colour canvas.
- No autoplay carousel progress loop.
- Transform/opacity/clip only for animated layers; do not promote the entire page.

## 18.4 Image and font policy

- Correct responsive `sizes`; intrinsic dimensions always.
- First hero image priority; all others lazy.
- AVIF/WebP with quality validated against artwork detail.
- Self-hosted WOFF2 and unicode subsets.
- Font fallback metrics adjusted to limit layout shift.
- No remote Google Fonts or stock video request.

## 18.5 Measurement gates

Measure at:

1. foundation shell;
2. hero complete;
3. catalogue/artists complete;
4. player/consent complete;
5. production-content staging;
6. 7 and 30 days after release with field data where available.

If a motion or image choice breaks budget, the choice is simplified. Performance is not deferred to a final optimisation pass.

### Critical self-evaluation

**Question:** can an award-level homepage stay under these budgets?  
**Verdict:** yes, because distinction comes from composition, art direction and timing rather than video, WebGL or large libraries. The heaviest initial object is one artwork image. If the implementation exceeds the budget, it indicates architectural leakage, not necessary creative ambition.

---

## 19. SEO, metadata and content integrity

## 19.1 Homepage semantics

- Title: `Accurate Black — Independent Electronic Music Label` or final approved variant.
- Description: factual label position plus current release context, within normal snippet length.
- Self-canonical homepage URL.
- Open Graph/Twitter image is a real 1200 × 630 asset, not a `/public/...` path.
- Organization/MusicGroup schema uses verified identity, official channels and logo.
- Featured release may be represented as a referenced MusicAlbum only with complete factual data.

## 19.2 Crawlability

- All featured releases and artists are real anchor links in SSR HTML.
- No navigation hidden inside click handlers or visual-only layers.
- One `h1`; six `h2` sections.
- Sitemap and canonical architecture are outside visual execution but are release-blocking because the audit found sitewide errors.
- Login/Admin are noindex/no-store and excluded from sitemap despite the preserved Admin menu route.

## 19.3 Content integrity

Do not fabricate:

- live status;
- awards, press, partners, reach or metrics;
- release dates or credits;
- artist biographies;
- demo opening dates;
- location/contact facts.

When a required field is absent, use the documented fallback or omit the optional element. Do not fill space with generic copy.

### Critical self-evaluation

**Risk:** search requirements can encourage extra explanatory copy that weakens the minimal experience.  
**Correction:** the homepage contains concise entity context in the Thesis, catalogue and artist statements. Detail pages carry full credits and descriptions. Search clarity comes from server-rendered structure and factual relationships, not keyword paragraphs added to the design.

---

## 20. Content and asset readiness checklist

Before high-fidelity production or implementation, content owners must provide/confirm:

### Featured release

- [ ] featured release choice at launch;
- [ ] final title casing and display break;
- [ ] artist name/slug;
- [ ] catalogue number and numeric sequence;
- [ ] release date/year;
- [ ] original artwork and web rights;
- [ ] artwork alt description and credit;
- [ ] approved Signal colour or extraction approval;
- [ ] release route and safe provider IDs.

### Selected catalogue

- [ ] six release IDs and order;
- [ ] complete titles/artists/years/artwork;
- [ ] fallback behaviour accepted if fewer than six valid items exist.

### Artist roster

- [ ] three artist IDs and order;
- [ ] 4:5 portrait sources with sufficient resolution;
- [ ] focal points, credits and rights;
- [ ] one factual 70–110 character line each.

### Transmission

- [ ] selected format/item or approved automatic fallback rule;
- [ ] date, host/title, duration and provider;
- [ ] poster rights;
- [ ] normalized provider ID and external fallback link;
- [ ] consent wording.

### Global

- [ ] final wordmark assets and correct light variants;
- [ ] Suisse font licences/files;
- [ ] official social/contact channels;
- [ ] Demo Submission open/closed status;
- [ ] footer copyright/credit wording;
- [ ] privacy/consent settings route;
- [ ] final English copy review.

### Critical self-evaluation

**Question:** does the concept depend too much on perfect assets?  
**Verdict:** premium editorial work always depends on source quality. The system has honest ACB-number and neutral-frame fallbacks, but those are failure states, not an art direction substitute. Artist portrait and artwork rights/quality are therefore pre-production gates, not last-minute CMS tasks.

---

## 21. Exact state inventory

The senior design and frontend teams must produce and verify every listed state.

### Header/menu

- top, scrolled, hidden, returned, keyboard-forced visible;
- logo first-entry, compact, menu-expanded, reduced motion;
- menu closed, opening, open, closing;
- route default, hover, focus, current, pressed;
- 200% zoom and overflowing menu;
- no-JS home logo/link state.

### Hero

- SSR/no-motion baseline;
- entrance seam, partial aperture, full aperture;
- hover, keyboard focus, pressed;
- first-scroll complete;
- reduced motion;
- long title, missing artwork, missing featured release;
- 320 px, 390 px, tablet portrait, 1440 and ultra-wide.

### Catalogue

- first active, row hover/focus, preview transition;
- no hover/coarse pointer;
- four mobile plates;
- missing artwork, fewer than six releases, content failure;
- reduced motion.

### Artists

- reveal, settled, hover/focus;
- missing portrait, long name/line;
- mobile action visible;
- reduced motion.

### Transmission

- unloaded, consent unknown, rejected, loading, ready paused, playing, seeking, muted, complete, failure, no item;
- keyboard focus per control;
- provider external fallback;
- reduced motion.

### Closing/footer

- Demo open/closed;
- action/link states;
- social focus;
- consent settings available;
- wrapped routes at zoom/mobile.

### System

- route loading under/over 300 ms;
- route error;
- offline/slow image;
- reduced motion;
- forced colours;
- keyboard only;
- screenreader reading order.

### Critical self-evaluation

**Question:** is this state inventory excessive for one homepage?  
**Verdict:** no. The audited site failed specifically in loading, error, keyboard, consent and responsive states. Designing only the ideal screenshot would leave the senior implementation team to invent the product where risk is highest.

---

## 22. Build sequence after explicit approval

No work in this chapter is authorised by the existence of this document. It begins only after explicit approval.

### Stage 1 — Design production

- Produce high-fidelity frames at 1440 × 900, 1024 × 768, 390 × 844 and 320 × 568.
- Produce menu open, hero focus/mobile, catalogue preview, player consent and reduced-motion frames.
- Produce a timing storyboard for logo, aperture, Decode and page transition.
- Validate real launch content and asset crops.

**Gate:** Creative Director and accessibility design review.

### Stage 2 — Architecture/content contract

- Confirm one SSR homepage payload and normalized types.
- Confirm cache, image, provider, consent and error boundaries.
- Confirm no raw HTML and no duplicate client queries.
- Map old routes/content to the new components without changing public URLs unintentionally.

**Gate:** lead frontend + security review.

### Stage 3 — Foundations

- Tokens, fonts, Black Frame Grid, focus and reduced motion.
- Header, logo states and full-screen navigation.
- Action/link primitives and `10X Decode` in isolation.

**Gate:** keyboard, zoom and visual-regression review.

### Stage 4 — Homepage vertical slices

1. BLACK APERTURE with real SSR data and LCP image.
2. Thesis + Catalogue.
3. Artist Roster.
4. Transmission consent/player.
5. Closing Signal + Footer.

Each slice is measured before the next one lands. Motion is added only after layout, semantics and no-motion behaviour pass.

**Gate:** creative and performance review per slice.

### Stage 5 — Hardening and release rehearsal

- Complete state inventory.
- Axe plus manual keyboard/screenreader/zoom/reduced-motion.
- Lighthouse/bundle/image/font budgets.
- SSR/SEO/canonical/schema/sitemap validation.
- Provider failure, slow network and no-content tests.
- Production-content staging across target devices.

**Gate:** no critical/high accessibility, security or functional findings; documented exception only for verified external limitations with fallback.

### Stage 6 — Controlled release

- Preview approval.
- Rollback plan.
- Staged production release.
- Smoke test and 72-hour error/CWV/provider observation.

## 22.1 Definition of done

The homepage is complete only when:

- the first viewport communicates Accurate Black and one current release within five seconds;
- the fixed navigation structure, logo narrative and scrambling DNA are recognisably preserved;
- there is no blocking preloader, autoplay carousel, video or audio;
- all key content is server-rendered and usable without motion/hover;
- the hero uses one priority image and meets the stated LCP/bundle budgets;
- menu, hero, catalogue, artist and media flows pass keyboard and assistive-technology checks;
- reduced motion is a complete designed mode;
- provider media sends no third-party request before explicit action/consent;
- every state in Chapter 21 is accepted;
- no unverified claim or placeholder enters production;
- the experience still feels distinct when every animation is disabled.

### Critical self-evaluation

**Question:** does this plan leave creative interpretation to implementation?  
**Verdict:** the essential composition, measurements, hierarchy, content limits, responsive transformations, timings, easings and states are fixed. The remaining work is normal high-fidelity craft: optical kerning, artwork-specific safe areas and browser validation. Those refinements may improve fidelity but may not change the concept or system without documented approval.

---

## 23. Final creative verdict

BLACK APERTURE is not carried by spectacle. It is carried by disciplined withholding: one release instead of a carousel, one signal colour instead of a palette, one transmission instead of an embed wall, one decode instead of constant scrambling.

The preserved logo, menu and `10X` language prevent the redesign from erasing Accurate Black's existing identity. The new grid, aperture and editorial sequence prevent that identity from remaining trapped in the current homepage.

The implementation team must protect the central equation:

> **Black frame + real artwork + catalogue coordinate + controlled reveal = Accurate Black.**

Adding animation, media or content is not neutral. Every addition must replace an existing decision or prove a stronger information purpose. “One more effect” is a design change and requires approval.

This document is the end of Phase 2 documentation. No code may be written until the user explicitly approves the masterplan and authorises the next phase.
