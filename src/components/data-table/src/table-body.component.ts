import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import styles from "./table.styles";
import type { TemplateResult } from "lit";

/**
 * Data table body.
 * @element adc-table-body
 */
export class DataTableBody extends LitElement {
  connectedCallback(): void {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "rowgroup");
    }
    super.connectedCallback();
  }

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
  customElements.define("adc-table-body", DataTableBody);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-table-body": DataTableBody;
  }
}
