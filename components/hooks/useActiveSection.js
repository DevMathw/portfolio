"use client";
import { useState, useEffect } from "react";

/**
 * useActiveSection
 *
 * Detecta qué sección está activa comparando scrollY con el offsetTop de
 * cada sección: la activa es la última cuyo borde superior ya cruzó el
 * umbral del navbar.
 *
 * Las posiciones se leen en cada frame y NO se cachean. Se intentó cachear
 * y recalcular solo al redimensionar, pero el alto del documento cambia por
 * motivos que un listener de resize no ve a tiempo —fuentes que terminan de
 * cargar, cambio de idioma, imágenes— y el nav se quedaba marcando la
 * sección anterior. Son 5 lecturas por frame, ya limitado a ~60fps: ese
 * costo es irrelevante frente a tener el resaltado mal.
 *
 * @param {string[]} sectionIds - IDs de las secciones, en orden del documento
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

    const resolveActive = () => {
      const scrollY = window.scrollY;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop - threshold <= scrollY) current = id;
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

    // El resize actualiza directo, sin pasar por requestAnimationFrame: es
    // poco frecuente, no necesita throttle, y así el resaltado no depende de
    // una sola vía si los frames se pausan (pestaña en segundo plano).
    const onResize = () => setActive(resolveActive());

    // Estado inicial diferido al siguiente frame: fijarlo de forma síncrona
    // en el cuerpo del efecto dispara un render en cascada.
    const initialFrame = requestAnimationFrame(() => setActive(resolveActive()));

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [idsKey, navHeight]);

  return active;
}

export default useActiveSection;
