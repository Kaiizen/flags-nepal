# Flags Nepal SEO Launch Checklist

## 1) Before deployment

- Confirm `NEXT_PUBLIC_SITE_URL` is set to the production domain.
- Build and run locally to verify metadata output:
  - `npm run build`
  - `npm run start`
- Spot-check key pages:
  - `/`
  - `/about`
  - `/services`
  - `/works`
  - `/shop`
  - `/contact`
  - one `/shop/[slug]` page

## 2) Technical SEO checks

- Confirm canonical tags point to production URLs.
- Confirm `robots.txt` resolves and includes sitemap URL.
- Confirm `sitemap.xml` resolves and includes:
  - all core pages
  - catalogue product pages
- Validate Open Graph and Twitter previews for:
  - homepage
  - one product page

## 3) Structured data checks

- Validate JSON-LD in Google Rich Results Test:
  - `LocalBusiness` on site layout
  - `FAQPage` on homepage
  - `Product` on product detail page
  - `BreadcrumbList` on key pages
- Fix any critical warnings (non-critical optional fields can be iterated later).

## 4) Search Console setup

- Add and verify the property in Google Search Console:
  - preferably Domain property
  - URL prefix property as fallback
- Submit `https://<your-domain>/sitemap.xml`.
- Use URL Inspection to request indexing for:
  - homepage
  - `/shop`
  - two high-priority product pages
- Check Indexing > Pages for blocked or duplicate canonical issues.

## 5) Bing Webmaster setup

- Add site property.
- Submit sitemap URL.
- Run site scan and resolve critical crawl errors.

## 6) 2-week post-launch monitoring

- Weekly checks:
  - search impressions/clicks trend
  - indexed pages count trend
  - crawl anomalies or spikes in excluded pages
- Refresh metadata copy for pages with high impressions but low CTR.
- Expand FAQs and product descriptions for long-tail search terms.
