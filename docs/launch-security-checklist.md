# Flags Nepal — Security & Operations Launch Checklist

This is the set of tasks that require **your account access** (GCP, Resend,
hosting, analytics). The code side of contact-form hardening and security
headers is already in place — this file covers what must happen outside the
repo before launch.

## 1) Hosting platform (pick one, configure before DNS cutover)

### If deploying to Vercel (recommended — zero config)

- Create project → import the GitHub repo.
- Add production environment variables (see section 3 below).
- Enable the built-in **Deployment Protection** on preview deploys if you do
  not want previews indexed by Google.
- Vercel already gives you HTTPS, auto-renewing certs, a global CDN, and DDoS
  mitigation. You do not need Cloudflare on top, but it does not hurt.

### If deploying to a VPS (Fly / DigitalOcean / Hetzner)

- Put **Cloudflare** in front of the origin (free plan is fine). This gives
  you DDoS mitigation, a WAF, and automatic HTTPS caching.
- In Cloudflare, turn on:
  - SSL/TLS mode → **Full (strict)**.
  - "Always Use HTTPS" redirect.
  - Bot Fight Mode → **On**.
  - "Browser Integrity Check" → **On**.
- Make sure your origin only accepts traffic from Cloudflare IPs (UFW or
  provider firewall rule).
- Run `next build && next start` behind a process manager (pm2 / systemd) —
  our in-memory rate limiter only works reliably on a long-lived single-node
  process, and on a VPS this is exactly what you have.

## 2) Google Maps / Places API key hardening

The key powers server-side review fetches only — it must **never** ship to
the browser. In Google Cloud Console → **APIs & Services → Credentials**:

- Open your Maps/Places API key.
- Under **Application restrictions**, pick **IP addresses** and allowlist the
  outbound IP(s) of your host:
  - On Vercel, use their documented [deployment egress IPs](https://vercel.com/guides/how-to-allowlist-deployment-ip-address)
    (or upgrade to a Vercel plan with static egress).
  - On a VPS, allowlist the VPS public IP.
- Under **API restrictions**, restrict to exactly:
  - Places API
  - (Optional) Maps JavaScript API — only if you later move the contact map
    from an iframe to an embedded component.
- Save. Leaked keys that are IP-restricted cannot be abused by attackers.

## 3) Environment variables to set in your host dashboard

Copy `.env.example` and fill in the real values in your host's environment
settings (Vercel → Settings → Environment Variables, or `.env` on a VPS).
Mark each as **Production** (and **Preview** if you want the contact form to
work on preview URLs too).

| Variable                             | Where to get it                                            | Required? |
| ------------------------------------ | ---------------------------------------------------------- | --------- |
| `NEXT_PUBLIC_SITE_URL`               | `https://flagsnepal.com`                                   | Yes       |
| `GOOGLE_MAPS_API_KEY`                | GCP Console → Credentials                                  | Optional* |
| `GOOGLE_PLACE_ID`                    | [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id) | Optional* |
| `RESEND_API_KEY`                     | Resend → Dashboard → API Keys                              | Yes       |
| `RESEND_FROM_EMAIL`                  | e.g. `"Flags Nepal <hello@flagsnepal.com>"`                | Yes (prod)|
| `CONTACT_INBOX_EMAIL`                | Inbox that should receive submissions                      | Optional  |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL`  | Google Maps → Share → Embed a map                           | Optional  |

_* Without Google Maps credentials, the homepage Testimonials section falls
back to the static rating card we built — it will not crash the site._

## 4) Resend (contact form email)

- Add your domain at **Resend → Domains**.
- Add the DNS records Resend shows you (SPF + DKIM + DMARC) at your registrar.
- Wait for the domain to show as **Verified** (can be minutes to hours).
- Only after verification, set `RESEND_FROM_EMAIL` to an address on that
  domain (e.g. `hello@flagsnepal.com`). Before verification, Resend only
  allows sending from `onboarding@resend.dev` and only to the account email —
  the contact form will *appear* to work for you but silently fail for
  strangers.
- Send a test submission from the live site and confirm it reaches
  `CONTACT_INBOX_EMAIL` (or `info@flagsnepal.com` by default).

## 5) Rate-limit upgrade path (do this when traffic grows)

The current limiter (`lib/rate-limit.ts`) is in-memory: **5 submissions per
IP per 10 minutes**. That works perfectly on a VPS. On Vercel serverless
functions, each cold start gets its own memory, so the limit is softer than
it looks — a determined attacker across many function instances can bypass
it.

When you see real spam in the inbox, swap to **Upstash Redis**:

1. Create a free Upstash Redis database.
2. Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to the host.
3. Install `@upstash/ratelimit @upstash/redis`.
4. Replace the implementation of `rateLimit()` in `lib/rate-limit.ts` —
   the call-site in `app/api/contact/route.ts` does not need to change.

No changes needed until you actually see abuse.

## 6) Observability (ship these when ready)

### Analytics (pick one)

- **Plausible** or **Umami** — privacy-friendly, no cookie banner needed.
- **Google Analytics 4** — broader tooling, requires a cookie-consent banner
  under Nepal / EU law if you ever take EU orders.

Track at minimum:

- Pageviews.
- WhatsApp FAB clicks (outbound link event).
- Contact form submissions (on success).
- "Shop Flags" hero CTA clicks.

### Error monitoring

- Create a free [Sentry](https://sentry.io) project (Next.js SDK).
- `npx @sentry/wizard@latest -i nextjs` — it will scaffold config and ask for
  the DSN.
- Most valuable signal will be failed `/api/contact` requests (Resend outages,
  validation failures), not runtime errors.

## 7) Post-launch smoke test

Run this checklist after the first production deployment:

- [ ] Homepage loads at `https://flagsnepal.com`.
- [ ] HTTPS redirect works: `http://…` → `https://…`.
- [ ] Response headers include `Strict-Transport-Security`,
      `X-Content-Type-Options: nosniff`, `Referrer-Policy`,
      `Permissions-Policy`. Check with `curl -I https://flagsnepal.com`.
- [ ] `/robots.txt` and `/sitemap.xml` resolve.
- [ ] Contact form submits successfully — confirm the email lands in the
      inbox, and that the `Reply-To` header is the submitter's email.
- [ ] Submit the form 6 times in a row as a single client — the 6th request
      should return HTTP 429 with a friendly UI message.
- [ ] WhatsApp FAB opens a chat with the correct prefilled message.
- [ ] Validate `LocalBusiness` and `FAQPage` JSON-LD at
      [Google Rich Results Test](https://search.google.com/test/rich-results).
- [ ] Check Lighthouse on mobile — aim for Performance ≥ 85, Accessibility ≥
      95, Best Practices = 100, SEO = 100.

---

Questions that keep coming up, worth answering once:

- **Is the site hard to hack?** There is no database, no auth, and no user
  accounts. The only write endpoint (`/api/contact`) is validated, size-
  capped, rate-limited, and honeypotted. Real risk is contact-form spam, not
  compromise.
- **Do we need a cookie banner?** Only if you add GA4, Meta Pixel, or any
  third-party script that sets non-essential cookies. Plausible and Umami
  are cookie-less and do not require a banner.
- **Do we need a WAF?** For a Nepal-hosted marketing site, Cloudflare free
  plan is plenty.

## 8) Image copy protection — what is in place

Defensive layers (shipped):

- **All public images are capped at 1024 px on the longest edge** — display
  resolution only. A copied file cannot be reprinted as a banner or poster; it
  is only usable for social-media sized re-posts.
- **Diagonal `flagsnepal.com` watermark** stamped across every image served
  from `/public`, covering:
  - `public/products/**` (41 files)
  - `public/works/**` (6 files)
  - `public/client-logos/**` (15 files — see trademark caveat below)
  - `public/hero-golden-pole-nepal-flag.{jpg,png}` (homepage hero)
  - `public/flags-nepal-logo*.png` (brand logos used in nav / footer)
- Pre-watermark originals preserved at `/.image-originals-backup/` (git-
  ignored). The mark is fully reversible — `cp -r .image-originals-backup/public/* public/`
  restores any subset.
- **Right-click → Save Image As blocked** site-wide via
  `components/layout/MediaGuard.tsx`.
- **Drag-to-desktop and iOS long-press Save** disabled via CSS in
  `app/globals.css` (`-webkit-user-drag`, `-webkit-touch-callout`).

**Trademark caveat on client logos.** The 15 third-party logos in
`public/client-logos/` (Ncell, Hyatt, Honda, Soaltee, Kantipur, etc.) are
watermarked at the site owner's instruction. Stamping additional text across a
registered trademark is not strictly covered by nominative fair use — if any
partner asks for removal, restore that specific logo from
`.image-originals-backup/public/client-logos/<name>.png` and exclude it from
future watermark runs by removing it from `public/client-logos/` and
maintaining a separate pristine copy.

## 9) Step-by-step Vercel deployment

This is the end-to-end path from "code on my laptop" to "site live at
flagsnepal.com". Plan for **30–45 minutes the first time**, mostly waiting for
DNS to propagate. After this initial setup, future deployments are automatic
on every git push.

### 9.1 Pre-flight — get the code onto GitHub

Vercel deploys from a git repository, so the code needs to live on GitHub
(or GitLab / Bitbucket — GitHub is by far the most common). Right now this
project has no remote — only one local commit from `create-next-app`.

1. **Create a GitHub account** if you don't already have one — https://github.com/signup. Free tier is fine.
2. **Create a new repository:**
   - Go to https://github.com/new
   - Repository name: `flags-nepal`
   - Set it to **Private** (recommended — your env files and business logic stay out of public view; Vercel can still read it once you authorize)
   - **Do NOT** initialise with a README, .gitignore, or licence — your local repo already has those
   - Click **Create repository**
3. **From your terminal, in the project root** (`/Users/mehoolshrestha/flags-nepal`):

   ```bash
   git add .
   git commit -m "Site rebuild: contact form, security headers, watermarks, SEO"
   git remote add origin https://github.com/<your-username>/flags-nepal.git
   git branch -M main
   git push -u origin main
   ```

   GitHub will prompt for credentials — use a **personal access token** (Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token, scope: `repo`). Paste the token when git asks for a "password".

### 9.2 Sign up for Vercel and import the repo

1. Go to https://vercel.com/signup and sign up **with your GitHub account** (one click — Vercel will read your repos).
2. After signup, on the Vercel dashboard, click **Add New… → Project**.
3. You'll see a list of your GitHub repos. Find `flags-nepal` and click **Import**.
4. Vercel auto-detects Next.js. **Do not change** the build settings.
5. Before clicking **Deploy**, expand **Environment Variables** and add the values from section 9.3 below. You can also add them after the first deploy — but the contact form and Google reviews won't work until they're set.
6. Click **Deploy**. First build takes ~2 minutes. When it finishes you'll see your live site at a `*.vercel.app` URL.

### 9.3 Environment variables — what to set in Vercel

Vercel project → Settings → Environment Variables. Add each as **Production** (and **Preview** if you also want preview branches to work):

| Variable | Required? | Value / where to get it |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | `https://flagsnepal.com` (no trailing slash) |
| `RESEND_API_KEY` | yes (for contact form) | https://resend.com → Dashboard → API Keys → "Create API Key" |
| `RESEND_FROM_EMAIL` | yes (for contact form) | `"Flags Nepal <hello@flagsnepal.com>"` — see 9.5 |
| `CONTACT_INBOX_EMAIL` | optional | Email address that should receive submissions; defaults to `info@flagsnepal.com` |
| `GOOGLE_MAPS_API_KEY` | optional | GCP → APIs & Services → Credentials. Without it, the homepage falls back to a static rating card |
| `GOOGLE_PLACE_ID` | optional | https://developers.google.com/maps/documentation/places/web-service/place-id |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` | optional | Google Maps → Share → Embed a map → copy the `src=` URL only |

After adding env vars, go to **Deployments**, click the most recent deployment, and click **Redeploy** so it picks them up.

### 9.4 Connect your custom domain — flagsnepal.com

1. **In Vercel:** Project → Settings → **Domains** → enter `flagsnepal.com` → **Add**.
2. Add `www.flagsnepal.com` too (Vercel will set up the redirect from `www` → apex automatically).
3. Vercel will show the **DNS records** you need to add. Copy them down. They will be approximately:

   | Type | Name / Host | Value | TTL |
   |---|---|---|---|
   | A | `@` (or empty / `flagsnepal.com`) | `76.76.21.21` | 3600 |
   | CNAME | `www` | `cname.vercel-dns.com` | 3600 |

   **Use the exact IP that Vercel shows you** — the value above is current at time of writing but can change. Always trust Vercel's UI over this doc.

4. **Go to your domain registrar** (whichever site you bought `flagsnepal.com` from — Namecheap, GoDaddy, Mercantile, etc.) → log in → find the **DNS Settings** / **Manage DNS** / **Nameservers** panel for the domain.
5. **Delete or replace** any existing A or CNAME records on `@` and `www` that point elsewhere. Add the two records from step 3.
6. **Save the changes.** DNS propagation usually takes **5–30 minutes**, occasionally up to a few hours. You can check progress at https://www.whatsmydns.net/ — paste in `flagsnepal.com` and watch it turn green globally.
7. Once DNS resolves, Vercel **automatically issues a free Let's Encrypt SSL certificate** within a few minutes. The site will become available at `https://flagsnepal.com` with the green padlock.

### 9.5 Resend — verify the domain so the contact form actually delivers

Until your domain is verified at Resend, contact-form emails will silently fail
for everyone except your own Resend account email. This is the most common
"why doesn't my contact form work in production?" issue, so do this carefully.

1. Log in at https://resend.com → **Domains** → **Add Domain** → enter `flagsnepal.com`.
2. Resend will display **3–4 DNS records** (one MX, one SPF TXT, one DKIM TXT, optionally one DMARC TXT).
3. Add each of those records at your **domain registrar's DNS panel** — same place you added the Vercel A/CNAME in 9.4. They are different record types so they don't conflict with the Vercel records.
4. Back in Resend, click **Verify**. Status flips to **Verified** within minutes (sometimes hours, depending on registrar).
5. Only AFTER it shows **Verified**, set `RESEND_FROM_EMAIL` in Vercel to an address on that domain (`"Flags Nepal <hello@flagsnepal.com>"`). Redeploy from Vercel → Deployments → Redeploy so the new value loads.
6. Submit a test message via the live `/contact` page. Confirm it lands in `CONTACT_INBOX_EMAIL` (or `info@flagsnepal.com` by default) and that the **Reply-To** header is the submitter's email so you can reply directly.

### 9.6 (Optional) Hardening once everything works

Do these *after* the site is live and confirmed working — they are improvements, not blockers:

- **Restrict the Google Maps API key** to Vercel's egress IPs (see section 2 above) so a leaked key cannot be abused.
- Set up **Google Search Console** → submit `https://flagsnepal.com/sitemap.xml`.
- Wire up **analytics** (Plausible / Umami / GA4) — see section 6 above.
- Wire up **Sentry** for runtime error monitoring — see section 6 above.
- Run the post-launch smoke test in section 7 above.

### 9.7 Future deployments — what changes from now on

You will never log into a server. The deploy loop is:

```bash
# Edit code locally → save → see it on http://localhost:3000 via npm run dev
git add .
git commit -m "Describe what changed"
git push
```

Vercel sees the push, builds, deploys to a preview URL automatically, and (if you push to `main`) promotes to production at `flagsnepal.com`. Total round-trip: ~90 seconds. No FTP, no SSH, no manual file copies, no server reboots.

---

What is NOT defended against (and cannot be on the web):

- Devtools → right-click image node → copy image URL → paste into a new tab.
- Browser screenshot / Cmd-Shift-4.
- Print-to-PDF of the page.

For any image you care about protecting at the "print-quality" tier, keep the
master **outside** `/public`. Only ship downscaled derivatives.

### Re-running the watermark

If you add new images to `public/products` or `public/works` later:

```bash
node scripts/watermark-images.mjs           # dry run, shows what will change
node scripts/watermark-images.mjs --apply   # writes watermarks + backs up originals
```

The script backs up each original to `.image-originals-backup/` exactly once,
so running it twice on the same file is safe only if you first restore the
original from the backup folder.
