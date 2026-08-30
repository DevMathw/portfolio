"use client";
import { useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import About from "@/components/About";
import Service from "@/components/Services";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useHtmlPreference } from "@/components/hooks/useHtmlPreference";
import { DEFAULT_LANGUAGE, LANGUAGES } from "@/components/language/texts";

/**
 * page.js
 * - Tema e idioma viven como atributos del <html> (data-theme / lang), que
 *   el script inline de layout.js ya aplica antes del primer paint.
 *   useHtmlPreference los lee sin duplicar estado ni provocar parpadeos.
 * - Un único IntersectionObserver para todas las animaciones .fade-up.
 */

const THEMES = ["dark", "light"];

export default function Home() {
  const [theme, setTheme] = useHtmlPreference({
    attribute: "data-theme",
    storageKey: "mat-dev-theme",
    values: THEMES,
    serverValue: "dark",
  });

  const [language, setLanguage] = useHtmlPreference({
    attribute: "lang",
    storageKey: "mat-dev-lang",
    values: LANGUAGES,
    serverValue: DEFAULT_LANGUAGE,
  });

  const toggleTheme = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme, setTheme]
  );

  const toggleLanguage = useCallback(
    () => setLanguage(language === "en" ? "es" : "en"),
    [language, setLanguage]
  );

  // ── Observer único de fade-up ────────────────────────────────
  // Antes había cuatro observers (uno global y uno por sección) haciendo
  // exactamente el mismo trabajo sobre los mismos elementos.
  useEffect(() => {
    // Si el usuario prefiere menos movimiento, el CSS ya deja todo visible.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("visible");
          // Las barras de skills comparten el mismo disparador. Se observa
          // el contenedor (.skill-item) y no la barra: .skill-fill nace con
          // width:0 y un elemento sin área es un objetivo poco fiable.
          entry.target
            .querySelectorAll(".skill-fill")
            .forEach((bar) => bar.classList.add("animate"));
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );

    document
      .querySelectorAll(".fade-up:not(.visible), .skill-item")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar
        language={language}
        toggleLanguage={toggleLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <Header language={language} />
      <About language={language} />
      <Service language={language} />
      <Work language={language} />
      <Contact language={language} />
      <Footer language={language} />
    </>
  );
}
