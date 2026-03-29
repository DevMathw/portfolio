"use client";
import { useEffect, useRef } from "react";

/**
 * Work — versión mejorada
 * - Cards con hover sutil y microinteracciones
 * - Ícono por proyecto
 * - Tags de tecnología
 * - CTA a GitHub
 * - Grid 2 columnas en desktop
 */

const PROJECTS = [
  {
    icon: "◈",
    name: { en: "Personal Portfolio Website",    es: "Portfolio Personal" },
    desc: { en: "Modern portfolio built with Next.js, animations, and responsive design.", es: "Portfolio moderno con Next.js, animaciones y diseño responsivo." },
    tags: ["Next.js", "Tailwind", "Vercel"],
    live: "https://portfolio-nine-henna-77.vercel.app",
    code: "https://github.com/DevMathw/portfolio",
  },
  {
    icon: "◎",
    name: { en: "Geo-Based Web Application",    es: "Aplicación Web Geo-Localizada" },
    desc: { en: "Location-based application focused on map interaction and geolocation.", es: "Aplicación basada en localización con interacción de mapas y geolocalización." },
    tags: ["PHP", "CodeIgniter", "MySQL", "Leaflet"],
    live: null,
    code: null,
  },
  {
    icon: "◐",
    name: { en: "Photography Showcase Website", es: "Sitio de Fotografía" },
    desc: { en: "Visual-focused website designed to highlight photography and galleries.", es: "Sitio web visual centrado en fotografía y galerías de imágenes." },
    tags: ["JavaScript", "CSS Grid", "Lightbox"],
    live: null,
    code: null,
  },
  {
    icon: "◇",
    name: { en: "UI/UX Design Concept",         es: "Concepto UI/UX" },
    desc: { en: "UI/UX design project focused on usability, layout, and accessibility.", es: "Proyecto de diseño UI/UX enfocado en usabilidad, layout y accesibilidad." },
    tags: ["Figma", "Prototyping", "Design Systems"],
    live: null,
    code: null,
  },
];

export default function Work({ language }) {
  const sectionRef = useRef(null);

  const content = {
    en: {
      label:   "Selected Work",
      title:   "Projects",
      desc:    "A selection of real-world projects where I designed, built, and delivered full-stack solutions.",
      live:    "Live",
      code:    "Code",
      github:  "View more on GitHub →",
    },
    es: {
      label:   "Trabajo seleccionado",
      title:   "Proyectos",
      desc:    "Una selección de proyectos reales donde diseñé, construí y entregué soluciones full-stack.",
      live:    "Ver en vivo",
      code:    "Código",
      github:  "Ver más en GitHub →",
    },
  };

  const t = content[language] || content.en;

  // Fade-in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="work" ref={sectionRef}>
      <div className="container">
        <span className="section-label fade-up">{t.label}</span>
        <h2 className="section-title fade-up" data-delay="1">{t.title}</h2>
        <p className="section-desc fade-up" data-delay="2">{t.desc}</p>

        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <article
              key={i}
              className="project-card fade-up"
              data-delay={i % 2 === 0 ? "1" : "2"}
            >
              {/* Header */}
              <div className="project-card-header">
                <div className="project-icon" aria-hidden="true">
                  {project.icon}
                </div>
                <div className="project-links">
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      aria-label={`${project.name[language]} – live site`}
                    >
                      {t.live}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                  ) : (
                    <span
                      className="project-link project-link--disabled"
                      aria-disabled="true"
                      title="Coming soon"
                    >
                      {t.live}
                    </span>
                  )}
                  {project.code ? (
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      aria-label={`${project.name[language]} – source code`}
                    >
                      {t.code}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="16 18 22 12 16 6"/>
                        <polyline points="8 6 2 12 8 18"/>
                      </svg>
                    </a>
                  ) : (
                    <span
                      className="project-link project-link--disabled"
                      aria-disabled="true"
                      title="Coming soon"
                    >
                      {t.code}
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div>
                <h3 className="project-name">{project.name[language]}</h3>
                <p className="project-desc">{project.desc[language]}</p>
              </div>

              {/* Footer */}
              <div className="project-footer">
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="projects-cta fade-up">
          <a
            href="https://github.com/DevMathw"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            {t.github}
          </a>
        </div>
      </div>
    </section>
  );
}


