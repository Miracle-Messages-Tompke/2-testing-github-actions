import { emit } from "@adc/internal/event";
import { FormSubmitController } from "@adc/internal/form";
import { watch } from "@adc/internal/watch";
import { html, LitElement } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import styles from "./radio-button.styles";
import type { TemplateResult } from "lit";

/**
 * Radio Button
 * @element adc-radio-button
 * @fires adc-radio-button-changed - Event fired when the checked state of the
 * radio button changes.
 * @slot - Default text label content.
 */
export class RadioButton extends LitElement {
  /**
   * Actual radio button element.
   * @private
   */
  @query("input[type=radio]") input: HTMLInputElement;

  readonly formSubmitController = new FormSubmitController(this, {
    value: (control: HTMLInputElement) => (control.checked ? control.value : undefined)
  });

  @state() hasFocus = false;

  /**
   * Sets the checked state of the radio button.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) checked = false;

  /**
   * Sets the disabled state of the radio button.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Hides the label text on for the radio button.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true, attribute: "hide-label" })
  hideLabel = false;

  /**
   * Positions the label text to the right/left of the radio button.
   * @type {"left"|"right"}
   */
  @property({ reflect: true, attribute: "label-position" })
  labelPosition: "left" | "right" = "right";

  /**
   * Sets the label text for the radio button.
   * @type {string}
   */
  @property({ attribute: "label-text" }) labelText: string;

  /**
   * Set the value for the radio button.
   * @type {string}
   */
  @property() value: string;

  /**
   * Sets the validity of the radio button.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /**
   * Marks the radio button as required.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * Sets the name of the radio button.
   * @type {string}
   */
  @property() name: string;

  /**
   * Sets the orientation of the radio button.
   * @type {"horizontal"|"vertical"}
   */
  @property({ reflect: true }) orientation: "horizontal" | "vertical" = "horizontal";

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

  checkValidity() {
    return this.input.checkValidity();
  }

  setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }

  handleBlur() {
    this.hasFocus = false;

    emit(this, "adc-blur");
  }

  handleClick() {
    if (!this.disabled) {
      this.checked = true;
    }
  }

  handleFocus() {
    this.hasFocus = true;

    emit(this, "adc-focus");
  }

  handleInvalid() {
    this.invalid = true;
  }

  @watch("checked")
  handleCheckedChange() {
    if (this.hasUpdated) {
      emit(this, "adc-change");
    }
  }

  @watch("disabled", { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");

    if (this.hasUpdated) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }

  render(): TemplateResult {
    const labelClasses = {
      "adc-radio-button__label--hidden": this.hideLabel,
      "adc-radio-button__label--checked": this.checked,
      "adc-radio-button__label--disabled": this.disabled,
      "adc-radio-button__label--invalid": this.invalid,
      "adc-radio-button__label--required": this.required,
      "adc-radio-button__label--focused": this.hasFocus
    };

    const innerLabelClasses = {
      "visually-hidden": this.hideLabel
    };

    return html`
      <input
        id="input"
        class="adc-radio-button__input visually-hidden"
        type="radio"
        .checked=${live(this.checked)}
        .disabled=${this.disabled}
        .required=${this.required}
        name=${ifDefined(this.name)}
        value=${ifDefined(this.value)}
        @invalid=${this.handleInvalid}
        @click=${this.handleClick}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      />
      <label part="base" for="input" class="adc-radio-button__label ${classMap(labelClasses)}">
        <span part="control" class="adc-radio-button__control"></span>
        <span part="label" class="adc-radio-button__label-text ${classMap(innerLabelClasses)}">
          <slot>${this.labelText}</slot>
        </span>
      </label>
    `;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-radio-button", RadioButton);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-radio-button": RadioButton;
  }
}
