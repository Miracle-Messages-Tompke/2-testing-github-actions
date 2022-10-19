import { emit } from "@adc/internal/event";
import { FormSubmitController } from "@adc/internal/form";
import { watch } from "@adc/internal/watch";
import { html, LitElement } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import styles from "./checkbox.styles";
import type { PropertyValues, TemplateResult } from "lit";

/**
 * Checkbox
 * @element adc-checkbox
 * @fires adc-checkbox-changed - Event fired when the checkbox is changed.
 * @slot - Default slot, used for the label of checkbox.
 */
export class Checkbox extends LitElement {
  @query('input[type="checkbox"]') input: HTMLInputElement;

  // @ts-expect-error -- Controller is currently unused
  private readonly formSubmitController = new FormSubmitController(this, {
    value: (control: Checkbox) => (control.checked ? control.value : undefined)
  });

  @state() private hasFocus = false;
  @state() private pristine = true;

  /**
   * The checked state of the checkbox.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) checked = false;

  /**
   * The required state of the checkbox.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * Sets disabled state of the checkbox.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Sets the valid state of the checkbox.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /**
   * Hides the label of the checkbox.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true, attribute: "hide-label" })
  hideLabel = false;

  /**
   * The indeterminate state of the checkbox.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  /**
   * Sets the orientation of the checkbox.
   * @type {"vertical" | "horizontal"}
   */
  @property({ reflect: true }) orientation: "vertical" | "horizontal" = "horizontal";

  /**
   * Sets the label position of the checkbox.
   * @type {"left" | "right"}
   */
  @property({ attribute: "label-position", reflect: true })
  labelPosition: "left" | "right" = "right";

  /**
   * Sets the label text of the checkbox.
   * @type {string}
   */
  @property({ type: String, attribute: "label-text" }) labelText = "";

  /**
   * The name of the checkbox.
   * @type {string}
   */
  @property() name: string;

  /**
   * Sets the value of the checkbox.
   * @type {string}
   */
  @property() value: string;

  @property({ type: Boolean, attribute: "live-validation", reflect: true }) liveValidation = false;

  firstUpdated() {
    this.invalid = !this.pristine && !this.input.checkValidity();
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has("pristine")) {
      if (this.liveValidation && !this.pristine) {
        this.invalid = !this.input.checkValidity();
      }
    }

    if (changedProperties.has("disabled")) {
      if (this.disabled) {
        this.input.setAttribute("disabled", "disabled");
      } else {
        this.input.removeAttribute("disabled");
      }
    }
  }

  click() {
    this.input.click();
  }

  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  blur() {
    this.input.blur();
  }

  reportValidity() {
    return this.input.reportValidity();
  }

  setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }

  handleClick() {
    this.checked = !this.checked;
    this.indeterminate = false;
    this.handleValidity();

    emit(this, "adc-changed");
  }

  handleBlur() {
    this.hasFocus = false;

    emit(this, "adc-blur");
  }

  @watch("disabled", { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    this.input.disabled = this.disabled;
    this.invalid = !this.input.checkValidity();
  }

  handleFocus() {
    this.hasFocus = true;

    emit(this, "adc-focus");
  }

  @watch("checked", { waitUntilFirstUpdate: true })
  @watch("indeterminate", { waitUntilFirstUpdate: true })
  handleStateChange() {
    this.invalid = !this.input.checkValidity();
  }

  handleValidity() {
    if (this.liveValidation) {
      this.pristine = false;
    }

    this.invalid = !this.input.checkValidity();
  }

  render(): TemplateResult {
    const labelClasses = {
      "adc-checkbox__label--focused": this.hasFocus,
      "visually-hidden": this.hideLabel
    };

    return html` <label
      part="base"
      for="checkbox"
      class="adc-checkbox__label ${classMap(labelClasses)}"
    >
      <input
        part="input"
        id="checkbox"
        type="checkbox"
        class="adc-checkbox__input"
        name=${ifDefined(this.name)}
        value=${ifDefined(this.value)}
        .indeterminate=${live(this.indeterminate)}
        .checked=${live(this.checked)}
        .required=${this.required}
        aria-checked=${this.checked ? "true" : "false"}
        @click=${this.handleClick}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
      />
      <span part="label" class="adc-checkbox__label-text">
        <slot>${this.labelText}</slot>
      </span>
    </label>`;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-checkbox", Checkbox);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-checkbox": Checkbox;
  }
}
