import { html, LitElement } from "lit";
import styles from "./action-drawer.styles";
import type { TemplateResult } from "lit";

/**
 * Action drawer footer.
 * @element adc-action-drawer-footer
 */
export class ActionDrawerFooter extends LitElement {
  render(): TemplateResult {
    return html`
      <div class="adc-action-drawer__footer">
        <slot></slot>
      </div>
    `;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-action-drawer-footer", ActionDrawerFooter);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-action-drawer-footer": ActionDrawerFooter;
  }
}
