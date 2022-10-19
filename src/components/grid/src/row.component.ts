import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import styles from "./grid.styles";
import type { TemplateResult } from "lit";

/**
 * Grid row
 * @element adc-row
 * @slot - Default slot, accepts adc-column
 */
export class Row extends LitElement {
  /**
   * This is set from adc-grid whenever form is set to true.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true, attribute: "has-form" })
  hasForm = false;

  /**
   * This is set from adc-grid whenever reverse is set to true.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) reverse = false;

  render(): TemplateResult {
    return html`<slot></slot>`;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-row", Row);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-row": Row;
  }
}
