import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

// ── Fuentes ──────────────────────────────────────────────────
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const SITE_URL = "https://mathw.dev";

// ── Metadata ─────────────────────────────────────────────────
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "mat.dev — Full-stack Developer",
  description:
    "Full-stack developer with 3 years of experience building reliable, scalable web applications. PHP, JavaScript, React, Node.js.",
  keywords: ["full-stack developer", "web developer", "PHP", "JavaScript", "React", "Node.js"],
  authors: [{ name: "Mateo Garcia" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mateo Garcia — Full-stack Developer",
    description:
      "Full-stack developer focused on building reliable and scalable web applications.",
    url: SITE_URL,
    siteName: "mat.dev",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/preview.png",
        width: 1916,
        height: 865,
        alt: "mat.dev — portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mateo Garcia — Full-stack Developer",
    description: "Full-stack developer focused on building reliable and scalable web apps.",
    images: ["/preview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Next gestiona la meta viewport a través de este export (antes estaba
// escrita a mano en el <head>).
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
  ],
};

// ── Script anti-flash (inline, antes del primer paint) ───────
// Aplica tema e idioma guardados sobre el <html> antes de que el browser
// pinte, evitando el flash blanco y el parpadeo de idioma en la hidratación.
const bootScript = `
  (function() {
    try {
      var d = document.documentElement;
      var theme = localStorage.getItem('mat-dev-theme');
      if (theme !== 'dark' && theme !== 'light') {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      d.setAttribute('data-theme', theme);

      var lang = localStorage.getItem('mat-dev-lang');
      if (lang === 'en' || lang === 'es') d.setAttribute('lang', lang);
    } catch (e) {}
  })();
`;

// Sin JavaScript, los bloques .fade-up quedarían en opacity:0 y la página
// se vería en blanco (también para crawlers que no ejecutan JS).
const noScriptStyles = `.fade-up{opacity:1!important;transform:none!important}.skill-fill{width:var(--w)!important}`;

// ── Root Layout ───────────────────────────────────────────────
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${dmMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: noScriptStyles }} />
        </noscript>
      </head>
      <body>
        {/* Skip link para accesibilidad con teclado */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
