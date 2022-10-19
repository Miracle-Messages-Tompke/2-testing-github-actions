/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable array-callback-return */
import { Focusable } from "@adc/shared/src/Focusable";
import { getActiveElement } from "@adc/shared/src/getActiveElement";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import styles from "./tabs.styles";
import type { TabPanel } from "./tab-panel.component";
import type { Tab } from "./tab.component";
import type { PropertyValues, TemplateResult } from "lit";

const availableArrowsByDirection = {
  horizontal: ["ArrowLeft", "ArrowRight"]
};

const noSelectionStyle = "transform: translateX(0px) scaleX(0) scaleY(0)";

/**
 * Tabs
 * @element adc-tabs
 * @slot - Default content slot, used for the tabs.
 * @slot adc-tab-panel - Default content slot, used for the tab panels.
 */
export class Tabs extends Focusable {
  /**
   * Will switch to the next tab without having to select it first.
   * @type {boolean}
   */
  @property({ type: Boolean }) auto = false;

  /**
   * Sets all tabs to disabled.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Set the tab direction, horizontal is only supported for now.
   * @type {string}
   */
  @property({ type: String, reflect: false }) direction = "horizontal";

  /**
   * Sets the aria-label to define the group of tabs.
   * @type {string}
   */
  @property() label = "";

  /**
   * Sets the animation style for the selection indicator.
   * @type {string}
   */
  @property({ attribute: false }) selectionIndicatorStyle = noSelectionStyle;

  /**
   * Sets if the tabs should animate
   * @type {boolean}
   */
  @property({ attribute: false }) shouldAnimate = false;

  /**
   * Sets the selected tab and tab-panel
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

  /**
   * @private
   */
  private _selected = "";

  /**
   * @private
   */
  private tabs: Tab[] = [];

  get focusElement(): Tab | this {
    const focusElement = this.tabs.find(
      (tab) => !tab.disabled && (tab.selected || tab.value === this.selected)
    );

    if (focusElement) {
      return focusElement;
    }

    const fallback = this.tabs.find((tab) => !tab.disabled);

    return fallback || this;
  }

  manageAutoFocus(): void {
    const tabs = [...(this.children as any)] as unknown as Tab[];
    const tabUpdateCompletes = tabs.map((tab) => {
      if (typeof tab.updateComplete !== "undefined") {
        return tab.updateComplete;
      }

      return Promise.resolve();
    });

    Promise.all<unknown>(tabUpdateCompletes).then(() => super.manageAutoFocus());
  }

  managePanels({ target }: Event & { target: HTMLSlotElement }): void {
    const panels = target.assignedElements() as unknown as TabPanel[];

    panels.map((panel) => {
      const { value, id } = panel;
      const tab = this.querySelector(`[role="tab"][value="${value}"]`);

      if (tab) {
        tab.setAttribute("aria-controls", id);
        panel.setAttribute("aria-labelledby", tab.id);
      }

      panel.selected = value === this.selected;
    });
  }

  render(): TemplateResult {
    return html`
      <div
        aria-label=${ifDefined(this.label ? this.label : undefined)}
        @click=${this.onClick}
        @keydown=${this.onKeyDown}
        @mousedown=${this.manageFocusinType}
        @focusin=${this.startListeningToKeyboard}
        class="adc-tabs adc-tabs--default"
        id="tab-list"
        role="tablist"
      >
        <slot @slotchange=${this.onSlotChange}></slot>
        <div
          id="selectedIndication"
          class=${ifDefined(
            this.shouldAnimate
              ? "adc-tabs__indicator"
              : "adc-tabs__indicator adc-tabs__indicator--first-position"
          )}
          style=${this.selectionIndicatorStyle}
          role="presentation"
        ></div>
      </div>
      <slot name="adc-tab-panel" @slotchange=${this.managePanels}></slot>
    `;
  }

  firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);

    const selectedChild = this.querySelector("[selected]") as unknown as Tab;
    if (selectedChild) {
      this.selectTarget(selectedChild);
    }
  }

  updated(changes: PropertyValues<this>): void {
    super.updated(changes);

    if (changes.has("selected")) {
      if (changes.get("selected")) {
        const previous = this.querySelector(
          `[role="tabpanel"][value="${changes.get("selected")}"]`
        ) as unknown as TabPanel;

        if (previous) {
          previous.selected = false;
        }
      }

      const next = this.querySelector(
        `[role="tabpanel"][value="${this.selected}"]`
      ) as unknown as TabPanel;

      if (next) {
        next.selected = true;
      }
    }

    if (changes.has("disabled")) {
      if (this.disabled) {
        this.setAttribute("aria-disabled", "true");
      } else {
        this.removeAttribute("aria-disabled");
      }
    }

    if (!this.shouldAnimate && typeof changes.get("shouldAnimate") !== "undefined") {
      this.shouldAnimate = true;
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

    const selected = this.querySelector("[selected]") as unknown as Tab;

    if (selected) {
      selected.tabIndex = -1;
    }

    const stopListeningToKeyboard = (): void => {
      this.removeEventListener("keydown", this.handleKeydown);
      this.shouldSetFocusVisible = false;

      const selected = this.querySelector("[selected]") as unknown as Tab;

      if (selected) {
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
    const currentFocusedTab = getActiveElement(this) as unknown as Tab;
    let currentFocusedTabIndex = this.tabs.indexOf(currentFocusedTab);
    currentFocusedTabIndex += code === availableArrows[0] ? -1 : 1;

    const nextTab = this.tabs[(currentFocusedTabIndex + this.tabs.length) % this.tabs.length];
    nextTab.focus();
    if (this.auto) {
      this.selected = nextTab.value;
    }
  }

  /**
   * When a tab is clicked, if disabled do nothing, otherwise
   * set focus and select the tab.
   * @private
   * @param event
   */
  private readonly onClick = (event: Event): void => {
    const target = event.target as unknown as Tab;

    if (this.disabled || target.disabled) {
      return;
    }

    this.shouldAnimate = true;
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
   * @param event
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
   * @param target
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
    this.tabs = [...(this.querySelectorAll('[role="tab"]') as any)] as unknown as Tab[];
    this.shouldUpdateCheckedState();
  }

  /**
   * @private
   */
  private shouldUpdateCheckedState(): void {
    this.tabChangeResolver();
    this.tabChangePromise = new Promise((res) => (this.tabChangeResolver = res));

    setTimeout(this.updateCheckedState);
  }

  /**
   * @private
   */
  private readonly updateCheckedState = (): void => {
    if (!this.tabs.length) {
      this.tabs = [...(this.querySelectorAll('[role="tab"]') as any)] as unknown as Tab[];
    }

    this.tabs.forEach((element) => {
      element.removeAttribute("selected");
    });

    if (this.selected) {
      const currentlyChecked = this.tabs.find((el) => el.value === this.selected);

      if (currentlyChecked) {
        currentlyChecked.selected = true;
      } else {
        this.selected = "";
      }
    } else {
      const firstTab = this.tabs[0];

      if (firstTab) {
        firstTab.setAttribute("tabindex", "0");
      }
    }

    this.updateSelectionIndicator();
    this.tabChangeResolver();
  };

  /**
   * Updates the position of the underline based on the selected tab.
   * @private
   * @returns {Promise<void>}
   */
  private readonly updateSelectionIndicator = async (): Promise<void> => {
    const selectedElement = this.tabs.find((el) => el.selected);

    if (!selectedElement) {
      this.selectionIndicatorStyle = noSelectionStyle;
      return;
    }

    await Promise.all([
      selectedElement.updateComplete,
      (document as any).fonts ? (document as any).fonts.ready : Promise.resolve()
    ]);

    const tabBoundingClientRect = selectedElement.getBoundingClientRect();
    const parentBoundingClientRect = this.getBoundingClientRect();

    if (this.direction === "horizontal") {
      const width = tabBoundingClientRect.width;
      const offset = tabBoundingClientRect.left - parentBoundingClientRect.left;

      this.selectionIndicatorStyle = `transform: translateX(${offset}px) scaleX(${width});`;
    } else {
      const height = tabBoundingClientRect.height;
      const offset = tabBoundingClientRect.top - parentBoundingClientRect.top;

      this.selectionIndicatorStyle = `transform: translateY(${offset}px) scaleY(${height});`;
    }
  };

  /**
   * @private
   */
  private tabChangePromise = Promise.resolve();

  /**
   * @private
   */
  private tabChangeResolver: () => void = function () {
    return;
  };

  async getUpdateComplete(): Promise<boolean> {
    const complete = await super.getUpdateComplete();
    await this.tabChangePromise;

    return complete;
  }

  connectedCallback(): void {
    super.connectedCallback();

    window.addEventListener("resize", this.updateSelectionIndicator);
    if ("fonts" in document) {
      (
        document as unknown as {
          fonts: {
            // eslint-disable-next-line no-unused-vars
            addEventListener: (name: string, callback: () => void) => void;
          };
        }
      ).fonts.addEventListener("loadingdone", this.updateSelectionIndicator);
    }
  }

  disconnectedCallback(): void {
    window.removeEventListener("resize", this.updateSelectionIndicator);

    if ("fonts" in document) {
      (
        document as unknown as {
          fonts: {
            // eslint-disable-next-line no-unused-vars
            removeEventListener: (name: string, callback: () => void) => void;
          };
        }
      ).fonts.removeEventListener("loadingdone", this.updateSelectionIndicator);
    }

    super.disconnectedCallback();
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-tabs", Tabs);
} catch (e) {
  // do nothing
}

declare global {
  interface Document {
    fonts?: { ready: Promise<void> };
  }

  interface HTMLElementTagNameMap {
    "adc-tabs": Tabs;
  }
}
