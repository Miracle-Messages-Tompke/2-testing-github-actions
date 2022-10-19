import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import styles from "./table.styles";
import type { TemplateResult } from "lit";

/**
 * Table row of collapsible details.
 * @element adc-table-expanded-row
 */
export class DataTableExpandedRow extends LitElement {
  /**
   * The colspan.
   */
  @property({ type: Number, attribute: "colspan" }) colSpan = 1;

  /**
   * `true` if the table row should be expanded.
   */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /**
   * `true` if the table row should be highlighted.
   */
  @property({ type: Boolean, reflect: true }) highlighted = false;

  render(): TemplateResult {
    const { colSpan } = this;
    return html`
      <td colspan="${colSpan}">
        <div class="adc-expanded-row__wrapper">
          <slot></slot>
        </div>
      </td>
    `;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-table-expanded-row", DataTableExpandedRow);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-table-expanded-row": DataTableExpandedRow;
  }
}
