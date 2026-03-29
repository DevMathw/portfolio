"use client";
import { useState, useRef, useEffect } from "react";

// ── Constantes ────────────────────────────────────────────────
const MAX         = { name: 150, email: 256, message: 500 };
const emailRegex  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Clave pública de Web3Forms (igual que el original)
const WEB3_KEY    = "11f94cd1-f520-49aa-b4ee-cfa4098d050c";

// ── Textos i18n ───────────────────────────────────────────────
const content = {
  en: {
    label:      "Get in touch",
    title:      "Let's work together",
    desc:       "Have a project in mind or need help building a web solution? Feel free to reach out — I'm open to new opportunities.",
    name:       "Name",
    email:      "Email",
    message:    "Message",
    namePH:     "Your name",
    emailPH:    "you@example.com",
    messagePH:  "Tell me about your project...",
    send:       "Send message",
    sending:    "Sending...",
    success:    "Message sent! I'll get back to you soon.",
    networkErr: "Network error. Please try again later.",
    errors: {
      required: "This field is required.",
      email:    "Please enter a valid email address.",
      max:      (n) => `Maximum ${n} characters allowed.`,
    },
  },
  es: {
    label:      "Contacto",
    title:      "Trabajemos juntos",
    desc:       "¿Tienes un proyecto en mente o necesitas ayuda con una solución web? Contáctame — estoy abierto a nuevas oportunidades.",
    name:       "Nombre",
    email:      "Email",
    message:    "Mensaje",
    namePH:     "Tu nombre",
    emailPH:    "tu@ejemplo.com",
    messagePH:  "Cuéntame sobre tu proyecto...",
    send:       "Enviar mensaje",
    sending:    "Enviando...",
    success:    "¡Mensaje enviado! Te responderé pronto.",
    networkErr: "Error de red. Por favor, inténtalo de nuevo.",
    errors: {
      required: "Este campo es obligatorio.",
      email:    "Ingresa un correo electrónico válido.",
      max:      (n) => `Máximo ${n} caracteres permitidos.`,
    },
  },
};

// ── Componente principal ──────────────────────────────────────
export default function Contact({ language }) {
  const sectionRef = useRef(null);

  const [form,      setForm]      = useState({ name: "", email: "", message: "" });
  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false); // ¿se intentó enviar?
  const [loading,   setLoading]   = useState(false);
  const [success,   setSuccess]   = useState(false);

  const t = content[language] ?? content.en;

  // Reset errores y estado al cambiar idioma (igual que el original)
  useEffect(() => {
    setErrors({});
    setSubmitted(false);
  }, [language]);

  // Auto-ocultar toast de éxito tras 3 s (igual que el original)
  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(false), 3000);
    return () => clearTimeout(timer);
  }, [success]);

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

  // ── Validación (igual que el original) ─────────────────────
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) {
      errs.name = t.errors.required;
    } else if (form.name.length > MAX.name) {
      errs.name = t.errors.max(MAX.name);
    }
    if (!form.email.trim()) {
      errs.email = t.errors.required;
    } else if (!emailRegex.test(form.email)) {
      errs.email = t.errors.email;
    } else if (form.email.length > MAX.email) {
      errs.email = t.errors.max(MAX.email);
    }
    if (!form.message.trim()) {
      errs.message = t.errors.required;
    } else if (form.message.length > MAX.message) {
      errs.message = t.errors.max(MAX.message);
    }
    return errs;
  };

  // ── Envío real con Web3Forms (igual que el original) ───────
  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("access_key",  WEB3_KEY);
    formData.append("subject",     "New message from portfolio");
    formData.append("from_name",   "Portfolio Contact");
    formData.append("name",        form.name);
    formData.append("email",       form.email);
    formData.append("message",     form.message);

    try {
      const res  = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body:   formData,
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
        setErrors({});
        setSubmitted(false);
      }
    } catch {
      alert(t.networkErr);
    } finally {
      setLoading(false);
    }
  };

  // ── Helpers de cambio de campo ──────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Limpiar error del campo mientras el usuario escribe
    if (submitted && errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ── Render ────────────────────────────────────────────────
  return (
    <>
      <section className="section" id="contact" ref={sectionRef}>
        <div className="container">
          <span className="section-label fade-up">{t.label}</span>
          <h2 className="section-title fade-up" data-delay="1">{t.title}</h2>
          <p className="section-desc fade-up" data-delay="2">{t.desc}</p>

          <div className="contact-wrap fade-up" data-delay="3">
            <form className="contact-form" onSubmit={onSubmit} noValidate>

              {/* ── Name ── */}
              <div className="form-group">
                <label htmlFor="contact-name">{t.name}</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t.namePH}
                  autoComplete="off"
                  style={submitted && errors.name ? { borderColor: "var(--danger)" } : {}}
                />
                <div className="form-meta">
                  {submitted && errors.name
                    ? <span className="field-error">{errors.name}</span>
                    : <span />
                  }
                  <span className={`char-count ${form.name.length > MAX.name * 0.9 ? "near-limit" : ""}`}>
                    {form.name.length}/{MAX.name}
                  </span>
                </div>
              </div>

              {/* ── Email ── */}
              <div className="form-group">
                <label htmlFor="contact-email">{t.email}</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t.emailPH}
                  autoComplete="off"
                  style={submitted && errors.email ? { borderColor: "var(--danger)" } : {}}
                />
                <div className="form-meta">
                  {submitted && errors.email
                    ? <span className="field-error">{errors.email}</span>
                    : <span />
                  }
                  <span className={`char-count ${form.email.length > MAX.email * 0.9 ? "near-limit" : ""}`}>
                    {form.email.length}/{MAX.email}
                  </span>
                </div>
              </div>

              {/* ── Message ── */}
              <div className="form-group">
                <label htmlFor="contact-message">{t.message}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t.messagePH}
                  rows={5}
                  style={submitted && errors.message ? { borderColor: "var(--danger)" } : {}}
                />
                <div className="form-meta">
                  {submitted && errors.message
                    ? <span className="field-error">{errors.message}</span>
                    : <span />
                  }
                  <span className={`char-count ${form.message.length > MAX.message * 0.9 ? "near-limit" : ""}`}>
                    {form.message.length}/{MAX.message}
                  </span>
                </div>
              </div>

              {/* ── Submit ── */}
              <div className="form-submit">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  aria-disabled={loading}
                  style={{ opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? (
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
              </div>

            </form>
          </div>
        </div>
      </section>

      {/* ── Toast de éxito (igual al original, sin framer-motion) ── */}
      {success && (
        <div className="toast-overlay" role="status" aria-live="polite">
          <div className="toast-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            {t.success}
          </div>
        </div>
      )}
    </>
  );
}

// ── Spinner SVG inline ────────────────────────────────────────
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
      <line x1="12" y1="2"    x2="12" y2="6"/>
      <line x1="12" y1="18"   x2="12" y2="22"/>
      <line x1="4.93" y1="4.93"   x2="7.76" y2="7.76"/>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
      <line x1="2"  y1="12"   x2="6"  y2="12"/>
      <line x1="18" y1="12"   x2="22" y2="12"/>
      <line x1="4.93" y1="19.07"  x2="7.76" y2="16.24"/>
      <line x1="16.24" y1="7.76"  x2="19.07" y2="4.93"/>
    </svg>
  );
}


