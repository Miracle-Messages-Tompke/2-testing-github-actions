import { emit } from "@adc/internal/event";
import { Float } from "@adc/internal/float";
import "@aileron/button-icon";
import { html, LitElement } from "lit";
import { property, queryAsync } from "lit/decorators.js";
import styles from "./tooltip.styles";
import type { Placement } from "@floating-ui/dom";
import type { PropertyValues } from "lit";

const enterEvents = ["pointerenter", "focus"];
const leaveEvents = ["pointerleave", "blur", "keydown", "click"];

/**
 * Tooltip
 * @element adc-tooltip
 * @fires adc-close-tooltip - listens for a click event on the tooltip close button.
 * @fires adc-show - listens for a show event on the tooltip.
 * @fires adc-hide - listens for a hide event on the tooltip.
 * @fires adc-finish-hide - listens for a finish hide event on the tooltip. Is called after the transition effects are completed.
 * @attr {string} [heading] - The text-content of the heading.
 * @attr {string} [placement] - The position of the tooltip in relation to the element its tied to.
 * @attr {string} [type] - Determines the type of tooltip to render ("default", "label").
 * @attr {Boolean} [toggle] - A switch to set the tooltip to close and open upon click.
 * @slot default - The text content slot (default)
 */
export class Tooltip extends LitElement {
  /**
   * @private
   */
  static styles = styles;

  /**
   * @private
   */
  private float: Float;

  constructor() {
    super();
    // Finish hiding at end of animation
    this.addEventListener("transitionend", this.finishHide);
  }

  async connectedCallback() {
    super.connectedCallback();

    this.style.display = "none";
    // Hide Tooltip at first render
    this.hide();

    const arrow = await this._arrow;
    this.target ??= this.previousElementSibling;

    // Setup float with elements
    this.float = new Float(this, this._target, arrow);
  }

  /**
   * Arrow element for tooltip
   * @private
   */
  @queryAsync("#arrow") private readonly _arrow!: HTMLElement;

  /**
   * @private
   */
  _target: Element | null = null;

  /**
   * The placement position for the tooltip. ("top", "bottom", "left", "right")
   * @attr {string} [placement]
   * @type {Placement}
   */
  @property({ reflect: true })
  placement: Placement = "bottom";

  /**
   * A switch to set the tooltip to close and open upon click.
   * @attr {boolean} [toggle]
   * @type {boolean}
   */
  @property({ reflect: true, type: Boolean })
  toggle = false;

  /**
   * The Heading Text for the Tooltip.
   * @attr {string} [heading]
   * @type {string}
   */
  @property({ reflect: true, type: String })
  heading = "";

  /**
   * Determines the type of tooltip to render. ("", "label")
   * @attr {string} [type]
   * @type {string}
   */
  @property({ reflect: true, type: String })
  type = "";

  /**
   * Boolean tied to the tooltip showing.
   * @private
   */
  @property({ reflect: true, type: Boolean })
  showing = false;

  /**
   * Function to show Tooltip
   * @private
   */
  show = () => {
    this.style.cssText = "";

    this.float.activate(this.placement);

    this.showing = true;
    emit(this, "adc-show");
  };

  /**
   * Function to hide Tooltip
   * @private
   */
  hide = () => {
    this.showing = false;
    emit(this, "adc-hide");
  };

  /**
   * Function to finish hiding tooltip after transition.
   * @private
   */
  finishHide = () => {
    if (!this.showing) {
      this.style.display = "none";
      emit(this, "adc-finish-hide");
    }
  };

  /**
   * @private
   */
  get target() {
    return this._target;
  }

  /**
   * @private
   */
  set target(target: Element | null) {
    if (this.toggle) {
      // Remove from old target
      if (this.target) {
        this.target.removeEventListener("click", this.show);
      }

      // Add to new target
      if (target) {
        target.addEventListener("click", this.show);
      }
    } else {
      // Remove events from existing target
      if (this.target) {
        enterEvents.forEach((name) => this.target!.removeEventListener(name, this.show));
        leaveEvents.forEach((name) => this.target!.removeEventListener(name, this.hide));
      }
      // Add events to new target
      if (target) {
        enterEvents.forEach((name) => target.addEventListener(name, this.show));
        leaveEvents.forEach((name) => target.addEventListener(name, this.hide));
      }
    }

    this._target = target;
  }

  handleClick() {
    this.hide();
    emit(this, "adc-close-tooltip");
  }

  render() {
    return html`
      ${this.type === "label"
        ? html`
            <span class="adc-tooltip--text-content">
              <slot></slot>
            </span>
            <div id="arrow"></div>
          `
        : html`
            <div class="adc-tooltip--header-container">
              ${this.heading && html`<span class="adc-tooltip--header">${this.heading}</span>`}
              ${this.toggle
                ? html`
                    <adc-button-icon
                      size="sm"
                      icon="action:close"
                      outlined
                      @click=${this.handleClick}
                    ></adc-button-icon>
                  `
                : html``}
            </div>
            <span class="adc-tooltip--text-content">
              <slot></slot>
            </span>

            <div id="arrow"></div>
          `}
    `;
  }

  async updated(changedProperties: PropertyValues) {
    const arrow = await this._arrow;
    this.target ??= this.previousElementSibling;
    if (changedProperties.has("type") || changedProperties.has("toggle")) {
      this.float = new Float(this, this._target, arrow);
    }
  }
}

try {
  customElements.define("adc-tooltip", Tooltip);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-tooltip": Tooltip;
  }
}
