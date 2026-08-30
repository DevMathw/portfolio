"use client";
import { useSyncExternalStore } from "react";

/**
 * useMediaQuery
 *
 * Devuelve si una media query se cumple ahora mismo, reaccionando a los
 * cambios de viewport.
 *
 * Se usa useSyncExternalStore en lugar de useState + useEffect porque
 * matchMedia es exactamente eso: un store externo. Así no hay setState
 * síncrono dentro de un efecto ni desajuste de hidratación.
 *
 * @param {string}  query        - media query CSS
 * @param {boolean} serverValue  - valor durante SSR e hidratación
 */
export function useMediaQuery(query, serverValue = false) {
  const subscribe = (listener) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  };

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue
  );
}

export default useMediaQuery;
