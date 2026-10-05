import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tw } from '../styles/tailwind';

/**
 * Ítem individual del acordeón FAQ.
 *
 * El padre (`faq-section`) controla qué ítem está abierto pasando
 * `open` como property. Al hacer clic, este hijo emite `faq-toggle`
 * y el padre decide el nuevo estado (un solo ítem abierto a la vez).
 *
 * Patrón "estado elevado" (lifted state): el hijo es presentacional,
 * el padre tiene la lógica.
 */
@customElement('faq-item')
export class FaqItemElement extends LitElement {
  static styles = [
    tw,
    css`
      :host {
        display: block;
      }

      .answer {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 380ms cubic-bezier(0.2, 0.8, 0.2, 1);
      }

      .answer.open {
        grid-template-rows: 1fr;
      }

      .answer > div {
        overflow: hidden;
      }

      .chevron {
        transition: transform 320ms ease;
      }

      .chevron.open {
        transform: rotate(180deg);
      }
    `,
  ];

  /** attribute: 'item-id' → en HTML se escribe item-id="..." */
  @property({ attribute: 'item-id' })
  itemId = '';

  @property()
  question = '';

  @property()
  answer = '';

  @property({ type: Boolean })
  open = false;

  private toggle() {
    this.dispatchEvent(
      new CustomEvent('faq-toggle', {
        detail: { id: this.itemId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="border-b border-ink/10">
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 py-5 text-left"
          aria-expanded=${this.open}
          @click=${this.toggle}
        >
          <span class="font-display text-lg font-bold tracking-tight text-ink md:text-xl">
            ${this.question}
          </span>
          <span
            class="chevron grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-muted text-olive ${this
              .open
              ? 'open'
              : ''}"
            aria-hidden="true"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>

        <div class="answer ${this.open ? 'open' : ''}">
          <div>
            <p class="pb-5 pr-12 text-sm leading-relaxed text-ink/65 md:text-base">
              ${this.answer}
            </p>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'faq-item': FaqItemElement;
  }
}
