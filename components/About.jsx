"use client";
import { getTexts } from "@/components/language/texts";

/**
 * About
 * - Bio + stack principal y tecnologías secundarias, como chips
 *
 * Las animaciones on-scroll las gestiona el observer único de SiteContent.
 */

// Sin porcentajes: un "95%" autoasignado no es comprobable y a un cliente
// no le dice nada. Qué usas a diario sí.
const SKILLS_PRIMARY = ["PHP", "CodeIgniter", "JavaScript", "MySQL", "PostgreSQL"];

const CV_FILES = {
  en: "/cv_mat_en.pdf",
  es: "/cv_mat_es.pdf",
};

const SKILLS_TAGS = [
  "React", "Node.js", "Python", "Django",
  "APIs REST", "Git / GitHub", "UX / UI", "AI",
];

export default function About({ language }) {
  const t = getTexts(language).about;

  return (
    <section className="section" id="about">
      <div className="container">
        <span className="section-label fade-up">{t.label}</span>

        <div className="about-grid">
          {/* Bio */}
          <div className="fade-up" data-delay="1">
            <h2 className="section-title">{t.label}</h2>
            <p className="about-bio">{t.bio}</p>

            <p className="section-label section-label--block">{t.tagsTitle}</p>
            <div className="skill-tags">
              {SKILLS_TAGS.map((tag) => (
                <span key={tag} className="skill-tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* El CV es material secundario: vive aquí, junto a la bio, y no
                compitiendo con la llamada a la acción del hero. */}
            <a
              className="cv-link"
              href={CV_FILES[language] ?? CV_FILES.en}
              download
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t.cvLink}
            </a>
          </div>

          {/* Skills */}
          <div className="fade-up" data-delay="2">
            <p className="section-label section-label--block">{t.skillsTitle}</p>
            <div className="skill-tags">
              {SKILLS_PRIMARY.map((tech) => (
                <span key={tech} className="skill-tag skill-tag--core">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
