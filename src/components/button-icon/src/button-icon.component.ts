import { emit } from "@adc/internal/event";
import { FormSubmitController } from "@adc/internal/form";
import { InteractiveController } from "@adc/internal/interactive";
import { HasSlotController } from "@adc/internal/slot";
import "@aileron/icon";
import { html, LitElement } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./button-icon.styles";
import type { PropertyValues, TemplateResult } from "lit";

/**
 * Button Icon
 * @element adc-button-icon
 * @fires adc-click - listens for a click event on the button.
 * @fires adc-focus - listens for a focus event on the button.
 * @fires adc-blur - listens for a blur event on the button.
 * @attr {string} label-text - The text-content of the button, added as a slot that
 * is visually hidden.
 * @slot default - text content slot (default)
 */
export class ButtonIcon extends LitElement {
  /**
   * `true` if the button should have input focus when the page loads.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) autofocus = false;

  /**
   * `true` if the button should be disabled.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * The text-content of the button, added as a slot that is visually hidden.
   * @attr {string} [label-text]
   * @type {string}
   */
  @property({ attribute: "label-text" }) labelText = "";

  /**
   * Button kind.
   * @type {"primary"|"secondary"|"ghost"}
   */
  @property({ reflect: true }) kind: "primary" | "secondary" | "ghost" = "primary";

  /**
   * Button size.
   * @type {"sm"|"field"|""}
   */
  @property() size: "sm" | "field" | "" = "";

  /**
   * The default behavior of a `<button>`.
   * @type {"button" | "submit" | "reset" | "menu"}
   */
  @property({ reflect: true }) type: "button" | "submit" | "reset" | "menu" = "button";

  /**
   * The icon to display. eg. `"navigation:arrow-right"`
   * @type {string}
   */
  @property() icon: string;

  /**
   * Sets the icon as an outlined icon.
   * @type {boolean}
   */
  @property({ reflect: true, type: Boolean }) outlined = false;

  /**
   * Sets the icon as a filled icon.
   * @type {boolean}
   */
  @property({ reflect: true, type: Boolean }) filled = false;
  /**
   * @private
   */
  static styles = styles;

  /**
   * @private
   */
  @query("button") buttonNode!: HTMLButtonElement;

  // @ts-expect-error interactiveController needs to be defined
  private readonly interactiveController = new InteractiveController(this);

  // @ts-expect-error interactiveController needs to be defined
  private readonly hasSlotController = new HasSlotController(this);

  private readonly formSubmitController = new FormSubmitController(this, {
    form: (input: HTMLInputElement) => {
      if (input.hasAttribute("form")) {
        const doc = input.getRootNode() as Document | ShadowRoot;
        const formId = input.getAttribute("form")!;

        return doc.getElementById(formId) as HTMLFormElement;
      }

      return input.closest("form");
    }
  });

  @state() private hasFocus = false;

  click() {
    this.buttonNode.click();
  }

  focus(options?: FocusOptions) {
    this.buttonNode.focus(options);
  }

  blur() {
    this.buttonNode.blur();
  }

  handleBlur() {
    this.hasFocus = false;

    emit(this, "adc-blur");
  }

  handleFocus() {
    this.hasFocus = true;

    emit(this, "adc-focus");
  }

  /**
   * @fires click - listens for a click event on the button.
   */
  handleClick() {
    if (this.type === "submit") {
      this.formSubmitController.submit(this);
    }

    emit(this, "adc-click");
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has("disabled")) {
      if (this.disabled) {
        this.buttonNode.setAttribute("disabled", "disabled");
      } else {
        this.buttonNode.removeAttribute("disabled");
      }
    }
  }

  render(): TemplateResult {
    return html`
      <button
        id="button-icon"
        part="interactive button-icon"
        class=${classMap({
          "adc-button-icon": true,
          [`adc-button--${this.kind.toLowerCase()}`]: this.kind,
          "adc-button--sm": (this.size as string).includes("sm"),
          "adc-button--has-form": this.size === "field",
          "adc-button--disabled": this.disabled,
          "adc-button--has-focus": this.hasFocus
        })}
        ?autofocus=${this.autofocus}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? "true" : "false"}
        type=${this.type}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <adc-icon
          part="icon"
          class="adc-button-icon__icon"
          ?outlined=${this.outlined}
          ?filled=${this.filled}
          icon=${this.icon}
          size="24"
        ></adc-icon>
        <span class="sr-only">
          <slot>${this.labelText}</slot>
        </span>
      </button>
    `;
  }
}

try {
  customElements.define("adc-button-icon", ButtonIcon);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-button-icon": ButtonIcon;
  }
}
