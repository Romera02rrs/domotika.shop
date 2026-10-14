import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { getProductById } from '../data/products';
import { goHome } from '../utils/routing';
import { tw } from '../styles/tailwind';

/**
 * Vista de inspección de un producto.
 *
 * Recibe `productId` como `@property` desde `app-root`.
 */
@customElement('product-detail')
export class ProductDetail extends LitElement {
  static styles = [
    tw,
    css`
      :host {
        display: block;
        min-height: 100svh;
      }

      .visual {
        background:
          radial-gradient(circle at 30% 25%, rgb(255 255 255 / 0.16), transparent 42%),
          linear-gradient(160deg, var(--accent, #6b7c3e), #1c2118 85%);
      }

      .panel-in {
        animation: rise 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
      }

      @keyframes rise {
        from {
          opacity: 0;
          transform: translateY(22px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .panel-in {
          animation: none;
        }
      }
    `,
  ];

  @property({ attribute: 'product-id' })
  productId = '';

  private get product() {
    return getProductById(this.productId);
  }

  private backToCatalog(event: Event) {
    event.preventDefault();
    goHome('productos');
  }

  render() {
    const product = this.product;

    if (!product) {
      return html`
        <section class="bg-surface px-5 py-28 md:px-8">
          <div class="mx-auto max-w-xl text-center">
            <h1 class="font-display text-3xl font-extrabold text-ink">Producto no encontrado</h1>
            <p class="mt-3 text-ink/65">Ese id no está en el catálogo de Domotika.</p>
            <a
              href="#productos"
              class="mt-8 inline-flex h-12 items-center rounded-full bg-ink px-6 text-sm font-bold text-surface"
              @click=${this.backToCatalog}
            >
              Volver al catálogo
            </a>
          </div>
        </section>
      `;
    }

    return html`
      <section class="bg-surface px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
        <div class="panel-in mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <a
              href="#productos"
              class="inline-flex items-center gap-2 text-sm font-semibold text-olive transition hover:text-ink"
              @click=${this.backToCatalog}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Volver al catálogo
            </a>

            <div
              class="visual relative mt-6 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2rem]"
              style="--accent: ${product.accent}"
            >
              <span
                class="absolute left-5 top-5 rounded-full bg-surface/90 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink"
              >
                ${product.tag}
              </span>
              <div
                class="grid h-32 w-32 place-items-center rounded-full border border-surface/25 bg-surface/10 shadow-[inset_0_0_40px_rgb(255_255_255_/_0.14)] backdrop-blur-sm"
                aria-hidden="true"
              >
                <div class="h-14 w-14 rounded-full bg-surface/85"></div>
              </div>
            </div>
          </div>

          <div class="flex flex-col">
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-olive">Producto</p>
            <h1
              class="mt-3 font-display text-[clamp(2rem,4.5vw,3.1rem)] font-extrabold leading-[1.05] tracking-tight text-ink"
            >
              ${product.name}
            </h1>
            <p class="mt-5 text-base leading-relaxed text-ink/70 md:text-lg">
              ${product.longDescription}
            </p>

            <p class="mt-8 font-display text-4xl font-extrabold text-olive">
              ${product.price}<span class="text-xl font-semibold text-ink/40"> €</span>
            </p>
            <p
              class="mt-3 text-sm font-semibold uppercase tracking-[0.12em] ${product.available
                ? 'text-olive'
                : 'text-ink/55'}"
            >
              ${product.available ? 'Disponible para compra' : 'No disponible'}
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              ${product.available && product.purchaseUrl
                ? html`<a
                    href=${product.purchaseUrl}
                    class="inline-flex h-12 min-w-[10rem] items-center justify-center rounded-full bg-gold px-6 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-gold-deep hover:text-surface"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Comprar en Amazon
                  </a>`
                : html`<span
                    class="inline-flex h-12 min-w-[10rem] items-center justify-center rounded-full bg-ink/8 px-6 text-sm font-bold text-ink/50"
                    aria-disabled="true"
                  >
                    No disponible
                  </span>`}
              <a
                href="#faq"
                class="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 px-6 text-sm font-semibold text-ink transition hover:border-olive hover:bg-olive-light/20"
              >
                Ver FAQ
              </a>
            </div>

            <div class="mt-10">
              <h2 class="font-display text-lg font-bold text-ink">Qué incluye</h2>
              <ul class="mt-4 space-y-3">
                ${map(
                  product.features,
                  (feature) => html`
                    <li class="flex gap-3 text-sm leading-relaxed text-ink/70 md:text-base">
                      <span
                        class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-olive"
                        aria-hidden="true"
                      ></span>
                      ${feature}
                    </li>
                  `,
                )}
              </ul>
            </div>

            <div class="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              ${map(
                product.specs,
                (spec) => html`
                  <div class="rounded-2xl bg-surface-muted px-4 py-3">
                    <p class="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink/45">
                      ${spec.label}
                    </p>
                    <p class="mt-1 text-sm font-semibold text-ink">${spec.value}</p>
                  </div>
                `,
              )}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'product-detail': ProductDetail;
  }
}
