/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable lit-a11y/anchor-has-content */
/* eslint-disable lit-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { HostListener, HostListenerMixin } from "@adc/shared/src/HostListener";
import { html, LitElement } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { MODAL_SIZE } from "./defs";
import styles from "./modal.styles";
import type { PropertyValues, TemplateResult } from "lit";

const PRECEDING = Node.DOCUMENT_POSITION_PRECEDING || Node.DOCUMENT_POSITION_CONTAINS;
const FOLLOWING = Node.DOCUMENT_POSITION_FOLLOWING || Node.DOCUMENT_POSITION_CONTAINED_BY;

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
 * Modal
 * @element adc-modal
 * @slot - Default slot
 * @fires adc-modal-closed
 * @fires adc-modal-before-closed
 */
export class Modal extends HostListenerMixin(LitElement) {
  /**
   * @private
   */
  private _launcher: Element | null = null;

  /**
   * Beginning anchor for trapping the focus
   * @private
   */
  @query("#start-sentinel") private readonly _startSentinelNode!: HTMLAnchorElement;

  /**
   * Ending anchor for trapping the focus
   * @private
   */
  @query("#end-sentinel") private readonly _endSentinelNode!: HTMLAnchorElement;

  /**
   * Handles the close of the modal whenever the user clicks outside of the
   * modal.
   * @private
   * @listens click
   */
  @HostListener("click")
  // @ts-expect-error - HostListener not called in file
  private readonly _handleClick = (event: MouseEvent) => {
    if (this.shadowRoot && event.composedPath().indexOf(this.shadowRoot) < 0) {
      this._handleUserInitiatedClose(event.target);
    }
  };

  /**
   * Sets focus on first DOM element that has 'data-modal-primary-focus' property
   * Overrides HTMLElement focus
   *
   * Example
   *
   * <button data-modal-primary-focus>Yes</button>
   *
   * @param options
   */
  async focus(options?: FocusOptions) {
    const { selectorPrimaryFocus: selectorPrimaryForModal } = this.constructor as typeof Modal;
    await (this.constructor as typeof Modal)._delay();
    if (!tryFocusElems(this.querySelectorAll(selectorPrimaryForModal))) {
      this.focus(options);
    }
  }

  /**
   * Trap focus inside the modal
   * @private
   * @listens shadowRoot:focusout
   */
  @HostListener("shadowRoot:focusout")
  // @ts-expect-error - HostListener not called in file
  private readonly _handleBlur = async ({ target, relatedTarget }: FocusEvent) => {
    const oldContains = target !== this && this.contains(target as Node);
    const currentContains =
      relatedTarget !== this &&
      (this.contains(relatedTarget as Node) ||
        (this.shadowRoot?.contains(relatedTarget as Node) &&
          relatedTarget !== (this._endSentinelNode as Node)));
    const { selectorTabbable: selectorTabbableForModal } = this.constructor as typeof Modal;

    if (this.open && relatedTarget && oldContains && !currentContains) {
      const comparisonResult = (target as Node).compareDocumentPosition(relatedTarget as Node);

      if (relatedTarget === this._startSentinelNode || (comparisonResult && PRECEDING)) {
        await (this.constructor as typeof Modal)._delay();

        if (
          !tryFocusElems(this.querySelectorAll(selectorTabbableForModal), true) &&
          relatedTarget !== this
        ) {
          this.focus();
        }
      } else if (relatedTarget === this._endSentinelNode || (comparisonResult && FOLLOWING)) {
        await (this.constructor as typeof Modal)._delay();

        if (!tryFocusElems(this.querySelectorAll(selectorTabbableForModal))) {
          this.focus();
        }
      }
    }
  };

  /**
   * Handles modal close event whenever Esc key is pressed.
   * @private
   * @listens document:keydown
   */
  @HostListener("document:keydown")
  // @ts-expect-error - HostListener not called in file
  private readonly _handleKeydown = ({ key, target }: KeyboardEvent) => {
    if (key === "Esc" || key === "Escape") {
      this._handleUserInitiatedClose(target);
    }
  };

  /**
   * @private
   */
  private _handleClickContainer(event: MouseEvent) {
    if ((event.target as Element).matches((this.constructor as typeof Modal).selectorCloseButton)) {
      this._handleUserInitiatedClose(event.target);
    }
  }

  /**
   * If the modal is open, fires the closing events and closes the modal.
   * @private
   * @fires adc-modal:before-close,adc-modal:close
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
          new CustomEvent((this.constructor as typeof Modal).eventBeforeClose, init)
        )
      ) {
        this.open = false;
        this.dispatchEvent(new CustomEvent((this.constructor as typeof Modal).eventClose, init));
      }
    }
  }

  /**
   * Adds a custom class for the modal container.
   * @type {string}
   */
  @property({ attribute: "container-class" }) containerClass = "";

  /**
   * Sets when the modal is open.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * Sets the size of the modal.
   * @type {"small"|""}
   */
  @property({ reflect: true }) size = MODAL_SIZE.REGULAR;

  render(): TemplateResult {
    const containerClass = this.containerClass
      .split(" ")
      .filter(Boolean)
      .reduce((acc, item) => ({ ...acc, [item]: true }), {});

    const classes = {
      [`adc-modal__container--${this.size}`]: this.size,
      ...containerClass
    };

    return html`
      <a
        id="start-sentinel"
        class="adc--visually-hidden"
        href="javascript:void 0"
        role="navigation"
      ></a>
      <div
        part="dialog"
        class="adc-modal__container ${classMap(classes)}"
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
    `;
  }

  /**
   * Whenever the modal is open, trap the focus inside the modal.
   */
  async updated(changedProperties: PropertyValues): Promise<void> {
    if (changedProperties.has("open")) {
      if (this.open) {
        this._launcher = this.ownerDocument?.activeElement;

        const primaryFocusNode = this.querySelector(
          (this.constructor as typeof Modal).selectorPrimaryFocus
        );
        await (this.constructor as typeof Modal)._delay();

        if (primaryFocusNode) {
          (primaryFocusNode as HTMLElement).focus();
        } else if (
          !tryFocusElems(
            this.querySelectorAll((this.constructor as typeof Modal).selectorTabbable),
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
   * @private
   */
  private static _delay(ms = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  /**
   * @private
   */
  static get selectorCloseButton(): string {
    return "[data-modal-close],adc-modal-close-button";
  }

  /**
   * @private
   * Comma delimited query string representing DOM elements in the modal that should get focus when tabbing
   */
  static get selectorTabbable(): string {
    return 'adc-text-input,adc-select,a[href],button:not([disabled]):not([tabindex="-1"]),*[tabindex]:not([tabindex="-1"]),adc-modal,adc-modal-close-button,adc-button';
  }

  /**
   * @private
   */
  static get selectorPrimaryFocus(): string {
    return '[data-modal-primary-focus],adc-modal-footer adc-footer__button[kind="primary"]';
  }

  /**
   * @private
   */
  static get eventBeforeClose(): string {
    return "adc-modal-beingclosed";
  }

  /**
   * @private
   */
  static get eventClose(): string {
    return "adc-modal-closed";
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-modal", Modal);
} catch (e) {
  // do nothing
}
declare global {
  interface HTMLElementTagNameMap {
    "adc-modal": Modal;
  }
}
