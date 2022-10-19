import { selectorTabbable } from "./helpers";
import type { Constructor } from "./helpers";

export const FocusMixin = <T extends Constructor<HTMLElement>>(Base: T) =>
  class extends Base {
    focus() {
      if (this.shadowRoot?.delegatesFocus) {
        super.focus();
      } else {
        const delegateTarget =
          this.shadowRoot?.querySelector<HTMLElement>(selectorTabbable) ||
          this.querySelector(selectorTabbable);

        if (delegateTarget) {
          (delegateTarget as HTMLElement).focus();
        } else {
          super.focus();
        }
      }
    }
  };
