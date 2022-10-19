import { html, LitElement } from "lit";
import styles from "./action-drawer.styles";
import type { TemplateResult } from "lit";

/**
 * Action drawer heading.
 * @element adc-action-drawer-heading
 */
export class ActionDrawerHeading extends LitElement {
  render(): TemplateResult {
    return html` <slot></slot> `;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-action-drawer-heading", ActionDrawerHeading);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-action-drawer-heading": ActionDrawerHeading;
  }
}
