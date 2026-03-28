"use client";
import { useState, useEffect } from "react";

/**
 * useActiveSection
 *
 * Observa las secciones del DOM y devuelve el id de la sección
 * actualmente visible. Mucho más preciso que calcular scroll
 * manualmente, y sin pérdida de rendimiento porque usa
 * IntersectionObserver en lugar de un listener de scroll.
 *
 * Uso:
 *   const active = useActiveSection(["home", "about", "work", "contact"]);
 *
 * @param {string[]} sectionIds  - IDs de las secciones a observar
 * @param {number}   threshold   - Porcentaje de visibilidad requerido (0-1)
 * @param {string}   rootMargin  - Margen del viewport para el observer
 * @returns {string}             - ID de la sección activa
 */
export function useActiveSection(
  sectionIds = [],
  threshold = 0.4,
  rootMargin = "-20% 0px -60% 0px"
) {
  const [active, setActive] = useState(sectionIds[0] || "");

  useEffect(() => {
    if (!sectionIds.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold, rootMargin }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds.join(","), threshold, rootMargin]);

  return active;
}