import { getByUrl } from "@adc/internal/get-by-url";
import "innersvg-polyfill";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import styles from "./icon.styles";

/**
 * Icon
 * @element adc-icon
 */
export class Icon extends LitElement {
  /**
   * @private
   */
  static styles = styles;

  @property() icon!: string;
  @property({ type: Number, converter(value: string) {
    const allowedSizes = ["16", "24", "32", "64"];
    const getClosest = (counts, goal) => {
      return counts.reduce((prev, curr) => Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    };

    if (!allowedSizes.includes(value)) {
      return getClosest(allowedSizes, value);
    }

    return value;
  }}) size = 16;
  @property({ type: Boolean }) filled = false;
  @property({ type: Boolean }) outlined = false;
  @property({ attribute: false }) svg!: any;

  async fetchIcon(icon) {
    const category: string = icon.split(":")[0];
    const name: string = icon.split(":")[1];
    const data: any = await getByUrl(`https://cdn.aa.com/aileron/icons/${category}${this.outlined ? '/outlined/' : this.filled ? '/filled/' : '/'}${name}.svg`);
    const dom = new DOMParser().parseFromString(data, "text/html");
    const svg = dom.body.querySelector("svg");
    svg?.setAttribute("width", this.size.toString());
    svg?.setAttribute("height", this.size.toString());
    svg?.setAttribute("fill", "currentColor");
    svg?.setAttribute("aria-hidden", "true");

    return svg;
  }

  async firstUpdated() {
    this.svg = await this.fetchIcon(this.icon);
  }

  render() {
    return html`${this.svg}`;
  }
}

try {
  customElements.define("adc-icon", Icon);
} catch (error) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-icon": Icon;
  }
}
