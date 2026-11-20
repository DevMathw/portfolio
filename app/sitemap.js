import { LANGUAGES } from "@/components/language/texts";

const SITE_URL = "https://mathw.dev";

export default function sitemap() {
  const now = new Date();
  // Cada idioma es una URL propia, y cada una declara a la otra como
  // alternativa para que Google no las trate como contenido duplicado.
  return LANGUAGES.map((lang) => ({
    url: `${SITE_URL}/${lang}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: lang === "en" ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(LANGUAGES.map((l) => [l, `${SITE_URL}/${l}`])),
    },
  }));
}
