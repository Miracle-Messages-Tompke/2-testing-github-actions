import { emit } from "@adc/internal/event";
import { FormSubmitController } from "@adc/internal/form";
import { HasSlotController } from "@adc/internal/slot";
import { watch } from "@adc/internal/watch";
import "@aileron/button-icon";
import "@aileron/icon";
import { html, LitElement } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import styles from "./text-input.styles";
import type { ButtonIcon } from "@aileron/button-icon";
import type { PropertyValues, TemplateResult } from "lit";

/**
 * Text input
 * @element adc-text-input
 * @slot helper-text - Helper text to display below the input.
 * @slot button-icon - Icon to display on the right side of the input.
 * @slot validity-message - Validity message to display below the input.
 */
export class TextInput extends LitElement {
  /**
   * The native input element selector query.
   */
  @query("input") input: HTMLInputElement;

  private readonly formSubmitController = new FormSubmitController(this);
  private readonly hasSlotController = new HasSlotController(
    this,
    "label",
    "button-icon",
    "helper-text",
    "validity-message"
  );

  @state() private hasFocus = false;
  @state() private focusWithin = false;
  @state() private isPasswordVisible = false;
  @state() private pristine = true;
  @state() private dirty = false;

  /**
   * May be any of the standard HTML autocomplete options.
   * @type {string}
   */
  @property() autocomplete: string;

  /**
   * Sets the role to combobox for the native input element, is true for Search component and should be false otherwise
   * @type {"true" | "false"}
   */
  @property({ type: Boolean, reflect: true }) isComboBox = false;

  /**
   * The form name for the native input element.
   * @type {string}
   */
  @property() name: string;

  /**
   * The regexp pattern to validate the native input element.
   * @type {regexp}
   */
  @property() pattern: string;

  /**
   * The regexp pattern to validate the native input element.
   * @type {regexp}
   */
  @property({ type: Number }) step: number;

  /**
   * Sets the id for the component.
   * @type {string}
   */
  @property() id = "";

  /**
   * If the native input element is of type number, this is minimum value.
   * @type {number}
   */
  @property() min: number | string;

  /**
   * If the native input element is of type number, this is maximum value.
   * @type {number}
   */
  @property() max: number | string;

  /**
   * The minimum length of the native input element.
   * @type {number}
   */
  @property({ attribute: "min-length", type: Number }) minLength: number;

  /**
   * The maximum length of the native input element.
   * @type {number}
   */
  @property({ attribute: "max-length", type: Number }) maxLength: number;

  /**
   * The label text for the native input element.
   * @type {string}
   */
  @property({ attribute: "label-text" }) labelText = "";

  /**
   * Sets the type of the native input element.
   * @type {"text"|"number"|"email"|"password"|"search"|"tel"|"url"|"date"}
   */
  @property({ reflect: true }) type:
    | "text"
    | "number"
    | "email"
    | "password"
    | "search"
    | "tel"
    | "url"
    | "date" = "text";

  /**
   * Sets a placeholder for the native input element.
   * @type {string}
   */
  @property() placeholder: string;

  /**
   * Sets the autofocus attribute on the native input element.
   * @type {boolean}
   */
  @property({ type: Boolean }) autofocus = false;

  /**
   * Sets the native input element to readonly.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /**
   * Sets disabled attribute on the native input element.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Sets the required attribute on the native input element.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * Sets the spellcheck attribute on the native input element.
   * @type {boolean}
   */
  @property({ type: Boolean }) spellcheck: boolean;

  /**
   * Sets the validity of the native input element.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /**
   * Set the message for contextual text below the input.
   * @type {string}
   */
  @property({ attribute: "helper-text" }) helperText = "";

  /**
   * Sets the message for validity when an input is required.
   * @type {string}
   */
  @property({ attribute: "required-validity-message" })
  requiredValidityMessage = "Please fill out this field";

  /**
   * Sets the inputmode attribute on the native input element.
   * @type {string}
   */
  @property({ attribute: "validity-message" }) validityMessage = "";

  /**
   * Sets if validity should be determined on blur.
   * @type {boolean}
   */
  @property({ type: Boolean, attribute: "live-validation", reflect: true }) liveValidation = false;

  @property({ type: Boolean, attribute: "can-clear", reflect: true }) canClear = true;

  /**
   * Sets the inputmode for the native input element.
   * @type {string}
   */
  @property() inputmode:
    | "none"
    | "text"
    | "decimal"
    | "numeric"
    | "tel"
    | "email"
    | "url"
    | "search";

  /**
   * Sets the value of the native input element.
   * @type {string}
   */
  @property() value = "";

  get valueAsDate() {
    return this.input?.valueAsDate ?? null;
  }

  set valueAsDate(newValue: Date | null) {
    this.updateComplete.then(() => {
      this.input.valueAsDate = newValue;
      this.value = this.input.value;
    });
  }

  get valueAsNumber() {
    return this.input?.valueAsNumber ?? parseFloat(this.value);
  }

  set valueAsNumber(newValue: number) {
    this.updateComplete.then(() => {
      this.input.valueAsNumber = newValue;
      this.value = this.input.value;
    });
  }

  clear() {
    this.dirty = false;
    this.value = "";
    this.focus();

    emit(this, "adc-clear");
  }

  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  blur() {
    this.input.blur();
    this.pristine = false;
  }

  select() {
    this.input.select();
  }

  setSelectionRange(
    selectionStart: number,
    selectionEnd: number,
    selectionDirection: "forward" | "backward" | "none" = "none"
  ) {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }

  setRangeText(
    replacement: string,
    start: number,
    end: number,
    selectMode: "select" | "start" | "end" | "preserve" = "preserve"
  ) {
    this.input.setRangeText(replacement, start, end, selectMode);

    if (this.value !== this.input.value) {
      this.value = this.input.value;
      emit(this, "adc-input");
      emit(this, "adc-change");
    }
  }

  reportValidity() {
    return this.input.reportValidity();
  }

  setCustomValidity(message: string) {
    if (message?.trim()) {
      this.invalid = true;
      this.validityMessage = message;

      return;
    }

    this.invalid = false;
    this.validityMessage = "";
  }

  private handleBlur() {
    this.focusWithin = false;
  }

  handleInputBlur() {
    this.hasFocus = false;
    this.handleValidity();

    emit(this, "adc-blur");
  }

  handleChange() {
    this.value = this.input.value;
    this.handleValidity();

    emit(this, "adc-change");
  }

  @watch("disabled", { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    this.input.disabled = this.disabled;
    this.invalid = !this.input.checkValidity();
  }

  handleFocus() {
    this.hasFocus = true;
    this.focusWithin = true;

    emit(this, "adc-focus");
  }

  handleInput() {
    this.dirty = true;
    this.value = this.input.value;
    this.setCustomValidity("");
    this.handleValidity();

    emit(this, "adc-input");
  }

  handleInvalid() {
    this.invalid = true;
  }

  handleValidity() {
    this.pristine = false;

    if (this.liveValidation) {
      this.invalid = !this.input.checkValidity();
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    const hasModifier = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;

    if (event.key === "Enter" && !hasModifier) {
      this.formSubmitController.submit();
      this.handleValidity();
    }
  }

  handlePasswordToggle() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  @watch("value", { waitUntilFirstUpdate: true })
  handleValueChange() {
    this.pristine = false;
    this.invalid = !this.input.checkValidity();
  }

  render(): TemplateResult {
    const hasLabelSlot = this.hasSlotController.test("label");
    const hasHelperTextSlot = this.hasSlotController.test("helper-text");
    const hasLabel = this.labelText ? true : !!hasLabelSlot;
    const hasHelperText = this.helperText ? true : !!hasHelperTextSlot;
    const inputClasses = {
      "adc-text-input--disabled": this.disabled,
      "adc-text-input--focused": this.hasFocus,
      "adc-text-input--readonly": this.readonly,
      "adc-text-input--no-label": !hasLabel,
      "adc-text-input--has-button": this.hasSlotController.test("button-icon"),
      "adc-text-input--can-clear": this.canClear
    };
    const labelClasses = {
      "adc-text-input__label--invalid": this.invalid
    };

    return html`
      <label
        part="form-control-label"
        class="adc-text-input__label ${classMap(labelClasses)}"
        for="input"
        aria-hidden=${hasLabel ? "false" : "true"}
      >
        ${this.invalid
          ? html`<adc-icon exportparts="icon: label-error-icon" icon="signal:error" size="16" class="adc-text-input__icon-error"></adc-icon>`
          : undefined}
        <slot name="label">${this.labelText}</slot>
      </label>
      <div class="adc-text-input--container ${classMap(inputClasses)}">
        <input
          part="input"
          id="input"
          class="adc-text-input__input"
          type=${this.type === "password" && this.isPasswordVisible ? "text" : this.type}
          name=${ifDefined(this.name)}
          .autocomplete=${this.autocomplete}
          ?autofocus=${this.autofocus}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          minlength=${ifDefined(this.minLength)}
          maxlength=${ifDefined(this.maxLength)}
          pattern=${ifDefined(this.pattern)}
          placeholder=${ifDefined(this.placeholder)}
          ?readonly=${this.readonly}
          ?required=${this.required}
          .value=${live(this.value)}
          inputmode=${ifDefined(this.inputMode)}
          step=${ifDefined(this.step)}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @blur=${this.handleInputBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
          @invalid=${this.handleInvalid}
          aria-invalid=${this.invalid ? "true" : "false"}
          spellcheck=${ifDefined(this.spellcheck)}
        />
        <span class="adc-text-input__button-container" part="icon-container">
          ${this.focusWithin
            ? this.canClear && this.dirty
              ? html`<adc-button-icon
                  exportparts="button-icon: clear-button"
                  icon="action:close"
                  kind="ghost"
                  outlined
                  size="sm"
                  @click=${() => this.clear()}
                  >Clear input</adc-button-icon
                >`
              : undefined
            : undefined}
          <slot name="button-icon"></slot>
        </span>
      </div>
      <div
        part="form-control-helper-text"
        id="helper-text"
        class="adc-text-input__helper-text"
        aria-hidden=${hasHelperText ? "false" : "true"}
      >
        <slot name="helper-text"> ${this.helperText}</slot>
      </div>
      <div class="adc-text-input--form-requirement" aria-live="polite">
        <slot name="validity-message">
          ${this.validityMessage || this.requiredValidityMessage}
        </slot>
      </div>
    `;
  }

  /**
   * To support ie11, when an input is disabled we have to set
   * the value to "disabled" on the attribute. This happens
   * on first render.
   * @param changedProperties
   */
  async firstUpdated(changedProperties: PropertyValues) {
    // wait for the browser to paint the element before we set the value
    await new Promise((resolve) => setTimeout(resolve, 0));

    this.invalid = !this.pristine && !this.input.checkValidity();
    this.addEventListener("blur", this.handleBlur);

    if (changedProperties.has("disabled")) {
      if (this.disabled) {
        this.input.setAttribute("disabled", "disabled");
      } else {
        this.input.removeAttribute("disabled");
      }
    }

    if (changedProperties.has("comboBox")) {
      if (this.isComboBox) {
        this.input.setAttribute("role", "combobox");
      }
    }
  }

  /**
   * To support ie11, when an input is disabled we have to set
   * the value to "disabled" on the attribute. This happens
   * on disabled property change.
   * @param changedProperties
   */
  updated(changedProperties: PropertyValues) {
    if (changedProperties.has("pristine")) {
      if (this.liveValidation && !this.pristine) {
        this.invalid = !this.input.checkValidity();
      }
    }

    if (this.hasSlotController.test("button-icon")) {
      const buttons = this.querySelectorAll<ButtonIcon>("[slot='button-icon']");

      buttons.forEach((button) => {
        button.kind = "ghost";
        button.size = "sm";
      });
    }

    if (changedProperties.has("disabled")) {
      if (this.disabled) {
        this.input.setAttribute("disabled", "disabled");
      } else {
        this.input.removeAttribute("disabled");
      }
    }
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-text-input", TextInput);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-text-input": TextInput;
  }
}
