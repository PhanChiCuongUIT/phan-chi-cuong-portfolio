# Phan Chi Cuong — Portfolio

A responsive, bilingual portfolio built with React, TypeScript and Vite. The content is grounded in `PhanChiCuong_Internship_Resume.pdf` and the local FreshTrace / EcoQuest Campus documentation. Project galleries use actual application screenshots, with desktop and mobile views. See `SCREENSHOTS.md` for their sources.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite. For a production check:

```bash
npm run build
npm run preview
```

Run browser smoke tests with `npm run test:e2e` (Playwright Chromium is required).

## Deploy on Vercel

1. Push this folder to its own GitHub repository, or import the containing repository and set **Root Directory** to `portfolio`.
2. Import it on Vercel. Framework preset: **Vite**; build command: `npm run build`; output directory: `dist`.
3. Deploy. No environment variables or backend are required.
4. Add your custom domain in Vercel if you own one. Once the URL is known, add a canonical URL and `og:url` to `index.html`.

The included `vercel.json` defines the build/output settings. This is a single page with fragment links rather than client-side routes, so no SPA rewrite is needed.

## Content to keep current

- `src/content.ts`: English and Vietnamese copy, project links, skills.
- `public/projects/`: original project screenshots; gallery captions and ordering live in `src/content.ts`.
- `public/PhanChiCuong_Internship_Resume.pdf`: downloadable CV.
- `index.html` and `public/og-cover.svg`: metadata and social preview.

The contact action opens the visitor's email app; no messages are stored by this site. Do not commit secrets or private project environment files.
