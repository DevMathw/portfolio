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

// ── Metadata ─────────────────────────────────────────────────
export const metadata = {
  title: "mat.dev — Full-stack Developer",
  description:
    "Full-stack developer with 3 years of experience building reliable, scalable web applications. PHP, JavaScript, React, Node.js.",
  keywords: ["full-stack developer", "web developer", "PHP", "JavaScript", "React", "Node.js"],
  authors: [{ name: "Mateo Garcia" }],
  openGraph: {
    title: "Mateo Garcia — Full-stack Developer",
    description:
      "Full-stack developer focused on building reliable and scalable web applications.",
    url: "https://portfolio-nine-henna-77.vercel.app",
    siteName: "mat.dev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mateo Garcia — Full-stack Developer",
    description: "Full-stack developer focused on building reliable and scalable web apps.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ── Script anti-flash de tema (inline, antes del render) ─────
// Lee la preferencia guardada en localStorage y aplica el
// data-theme ANTES de que el browser pinte la página.
// Esto evita el flash blanco en usuarios que prefieren dark.
const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('mat-dev-theme');
      var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      var theme = saved || preferred;
      document.documentElement.setAttribute('data-theme', theme);
    } catch(e) {}
  })();
`;

// ── Root Layout ───────────────────────────────────────────────
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${dmMono.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Anti-flash de tema: se ejecuta de forma síncrona antes del paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {/* Skip link para accesibilidad con teclado */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
