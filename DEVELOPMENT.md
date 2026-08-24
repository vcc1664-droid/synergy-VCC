# VCC React — Development Guide

## Prerequisites

- **Node.js** v18 or later — [nodejs.org](https://nodejs.org)
- **npm** (bundled with Node)

## Install dependencies

```bash
npm install
```

## Run the dev server

```bash
npm run dev
```

Opens at **http://localhost:5173** by default (Vite will print the exact URL).  
Hot-module replacement is enabled — changes to `.jsx`, `.js`, and `.css` files reload instantly without a full page refresh.

## Build for production

```bash
npm run build
```

Output goes to `dist/`. The build:
- minifies JS with Terser (two-pass, drops `console.*`)
- minifies CSS
- splits vendor chunks (`react-dom`, `react-router`, `react-helmet`) for better caching

## Preview the production build locally

```bash
npm run preview
```

Serves the `dist/` folder at **http://localhost:4173**.  
Use this to verify the build before deploying — it mirrors exactly what will run in production.

## Project structure

```
vcc-react/
├── public/              # Static assets (images, icons) — copied as-is to dist/
├── src/
│   ├── components/      # Shared UI components (Navigation, Footer, Loader, …)
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Route-level page components
│   │   └── Home/        # Home page split into sub-sections
│   └── styles/
│       └── global.css   # Single global stylesheet
├── index.html           # HTML entry point
├── vite.config.js       # Vite + build configuration
└── package.json
```

## Routing

The app uses **HashRouter** (`react-router-dom`), so URLs look like `/#/about`.  
This means the site works on any static host without server-side redirect rules.

| Path              | Page component          |
|-------------------|-------------------------|
| `/`               | `src/pages/Home/`       |
| `/about`          | `src/pages/About.jsx`   |
| `/services`       | `src/pages/Services.jsx`|
| `/facilities`     | `src/pages/Facilities.jsx` |
| `/edge`           | `src/pages/Edge.jsx`    |
| `/privacy-policy` | `src/pages/PrivacyPolicy.jsx` |
| `/legal-terms`    | `src/pages/LegalTerms.jsx` |

## Deployment

Copy the contents of `dist/` to any static host (Netlify, Vercel, GitHub Pages, S3, etc.).  
No server-side configuration is required because of HashRouter.
