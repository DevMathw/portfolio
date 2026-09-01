"use client";
import { useState, useEffect } from "react";
import { getTexts } from "@/components/language/texts";

// ── Constantes ────────────────────────────────────────────────
const MAX = { name: 150, email: 256, message: 500 };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Access key de Web3Forms. Es una clave pública por diseño (viaja al
// cliente en cualquier implementación), pero se lee de entorno para poder
// rotarla sin tocar código. El literal es el fallback histórico para que
// el formulario nunca quede muerto si falta la variable.
const WEB3_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "11f94cd1-f520-49aa-b4ee-cfa4098d050c";

const WEB3_ENDPOINT = "https://api.web3forms.com/submit";
const TOAST_MS = 3000;

const FIELDS = ["name", "email", "message"];

// ── Componente principal ──────────────────────────────────────
export default function Contact({ language }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // ¿se intentó enviar?
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(null); // "submit" | "network"

  const t = getTexts(language).contact;

  // Los errores se guardan como códigos ("required", "email", "max") y se
  // traducen al renderizar. Antes se guardaba el texto ya traducido, lo que
  // obligaba a limpiar el formulario entero al cambiar de idioma para que
  // no quedaran mensajes en el idioma anterior.
  const errorMessage = (field) => {
    const code = errors[field];
    if (!code) return null;
    if (code === "max") return t.errors.max(MAX[field]);
    return t.errors[code];
  };

  // Auto-ocultar el toast de éxito
  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(false), TOAST_MS);
    return () => clearTimeout(timer);
  }, [success]);

  // ── Validación ──────────────────────────────────────────────
  const validate = () => {
    const errs = {};

    if (!form.name.trim()) {
      errs.name = "required";
    } else if (form.name.length > MAX.name) {
      errs.name = "max";
    }

    if (!form.email.trim()) {
      errs.email = "required";
    } else if (!EMAIL_REGEX.test(form.email)) {
      errs.email = "email";
    } else if (form.email.length > MAX.email) {
      errs.email = "max";
    }

    if (!form.message.trim()) {
      errs.message = "required";
    } else if (form.message.length > MAX.message) {
      errs.message = "max";
    }

    return errs;
  };

  // ── Envío ───────────────────────────────────────────────────
  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormError(null);

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      // Lleva el foco al primer campo con error
      const first = FIELDS.find((f) => validationErrors[f]);
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("access_key", WEB3_KEY);
    formData.append("subject", "New message from portfolio");
    formData.append("from_name", "Portfolio Contact");
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("message", form.message);
    formData.append("botcheck", ""); // honeypot: los bots lo rellenan

    try {
      const res = await fetch(WEB3_ENDPOINT, { method: "POST", body: formData });
      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
        setErrors({});
        setSubmitted(false);
      } else {
        // Antes este caso fallaba en silencio: el spinner paraba y el
        // usuario no recibía ninguna señal de que el envío no funcionó.
        setFormError("submit");
      }
    } catch {
      setFormError("network");
    } finally {
      setLoading(false);
    }
  };

  // ── Cambio de campo ─────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Limpia el error del campo mientras el usuario corrige
    if (submitted && errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Props compartidas por los tres campos: evita repetir la lógica de
  // error/ARIA tres veces (antes estaba copiada en cada bloque).
  const fieldProps = (name) => {
    const invalid = Boolean(submitted && errors[name]);
    return {
      id: `contact-${name}`,
      name,
      value: form[name],
      onChange: handleChange,
      maxLength: MAX[name],
      className: invalid ? "has-error" : undefined,
      "aria-invalid": invalid || undefined,
      "aria-describedby": `contact-${name}-count${invalid ? ` contact-${name}-error` : ""}`,
    };
  };

  const renderMeta = (name) => {
    const invalid = Boolean(submitted && errors[name]);
    const nearLimit = form[name].length > MAX[name] * 0.9;
    return (
      <div className="form-meta">
        {invalid ? (
          <span className="field-error" id={`contact-${name}-error`} role="alert">
            {errorMessage(name)}
          </span>
        ) : (
          <span />
        )}
        <span
          className={`char-count ${nearLimit ? "near-limit" : ""}`}
          id={`contact-${name}-count`}
        >
          {form[name].length}/{MAX[name]}
        </span>
      </div>
    );
  };

  // ── Render ──────────────────────────────────────────────────
  return (
    <>
      <section className="section" id="contact">
        <div className="container">
          <span className="section-label fade-up">{t.label}</span>
          <h2 className="section-title fade-up" data-delay="1">
            {t.title}
          </h2>
          <p className="section-desc fade-up" data-delay="2">
            {t.desc}
          </p>

          <div className="contact-wrap fade-up" data-delay="3">
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              {/* Honeypot: invisible para personas, tentador para bots */}
              <input type="checkbox" name="botcheck" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true"
              />

              {/* ── Name ── */}
              <div className="form-group">
                <label htmlFor="contact-name">{t.name}</label>
                <input type="text" placeholder={t.namePH} autoComplete="name"
                  {...fieldProps("name")}
                />
                {renderMeta("name")}
              </div>

              {/* ── Email ── */}
              <div className="form-group">
                <label htmlFor="contact-email">{t.email}</label>
                <input type="email" placeholder={t.emailPH} autoComplete="email"
                  {...fieldProps("email")}
                />
                {renderMeta("email")}
              </div>

              {/* ── Message ── */}
              <div className="form-group">
                <label htmlFor="contact-message">{t.message}</label>
                <textarea rows={5} placeholder={t.messagePH} {...fieldProps("message")} />
                {renderMeta("message")}
              </div>

              {/* Error global de envío */}
              {formError && (
                <p className="form-error" role="alert">
                  {formError === "network" ? t.networkErr : t.submitErr}
                </p>
              )}

              {/* ── Submit ── */}
              <div className="form-submit">
                <button type="submit" className="btn btn-primary" disabled={loading}aria-busy={loading}>
                  {loading ? (
                    <>
                      <LoadingSpinner />
                      {t.sending}
                    </>
                  ) : (
                    <>
                      {t.send}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── Toast de éxito ── */}
      {/* La región live existe siempre: si se creara junto con el mensaje,
          los lectores de pantalla podrían no anunciarlo. */}
      <div className="toast-region" role="status" aria-live="polite">
        {success && (
          <div className="toast-overlay">
            <div className="toast-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {t.success}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ── Spinner SVG inline ────────────────────────────────────────
function LoadingSpinner() {
  return (
    <svg
      className="spinner"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  );
}
