import "@aileron/icon";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { ICON_KIND } from "./defs";
import styles from "./list.styles";
import type { TemplateResult } from "lit";

/**
 * List item
 * @element adc-list-item
 * @slot - Default slot, expecting adc-list-item
 * @slot - nested - Used when a child is set as a nested list.
 */
export class ListItem extends LitElement {
  /**
   * Display an icon if the list item is a `success`, `error`, and nothing when
   * `default`.
   * @type {"success"|"error"|"default"}
   */
  @property({ type: String, reflect: false }) kind = ICON_KIND.DEFAULT;

  /**
   * Determine if the list item has a nested list.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) nested = false;

  /**
   * @private
   */
  private _hasNestedChild = false;

  /**
   * Sets the private `_hasNestedChild` property. Forces
   * the re-rendering of the component.
   * @private
   */
  private _handleSlotChangeNested({ target }: Event) {
    this._hasNestedChild = (target as HTMLSlotElement).assignedNodes().length > 0;
    this.requestUpdate();
  }

  /**
   * Sets the prop `nested` to true if the parent element is a nested selector.
   * Also sets the role for a11y.
   */
  connectedCallback(): void {
    this.toggleAttribute(
      "nested",
      !!this.closest((this.constructor as typeof ListItem).selectorNestedList)
    );
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "listitem");
    }
    super.connectedCallback();
  }

  render(): TemplateResult {
    const { _hasNestedChild: hasNestedChild, _handleSlotChangeNested: handleSlotChangeNested } =
      this;
    return html`
      <adc-icon icon="signal:checkmark" class="icon-success"></adc-icon>
      <adc-icon icon="action:close" class="icon-error"></adc-icon>
      <slot></slot>
      <div ?hidden="${!hasNestedChild}" class="adc-list-item__nested-child">
        <slot name="nested" @slotchange="${handleSlotChangeNested}"></slot>
      </div>
    `;
  }

  /**
   * @private
   */
  static get selectorNestedList(): string {
    return 'adc-ordered-list[slot="nested"],adc-unordered-list[slot="nested"]';
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-list-item", ListItem);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-list-item": ListItem;
  }
}
