"use client";
import { getTexts } from "@/components/language/texts";

/**
 * About
 * - Bio + stack principal con barras de progreso
 * - Tecnologías secundarias como chips
 *
 * Las animaciones on-scroll las gestiona el observer único de page.js;
 * este componente solo marca los elementos con .fade-up / .skill-item.
 */

const SKILLS_PRIMARY = [
  { name: "PHP", pct: 95 },
  { name: "CodeIgniter", pct: 95 },
  { name: "JavaScript", pct: 90 },
  { name: "MySQL", pct: 95 },
  { name: "PostgreSQL", pct: 90 },
];

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
          </div>

          {/* Skills */}
          <div className="fade-up" data-delay="2">
            <p className="section-label section-label--block">{t.skillsTitle}</p>
            <div className="skills-list">
              {SKILLS_PRIMARY.map((skill) => (
                <div className="skill-item" key={skill.name}>
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-pct">{skill.pct}%</span>
                  </div>
                  <div className="skill-track" role="meter" aria-label={skill.name} aria-valuenow={skill.pct} aria-valuemin={0}aria-valuemax={100}>
                    <div className="skill-fill" style={{ "--w": `${skill.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
