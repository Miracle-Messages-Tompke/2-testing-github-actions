import { Focusable } from "@adc/shared/src/Focusable";
import { property } from "lit/decorators.js";

/**
 * Select item
 * @element adc-select-item
 */
export class SelectItem extends Focusable {
  /**
   * Sets the disabled state for the select item.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Sets the label text for the select item.
   * @type {string}
   */
  @property({ reflect: true, attribute: "label-text" }) labelText = "";

  /**
   * Sets selected for the select field.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) selected = false;

  /**
   * Sets the value for the select field.
   * @type {string}
   */
  @property({ reflect: true }) value = "";
}

try {
  customElements.define("adc-select-item", SelectItem);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-select-item": SelectItem;
  }
}
