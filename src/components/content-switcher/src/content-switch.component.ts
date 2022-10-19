import { FocusVisiblePolyfillMixin } from "@adc/shared/src/focus-visible";
import { ObserveSlotPresence, ObserveSlotText } from "@adc/shared/src/observeSlot";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import styles from "./content-switcher.styles";
import type { PropertyValues, TemplateResult } from "lit";

/**
 * Content switch
 * @element adc-content-switch
 * @slot - Default slot.
 */
export class ContentSwitch extends FocusVisiblePolyfillMixin(
  ObserveSlotText(ObserveSlotPresence(LitElement, '[slot="icon"]'), "")
) {
  /**
   * Used to detect content and set switch to hidden.
   */
  protected get hasLabel(): boolean {
    return !!this.label || this.slotHasContent;
  }

  /**
   * Sets the button text label.
   * @type {string}
   */
  @property({ reflect: true }) label = "";

  /**
   * Sets the content switch to disabled.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Sets the content switch to selected.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) selected = false;

  /**
   * Sets the value of the content switch, this maps to the
   * `content-switch-panel`
   * @type {string}
   */
  @property({ reflect: true }) value = "";

  protected render(): TemplateResult {
    return html` <label
      class="adc-content-switch adc-content-switcher__button"
      id="content-switchLabel"
      ?hidden=${!this.hasLabel}
    >
      ${this.slotHasContent ? html`` : this.label}
      <slot>${this.label}</slot>
    </label>`;
  }

  /**
   * Sets the role on first render to 'tab'. Creates an id for the content
   * switch.
   */
  protected firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);

    this.setAttribute("role", "tab");
    if (!this.hasAttribute("id")) {
      this.id = `adc-content-switch-${ContentSwitch.instanceCount++}`;
    }
  }

  /**
   * When the content switch is re-rendered, check if the selected or disabled
   * property has changed. If the selected property has, set 'aria-selected' and
   * 'tabindex'. If disabled is set, set 'aria-disabled'.
   */
  protected updated(changes: PropertyValues): void {
    super.updated(changes);

    if (changes.has("selected")) {
      this.setAttribute("aria-selected", this.selected ? "true" : "false");
      this.setAttribute("tabindex", this.selected ? "0" : "-1");
    }

    if (changes.has("disabled")) {
      this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
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
  customElements.define("adc-content-switch", ContentSwitch);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-content-switch": ContentSwitch;
  }
}
