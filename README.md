# Sunray Contracting

Multi-page site built with React, Vite, Motion and native CSS.

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/approach` | Approach — how a project runs, five phases, before/after |
| `/services` | Services — 18 services in 6 groups, sticky quick-bar index |
| `/financing` | Financing |
| `/contact` | Contact |
| `/privacy` | Privacy Policy |
| `/cookies` | Cookie Policy, with a live control for the consent choice |

Legacy Wix URLs redirect to the matching new page (see `public/_redirects`).
Navigation sits in a fixed header at the top of every page; below 1180px it
collapses to a full-screen menu sheet.

## Mobile

The phone layout is treated as the primary one, not a fallback. Breakpoints:
1180 drops the desktop nav, **900** collapses every two-column grid and turns on
the phone action bar, **680** is the single-column phone layout, **420** is the
small phone. Below that, `hover` and `pointer` queries handle what is about the
input device rather than the screen.

| Concern | What was done |
|---|---|
| Images | Every photograph has 480/960/1440 AVIF and WebP variants; a phone pulls the 480px AVIF (~14 KB) instead of a 1600–2400px JPEG. The hero poster is preloaded on the home page only |
| Video | The hero film is off below 900px, on reduced motion, and on 2G/3G or Save-Data connections — the poster stands in |
| Parallax | Drift is cut to ~a third on narrow screens, and the work rail renders as a plain element rather than a transformed one |
| Tap targets | Nothing interactive is under 40px tall; links inside running prose get vertical padding, which grows the hit box without moving the type |
| Type | Nothing on a phone is under 12px, including the mono labels that sit at 10–11px on desktop |
| Reach | A fixed action bar puts Call and Free quote in thumb reach, since the header drops the phone number below 900px |
| Services index | The 18-item sticky rail becomes a one-line chip scroller pinned under the header, and takes the top edge when the header slides away |
| Forms | `inputMode`, `enterKeyHint` and `autocomplete` per field; 16px inputs so iOS does not zoom on focus |
| Notches | `viewport-fit=cover` plus `env(safe-area-inset-bottom)` on both fixed bars |
| Landscape | A short-viewport query stops the full-bleed hero from filling the screen with no content |

Verified at 390px across all eight routes: no horizontal overflow, no tap target
under 40px, no text under 12px, no console errors.

## SEO

- Titles and meta descriptions are per route, keyword-led and written for the
  search result rather than for the page (see `routeMeta` in `src/data.js`).
- H1 and H2s carry the actual search phrases — "Licensed general contractor in
  Miami and South Florida", "Kitchen, bath and interior remodeling" — instead of
  slogans. Service copy states materials, code and jurisdiction.
- Structured data in `src/seo.js`: `GeneralContractor` / `HomeAndConstructionBusiness`
  with opening hours, contact point and an 18-item `OfferCatalog`, plus `WebSite`,
  `WebPage`, `BreadcrumbList`, and `FAQPage` on the two routes that render the
  FAQ. `index.html` carries a JS-free copy of the organisation node under the
  same `@id`.
- A service-area section names three counties and twenty cities in plain text,
  and the footer repeats them.
- Canonical, Open Graph and Twitter tags update on every route change.
- `public/sitemap.xml` lists all eight routes with `lastmod`.

**No address and no licence number are published**, because neither is on file —
see "Before launch". A wrong `PostalAddress` is worse for local search than none.

## Privacy and cookies

`src/consent.js` holds the decision (`localStorage`, versioned). The banner in
`src/components/CookieConsent.jsx` offers Accept and Decline with equal weight;
both are remembered, so the banner does not reappear. "Cookie settings" in the
footer clears the choice and brings it back, and the Cookie Policy page shows
the current answer and lets it be changed in place.

Nothing optional runs today. `analyticsAllowed()` is the gate: **anything added
later — analytics, pixels, embedded maps — must sit behind it**, and the
inventory table in `src/pages/CookiePolicyPage.jsx` must gain a row in the same
change.

## Motion

The motion language follows fluid.glass. Every piece of it is disabled or
reduced under `prefers-reduced-motion`, and the page is fully legible without it.

| Component | What it does |
|---|---|
| `SplitText` | Measures the rendered heading, splits it into real visual lines, and slides each line up out of its own mask |
| `RollText` | Duplicated label that rolls on hover — used on nav links, buttons, footer links |
| `RevealImage` | Wipe-open panel, settle from a slight overscale, plus scroll parallax, each on its own element |
| `SmoothScroll` | Lenis damped wheel scrolling; native on touch, off under reduced motion |
| `PageTransition` | Dark curtain drops on link click and lifts on the next page |
| `Cursor` | Trailing ring that widens over interactive elements; system cursor stays visible |
| `Eyebrow` | Mono section label with a rotated square marker |

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Media

Service photography lives in `public/media/services/<slug>/`, re-encoded to a
max width of 1600px (93 MB of originals became 13 MB). The originals are
untouched in `services media/`.

Responsive variants are built by `npm run media` (`scripts/build-media.mjs`,
needs ffmpeg and ffprobe on PATH). It writes 480/960/1440 AVIF and WebP files
next to every photograph and regenerates `src/media-manifest.js` with the widths
that actually exist per format, so `srcset` never points at a variant that was
skipped for being an upscale. AVIF is offered first — it lands at roughly half
the weight of the same WebP on this photography — with WebP behind it and the
original JPEG/PNG as the `<img>` src. Re-run it after adding or replacing any
photograph; `--force` rebuilds files that already exist.

The hero film is built by `npm run hero` (`scripts/build-hero-video.mjs`) from
the editing master `hero.mp4` in the project root. It writes four files: a
1080p pair for desktop (`hero-loop.webm` 1.3 MB, `hero-loop.mp4` 1.8 MB) and a
720p pair for phones (`hero-loop-720.webm` 595 KB, `hero-loop-720.mp4` 1.1 MB),
WebM offered first with the MP4 behind it. It also re-cuts `hero-poster.jpg`, so
run `npm run media` afterwards to rebuild that poster's variants.

The film runs continuously at every width and puts itself back in motion
whenever the browser stops it on its own — a refused autoplay, a backgrounded
tab, a stall. The two things that do leave it stopped are the visitor's own: the
pause control on the frame, or an operating system set to reduced motion or data
saver, where the poster frame stands in. The `<video poster>` attribute carries
the 960px WebP rather than the full JPEG, and `index.html` preloads that exact
URL on the home page.

The editing masters in the project root (`hero.mp4`, `Comp 1_15.mp4`,
`8720485-uhd_3840_2160_24fps.mp4`) are not copied into the build.

## Before launch

- **Get the physical address and the Florida licence number from the client.**
  Both are missing, and both are load-bearing for local search: the address
  completes the `PostalAddress` in the structured data and unlocks the Google
  Business Profile; the licence number is the trust signal Florida buyers look
  for. Add them to `site` and `contact` in `src/data.js` and to the organisation
  block in `index.html`.
- **Financing copy is quoted from the client's own material** ($0 down, approval
  not based on credit score, repaid through property taxes, and so on) and is
  framed on the page as subject to eligibility and confirmation. Confirm the
  current program and its terms before publishing, or cut the list.
- The quote form prepares a prefilled email to `info@sunraymiami.com`. Connect a
  form endpoint before launch if submissions should send directly — and update
  the "How the quote form works" section of the Privacy Policy in the same
  change, because it describes the current behaviour precisely.
- Have the client or their counsel read `/privacy` and `/cookies` before launch.
  They are written against what this build actually does, but they are not legal
  advice.
- The logo is only an 800×600 PNG. Ask the client for a vector original.
- The Miami market is bilingual; a Spanish version is the largest remaining SEO
  opportunity after the address and licence number.
- `sunraymiami/` holds the extracted legacy Wix site and is not part of the build.
