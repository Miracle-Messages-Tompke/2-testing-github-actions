import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './tile.styles';
import type { TemplateResult } from 'lit';

export class Tile extends LitElement {
  static styles = styles;

  @property({ reflect: false, type: Number }) elevation;
  @property({ reflect: false, type: String }) radius;
  @property({ reflect: false, type: String }) color;
  @property({ reflect: false, type: String, attribute: "outline-color" }) outlineColor;

  render(): TemplateResult {
    return html`
      <div part="tile" class=${classMap({
        'adc-tile': true,
        'adc-tile--elevation': this.elevation,
        'adc-tile--background': this.color,
        'adc-tile--radius': this.radius,
        'adc-tile--outline': this.outlineColor,
      })}>
        <slot></slot>
      </div>
    `;
  }
}

try {
  customElements.define("adc-tile", Tile);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-tile": Tile;
  }
}
