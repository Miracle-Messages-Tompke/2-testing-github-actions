import { Focusable } from "@adc/shared/src/Focusable";
import "@aileron/icon";
import { html } from "lit";
import { property } from "lit/decorators.js";
import styles from "./accordion.styles";
import { ACCORDION_POSITION } from "./defs";
import type { TemplateResult } from "lit";

/**
 * Accordion item.
 * @element adc-accordion-item
 * @fires adc-accordion-item-beingtoggled - Event fired when the item is being
 * opened or closed.
 * @fires adc-accordion-item-toggled - Event fired when the item is opened or
 * closed.
 * @slot - Default slot.
 * @slot label - Slot for the label-text.
 * @csspart content - The content of the item.
 * @csspart title - The title of the item.
 * @csspart expando - The expando of the item.
 * @csspart expando-icon - The expando icon of the item.
 */
export class AccordionItem extends Focusable {
  private _handleUserInitiatedToggle(open = !this.open) {
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        open
      }
    };

    if (
      this.dispatchEvent(
        new CustomEvent((this.constructor as typeof AccordionItem).eventBeforeToggle, init)
      )
    ) {
      if (!this.disabled) {
        this.open = open;
        this.dispatchEvent(
          new CustomEvent((this.constructor as typeof AccordionItem).eventToggle, init)
        );
      }
    }
  }

  private _handleClickExpando() {
    this._handleUserInitiatedToggle();
  }

  private readonly _handleKeydownExpando = ({ key }: KeyboardEvent) => {
    if (this.open && (key === "Esc" || key === "Escape")) {
      this._handleUserInitiatedToggle(false);
    }
  };

  /**
   * `true` if the accordion item should be disabled.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * `true` if the accordion item should be open.
   */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * The position of the label in relationship to the icon.
   * @type {"left"|"right"}
   */
  @property({ reflect: true, attribute: "label-position" })
  labelPosition = ACCORDION_POSITION.RIGHT;

  /**
   * The label text.
   */
  @property({ attribute: "label-text" }) labelText = "";

  connectedCallback(): void {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "listitem");
    }

    super.connectedCallback();
  }

  render(): TemplateResult {
    const { disabled, open, labelPosition, labelText, _handleClickExpando, _handleKeydownExpando } =
      this;

    return html` <button
        ?disabled="${disabled}"
        type="button"
        part="expando"
        class="adc-accordion__heading"
        aria-controls="content"
        aria-expanded=${open}
        @click="${_handleClickExpando}"
        @keydown="${_handleKeydownExpando}"
      >
        ${labelPosition === ACCORDION_POSITION.RIGHT
          ? html` <adc-icon
                icon="navigation:chevron-down"
                part="expando-icon"
                size="24"
                class="adc-accordion__icon"
              ></adc-icon>
              <span part="title" class="adc-accordion__title">
                <slot name="label">${labelText}</slot>
              </span>`
          : html`
              <span part="title" class="adc-accordion__title">
                <slot name="label">${labelText}</slot>
              </span>
              <adc-icon
                icon="navigation:chevron-down"
                part="expando-icon"
                size="24"
                class="adc-accordion__icon"
              ></adc-icon>
            `}
      </button>
      <div
        id="content"
        part="content"
        class="adc-accordion__content--wrapper"
        ?hidden=${!this.open}
      >
        <div class="adc-accordion__content">
          <slot></slot>
        </div>
      </div>`;
  }

  /**
   * The name of the custom event fired before this accordion item is being
   * toggled upon a user gesture. Cancellation of this event stops the
   * user-initiated action of toggling this accordion item.
   */
  static get eventBeforeToggle(): string {
    return "adc-accordion-item-beingtoggled";
  }

  /**
   * The name of the custom event fired after this accordion item is toggled
   * upon a user gesture.
   */
  static get eventToggle(): string {
    return "adc-accordion-item-toggled";
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-accordion-item", AccordionItem);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-accordion-item": AccordionItem;
  }
}
