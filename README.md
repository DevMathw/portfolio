# mathw.dev — Personal Portfolio

> Live site: **[mathw.dev](https://mathw.dev)**

A fast, bilingual (EN/ES) developer portfolio built with Next.js and a
hand-written CSS design system. Designed to be clean, accessible, and easy
to maintain.

---

## Preview

![Portfolio preview](./public/preview.png)

---

## Features

- Dark / light mode with system preference detection and no flash on load
- Bilingual support — English and Spanish, both persisted across visits
- Smooth scroll navigation with active-section highlighting
- Contact form via Web3Forms (no backend needed), with inline validation
  and a honeypot against spam
- Accessible by default: skip link, focus rings, ARIA on the form and menu,
  and full support for `prefers-reduced-motion`
- Renders readable content without JavaScript
- Statically prerendered and deployed on Vercel

---

## Tech stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Framework  | Next.js 16 (App Router, Turbopack)      |
| Language   | JavaScript (JSX), React 19              |
| Styling    | Plain CSS with custom properties        |
| Forms      | Web3Forms                               |
| Deployment | Vercel + custom domain (mathw.dev)      |

There is no CSS framework: the whole design system lives in
[`app/globals.css`](app/globals.css) as CSS custom properties
(`--bg-base`, `--accent`, `--space-*`, …), consumed by semantic class names.

---

## Getting started

Requires **Node.js 24.x**.

```bash
git clone https://github.com/DevMathw/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Command         | What it does                              |
|-----------------|-------------------------------------------|
| `npm run dev`   | Dev server with Turbopack                 |
| `npm run build` | Production build                          |
| `npm start`     | Serve the production build                |
| `npm run lint`  | ESLint (flat config, `next/core-web-vitals`) |

---

## Environment variables

Optional. The contact form works out of the box with a built-in fallback
key; set this only if you want to point the form at your own inbox.

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
```

Get a free key at [web3forms.com](https://web3forms.com). Note this is a
**public** access key by design — it is sent from the browser and is not a
secret. It lives in an env var so it can be rotated without a code change.

---

## Project structure

```
portfolio/
├── app/
│   ├── layout.js        # Fonts, metadata, pre-paint theme/lang script
│   ├── page.js          # Root state (theme, language) + scroll observer
│   ├── globals.css      # Full design system: tokens, components, themes
│   ├── sitemap.js       # /sitemap.xml
│   └── robots.js        # /robots.txt
├── components/
│   ├── Navbar.jsx       # Nav, mobile menu, theme + language toggles
│   ├── Header.jsx       # Hero
│   ├── About.jsx        # Bio + skills
│   ├── Work.jsx         # Projects (data lives in the component)
│   ├── Contact.jsx      # Web3Forms contact form
│   ├── Footer.jsx
│   ├── hooks/
│   │   ├── useActiveSection.js   # Active nav section on scroll
│   │   └── useHtmlPreference.js  # Theme/lang stored on <html> + storage
│   └── language/
│       └── texts.js     # Single source of truth for every UI string
└── public/              # CV PDFs, logo, OG preview image
```

### How theme and language work

Both are stored as attributes on `<html>` (`data-theme` and `lang`) and
mirrored to `localStorage`. An inline script in `layout.js` applies the
saved values **before the first paint**, which avoids the white flash and
the language flicker. React reads them through `useHtmlPreference`
(`useSyncExternalStore`), so the DOM stays the single source of truth and
there is no hydration mismatch.

All UI strings live in `components/language/texts.js`. To add a language,
add its key there and to `LANGUAGES`.

---

## Deployment

Deployed on Vercel at [mathw.dev](https://mathw.dev).

To deploy your own fork:

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. (Optional) Add `NEXT_PUBLIC_WEB3FORMS_KEY` in the Vercel dashboard
4. Connect your custom domain

---

## Contact

**Mateo Garcia** — Full-stack Developer
[mathw.dev](https://mathw.dev) · [LinkedIn](https://www.linkedin.com/in/mateo-garcia-rodriguez-933135207/) · [dev.mathew.coded@gmail.com](mailto:dev.mathew.coded@gmail.com)
