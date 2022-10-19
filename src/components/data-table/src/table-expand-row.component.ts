import { HostListener, HostListenerMixin } from "@adc/shared/src/HostListener";
import "@aileron/icon";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { ICON_POSITION } from "./defs";
import { DataTableRow } from "./table-row.component";
import styles from "./table.styles";
import type { DataTableExpandedRow } from "./table-expanded-row.component";
import type { TemplateResult, PropertyValues } from "lit";

/**
 * The expando row in table row.
 * @element adc-table-expand-row
 */
export class DataTableExpandRow extends HostListenerMixin(DataTableRow) {
  /**
   * Handles `click` event on the expando button.
   */
  private _handleClickExpando() {
    this._handleUserInitiatedToggleExpando();
  }

  /**
   * Handles `mouseover`/`mouseout` event handler on this element.
   * @param event The event.
   */
  @HostListener("mouseover")
  @HostListener("mouseout")
  // @ts-expect-error: The decorator refers to this method but TS thinks this method
  // is not referred to
  private _handleMouseOverOut(event: MouseEvent) {
    const { selectorExpandedRow } = this.constructor as typeof DataTableExpandRow;
    const { nextElementSibling } = this;
    if (nextElementSibling?.matches(selectorExpandedRow)) {
      (nextElementSibling as DataTableExpandedRow).highlighted = event.type === "mouseover";
    }
  }

  /**
   * Handles user-initiated toggle request of the expando button in this table
   * row.
   * @param expanded The new expanded state.
   */
  private _handleUserInitiatedToggleExpando(expanded = !this.expanded) {
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        expanded
      }
    };
    if (
      this.dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof DataTableExpandRow).eventBeforeExpandoToggle,
          init
        )
      )
    ) {
      this.expanded = expanded;
      this.dispatchEvent(
        new CustomEvent((this.constructor as typeof DataTableExpandRow).eventExpandoToggle, init)
      );
    }
  }

  /**
   * The position of the icon in relationship to the table.
   * @type {"left"|"right"}
   */
  @property({ reflect: true, attribute: "icon-position" })
  iconPosition = ICON_POSITION.LEFT;

  /**
   * True if the table header / row should render a divider.
   */
  @property({ type: Boolean, reflect: true }) divider = false;

  /**
   * `true` if the table row should be expanded.
   */
  @property({ type: Boolean, reflect: true }) expanded = false;

  _renderFirstCells(): TemplateResult {
    const { _handleClickExpando: handleClickExpando } = this;
    return html`
      ${this.iconPosition === ICON_POSITION.LEFT
        ? html`
            <div class="adc-table-expand-button--wrapper">
              <button
                class="adc-table-expand--button"
                aria-label="row-expand-button"
                @click="${handleClickExpando}"
              >
                <adc-icon
                  icon="navigation:chevron-down"
                  part="expando-icon"
                  class="adc--table-expand__svg"
                ></adc-icon>
              </button>
            </div>
            <slot></slot>
            ${super._renderFirstCells()}
          `
        : html`
            <slot></slot>
            ${super._renderFirstCells()}
            <div class="adc-table-expand-button--wrapper">
              <button
                class="adc-table-expand--button"
                aria-label="row-expand-button"
                @click="${handleClickExpando}"
              >
                <adc-icon
                  icon="navigation:chevron-down"
                  part="expando-icon"
                  class="adc--table-expand__svg"
                ></adc-icon>
              </button>
            </div>
          `}
    `;
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("expanded")) {
      const { selectorExpandedRow } = this.constructor as typeof DataTableExpandRow;
      const { expanded, nextElementSibling } = this;
      if (nextElementSibling?.matches(selectorExpandedRow)) {
        (nextElementSibling as DataTableExpandedRow).expanded = expanded;
      }
    }
  }

  /**
   * A selector that will return the corresponding expanded row.
   */
  static get selectorExpandedRow(): string {
    return "adc-table-expanded-row";
  }

  /**
   * The name of the custom event fired before the expanded state this row is
   * being toggled upon a user gesture. Cancellation of this event stops the
   * user-initiated action of toggling the expanded state.
   */
  static get eventBeforeExpandoToggle(): string {
    return "adc-table-row-expando-beingtoggled";
  }

  /**
   * The name of the custom event fired after the expanded state this row is
   * toggled upon a user gesture.
   */
  static get eventExpandoToggle(): string {
    return "adc-table-row-expando-toggled";
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-table-expand-row", DataTableExpandRow);
} catch (error) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-table-expand-row": DataTableExpandRow;
  }
}
