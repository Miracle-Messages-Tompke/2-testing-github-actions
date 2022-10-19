/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable lit-a11y/anchor-has-content */
/* eslint-disable lit-a11y/anchor-is-valid */

import { HostListener, HostListenerMixin } from "@adc/shared/src/HostListener";
import { html, LitElement } from "lit";
import { property, query } from "lit/decorators.js";
import styles from "./action-drawer.styles";
import { ACTIONDRAWER_POSITION } from "./defs";
import type { PropertyValues, TemplateResult } from "lit";

const PRECEDING = Node.DOCUMENT_POSITION_PRECEDING || Node.DOCUMENT_POSITION_CONTAINS;
const FOLLOWING = Node.DOCUMENT_POSITION_FOLLOWING || Node.DOCUMENT_POSITION_CONTAINED_BY;

/**
 * Tries to focus on the given elements and bails out if one of them is
 * successful.
 * @param elems The elements.
 * @param reverse `true` to go through the list in reverse order.
 * @returns `true` if one of the attempts is successful, `false` otherwise.
 */
function tryFocusElems(elems: NodeListOf<HTMLElement>, reverse = false) {
  if (!reverse) {
    for (let i = 0; i < elems.length; ++i) {
      const elem = elems[i];
      elem.focus();

      if (elem.ownerDocument?.activeElement === elem) {
        return true;
      }
    }
  } else {
    for (let i = elems.length - 1; i >= 0; --i) {
      const elem = elems[i];
      elem.focus();

      if (elem.ownerDocument?.activeElement === elem) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Action Drawer.
 * @element adc-action-drawer
 * @csspart dialog The dialog.
 * @fires adc-action-drawer-beingclosed
 *   The custom event fired before this modal is being closed upon a user
 * gesture. Cancellation of this event stops the user-initiated action of
 * closing this modal.
 * @fires adc-action-drawer-closed - The custom event fired after this modal is
 * closed upon a user gesture.
 */
export class ActionDrawer extends HostListenerMixin(LitElement) {
  /**
   * The element that had focus before this modal gets open.
   */
  private _launcher: Element | null = null;

  /**
   * Node to track focus going outside of modal content.
   */
  @query("#start-sentinel") private readonly _startSentinelNode!: HTMLAnchorElement;

  /**
   * Node to track focus going outside of modal content.
   */
  @query("#end-sentinel") private readonly _endSentinelNode!: HTMLAnchorElement;

  /**
   * Handles `click` event on this element.
   * @param event The event.
   */
  @HostListener("click")
  // @ts-expect-error - HostListener is not called on the host element.
  private readonly _handleClick = (event: MouseEvent) => {
    if (
      !this.transactional &&
      this.shadowRoot &&
      event.composedPath().indexOf(this.shadowRoot) < 0
    ) {
      this._handleUserInitiatedClose(event.target);
    }
  };

  /**
   * Handles `blur` event on this element.
   * @param event The event.
   */
  @HostListener("shadowRoot:focusout")
  // @ts-expect-error - HostListener is not called on the host element.
  private readonly _handleBlur = async ({ target, relatedTarget }: FocusEvent) => {
    const oldContains = target !== this && this.contains(target as Node);
    const currentContains =
      relatedTarget !== this &&
      (this.contains(relatedTarget as Node) ||
        (this.shadowRoot?.contains(relatedTarget as Node) &&
          relatedTarget !== (this._endSentinelNode as Node)));

    // Performs focus wrapping if _all_ of the following is met:
    // * This modal is open
    // * The viewport still has focus
    // * Modal body used to have focus but no longer has focus
    const { selectorTabbable: selectorTabbableForActionDrawer } = this
      .constructor as typeof ActionDrawer;
    if (this.open && relatedTarget && oldContains && !currentContains) {
      const comparisonResult = (target as Node).compareDocumentPosition(relatedTarget as Node);
      if (relatedTarget === this._startSentinelNode || (comparisonResult && PRECEDING)) {
        await (this.constructor as typeof ActionDrawer)._delay();
        if (
          !tryFocusElems(this.querySelectorAll(selectorTabbableForActionDrawer), true) &&
          relatedTarget !== this
        ) {
          this.focus();
        }
      } else if (relatedTarget === this._endSentinelNode || (comparisonResult && FOLLOWING)) {
        await (this.constructor as typeof ActionDrawer)._delay();
        if (!tryFocusElems(this.querySelectorAll(selectorTabbableForActionDrawer))) {
          this.focus();
        }
      }
    }
  };

  @HostListener("document:keydown")
  // @ts-expect-error - HostListener is not called on the host element.
  private readonly _handleKeydown = ({ key, target }: KeyboardEvent) => {
    if (key === "Esc" || key === "Escape") {
      this._handleUserInitiatedClose(target);
    }
  };

  /**
   * Handles `click` event on the modal container.
   * @param event The event.
   */
  private _handleClickContainer(event: MouseEvent) {
    if (
      (event.target as Element).matches(
        (this.constructor as typeof ActionDrawer).selectorCloseButton
      )
    ) {
      this._handleUserInitiatedClose(event.target);
    }
  }

  /**
   * Handles user-initiated close request of this modal.
   * @param triggeredBy The element that triggered this close request.
   */
  private _handleUserInitiatedClose(triggerBy: EventTarget | null) {
    if (this.open) {
      const init = {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: { triggerBy }
      };

      if (
        this.dispatchEvent(
          new CustomEvent((this.constructor as typeof ActionDrawer).eventBeforeClose, init)
        )
      ) {
        this.open = false;
        this.dispatchEvent(
          new CustomEvent((this.constructor as typeof ActionDrawer).eventClose, init)
        );
      }
    }
  }

  /**
   * `true` if the modal should be open.
   */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * `true` if the modal should be transactional.
   */
  @property({ type: Boolean, reflect: true }) transactional = false;

  /**
   * position of the action drawer on screen.
   */
  @property({ reflect: true, attribute: "drawer-position" })
  drawerPosition = ACTIONDRAWER_POSITION.LEFT;

  render(): TemplateResult {
    const { drawerPosition } = this;
    return html`
      ${drawerPosition === ACTIONDRAWER_POSITION.RIGHT
        ? html`
            <a
              id="start-sentinel"
              class="adc--visually-hidden"
              href="javascript:void 0"
              role="navigation"
            ></a>
            <div
              part="dialog"
              class="adc-action-drawer__container--right"
              role="dialog"
              tabindex="-1"
              @click=${this._handleClickContainer}
            >
              <slot></slot>
            </div>
            <a
              id="end-sentinel"
              class="adc--visually-hidden"
              href="javascript:void 0"
              role="navigation"
            ></a>
          `
        : html`
            <a
              id="start-sentinel"
              class="adc--visually-hidden"
              href="javascript:void 0"
              role="navigation"
            ></a>
            <div
              part="dialog"
              class="adc-action-drawer__container"
              role="dialog"
              tabindex="-1"
              @click=${this._handleClickContainer}
            >
              <slot></slot>
            </div>
            <a
              id="end-sentinel"
              class="adc--visually-hidden"
              href="javascript:void 0"
              role="navigation"
            ></a>
          `}
    `;
  }

  async updated(changedProperties: PropertyValues): Promise<void> {
    if (changedProperties.has("open")) {
      if (this.open) {
        this._launcher = this.ownerDocument?.activeElement;

        const primaryFocusNode = this.querySelector(
          (this.constructor as typeof ActionDrawer).selectorPrimaryFocus
        );
        await (this.constructor as typeof ActionDrawer)._delay();

        if (primaryFocusNode) {
          (primaryFocusNode as HTMLElement).focus();
        } else if (
          !tryFocusElems(
            this.querySelectorAll((this.constructor as typeof ActionDrawer).selectorTabbable),
            true
          )
        ) {
          this.focus();
        } else if (this._launcher && typeof (this._launcher as HTMLElement).focus === "function") {
          (this._launcher as HTMLElement).focus();
          this._launcher = null;
        }
      }
    }
  }

  /**
   * @param ms The number of milliseconds.
   * @returns A promise that is resolves after the given milliseconds.
   */
  private static _delay(ms = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  /**
   * A selector selecting buttons that should close this modal.
   */
  static get selectorCloseButton(): string {
    return "[data-action-drawer-close],adc-action-drawer-close-button";
  }

  /**
   * A selector selecting tabbable nodes.
   */
  static get selectorTabbable(): string {
    return 'a[href],button:not([disabled]):not([tabindex="-1"]),*[tabindex]:not([tabindex="-1"]),adc-action-drawer,adc-action-drawer-close-button,adc-button';
  }

  /**
   * A selector selecting the nodes that should be focused when modal gets open.
   */
  static get selectorPrimaryFocus(): string {
    return '[data-action-drawer-primary-focus],adc-action-drawer-footer adc-footer__button[kind="primary"]';
  }

  /**
   * The name of the custom event fired before this modal is being closed upon a
   * user gesture. Cancellation of this event stops the user-initiated action of
   * closing this modal.
   */
  static get eventBeforeClose(): string {
    return "adc-action-drawer-beingclosed";
  }

  /**
   * The name of the custom event fired after this modal is closed upon a user
   * gesture.
   */
  static get eventClose(): string {
    return "adc-action-drawer-closed";
  }

  /**
   * @private
   */
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  };

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-action-drawer", ActionDrawer);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-action-drawer": ActionDrawer;
  }
}
