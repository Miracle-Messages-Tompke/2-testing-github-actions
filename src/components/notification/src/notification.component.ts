import { emit } from "@adc/internal/event";
import "@aileron/button";
import "@aileron/button-icon";
import "@aileron/divider";
import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { Common } from "./common.component";
import { notificationStyles } from "./notification.styles";
import type { TemplateResult } from "lit";

/**
 * Notification
 * @element adc-notification
 * @fires adc-expand - listens for an expand event on the tooltip.
 * @fires adc-collapse - listens for a collapse event on the tooltip.
 * @fires adc-close - listens for a close event on the tooltip.
 * @slot - Default slot for text body content
 * @slot - link - slot for anchor tags
 * @slot - title -  slot to set the header title text
 * @attr {string} [title] - Header Title for the Notification Component
 * @attr {string} [kind] - determines the style of the notification component
 * @attr {Boolean} [can-close] - Gives the ability to close and remove the notification from the dom
 * @attr {Boolean} [fullwidth] - Gives the notification full width styling
 * @attr {Boolean} [is-collapsible] - Gives collapse/expand functionality
 */
export class Notification extends Common {
  /**
   * Sets whether the notification should take up the full viewport width.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) fullwidth = false;

  /**
   * The boolean responsible for opening or closing the content collapse/expand wrapper
   * @type {Boolean}
   * @private
   */
  @state() open = false;

  /**
   * Gives collapse/expand functionality
   * @attr {boolean} [is-collapsible]
   * @type {boolean}
   */
  @property({ reflect: true, type: Boolean, attribute: "is-collapsible"})
  isCollapsible = false;

  _renderFooter(): TemplateResult {
    return html`
      <adc-divider spacing="16" class="adc-notification__divider" dashed></adc-divider>
      ${this._renderFooterButtons()}
    `;
  }

  _renderText(): TemplateResult {
    return html`
      <div
      class=${classMap({
            "adc-notification__expand-wrapper": true,
            "adc-notification__no-footer": !this.isCollapsible
          })}
      >
        <div class="adc-notification__text-wrapper">
          <slot></slot>
          <slot name="link"></slot>
        </div>
        ${this.isCollapsible ?
            this._renderFooter()
          :
          ''
        }
      </div>
    `;
  }

  _renderExpand(): TemplateResult {
    return html`
      <adc-button-icon
        size="sm"
        id="collapse-expand"
        aria-label=${this.open ? "collapse" : "expand"}
        labelText=${this.open ? "collapse" : "expand"}
        icon="medium:chevron-down"
        @click=${this._handleOpen}
        kind="ghost"
        class="adc-notification__close"
      ></adc-button-icon>
    `;
  }

  _renderFooterButtons(): TemplateResult {
    return html`<div class="adc-notification__footer-buttons">
      ${this.canClose
        ? html`<adc-button
            kind="ghost"
            type="button"
            @click=${this._handleClose}
            id="dismiss-button"
            size="sm"
          >
            ${this.closeLabel}
          </adc-button>`
        : ""}

      <adc-button
        kind="secondary"
        type="button"
        @click=${this._handleOpen}
        id="collapse-button"
        size="sm"
      >
        Collapse
      </adc-button>
    </div>`;
  }

  render(): TemplateResult {
    return html`
      ${this._renderIcon()}
      <div
        ?open=${this.isCollapsible ? this.open : this.hasSlotController.test("link") || this.hasSlotController.test("[default]")}
        class="adc-notification__content-wrapper">
        <div
          class=${classMap({
            "adc-notification__title-wrapper": true,
            "adc-notification__has-content": this.hasSlotController.test("[default]")
          })}
        >
          ${this._renderTitle()}
          ${this.isCollapsible
            ? this._renderExpand()
            : this._renderClose()}
        </div>
        ${this.hasSlotController.test("link") || this.hasSlotController.test("[default]")
          ? this._renderText()
          : ""}
      </div>
    `;
  }

  /**
   * Whenever the expand/collapse button is clicked, the content is collapsed
   * in the DOM.
   */
  _handleOpen() {
    if (this.open) {
      emit(this, "adc-collapse");
    } else {
      emit(this, "adc-expand");
    }
    this.open = !this.open;
  }

  /**
   * @private
   */
  static styles = notificationStyles;
}

try {
  customElements.define("adc-notification", Notification);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-notification": Notification;
  }
}
