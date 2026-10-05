import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { getProductById } from '../data/products';
import type { CartLine } from '../utils/cart';
import { tw } from '../styles/tailwind';

/**
 * Panel lateral del carrito.
 *
 * Es presentacional: recibe `open` y `lines` del padre (`app-root`)
 * y emite eventos para cerrar / quitar líneas / vaciar.
 */
@customElement('cart-drawer')
export class CartDrawer extends LitElement {
  static styles = [
    tw,
    css`
      :host {
        display: contents;
      }

      .backdrop {
        opacity: 0;
        visibility: hidden;
        transition:
          opacity 280ms ease,
          visibility 0s linear 280ms;
      }

      .backdrop.open {
        opacity: 1;
        visibility: visible;
        transition-delay: 0s;
      }

      .panel {
        transform: translateX(100%);
        transition: transform 380ms cubic-bezier(0.2, 0.8, 0.2, 1);
      }

      .panel.open {
        transform: translateX(0);
      }
    `,
  ];

  @property({ type: Boolean })
  open = false;

  @property({ attribute: false })
  lines: CartLine[] = [];

  private close() {
    this.dispatchEvent(new CustomEvent('close-cart', { bubbles: true, composed: true }));
  }

  private clear() {
    this.dispatchEvent(new CustomEvent('clear-cart', { bubbles: true, composed: true }));
  }

  private removeLine(productId: string) {
    this.dispatchEvent(
      new CustomEvent('remove-from-cart', {
        detail: { productId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private get total() {
    return this.lines.reduce((sum, line) => {
      const product = getProductById(line.productId);
      return sum + (product?.price ?? 0) * line.qty;
    }, 0);
  }

  private get count() {
    return this.lines.reduce((sum, line) => sum + line.qty, 0);
  }

  render() {
    return html`
      <div
        class="backdrop fixed inset-0 z-[80] bg-ink/45 ${this.open ? 'open' : ''}"
        @click=${this.close}
      ></div>

      <aside
        class="panel fixed inset-y-0 right-0 z-[90] flex w-[min(100%,24rem)] flex-col bg-surface shadow-[-20px_0_50px_rgb(28_33_24_/_0.18)] ${this
          .open
          ? 'open'
          : ''}"
        role="dialog"
        aria-modal="true"
        aria-label="Carrito"
        aria-hidden=${!this.open}
      >
        <div class="flex items-center justify-between border-b border-ink/10 px-5 py-5">
          <div>
            <p class="font-display text-xl font-bold text-ink">Carrito</p>
            <p class="text-sm text-ink/50">${this.count} artículo${this.count === 1 ? '' : 's'}</p>
          </div>
          <button
            type="button"
            class="grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-ink"
            aria-label="Cerrar carrito"
            @click=${this.close}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-5 py-4">
          ${this.lines.length === 0
            ? html`<p class="py-10 text-center text-sm text-ink/55">
                Tu carrito está vacío. Abre un producto y pulsa «Añadir al carrito».
              </p>`
            : html`<ul class="space-y-4">
                ${map(this.lines, (line) => {
                  const product = getProductById(line.productId);
                  if (!product) return nothing;
                  return html`
                    <li class="flex gap-3 border-b border-ink/8 pb-4">
                      <div
                        class="h-16 w-16 shrink-0 rounded-2xl"
                        style="background: linear-gradient(145deg, ${product.accent}, #1c2118)"
                      ></div>
                      <div class="min-w-0 flex-1">
                        <p class="truncate font-semibold text-ink">${product.name}</p>
                        <p class="mt-0.5 text-sm text-ink/50">
                          ${product.price} € × ${line.qty}
                        </p>
                        <button
                          type="button"
                          class="mt-2 text-xs font-bold uppercase tracking-wider text-olive hover:text-ink"
                          @click=${() => this.removeLine(line.productId)}
                        >
                          Quitar
                        </button>
                      </div>
                      <p class="font-display font-bold text-ink">
                        ${product.price * line.qty} €
                      </p>
                    </li>
                  `;
                })}
              </ul>`}
        </div>

        <div class="border-t border-ink/10 px-5 py-5">
          <div class="mb-4 flex items-center justify-between">
            <span class="text-sm font-semibold text-ink/55">Total</span>
            <span class="font-display text-2xl font-extrabold text-ink">${this.total} €</span>
          </div>
          <button
            type="button"
            class="inline-flex h-12 w-full items-center justify-center rounded-full bg-ink text-sm font-bold text-surface disabled:cursor-not-allowed disabled:opacity-40"
            ?disabled=${this.lines.length === 0}
          >
            Checkout (próximamente)
          </button>
          ${this.lines.length > 0
            ? html`<button
                type="button"
                class="mt-3 w-full text-center text-xs font-bold uppercase tracking-wider text-ink/45 hover:text-ink"
                @click=${this.clear}
              >
                Vaciar carrito
              </button>`
            : nothing}
        </div>
      </aside>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cart-drawer': CartDrawer;
  }
}
