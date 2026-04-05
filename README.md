# mathw.dev — Personal Portfolio

> Live site: **[mathw.dev](https://mathw.dev)**

A fast, bilingual (EN/ES) developer portfolio built with Next.js 14 and Tailwind CSS. Designed to be clean, accessible, and easy to maintain.

---

## Preview

![Portfolio preview](./public/preview.png)

---

## Features

- Dark / light mode with system preference detection
- Bilingual support — English and Spanish
- Smooth scroll navigation
- Contact form via Web3Forms (no backend needed)
- Deployed on Vercel with custom domain

---

## Tech stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Framework  | Next.js 14 (App Router)           |
| Styling    | Tailwind CSS                      |
| Forms      | Web3Forms                         |
| Deployment | Vercel + custom domain (mathw.dev)|

---

## Getting started

```bash
# 1. Clone the repo
git clone https://github.com/DevMathw/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Add your Web3Forms access key to .env.local

# 4. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment variables

Create a `.env.local` file in the root with the following:

```env
NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
```

Get your free key at [web3forms.com](https://web3forms.com).

---

## Project structure

```
portfolio/
├── app/             # Next.js App Router pages and layout
├── components/      # Reusable UI components
├── assets/          # Static assets (fonts, icons)
├── public/          # Public files (images, CV, favicon)
└── tailwind.config  # Tailwind configuration
```

---

## Deployment

The site is deployed on Vercel and available at [mathw.dev](https://mathw.dev).

To deploy your own fork:

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Connect your custom domain

---

## Contact

**Mateo Garcia** — Full-stack Developer  
[mathw.dev](https://mathw.dev) · [LinkedIn](https://www.linkedin.com/in/mateo-garcia-rodriguez-933135207/) · [hello@mathw.dev](mailto:dev.mathew.coded@gmail.com)