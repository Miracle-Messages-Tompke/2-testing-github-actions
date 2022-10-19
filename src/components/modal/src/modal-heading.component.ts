import { html, LitElement } from "lit";
import styles from "./modal.styles";
import type { TemplateResult } from "lit";

/**
 * Modal heading
 * @element adc-modal-heading
 * @slot - default slot for content
 */
export class ModalHeading extends LitElement {
  render(): TemplateResult {
    return html` <slot></slot> `;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-modal-heading", ModalHeading);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-modal-heading": ModalHeading;
  }
}
