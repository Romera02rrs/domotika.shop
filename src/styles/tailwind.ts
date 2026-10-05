/**
 * Puente Tailwind ↔ Shadow DOM
 * ------------------------------
 * Lit renderiza el template de cada componente dentro de un Shadow Root.
 * Las hojas de estilo del documento (index.html / body) NO atraviesan esa
 * frontera: las clases de Tailwind quedarían sin efecto.
 *
 * Solución: importamos el CSS compilado como string (`?inline`) y lo
 * convertimos con `unsafeCSS` para usarlo en `static styles` de cada
 * componente. Lit reutiliza constructable stylesheets, así que no se
 * duplica el coste por cada instancia.
 *
 * `unsafeCSS` es seguro aquí porque el string viene de nuestro propio
 * archivo de estilos, no de input de usuario.
 */
import { unsafeCSS } from 'lit';
import globalCss from './global.css?inline';

export const tw = unsafeCSS(globalCss);
