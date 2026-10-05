/**
 * Mini-router por hash (sin librerías).
 *
 * Rutas que entiende Domotika:
 * - `#inicio` / `#productos` / `#faq` → homepage (secciones)
 * - `#producto/ha-green` → vista de inspección de un producto
 *
 * Así practicas estado de navegación en Lit sin montar un router completo.
 */

export type Route =
  | { name: 'home'; hash: string }
  | { name: 'product'; productId: string };

const PRODUCT_PREFIX = '#producto/';

export function parseRoute(hash = window.location.hash): Route {
  if (hash.startsWith(PRODUCT_PREFIX)) {
    const productId = decodeURIComponent(hash.slice(PRODUCT_PREFIX.length));
    if (productId) {
      return { name: 'product', productId };
    }
  }

  return { name: 'home', hash: hash || '#inicio' };
}

export function productHref(productId: string): string {
  return `${PRODUCT_PREFIX}${productId}`;
}

export function goHome(section = 'productos') {
  window.location.hash = section;
}
