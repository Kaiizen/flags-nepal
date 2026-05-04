# Flags Nepal — Technical hosting specification

Use this document to ask your provider **whether this project can run on your plan** and what to configure (Node, SSL, env, outbound access).

**Project name:** `flags-nepal` (Next.js marketing site with contact API and optional Google data).

---

## 1) Application type

| Item | Value |
| --- | --- |
| **Framework** | **Next.js** `14.2.21` (App Router) |
| **UI** | React `18.3.1` |
| **Language** | TypeScript + Tailwind CSS |
| **Build tool** | `next build` |
| **Production process** | `next start` (Node HTTP server) |

This is a **server-rendered and static hybrid** app (SSR/SSG/ISR as Next decides per route), **not** a flat PHP/WordPress site and **not** a pure static export unless you change the app.

---

## 2) Node.js requirement

- **Required:** **Node.js 18.17+** (LTS) or **20.x** (recommended target).
- This repository pins runtime intent via:
  - `package.json` engines: `>=20 <21`
  - `.nvmrc`: `20`
- If your host supports Node 24, prefer **Node 20 LTS** for production stability with this app.

**Build & run commands**

```bash
npm ci
npm run build
npm run start
```

- Default listen port: **3000** (configure reverse proxy in cPanel/nginx to 80/443, or set `PORT` if the host documents it).
- **Process model:** one long‑lived `next start` (often behind Passenger or PM2, per host docs).

---

## 3) Database and external services

| Component | Used? | Notes |
| --- | ---: | --- |
| **MySQL / PostgreSQL / MongoDB** | **No** | No database in this repository. `Unlimited MySQL` is not required for the app to run. |
| **Redis / memcached** | **No** | Not required. |
| **In-memory store** | **Yes** | Contact form rate limiting uses a **per-process in-memory** map. Fine on a **single Node instance**; on **multiple instances** the limit is soft (each process has its own memory). |
| **Email (Resend API)** | **Yes** (contact form) | Server calls `https://api.resend.com` with API key. |
| **Google Places (optional)** | **Yes** (homepage) | If env vars are set, server calls Google Places for reviews. If unset, the UI falls back — site still runs. |
| **Google Fonts (TTF, optional)** | **Yes** (OG image) | Open Graph image may fetch a font from `fonts.gstatic.com` at **request** time. |

---

## 4) Outbound network (must be allowed for full functionality)

The Node process must be allowed **outgoing HTTPS (TCP 443)** to the public internet (standard for API clients — **not** the same as “open a custom inbound port on the server”):

| Destination (examples) | Purpose |
| --- | --- |
| `api.resend.com` | Contact form email delivery |
| `maps.googleapis.com` (and related Google API hosts) | Optional live Google review text |
| `fonts.gstatic.com` | Optional font for social preview image (OG) |

**Minimum for contact form to work in production:** **Resend API reachable** + **`RESEND_API_KEY`** set.

---

## 5) Inbound / SSL / visitors

- Site should be served to browsers over **HTTPS (port 443)** for the public domain. Next.js is typically behind the host’s **reverse proxy** (Apache/Nginx) terminating SSL; the app may listen on `127.0.0.1:PORT` only.

---

## 6) Environment variables (production)

Set these in the host’s **Node / application environment** (cPanel “Environment” or similar). Copy from project `.env.example` for names.

| Variable | Required for | Note |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Yes** (canonical, SEO) | e.g. `https://flagsnepal.com` — no trailing slash |
| `RESEND_API_KEY` | **Yes** (contact form) | From Resend dashboard |
| `RESEND_FROM_EMAIL` | **Recommended** | Verified domain address in Resend, e.g. `Flags Nepal <hello@flagsnepal.com>` |
| `CONTACT_INBOX_EMAIL` | **Optional** | Inbox for submissions; defaults in code if unset |
| `GOOGLE_MAPS_API_KEY` | **Optional** | For live Google reviews on homepage |
| `GOOGLE_PLACE_ID` | **Optional** | Recommended with Places for stable reviews |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` | **Optional** | Only if you override the default Maps embed for `/contact` |

**No secrets in the browser** except `NEXT_PUBLIC_*` (public by design).

---

## 7) Key HTTP routes to test after deploy

| Path | behaviour |
| --- | --- |
| `/` | Home (SSR/SSG) |
| `/contact` | Form posts to `POST /api/contact` (JSON) |
| `/api/contact` | Resend + validation + rate limit; returns JSON |
| `/shop`, `/shop/[slug]` | Product pages, images from `public/` |
| `/sitemap.xml`, `/robots.txt` | SEO |

---

## 8) Resource expectations (rough)

- **Build:** `npm run build` is CPU/RAM–heavy for a few minutes. **~2GB RAM** on the account (host’s LVE) is often enough; if OOM, increase plan or build on CI and upload `.next` (host-dependent).
- **Runtime:** A single `next start` is moderate; image optimization uses **sharp** in production (Next bundles/lazy-loads as needed). Large traffic may need more CPU/RAM per host policy.

---

## 9) Security / headers

`next.config.mjs` sets response headers: **HSTS**, **X-Content-Type-Options**, **Referrer-Policy**, **X-Frame-Options**, **Permissions-Policy**. The host may also add its own; avoid duplicate/conflicting HSTS in Apache if next headers already send it.

---

## 10) Open Graph image

- `app/opengraph-image.tsx` uses the **Node.js** runtime so the social preview image works the same on **self‑hosted** (`next start` / standalone) and on Vercel.

---

## 11) Checklist to send the hosting provider (yes/no)

1. We can run **Node 18+** and **`npm run build` + `next start`**.  
2. We can set **environment variables** for the Node app.  
3. **HTTPS** is supported for the site’s domain.  
4. The Node app can make **outgoing HTTPS** to `api.resend.com` and (if used) Google APIs.  
5. (Optional) **No database** is required.  
6. (Optional) **One** persistent Node process (or the host’s approved process manager) is allowed.

**If 1–4 are true, this project is compatible** with the stack described here.

---

## 12) cPanel deployment runbook (shared hosting)

Use this when your provider supports Node apps in cPanel.

1. **Create Node app in cPanel**
   - Node version: `20.x`
   - Application mode: `production`
   - Application root: repository root
2. **Set environment variables**
   - Add all required values from `.env.example`
3. **Install and build from SSH / terminal**
   ```bash
   npm ci
   npm run build:cpanel
   ```
   - `build:cpanel` runs `next build` then copies `public/` and `.next/static` into `.next/standalone` (required for static assets when using the standalone server).
   - Alternatively, `npm run build` alone is fine if the host runs **`npm run start`** from the **repository root** (full `.next`).
4. **Startup command**
   - **Recommended (full checkout on server):** `npm run start` from the repo root — Next listens on `PORT` or `3000`.
   - **Lean standalone:** set the app root to **`.next/standalone`**, startup **`node server.js`**, still with env vars configured for the Node process — same as **`npm run start:standalone`** from the repo root after `build:cpanel`.
5. **Map domain + SSL**
   - Ensure domain points to the Node app and HTTPS is enabled
6. **Post-deploy smoke test**
   - `/`
   - `/contact`
   - `POST /api/contact`
   - `/sitemap.xml`
   - `/robots.txt`

---

## 13) cPanel — build on your Mac, upload standalone (weak server RAM)

Some shared hosts kill `next build`. Build **locally**, then upload the **standalone** bundle only.

**Why `build:cpanel`, not bare `npm run build`:**  
`npm run build:cpanel` runs `next build` **and** copies `public/` and `.next/static` into `.next/standalone/`. Plain `npm run build` leaves standalone **without** those copies unless you run the helper script manually — layouts/images will break.

### A) Local (your computer)

Use **Node 20** locally (same major as production).

```bash
cd flags-nepal
npm ci
npm run build:cpanel
```

Sanity checks:

```bash
test -f .next/standalone/server.js && echo "standalone ok"
test -d .next/standalone/public && echo "public copied into standalone ok"
test -d .next/standalone/.next/static && echo "static copied into standalone ok"
```

### B) What to upload

Minimum for the **repository-root** launcher (`server.js` → loads `.next/standalone/server.js`):

| Local path | Remote path (example — match your real app folder) |
| --- | --- |
| Entire folder `.next/standalone/` | `…/flags-nepal/.next/standalone/` (replace wholesale each deploy) |
| `server.js` (repo root) | `…/flags-nepal/server.js` |

If the Node app **`cd`s into standalone** instead, upload only `.next/standalone/` and start with **`node server.js`** inside that directory — no root `server.js` required.

**You do not** need separate `scp` uploads for `.next/static/` and `public/` when you used **`npm run build:cpanel`**; they are already inside `.next/standalone/`.

### C) SCP (from your Mac, fix paths/usernames)

Replace `USER`, host, and the remote directory with yours (your example base: `/home2/flagsnep/flags-nepal`).

```bash
# Recommended: rsync replaces old standalone cleanly
rsync -avz --delete .next/standalone/ USER@flagsnepal.com:/home2/flagsnep/flags-nepal/.next/standalone/

scp server.js USER@flagsnepal.com:/home2/flagsnep/flags-nepal/server.js
```

**Wrong pattern to avoid:** copying `.next/standalone/*` directly into `.next/` (mixes standalone with other build junk). Always keep **`…/.next/standalone/`** as a single subtree.

Equivalent with `scp`:

```bash
ssh USER@flagsnepal.com "rm -rf /home2/flagsnep/flags-nepal/.next/standalone && mkdir -p /home2/flagsnep/flags-nepal/.next"

scp -r .next/standalone USER@flagsnepal.com:/home2/flagsnep/flags-nepal/.next/

scp server.js USER@flagsnepal.com:/home2/flagsnep/flags-nepal/server.js
```

### D) File Manager instead of SCP

Locally zip **`standalone`** contents or the **`standalone`** folder; on the server delete (or overwrite) **`…/.next/standalone/`**, extract so **`server.js` inside standalone** stays at **`…/.next/standalone/server.js`**. Upload **`server.js`** to repo root separately if your host uses the root launcher.

### E) cPanel Node app settings

- **Application root:** `…/flags-nepal` (folder with **`package.json`** or at least **`server.js`** — if you only uploaded standalone + root launcher, keep **`server.js`** and **`.next/standalone`** as above).
- **Startup:** **`server.js`**
- **Environment variables:** set production values from `.env.example`
- **Restart** the application after upload.

Then run the smoke tests from **§12**.

---

*Generated from the `flags-nepal` repository. Update versions if `package.json` changes.*
