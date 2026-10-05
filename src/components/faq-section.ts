import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { faqItems } from '../data/faq';
import { observeReveal } from '../utils/reveal';
import { tw } from '../styles/tailwind';
import './faq-item';

/**
 * Sección FAQ con acordeón.
 *
 * `@state() openId` guarda qué pregunta está abierta.
 * Al recibir `faq-toggle` del hijo:
 * - si es la misma → la cerramos (null)
 * - si es otra → abrimos esa (y la anterior se cierra sola al re-render)
 */
@customElement('faq-section')
export class FaqSection extends LitElement {
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
    `,
  ];

  @state()
  private openId: string | null = faqItems[0]?.id ?? null;

  firstUpdated() {
    observeReveal(this.renderRoot);
  }

  private onToggle(event: Event) {
    const { id } = (event as CustomEvent<{ id: string }>).detail;
    this.openId = this.openId === id ? null : id;
  }

  render() {
    return html`
      <section id="faq" class="bg-ink px-5 py-20 text-surface md:px-8 md:py-28">
        <div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div data-reveal>
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-olive-light">
              FAQ
            </p>
            <h2
              class="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight"
            >
              Dudas frecuentes
            </h2>
            <p class="mt-4 max-w-md text-base leading-relaxed text-surface/65">
              Respuestas rápidas sobre Green, Zigbee, Z-Wave y envíos de Domotika.
            </p>
          </div>

          <div data-reveal class="rounded-3xl bg-surface px-5 text-ink md:px-8" @faq-toggle=${this.onToggle}>
            ${map(
              faqItems,
              (item) => html`
                <faq-item
                  item-id=${item.id}
                  question=${item.question}
                  answer=${item.answer}
                  ?open=${this.openId === item.id}
                ></faq-item>
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
    'faq-section': FaqSection;
  }
}
