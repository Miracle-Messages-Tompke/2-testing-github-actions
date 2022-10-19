import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./card.styles";
import { CARD_ORIENTATION, CARD_SIZE } from "./defs";
import type { TemplateResult } from "lit";

/**
 * Card
 * @element adc-card
 * @slot - Default slot, used for the content of the card.
 * @slot media - slot used for media.
 */
export class Card extends LitElement {
  /**
   * Sets the elevation of the card, or removes it if the value is `0`.
   * @type {number}
   */
  @property({ type: Number }) elevation = 0;

  /**
   * Sets the size of the card.
   * @type {"lg" | ""}
   */
  @property() size = CARD_SIZE.REGULAR;

  /**
   * Sets the orientation of the card.
   * @type {"vertical" | "horizontal"}
   */
  @property({ reflect: true }) orientation = CARD_ORIENTATION.VERTICAL;

  render(): TemplateResult {
    const { elevation, orientation, size } = this;

    const classes = {
      "adc-card--outlined": !elevation,
      [`adc-card--elevated-${elevation}`]: elevation,
      [`adc-card--size-${size}`]: size,
      "adc-card--horizontal": orientation === CARD_ORIENTATION.HORIZONTAL
    };

    return html`<div id="card" class="adc-card ${classMap(classes)}">
      <slot name="media"></slot>
      <div class="adc-card__content">
        <slot></slot>
      </div>
    </div>`;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-card", Card);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-card": Card;
  }
}
