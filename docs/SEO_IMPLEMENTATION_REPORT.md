# Patliputra VinFast — SEO tracker implementation report (developer)

**Tracker source:** `Patliputra_VinFast_SEO_Correction_Tracker_27Oct2026.xlsx`  
**Site:** https://patliputravinfast.in  
**Repo:** `vinfast-UI` (career-section-nanak) + API sitemap/robots on backend  

> **Important:** Items below marked *Code deployed — verify on live* must be checked on production (view-source, PSI, GSC, GA4 DebugView) before marking the Excel tracker **Completed**.

---

## First priority — technical & on-page (developer)

| Tracker ID | Item | Code status | Live verification |
|------------|------|-------------|-------------------|
| 2 | Homepage title (shorter) | **Done** — `seoBlueprint.ts`, `index.html`, `usePageSeo` | View-source `/` title ≈ 48 chars |
| 3 | Visible H1 on homepage | **Done** — `Index.tsx` + `HOME_PAGE_H1` | DOM shows one H1; hero slide titles are `<p>` |
| 5 | Heading hierarchy | **Partial** — H1 → H2 sections; hero demoted from H2 | Re-run SEOptimer after deploy |
| 12 | Analytics / GTM | **Ready** — `lib/analytics.ts`, form events; set `VITE_GTM_ID` in production env | Tag Assistant + GA4 DebugView |
| T01 | Sitemap | **Already wired** — `vercel.json` → API `/api/v1/sitemap.xml` | curl -I https://patliputravinfast.in/sitemap.xml |
| T02 | Robots | **Already wired** — rewrite to API | curl https://patliputravinfast.in/robots.txt |
| T03 | Canonical | **Per-route** — `usePageSeo` + static `/` in index.html | GSC URL inspection |
| T05 | Test-drive / book conversions | **Events pushed** — `test_drive_submit`, `book_now_submit`, `lead_strip_submit` | Configure GTM tags → GA4 |
| 8–10, 19–20 | PageSpeed / cache / image dimensions | **Partial** — code split, asset cache headers, hero/model width/height | Re-test PSI mobile after deploy |

---

## Second priority — website

| Item | Status |
|------|--------|
| SEO Copy sheet homepage meta + H1/H2 labels | **Homepage meta + H1 + model H2/H3** implemented per sheet |
| Social profiles (Instagram, LinkedIn, Google Maps) | **Footer + JSON-LD sameAs** — URLs from client |
| Structured data | **AutoDealer** in `index.html` + API global schema bootstrap |
| Internal linking | Existing nav/footer; model cards link to `/models/*`, `/compare`, `/test-drive` |
| District / blog pages | Routes in `App.tsx` + redirects in `vercel.json`; verify CMS content in admin |
| Facebook / X / YouTube / Meta Pixel | **Not added** — no official URLs provided; add when marketing confirms |

---

## Third priority — coordination (not developer-only)

| Owner | Items |
|-------|--------|
| Sameer / SEO | GBP NAP (T13), backlinks (1), GSC CTR (T12), content expansions (6) |
| Developer | Deploy frontend with `VITE_GTM_ID`, PSI follow-up, prerender/SSR only if GSC shows indexing gaps |
| Project lead | Evidence tab in Excel, weekly sign-off |

---

## Production checklist (before marking Excel “Completed”)

1. Set **`VITE_GTM_ID=GTM-XXXXXXX`** in Hostinger/Vercel env and rebuild.
2. In GTM: GA4 config tag + conversion events for `test_drive_submit`, `book_now_submit`, `lead_strip_submit`.
3. **PageSpeed Insights** mobile + desktop on `/` — attach before/after screenshots.
4. **View-source** `/` — confirm title, meta description, canonical, JSON-LD `sameAs`.
5. **GSC** — submit sitemap, inspect `/`, `/models/vf7`, `/test-drive`, `/book-now`.
6. SPF record (audit #11) — **DNS/email admin only**, not application code.

---

## Official social URLs (client-provided)

- Instagram: https://www.instagram.com/vinfastpatliputra/
- LinkedIn: https://www.linkedin.com/company/patliputra-groups/
- Google Maps / GBP: public maps pin (same as showroom link in `dealerMap.ts`)

---

*Updated: November 2026 — attach PSI/GSC screenshots to Excel Evidence Tracker after live deploy.*
