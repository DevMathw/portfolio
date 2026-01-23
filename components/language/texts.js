const texts = {
  en: {
    languages: {
      en: 'English',
      es: 'Spanish',
    },

    nav: {
      home: 'Home',
      about: 'About',
      work: 'Work',
      contact: 'Contact',
    },

    header: {
      greeting: "Hi, I’m Mateo",
      title: 'Full-stack developer focused on building',
      highlight: 'reliable and scalable web applications',
      contact: 'Contact me',
      download: 'Download CV',
    },

    about: {
      title: 'About Me',
      description:
        'I’m a full-stack developer with 3 years of experience building real-world web applications. I work across frontend and backend, creating clean user interfaces, reliable APIs, and scalable solutions that solve real business problems.',
      experience: 'experience',
      skillsLabel: 'Technical skills',
    },

    work: {
      title: 'Selected Work',
      description:
        'A selection of real-world projects where I designed, built, and delivered full-stack solutions using modern technologies.',
      live: 'Live',
      code: 'Code',
      more: 'View more on GitHub',
    },

    contact: {
      title: "Let’s work together",
      subtitle:
        'Have a project in mind or need help building a web solution? Feel free to reach out — I’m open to new opportunities.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending…',
      success: 'Thanks! Your message has been sent.',
    },

    errors: {
      required: 'This field is required',
      email: 'Invalid email format',
      max: (n) => `Maximum ${n} characters`,
    },

    footer: {
      description:
        'Full-stack developer focused on building clean, scalable, and accessible web applications.',
      rights: 'All rights reserved.',
      social: {
        github: 'GitHub',
        linkedin: 'LinkedIn',
        email: 'Email',
      },
    },
  },

  es: {
    languages: {
      en: 'Inglés',
      es: 'Español',
    },

    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      work: 'Proyectos',
      contact: 'Contacto',
    },

    header: {
      greeting: 'Hola, soy Mateo',
      title: 'Desarrollador full-stack enfocado en crear',
      highlight: 'aplicaciones web confiables y escalables',
      contact: 'Contáctame',
      download: 'Descargar CV',
    },

    about: {
      title: 'Sobre mí',
      description:
        'Soy desarrollador full-stack con 3 años de experiencia creando aplicaciones web reales. Trabajo tanto en frontend como backend, desarrollando interfaces claras, APIs confiables y soluciones escalables orientadas a resolver problemas de negocio.',
      experience: 'experiencia',
      skillsLabel: 'Habilidades técnicas',
    },

    work: {
      title: 'Proyectos destacados',
      description:
        'Una selección de proyectos reales donde diseñé, desarrollé y entregué soluciones full-stack utilizando tecnologías modernas.',
      live: 'Demo',
      code: 'Código',
      more: 'Ver más en GitHub',
    },

    contact: {
      title: 'Trabajemos juntos',
      subtitle:
        '¿Tienes un proyecto en mente o necesitas ayuda para construir una solución web? Escríbeme, estoy abierto a nuevas oportunidades.',
      name: 'Nombre',
      email: 'Correo electrónico',
      message: 'Mensaje',
      send: 'Enviar mensaje',
      sending: 'Enviando…',
      success: '¡Gracias! Tu mensaje ha sido enviado.',
    },

    errors: {
      required: 'Este campo es obligatorio',
      email: 'Formato de correo inválido',
      max: (n) => `Máximo ${n} caracteres`,
    },

    footer: {
      description:
        'Desarrollador full-stack enfocado en crear aplicaciones web limpias, escalables y accesibles.',
      rights: 'Todos los derechos reservados.',
      social: {
        github: 'GitHub',
        linkedin: 'LinkedIn',
        email: 'Correo',
      },
    },
  },
}

export default texts