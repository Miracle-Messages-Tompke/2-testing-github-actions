import { html, LitElement } from "lit";
import styles from "./layout.styles";
import type { TemplateResult } from "lit";

/**
 * Layout
 * @element adc-layout
 * @slot - Content slot
 */
export class Layout extends LitElement {
  /**
   * @private
   */
  static shadowRootOptions: ShadowRootInit = {
    mode: "open",
    delegatesFocus: false
  };

  /**
   * Renders `main` DOM element, that has media query breakpoints applied to it.
   * @returns TemplateResult
   */
  protected render(): TemplateResult {
    return html`<main id="layout" class="adc-layout">
      <slot></slot>
    </main>`;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-layout", Layout);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-layout": Layout;
  }
}
