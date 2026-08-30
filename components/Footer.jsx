import { getTexts } from "@/components/language/texts";

/**
 * Footer
 * - Logo monospace + copyright + enlaces sociales
 *
 * Los enlaces son idénticos en ambos idiomas, así que viven aquí como
 * datos en lugar de duplicarse en el diccionario de textos.
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
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-inner">
        <span className="footer-logo">
          mat<span style={{ color: "var(--text-accent)" }}>.</span>dev
        </span>
        <span className="footer-copy">{t.copy(year)}</span>
        <div className="footer-links" aria-label={t.socialLabel}>
          {SOCIAL_LINKS.map((link) => {
            const isMail = link.href.startsWith("mailto:");
            return (
              <a key={link.label} href={link.href} target={isMail ? undefined : "_blank"} rel={isMail ? undefined : "noopener noreferrer"}>
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
