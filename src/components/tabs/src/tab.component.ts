import { FocusVisiblePolyfillMixin } from "@adc/shared/src/focus-visible";
import { ObserveSlotPresence, ObserveSlotText } from "@adc/shared/src/observeSlot";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import styles from "./tabs.styles";
import type { PropertyValues, TemplateResult } from "lit";

/**
 * Tab
 * @element adc-tab
 * @slot - Default content slot, used for the label.
 */
export class Tab extends FocusVisiblePolyfillMixin(
  ObserveSlotText(ObserveSlotPresence(LitElement, '[slot="icon"]'), "")
) {
  get hasIcon(): boolean {
    return this.slotContentIsPresent;
  }

  get hasLabel(): boolean {
    return !!this.label || this.slotHasContent;
  }

  /**
   * Sets the label text for the tab.
   * @type {string}
   */
  @property({ reflect: true }) label = "";

  /**
   * Sets the tab as disabled.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Sets the tab as selected.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) selected = false;

  /**
   * Sets the value of the tab to be associated with the tab-panel.
   * @type {string}
   */
  @property({ type: String, reflect: true }) value = "";

  render(): TemplateResult {
    return html` <label class="adc-tab adc-tabs__tab" id="tabLabel" ?hidden=${!this.hasLabel}>
      ${this.slotHasContent ? html`` : this.label}
      <slot>${this.label}</slot>
    </label>`;
  }

  /**
   * Whenever the tab is first rendered we set the role and if there isn't an
   * id, we set one.
   * @param changes
   */
  firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);

    this.setAttribute("role", "tab");
    if (!this.hasAttribute("id")) {
      this.id = `adc-tab-${Tab.instanceCount++}`;
    }
  }

  updated(changes: PropertyValues): void {
    super.updated(changes);

    if (changes.has("selected")) {
      this.setAttribute("aria-selected", this.selected ? "true" : "false");
      this.setAttribute("tabindex", this.selected ? "0" : "-1");
    }

    if (changes.has("disabled")) {
      if (this.disabled) {
        this.setAttribute("aria-disabled", "true");
      } else {
        this.removeAttribute("aria-disabled");
      }
    }
  }

  /**
   * Keeps track of the tab instance.
   * @private
   */
  static instanceCount = 0;

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-tab", Tab);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-tab": Tab;
  }
}
