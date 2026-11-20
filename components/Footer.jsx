import { getTexts } from "@/components/language/texts";
import { SERVICES } from "@/components/Services";

/**
 * Footer
 * - Marca + CTA, servicios y enlaces de contacto
 *
 * Los servicios se leen de Services.jsx en vez de duplicarse aquí: así una
 * oferta nueva aparece en los dos sitios sin tocar este archivo.
 */

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/DevMathw" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mateo-garcia-rodriguez-933135207/",
  },
  { label: "Email", href: "mailto:dev.mathew.coded@gmail.com" },
];

export default function Footer({ language }) {
  const t = getTexts(language).footer;
  const nav = getTexts(language).nav;
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Marca + llamada final */}
          <div className="footer-brand">
            <span className="footer-logo">
              mat<span style={{ color: "var(--text-accent)" }}>.</span>dev
            </span>
            <p className="footer-pitch">{t.pitch}</p>
            <a className="btn btn-primary footer-cta" href="#contact">
              {t.cta}
            </a>
          </div>

          {/* Servicios */}
          <nav className="footer-col" aria-label={nav.service}>
            <h2 className="footer-col-title">{nav.service}</h2>
            {SERVICES.map((sv) => (
              <a key={sv.id} href="#service">
                {sv.name[language] ?? sv.name.en}
              </a>
            ))}
          </nav>

          {/* Contacto */}
          <nav className="footer-col" aria-label={t.socialLabel}>
            <h2 className="footer-col-title">{nav.contact}</h2>
            {SOCIAL_LINKS.map((link) => {
              const isMail = link.href.startsWith("mailto:");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={isMail ? undefined : "_blank"}
                  rel={isMail ? undefined : "noopener noreferrer"}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">{t.copy(year)}</span>
          <span className="footer-copy">{t.location}</span>
        </div>
      </div>
    </footer>
  );
}
