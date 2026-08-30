"use client";
import { useState, useEffect } from "react";

/**
 * useActiveSection
 *
 * Detecta qué sección está activa comparando scrollY con el offsetTop de
 * cada sección. Más fiable que IntersectionObserver para secciones de
 * altura muy variable: la sección activa es siempre la última cuyo borde
 * superior ya cruzó el umbral del navbar.
 *
 * Optimización: las posiciones se cachean y solo se recalculan al
 * redimensionar, en lugar de leer offsetTop en cada frame de scroll
 * (cada lectura fuerza un reflow del layout).
 *
 * @param {string[]} sectionIds - IDs de las secciones a observar
 * @param {number}   navHeight  - Altura del navbar fijo en px
 * @returns {string} id de la sección activa
 */
export function useActiveSection(sectionIds = [], navHeight = 56) {
  const [active, setActive] = useState(sectionIds[0] ?? "");

  // sectionIds suele ser un array literal: lo serializamos para que el
  // efecto no se reejecute en cada render por identidad de referencia.
  const idsKey = sectionIds.join(",");

  useEffect(() => {
    const ids = idsKey ? idsKey.split(",") : [];
    if (!ids.length) return;

    // Umbral: altura del nav + margen para que el cambio se anticipe un poco.
    const threshold = navHeight + 80;

    /** Posiciones cacheadas: [{ id, top }] ordenadas como en `ids`. */
    let offsets = [];

    const measure = () => {
      offsets = ids
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.offsetTop } : null;
        })
        .filter(Boolean);
    };

    const resolveActive = () => {
      const scrollY = window.scrollY;
      let current = ids[0];
      for (const { id, top } of offsets) {
        if (top - threshold <= scrollY) current = id;
      }
      return current;
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setActive(resolveActive());
        ticking = false;
      });
    };

    const onResize = () => {
      measure();
      setActive(resolveActive());
    };

    // Estado inicial (cubre recargas en mitad de la página). Se difiere al
    // siguiente frame: medir y fijar estado de forma síncrona en el cuerpo
    // del efecto dispara un render en cascada (react-hooks/set-state-in-effect)
    // y además leería el layout antes de que el navegador haya pintado.
    const initialFrame = requestAnimationFrame(() => {
      measure();
      setActive(resolveActive());
    });

    // El alto del documento cambia al cargar fuentes o al cambiar de idioma
    // (los textos ES son más largos). ResizeObserver mantiene el caché al día.
    const bodyObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
    bodyObserver?.observe(document.body);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(initialFrame);
      bodyObserver?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [idsKey, navHeight]);

  return active;
}

export default useActiveSection;
