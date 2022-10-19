import "@aileron/icon";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { FocusMixin } from "../../shared/src/focus";
import { ifNonNull } from "../../shared/src/ifNonNull/ifNonNull";
import { TABLE_SORT_CYCLE, TABLE_SORT_CYCLES, TABLE_SORT_DIRECTION } from "./defs";
import styles from "./table.styles";
import type { TemplateResult } from "lit";

export { TABLE_SORT_CYCLE, TABLE_SORT_CYCLES, TABLE_SORT_DIRECTION };

/**
 * Data table header.
 * @element adc-table-header-cell
 */
export class DataTableHeaderCell extends FocusMixin(LitElement) {
  /**
   * Handles `click` event on the sort button.
   * @param event The event.
   */
  private _handleClickSortButton() {
    const nextSortDirection = this._getNextSort();
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        oldSortDirection: this.sortDirection,
        sortDirection: nextSortDirection
      }
    };
    const constructor = this.constructor as typeof DataTableHeaderCell;
    if (this.dispatchEvent(new CustomEvent(constructor.eventBeforeSort, init))) {
      this.sortActive = true;
      this.sortDirection = nextSortDirection;
    }
  }

  /**
   * Handles `slotchange` event.
   * @param event The event.
   */
  private _handleSlotChange() {
    this.requestUpdate();
  }

  /**
   * @returns The next sort direction.
   */
  private _getNextSort() {
    const { sortCycle = TABLE_SORT_CYCLE.TRI_STATES_FROM_ASCENDING, sortDirection } = this;
    if (!sortDirection) {
      throw new TypeError(
        "Table sort direction is not defined. " +
          "Likely that `_getNextSort()` is called with non-sorted table column, which should not happen in regular condition."
      );
    }
    const directions = (this.constructor as typeof DataTableHeaderCell).TABLE_SORT_CYCLES[
      sortCycle
    ];
    const index = directions.indexOf(sortDirection);
    if (index < 0) {
      if (sortDirection === TABLE_SORT_DIRECTION.NONE) {
        // If the current sort direction is `none` in bi-state sort cycle,
        // returns the first one in the cycle
        return directions[0];
      }
      throw new RangeError(
        `The given sort state (${sortDirection}) is not found in the given table sort cycle: ${sortCycle}`
      );
    }
    return directions[(index + 1) % directions.length];
  }

  /**
   * `true` if this table header cell is of a primary sorting column.
   */
  @property({ type: Boolean, reflect: true, attribute: "sort-active" })
  sortActive = false;

  /**
   * The table sort cycle in use.
   */
  @property({ reflect: true, attribute: "sort-cycle" })
  sortCycle?: TABLE_SORT_CYCLE;

  /**
   * The table sort direction.
   * If present, this table header cell will have a sorting UI. Choose between
   * `ascending` or `descending`.
   */
  @property({ reflect: true, attribute: "sort-direction" })
  sortDirection?: TABLE_SORT_DIRECTION;

  connectedCallback(): void {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "columnheader");
    }
    super.connectedCallback();
  }

  render(): TemplateResult {
    const { sortDirection } = this;
    if (sortDirection) {
      const sortIcon =
        sortDirection === TABLE_SORT_DIRECTION.NONE
          ? html` <adc-icon icon="small:sort"></adc-icon> `
          : html` <adc-icon icon="navigation:chevron-down" class="adc--table-sort__icon"></adc-icon> `;
      return html`
        <button
          part="sort-button"
          class="adc--table-sort"
          title="${ifNonNull(this.textContent === null ? undefined : this.textContent)}"
          @click=${this._handleClickSortButton}
        >
          <span part="label-text" class="adc--table-header-label"
            ><slot @slotchange=${this._handleSlotChange}></slot
          ></span>
          ${sortIcon}
        </button>
      `;
    }
    return html` <slot></slot> `;
  }

  /**
   * The name of the custom event fired before a new sort direction is set upon
   * a user gesture. Cancellation of this event stops the user-initiated change
   * in sort direction.
   */
  static get eventBeforeSort(): string {
    return "adc-table-header-cell-sort";
  }

  /**
   * @private
   */
  static styles = styles;

  /**
   * Mapping of table sort cycles to table sort states.
   */
  static TABLE_SORT_CYCLES = TABLE_SORT_CYCLES;
}

try {
  customElements.define("adc-table-header-cell", DataTableHeaderCell);
} catch (error) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-table-header-cell": DataTableHeaderCell;
  }
}
