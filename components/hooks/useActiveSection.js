"use client";
import { useState, useEffect } from "react";
import { useRef } from "react";

/**
 * useActiveSection
 *
 * Detecta qué sección está activa usando un scroll listener
 * con getBoundingClientRect(). Funciona correctamente con
 * secciones de cualquier altura sin importar la velocidad del scroll.
 *
 * Lógica: la sección activa es la que tenga su borde superior
 * más cercano al offset del navbar (56px) sin haberlo sobrepasado
 * hacia arriba todavía — es decir, la última sección cuyo top
 * ya cruzó el umbral del navbar.
 *
 * @param {string[]} sectionIds - IDs de las secciones a observar
 * @param {number}   navHeight  - Altura del navbar fijo en px (default 56)
 */
export function useActiveSection(sectionIds = [], navHeight = 56) {
  const [active, setActive] = useState(sectionIds[0] || "");

  useEffect(() => {
    if (!sectionIds.length) return;

    const getActive = () => {
      // Recorre las secciones de abajo hacia arriba y devuelve
      // la primera cuyo top ya pasó el umbral del navbar
      const scrollY = window.scrollY;

      // Pequeño offset extra para que el cambio ocurra un poco
      // antes de llegar al borde exacto de la sección
      const offset = navHeight + 80;

      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop - offset <= scrollY) {
          current = id;
        }
      }

      return current;
    };

    // Throttle manual sin librerías: solo procesa 1 vez cada 16ms (~60fps)
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setActive(getActive());
          ticking = false;
        });
        ticking = true;
      }
    };

    // Calcular el estado inicial (por si la página carga en medio de un scroll)
    setActive(getActive());

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);

  }, [sectionIds.join(","), navHeight]);

  return active;
}