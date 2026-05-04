# Flags Nepal

Marketing site and product catalog for Flags Nepal, built with Next.js App Router.

## Runtime requirements

- Node.js `20.x` (see `.nvmrc` and `package.json` engines)
- npm `10+`

## Local development

```bash
nvm use
npm install
npm run dev
```

## Production run

```bash
npm ci
npm run build
npm run start
```

## Shared hosting (cPanel + Node) quick checklist

1. Select Node `20.x` in your Node app manager.
2. Set environment variables from `.env.example` in cPanel.
3. Install dependencies and build:
   - `npm ci`
   - `npm run build`
4. Start the app with `npm run start`.
5. Configure domain + SSL and reverse proxy to the Node app port.

For full compatibility and infrastructure notes, see `docs/hosting-technical-spec.md`.
