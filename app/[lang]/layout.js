import { DM_Sans, DM_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { LANGUAGES, DEFAULT_LANGUAGE, getTexts } from "@/components/language/texts";

/**
 * Layout raíz — vive dentro de [lang] a propósito.
 *
 * El idioma tiene que estar en la URL para que Google indexe las dos
 * versiones; antes vivía solo en localStorage y el buscador únicamente veía
 * inglés. Como <html lang> depende de la ruta, el layout que lo renderiza
 * debe recibir el parámetro, y por eso el layout raíz está aquí y no en
 * app/layout.js. Es el patrón que Next documenta para i18n.
 */

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

/** Solo /en y /es existen; cualquier otro primer segmento es 404. */
export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}
export const dynamicParams = false;

const META = {
  en: {
    title: "mat.dev — Freelance web development & automation",
    description:
      "I build, improve and maintain web applications for businesses. Full-stack development with PHP, JavaScript, React and Node.js.",
    ogLocale: "en_US",
    previewAlt: "mat.dev — portfolio preview",
  },
  es: {
    title: "mat.dev — Desarrollo web y automatización freelance",
    description:
      "Construyo, mejoro y mantengo aplicaciones web para empresas. Desarrollo full-stack con PHP, JavaScript, React y Node.js.",
    ogLocale: "es_ES",
    previewAlt: "mat.dev — vista previa del portafolio",
  },
};

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const m = META[lang] ?? META[DEFAULT_LANGUAGE];

  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.description,
    keywords: [
      "freelance web developer",
      "desarrollo web a medida",
      "web application development",
      "API integration",
      "business automation",
      "PHP",
      "JavaScript",
      "React",
      "Node.js",
    ],
    authors: [{ name: "Mateo Garcia" }],
    // hreflang: le dice a Google que son la misma página en dos idiomas,
    // en vez de dos páginas compitiendo entre sí.
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        es: "/es",
        "x-default": "/en",
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${SITE_URL}/${lang}`,
      siteName: "mat.dev",
      locale: m.ogLocale,
      type: "website",
      images: [
        { url: `/preview-${lang}.jpg`, width: 1200, height: 630, alt: m.previewAlt },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [`/preview-${lang}.jpg`],
    },
    robots: { index: true, follow: true },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
  ],
};

// ── Script anti-flash de tema (inline, antes del primer paint) ───────
// Solo el tema: el idioma ahora lo decide la ruta, no localStorage.
const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('mat-dev-theme');
      if (t !== 'dark' && t !== 'light') {
        t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', t);
    } catch (e) {}
  })();
`;

// Sin JavaScript, los bloques .fade-up quedarían en opacity:0 y la página
// se vería en blanco (también para crawlers que no ejecutan JS).
const noScriptStyles = `.fade-up{opacity:1!important;transform:none!important}`;

/** JSON-LD: ayuda a Google a asociar el sitio con una persona concreta. */
function buildJsonLd(lang) {
  const m = META[lang] ?? META[DEFAULT_LANGUAGE];
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    inLanguage: lang,
    url: `${SITE_URL}/${lang}`,
    mainEntity: {
      "@type": "Person",
      name: "Mateo Garcia",
      alternateName: "mat.dev",
      url: SITE_URL,
      jobTitle: lang === "es" ? "Desarrollador Full-stack" : "Full-stack Developer",
      description: m.description,
      email: "mailto:dev.mathew.coded@gmail.com",
      knowsLanguage: ["es", "en"],
      knowsAbout: [
        "Web application development",
        "API integration",
        "Business process automation",
        "PHP",
        "JavaScript",
        "React",
        "Node.js",
      ],
      sameAs: [
        "https://github.com/DevMathw",
        "https://www.linkedin.com/in/mateo-garcia-rodriguez-933135207/",
      ],
    },
  };
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  if (!LANGUAGES.includes(lang)) notFound();

  const t = getTexts(lang);

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${dmSans.variable} ${dmMono.variable}`}
    >
      <head>
        {/* El JSON-LD sí va como <script> nativo: es dato, no código, y React
            no avisa de los type que no son JavaScript. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            // Escapar "<" evita cerrar la etiqueta desde el contenido (Next lo
            // recomienda en su guía de JSON-LD).
            __html: JSON.stringify(buildJsonLd(lang)).replace(/</g, "\u003c"),
          }}
        />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: noScriptStyles }} />
        </noscript>
      </head>
      <body>
        {/* El script va dentro de un div y no como <script> de JSX porque
            React avisa de todo <script> ejecutable que renderiza: su render
            de cliente no los ejecuta. Aquí lo ejecuta el parser del navegador
            al leer el HTML del servidor, que es cuando hace falta (antes del
            primer paint). En navegación de cliente lo repone SiteContent.
            next/script con beforeInteractive no sirve: encola el inline en
            self.__next_s y lo corre tras el runtime, devolviendo el flash. */}
        <div
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: `<script>${themeScript}</script>` }}
        />

        {/* Skip link para accesibilidad con teclado */}
        <a href="#main-content" className="skip-link">
          {t.a11y.skipToContent}
        </a>
        <main id="main-content">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
