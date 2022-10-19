import { LitElement } from "lit";
import { property } from "lit/decorators.js";

/**
 * Select item group
 * @element adc-select-item-group
 */
export class SelectItemGroup extends LitElement {
  /**
   * Sets the disabled state for the group item.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Sets the label text for the group item.
   * @type {string}
   */
  @property({ reflect: true, attribute: "label-text" }) labelText = "";
}

try {
  customElements.define("adc-select-item-group", SelectItemGroup);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-select-item-group": SelectItemGroup;
  }
}
