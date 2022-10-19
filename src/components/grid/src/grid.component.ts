import { forEach } from "@adc/shared/src/helpers/foreach";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { GRID_POSITION } from "./defs";
import styles from "./grid.styles";
import type { Row } from "./row.component";
import type { TemplateResult, PropertyValues } from "lit";

/**
 * Grid
 * @element adc-grid
 * @slot - Default slot, accepts adc-row
 */
export class Grid extends LitElement {
  /**
   * Sets the position of the grid based on flex.
   * @type {"start"|"end"|"center"|""}
   */
  @property({ type: String }) position: string = GRID_POSITION.EMPTY;

  /**
   * Sets the child rows to render in reverse order.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) reverse = false;

  /**
   * Sets the flush property on the grid, which uses padding instead of margin.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) flush = false;

  /**
   * Set to true if the grid is used within a form.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) form = false;

  /**
   * Set nested to true if the grid is used within another grid.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) nested = false;

  render(): TemplateResult {
    return html`<slot></slot>`;
  }

  /**
   * If the parent DOM node is an adc-column, then it is a nested grid.
   */
  connectedCallback(): void {
    super.connectedCallback();
    if (this.closest("adc-column")) {
      this.nested = true;
    }
  }

  updated(changedProperties: PropertyValues): void {
    const { selectorGridRow } = this.constructor as typeof Grid;

    if (changedProperties.has("reverse")) {
      const { reverse } = this;

      forEach(this.querySelectorAll(selectorGridRow), (elem) => {
        (elem as Row).reverse = reverse;
      });
    }

    if (changedProperties.has("form")) {
      const { form } = this;
      forEach(this.querySelectorAll(selectorGridRow), (elem) => {
        (elem as Row).hasForm = form;
      });
    }
  }

  /**
   * @private
   */
  static styles = styles;

  /**
   * @private
   */
  static get selectorGridRow(): string {
    return "adc-row";
  }
}

try {
  customElements.define("adc-grid", Grid);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-grid": Grid;
  }
}
