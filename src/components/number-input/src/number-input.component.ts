import { ifNonNull } from "@adc/shared/src/ifNonNull";
import { ValidityMixin } from "@adc/shared/src/validity";
import "@aileron/icon";
import { html, LitElement } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { NUMBER_INPUT_VALIDATION_STATUS } from "./defs";
import styles from "./number-input.styles";
import type { TemplateResult } from "lit";

/**
 * Number input.
 * @element adc-number-input
 * @fires adc-number-input-input-value
 * @slot validity-message - The validity message. If present and non-empty, this
 * input shows the UI of its invalid state.
 * @slot required-validity-message - The validity message when input is
 * required.
 * @slot validity-message-min - The validity message when value input is lower
 * than minimum value expected.
 * @slot validity-message-max - The validity message when value input is greater
 * than maximum value expected.
 */
export class NumberInput extends ValidityMixin(LitElement) {
  /**
   * The underlying input element
   */
  @query("input") _input!: HTMLInputElement;

  /**
   * Handles `input` event on the `<input>` in the shadow DOM.
   */
  _handleInput({ target }: Event): void {
    this.value = (target as HTMLInputElement).value;
  }

  /**
   * When not disabled, append name and value to formData event object.
   */
  handleFormdata(event: Event): void {
    const { formData } = event as any;
    const { disabled, name, value } = this;

    if (!disabled && name) {
      formData.append(name, value);
    }
  }

  /**
   * Handles `click` event on the up button in the shadow DOM.
   */
  _handleUserInitiatedStepUp(): void {
    const { _input: input } = this;
    this.stepUp();
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof NumberInput).eventInput, {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          value: input.value
        }
      })
    );
  }

  /**
   * Handles `click` event on the down button in the shadow DOM.
   */
  _handleUserInitiatedStepDown(): void {
    const { _input: input } = this;
    this.stepDown();
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof NumberInput).eventInput, {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          value: input.value
        }
      })
    );
  }

  _testValidity(): string {
    if (this._input?.valueAsNumber > parseFloat(this.max)) {
      return NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MAXIMUM;
    }
    if (this._input?.valueAsNumber < parseFloat(this.min)) {
      return NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MINIMUM;
    }

    return super.testValidity();
  }

  /**
   * The minimum value allowed in the input
   */
  @property({ reflect: true })
  get min(): string {
    return this._min.toString();
  }

  set min(value: string) {
    const oldValue = this.min;
    this._min = value;
    this.requestUpdate("min", oldValue);
  }

  /**
   * The amount the value should increase or decrease by
   */
  @property({ reflect: true })
  get step(): string {
    return this._step.toString();
  }

  set step(value: string) {
    const oldValue = this.step;
    this._step = value;
    this.requestUpdate("step", oldValue);
  }

  /**
   * The maximum value allowed in the input
   */
  @property({ reflect: true })
  get max(): string {
    return this._max.toString();
  }

  set max(value: string) {
    const oldValue = this.max;
    this._max = value;

    this.requestUpdate("max", oldValue);
  }

  /**
   * Handles incrementing the value in the input
   */
  stepUp(): void {
    this._input.stepUp();
    const oldValue = this._value;
    this._value = this.value;

    this.requestUpdate("value", oldValue);
  }

  /**
   * Handles decrementing the value in the input
   */
  stepDown(): void {
    this._input.stepDown();
    const oldValue = this._value;
    this._value = this.value;

    this.requestUpdate("value", oldValue);
  }

  /**
   * May be any of the standard HTML autocomplete options
   */
  @property() autocomplete: any = "";

  /**
   * Name for the input in the `FormData`
   */
  @property() name = "";

  /**
   * Pattern to validate the input against for HTML validity checking
   */
  @property() pattern = "^[0-9]*$";

  /**
   * Value to display when the input has an empty `value`
   */
  @property({ reflect: true }) placeholder = "";

  /**
   * Sets the input to be focussed automatically on page load. Defaults to false
   */
  @property({ type: Boolean }) autofocus = false;

  /**
   * Controls the disabled state of the input
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Boolean property to set the required status
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * Controls the invalid state and visibility of the `validityMessage`
   */
  @property({ type: Boolean, reflect: true }) invalid = false;

  protected _value = "";
  protected _min = "";
  protected _max = "";
  protected _step = "1";

  /**
   * Aria text for the button that increments the value
   */
  @property({ attribute: "increment-button-assistive-text" })
  incrementButtonAssistiveText = "increase number input";

  /**
   * Aria text for the button that decrements the value
   */
  @property({ attribute: "decrement-button-assistive-text" })
  decrementButtonAssistiveText = "decrease number input";

  /**
   * The validity message shown when input is required
   *
   * Also available via the `required-validity-message` slot
   */
  @property({ attribute: "required-validity-message" })
  requiredValidityMessage = "Please fill out this field";

  /**
   * The validity message shown when input is invalid
   *
   * Also available via the `validity-message` slot
   */
  @property({ attribute: "validity-message" }) validityMessage = "";

  /**
   * The validity message shown when the value is greater than the maximum
   *
   * Also available via the `validity-message-max` slot
   */
  @property({ attribute: "validity-message-max" }) validityMessageMax = "";

  /**
   * The validity message shown when the value is less than the minimum
   *
   * Also available via the `validity-message-min` slot
   */
  @property({ attribute: "validity-message-min" }) validityMessageMin = "";

  @property({ reflect: true })
  get value(): string {
    if (this._input) {
      return this._input.value;
    }

    return this._value;
  }

  set value(value: string) {
    const oldValue = this._value;
    this._value = value;

    this.requestUpdate("value", oldValue);

    if (this._input) {
      this._input.value = value;
    }
  }

  protected renderIncrementButton(): TemplateResult {
    const { _handleUserInitiatedStepUp: handleUserInitiatedStepUp } = this;
    const validity = this._testValidity();
    return html`
      ${validity === NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MAXIMUM ? html`
        <button
          class="adc-number-input__control--max"
          aria-label="${this.incrementButtonAssistiveText}"
          aria-live="polite"
          aria-atomic="true"
          type="button"
          ?disabled=${this.disabled}
          @click=${handleUserInitiatedStepUp}
        >
          <adc-icon icon="action:plus"></adc-icon>
        </button>
      ` : html`
        <button
          class="adc-number-input__control"
          aria-label="${this.incrementButtonAssistiveText}"
          aria-live="polite"
          aria-atomic="true"
          type="button"
          ?disabled=${this.disabled}
          @click=${handleUserInitiatedStepUp}
        >
          <adc-icon icon="action:plus"></adc-icon>
        </button>
      `}
    `;
  }

  renderDecrementButton(): TemplateResult {
    const { _handleUserInitiatedStepDown: handleUserInitiatedStepDown } = this;
    const validity = this._testValidity();
    return html`
      ${validity === NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MINIMUM ? html`
        <button
          class="adc-number-input__control--min"
          aria-label="${this.decrementButtonAssistiveText}"
          aria-live="polite"
          aria-atomic="true"
          type="button"
          ?disabled=${this.disabled}
          @click=${handleUserInitiatedStepDown}
        >
          <adc-icon icon="action:subtract"></adc-icon>
        </button>
      ` : html`
        <button
          class="adc-number-input__control"
          aria-label="${this.decrementButtonAssistiveText}"
          aria-live="polite"
          aria-atomic="true"
          type="button"
          ?disabled=${this.disabled}
          @click=${handleUserInitiatedStepDown}
        >
          <adc-icon icon="action:subtract"></adc-icon>
        </button>
      `}
    `;
  }

  render(): TemplateResult {
    const { _handleInput: handleInput } = this;
    const validity = this._testValidity();
    const isGenericallyInvalid = () =>
      this.invalid &&
      validity !== NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MAXIMUM &&
      validity !== NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MINIMUM;
    const isRequired = () => this.required;
    const inputClasses = {
      "adc-number-input--exceed-min": validity === NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MINIMUM,
      "adc-number-input--exceed-max": validity === NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MAXIMUM,
      "adc-number-input__input": true
    };

    return html`
      <div class="adc-number-input__wrapper" ?data-invalid="${this.invalid}">
        ${this.renderDecrementButton()}
        <input
          autocomplete="${this.autocomplete}"
          class="${classMap(inputClasses)}"
          ?data-invalid="${this.invalid}"
          ?disabled="${this.disabled}"
          id="input"
          name="${ifNonNull(this.name)}"
          pattern="[0-9]"
          placeholder="${ifNonNull(this.placeholder)}"
          ?required="${this.required}"
          type="number"
          .value="${this._value}"
          @input="${handleInput}"
          min="${ifNonNull(this.min)}"
          max="${ifNonNull(this.max)}"
          step="${ifNonNull(this.step)}"
        />
        ${this.renderIncrementButton()}
      </div>
      <div class="adc-number-input--form-requirement">
        <div class="validity" ?hidden="${!isGenericallyInvalid()}">
          <slot name="validity-message"> ${this.validityMessage} </slot>
        </div>
        <div class="required" ?hidden="${!isRequired()}">
          <slot name="required-validity-message"> ${this.requiredValidityMessage} </slot>
        </div>
        <div
          class="message-max"
          ?hidden="${validity !== NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MAXIMUM}"
        >
          <slot name="validity-message-max"> ${this.validityMessageMax} </slot>
        </div>
        <div
          class="message-min"
          ?hidden="${validity !== NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MINIMUM}"
        >
          <slot name="validity-message-min"> ${this.validityMessageMin} </slot>
        </div>
      </div>
    `;
  }

  _getValidityMessage(state: string): string {
    if (
      Object.values(NUMBER_INPUT_VALIDATION_STATUS).includes(
        state as NUMBER_INPUT_VALIDATION_STATUS
      )
    ) {
      const stateMessageMap = {
        [NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MAXIMUM]: this.validityMessageMax,
        [NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MINIMUM]: this.validityMessageMin
      };

      return stateMessageMap[state];
    }

    return super.getValidityMessage(state);
  }

  /**
   * The name of the custom event fired after the value is changed upon a user
   * gesture.
   */
  static get eventInput(): string {
    return "adc-number-input-input-value";
  }

  /**
   * @private
   */
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  };

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-number-input", NumberInput);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-number-input": NumberInput;
  }
}
