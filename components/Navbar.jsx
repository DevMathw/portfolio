"use client";
import { useState, useEffect, useCallback } from "react";
import { useActiveSection } from "@/components/hooks/useActiveSection";
import { useMediaQuery } from "@/components/hooks/useMediaQuery";
import { getTexts } from "@/components/language/texts";

/**
 * Navbar
 * - Sección activa vía useActiveSection (hook compartido, ya no duplicado aquí)
 * - Bloquea el scroll del body cuando el menú mobile está abierto
 * - Se cierra con Escape, con click fuera y al pasar a viewport desktop
 * - aria-current / aria-expanded para accesibilidad
 */

const SECTION_IDS = ["home", "about", "work", "contact"];
const NAV_HEIGHT = 56;
const MOBILE_BREAKPOINT = 768;

export default function Navbar({ language, toggleLanguage, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuRequested, setMenuRequested] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS, NAV_HEIGHT);

  // El menú hamburguesa solo existe en mobile. Derivar su apertura del
  // viewport (en lugar de intentar sincronizar el estado con un listener)
  // evita que quede abierto —y el scroll del body bloqueado— si el usuario
  // agranda la ventana con el menú desplegado.
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);
  const menuOpen = menuRequested && isMobile;

  const t = getTexts(language).nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Click fuera + Escape cierran el menú
  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (e) => {
      const target = e.target;
      // e.target puede no ser un Element (p. ej. un nodo de texto)
      if (!(target instanceof Element)) return;
      if (!target.closest("nav") && !target.closest(".mobile-menu")) {
        setMenuRequested(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuRequested(false);
    };

    document.addEventListener("click", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // Bloquea el scroll del body mientras el menú está abierto
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { id: "home", label: t.home },
    { id: "about", label: t.about },
    { id: "service", label: t.service },
    { id: "work", label: t.work },
    { id: "contact", label: t.contact },
  ];

  const scrollTo = useCallback((id) => {
    setMenuRequested(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <nav className={scrolled ? "is-scrolled" : ""} aria-label="Main">
        <div className="navbar-inner">
          {/* Logo */}
          <a
            href="#home"
            className="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("home");
            }}
          >
            mat<span>.</span>dev
          </a>

          {/* Links desktop */}
          <ul className="nav-links" role="list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={activeSection === link.id ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.id);
                  }}
                  aria-current={activeSection === link.id ? "true" : undefined}
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
              aria-label={t.toggleLanguage}
            >
              {language === "en" ? "ES" : "EN"}
            </button>

            {/* Toggle tema */}
            <button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? t.toggleThemeToLight : t.toggleThemeToDark}
            >
              {theme === "dark" ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Hamburger mobile */}
            <button
              className="hamburger"
              aria-label={menuOpen ? t.closeMenu : t.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={(e) => {
                e.stopPropagation();
                setMenuRequested((o) => !o);
              }}
            >
              <span style={{ transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
              <span style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? "scaleX(0)" : "none" }} />
              <span style={{ transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollTo(link.id);
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
