import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { FocusVisiblePolyfillMixin } from "../focus-visible/focus-visible";
import type { PropertyValues } from "lit";

export type DisableableElement = HTMLElement & { disabled?: boolean };

export class Focusable extends FocusVisiblePolyfillMixin(LitElement) {
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) autofocus = false;
  @property({ type: Number })
  get tabIndex(): number {
    if (this.focusElement === this) {
      const tabindex = this.hasAttribute("tabindex")
        ? parseFloat(this.getAttribute("tabindex")!)
        : NaN;

      return !isNaN(tabindex) ? tabindex : -1;
    }

    const tabIndexAttribute = parseFloat(
      this.hasAttribute("tabindex") ? this.getAttribute("tabindex")! || "0" : "0"
    );

    if (this.disabled || tabIndexAttribute < 0) {
      return -1;
    }

    if (!this.focusElement) {
      return tabIndexAttribute;
    }

    return this.focusElement.tabIndex;
  }

  set tabIndex(tabIndex: number) {
    if (this.manipulatingTabindex) {
      this.manipulatingTabindex = false;

      return;
    }

    if (this.focusElement === this) {
      if (tabIndex !== this.tabIndex) {
        this._tabIndex = tabIndex;
        const tabindex = this.disabled ? "-1" : `${tabIndex}`;
        this.setAttribute("tabindex", tabindex);
      }

      return;
    }

    if (tabIndex === -1) {
      this.addEventListener("pointerdown", this.onPointerdownManagementOfTabIndex);
    } else {
      this.manipulatingTabindex = true;
      this.removeEventListener("pointerdown", this.onPointerdownManagementOfTabIndex);
    }

    if (tabIndex === -1 || this.disabled) {
      this.setAttribute("tabindex", "-1");
      this.removeAttribute("focusable");

      if (tabIndex !== -1) {
        this.manageFocusElementTabindex(tabIndex);
      }

      return;
    }

    this.setAttribute("focusable", "");
    if (this.hasAttribute("tabindex")) {
      this.removeAttribute("tabindex");
    } else {
      this.manipulatingTabindex = false;
    }

    this.manageFocusElementTabindex(tabIndex);
  }

  private _tabIndex = 0;

  private onPointerdownManagementOfTabIndex(): void {
    if (this.tabIndex === -1) {
      this.tabIndex = 0;
      this.focus({ preventScroll: true });
    }
  }

  private async manageFocusElementTabindex(tabIndex: number): Promise<void> {
    if (!this.focusElement) {
      await this.updateComplete;
    }

    if (tabIndex === null) {
      this.focusElement.removeAttribute("tabindex");
    } else {
      this.focusElement.tabIndex = tabIndex;
    }
  }

  private manipulatingTabindex = false;

  get focusElement(): DisableableElement {
    return this;
  }

  constructor() {
    super();
  }

  focus(options?: FocusOptions): void {
    if (this.disabled || !this.focusElement) {
      return;
    }

    if (this.focusElement !== this) {
      this.focusElement.focus(options);
    } else {
      HTMLElement.prototype.focus.apply(this, [options]);
    }
  }

  blur(): void {
    const focusElement = this.focusElement || this;

    if (focusElement !== this) {
      focusElement.blur();
    } else {
      HTMLElement.prototype.blur.apply(this);
    }
  }

  click(): void {
    if (this.disabled) {
      return;
    }

    const focusElement = this.focusElement || this;
    if (focusElement !== this) {
      focusElement.click();
    } else {
      HTMLElement.prototype.click.apply(this);
    }
  }

  protected manageAutoFocus(): void {
    if (this.autofocus) {
      this.dispatchEvent(new KeyboardEvent("keydown", { code: "Tab" }));
      this.focusElement.focus();
    }
  }

  protected firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);

    this.manageAutoFocus();

    if (!this.hasAttribute("tabindex") || this.getAttribute("tabindex") !== "-1") {
      this.setAttribute("focusable", "");
    }
  }

  protected update(changedProperties: PropertyValues): void {
    if (changedProperties.has("disabled")) {
      this.handleDisabledChanged(this.disabled, changedProperties.get("disabled") as boolean);
    }

    super.update(changedProperties);
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has("disabled") && this.disabled) {
      this.blur();
    }
  }

  private async handleDisabledChanged(disabled: boolean, oldDisabled: boolean): Promise<void> {
    const canSetDisabled = (): boolean =>
      this.focusElement !== this && typeof this.focusElement.disabled !== "undefined";

    if (disabled) {
      this.manipulatingTabindex = true;
      this.setAttribute("tabindex", "-1");
      await this.updateComplete;

      if (canSetDisabled()) {
        this.focusElement.disabled = true;
      } else {
        this.setAttribute("aria-disabled", "true");
      }
    } else if (oldDisabled) {
      this.manipulatingTabindex = true;

      if (this.focusElement === this) {
        this.setAttribute("tabindex", `${this._tabIndex}`);
      } else {
        this.removeAttribute("tabindex");
      }
      await this.updateComplete;

      if (canSetDisabled()) {
        this.focusElement.disabled = false;
      } else {
        this.removeAttribute("aria-disabled");
      }
    }
  }
}
