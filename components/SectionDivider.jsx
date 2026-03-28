/**
 * SectionDivider
 *
 * Separador visual entre secciones. Usa un gradiente horizontal
 * que se desvanece en los extremos, dando sensación de profundidad
 * sin ser intrusivo.
 *
 * Uso:
 *   <SectionDivider />              — separador completo
 *   <SectionDivider short />        — versión corta centrada (40% del ancho)
 *   <SectionDivider glow />         — con pulso de acento (para secciones clave)
 */
export default function SectionDivider({ short = false, glow = false }) {
  return (
    <div
      role="separator"
      aria-hidden="true"
      style={{
        width:  short ? "40%" : "100%",
        margin: short ? "0 auto" : "0",
        height: "1px",
        background: glow
          ? `linear-gradient(
               90deg,
               transparent        0%,
               rgba(124,111,247,0.15) 20%,
               rgba(124,111,247,0.40) 50%,
               rgba(124,111,247,0.15) 80%,
               transparent        100%
             )`
          : `linear-gradient(
               90deg,
               transparent          0%,
               var(--border-default) 20%,
               var(--border-default) 80%,
               transparent          100%
             )`,
        border: "none",
        flexShrink: 0,
      }}
    />
  );
}