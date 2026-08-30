"use client";
import { useCallback, useSyncExternalStore } from "react";

/**
 * useHtmlPreference
 *
 * Lee y escribe una preferencia del usuario (tema, idioma) que vive como
 * atributo del <html> y se persiste en localStorage.
 *
 * Por qué así y no con useState + useEffect:
 * el script inline de layout.js ya aplica la preferencia guardada ANTES del
 * primer paint. Si React la duplicara en su propio estado tendríamos dos
 * fuentes de verdad, un render inicial con el valor equivocado (el icono de
 * tema parpadeaba) y un setState síncrono dentro de un efecto — patrón que
 * React 19 desaconseja explícitamente.
 *
 * useSyncExternalStore es la API pensada para esto: durante el SSR y la
 * hidratación usa `serverValue`, y justo después re-renderiza con el valor
 * real del DOM, sin desajustes de hidratación.
 */

// Suscriptores compartidos: cualquier cambio notifica a todos los hooks,
// y cada uno recalcula su propio snapshot (una simple cadena de texto).
const listeners = new Set();

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const emit = () => {
  for (const listener of listeners) listener();
};

/**
 * localStorage lanza excepción en Safari privado y con cookies bloqueadas.
 * Fallar aquí no debe impedir que la preferencia se aplique en la sesión.
 */
const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* almacenamiento no disponible: la preferencia solo dura la sesión */
  }
};

/**
 * @param {object}   options
 * @param {string}   options.attribute   - atributo del <html> (p. ej. "lang")
 * @param {string}   options.storageKey  - clave de localStorage
 * @param {string[]} options.values      - valores admitidos
 * @param {string}   options.serverValue - valor usado en SSR e hidratación
 * @returns {[string, (next: string) => void]}
 */
export function useHtmlPreference({ attribute, storageKey, values, serverValue }) {
  const getSnapshot = () => {
    const current = document.documentElement.getAttribute(attribute);
    return values.includes(current) ? current : serverValue;
  };

  const value = useSyncExternalStore(subscribe, getSnapshot, () => serverValue);

  const setValue = useCallback(
    (next) => {
      if (!values.includes(next)) return;
      document.documentElement.setAttribute(attribute, next);
      writeStorage(storageKey, next);
      emit();
    },
    // `values` es un array literal estable definido a nivel de módulo
    // en los consumidores, así que no reintroduce identidad cambiante.
    [attribute, storageKey, values]
  );

  return [value, setValue];
}

export default useHtmlPreference;
