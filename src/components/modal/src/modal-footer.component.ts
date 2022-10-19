import { html, LitElement } from "lit";
import styles from "./modal.styles";
import type { TemplateResult } from "lit";

/**
 * Modal footer
 * @element adc-modal-footer
 * @slot - default slot for content
 */
export class ModalFooter extends LitElement {
  render(): TemplateResult {
    return html`
      <div class="adc-modal__footer">
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
  customElements.define("adc-modal-footer", ModalFooter);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-modal-footer": ModalFooter;
  }
}
