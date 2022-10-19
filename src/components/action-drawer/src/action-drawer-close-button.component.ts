import { FocusVisiblePolyfillMixin } from "@adc/shared/src/focus-visible";
import { ifNonNull } from "@adc/shared/src/ifNonNull";
import "@aileron/icon";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import styles from "./action-drawer.styles";
import type { TemplateResult } from "lit";

/**
 * Action drawer close button.
 * @element adc-action-drawer-close-button
 * @csspart button The button.
 * @csspart close-icon The close icon.
 */
export class ActionDrawerCloseButton extends FocusVisiblePolyfillMixin(LitElement) {
  /**
   * The assistive text for the button.
   */
  @property({ attribute: "assistive-text" }) assistiveText = "Close";

  render(): TemplateResult {
    return html`
      <button
        part="button"
        aria-label="${ifNonNull(this.assistiveText)}"
        class="adc-action-drawer__close"
        title="${ifNonNull(this.assistiveText)}"
      >
        <adc-icon icon="action:close"></adc-icon>
      </button>
    `;
  }

  /**
   * @private
   */
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: parseFloat((/Safari\/(\d+)/.exec(navigator.userAgent) || [])[1]) <= 537
  };

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-action-drawer-close-button", ActionDrawerCloseButton);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-action-drawer-close-button": ActionDrawerCloseButton;
  }
}
