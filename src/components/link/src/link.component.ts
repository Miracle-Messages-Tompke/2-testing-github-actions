import "@aileron/icon";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { ICON_KIND } from "./defs";
import styles from "./link.styles";
import type { TemplateResult } from "lit";

/**
 * Link
 * @element adc-link
 * @slot - text for the link
 */
export class Link extends LitElement {
  /**
   * Determine what icon to show, if any
   * @type {"navigation:new-window" | "navigation:chevron-right" | ""}
   */
  @property({ reflect: true }) icon = ICON_KIND.EMPTY;

  /**
   * Href to pass to the html anchor element
   * @type {string}
   */
  @property() href = "";

  /**
   * Add hidden text for screen readers
   * @type {string}
   */
  @property({ reflect: true, attribute: "hidden-label-text" })
  hiddenLabelText = "";

  /**
   * Rel to pass to the html anchor element
   * @type {string}
   */
  @property({ reflect: false }) rel!: string;

  /**
   * Pass the string of target to the html anchor element
   * @type {"_blank" | "_self" | "_parent" | "_top" | undefined}
   */
  @property({ reflect: false }) target!: "_blank" | "_parent" | "_self" | "_top";

  /**
   * Set if this is used within a paragraph or not standalone
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) inline = false;

  renderIcon(): TemplateResult | undefined {
    return this.icon
      ? this.icon === "chevron"
        ? html`<div class="adc-link__chevron" aria-hidden="true">&raquo;</div>`
        : html`
            <div class="adc-link__icon">
              <adc-icon exportparts="icon" icon="navigation:${this.icon}" size="16"></adc-icon>
            </div>
          `
      : undefined;
  }

  renderHiddenText(text: string): TemplateResult | undefined {
    return text ? html`<span class="sr-only"> ${text} </span>` : undefined;
  }

  renderSlot(): TemplateResult {
    return html`
      <slot></slot>
      ${this.renderHiddenText(this.hiddenLabelText)} ${this.renderIcon()}
    `;
  }

  render(): TemplateResult {
    const classes = {
      "adc-link--inline": this.inline
    };

    return html`
      <a
        class="adc-link ${classMap(classes)}"
        href="${this.href}"
        part="anchor"
        rel=${ifDefined(this.rel)}
        target=${ifDefined(this.target)}
      >
        ${this.renderSlot()}
      </a>
    `;
  }

  /**
   * Determine if a link is external or not
   * @private
   * @param href
   * @returns boolean
   */
  private handleExternalHref(href: string) {
    const match = href.match(/^https?:\/\/(?!www.aa.com|aa.com)+/);

    return !!match;
  }

  /**
   * If there is an external link, add a target="_blank" and rel="noopener
   * noreferrer"
   */
  connectedCallback(): void {
    super.connectedCallback();

    if (this.href && this.handleExternalHref(this.href) && !this.target) {
      this.target = "_blank";
      this.rel = "noreferrer";
    }
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-link", Link);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-link": Link;
  }
}
