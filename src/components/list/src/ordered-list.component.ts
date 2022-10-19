import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";
import styles from "./list.styles";
import { UnorderedList } from "./unordered-list.component";

/**
 * Unordered list
 * @element adc-ordered-list
 * @slot - Default slot, expecting adc-list-item
 */
export class OrderedList extends UnorderedList {
  render() {
    const classes = {
      "adc-list--nested": this.getAttribute("slot") === "nested"
    };

    return html`
      <ol class="adc-list--ordered ${classMap(classes)}">
        <slot></slot>
      </ol>
    `;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-ordered-list", OrderedList);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-ordered-list": OrderedList;
  }
}
