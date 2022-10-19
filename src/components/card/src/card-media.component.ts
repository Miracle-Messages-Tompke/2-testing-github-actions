import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "./card.styles";
import { CARD_MEDIA_ASPECT_RATIO, CARD_ORIENTATION } from "./defs";
import type { Card } from "./card.component";
import type { TemplateResult } from "lit";

export class CardMedia extends LitElement {
  /**
   * Sets the orientation of the card.
   * @type {"vertical" | "horizontal"}
   */
  @property({ reflect: true }) orientation = CARD_ORIENTATION.VERTICAL;

  /**
   * Sets the aspect ratio of the media.
   * @type {"16-9" | "square"}
   */
  @property() ratio = CARD_MEDIA_ASPECT_RATIO.SIXTEEN_NINE;

  /**
   * Sets the source of the media.
   * @type {string}
   */
  @property() src = "";

  render(): TemplateResult {
    const { ratio, src } = this;

    const mediaStyles = {
      backgroundImage: src ? `url(${src})` : ""
    };

    const classes = {
      "adc-card__media--16-9": ratio === CARD_MEDIA_ASPECT_RATIO.SIXTEEN_NINE,
      "adc-card__media--square": ratio === CARD_MEDIA_ASPECT_RATIO.SQUARE
    };

    return html`<div
      id="card-media"
      class="adc-card__media ${classMap(classes)}"
      style=${styleMap(mediaStyles)}
    ></div>`;
  }

  connectedCallback(): void {
    const card = this.parentElement as Card;

    if (!this.hasAttribute("slot")) {
      this.setAttribute("slot", "media");
    }

    if (card.hasAttribute("orientation")) {
      this.orientation = card.orientation;
    }

    super.connectedCallback();
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-card-media", CardMedia);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-card-media": CardMedia;
  }
}
