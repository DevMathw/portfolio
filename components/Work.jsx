"use client";
import { getTexts } from "@/components/language/texts";

/**
 * Work — proyectos destacados
 * - Cards con hover sutil y microinteracciones
 * - Ícono, tags de tecnología y enlaces por proyecto
 * - Grid de 2 columnas en desktop
 *
 * Las animaciones on-scroll las gestiona el observer único de page.js.
 */

const PROJECTS = [
  // {
  //   icon: "◈",
  //   name: {
  //     en: "Personal Portfolio Website",
  //     es: "Portfolio Personal",
  //   },
  //   desc: {
  //     en: "Developer portfolio built with Next.js and a hand-written CSS design system. Features dark/light mode, bilingual support (EN/ES), smooth scroll navigation, animated skill bars, and a contact form via Web3Forms.",
  //     es: "Portfolio de desarrollador construido con Next.js y un sistema de diseño en CSS propio. Incluye modo oscuro/claro, soporte bilingüe (EN/ES), navegación con scroll suave, barras de habilidades animadas y formulario de contacto vía Web3Forms.",
  //   },
  //   tags: ["Next.js", "React", "Vercel", "Web3Forms"],
  //   live: "https://portfolio-nine-henna-77.vercel.app",
  //   code: "https://github.com/DevMathw/portfolio",
  // },
  // {
  //   icon: "◐",
  //   name: {
  //     en: "Personal Finance App",
  //     es: "App de Finanzas Personales",
  //   },
  //   desc: {
  //     en: "Full-stack finance application with a JavaScript frontend and a REST API backend. Allows users to track income, expenses, and financial summaries with a clean, responsive interface.",
  //     es: "Aplicación de finanzas full-stack con frontend en JavaScript y backend REST API. Permite registrar ingresos, gastos y ver resúmenes financieros con una interfaz limpia y responsiva.",
  //   },
  //   tags: ["JavaScript", "CSS", "Node.js", "REST API"],
  //   live: "https://finance-app-pi-three.vercel.app/login",
  //   code: "https://github.com/DevMathw/finance-app",
  // },
  {
    icon: "◎",
    name: {
      en: "UX Auditor",
      es: "Auditor UX",
    },
    desc: {
      en: "AI-powered UX analysis tool built with Next.js and AI. Analyzes any website's visual hierarchy, accessibility, and UX clarity, returning a scored report with structured problems and improvement suggestions.",
      es: "Herramienta de análisis UX con IA construida con Next.js y IA. Analiza jerarquía visual, accesibilidad y claridad UX de cualquier sitio web, generando un reporte con puntaje, problemas detectados y sugerencias de mejora.",
    },
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "AI"],
    live: "https://ux-auditor-chi.vercel.app/",
    code: "https://github.com/DevMathw/ux-auditor",
  },
  // {
  //   icon: "◇",
  //   name: {
  //     en: "To-Do App — REST API",
  //     es: "App de Tareas — REST API",
  //   },
  //   desc: {
  //     en: "Full-stack task manager with a FastAPI backend and a JavaScript frontend. Features JWT authentication, per-user data isolation, full CRUD, and auto-generated API docs via Swagger.",
  //     es: "Gestor de tareas full-stack con backend FastAPI y frontend en JavaScript. Incluye autenticación JWT, aislamiento de datos por usuario, CRUD completo y documentación automática de la API con Swagger.",
  //   },
  //   tags: ["FastAPI", "Python", "SQLite", "JWT", "JavaScript"],
  //   live: "https://to-do-app-seven-wine-10.vercel.app/",
  //   code: "https://github.com/DevMathw/to-do-app",
  // },
];

export default function Work({ language }) {
  const t = getTexts(language).work;

  return (
    <section className="section" id="work">
      <div className="container">
        <span className="section-label fade-up">{t.label}</span>
        <h2 className="section-title fade-up" data-delay="1">
          {t.title}
        </h2>
        <p className="section-desc fade-up" data-delay="2">
          {t.desc}
        </p>

        <div className="projects-grid">
          {PROJECTS.map((project, i) => {
            // Fallback a inglés si llegara un idioma no soportado
            const projectName = project.name[language] ?? project.name.en;
            const projectDesc = project.desc[language] ?? project.desc.en;

            return (
              <article
                key={project.code ?? project.name.en}
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
                        aria-label={`${projectName} – live site`}
                      >
                        {t.live}
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    ) : (
                      <span
                        className="project-link project-link--disabled"
                        aria-disabled="true"
                        title={t.comingSoon}
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
                        aria-label={`${projectName} – source code`}
                      >
                        {t.code}
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </svg>
                      </a>
                    ) : (
                      <span
                        className="project-link project-link--disabled"
                        aria-disabled="true"
                        title={t.comingSoon}
                      >
                        {t.code}
                      </span>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div>
                  <h3 className="project-name">{projectName}</h3>
                  <p className="project-desc">{projectDesc}</p>
                </div>

                {/* Footer */}
                <div className="project-footer">
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="projects-cta fade-up d-none">
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
