import { Focusable } from "@adc/shared/src/Focusable";
import { html } from "lit";
import styles from "./table.styles";
import type { TemplateResult } from "lit";

/**
 * Data table header.
 * @element adc-table-head
 */
export class DataTableHead extends Focusable {
  connectedCallback(): void {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "rowgroup");
    }
    super.connectedCallback();
  }

  render(): TemplateResult {
    return html` <slot></slot> `;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-table-head", DataTableHead);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-table-head": DataTableHead;
  }
}
