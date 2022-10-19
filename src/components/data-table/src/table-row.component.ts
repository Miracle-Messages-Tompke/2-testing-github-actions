import { Focusable } from "@adc/shared/src/Focusable";
import { html } from "lit";
import { property } from "lit/decorators.js";
import styles from "./table.styles";
import type { TemplateResult } from "lit";

/**
 * Data table row.
 * @element adc-table-row
 * @csspart selection-container The container of the checkbox.
 * @csspart selection The checkbox.
 * @fires adc-table-row-change-selection
 *   The custom event fired before this row is selected/unselected upon a user
 * gesture. Cancellation of this event stops the user-initiated change in
 * selection.
 */
export class DataTableRow extends Focusable {
  /**
   * Handles `click` event on the check box.
   * @param event The event.
   */
  private _handleClickSelectionCheckbox(event: Event) {
    const selected = (event.target as HTMLInputElement).checked;
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        selected
      }
    };
    const constructor = this.constructor as typeof DataTableRow;
    if (this.dispatchEvent(new CustomEvent(constructor.eventBeforeChangeSelection, init))) {
      this.selected = selected;
    }
  }

  /**
   * True if the table header / row should render a divider.
   */
  @property({ type: Boolean, reflect: true }) divider = false;

  /**
   * @returns The first set of table cells.
   */
  protected _renderFirstCells(): TemplateResult | undefined {
    const { disabled, selected, selectionLabel, selectionName, selectionValue } = this;
    // Using `@click` instead of `@change` to support `.preventDefault()`
    return !selectionName
      ? undefined
      : html`
          <div part="selection-container" class="adc--table-column-checkbox">
            ${html`
              <input
                id="selection"
                part="selection"
                class="adc--checkbox"
                type="checkbox"
                value="${selectionValue}"
                name="${selectionName}"
                ?disabled="${disabled}"
                .checked=${selected}
                @click=${this._handleClickSelectionCheckbox}
              />
              <label
                for="selection"
                class="adc--checkbox-label"
                aria-label="${selectionLabel}"
              ></label>
            `}
          </div>
        `;
  }

  /**
   * `true` if this table row should be disabled.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * `true` if this table row should be selected.
   */
  @property({ type: Boolean, reflect: true }) selected = false;

  /**
   * The `aria-label` attribute for the `<label>` for selection.
   */
  @property({ attribute: "selection-label" }) selectionLabel = "";

  /**
   * The `name` attribute for the `<input>` for selection.
   * If present, this table row will be a selectable one.
   */
  @property({ attribute: "selection-name" }) selectionName = "";

  /**
   * The `value` attribute for the `<input>` for selection.
   */
  @property({ attribute: "selection-value" }) selectionValue = "";

  connectedCallback(): void {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "row");
    }
    super.connectedCallback();
  }

  render(): TemplateResult {
    return html` ${this._renderFirstCells()}<slot></slot> `;
  }

  /**
   * The name of the custom event fired before this row is selected/unselected
   * upon a user gesture. Cancellation of this event stops the user-initiated
   * change in selection.
   */
  static get eventBeforeChangeSelection(): string {
    return "adc-table-row-change-selection";
  }

  /**
   * The CSS selector to find the table.
   */
  static get selectorTable(): string {
    return "adc-table";
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-table-row", DataTableRow);
} catch (e) {
  // do nothing
}
declare global {
  interface HTMLElementTagNameMap {
    "adc-table-row": DataTableRow;
  }
}
