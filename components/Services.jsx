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

const SERVICES = [
  {
    name: {
      en: "Web Applications",
      es: "Aplicaciones web",
    },
    desc: {
      en: "Modern, fast, and scalable web solutions designed to deliver an exceptional user experience and grow alongside your business.",
      es: "Soluciones web modernas, rápidas y escalables, diseñadas para ofrecer una experiencia excepcional y crecer junto con tu negocio.",
    },
  },
  {
    name: {
      en: "Custom Software",
      es: "Sistemas a medida",
    },
    desc: {
      en: "Custom software solutions tailored to your processes, designed to optimize operations and address your business's specific needs.",
      es: "Software personalizado diseñado para adaptarse a tus procesos, optimizar tu operación y resolver necesidades específicas de tu negocio.",
    },
  },
  {
    name: {
      en: "Frontend",
      es: "Frontend",
    },
    desc: {
      en: "Modern, accessible, high-performance interfaces designed to deliver an intuitive and engaging user experience.",
      es: "Interfaces modernas, accesibles y de alto rendimiento, diseñadas para ofrecer una experiencia de usuario intuitiva y atractiva.",
    },
  },
  {
    name: {
      en: "Backend y APIs",
      es: "Backend y APIs",
    },
    desc: {
      en: "Robust backend architectures and secure, scalable, well-documented APIs designed to integrate seamlessly with your systems and applications.",
      es: "Arquitecturas backend robustas y APIs seguras, escalables y bien documentadas, diseñadas para integrarse de forma eficiente con tus sistemas y aplicaciones.",
    },
  },
  {
    name: {
      en: "Automation",
      es: "Automatización",
    },
    desc: {
      en: "Process automation designed to eliminate repetitive tasks, streamline workflows, and improve operational efficiency.",
      es: "Automatización de procesos para reducir tareas repetitivas, optimizar flujos de trabajo y mejorar la eficiencia operativa.",
    },
  },
  {
    name: {
      en: "Databases",
      es: "Bases de datos",
    },
    desc: {
      en: "SQL database design and optimization, tailored to your business needs and built to scale efficiently as your business grows.",
      es: "Diseño y optimización de bases de datos SQL, adaptadas a las necesidades de tu negocio y preparadas para crecer de forma eficiente.",
    },
  },
  {
    name: {
      en: "Performance & UX",
      es: "Optimización y UX",
    },
    desc: {
      en: "Performance and user experience optimization to make digital products faster, more intuitive, and more efficient.",
      es: "Optimización de rendimiento y experiencia de usuario para crear productos más rápidos, intuitivos y eficientes.",
    },
  },
  {
    name: {
      en: "Maintenance & Refactoring",
      es: "Mantenimiento y refactorización",
    },
    desc: {
      en: "Modernization and refactoring of existing applications to improve stability, performance, maintainability, and scalability.",
      es: "Modernización y refactorización de aplicaciones existentes para mejorar su estabilidad, rendimiento, mantenibilidad y escalabilidad.",
    },
  },
];

export default function Work({ language }) {
  const t = getTexts(language).service;

  return (
    <section className="section" id="service">
      <div className="container">
        <span className="section-label fade-up">{t.label}</span>
        <h2 className="section-title fade-up" data-delay="1">
          {t.title}
        </h2>
        <p className="section-desc fade-up" data-delay="2">
          {t.desc}
        </p>

        <div className="services-grid">
          {SERVICES.map((service, i) => {
            // Fallback a inglés si llegara un idioma no soportado
            const projectName = service.name[language] ?? service.name.en;
            const projectDesc = service.desc[language] ?? service.desc.en;

            return (
              <article
                key={service.code ?? service.name.en}
                className="project-card fade-up"
                data-delay={i % 2 === 0 ? "1" : "2"}
              >
                {/* Header */}
                <div className="project-card-header">
                </div>

                {/* Body */}
                <div>
                  <h3 className="project-name">{projectName}</h3>
                  <p className="project-desc">{projectDesc}</p>
                </div>

                {/* Footer */}
                <div className="project-footer"></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
