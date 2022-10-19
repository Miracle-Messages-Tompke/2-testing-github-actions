import { html, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";
import styles from "./list.styles";

/**
 * Unordered list
 * @element adc-unordered-list
 * @slot - Default slot, expecting adc-list-item
 */
export class UnorderedList extends LitElement {
  /**
   * If there is a parent list item, then the list is nested.
   */
  connectedCallback() {
    if (this.closest((this.constructor as typeof UnorderedList).selectorListItem)) {
      this.setAttribute("slot", "nested");
    } else {
      this.removeAttribute("slot");
    }

    super.connectedCallback();
  }

  protected render() {
    const classes = {
      "adc-list--nested": this.getAttribute("slot") === "nested"
    };

    return html`
      <ul class="adc-list--unordered ${classMap(classes)}">
        <slot></slot>
      </ul>
    `;
  }

  /**
   * @private
   */
  static get selectorListItem() {
    return "adc-list-item";
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-unordered-list", UnorderedList);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-unordered-list": UnorderedList;
  }
}
