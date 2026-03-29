"use client";
import { useState, useEffect } from "react";

// Hook inline — misma lógica que hooks/useActiveSection.js
// Detecta la sección activa comparando scrollY con el offsetTop de cada sección.
// Más fiable que IntersectionObserver para secciones de altura variable.
function useActiveSection(ids = [], navHeight = 56) {
  const [active, setActive] = useState(ids[0] || "");

  useEffect(() => {
    if (!ids.length) return;

    const getActive = () => {
      const scrollY = window.scrollY;
      const offset  = navHeight + 80; // umbral: nav + pequeño margen anticipado
      let current   = ids[0];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop - offset <= scrollY) {
          current = id;
        }
      }
      return current;
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setActive(getActive());
          ticking = false;
        });
        ticking = true;
      }
    };

    // Estado inicial (carga directa en sección específica o reload)
    setActive(getActive());

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids.join(","), navHeight]);

  return active;
}

/**
 * Navbar — versión mejorada v2
 * - useActiveSection con IntersectionObserver (más preciso que scroll manual)
 * - Bloquea scroll del body cuando menú mobile está abierto
 * - aria-current para accesibilidad
 * - Íconos SVG inline sin dependencias
 */

const SECTION_IDS = ["home", "about", "work", "contact"];

export default function Navbar({ language, toggleLanguage, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú si click fuera
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (!e.target.closest("nav") && !e.target.closest(".mobile-menu")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  // Bloquea scroll del body cuando menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const labels = {
    en: { home: "Home", about: "About", work: "Work", contact: "Contact" },
    es: { home: "Inicio", about: "Sobre mí", work: "Proyectos", contact: "Contacto" },
  };
  const t = labels[language] || labels.en;

  const navLinks = [
    { id: "home",    label: t.home },
    { id: "about",   label: t.about },
    { id: "work",    label: t.work },
    { id: "contact", label: t.contact },
  ];

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          borderBottomColor: scrolled
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.04)",
        }}
      >
        <div className="navbar-inner">
          {/* Logo */}
          <a href="#home" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo("home"); }}>
            mat<span>.</span>dev
          </a>

          {/* Links desktop */}
          <ul className="nav-links" role="list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={activeSection === link.id ? "active" : ""}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                  aria-current={activeSection === link.id ? "page" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Controles */}
          <div className="nav-right">
            {/* Toggle idioma */}
            <button
              className="lang-btn"
              onClick={toggleLanguage}
              aria-label="Toggle language"
            >
              {language === "en" ? "ES" : "EN"}
            </button>

            {/* Toggle tema */}
            <button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Hamburger mobile */}
            <button
              className="hamburger"
              aria-label="Toggle menu"
              onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}
            >
              <span style={{ transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
              <span style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? "scaleX(0)" : "none" }} />
              <span style={{ transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}



