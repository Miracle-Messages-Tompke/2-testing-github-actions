import { html, LitElement } from "lit";
import styles from "./action-drawer.styles";
import type { TemplateResult } from "lit";

/**
 * Action drawer header.
 * @element adc-action-drawer-header
 */
export class ActionDrawerHeader extends LitElement {
  render(): TemplateResult {
    return html` <slot></slot> `;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-action-drawer-header", ActionDrawerHeader);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-action-drawer-header": ActionDrawerHeader;
  }
}
