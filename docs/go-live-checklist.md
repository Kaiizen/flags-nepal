# Flags Nepal — Go-live checklist (start → live)

Use this as the **single path** from “we have code” to “the site is live and trusted.”  
Deeper detail lives in:

| Document | Use for |
| --- | --- |
| [hosting-technical-spec.md](./hosting-technical-spec.md) | Node version, build commands, outbound HTTPS, resource expectations |
| [seo-launch-checklist.md](./seo-launch-checklist.md) | Canonicals, sitemap, Search Console, Bing, post-launch SEO |
| [launch-security-checklist.md](./launch-security-checklist.md) | Vercel/VPS, env vars, Resend DNS, API key hardening, smoke tests, optional Sentry & analytics |

---

## Phase A — Code & quality (before you pick a host)

- [ ] **Install & build:** `npm ci` → `npm run build` completes with **no errors** (fix TypeScript and lint issues first).
- [ ] **Run production locally:** `npm run start` — click through core routes (see Phase E).
- [ ] **Branch is clean:** committed work, `.env.local` is **not** committed (only `.env.example` patterns in repo).
- [ ] **Business copy spot-check:** phone, WhatsApp, address, hours, trust stats, and review score match what you want to publish.

---

## Phase B — Assets & content

- [ ] **Product catalogue:** every `/shop/[slug]` page you care about has images loading from `public/products/...`.
- [ ] **Legal pages:** `/privacy` and `/terms` read correctly; company name and contact details are accurate.
- [ ] **Nepali labels** (where used) match the English intent.
- [ ] **Favicon / manifest / icons** resolve (browser tab + “Add to Home Screen” if you care).

---

## Phase C — Hosting decision & compatibility

- [ ] Host supports **Node 18+** (Node **20** recommended), **`npm run build`**, and **`npm run start`** (or your platform’s equivalent for Next.js).
- [ ] You can set **environment variables** for the production app.
- [ ] **HTTPS** on the public domain (TLS cert — usually automatic on Vercel / behind Cloudflare).
- [ ] Outbound **HTTPS (443)** allowed to **Resend** (`api.resend.com`) at minimum; optional: Google Places + `fonts.gstatic.com` (see technical spec).

If any item fails, resolve with the provider using [hosting-technical-spec.md](./hosting-technical-spec.md).

---

## Phase D — Environment variables (production)

Set these in the **host dashboard** (never commit real secrets). Names match `.env.example`.

**Required for a trustworthy public launch**

- [ ] `NEXT_PUBLIC_SITE_URL` — final public URL, e.g. `https://flagsnepal.com` (**no trailing slash**)
- [ ] `RESEND_API_KEY`
- [ ] `RESEND_FROM_EMAIL` — on a **domain verified** in Resend (not only `onboarding@resend.dev`)

**Recommended**

- [ ] `CONTACT_INBOX_EMAIL` — where enquiries should land

**Optional**

- [ ] `GOOGLE_MAPS_API_KEY` + `GOOGLE_PLACE_ID` — live Google reviews on homepage (else static/fallback)
- [ ] `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` — only if you override the default contact-page map

Full table and Resend DNS steps: [launch-security-checklist.md §3](./launch-security-checklist.md#3-environment-variables-to-set-in-your-host-dashboard).

---

## Phase E — Functional tests (staging or production URL)

Run on the **real HTTPS URL** before you announce launch.

**Core pages**

- [ ] `/` — hero, navigation, footer
- [ ] `/shop` — categories and filters
- [ ] `/shop/[slug]` — at least two product detail pages (images + copy)
- [ ] `/contact` — map embed (if used), form visible
- [ ] `/about`, `/services`, `/works` — load and render

**API & conversions**

- [ ] **Contact form:** submit once — email arrives at the intended inbox; **Reply-To** is the visitor’s email.
- [ ] **Rate limit:** rapid repeated submits eventually return **429** (abuse protection working).
- [ ] **WhatsApp** link (FAB + any in-page links) opens the correct number and message.
- [ ] **Phone** `tel:` links work on mobile.

**SEO surfaces**

- [ ] `/robots.txt` — loads; points to sitemap if applicable
- [ ] `/sitemap.xml` — loads; includes main pages and product URLs

**Self-hosted / Edge note:** if dynamic Open Graph image fails, see [hosting-technical-spec.md §10](./hosting-technical-spec.md#10-edge--open-graph-note).

---

## Phase F — SEO & structured data (before / right after DNS)

Follow [seo-launch-checklist.md](./seo-launch-checklist.md) for the full sequence. Minimum:

- [ ] Canonicals use `NEXT_PUBLIC_SITE_URL`
- [ ] Rich Results / schema spot-check (homepage FAQ, local business, product page) — [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] After DNS is stable: **Google Search Console** property + sitemap submit; optional **Bing Webmaster**

---

## Phase G — Security & email (production-grade)

- [ ] **Resend domain** verified; **SPF/DKIM/DMARC** DNS records in place at the registrar
- [ ] **Google Maps API key** (if used): IP or referrer restrictions in GCP; not exposed in client bundles
- [ ] **Smoke tests** from [launch-security-checklist.md §7](./launch-security-checklist.md#7-post-launch-smoke-test): HTTPS redirect, headers, 429 on spam test, Lighthouse spot-check

Optional but valuable: analytics (Plausible/Umami/GA4 policy), Sentry — [launch-security-checklist.md §6](./launch-security-checklist.md#6-observability-ship-these-when-ready).

---

## Phase H — Launch day (DNS cutover)

- [ ] **DNS** points **A/AAAA or CNAME** to the host (Vercel / your server) as documented by the provider.
- [ ] **Wait for propagation** (often minutes; can be up to 48h in edge cases).
- [ ] **Verify** `https://<domain>` loads and **HTTP → HTTPS** redirect works.
- [ ] **Re-test** contact form and one purchase path (Shop → WhatsApp or quote) on the live domain.

---

## Phase I — Post-launch (first 1–2 weeks)

- [ ] Search Console: indexing status, no unexpected “blocked” or wrong canonicals
- [ ] Monitor contact inbox for delivery failures or spam spikes
- [ ] Note any 404s from Search Console or analytics; add redirects if old URLs existed
- [ ] Revisit SEO checklist “2-week monitoring” in [seo-launch-checklist.md §6](./seo-launch-checklist.md#6-2-week-post-launch-monitoring)

---

## Quick “are we ready?” gate

You are **OK to point the public domain** when **Phase A–E** are done, **Phase D** Resend is verified, and you have a rollback plan (previous DNS or a maintenance page). **Phase F–G** can overlap launch week but should not be skipped entirely.

*Last updated for the `flags-nepal` Next.js app; sync with `package.json` and deployment target when the stack changes.*
