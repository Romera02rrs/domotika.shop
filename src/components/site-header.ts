import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tw } from '../styles/tailwind';

/**
 * Header fijo con menú responsive y contador del carrito.
 *
 * Conceptos Lit que practicas aquí:
 * - `@state()` → estado PRIVADO (menú abierto/cerrado).
 * - `@property()` → datos del PADRE (scrolled, cartCount, solid).
 */
@customElement('site-header')
export class SiteHeader extends LitElement {
  static styles = [
    tw,
    css`
      :host {
        display: block;
      }

      .nav-link {
        position: relative;
      }

      .nav-link::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -2px;
        height: 1px;
        background: currentColor;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 280ms ease;
      }

      .nav-link:hover::after,
      .nav-link:focus-visible::after {
        transform: scaleX(1);
        transform-origin: left;
      }

      .mobile-panel {
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transition:
          max-height 420ms cubic-bezier(0.2, 0.8, 0.2, 1),
          opacity 280ms ease;
      }

      .mobile-panel.open {
        max-height: 320px;
        opacity: 1;
      }

      .cart-badge {
        animation: pop 320ms cubic-bezier(0.2, 0.8, 0.2, 1);
      }

      @keyframes pop {
        from {
          transform: scale(0.6);
        }
        to {
          transform: scale(1);
        }
      }
    `,
  ];

  /** Si el usuario ha hecho scroll, el padre nos lo indica. */
  @property({ type: Boolean })
  scrolled = false;

  /**
   * En la vista de producto el fondo del hero no está detrás:
   * forzamos el estilo "sólido" (texto oscuro) siempre.
   */
  @property({ type: Boolean })
  solid = false;

  /** Unidades totales en el carrito (viene de app-root). */
  @property({ type: Number })
  cartCount = 0;

  @state()
  private menuOpen = false;

  private get isSolid() {
    return this.solid || this.scrolled;
  }

  private closeMenu() {
    this.menuOpen = false;
  }

  private toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  private onCartClick() {
    this.dispatchEvent(
      new CustomEvent('open-cart', {
        bubbles: true,
        composed: true,
      }),
    );
    this.closeMenu();
  }

  render() {
    const solid = this.isSolid;

    return html`
      <header
        class="fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${solid
          ? 'bg-surface/90 shadow-[0_12px_40px_rgb(28_33_24_/_0.08)] backdrop-blur-xl'
          : 'bg-transparent'}"
      >
        <div
          class="mx-auto flex h-[4.75rem] max-w-6xl items-center justify-between px-5 md:px-8"
        >
          <a
            href="#inicio"
            class="font-display text-xl font-extrabold tracking-tight ${solid
              ? 'text-ink'
              : 'text-surface'} transition-colors"
            @click=${this.closeMenu}
          >
            Domotika<span class="text-gold">.</span>
          </a>

          <nav class="hidden items-center gap-8 md:flex" aria-label="Principal">
            <a
              href="#productos"
              class="nav-link text-sm font-semibold tracking-wide ${solid
                ? 'text-ink/80 hover:text-ink'
                : 'text-surface/80 hover:text-surface'}"
              >Productos</a
            >
            <a
              href="#faq"
              class="nav-link text-sm font-semibold tracking-wide ${solid
                ? 'text-ink/80 hover:text-ink'
                : 'text-surface/80 hover:text-surface'}"
              >FAQ</a
            >
            <button
              type="button"
              class="relative inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-bold transition ${solid
                ? 'border-ink/12 text-ink hover:bg-surface-muted'
                : 'border-surface/25 text-surface hover:bg-surface/10'}"
              aria-label="Ver carrito (${this.cartCount} productos)"
              @click=${this.onCartClick}
            >
              Carrito
              ${this.cartCount > 0
                ? html`<span
                    class="cart-badge grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1.5 text-[0.68rem] font-extrabold text-ink"
                    >${this.cartCount}</span
                  >`
                : null}
            </button>
          </nav>

          <div class="flex items-center gap-2 md:hidden">
            <button
              type="button"
              class="relative inline-flex h-11 w-11 items-center justify-center rounded-full border ${solid
                ? 'border-ink/15 text-ink'
                : 'border-surface/25 text-surface'}"
              aria-label="Ver carrito (${this.cartCount} productos)"
              @click=${this.onCartClick}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6h15l-1.5 9h-12L6 6zm0 0L5 3H2"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle cx="9" cy="20" r="1.2" fill="currentColor" />
                <circle cx="18" cy="20" r="1.2" fill="currentColor" />
              </svg>
              ${this.cartCount > 0
                ? html`<span
                    class="cart-badge absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[0.65rem] font-extrabold text-ink"
                    >${this.cartCount}</span
                  >`
                : null}
            </button>

            <button
              type="button"
              class="inline-flex h-11 w-11 items-center justify-center rounded-full border ${solid
                ? 'border-ink/15 text-ink'
                : 'border-surface/25 text-surface'}"
              aria-expanded=${this.menuOpen}
              aria-controls="mobile-nav"
              aria-label=${this.menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              @click=${this.toggleMenu}
            >
              <span class="sr-only">Menú</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                ${this.menuOpen
                  ? html`<path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />`
                  : html`<path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />`}
              </svg>
            </button>
          </div>
        </div>

        <div
          id="mobile-nav"
          class="mobile-panel border-t border-ink/10 bg-surface md:hidden ${this.menuOpen
            ? 'open'
            : ''}"
        >
          <nav class="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4" aria-label="Móvil">
            <a
              href="#productos"
              class="rounded-xl px-3 py-3 text-base font-semibold text-ink hover:bg-surface-muted"
              @click=${this.closeMenu}
              >Productos</a
            >
            <a
              href="#faq"
              class="rounded-xl px-3 py-3 text-base font-semibold text-ink hover:bg-surface-muted"
              @click=${this.closeMenu}
              >FAQ</a
            >
            <button
              type="button"
              class="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-olive px-5 text-sm font-bold text-surface"
              @click=${this.onCartClick}
            >
              Carrito (${this.cartCount})
            </button>
          </nav>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'site-header': SiteHeader;
  }
}
