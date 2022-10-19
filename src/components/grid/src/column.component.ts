import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import styles from "./grid.styles";
import type { TemplateResult } from "lit";

/**
 * Column
 * @element adc-column
 * @slot - Default slot, content is rendered inside the column.
 */
export class Column extends LitElement {
  /**
   * Sets the column width for desktop by number of columns.
   * @type {number}
   */
  @property({ attribute: "col-desktop", type: Number }) colDesktop = 0;

  /**
   * Sets the column width for tablet by number of columns.
   * @type {number}
   */
  @property({ attribute: "col-tablet", type: Number }) colTablet = 0;

  /**
   * Sets the column width for phone by number of columns.
   * @type {number}
   */
  @property({ attribute: "col-phone", type: Number }) colPhone = 0;

  /**
   * Sets the column offset for desktop by number of columns.
   * @type {number}
   */
  @property({ attribute: "col-desktop-offset", type: Number })
  colDesktopOffset = 0;

  /**
   * Sets the column offset for tablet by number of columns.
   * @type {number}
   */
  @property({ attribute: "col-tablet-offset", type: Number })
  colTabletOffset = 0;

  /**
   * Sets the column offset for phone by number of columns.
   * @type {number}
   */
  @property({ attribute: "col-phone-offset", type: Number }) colPhoneOffset = 0;

  render(): TemplateResult {
    return html`<slot></slot>`;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-column", Column);
} catch (e) {
  // do nothing
}
declare global {
  interface HTMLElementTagNameMap {
    "adc-column": Column;
  }
}
