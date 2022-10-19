/* eslint-disable lit-a11y/click-events-have-key-events */
import { FocusMixin } from "@adc/shared/src/focus";
import { ifNonNull } from "@adc/shared/src/ifNonNull";
import "@aileron/icon";
import "@aileron/text-input";
import { html, LitElement } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./date-picker.styles";
import { DATE_PICKER_INPUT_KIND } from "./defs";
import type { TextInput } from "@aileron/text-input";
import type { TemplateResult } from "lit";

/**
 * The input box for date picker.
 * @element adc-date-picker-input
 */
export class DatePickerInput extends FocusMixin(LitElement) {
  /**
   * The `<input>`, used for Flatpickr to grab.
   */
  @query("adc-text-input") adcTextInput!: TextInput;

  /**
   * Handles `click` event on the calendar icon.
   * @param event The event.
   */
  private _handleClickWrapper(event: MouseEvent) {
    if (event.target === this.adcTextInput) {
      this.adcTextInput.focus();
    }
  }

  /**
   * Handles `input` event on `<input>` in the shadow DOM.
   * @param event The event.
   */
  private _handleInput({ target }: Event) {
    const { value } = target as HTMLInputElement;
    this.value = value;
  }

  @state() protected focused = false;

  @property({ type: Boolean, reflect: false }) open = false;

  /**
   * `true` if the input should be disabled.
   */
  @property({ type: Boolean }) disabled = false;

  /**
   * `true` if the input should be readonly.
   */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /**
   * Controls the invalid state and visibility of the `validityMessage`.
   */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /**
   * Date picker input kind.
   */
  @property({ reflect: true }) kind = DATE_PICKER_INPUT_KIND.SIMPLE;

  /**
   * The label text.
   */
  @property({ attribute: "label-text" }) labelText = "";

  /**
   * The placeholder text.
   */
  @property({ type: String }) placeholder = "";

  /**
   * The special validity message for `required`.
   */
  @property({ attribute: "required-validity-message" })
  requiredValidityMessage = "Please fill out this field.";

  /**
   * The validity message.
   * If present and non-empty, this date picker input shows the UI of its invalid state.
   */
  @property({ attribute: "validity-message" }) validityMessage = "";

  /**
   * The value.
   */
  @property() value!: string;

  /**
   * The `type` attribute for the `<input>` in the shadow DOM.
   */
  @property() type!: string;

  /**
   * The `pattern` attribute for the `<input>` in the shadow DOM.
   */
  @property() pattern!: string;

  protected firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
  }

  protected renderIcon(): TemplateResult {
    return html`
      <div class="adc-date-picker-icon--container">
        <button part="button" aria-label="calendar" class="adc-date-picker__icon">
          <adc-icon icon="operation:calendar"></adc-icon>
        </button>
      </div>
    `;
  }

  render(): TemplateResult {
    const constructor = this.constructor as typeof DatePickerInput;
    const {
      invalid,
      pattern = constructor.defaultPattern,
      value,
      validityMessage,
      _handleClickWrapper: handleClickWrapper,
      _handleInput: handleInput
    } = this;

    const classes = {
      "adc-text-input--outlined": this.focused,
      "adc-date-picker__label--invalid": invalid
    };

    const supplementalText = invalid
      ? html`
          <div class="adc-date-picker--form-requirement" id="validity-message">
            <slot name="validity-message">${validityMessage}</slot>
          </div>
        `
      : html``;

    return html`
      <div class="adc-date-picker-input__wrapper" @click="${handleClickWrapper}">
        <adc-text-input
          id="input"
          type="text"
          class="adc-date-picker__input adc-date-picker__label ${classMap(classes)}"
          ?readonly=${this.readonly}
          ?invalid=${this.invalid}
          label-text=${this.labelText}
          pattern="${pattern}"
          placeholder="${this.placeholder}"
          value="${ifNonNull(value)}"
          ?data-invalid="${this.invalid}"
          @input="${handleInput}"
        >
        </adc-text-input>
        ${this.renderIcon()} ${supplementalText}
      </div>
    `;
  }

  /**
   * The default value for `pattern` property.
   */
  static defaultPattern = "\\d{1,2}\\/\\d{1,2}\\/\\d{4}";

  /**
   * The default value for `type` property.
   */
  static defaultType = "text";

  /**
   * A selector that will return the parent date picker.
   */
  static get selectorParent() {
    return "adc-date-picker";
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-date-picker-input", DatePickerInput);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-date-picker-input": DatePickerInput;
  }
}
