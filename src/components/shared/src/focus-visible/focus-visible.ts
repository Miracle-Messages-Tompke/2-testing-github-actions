/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
import "focus-visible";
import type { Constructor } from "../helpers";

declare global {
  interface Window {
    applyFocusVisiblePolyfill?: (scope: Document | ShadowRoot) => void;
  }
}

export interface OptionalLifecycleCallbacks {
  connectedCallback?: () => void;
  disconnectedCallback?: () => void;
  manageAutoFocus?: () => void;
}

export type MixableBaseClass = HTMLElement & OptionalLifecycleCallbacks;

export type EndPolyfillCoordinationCallback = () => void;

try {
  document.body.querySelector(":focus-visible");
} catch (error) {}

export const FocusVisiblePolyfillMixin = <T extends Constructor<MixableBaseClass>>(
  SuperClass: T
): T => {
  class FocusVisibleCoordinator extends SuperClass {
    constructor(...args: any[]) {
      super(...args);
    }
  }

  return FocusVisibleCoordinator;
};
