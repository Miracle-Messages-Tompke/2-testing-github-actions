import { emit } from "@adc/internal/event";
import { watch } from "@adc/internal/watch";
import "@aileron/icon";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./radio-button.styles";
import type { RadioButton } from "./radio-button.component";
import type { PropertyValues } from "lit";

const RADIO_CHILDREN = ["adc-radio-button"];

/**
 * Radio Button Group
 * @element adc-radio-group
 * @fires adc-radio-group-changed - Event fired when the checked state of the
 * radio button changes.
 * @slot - Default slot, takes `adc-radio-button` elements.
 * @slot - label-text - Default text label content.
 */
export class RadioGroup extends LitElement {
  /**
   * Sets required to the child radio buttons.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * Sets disabled to the child radio buttons.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Sets invalid based on child radio buttons.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /**
   * Positions the label text for the child radio buttons.
   * @type {"left"|"right"}
   */
  @property({ attribute: "label-position" })
  labelPosition: "left" | "right" = "right";

  /**
   * Sets the label text for the radio button group.
   * @type {string}
   */
  @property({ attribute: "label-text" }) labelText;

  /**
   * Sets the name for the children radio buttons.
   * @type {string}
   */
  @property() name;

  /**
   * Sets the value for the radio button collection.
   * @type {string}
   */
  @property({ reflect: true }) value: string;

  /**
   * Sets the orientation for the radio button children.
   * @type {"horizontal"|"vertical"}
   */
  @property({ reflect: true }) orientation: "horizontal" | "vertical" = "horizontal";

  /**
   * Sets the inputmode attribute on the native input element.
   * @type {string}
   */
  @property({ attribute: "validity-message" }) validityMessage = "";

  getAllRadios() {
    return [...this.querySelectorAll(RADIO_CHILDREN.join(","))].filter((el) => {
      return RADIO_CHILDREN.includes(el.tagName.toLowerCase());
    }) as RadioButton[];
  }

  handleRadioClick(event: MouseEvent) {
    const target = event.target as RadioButton;
    const checkedRadio = target.closest(
      RADIO_CHILDREN.map((selector) => `${selector}:not([disabled])`).join(",")
    );

    if (checkedRadio) {
      this.value = (checkedRadio as RadioButton).value;
      this.getAllRadios().forEach((radio) => {
        radio.checked = radio === checkedRadio;
        radio.input.tabIndex = radio === checkedRadio ? 0 : -1;
      });
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      const radios = this.getAllRadios().filter((radio) => !radio.disabled);
      const checkedRadio = radios.find((radio) => radio.checked) ?? radios[0];
      const incr = ["ArrowUp", "ArrowLeft"].includes(event.key) ? -1 : 1;

      let index = radios.indexOf(checkedRadio) + incr;

      if (index < 0) {
        index = radios.length - 1;
      }

      if (index > radios.length - 1) {
        index = 0;
      }

      this.getAllRadios().forEach((radio) => {
        radio.checked = false;
        radio.input.tabIndex = -1;
      });

      radios[index].focus();
      radios[index].checked = true;
      radios[index].input.tabIndex = 0;

      this.value = radios[index].value;

      event.preventDefault();
    }
  }

  handleSlotChange() {
    const radios = this.getAllRadios();
    const checkedRadio = radios.find((radio) => radio.checked);

    radios.forEach((radio) => {
      radio.checked = radio === checkedRadio || radio.value === this.value;
      radio.required = this.required;
      radio.name = this.name;
      radio.input.tabIndex = -1;
    });

    if (checkedRadio) {
      checkedRadio.input.tabIndex = 0;
    } else if (radios.length > 0) {
      radios[0].input.tabIndex = 0;
    }
  }

  @watch("value", { waitUntilFirstUpdate: true })
  handleValueChange() {
    const radios = this.getAllRadios();

    if (this.hasUpdated) {
      radios.forEach((radio) => {
        radio.checked = radio.value === this.value;
      });

      emit(this, "adc-radio-group-changed", { detail: { value: this.value } });
    }
  }

  @watch("disabled", { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    const radios = this.getAllRadios();

    if (this.hasUpdated) {
      radios.forEach((radio) => {
        radio.disabled = this.disabled;
      });
    }
  }

  @watch("orientation", { waitUntilFirstUpdate: true })
  handleOrientationChange() {
    const radios = this.getAllRadios();

    if (this.hasUpdated) {
      radios.forEach((radio) => {
        radio.orientation = this.orientation;
      });
    }
  }

  @watch("labelPosition", { waitUntilFirstUpdate: true })
  handleLabeLPositionChange() {
    const radios = this.getAllRadios();

    if (this.hasUpdated) {
      radios.forEach((radio) => {
        radio.labelPosition = this.labelPosition;
      });
    }
  }

  @watch("required", { waitUntilFirstUpdate: true })
  handleRequiredChange() {
    const radios = this.getAllRadios();

    if (this.hasUpdated) {
      radios.forEach((radio) => {
        radio.required = this.required;
      });
    }
  }

  async updated(changedProperties: PropertyValues) {
    await this.updateComplete;

    this.getAllRadios().forEach((radio) => {
      radio.invalid = false;
    });

    if (changedProperties.has("invalid")) {
      this.getAllRadios().forEach((radio) => {
        radio.invalid = this.invalid;
      });
    }
  }

  render() {
    const classes = {
      "adc-radio-group__label-text--required": this.required,
      "adc-radio-group__label-text--invalid": this.invalid
    };

    return html`
      <fieldset part="base" class="adc-radio-group">
        <legend part="label" class="adc-radio-group__label-text ${classMap(classes)}">
          ${this.invalid
            ? html`<adc-icon icon="signal:error" size="16" outlined class="adc-radio-group__icon-error"></adc-icon>`
            : undefined}
          <slot name="label-text">${this.labelText}</slot>
        </legend>
        <slot
          @click=${this.handleRadioClick}
          @keydown=${this.handleKeyDown}
          @slotchange=${this.handleSlotChange}
        ></slot>
        <div class="adc-radio-group--form-requirement" aria-live="polite">
          <slot name="validity-message"> ${this.validityMessage} </slot>
        </div>
      </fieldset>
    `;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-radio-group", RadioGroup);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-radio-group": RadioGroup;
  }
}
