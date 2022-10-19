import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { TAG_KIND, TAG_POSITION, TAG_VARIANT } from "./defs";
import styles from "./tag.styles";
import type { TemplateResult } from "lit";

/**
 * Tag
 * @element adc-tag
 * @slot icon - placement of the icon
 */
export class Tag extends LitElement {
  /**
   * The text label of the tag.
   * @type {string}
   */
  @property({ type: String, attribute: "label-text" }) labelText!: string;

  /**
   * The position of the icon in relation to the label.
   * @type {"rtl"|"ltr"}
   */
  @property({ type: String, reflect: true }) position = TAG_POSITION.LTR;

  /**
   * The kind of tag to display. This will be used to determine the color of the
   * tag.
   * @type {"success"|"information"|"warning"|"error"|""}
   */
  @property({ type: String, reflect: true }) kind = TAG_KIND.DEFAULT;

  /**
   * Sets whether the tag is a ribbon or regular.
   * @type {"ribbon"|""}
   */
  @property({ type: String, reflect: true }) variant = TAG_VARIANT.DEFAULT;

  render(): TemplateResult {
    const { labelText } = this;

    return html`
      <slot name="icon"></slot>
      ${labelText ? html`<span class="adc-tag__label">${labelText}</span>` : ""}
    `;
  }

  /**
   * Adds the a11y role to the tag.
   */
  connectedCallback(): void {
    super.connectedCallback();
    if (!this.getAttribute("role")) {
      this.setAttribute("role", "region");
    }
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-tag", Tag);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-tag": Tag;
  }
}
