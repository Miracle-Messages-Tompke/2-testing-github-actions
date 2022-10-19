import { emit } from "@adc/internal/event";
import { FocusMixin } from "@adc/shared/src/focus";
import { HostListenerMixin } from "@adc/shared/src/HostListener";
import "@aileron/icon";
import { html, LitElement } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import logo from "../assets/logo-flight-symbol";
import styles from "./loading.styles";
import type { TemplateResult } from "lit";

/**
 * Spinner indicating loading state.
 * @element adc-loading
 */
export class Loading extends HostListenerMixin(FocusMixin(LitElement)) {
  @state() protected hasFocus = false;
  @query(".adc-loading--label") textNode!: HTMLButtonElement;
  /**
   * The assistive text for the spinner icon.
   */
  @property({ attribute: "assistive-text" }) assistiveText = "Loading";

  /**
   * Spinner state.
   */
  @property() state = "";

  @property({ attribute: "label-text" }) labelText = "";

  focus(options?: FocusOptions): void {
    this.textNode.focus(options);
  }

  blur(): void {
    this.blur();
  }

  handleBlur(): void {
    this.hasFocus = false;

    emit(this, "adc-blur");
  }

  handleFocus(): void {
    this.hasFocus = true;

    emit(this, "adc-focus");
  }

  firstUpdated(): void {
    this.focus();
    this.parentElement!.style.position = "relative";
  }

  renderLoadingIcon(): TemplateResult {
    if (this.state === "active") {
      return html` <adc-icon icon="action:loader" size="32"></adc-icon> `;
    } else if (this.state === "success") {
      return html`
        <div class="adc-loading-success--icon">
          <adc-icon icon="signal:checkmark" outlined size="32"></adc-icon>
        </div>
      `;
    } else if (this.state === "error") {
      return html`
        <div class="adc-loading-error--icon">
          <adc-icon icon="signal:error" outlined size="32"></adc-icon>
        </div>
      `;
    }
    return html``;
  }

  renderLoadingLogo(): TemplateResult {
    return logo;
  }

  render(): TemplateResult {
    const classes = {
      "adc-loading--has-focus": this.hasFocus
    };

    return html`
      <div class="adc-loading__wrapper">
        <div class="adc-loading--logo">${this.renderLoadingLogo()}</div>
        <span
          class="adc-loading--label ${classMap(classes)}"
          tabindex="-1"
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          >${this.labelText}</span
        >
        <div class="adc-loading--active">${this.renderLoadingIcon()}</div>
      </div>
    `;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-loading", Loading);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-loading": Loading;
  }
}
