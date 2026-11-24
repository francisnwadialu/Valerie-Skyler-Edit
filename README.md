# Website-ValerieSkyler

Valerie Skyler's site: Next.js (App Router, React 19, TypeScript), static export, dark charcoal palette
(`#141416` page, `#19191c` content panels, white type, neon-pink accents).

## Pages

| Route | Component |
| --- | --- |
| `/` | `src/components/pages/home` |
| `/music`, `/music/[slug]` | `src/components/pages/work` |
| `/shows`, `/shows/[slug]` | `src/components/pages/services` |
| `/articles`, `/articles/[slug]` | `src/components/pages/journal` |
| `/cast` | `src/components/pages/studio` |
| `/shop` | `src/components/pages/shop` |
| `/contact` | `src/components/pages/contact` |
| `/legal/privacy` | `src/components/pages/legal-privacy` |
| `/sign-up` | `src/components/pages/pricing` |

Legacy URLs (`/work`, `/services`, `/studio`, `/journal`, `/pricing`, `/collections`, `/discography`) redirect
to the current routes in `next.config.ts`. Shared chrome (sky layer, navigation, footer) is
`src/components/site/`; each page is `SiteShell` plus one component per section. Animated pieces are client
components in `src/components/widgets/`; small DOM behaviours (FAQ, hover, contact form) are in
`src/components/effects/`.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## Content

Pages read from Sanity (`pls29s2l` / `production`) through `src/lib/sanity/`, falling back to
`src/lib/sanity/defaults.ts` when the dataset returns nothing. The schema and seed data live in `sanity/`.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Contact form POST target (multipart/form-data, answers 2xx). Without it the button shows its error state. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity project (defaults in `.env.example`). |
| `SANITY_API_READ_TOKEN` | Optional, only if the dataset is private. |
| `NEXT_PUBLIC_BANDSINTOWN_APP_ID` | Optional Bandsintown widget app id. Without it the widget uses its `js_<hostname>` fallback, so dates still load. |
| `NEXT_PUBLIC_BANDSINTOWN_ARTIST_ID` | Optional, defaults to `15622702`. |

The home "Shows" section embeds Bandsintown's official widget (`widgetv3.bandsintown.com/main.min.js`); when the
artist has no upcoming dates the widget draws nothing, so the section shows a "No upcoming shows right now"
note with a Follow on Bandsintown link. The old static list is archived in `src/components/archive/WorkIndex.tsx`
(see `src/components/pages/home/ARCHIVE.md`).

## Dev-only copy markup overlay

`src/components/dev/annotator.tsx` draws the in-page annotation panel used for design feedback. It is guarded by
`NODE_ENV` and a Turbopack alias in `next.config.ts`, so production builds never include it. Annotations live in
the browser's `localStorage` under `copy-markup:<project>:v1` — never put credentials in them.

## Build

`npm run build` emits a standalone Node server (`next.config.ts` sets `output: "standalone"`), started with
`npm start`. Routes that read Sanity (`/`, `/music`, `/shows`, `/articles`, `/sign-up`, `/contact`) render on
demand, the rest are prerendered. `wrangler.jsonc` is left over from an earlier static-export setup and points
at `./out`, which this build no longer produces.
