import { html, LitElement } from "lit";
import styles from "./modal.styles";
import type { TemplateResult } from "lit";

/**
 * Modal header
 * @element adc-modal-header
 * @slot - default slot for content
 */
export class ModalHeader extends LitElement {
  render(): TemplateResult {
    return html` <slot></slot> `;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-modal-header", ModalHeader);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-modal-header": ModalHeader;
  }
}
