"use client";
import { useState, useRef, useEffect } from "react";

/**
 * Contact — versión mejorada
 * - Form limpio con estados de focus
 * - Contador de caracteres por campo
 * - Estado de envío con feedback visual
 * - Layout de dos columnas en desktop
 */

export default function Contact({ language }) {
  const sectionRef = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent]   = useState(false);
  const [sending, setSending] = useState(false);

  const LIMITS = { name: 150, email: 256, message: 500 };

  const content = {
    en: {
      label:        "Get in touch",
      title:        "Let's work together",
      desc:         "Have a project in mind or need help building a web solution? Feel free to reach out — I'm open to new opportunities.",
      name:         "Name",
      email:        "Email",
      message:      "Message",
      namePH:       "Your name",
      emailPH:      "you@example.com",
      messagePH:    "Tell me about your project...",
      send:         "Send message",
      sending:      "Sending...",
      thanks:       "Message sent! I'll get back to you soon.",
    },
    es: {
      label:        "Contacto",
      title:        "Trabajemos juntos",
      desc:         "¿Tienes un proyecto en mente o necesitas ayuda con una solución web? Contáctame — estoy abierto a nuevas oportunidades.",
      name:         "Nombre",
      email:        "Email",
      message:      "Mensaje",
      namePH:       "Tu nombre",
      emailPH:      "tu@ejemplo.com",
      messagePH:    "Cuéntame sobre tu proyecto...",
      send:         "Enviar mensaje",
      sending:      "Enviando...",
      thanks:       "¡Mensaje enviado! Te responderé pronto.",
    },
  };

  const t = content[language] || content.en;

  // Fade-in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el) =>
              el.classList.add("visible")
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const limit = LIMITS[name];
    setForm((f) => ({ ...f, [name]: value.slice(0, limit) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending || sent) return;
    setSending(true);
    // Simula envío (reemplazar con tu lógica real)
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="section" id="contact" ref={sectionRef}>
      <div className="container">
        <span className="section-label fade-up">{t.label}</span>
        <h2 className="section-title fade-up" data-delay="1">{t.title}</h2>
        <p className="section-desc fade-up" data-delay="2">{t.desc}</p>

        <div className="contact-wrap fade-up" data-delay="3">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="form-group">
              <label htmlFor="contact-name">{t.name}</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t.namePH}
                required
                autoComplete="name"
              />
              <div className="form-meta">
                <span />
                <span className={`char-count ${form.name.length > LIMITS.name * 0.9 ? "near-limit" : ""}`}>
                  {form.name.length}/{LIMITS.name}
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="contact-email">{t.email}</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t.emailPH}
                required
                autoComplete="email"
              />
              <div className="form-meta">
                <span />
                <span className={`char-count ${form.email.length > LIMITS.email * 0.9 ? "near-limit" : ""}`}>
                  {form.email.length}/{LIMITS.email}
                </span>
              </div>
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="contact-message">{t.message}</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t.messagePH}
                required
                rows={5}
              />
              <div className="form-meta">
                <span />
                <span className={`char-count ${form.message.length > LIMITS.message * 0.9 ? "near-limit" : ""}`}>
                  {form.message.length}/{LIMITS.message}
                </span>
              </div>
            </div>

            {/* Submit */}
            <div className="form-submit">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={sending || sent}
                aria-disabled={sending || sent}
                style={{ opacity: sending ? 0.7 : 1 }}
              >
                {sending ? (
                  <>
                    <LoadingSpinner />
                    {t.sending}
                  </>
                ) : (
                  <>
                    {t.send}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </>
                )}
              </button>

              {sent && (
                <span className="submit-feedback show" role="status">
                  ✓ {t.thanks}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function LoadingSpinner() {
  return (
    <svg
      width="14" height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <line x1="12" y1="2" x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
      <line x1="2" y1="12" x2="6" y2="12"/>
      <line x1="18" y1="12" x2="22" y2="12"/>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
    </svg>
  );
}


