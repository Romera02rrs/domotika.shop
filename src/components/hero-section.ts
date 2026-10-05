import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tw } from '../styles/tailwind';

/**
 * Hero de la homepage.
 * Un solo bloque visual: marca + headline + frase + CTAs sobre un plano full-bleed.
 */
@customElement('hero-section')
export class HeroSection extends LitElement {
  static styles = [
    tw,
    css`
      :host {
        display: block;
      }

      .hero-plane {
        background:
          radial-gradient(ellipse 80% 60% at 78% 28%, rgb(163 177 138 / 0.28), transparent 55%),
          radial-gradient(ellipse 50% 45% at 12% 80%, rgb(196 163 90 / 0.18), transparent 50%),
          linear-gradient(145deg, #1c2118 0%, #2a3224 48%, #1c2118 100%);
      }

      .hero-grid {
        background-image:
          linear-gradient(rgb(163 177 138 / 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgb(163 177 138 / 0.08) 1px, transparent 1px);
        background-size: 72px 72px;
        mask-image: linear-gradient(to bottom, black 20%, transparent 95%);
      }

      .brand-in {
        animation: rise 900ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
      }

      .title-in {
        animation: rise 900ms cubic-bezier(0.2, 0.8, 0.2, 1) 120ms both;
      }

      .copy-in {
        animation: rise 900ms cubic-bezier(0.2, 0.8, 0.2, 1) 240ms both;
      }

      .cta-in {
        animation: rise 900ms cubic-bezier(0.2, 0.8, 0.2, 1) 360ms both;
      }

      @keyframes rise {
        from {
          opacity: 0;
          transform: translateY(28px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .brand-in,
        .title-in,
        .copy-in,
        .cta-in {
          animation: none;
        }
      }
    `,
  ];

  render() {
    return html`
      <section
        id="inicio"
        class="hero-plane relative min-h-[100svh] overflow-hidden text-surface"
      >
        <div class="hero-grid pointer-events-none absolute inset-0" aria-hidden="true"></div>

        <div
          class="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-8 md:pb-24 md:pt-32"
        >
          <p
            class="brand-in font-display text-[clamp(2.8rem,10vw,5.5rem)] font-extrabold leading-[0.9] tracking-tight"
          >
            Domotika
          </p>

          <h1
            class="title-in mt-5 max-w-xl font-display text-[clamp(1.55rem,4.2vw,2.35rem)] font-bold leading-tight tracking-tight text-olive-light"
          >
            Hardware oficial para tu hogar inteligente
          </h1>

          <p class="copy-in mt-5 max-w-md text-base leading-relaxed text-surface/70 md:text-lg">
            Green, Connect ZBT-2 y Connect ZWA-2. Empieza tu instalación Home
            Assistant con piezas pensadas para durar.
          </p>

          <div class="cta-in mt-9 flex flex-wrap gap-3">
            <a
              href="#productos"
              class="inline-flex min-h-12 h-12 items-center rounded-full bg-gold px-6 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-gold-deep hover:text-surface"
            >
              Explorar productos
            </a>
            <a
              href="#faq"
              class="inline-flex min-h-12 h-12 items-center rounded-full border border-surface/25 px-6 text-sm font-semibold text-surface transition hover:border-olive-light hover:bg-surface/5"
            >
              Preguntas frecuentes
            </a>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hero-section': HeroSection;
  }
}
