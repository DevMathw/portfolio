"use client";
import { useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useHtmlPreference } from "@/components/hooks/useHtmlPreference";

/**
 * SiteContent — la página, como componente de cliente.
 *
 * El idioma ya NO es estado: lo fija la ruta (/en, /es) y llega como prop
 * desde el componente de servidor. Cambiar de idioma es navegar, lo que
 * además hace que cada versión tenga su propia URL indexable.
 *
 * El tema sí sigue siendo preferencia del visitante, no de la URL.
 */

const THEMES = ["dark", "light"];

export default function SiteContent({ language }) {
  const [theme, setTheme] = useHtmlPreference({
    attribute: "data-theme",
    storageKey: "mat-dev-theme",
    values: THEMES,
    serverValue: "dark",
  });

  const toggleTheme = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme, setTheme]
  );

  // Cambiar de idioma es una navegación de cliente, y en ella React
  // re-renderiza <html> y se lleva por delante el data-theme (el script
  // anti-flash solo corre en carga completa). Lo reponemos desde el
  // almacenamiento para que el tema elegido sobreviva al cambio de idioma.
  useEffect(() => {
    const el = document.documentElement;
    if (THEMES.includes(el.getAttribute("data-theme"))) return;
    let saved = null;
    try {
      saved = localStorage.getItem("mat-dev-theme");
    } catch {
      /* almacenamiento no disponible */
    }
    el.setAttribute("data-theme", THEMES.includes(saved) ? saved : "dark");
  });

  // ── Observer único de fade-up ────────────────────────────────
  useEffect(() => {
    // Si el usuario prefiere menos movimiento, el CSS ya deja todo visible.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );

    document
      .querySelectorAll(".fade-up:not(.visible)")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar
        language={language}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <Header language={language} />
      <Services language={language} />
      <Work language={language} />
      <Experience language={language} />
      <About language={language} />
      <Contact language={language} />
      <Footer language={language} />
    </>
  );
}
