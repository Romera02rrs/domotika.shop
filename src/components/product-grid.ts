import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { products } from '../data/products';
import { observeReveal } from '../utils/reveal';
import { tw } from '../styles/tailwind';
import './product-card';

/**
 * Grid de productos.
 *
 * `map()` (directiva de Lit) itera colecciones de forma eficiente.
 * Cada tarjeta enlaza a `#producto/<id>` para abrir la inspección.
 */
@customElement('product-grid')
export class ProductGrid extends LitElement {
  static styles = [
    tw,
    css`
      :host {
        display: block;
      }

      [data-reveal] {
        opacity: 0;
        transform: translateY(28px);
        transition:
          opacity 800ms ease,
          transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1);
      }

      [data-reveal].is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      [data-reveal]:nth-child(2) {
        transition-delay: 80ms;
      }

      [data-reveal]:nth-child(3) {
        transition-delay: 160ms;
      }
    `,
  ];

  firstUpdated() {
    observeReveal(this.renderRoot);
  }

  render() {
    return html`
      <section id="productos" class="bg-surface px-5 py-20 md:px-8 md:py-28">
        <div class="mx-auto max-w-6xl">
          <div class="max-w-xl" data-reveal>
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-olive">Catálogo</p>
            <h2
              class="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-ink"
            >
              Tres piezas. Todo lo esencial.
            </h2>
            <p class="mt-4 text-base leading-relaxed text-ink/65 md:text-lg">
              Solo hardware oficial Home Assistant: el hub y los dos conectores de radio más útiles
              para empezar. Abre cada producto para ver la ficha completa.
            </p>
          </div>

          <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            ${map(
              products,
              (product) => html`
                <div data-reveal>
                  <product-card
                    product-id=${product.id}
                    name=${product.name}
                    tag=${product.tag}
                    .description=${product.description}
                    .price=${product.price}
                    accent=${product.accent}
                  ></product-card>
                </div>
              `,
            )}
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'product-grid': ProductGrid;
  }
}
