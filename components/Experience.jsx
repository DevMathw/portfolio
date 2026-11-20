"use client";
import { getTexts } from "@/components/language/texts";

/**
 * Experience — trayectoria profesional
 *
 * ⚠️ ESTA SECCIÓN ESTÁ VACÍA A PROPÓSITO.
 *
 * No se inventan puestos, empresas ni fechas: serían credenciales falsas en
 * un sitio que las presenta como reales. Mientras EXPERIENCE esté vacío la
 * sección NO se renderiza, así que no hay riesgo de publicar marcadores.
 *
 * Para activarla, rellena EXPERIENCE con tus puestos reales. Esta es la
 * forma exacta de cada entrada:
 *
 *   {
 *     period: { en: "2023 — Present", es: "2023 — Actualidad" },
 *     role:    { en: "Full-stack Developer", es: "Desarrollador Full-stack" },
 *     company: "Nombre de la empresa",
 *     // Qué hiciste y qué cambió por haberlo hecho. Lo segundo es lo que
 *     // distingue una trayectoria de una lista de tareas.
 *     summary: {
 *       en: "What you owned and what measurably improved because of it.",
 *       es: "De qué fuiste responsable y qué mejoró de forma medible.",
 *     },
 *     stack: ["PHP", "CodeIgniter", "MySQL"],
 *   }
 *
 * Si un dato no lo tienes (por ejemplo una métrica), déjalo fuera. Una
 * trayectoria con huecos es creíble; una inflada deja de serlo entera.
 */

const EXPERIENCE = [];

/** El nav y el observer se enganchan a esto: al rellenar EXPERIENCE la
 *  sección y su enlace de navegación aparecen solos, sin tocar nada más. */
export const HAS_EXPERIENCE = EXPERIENCE.length > 0;

export default function Experience({ language }) {
  // Sin datos reales no hay sección. Ver la nota de arriba.
  if (EXPERIENCE.length === 0) return null;

  const t = getTexts(language).experience;

  return (
    <section className="section" id="experience">
      <div className="container">
        <span className="section-label fade-up">{t.label}</span>
        <h2 className="section-title fade-up" data-delay="1">
          {t.title}
        </h2>
        <p className="section-desc fade-up" data-delay="2">
          {t.desc}
        </p>

        <ol className="timeline">
          {EXPERIENCE.map((job, i) => {
            const period = job.period[language] ?? job.period.en;
            const role = job.role[language] ?? job.role.en;
            const summary = job.summary[language] ?? job.summary.en;

            return (
              <li
                className="timeline-item fade-up"
                key={`${job.company}-${period}`}
                data-delay={String(Math.min(i + 1, 4))}
              >
                <div className="timeline-marker" aria-hidden="true" />
                <div className="timeline-body">
                  <span className="timeline-period">{period}</span>
                  <h3 className="timeline-role">
                    {role}
                    <span className="timeline-company"> · {job.company}</span>
                  </h3>
                  <p className="timeline-summary">{summary}</p>
                  {job.stack?.length > 0 && (
                    <div className="timeline-stack">
                      {job.stack.map((tech) => (
                        <span key={tech} className="project-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
