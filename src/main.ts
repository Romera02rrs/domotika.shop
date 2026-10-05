/**
 * Punto de entrada de la app.
 *
 * En Lit / Web Components, importar un módulo que registra un custom element
 * con `@customElement('nombre-etiqueta')` es suficiente para que el navegador
 * conozca esa etiqueta. Por eso importamos cada componente aquí (side-effect).
 *
 * También cargamos `global.css` en el documento para tipografía y reset del
 * <body>. Los componentes, además, inyectan ese CSS en su Shadow Root vía
 * `src/styles/tailwind.ts`.
 */
import './styles/global.css';

import './components/app-root';
import './components/site-header';
import './components/hero-section';
import './components/product-grid';
import './components/product-card';
import './components/product-detail';
import './components/cart-drawer';
import './components/faq-section';
import './components/faq-item';
import './components/site-footer';
