/**
 * texts.js — Fuente única de verdad para todos los textos de la UI.
 *
 * Antes cada componente definía su propio objeto `content` inline, lo que
 * obligaba a tocar varios archivos para cambiar una sola frase y permitía
 * que las versiones EN/ES se desincronizaran. Todo vive aquí ahora.
 *
 * Uso:  import { getTexts } from "@/components/language/texts";
 *       const t = getTexts(language).header;
 */

const texts = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      service: "Services",
      experience: "Experience",
      work: "Work",
      contact: "Contact",
      toggleLanguage: "Switch to Spanish",
      toggleThemeToLight: "Switch to light theme",
      toggleThemeToDark: "Switch to dark theme",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },

    header: {
      status: "Available for freelance projects",
      headline: "I build web applications that",
      headlineAccent: "solve real business problems",
      role: "Full-stack developer. I take projects from the first line of code to production — and keep them running afterwards.",
      cta1: "Start a project",
      cta2: "See services",
      imageAlt: "mat.dev",
    },

    about: {
      label: "About Me",
      bio: "I'm a full-stack developer with 3 years of experience building real-world web applications. I work across frontend and backend, creating clean user interfaces, reliable APIs, and scalable solutions that solve real business problems.",
      skillsTitle: "Core stack",
      tagsTitle: "Also working with",
      cvLink: "Download CV (PDF)",
    },
    experience: {
      label: "Track record",
      title: "Experience",
      desc: "Where I've worked and what changed because of it.",
    },

    service: {
      label: "What I Offer",
      title: "Services",
      desc: "Three ways to work together. Each one with a defined scope and a starting price.",
      note: "Every project is quoted on its scope. Tell me what you need and I'll reply with a fixed price.",
    },
    work: {
      label: "Selected Work",
      title: "Projects",
      desc: "A selection of real-world projects where I designed, built, and delivered full-stack solutions.",
      live: "Live",
      code: "Code",
      github: "View more on GitHub →",
      comingSoon: "Coming soon",
    },
    contact: {
      label: "Get in touch",
      title: "Let's work together",
      desc: "Tell me what you need and I'll reply with an approach, a timeline and a price. No commitment.",
      name: "Name",
      email: "Email",
      message: "Message",
      projectType: "What do you need?",
      budget: "Approximate budget",
      optional: "optional",
      choose: "Select an option",
      budgets: ["Under USD 800", "USD 800 – 2,000", "USD 2,000 – 5,000", "Over USD 5,000", "Not sure yet"],
      other: "Something else",
      namePH: "Your name",
      emailPH: "you@example.com",
      messagePH: "Tell me about your project...",
      send: "Send message",
      sending: "Sending...",
      success: "Message sent! I'll get back to you soon.",
      networkErr: "Network error. Please try again later.",
      submitErr: "The message could not be sent. Please try again or email me directly.",
      altIntro: "Prefer email?",
      replyTime: "I reply within 24 hours on working days.",
      errors: {
        required: "This field is required.",
        email: "Please enter a valid email address.",
        max: (n) => `Maximum ${n} characters allowed.`,
      },
    },
    footer: {
      copy: (year) => `© ${year}. All rights reserved.`,
      socialLabel: "Social links",
      pitch: "Web applications, integrations and maintenance for businesses.",
      cta: "Start a project",
      location: "Colombia · UTC−5 · Working in English and Spanish",
    },

    a11y: {
      skipToContent: "Skip to main content",
    },
  },

  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      service: "Servicios",
      experience: "Experiencia",
      work: "Proyectos",
      contact: "Contacto",
      toggleLanguage: "Cambiar a inglés",
      toggleThemeToLight: "Cambiar a tema claro",
      toggleThemeToDark: "Cambiar a tema oscuro",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    header: {
      status: "Disponible para proyectos freelance",
      headline: "Construyo aplicaciones web que",
      headlineAccent: "resuelven problemas reales de negocio",
      role: "Desarrollador full-stack. Llevo los proyectos desde la primera línea de código hasta producción, y los mantengo funcionando después.",
      cta1: "Iniciar un proyecto",
      cta2: "Ver servicios",
      imageAlt: "mat.dev",
    },
    about: {
      label: "Sobre mí",
      bio: "Soy desarrollador full-stack con 3 años de experiencia construyendo aplicaciones web reales. Trabajo en frontend y backend, creando interfaces limpias, APIs confiables y soluciones escalables que resuelven problemas reales de negocio.",
      skillsTitle: "Stack principal",
      tagsTitle: "También trabajo con",
      cvLink: "Descargar CV (PDF)",
    },
    experience: {
      label: "Trayectoria",
      title: "Experiencia",
      desc: "Dónde he trabajado y qué cambió por haberlo hecho.",
    },
    service: {
      label: "Lo que ofrezco",
      title: "Servicios",
      desc: "Tres formas de trabajar juntos. Cada una con alcance definido y precio de partida.",
      note: "Cada proyecto se cotiza según su alcance. Cuéntame qué necesitas y te respondo con un precio cerrado.",
    },
    work: {
      label: "Trabajo seleccionado",
      title: "Proyectos",
      desc: "Una selección de proyectos reales donde diseñé, construí y entregué soluciones full-stack.",
      live: "Ver en vivo",
      code: "Código",
      github: "Ver más en GitHub →",
      comingSoon: "Próximamente",
    },
    contact: {
      label: "Contacto",
      title: "Trabajemos juntos",
      desc: "Cuéntame qué necesitas y te respondo con un enfoque, un plazo y un precio. Sin compromiso.",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      projectType: "¿Qué necesitas?",
      budget: "Presupuesto aproximado",
      optional: "opcional",
      choose: "Selecciona una opción",
      budgets: ["Menos de COP 1.500.000", "COP 1.500.000 – 4.000.000", "COP 4.000.000 – 10.000.000", "Más de COP 10.000.000", "Aún no lo sé"],
      other: "Otra cosa",
      namePH: "Tu nombre",
      emailPH: "tu@ejemplo.com",
      messagePH: "Cuéntame sobre tu proyecto...",
      send: "Enviar mensaje",
      sending: "Enviando...",
      success: "¡Mensaje enviado! Te responderé pronto.",
      networkErr: "Error de red. Por favor, inténtalo de nuevo.",
      submitErr: "No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme directamente.",
      altIntro: "¿Prefieres el correo?",
      replyTime: "Respondo en menos de 24 horas en días hábiles.",
      errors: {
        required: "Este campo es obligatorio.",
        email: "Ingresa un correo electrónico válido.",
        max: (n) => `Máximo ${n} caracteres permitidos.`,
      },
    },
    footer: {
      copy: (year) => `© ${year}. Todos los derechos reservados.`,
      socialLabel: "Enlaces sociales",
      pitch: "Aplicaciones web, integraciones y mantenimiento para empresas.",
      cta: "Iniciar un proyecto",
      location: "Colombia · UTC−5 · Trabajo en español e inglés",
    },

    a11y: {
      skipToContent: "Ir al contenido principal",
    },
  },
};

/** Idiomas soportados, en orden de alternancia. */
export const LANGUAGES = ["en", "es"];

export const DEFAULT_LANGUAGE = "en";

/** Devuelve el diccionario del idioma pedido, con fallback seguro a inglés. */
export function getTexts(language) {
  return texts[language] ?? texts[DEFAULT_LANGUAGE];
}

export default texts;
