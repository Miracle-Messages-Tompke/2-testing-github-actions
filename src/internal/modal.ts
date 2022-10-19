import { getTabbableBoundary } from "./tabbable";

let activeModals: HTMLElement[] = [];

export class Modal {
  element: HTMLElement;
  tabDirection: "forward" | "backward" = "forward";

  constructor(element: HTMLElement) {
    this.element = element;
    this.handleFocusIn = this.handleFocusIn.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  activate() {
    activeModals.push(this.element);
    this.element.addEventListener("focusin", this.handleFocusIn);
    this.element.addEventListener("keydown", this.handleKeyDown);
    this.element.addEventListener("keyup", this.handleKeyUp);
  }

  deactivate() {
    activeModals = activeModals.filter(modal => modal !== this.element);
    document.removeEventListener("focusin", this.handleFocusIn);
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  isActive() {
    return activeModals[activeModals.length - 1] === this.element;
  }

  checkFocus() {
    if (this.isActive()) {
      if (!this.element.matches(":focus-within")) {
        const { start, end } = getTabbableBoundary(this.element);
        const target = this.tabDirection === "forward" ? start : end;

        if (typeof target?.focus === "function") {
          target.focus({ preventScroll: true });
        }
      }
    }
  }

  handleFocusIn() {
    this.checkFocus();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Tab" && event.shiftKey) {
      this.tabDirection = "backward";
    }

    requestAnimationFrame(() => this.checkFocus());
  }

  handleKeyUp() {
    this.tabDirection = "forward";
  }
}
