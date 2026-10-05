import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { productHref } from '../utils/routing';
import { tw } from '../styles/tailwind';

/**
 * Tarjeta de producto.
 *
 * `@property` convierte campos de la clase en propiedades reactivas.
 * Si cambian, Lit vuelve a ejecutar `render()` solo para este componente.
 *
 * El CTA navega a `#producto/<id>` (mini-router por hash).
 */
@customElement('product-card')
export class ProductCard extends LitElement {
  static styles = [
    tw,
    css`
      :host {
        display: block;
        height: 100%;
      }

      .visual {
        background:
          radial-gradient(circle at 30% 25%, rgb(255 255 255 / 0.16), transparent 42%),
          linear-gradient(160deg, var(--accent, #6b7c3e), #1c2118 85%);
      }

      .card {
        transition:
          transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1),
          box-shadow 350ms ease;
      }

      .card:hover {
        transform: translateY(-6px);
        box-shadow: 0 24px 50px rgb(28 33 24 / 0.12);
      }

      .card:hover .orb {
        transform: scale(1.08) translateY(-4px);
      }

      .orb {
        transition: transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1);
      }
    `,
  ];

  @property({ attribute: 'product-id' })
  productId = '';

  @property()
  name = '';

  @property()
  tag = '';

  /** Binding con punto (.description) evita pasar textos largos como atributo. */
  @property()
  description = '';

  @property({ type: Number })
  price = 0;

  @property()
  accent = '#6B7C3E';

  private get detailHref() {
    return productHref(this.productId);
  }

  render() {
    return html`
      <article
        class="card flex h-full flex-col overflow-hidden rounded-3xl border border-ink/8 bg-white"
        style="--accent: ${this.accent}"
      >
        <a href=${this.detailHref} class="visual relative flex h-48 items-center justify-center md:h-56">
          <span
            class="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink"
          >
            ${this.tag}
          </span>
          <div
            class="orb grid h-24 w-24 place-items-center rounded-full border border-surface/25 bg-surface/10 shadow-[inset_0_0_30px_rgb(255_255_255_/_0.12)] backdrop-blur-sm"
            aria-hidden="true"
          >
            <div class="h-10 w-10 rounded-full bg-surface/85"></div>
          </div>
        </a>

        <div class="flex flex-1 flex-col gap-3 p-6">
          <h3 class="font-display text-xl font-bold tracking-tight text-ink">
            <a href=${this.detailHref} class="transition hover:text-olive">${this.name}</a>
          </h3>
          <p class="flex-1 text-sm leading-relaxed text-ink/65">${this.description}</p>
          <div class="mt-2 flex items-center justify-between gap-3 border-t border-ink/8 pt-4">
            <p class="font-display text-2xl font-bold text-olive">
              ${this.price}<span class="text-base font-semibold text-ink/45"> €</span>
            </p>
            <a
              href=${this.detailHref}
              class="inline-flex h-11 items-center rounded-full bg-ink px-4 text-xs font-bold uppercase tracking-[0.12em] text-surface transition hover:bg-olive"
            >
              Ver detalle
            </a>
          </div>
        </div>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'product-card': ProductCard;
  }
}
