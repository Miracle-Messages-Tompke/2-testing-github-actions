import { emit } from "@adc/internal/event";
import { HasSlotController } from "@adc/internal/slot";
import "@aileron/button-icon";
import "@aileron/icon";
import { LitElement, html } from "lit";
import {property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { NOTIFICATION_KIND } from "./defs";
import type { TemplateResult } from "lit";

const iconsOfKinds = {
  [NOTIFICATION_KIND.SUCCESS]: html`<adc-icon icon="signal:checkmark" outlined size="32"></adc-icon>`,
  [NOTIFICATION_KIND.INFO]: html`<adc-icon icon="signal:information" outlined size="32"></adc-icon>`,
  [NOTIFICATION_KIND.WARNING]: html`<adc-icon icon="signal:warning" outlined size="32"></adc-icon>`,
  [NOTIFICATION_KIND.ERROR]: html`<adc-icon icon="signal:error" outlined size="32"></adc-icon>`
};

/**
 * @slot - title -  slot to set the header title text
 * @fires adc-close - listens for a close event on the tooltip.
 * @attr {string} [title] - Header Title for the Notification Component
 * @attr {string} [kind] - determines the style of the notification component
 * @attr {Boolean} [can-close] - Gives the ability to close and remove the notification from the dom
 */
export class Common extends LitElement {
  /**
   * @private
   */
  readonly hasSlotController = new HasSlotController(this);

  /**
   * @private
   */
  static count = 0;

  /**
   * Sets the icon to be used with the notification.
   * @type {"success" | "information" | "warning" | "error"}
   */
  @property({ reflect: true }) kind = NOTIFICATION_KIND.INFO;

  /**
   * Sets the title heading for the notification.
   * @type {string}
   */
  @property() title!: string;

  /**
   * Toggle if the notification can be closed.
   * @type {boolean}
   */
  @property({ type: Boolean, attribute: "can-close" }) canClose = false;

  /**
   * Sets the aria-label for the close button.
   * @type {string}
   * @private
   */
  @state() closeLabel = "Dismiss";

  protected _renderTitle(): TemplateResult {
    return html`
        <div class="adc-notification__title"><slot name="title">${this.title}</slot></div>
    `;
  }

  protected _renderClose(): TemplateResult {
    return this.canClose ? html`
      <adc-button-icon
        size="sm"
        id="closeNotification"
        aria-label="${ifDefined(this.closeLabel)}"
        labelText="${ifDefined(this.closeLabel)}"
        icon="action:close"
        @click=${this._handleClose}
        kind="ghost"
        class="adc-notification__close"
      ></adc-button-icon>
  ` : html``;
  }

  protected _renderIcon(): TemplateResult {
    return html`<div class="adc-notification__icon">${iconsOfKinds[this.kind]}</div>`;
  }

  /**
   * Sets the role for a11y purposes. Also sets an id for the notification.
   */
  connectedCallback(): void {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "alert");
    }

    if (!this.hasAttribute("id")) {
      this.setAttribute("id", `adcNotification_${Common.count++}`);
    }
    super.connectedCallback();
  }

  /**
   * Whenever the close button is clicked, the notification is removed from the
   * DOM.
   */
  _handleClose(): void {
    emit(this, "adc-close");
    const notification = document.querySelector(`#${this.getAttribute("id")!}`);
    const parent = notification?.parentNode;

    (parent as Element).removeChild(notification!);
  }
}
