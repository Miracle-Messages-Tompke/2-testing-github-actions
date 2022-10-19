/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument */
import type { Handle } from "./handle";
import type { Constructor } from "./helpers";

function on(element: Element, ...args: [any, (event: Event) => void]) {
  element.addEventListener(...args);
  return {
    release(): null {
      element.removeEventListener(...args);
      return null;
    }
  };
}

// eslint-disable-next-line func-style, @typescript-eslint/explicit-module-boundary-types
export const FormMixin = <T extends Constructor<HTMLElement>>(base: T) => {
  abstract class FormMixinImpl extends base {
    hFormdata: Handle | null = null;

    abstract handleFormdata(event: Event): void;

    connectedCallback() {
      const form = this.closestElement("form");
      if (form) {
        this.hFormdata = on(form, "formdata", this.handleFormdata.bind(this));
      }
    }

    disconnectedCallback() {
      if (this.hFormdata) {
        this.hFormdata = this.hFormdata.release();
      }
    }

    closestElement(selector: string, baseElement: Element = this) {
      function closestFrom(el: Element | Window | Document): Element | null {
        if (!el || el === document || el === window) {
          return null;
        }

        if ((el as Slottable).assignedSlot) {
          (el as any) = (el as Slottable).assignedSlot;
        }

        const found = (el as Element).closest(selector);
        return found ? found : closestFrom(((el as Element).getRootNode() as ShadowRoot).host);
      }
      return closestFrom(baseElement);
    }
  }

  return FormMixinImpl;
};
