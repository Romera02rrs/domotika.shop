import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tw } from '../styles/tailwind';

@customElement('site-footer')
export class SiteFooter extends LitElement {
  static styles = [
    tw,
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html`
      <footer class="border-t border-ink/10 bg-surface px-5 py-10 md:px-8">
        <div
          class="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <p class="font-display text-lg font-bold tracking-tight text-ink">
            Domotika<span class="text-gold">.</span>
          </p>
          <p class="text-sm text-ink/50">
            © ${new Date().getFullYear()} Domotika · Hardware oficial Home Assistant
          </p>
        </div>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'site-footer': SiteFooter;
  }
}
