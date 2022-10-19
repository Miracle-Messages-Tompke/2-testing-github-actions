import { forEach } from "@adc/shared/src/helpers/foreach";
import { html, LitElement } from "lit";
import { property }from "lit/decorators.js";
import { TABLE_SIZE } from "./defs";
import styles from "./table.styles";
import type { PropertyValues, TemplateResult } from "lit";

/**
 * Data table.
 * @element adc-table
 */
export class DataTable extends LitElement {
  /**
   * The table size.
   */
  @property({ reflect: true }) size = TABLE_SIZE.DEFAULT;

  /**
   * `true` if this table should support sorting.
   */
  @property({ type: Boolean, reflect: true }) sort = false;

  connectedCallback(): void {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "table");
    }
    super.connectedCallback();
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("size")) {
      // Propagate `size` attribute to descendants until `:host-context()` gets
      // supported in all major browsers
      forEach(
        this.querySelectorAll((this.constructor as typeof DataTable).selectorRowsWithHeader),
        (elem) => {
          elem.setAttribute("size", this.size);
        }
      );
    }
  }

  render(): TemplateResult {
    return html` <slot></slot> `;
  }

  /**
   * The CSS selector to find the rows, including header rows.
   */
  static get selectorRowsWithHeader(): string {
    return "adc-table-header-row,adc-table-row";
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-table", DataTable);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-table": DataTable;
  }
}
