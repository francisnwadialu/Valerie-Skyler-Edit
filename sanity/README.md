# Sanity Hosted Studio Setup (Project `pls29s2l` · Dataset `production`)

All FAQs, Articles/Posts, Shows, Sign Up Packages, and Music items on the website are connected to Sanity Content Lake (`pls29s2l` / `production`).

Until documents of a given type are published in Sanity, the website displays the built-in default items automatically. As soon as you import or publish documents of that type in Sanity Studio, the live website renders your Sanity content immediately.

## 1. Deploy the Schemas to Sanity Hosted Studio

From your local terminal (or any machine logged into your Sanity account):

```bash
cd sanity
npm install
npx sanity login
npm run seed    # Imports all starter FAQs, Articles, Shows, Sign Up Plans & Music items
npm run deploy  # Deploys the Studio schemas to your hosted *.sanity.studio
```

## 2. Document Types

- **`faqItem`** — Editable FAQs grouped by `page` (`contact`, `shows`, `sign-up`).
- **`post`** — Homepage Articles, `/articles` index, and `/articles/[slug]` full articles.
- **`showItem`** — Cards on `/shows` and detail pages on `/shows/[slug]`.
- **`signUpPlan`** — Packages on `/sign-up`.
- **`musicItem`** — Grid on `/music`, detail pages on `/music/[slug]`, and Featured / Index sections on `/`.
