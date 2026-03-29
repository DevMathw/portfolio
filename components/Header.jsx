"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Header — versión mejorada
 * - Layout de dos columnas con imagen
 * - Dot de disponibilidad animado
 * - Heading con acento de color
 * - CTAs con jerarquía clara
 * - Texto subrayado de tecnologías como decoración sutil
 */

export default function Header({ language, theme }) {
  const titleRef = useRef(null);

  const content = {
    en: {
      status:   "Available for new projects",
      greeting: "Hi, I'm",
      name:     "Mateo",
      role:     "Full-stack developer focused on building reliable and scalable web applications",
      cta1:     "Get in touch",
      cta2:     "Download CV",
    },
    es: {
      status:   "Disponible para nuevos proyectos",
      greeting: "Hola, soy",
      name:     "Mateo",
      role:     "Desarrollador full-stack enfocado en construir aplicaciones web confiables y escalables",
      cta1:     "Contáctame",
      cta2:     "Descargar CV",
    },
  };

  const t = content[language] || content.en;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        {/* Left: content */}
        <div>
          {/* Status badge */}
          <div className="hero-label fade-up" data-delay="0">
            <span className="status-dot" aria-hidden="true" />
            <span className="hero-status-text">{t.status}</span>
          </div>

          {/* Heading */}
          <h1 className="fade-up" data-delay="1" ref={titleRef}>
            {t.greeting}{" "}
            <span className="accent">{t.name}</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle fade-up" data-delay="2">
            {t.role}
          </p>

          {/* CTAs */}
          <div className="hero-ctas fade-up" data-delay="3">
            <button
              className="btn btn-primary"
              onClick={() => scrollTo("contact")}
            >
              {t.cta1}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
            <a
              href="/cv_mat_en.pdf"
              download
              className="btn btn-ghost"
            >
              {t.cta2}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Right: image */}
        <div className="hero-image-wrap fade-up" data-delay="2">
          <Image
            src="/main-logo.png"
            alt="Mateo Garcia – Fullstack Developer"
            width={380}
            height={460}
            priority
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </section>
  );
}

