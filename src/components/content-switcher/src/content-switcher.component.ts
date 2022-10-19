/* eslint-disable array-callback-return */
import { Focusable } from "@adc/shared/src/Focusable";
import { getActiveElement } from "@adc/shared/src/getActiveElement";
import { HostListener, HostListenerMixin } from "@adc/shared/src/HostListener";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import styles from "./content-switcher.styles";
import type { ContentSwitchPanel } from "./content-switch-panel.component";
import type { ContentSwitch } from "./content-switch.component";
import type { PropertyValues, TemplateResult } from "lit";

/**
 * Sets the available arrow keys to move focus to the next/previous
 */
const availableArrowsByDirection = {
  horizontal: ["ArrowLeft", "ArrowRight"]
};

/**
 * Content switcher
 * @element adc-content-switcher
 * @slot - Default slot.
 * @slot - adc-content-switch-panel - Slot for the content switch panel.
 */
export class ContentSwitcher extends HostListenerMixin(Focusable) {
  /**
   * Sets the ability to move focus to the next/previous element by arrow keys
   * @type {boolean}
   */
  @property({ type: Boolean }) auto = false;

  /**
   * Sets disabled to the entire content switcher
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Sets the property for the direction of the content switcher, only
   * horizontal is supported currently.
   * @type {string}
   */
  @property({ type: String, reflect: false }) direction = "horizontal";

  /**
   * Sets the label for the content switcher
   * @type {string}
   */
  @property() label = "";

  /**
   * Sets the selected content switch and panel. Forces a render.
   * @type {string}
   */
  @property({ reflect: true })
  get selected(): string {
    return this._selected;
  }

  set selected(value: string) {
    const oldValue = this.selected;

    if (value === oldValue) {
      return;
    }

    this._selected = value;
    this.shouldUpdateCheckedState();
    this.requestUpdate("selected", oldValue);
  }

  @HostListener("window:resize")
  // @ts-expect-error - HostListener not used for calls
  private readonly _handleResize = async () => {
    const { contentSwitch } = this.constructor as typeof ContentSwitcher;
    const _arr: number[] = [];

    await this.updateComplete;

    if (!this._width) {
      this.querySelectorAll(contentSwitch).forEach((el: Element) => {
        _arr.push(el.getBoundingClientRect().width);
      });

      this._width = Math.max(..._arr);
    }

    if (window.matchMedia("(min-width:672px").matches) {
      this.querySelectorAll(contentSwitch).forEach(
        (el: any) => (el.style.width = `${this._width}px`)
      );
    } else {
      this.querySelectorAll(contentSwitch).forEach((el: any) => (el.style.width = "50%"));
    }
  };

  /**
   * @private
   */
  private _selected = "";

  /**
   * @private
   */
  private _width!: number;

  /**
   * @private
   */
  private contentSwitcher: ContentSwitch[] = [];

  get focusElement(): ContentSwitch | this {
    const focusElement = this.contentSwitcher.find(
      (s) => !s.disabled && (s.selected || s.value === this.selected)
    );

    if (focusElement) {
      return focusElement;
    }

    const fallback = this.contentSwitcher.find((s) => !s.disabled);

    return fallback || this;
  }

  protected manageAutoFocus(): void {
    const contentSwitcher = [...(this.children as any)] as ContentSwitch[];
    const contentSwitchUpdateCompletes = contentSwitcher.map((s) => {
      if (typeof s.updateComplete !== "undefined") {
        return s.updateComplete;
      }

      return Promise.resolve();
    });

    Promise.all<unknown>(contentSwitchUpdateCompletes).then(() => super.manageAutoFocus());
  }

  protected managePanels({ target }: Event & { target: HTMLSlotElement }): void {
    const panels = target.assignedElements() as unknown as ContentSwitchPanel[];

    panels.map((panel) => {
      const { value, id } = panel;
      const contentSwitch = this.querySelector(`[role="content-switch"][value="${value}"]`);

      if (contentSwitch) {
        contentSwitch.setAttribute("aria-controls", id);
        panel.setAttribute("aria-labelledby", contentSwitch.id);
      }

      panel.selected = value === this.selected;
    });
  }

  protected render(): TemplateResult {
    return html`
      <div
        aria-label=${ifDefined(this.label ? this.label : undefined)}
        @click=${this.onClick}
        @keydown=${this.onKeyDown}
        @mousedown=${this.manageFocusinType}
        @focusin=${this.startListeningToKeyboard}
        class="adc-content-switcher adc-content-switcher--default"
        id="content-switch-list"
        role="tablist"
      >
        <slot @slotchange=${this.onSlotChange}></slot>
      </div>
      <slot name="adc-content-switch-panel" @slotchange=${this.managePanels}></slot>
    `;
  }

  protected firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);

    const selectedChild = this.querySelector("[selected]") as unknown as ContentSwitch;
    if (selectedChild) {
      this.selectTarget(selectedChild);
    }
  }

  protected updated(changes: PropertyValues<this>): void {
    if (changes.has("selected")) {
      if (changes.get("selected")) {
        const previous = this.querySelector(
          `[role="tabpanel"][value="${changes.get("selected")}"]`
        ) as unknown as ContentSwitchPanel;

        if (previous) {
          previous.selected = false;
        }
      }

      const next = this.querySelector(
        `[role="tabpanel"][value="${this.selected}"]`
      ) as unknown as ContentSwitchPanel;

      if (next) {
        next.selected = true;
      }
    }

    if (changes.has("disabled")) {
      const contentSwitches = this.querySelectorAll('[role="tab"]');

      if (this.disabled) {
        this.setAttribute("aria-disabled", "true");
        contentSwitches.forEach((s) => s.setAttribute("disabled", "true"));
      } else {
        this.removeAttribute("aria-disabled");
        contentSwitches.forEach((s) => s.removeAttribute("disabled"));
      }
    }

    super.updated(changes);
  }

  private async _determineSwitchWidth() {
    const { contentSwitch } = this.constructor as typeof ContentSwitcher;
    const _arr: number[] = [];

    await this.updateComplete;

    this.querySelectorAll(contentSwitch).forEach((el: Element) => {
      _arr.push(el.getBoundingClientRect().width);
    });

    if (!this._width) {
      this.querySelectorAll(contentSwitch).forEach((el: Element) => {
        _arr.push(el.getBoundingClientRect().width);
      });

      this._width = Math.max(..._arr);
    }

    if (window.matchMedia("(min-width:672px").matches) {
      this.querySelectorAll(contentSwitch).forEach(
        (el: any) => (el.style.width = `${this._width}px`)
      );
    } else {
      this.querySelectorAll(contentSwitch).forEach((el: any) => (el.style.width = "50%"));
    }
  }

  /**
   * @private
   */
  private shouldSetFocusVisible = false;

  /**
   * @private
   */
  private readonly manageFocusinType = (): void => {
    if (this.shouldSetFocusVisible) {
      return;
    }

    const handleFocus = (): void => {
      this.shouldSetFocusVisible = false;
      this.removeEventListener("focusin", handleFocus);
    };

    this.addEventListener("focusin", handleFocus);
  };

  startListeningToKeyboard(): void {
    this.addEventListener("keydown", this.handleKeydown);
    this.shouldSetFocusVisible = true;

    const selected = this.querySelector("[selected]") as unknown as ContentSwitch;

    if (selected) {
      selected.tabIndex = -1;
    }

    const stopListeningToKeyboard = (): void => {
      this.removeEventListener("keydown", this.handleKeydown);
      this.shouldSetFocusVisible = false;

      const selectedHtmlElement = this.querySelector("[selected]") as unknown as ContentSwitch;

      if (selectedHtmlElement) {
        selected.tabIndex = 0;
      }

      this.removeEventListener("focusout", stopListeningToKeyboard);
    };

    this.addEventListener("focusout", stopListeningToKeyboard);
  }

  handleKeydown(event: KeyboardEvent): void {
    const { code } = event;
    const availableArrows = [...availableArrowsByDirection[this.direction]];
    if (!availableArrows.includes(code)) {
      return;
    }

    event.preventDefault();
    const currentFocusedContentSwitcher = getActiveElement(this) as unknown as ContentSwitch;
    let currentFocusedContentSwitcherIndex = this.contentSwitcher.indexOf(
      currentFocusedContentSwitcher
    );
    currentFocusedContentSwitcherIndex += code === availableArrows[0] ? -1 : 1;

    const nextContentSwitch =
      this.contentSwitcher[
        (currentFocusedContentSwitcherIndex + this.contentSwitcher.length) %
          this.contentSwitcher.length
      ];
    nextContentSwitch.focus();
    if (this.auto) {
      this.selected = nextContentSwitch.value;
    }
  }

  /**
   * @private
   */
  private readonly onClick = (event: Event): void => {
    const target = event.target as unknown as ContentSwitch;

    if (this.disabled || target.disabled) {
      return;
    }

    this.selectTarget(target);
    if (this.shouldSetFocusVisible && event.composedPath()[0] !== this) {
      this.dispatchEvent(
        new KeyboardEvent("keydown", {
          code: "Tab"
        })
      );

      target.focus();
    }
  };

  /**
   * @private
   */
  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (event.code === "Enter" || event.code === "Space") {
      event.preventDefault();
      const target = event.target as HTMLElement;

      if (target) {
        this.selectTarget(target);
      }
    }
  };

  /**
   * @private
   */
  private selectTarget(target: HTMLElement): void {
    const value = target.getAttribute("value");

    if (value) {
      const selected = this.selected;
      this.selected = value;

      const applyDefault = this.dispatchEvent(
        new Event("change", {
          cancelable: true
        })
      );

      if (!applyDefault) {
        this.selected = selected;
      }
    }
  }

  /**
   * @private
   */
  private onSlotChange(): void {
    this.contentSwitcher = [...(this.querySelectorAll('[role="tab"]') as any)] as ContentSwitch[];
    this.shouldUpdateCheckedState();
  }

  /**
   * @private
   */
  private shouldUpdateCheckedState(): void {
    this.contentSwitchChangeResolver();
    this.contentSwitchChangePromise = new Promise(
      (res) => (this.contentSwitchChangeResolver = res)
    );

    setTimeout(this.updateCheckedState);
  }

  /**
   * @private
   */
  private readonly updateCheckedState = (): void => {
    if (!this.contentSwitcher.length) {
      this.contentSwitcher = [...(this.querySelectorAll('[role="tab"]') as any)] as ContentSwitch[];
    }

    this.contentSwitcher.forEach((element) => {
      element.removeAttribute("selected");
    });

    if (this.selected) {
      const currentlyChecked = this.contentSwitcher.find((el) => el.value === this.selected);

      if (currentlyChecked) {
        currentlyChecked.selected = true;
      } else {
        this.selected = "";
      }
    } else {
      const firstContentSwitcher = this.contentSwitcher[0];

      if (firstContentSwitcher) {
        firstContentSwitcher.setAttribute("tabindex", "0");
      }
    }

    this.contentSwitchChangeResolver();
  };

  connectedCallback() {
    super.connectedCallback();

    this._determineSwitchWidth();
  }

  /**
   * @private
   */
  static get contentSwitch(): string {
    return "adc-content-switch";
  }

  /**
   * @private
   */
  private contentSwitchChangePromise = Promise.resolve();

  /**
   * @private
   */
  private contentSwitchChangeResolver: () => void = function () {
    return;
  };

  protected async getUpdateComplete(): Promise<boolean> {
    const complete = await super.getUpdateComplete();
    await this.contentSwitchChangePromise;

    return complete;
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-content-switcher", ContentSwitcher);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-content-switcher": ContentSwitcher;
  }
}
