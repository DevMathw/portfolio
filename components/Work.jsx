"use client";
import Image from "next/image";
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
  {
    icon: "◈",
    name: {
      en: "Personal Portfolio Website",
      es: "Portfolio Personal",
    },
    desc: {
      en: "The site you are on. Built so a visitor becomes an enquiry instead of a bounce: it loads fast, still reads with JavaScript disabled, and works in two languages without a reload.",
      es: "El sitio en el que estás. Hecho para que una visita se convierta en consulta y no en rebote: carga rápido, se sigue leyendo con JavaScript desactivado y funciona en dos idiomas sin recargar.",
    },
    tags: ["Next.js", "React", "Vercel", "Web3Forms"],
    live: "https://mathw.dev",
    code: "https://github.com/DevMathw/portfolio",
    shot: "/projects/portfolio.webp",
  },
  {
    icon: "◐",
    name: {
      en: "Personal Finance App",
      es: "App de Finanzas Personales",
    },
    desc: {
      en: "People lose track of where their money goes across notes and spreadsheets. This puts income, expenses and a running balance in one place, behind a login, on any device.",
      es: "La gente pierde el rastro de su dinero entre notas y hojas de cálculo. Esto reúne ingresos, gastos y saldo en un solo lugar, tras un login y desde cualquier dispositivo.",
    },
    tags: ["JavaScript", "CSS", "Node.js", "REST API"],
    live: "https://finance-app-pi-three.vercel.app/login",
    code: "https://github.com/DevMathw/finance-app",
    shot: "/projects/finance.webp",
  },
  {
    icon: "◎",
    name: {
      en: "UX Auditor",
      es: "Auditor UX",
    },
    desc: {
      en: "Most owners know their site underperforms but cannot say why. Paste a URL and get a scored report naming the hierarchy, accessibility and clarity problems — and what to fix first.",
      es: "Casi ningún dueño sabe por qué su web rinde mal, solo que rinde mal. Pegas una URL y recibes un informe con puntaje que nombra los problemas de jerarquía, accesibilidad y claridad, y qué arreglar primero.",
    },
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "AI"],
    live: "https://ux-auditor-chi.vercel.app/",
    code: "https://github.com/DevMathw/ux-auditor",
    shot: "/projects/ux-auditor.webp",
  },
  {
    icon: "◇",
    name: {
      en: "To-Do App",
      es: "App Gestor de Tareas",
    },
    desc: {
      en: "A task manager where each user's data is genuinely isolated at the API, not just hidden in the interface. Every request carries a token, and the API documents itself from the code.",
      es: "Un gestor de tareas donde los datos de cada usuario están aislados de verdad en la API, no solo ocultos en la interfaz. Cada petición lleva token y la API se documenta sola desde el código.",
    },
    tags: ["FastAPI", "Python", "SQLite", "JWT", "JavaScript"],
    live: "https://to-do-app-seven-wine-10.vercel.app/",
    code: "https://github.com/DevMathw/to-do-app",
    shot: "/projects/todo.webp",
  },
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
              <article key={project.code ?? project.name.en} className="project-card fade-up" data-delay={i % 2 === 0 ? "1" : "2"}>
                {/* Captura: es lo primero que se escanea, antes de leer nada */}
                <Image
                  className="project-thumb"
                  src={project.shot}
                  alt={projectName}
                  width={800}
                  height={500}
                  sizes="(max-width: 768px) 100vw, 480px"
                />

                {/* Header */}
                <div className="project-card-header">
                  <div className="project-icon" aria-hidden="true">
                    {project.icon}
                  </div>
                  <div className="project-links">
                    {project.live ? (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link"aria-label={`${projectName} – live site`}>
                        {t.live}
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    ) : (
                      <span className="project-link project-link--disabled" aria-disabled="true" title={t.comingSoon}>
                        {t.live}
                      </span>
                    )}
                    {project.code ? (
                      <a href={project.code} target="_blank" rel="noopener noreferrer" className="project-link" aria-label={`${projectName} – source code`}>
                        {t.code}
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </svg>
                      </a>
                    ) : (
                      <span className="project-link project-link--disabled" aria-disabled="true"title={t.comingSoon}>
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
      </div>
    </section>
  );
}
