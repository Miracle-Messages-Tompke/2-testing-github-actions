import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import styles from "./content-switcher.styles";
import type { PropertyValues, TemplateResult } from "lit";

/**
 * Content switch panel
 * @element adc-content-panel
 * @slot - Default slot.
 */
export class ContentSwitchPanel extends LitElement {
  /**
   * Sets the panel to selected.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) selected = false;

  /**
   * Sets the value, should match with the switch.
   * @type {string}
   */
  @property({ reflect: true }) value = "";

  /**
   * Sets the id of the panel.
   * @type {string}
   */
  @property({ reflect: true }) id = "";

  protected render(): TemplateResult {
    return html`<slot></slot>`;
  }

  protected firstUpdated(): void {
    this.slot = "adc-content-switch-panel";
    this.setAttribute("role", "tabpanel");
    this.tabIndex = 0;

    if (!this.hasAttribute("id")) {
      this.id = `adc-content-switch-panel-${ContentSwitchPanel.instanceCount++}`;
    }
  }

  protected updated(changes: PropertyValues<this>): void {
    if (changes.has("selected")) {
      if (this.selected) {
        this.removeAttribute("aria-hidden");
        this.tabIndex = 0;
      } else {
        this.setAttribute("aria-hidden", "true");
        this.tabIndex = -1;
      }
    }
  }

  /**
   * Keeps track the instance the switch is related to.
   */
  static instanceCount = 0;

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-content-switch-panel", ContentSwitchPanel);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-content-switch-panel": ContentSwitchPanel;
  }
}
