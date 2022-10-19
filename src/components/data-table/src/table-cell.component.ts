import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import styles from "./table.styles";
import type { TemplateResult } from "lit";

/**
 * Data table cell.
 * @element adc-table-cell
 */
export class DataTableCell extends LitElement {
  connectedCallback(): void {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "cell");
    }
    super.connectedCallback();
  }

  /**
   * True if the table header / row should render a divider.
   */
  @property({ type: Boolean, reflect: true }) divider = false;

  render(): TemplateResult {
    return html` <slot></slot> `;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-table-cell", DataTableCell);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-table-cell": DataTableCell;
  }
}
