import { html, LitElement } from "lit";
import styles from "./modal.styles";
import type { TemplateResult } from "lit";

/**
 * Modal body
 * @element adc-modal-body
 * @slot - default slot for content
 */
export class ModalBody extends LitElement {
  render(): TemplateResult {
    return html`<slot></slot>`;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-modal-body", ModalBody);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-modal-body": ModalBody;
  }
}
