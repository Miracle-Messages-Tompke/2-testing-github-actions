import { InteractiveController } from "@adc/internal/interactive";
import "@aileron/button";
import "@aileron/button-icon";
import "@aileron/divider";
import "@aileron/icon";
import { html } from "lit";
import { Common } from "./common.component";
import { inlineNotificationStyles } from "./notification.styles";
import type { TemplateResult } from "lit";

/**
 * InlineNotification
 * @element adc-inline-notification
 * @slot -  title -  slot to set the header title text
 * @attr {string} [title] - Header Title for the Notification Component
 * @attr {string} [kind] - determines the style of the notification component
 * @attr {string} [variant] - Gives the inline notification transparent styling if variant set to "ghost"
 * @attr {Boolean} [can-close] - Gives the ability to close and remove the notification from the dom
 */
export class InlineNotification extends Common {
  // @ts-expect-error interactiveController needs to be defined
  private readonly interactiveController = new InteractiveController(this);

  render(): TemplateResult {
    return html`${this._renderIcon()} ${this._renderTitle()} ${this._renderClose()}`;
  }

  /**
   * @private
   */
  static styles = inlineNotificationStyles;
}

try {
  customElements.define("adc-inline-notification", InlineNotification);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-inline-notification": Notification;
  }
}
