import { DataTableRow } from "./table-row.component";

/**
 * Data table header row.
 * @element adc-table-header-row
 */
export class DataTableHeaderRow extends DataTableRow {
  /**
   * The name of the custom event fired before this row is selected/unselected
   * upon a user gesture. Cancellation of this event stops the user-initiated
   * change in selection.
   */
  static get eventBeforeChangeSelection(): string {
    return "adc-table-change-selection-all";
  }
}

try {
  customElements.define("adc-table-header-row", DataTableHeaderRow);
} catch (error) {
  // do nothing
}
declare global {
  interface HTMLElementTagNameMap {
    "adc-table-header-row": DataTableHeaderRow;
  }
}
