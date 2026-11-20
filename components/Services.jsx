"use client";
import { getTexts } from "@/components/language/texts";

/**
 * Services — las tres ofertas vendibles
 *
 * Antes esta sección listaba 8 capacidades técnicas (Frontend, Backend & APIs,
 * Bases de datos…). Nadie compra "Backend & APIs": se compra un resultado de
 * negocio con alcance y precio. Esas 8 capacidades siguen aquí, pero dentro
 * de la oferta a la que pertenecen, como lo que incluye cada paquete.
 *
 * Los precios cambian según el idioma a propósito: un cliente internacional
 * no sabe interpretar una cifra en COP, y la tarifa internacional es mayor
 * que la local para el mismo trabajo. ES → mercado colombiano, EN → exterior.
 *
 * Las animaciones on-scroll las gestiona el observer único de page.js.
 */

export const SERVICES = [
  {
    id: "sitio",
    name: {
      en: "Websites that convert",
      es: "Sitio web que convierte",
    },
    desc: {
      en: "A fast, measurable landing page or company site built to bring you enquiries — not just to look good.",
      es: "Landing o sitio corporativo rápido y medible, construido para que te contacten, no solo para verse bien.",
    },
    includes: {
      en: [
        "Custom design and build",
        "Performance and UX optimisation",
        "Contact form and analytics",
        "Responsive and accessible",
      ],
      es: [
        "Diseño e implementación a medida",
        "Optimización de rendimiento y UX",
        "Formulario de contacto y analítica",
        "Responsive y accesible",
      ],
    },
    price: {
      en: "From USD 800",
      es: "Desde COP 1.500.000",
    },
  },
  {
    id: "automatizacion",
    name: {
      en: "Automation & integrations",
      es: "Automatización e integraciones",
    },
    desc: {
      en: "I connect the systems you already use and remove the repetitive manual work: invoicing, CRM, payments, spreadsheets.",
      es: "Conecto los sistemas que ya usas y elimino el trabajo manual repetitivo: facturación, CRM, pagos, hojas de cálculo.",
    },
    includes: {
      en: [
        "Third-party API integration",
        "Internal process automation",
        "Custom software for your operation",
        "Database design and optimisation",
      ],
      es: [
        "Integración con APIs de terceros",
        "Automatización de procesos internos",
        "Software a medida sobre tu operación",
        "Diseño y optimización de bases de datos",
      ],
    },
    price: {
      en: "From USD 1,500",
      es: "Desde COP 2.500.000",
    },
  },
  {
    id: "soporte",
    name: {
      en: "Support & evolution",
      es: "Soporte y evolución",
    },
    desc: {
      en: "I keep your application running and improving month to month, instead of disappearing after delivery.",
      es: "Mantengo tu aplicación funcionando y mejorando mes a mes, en vez de desaparecer después de la entrega.",
    },
    includes: {
      en: [
        "Fixes and dependency updates",
        "Improvements and new features",
        "Performance monitoring",
        "Legacy code refactoring",
      ],
      es: [
        "Correcciones y actualizaciones",
        "Mejoras y nuevas funcionalidades",
        "Monitoreo de rendimiento",
        "Refactorización de código heredado",
      ],
    },
    price: {
      en: "From USD 350 / month",
      es: "Desde COP 600.000 / mes",
    },
  },
];

export default function Services({ language }) {
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
            const name = service.name[language] ?? service.name.en;
            const desc = service.desc[language] ?? service.desc.en;
            const includes = service.includes[language] ?? service.includes.en;
            const price = service.price[language] ?? service.price.en;

            return (
              /* project-card aporta el chrome compartido de tarjeta (fondo,
                 borde, hover); service-card solo añade el layout propio. */
              <article
                key={service.id}
                className="project-card service-card fade-up"
                data-delay={String(i + 1)}
              >
                <div>
                  <h3 className="project-name">{name}</h3>
                  <p className="project-desc">{desc}</p>
                </div>

                <ul className="service-includes">
                  {includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p className="service-price">
                  <span className="badge">{price}</span>
                </p>
              </article>
            );
          })}
        </div>

        <p className="services-note fade-up">{t.note}</p>
      </div>
    </section>
  );
}
