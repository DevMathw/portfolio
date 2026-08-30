"use client";
import Image from "next/image";
import { getTexts } from "@/components/language/texts";

/**
 * Header — sección hero
 * - Layout de dos columnas con imagen
 * - Dot de disponibilidad animado
 * - CTAs con jerarquía clara (contacto primario, CV secundario)
 */

const CV_FILES = {
  en: "/cv_mat_en.pdf",
  es: "/cv_mat_es.pdf",
};

export default function Header({ language }) {
  const t = getTexts(language).header;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
          <h1 className="fade-up" data-delay="1">
            {t.greeting} <span className="accent">{t.name}</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle fade-up" data-delay="2">
            {t.role}
          </p>

          {/* CTAs */}
          <div className="hero-ctas fade-up" data-delay="3">
            <button className="btn btn-primary" onClick={() => scrollTo("contact")}>
              {t.cta1}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <a href={CV_FILES[language] ?? CV_FILES.en} download className="btn btn-ghost">
              {t.cta2}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right: image */}
        <div className="hero-image-wrap fade-up" data-delay="2">
          {/* 512×512 son las dimensiones reales del archivo: declararlas
              correctamente evita distorsión y desplazamiento de layout (CLS). */}
          <Image
            src="/main-logo.png"
            alt={t.imageAlt}
            width={512}
            height={512}
            sizes="(max-width: 768px) 280px, 380px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
