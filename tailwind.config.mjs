/** @type {import('tailwindcss').Config} */

// ──────────────────────────────────────────────────────────────
// tailwind.config.mjs — Portfolio Mateo Garcia
//
// NOTA: El grueso del sistema de diseño vive en globals.css
// via CSS custom properties (--bg-base, --accent, etc.).
// Tailwind se usa aquí como capa de utilidades complementaria.
// ──────────────────────────────────────────────────────────────

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // ── Tema ──────────────────────────────────────────────────
  theme: {
    extend: {
      // Fuentes — apuntan a las variables CSS inyectadas por next/font
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-dm-mono)", "Fira Code", "monospace"],
      },

      // Paleta — espeja los tokens de globals.css para usar clases Tailwind si se necesitan
      colors: {
        bg: {
          base:     "#0a0a0b",
          surface:  "#111113",
          elevated: "#18181c",
          hover:    "#1f1f25",
        },
        accent: {
          DEFAULT: "#7c6ff7",
          hover:   "#6d61e8",
          subtle:  "rgba(124,111,247,0.12)",
        },
        txt: {
          primary:   "#f0eff2",
          secondary: "#8b8a96",
          tertiary:  "#55545e",
          accent:    "#a78bfa",
          link:      "#818cf8",
        },
        border: {
          subtle:  "rgba(255,255,255,0.06)",
          default: "rgba(255,255,255,0.10)",
          strong:  "rgba(255,255,255,0.16)",
        },
        ok:  "#34d399",
        err: "#f87171",
      },

      // Espaciado extra — complementa el sistema base de Tailwind
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "88": "22rem",
        "112": "28rem",
        "128": "32rem",
      },

      // Border radius — espeja los tokens --radius-*
      borderRadius: {
        sm:   "6px",
        md:   "10px",
        lg:   "16px",
        full: "9999px",
      },

      // Max width de contenedor
      maxWidth: {
        content: "1000px",
        form:    "560px",
      },

      // Sombras
      boxShadow: {
        sm:   "0 1px 3px rgba(0,0,0,0.4)",
        md:   "0 4px 16px rgba(0,0,0,0.5)",
        glow: "0 0 24px rgba(124,111,247,0.15)",
      },

      // Animaciones personalizadas
      animation: {
        "pulse-dot":  "pulse-dot 2s ease-in-out infinite",
        "fade-up":    "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "spin-slow":  "spin 0.8s linear infinite",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(52,211,153,0.4)" },
          "50%":      { boxShadow: "0 0 0 5px rgba(52,211,153,0)" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      // Transiciones
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        "220": "220ms",
      },
    },
  },

  plugins: [],
};

export default config