import { html, LitElement } from "lit";
import styles from "./accordion.styles";
import type { TemplateResult } from "lit";

/**
 * Accordion component
 * @element adc-accordion
 */
export class Accordion extends LitElement {
  render(): TemplateResult {
    return html`<slot></slot>`;
  }

  connectedCallback(): void {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "list");
    }

    super.connectedCallback();
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-accordion", Accordion);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-accordion": Accordion;
  }
}
