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
      work: "Work",
      contact: "Contact",
      toggleLanguage: "Switch to Spanish",
      toggleThemeToLight: "Switch to light theme",
      toggleThemeToDark: "Switch to dark theme",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },

    header: {
      status: "Available for new projects",
      greeting: "Hi, I'm",
      name: "Mateo",
      role: "Full-stack developer focused on building reliable and scalable web applications",
      cta1: "Get in touch",
      cta2: "Download CV",
      imageAlt: "Mateo Garcia – Full-stack Developer",
    },

    about: {
      label: "About Me",
      bio: "I'm a full-stack developer with 3 years of experience building real-world web applications. I work across frontend and backend, creating clean user interfaces, reliable APIs, and scalable solutions that solve real business problems.",
      skillsTitle: "Core stack",
      tagsTitle: "Also working with",
    },
    service: {
      label: "What I Offer",
      title: "Services",
      desc: "Custom software solutions to build, improve, and scale digital products, from development to deployment.",
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
      desc: "Have a project in mind or need help building a web solution? Feel free to reach out — I'm open to new opportunities.",
      name: "Name",
      email: "Email",
      message: "Message",
      namePH: "Your name",
      emailPH: "you@example.com",
      messagePH: "Tell me about your project...",
      send: "Send message",
      sending: "Sending...",
      success: "Message sent! I'll get back to you soon.",
      networkErr: "Network error. Please try again later.",
      submitErr: "The message could not be sent. Please try again or email me directly.",
      errors: {
        required: "This field is required.",
        email: "Please enter a valid email address.",
        max: (n) => `Maximum ${n} characters allowed.`,
      },
    },
    footer: {
      copy: (year) => `© ${year}. All rights reserved.`,
      socialLabel: "Social links",
    },
  },

  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      service: "Servicios",
      work: "Proyectos",
      contact: "Contacto",
      toggleLanguage: "Cambiar a inglés",
      toggleThemeToLight: "Cambiar a tema claro",
      toggleThemeToDark: "Cambiar a tema oscuro",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    header: {
      status: "Disponible para nuevos proyectos",
      greeting: "Hola, soy",
      name: "Mateo",
      role: "Desarrollador full-stack enfocado en construir aplicaciones web confiables y escalables",
      cta1: "Contáctame",
      cta2: "Descargar CV",
      imageAlt: "Mateo Garcia – Desarrollador Full-stack",
    },
    about: {
      label: "Sobre mí",
      bio: "Soy desarrollador full-stack con 3 años de experiencia construyendo aplicaciones web reales. Trabajo en frontend y backend, creando interfaces limpias, APIs confiables y soluciones escalables que resuelven problemas reales de negocio.",
      skillsTitle: "Stack principal",
      tagsTitle: "También trabajo con",
    },
    service: {
      label: "Lo que ofrezco",
      title: "Servicios",
      desc: "Soluciones de software a medida para crear, mejorar y escalar productos digitales, desde el desarrollo hasta la implementación.",
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
      desc: "¿Tienes un proyecto en mente o necesitas ayuda con una solución web? Contáctame — estoy abierto a nuevas oportunidades.",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      namePH: "Tu nombre",
      emailPH: "tu@ejemplo.com",
      messagePH: "Cuéntame sobre tu proyecto...",
      send: "Enviar mensaje",
      sending: "Enviando...",
      success: "¡Mensaje enviado! Te responderé pronto.",
      networkErr: "Error de red. Por favor, inténtalo de nuevo.",
      submitErr: "No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme directamente.",
      errors: {
        required: "Este campo es obligatorio.",
        email: "Ingresa un correo electrónico válido.",
        max: (n) => `Máximo ${n} caracteres permitidos.`,
      },
    },
    footer: {
      copy: (year) => `© ${year}. Todos los derechos reservados.`,
      socialLabel: "Enlaces sociales",
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
