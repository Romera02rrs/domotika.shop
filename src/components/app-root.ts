import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { tw } from '../styles/tailwind';
import {
  addToCart,
  cartCount,
  removeFromCart,
  type CartLine,
} from '../utils/cart';
import { parseRoute, type Route } from '../utils/routing';
import './site-header';
import './hero-section';
import './product-grid';
import './product-detail';
import './faq-section';
import './site-footer';
import './cart-drawer';

/**
 * Shell de la aplicación + mini-router + carrito.
 *
 * - `route` se actualiza con el evento `hashchange` del navegador
 * - Si la ruta es un producto → renderiza `<product-detail>`
 * - Si no → homepage (hero + grid + FAQ)
 * - El carrito vive aquí (`@state`) y se pasa al header / drawer
 */
@customElement('app-root')
export class AppRoot extends LitElement {
  static styles = [
    tw,
    css`
      :host {
        display: block;
        min-height: 100svh;
      }
    `,
  ];

  @state()
  private scrolled = false;

  @state()
  private route: Route = parseRoute();

  @state()
  private cart: CartLine[] = [];

  @state()
  private cartOpen = false;

  private onScroll = () => {
    this.scrolled = window.scrollY > 24;
  };

  private onHashChange = () => {
    const next = parseRoute();
    this.route = next;
    this.cartOpen = false;

    // Al entrar en un producto, subimos arriba; en home respetamos el ancla.
    if (next.name === 'product') {
      window.scrollTo(0, 0);
    }
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('hashchange', this.onHashChange);
    this.onScroll();
    this.route = parseRoute();
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('hashchange', this.onHashChange);
    super.disconnectedCallback();
  }

  private onAddToCart(event: Event) {
    const { productId } = (event as CustomEvent<{ productId: string }>).detail;
    this.cart = addToCart(this.cart, productId);
  }

  private onRemoveFromCart(event: Event) {
    const { productId } = (event as CustomEvent<{ productId: string }>).detail;
    this.cart = removeFromCart(this.cart, productId);
  }

  private onClearCart() {
    this.cart = [];
  }

  private openCart() {
    this.cartOpen = true;
  }

  private closeCart() {
    this.cartOpen = false;
  }

  render() {
    const route = this.route;
    const onProduct = route.name === 'product';
    const productId = route.name === 'product' ? route.productId : '';
    const count = cartCount(this.cart);

    return html`
      <a
        href="#inicio"
        class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink"
      >
        Saltar al contenido
      </a>

      <site-header
        ?scrolled=${this.scrolled}
        ?solid=${onProduct}
        .cartCount=${count}
        @open-cart=${this.openCart}
      ></site-header>

      <main @add-to-cart=${this.onAddToCart}>
        ${onProduct
          ? html`<product-detail product-id=${productId}></product-detail>`
          : html`
              <hero-section></hero-section>
              <product-grid></product-grid>
              <faq-section></faq-section>
            `}
      </main>

      <site-footer></site-footer>

      <cart-drawer
        ?open=${this.cartOpen}
        .lines=${this.cart}
        @close-cart=${this.closeCart}
        @clear-cart=${this.onClearCart}
        @remove-from-cart=${this.onRemoveFromCart}
      ></cart-drawer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}
