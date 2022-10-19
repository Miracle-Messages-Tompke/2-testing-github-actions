import { emit } from "@adc/internal/event";
import { HostListenerMixin } from "@adc/shared/src/HostListener";
import "@aileron/button";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import type { TemplateResult } from "lit";

/**
 * Overflow
 * @element adc-overflow
 * @slot - Default slot for overflow body content
 * @fires adc-overflow-close - listens for a close event.
 * @fires adc-overflow-open - listens for a close event.
 * @attr {Boolean} [disabled] - Disabled the buttons
 * @attr {Boolean} [hasReadLessButton] - Adds or Removes the "Read Less" button to the component
 * @attr {Boolean} [open] - Open state of the component
 * @attr {String} [readMoreButtonText] - "Read More" button text
 * @attr {String} [readLessButtonText] - "Read Less" button text
 */

export class Overflow extends HostListenerMixin(LitElement) {
  /**
   * Disabled the buttons
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Adds or Removes the "Read Less" button to the component
   * @type {boolean}
   */
  @property({ type: Boolean }) hasReadLessButton = false;

  /**
   * "Read More" button text
   * @type {string}
   */
  @property({ reflect: true }) readMoreButtonText = "Read More";

  /**
   * "Read Less" button text
   * @type {string}
   */
  @property({ reflect: true }) readLessButtonText = "Read Less";

  /**
   * Open state of the component
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) open = false;

  private handleToggleOpen() {
    if (this.open) {
      emit(this, "adc-overflow-close");
    } else {
      emit(this, "adc-overflow-open");
    }
    this.open = !this.open;
  }

  private getButtonText() {
    return this.open ? this.readLessButtonText : this.readMoreButtonText;
  }

  private shouldDisplayExtraContent() {
    // TODO this is extraneous currently but could be replaced with an event
    // observer
    return this.open;
  }

  private shouldDisplayToggleButton() {
    if (this.hasReadLessButton || !this.open) {
      return true;
    }
    return false;
  }

  _getToggleButton(): TemplateResult {
    return html`
      <adc-button ?disabled=${this.disabled} @click="${this.handleToggleOpen}">
        ${this.getButtonText()}
      </adc-button>
    `;
  }

  _getContent(): TemplateResult {
    return html` <div class="overflow-content">
      <slot></slot>
    </div>`;
  }

  render(): TemplateResult {
    return html`
      ${this.shouldDisplayExtraContent() ? this._getContent() : ""}
      ${this.shouldDisplayToggleButton() ? this._getToggleButton() : ""}
    `;
  }
}

try {
  customElements.define("adc-overflow", Overflow);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-overflow": Overflow;
  }
}
