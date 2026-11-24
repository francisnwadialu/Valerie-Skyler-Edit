# Archived Home sections

Sections the owner asked to take off the homepage on 2026-11-18, with the intent of using them again
later ("archive this for now"). Nothing was deleted: each section's wrapper component and its widget
are untouched, and the page CSS/JS for them is still loaded.

| Section | Wrapper component | Widget | Re-add |
| --- | --- | --- | --- |
| "About Valerie Skyler" read-in statement | `src/components/pages/home/Statement.tsx` | `src/components/widgets/ReadIn.tsx` | import `Statement` and render `<Statement />` |
| Reel — "Watch" / "Play the reel" | `src/components/pages/home/Reel.tsx` | `src/components/widgets/ReelWindow.tsx` | import `Reel` and render `<Reel />` |
| "What we make" — capability arc | `src/components/pages/home/Crafts.tsx` | `src/components/widgets/CapabilityArc.tsx` | import `Crafts` and render `<Crafts />` |
| "How an evening goes" — evening steps | `src/components/pages/home/Evening.tsx` | `src/components/widgets/EveningSteps.tsx` | import `Evening` and render `<Evening />` |
| "Clients, 2014 to tonight" — sky ribbon | `src/components/pages/home/Clients.tsx` | `src/components/widgets/SkyRibbon.tsx` | import `Clients` and render `<Clients />` |
| Voice quote — "They made our brand feel…" | `src/components/pages/home/Voice.tsx` | `src/components/widgets/VoiceQuote.tsx` | import `Voice` and render `<Voice />` |

Also off the homepage, same date:

- The "Articles" journal teaser (`src/components/pages/home/Journal.tsx`, widget-less) — removed on request.
  The `/articles` page and its posts are untouched, so the cards can be rendered again from there.
- The "tide" word overlay on the reel (`ReelWindow`'s `word` prop, now empty on Home) and the "05 honours"
  count beside the awards (removed from `AwardFan`).

The dusk sky picks its hour from the `§ … @0.xx` markers on the sections that are present, so the
remaining sections still drive the background on their own; re-adding one needs no other change.

## Static "Shows" list (Juno → Vale) — moved here 2026-11-18

The eight hard-coded rows (component, hover still strip, row numbers, hairlines and sun dot) were moved
out of the live code into **`src/components/archive/WorkIndex.tsx`** as `WORK_ROWS` + `WorkIndex`. Nothing
imports it: the home "Shows" section is Bandsintown's widget only.

To bring the static list back, import `WorkIndex` and `WORK_ROWS` from
`@/components/archive/WorkIndex` and render `<WorkIndex rows={WORK_ROWS} />` inside
`src/components/pages/home/Index.tsx` in place of `<BandsintownWidget />`.
