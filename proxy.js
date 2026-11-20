import { NextResponse } from "next/server";
import { LANGUAGES, DEFAULT_LANGUAGE } from "@/components/language/texts";

/**
 * Lleva cualquier ruta sin locale a /en (o /es si el navegador lo prefiere).
 * Sin esto, "/" no existiría: el idioma ahora es el primer segmento.
 *
 * Se llama proxy.js y no middleware.js porque Next 16.3 deprecó ese nombre.
 */
export default function proxy(request) {
  const { pathname } = request.nextUrl;

  const hasLocale = LANGUAGES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  // Respeta el idioma del navegador en la primera visita
  const accept = request.headers.get("accept-language") ?? "";
  const preferred = accept.toLowerCase().startsWith("es") ? "es" : DEFAULT_LANGUAGE;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Deja fuera assets, metadatos y rutas internas de Next
  matcher: [
    "/((?!_next/|api/|.*\..*|robots\.txt|sitemap\.xml).*)",
  ],
};
