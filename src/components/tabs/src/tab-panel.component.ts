import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import styles from "./tabs.styles";
import type { PropertyValues, TemplateResult } from "lit";

/**
 * Tab panel
 * @element adc-tab-panel
 * @slot - Default content slot, used for the content.
 */
export class TabPanel extends LitElement {
  /**
   * Sets the tab panel as selected.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) selected = false;

  /**
   * Sets the value to be associated with the tab.
   * @type {string}
   */
  @property({ type: String, reflect: true }) value = "";

  /**
   * Sets the id for the tab-panel.
   * @type {string}
   */
  @property() id!: string;

  /**
   * Sets the tabindex for the tab panel.
   * @type {number}
   */
  @property({ type: Number }) tabIndex!: number;

  protected render(): TemplateResult {
    return html`<slot></slot>`;
  }

  /**
   * Sets a11y role and slot for use with the parent
   * component, tabs. If there isn't an id, one is generated.
   */
  protected firstUpdated(): void {
    this.slot = "adc-tab-panel";
    this.setAttribute("role", "tabpanel");
    this.tabIndex = 0;

    if (!this.hasAttribute("id")) {
      this.id = `adc-tab-panel-${TabPanel.instanceCount++}`;
    }
  }

  /**
   * Sets aria-hidden and tabindex based on tab visibility.
   * @param changes
   */
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
   * Tracks the instance that connects to the tab.
   * @private
   */
  static instanceCount = 0;

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-tab-panel", TabPanel);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-tab-panel": TabPanel;
  }
}
