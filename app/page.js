"use client";
import { useState, useEffect } from "react";
import Navbar   from "@/components/Navbar";
import Header     from "@/components/Header";
import About    from "@/components/About";
import Work     from "@/components/Work";
import Contact  from "@/components/Contact";
import Footer   from "@/components/Footer";

/**
 * page.js — versión mejorada
 * - Observer global para .fade-up
 * - Estado de idioma y tema en la raíz
 * - Persistencia de tema en localStorage
 * - Respeta prefers-color-scheme del SO
 */

export default function Home() {
  // ── Tema ────────────────────────────────────────────────────
  const [theme, setTheme] = useState("dark"); // SSR-safe default

  useEffect(() => {
    // Leer tema inicial (ya aplicado en el HTML por el script anti-flash del layout)
    const saved    = localStorage.getItem("mat-dev-theme");
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const initial = saved || preferred;
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("mat-dev-theme", next); } catch (_) {}
  };

  // ── Idioma ───────────────────────────────────────────────────
  const [language, setLanguage] = useState("en");
  const toggleLanguage = () => setLanguage((l) => (l === "en" ? "es" : "en"));

  // ── Observer global de fade-up ───────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Una vez visible, dejar de observar (optimización)
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );

    const targets = document.querySelectorAll(".fade-up");
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [language]); // re-observa cuando cambia idioma (DOM se actualiza)

  return (
    <>
      <Navbar
        language={language}
        toggleLanguage={toggleLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <Header    language={language} />
      <About   language={language} />
      <Work    language={language} />
      <Contact language={language} />
      <Footer  language={language} />
    </>
  );
}
