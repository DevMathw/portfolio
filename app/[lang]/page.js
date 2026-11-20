import SiteContent from "@/components/SiteContent";

/** El idioma viene de la ruta; el resto de la página es cliente. */
export default async function Page({ params }) {
  const { lang } = await params;
  return <SiteContent language={lang} />;
}
