import { emit } from "@adc/internal/event";
import { FormSubmitController } from "@adc/internal/form";
import { HasSlotController } from "@adc/internal/slot";
import { watch } from "@adc/internal/watch";
import { filter } from "@adc/shared/src/helpers/filter";
import "@aileron/icon";
import { html, LitElement } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import styles from "./select.styles";
import type { PropertyValues, TemplateResult } from "lit";

/**
 * Select
 * @element adc-select
 * @fires adc-select-item-selected
 * @slot - Default slot
 * @slot - validity-message - Validity message slot for invalid state messaging
 * @slot - helper-text - Helper text slot for context
 */
export class Select extends LitElement {
  /**
   * MutationObserver
   * @private
   */
  private observerMutation: MutationObserver | null = null;

  // @ts-expect-error - These are not used yet
  private readonly formSubmitController = new FormSubmitController(this);

  // @ts-expect-error - These are not used yet
  private readonly hasSlotController = new HasSlotController(this, "help-text");

  @state() private hasFocus = false;
  @state() private pristine = true;

  /**
   * native select node
   * @private
   */
  @query("select") dropdown: HTMLSelectElement;

  /**
   * on input, dispatch event containing value
   * @param event.target
   * @fires adc-select-item-selected
   */
  private handleInput({ target }: Event) {
    const { value } = target as HTMLSelectElement;
    this.value = value;
    this.setCustomValidity("");
    this.handleValidity();

    const { eventSelect } = this.constructor as typeof Select;
    this.dispatchEvent(
      new CustomEvent(eventSelect, {
        bubbles: true,
        composed: true,
        detail: {
          value
        }
      })
    );
  }

  /**
   * re-render on mutation
   * @private
   */
  private readonly handleMutation = () => {
    this.requestUpdate();
  };

  private renderItems(element: Select | HTMLOptGroupElement) {
    const { selectorItem, selectorLeafItem } = this.constructor as typeof Select;
    return html`${filter(
      element.childNodes,
      (item) => item.nodeType === Node.ELEMENT_NODE && (item as Element).matches(selectorItem)
    ).map((item: Select) => {
      const disabled = item.hasAttribute("disabled");
      const labelText = item.getAttribute("label-text")!;
      const selected = item.hasAttribute("selected");
      const value = item.getAttribute("value")!;
      const textContent: string = item.textContent!;

      return item.matches(selectorLeafItem)
        ? html` <option
            class="adc-select-option"
            ?disabled="${disabled}"
            label="${ifDefined(textContent || labelText)}"
            ?selected="${selected}"
            .value=${value}
          >
            ${textContent || labelText}
          </option>`
        : html`
            <optgroup
              class="adc-select-optgroup"
              ?disabled="${disabled}"
              label="${ifDefined(labelText)}"
            >
              ${this.renderItems(item)}
            </optgroup>
          `;
    })}`;
  }

  handleValidity() {
    this.pristine = false;

    if (this.liveValidation) {
      this.invalid = !this.dropdown.checkValidity();
    }
  }

  /**
   * When not disabled, append name and value to formData event object.
   * @param event
   */
  handleFormdata(event: FormDataEvent): void {
    const { formData } = event;
    const { disabled, name, value } = this;

    if (!disabled) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      this.handleValidity();
      formData.append(name, value);
    }
  }

  /**
   * get the length of the select node.
   */
  get length(): number {
    return this.dropdown.length;
  }

  /**
   * get the options for the select node.
   */
  get options(): HTMLOptionsCollection {
    return this.dropdown.options;
  }

  /**
   * get the type for the select node.
   */
  get type(): string {
    return this.dropdown.type;
  }

  /**
   * Sets the select element to disabled.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Text below the select used to provide context.
   * @type {string}
   */
  @property({ attribute: "helper-text" }) helperText = "";

  /**
   * Set the id of the select element.
   * @type {string}
   */
  @property() id;

  /**
   * Sets the select element validity.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /**
   * Sets the label for the select element.
   * @type {string}
   */
  @property({ type: String, attribute: "label-text" }) labelText = "";

  /**
   * Always sets multiple to false.
   * @type {boolean}
   */
  @property({ type: Boolean })
  get multiple(): boolean {
    return false;
  }

  /**
   * Set autocomplete to the select element.
   * @type {string}
   */
  @property() autocomplete = "";

  /**
   * Set the name to the select element.
   * @type {string}
   */
  @property() name;

  /**
   * Sets native pattern validation to the select element.
   * @type {regexp}
   */
  @property() pattern;

  /**
   * Sets a placeholder to be used by default for an option element.
   * @type {string}
   */
  @property() placeholder = "";

  /**
   * Sets native readonly to the select element.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /**
   * Sets required for validation of the select element.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) required = false;

  @property({ type: Boolean, attribute: "live-validation", reflect: true }) liveValidation = false;

  /**
   * Sets a required message to be used whenever the select element is invalid.
   * @type {string}
   */
  @property({ attribute: "required-validity-message" })
  requiredValidityMessage = "Please fill out this field.";

  /**
   * Sets the selected option from the select element.
   * @type {number}
   */
  @property({ type: Number })
  get selectedIndex(): number {
    return this.dropdown.selectedIndex;
  }

  set selectedIndex(value: number) {
    this.dropdown.selectedIndex = value;
    this.value = this.dropdown.value;
  }

  /**
   * Sets a generic validity message to be used whenever the select element is
   * invalid.
   * @type {string}
   */
  @property({ attribute: "validity-message" }) validityMessage = "";

  /**
   * Sets the value of the select element.
   * @type {string}
   */
  @property() value;

  reportValidity(): boolean {
    return this.dropdown.reportValidity();
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

  focus(options?: FocusOptions) {
    this.dropdown.focus(options);
  }

  blur() {
    this.dropdown.blur();
  }

  handleBlur() {
    this.hasFocus = false;
    this.handleValidity();

    emit(this, "adc-blur");
  }

  @watch("disabled", { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    if (this.disabled) {
      this.dropdown.disabled = this.disabled;
      this.invalid = !this.dropdown.checkValidity();
    }
  }

  handleFocus() {
    if (!this.hasFocus) {
      this.hasFocus = true;

      emit(this, "adc-focus");
    }
  }

  handleLabelClick() {
    this.focus();
  }

  handleInvalid() {
    this.invalid = true;
  }

  @watch("value", { waitUntilFirstUpdate: true })
  async handleValueChange() {
    await this.updateComplete;
    this.handleValidity();

    emit(this, "adc-change");
  }

  /**
   * Disable observerMutation to prevent memory leak in ie11
   */
  connectedCallback() {
    super.connectedCallback();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    const isIE11 = !!(window as any).MSInputMethodContext && !!(document as any).documentMode;

    if (!isIE11) {
      this.observerMutation = new MutationObserver(this.handleMutation);
      this.observerMutation.observe(this, {
        attributes: true,
        childList: true,
        subtree: true
      });
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.observerMutation) {
      this.observerMutation.disconnect();
      this.observerMutation = null;
    }
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has("pristine")) {
      if (this.liveValidation && !this.pristine) {
        this.invalid = !this.dropdown.checkValidity();
      }
    }

    if (changedProperties.has("value")) {
      const { value } = this;

      this.dropdown.value = !value ? "" : value;
    }

    if (changedProperties.has("disabled")) {
      if (this.disabled) {
        this.dropdown.setAttribute("disabled", "disabled");
      } else {
        this.dropdown.removeAttribute("disabled");
      }
    }
  }

  firstUpdated() {
    this.invalid = !this.pristine && !this.dropdown.checkValidity();
  }

  render(): TemplateResult {
    const {
      disabled,
      helperText,
      invalid,
      labelText,
      required,
      name,
      autocomplete,
      placeholder,
      validityMessage,
      requiredValidityMessage,
      value
    } = this;

    const labelClasses = {
      "adc-select__label--disabled": disabled
    };

    const helperClasses = {
      "adc-select__helper-text--disabled": disabled
    };

    const supplementalText = !invalid
      ? html`
          <div class="adc-select__helper-text ${classMap(helperClasses)}">
            <slot name="helper-text">${helperText}</slot>
          </div>
        `
      : html`
          <div class="adc-select--form-requirement" id="validity-message" aria-live="polite">
            <slot name="validity-message">${validityMessage || requiredValidityMessage}</slot>
          </div>
        `;

    return html`
      <label class="adc-select__label ${classMap(labelClasses)}" for="input">
        ${invalid
          ? html` <span class="adc-select__label--invalid">
            <adc-icon icon="signal:error" size="16"></adc-icon>
            </span>`
          : undefined}
        <slot name="label-text">${labelText}</slot>
        ${this.required ? html`<span class="adc-select__label--required"></span>` : undefined}
      </label>
      <div class="adc-select adc-select__input-wrapper" ?data-invalid="${invalid}">
        <select
          id="input"
          part="trigger"
          .autocomplete=${autocomplete}
          class="adc-select__input"
          name=${name}
          .disabled=${disabled}
          .required=${required}
          aria-invalid=${invalid ? "true" : "false"}
          aria-describedby=${ifDefined(!invalid ? undefined : "validity-message")}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @change=${this.handleInput}
          @invalid=${this.handleInvalid}
        >
          ${!placeholder || value
            ? undefined
            : html`
                <option class="adc-select--option" disabled selected value="">
                  ${placeholder}
                </option>
              `}
          ${this.renderItems(this)}
        </select>
        <div class="adc-select__arrow">
          <adc-icon icon="navigation:caret-down"></adc-icon>
        </div>
      </div>
      ${supplementalText}
    `;
  }

  /**
   * @private
   */
  static get selectorItem(): string {
    return "adc-select-item-group,adc-select-item";
  }

  /**
   * @private
   */
  static get selectorLeafItem(): string {
    return "adc-select-item";
  }

  /**
   * @private
   */
  static get eventSelect(): string {
    return "adc-select-item-selected";
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-select", Select);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-select": Select;
  }
}
