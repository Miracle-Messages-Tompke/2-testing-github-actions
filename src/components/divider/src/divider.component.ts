import { HasSlotController } from "@adc/internal/slot";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./divider.styles";
import type { TemplateResult } from "lit";

/**
 * Divider
 * @element adc-divider
 */
export class Divider extends LitElement {
  private readonly hasSlotController = new HasSlotController(this);
  /**
   * Sets the stroke from solid to dashed
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) dashed = false;

  /**
   * @deprecated Sets the margin size of the divider
   * @type {"x-small" | "small" | "medium" | "large"}
   */
  @property({ reflect: true }) size = "small";

  /**
   * Sets the margin spacing of the divider
   * @type {"12" | "16" | "24" | "32" | "40" | "48" | "64"}
   */
  @property({ reflect: true }) spacing = "12";

  firstUpdated(): void {
    if (this.hasSlotController.test("[default]")) {
      const slotElement = this.shadowRoot?.querySelector("slot");
      const elements = slotElement?.assignedElements();
      elements?.forEach((element) => element.setAttribute("role", "presentation"));
    }
  }

  render(): TemplateResult {
    const classes = {
      "adc-divider--solid": !this.dashed,
      "adc-divider--dashed": this.dashed,
      "adc-divider--text": this.hasSlotController.test("[default]"),
      "adc-divider--x-small": this.size === "x-small",
      "adc-divider--small": this.size === "small",
      "adc-divider--medium": this.size === "medium",
      "adc-divider--large": this.size === "large",
      [`adc-divider--spacing-${this.spacing}`]: this.spacing
    };

    return html`<div part="divider" role="separator" class="adc-divider ${classMap(classes)}">
      <slot></slot>
    </div>`;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-divider", Divider);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-divider": Divider;
  }
}
