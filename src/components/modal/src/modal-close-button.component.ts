import { FocusVisiblePolyfillMixin } from "@adc/shared/src/focus-visible";
import { ifNonNull } from "@adc/shared/src/ifNonNull";
import "@aileron/icon";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import styles from "./modal.styles";
import type { TemplateResult } from "lit";

/**
 * Modal close button
 * @element adc-modal-close-button
 * @csspart button - button
 */
export class ModalCloseButton extends FocusVisiblePolyfillMixin(LitElement) {
  /**
   * Default text for a11y
   * @type {string}
   */
  @property({ attribute: "assistive-text" }) assistiveText = "Close";

  render(): TemplateResult {
    return html`
      <button
        part="button"
        aria-label="${ifNonNull(this.assistiveText)}"
        class="adc-modal__close"
        title="${ifNonNull(this.assistiveText)}"
      >
        <adc-icon icon="action:close"></adc-icon>
      </button>
    `;
  }

  /**
   * @private
   */
  static shadowRootOptions: ShadowRootInit = {
    mode: "open",
    delegatesFocus: parseFloat((/Safari\/(d+)/.exec(navigator.userAgent) ?? ["", "0"])[1]) <= 537
  };

  /**
   * @private
   */
  static styles = [styles];
}

try {
  customElements.define("adc-modal-close-button", ModalCloseButton);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-modal-close-button": ModalCloseButton;
  }
}
