/* eslint-disable lit-a11y/click-events-have-key-events */
import { animateTo, stopAnimations } from "@adc/internal/animate";
import { emit, waitForEvent } from "@adc/internal/event";
import { Modal } from "@adc/internal/modal";
import { lockBodyScrolling, unlockBodyScrolling } from "@adc/internal/scroll";
import { HasSlotController } from "@adc/internal/slot";
import { watch } from "@adc/internal/watch";
import { getAnimation, setDefaultAnimation } from "@adc/utilities/animation-registry";
import "@aileron/button-icon";
import { html, LitElement } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import styles from "./dialog.styles";

/**
 * Dialog
 * @element adc-dialog
 * @fires adc-request-close - fires when the dialog is requested to close.
 * @fires adc-show - fires when the dialog is shown.
 * @fires adc-after-show - fires after the dialog is shown.
 * @fires adc-hide - fires when the dialog is hidden.
 * @fires adc-after-hide - fires after the dialog is hidden.
 * @fires adc-initial-focus - fires when the dialog is shown and focus is set.
 * @part [base, overlay, panel, body, footer, base:close-button__base] - css part attributes provided for overriding.
 * @attr {string} [label-text] - The text-content of the heading, could also be
 * the `<span slot="label" />` content.
 * @attr {boolean} open - Whether the dialog is open.
 * @attr {boolean} [no-close-button] - Whether to show the close button.
 * @attr {string} variant - Controls the size of the dialog.
 * @slot - text content slot (default)
 * @slot label - This is a slot for the text in the header.
 * @slot footer - This is a slot for content in the footer, namely buttons.
 */
export class Dialog extends LitElement {
  @query(".dialog") dialog: HTMLElement;
  @query(".dialog__panel") panel: HTMLElement;
  @query(".dialog__overlay") overlay: HTMLElement;

  private readonly hasSlotController = new HasSlotController(this, "footer", "label");
  private modal: Modal;
  private originalTrigger: HTMLElement | null;

  /**
   * `true` if the dialog should be open.
   */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * Text content that passes to the h2 element.
   * @attr {string} [label-text]
   */
  @property({ attribute: "label-text" }) labelText: string;

  /**
   * `true` if the dialog should not have a close icon button.
   * @attr {boolean} [no-close-button]
   */
  @property({ type: Boolean, attribute: "no-close-button", reflect: true }) noCloseButton = false;

  /**
   * Handles the size of the dialog.
   * @type {"message"|"fullscreen"}
   */
  @property() variant: "message" | "fullscreen" = "message";

  /**
   * Instantiates the modal and adds tab-index to the main dialog.
   */
  connectedCallback() {
    super.connectedCallback();

    this.modal = new Modal(this);
    this.tabIndex = -1;
  }

  /**
   * Toggles the dialog open/closed. If opened, initializes the modal, and
   * adds a style to lock body scrolling.
   */
  firstUpdated() {
    this.dialog.hidden = !this.open;

    if (this.open) {
      this.modal.activate();

      lockBodyScrolling(this);
    }
  }

  /**
   * Removes the styles for locking body scrolling.
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();

    unlockBodyScrolling(this);
  }

  /**
   * Handles the action for showing the dialog.
   * @returns {Promise<void>}|undefined
   */
  async show() {
    if (this.open) {
      return undefined;
    }

    this.open = true;
    return waitForEvent(this, "adc-after-show");
  }

  /**
   * Handles the action for hiding the dialog.
   * @returns {Promise<void>}|undefined
   */
  async hide() {
    if (!this.open) {
      return undefined;
    }

    this.open = false;

    return waitForEvent(this, "adc-after-hide");
  }

  /**
   * Handles setting focus to the panel when the dialog is shown.
   * @param options - standard focus options,
   * https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/FocusEvent
   */
  focus(options?: FocusOptions) {
    this.panel.focus(options);
  }

  /**
   * Handles the action for closing the dialog, triggers `hide()` on success.
   * @fires adc-request-close - fires when the dialog is requested to close.
   * @param source "close-button" | "keyboard" | "overlay" - the source of the close event.
   * @returns
   */
  private requestClose(source: "close-button" | "keyboard" | "overlay") {
    const adcRequestClose = emit(this, "adc-request-close", {
      cancelable: true,
      detail: { source }
    });

    if (adcRequestClose.defaultPrevented) {
      const animation = getAnimation(this, "dialog.denyClose");
      animateTo(this.panel, animation.keyframes, animation.options);
      return;
    }

    this.hide();
  }

  /**
   * Handles the action for closing the dialog when the "Escape" key is pressed.
   * @param event - keyboard event for key detection
   */
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.stopPropagation();
      this.requestClose("keyboard");
    }
  }

  /**
   * Handles functionality when the open variable is updated. When the
   * dialog is opened, add events for focusin, keydown and keyup. Locks the body
   * scrolling behavior. If autofocus is set, focus that element or the panel if not.
   *
   * TODO: When using JAWS with the Firefox browser, the dialog is not focused when it is shown. Ref #200
   *
   * @fires adc-show - fires when the dialog is shown.
   * @fires adc-after-show - fires after the dialog is shown.
   * @fires adc-hide - fires when the dialog is hidden.
   * @fires adc-after-hide - fires after the dialog is hidden.
   * @fires adc-initial-focus - fires when the dialog is shown and focus is set.
   */
  @watch("open", { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.open) {
      emit(this, "adc-show");
      this.originalTrigger = document.activeElement as HTMLElement;
      this.modal.activate();

      lockBodyScrolling(this);

      const autoFocusTarget = this.querySelector<HTMLElement>("[autofocus]");
      if (autoFocusTarget) {
        autoFocusTarget.removeAttribute("autofocus");
      }

      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
      this.dialog.hidden = false;

      requestAnimationFrame(() => {
        const adcInitialFocus = emit(this, "adc-initial-focus", { cancelable: true });

        if (!adcInitialFocus.defaultPrevented) {
          if (autoFocusTarget) {
            (autoFocusTarget as HTMLInputElement).focus({ preventScroll: true });
          } else {
            this.focus({ preventScroll: true });
          }
        }

        if (autoFocusTarget) {
          autoFocusTarget.setAttribute("autofocus", "");
        }
      });

      const panelAnimation = getAnimation(this, "dialog.show");
      const overlayAnimation = getAnimation(this, "dialog.overlay.show");

      await Promise.all([
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
      ]);

      emit(this, "adc-after-show");
    } else {
      emit(this, "adc-hide");
      this.modal.deactivate();

      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
      const panelAnimation = getAnimation(this, "dialog.hide");
      const overlayAnimation = getAnimation(this, "dialog.overlay.hide");

      await Promise.all([
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
      ]);

      this.dialog.hidden = true;

      unlockBodyScrolling(this);

      const trigger = this.originalTrigger;
      if (typeof trigger?.focus === "function") {
        setTimeout(() => trigger.focus());
      }

      emit(this, "adc-after-hide");
    }
  }

  /**
   * Renders the full dialog and overlay components.
   * @returns {TemplateResult} - the template for the dialog.
   */
  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          dialog: true,
          "dialog--open": this.open,
          "dialog--has-footer": this.hasSlotController.test("footer")
        })}
        @keydown=${this.handleKeyDown}
      >
        <div
          part="overlay"
          class="dialog__overlay"
          @click=${() => this.requestClose("overlay")}
          tabindex="-1"
        ></div>
        <div
          part="panel"
          class=${classMap({
            dialog__panel: true,
            "dialog__panel--fullscreen": this.variant === "fullscreen"
          })}
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? "false" : "true"}
          aria-label=${ifDefined(this.labelText ? this.labelText : undefined)}
          aria-labelledby=${ifDefined(!this.labelText ? "title" : undefined)}
          tabindex="0"
        >
          ${this.labelText
            ? html` <div part="header" class="dialog__header">
                <h2 part="title" class="dialog__title" id="title">
                  <slot name="label"> ${this.labelText.length > 0 ? this.labelText : ""} </slot>
                </h2>
                ${!this.noCloseButton
                  ? html`<adc-button-icon
                      exportparts="button-icon: close-button"
                      class="dialog__close"
                      kind="ghost"
                      label-text="Close Dialog"
                      icon="action:close"
                      @click=${() => this.requestClose("close-button")}
                    >
                    </adc-button-icon>`
                  : ""}
              </div>`
            : ""}
          <div part="body" class="dialog__body" tabindex="0">
            <slot></slot>
          </div>
          <div part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }

  static styles = styles;
}

/**
 * Sets the animation keyframes, easing and duration for the showing the dialog.
 * @function getDefaultAnimation
 */
setDefaultAnimation("dialog.show", {
  keyframes: [
    { opacity: 0, transform: "scale(0.8)" },
    { opacity: 1, transform: "scale(1)" }
  ],
  options: {
    duration: 250,
    easing: "ease"
  }
});

/**
 * Sets the animation keyframes, easing and duration for the hiding the dialog.
 * @function getDefaultAnimation
 */
setDefaultAnimation("dialog.hide", {
  keyframes: [
    { opacity: 1, transform: "scale(1)" },
    { opacity: 0, transform: "scale(0.8)" }
  ],
  options: {
    duration: 250,
    easing: "ease"
  }
});

/**
 * Sets the animation keyframes, easing and duration for the denying close of the dialog.
 * @function getDefaultAnimation
 */
setDefaultAnimation("dialog.denyClose", {
  keyframes: [{ transform: "scale(1)" }, { transform: "scale(1.02)" }, { transform: "scale(1)" }],
  options: {
    duration: 250
  }
});

/**
 * Sets the animation keyframes, easing and duration for the showing the dialog overlay.
 * @function getDefaultAnimation
 */
setDefaultAnimation("dialog.overlay.show", {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: {
    duration: 250
  }
});

/**
 * Sets the animation keyframes, easing and duration for the hiding the dialog overlay.
 * @function getDefaultAnimation
 */
setDefaultAnimation("dialog.overlay.hide", {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: {
    duration: 250
  }
});

try {
  customElements.define("adc-dialog", Dialog);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-dialog": Dialog;
  }
}
