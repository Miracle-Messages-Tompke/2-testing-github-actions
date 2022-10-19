import { html, LitElement } from "lit";
import styles from "./action-drawer.styles";
import type { TemplateResult } from "lit";

/**
 * Action drawer body.
 * @element adc-action-drawer-body
 */
export class ActionDrawerBody extends LitElement {
  render(): TemplateResult {
    return html`<slot></slot>`;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-action-drawer-body", ActionDrawerBody);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-action-drawer-body": ActionDrawerBody;
  }
}
