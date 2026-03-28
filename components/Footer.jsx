/**
 * Footer — versión mejorada
 * - Layout limpio con tres columnas
 * - Bio corta + copyright + links
 * - Monospace para el logo
 */

export default function Footer({ language }) {
  const content = {
    en: {
      bio:  "Full-stack developer · Clean, scalable, accessible web.",
      copy: `© ${new Date().getFullYear()}. All rights reserved.`,
      links: [
        { label: "GitHub",   href: "https://github.com/DevMathw" },
        { label: "LinkedIn", href: "https://linkedin.com" },
        { label: "Email",    href: "mailto:hello@mat.dev" },
      ],
    },
    es: {
      bio:  "Desarrollador full-stack · Web limpia, escalable y accesible.",
      copy: `© ${new Date().getFullYear()}. Todos los derechos reservados.`,
      links: [
        { label: "GitHub",   href: "https://github.com/DevMathw" },
        { label: "LinkedIn", href: "https://linkedin.com" },
        { label: "Email",    href: "mailto:hello@mat.dev" },
      ],
    },
  };

  const t = content[language] || content.en;

  return (
    <footer>
      <div className="footer-inner">
        <span className="footer-logo">mat<span style={{ color: "var(--text-accent)" }}>.</span>dev</span>
        <span className="footer-copy">{t.copy}</span>
        <nav className="footer-links" aria-label="Social links">
          {t.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}


