"use client";
import { useEffect, useRef } from "react";

/**
 * About — versión mejorada
 * - Bio con mejor tipografía y espaciado
 * - Skill bars con animación on-scroll
 * - Tags de tecnología secundarias como chips
 * - Sin romper la lógica de i18n existente
 */

const SKILLS_PRIMARY = [
  { name: "PHP",         pct: 85 },
  { name: "CodeIgniter", pct: 85 },
  { name: "JavaScript",  pct: 80 },
  { name: "MySQL",       pct: 75 },
  { name: "PostgreSQL",  pct: 75 },
];

const SKILLS_TAGS = [
  "React", "Node.js", "Python", "Django",
  "REST APIs", "Git", "Docker", "Linux",
];

export default function About({ language }) {
  const sectionRef = useRef(null);
  const barsRef    = useRef([]);

  const content = {
    en: {
      label: "About Me",
      bio: "I'm a full-stack developer with 3 years of experience building real-world web applications. I work across frontend and backend, creating clean user interfaces, reliable APIs, and scalable solutions that solve real business problems.",
      skillsTitle: "Core stack",
      tagsTitle:   "Also working with",
    },
    es: {
      label: "Sobre mí",
      bio: "Soy desarrollador full-stack con 3 años de experiencia construyendo aplicaciones web reales. Trabajo en frontend y backend, creando interfaces limpias, APIs confiables y soluciones escalables que resuelven problemas reales de negocio.",
      skillsTitle: "Stack principal",
      tagsTitle:   "También trabajo con",
    },
  };

  const t = content[language] || content.en;

  // Anima las barras cuando entran al viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".skill-fill").forEach((bar) => {
              bar.classList.add("animate");
            });
            entry.target.querySelectorAll(".fade-up").forEach((el) => {
              el.classList.add("visible");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="about" ref={sectionRef}>
      <div className="container">
        <span className="section-label fade-up">
          {t.label}
        </span>

        <div className="about-grid">
          {/* Bio */}
          <div className="fade-up" data-delay="1">
            <h2 className="section-title">{t.label}</h2>
            <p className="about-bio">{t.bio}</p>

            <p
              className="section-label"
              style={{ marginBottom: "12px", display: "block" }}
            >
              {t.tagsTitle}
            </p>
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
            <p
              className="section-label"
              style={{ marginBottom: "20px", display: "block" }}
            >
              {t.skillsTitle}
            </p>
            <div className="skills-list">
              {SKILLS_PRIMARY.map((skill) => (
                <div className="skill-item" key={skill.name}>
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-pct">{skill.pct}%</span>
                  </div>
                  <div className="skill-track">
                    <div
                      className="skill-fill"
                      style={{ "--w": `${skill.pct}%` }}
                    />
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


