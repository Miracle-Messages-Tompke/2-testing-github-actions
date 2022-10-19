import { DataTableExpandRow } from "./table-expand-row.component";

/**
 * Data table header row.
 * @element adc-table-header-expand-row
 */
export class DataTableHeaderExpandRow extends DataTableExpandRow {
  /**
   * The name of the custom event fired before this row is selected/unselected
   * upon a user gesture. Cancellation of this event stops the user-initiated
   * change in selection.
   */
  static get eventBeforeChangeSelection(): string {
    return "adc-table-change-selection-all";
  }

  /**
   * The name of the custom event fired before the expanded state this row is
   * being toggled upon a user gesture. Cancellation of this event stops the
   * user-initiated action of toggling the expanded state.
   */
  static get eventBeforeExpandoToggle(): string {
    return "adc-table-row-expando-beingtoggled-all";
  }

  /**
   * The name of the custom event fired after the expanded state this row is
   * toggled upon a user gesture.
   */
  static get eventExpandoToggle(): string {
    return "adc-table-row-expando-toggled-all";
  }
}

try {
  customElements.define("adc-table-header-expand-row", DataTableHeaderExpandRow);
} catch (error) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-table-header-expand-row": DataTableHeaderExpandRow;
  }
}
