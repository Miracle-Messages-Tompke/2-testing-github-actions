import type { Constructor } from "../helpers";
import type { ReactiveElement } from "lit";

const slotElementObserver = Symbol("slotElementObserver");
const startObserving = Symbol("startObserving");
const slotContentIsPresent = Symbol("slotContentIsPresent");

export interface SlotPresenceObservingInterface {
  slotContentIsPresent: boolean;
  getSlotContentPresence: (selector: string) => boolean;
  managePresenceObservedSlot: () => void;
}

export function ObserveSlotPresence<T extends Constructor<ReactiveElement>>(
  constructor: T,
  lightDomSelector: string | string[]
): T & Constructor<SlotPresenceObservingInterface> {
  const lightDomSelectors = Array.isArray(lightDomSelector) ? lightDomSelector : [lightDomSelector];

  class SlotPresenceObservingElement extends constructor implements SlotPresenceObservingInterface {
    private [slotElementObserver]!: MutationObserver;

    get slotContentIsPresent(): boolean {
      if (lightDomSelectors.length === 1) {
        return this[slotContentIsPresent].get(lightDomSelectors[0]) || false;
      }
      throw new Error(
        "Multiple selectors provided to `ObserveSlotPresence` use `getSlotContentPresence(selector: string)` instead."
      );
    }

    private [slotContentIsPresent]: Map<string, boolean> = new Map();

    getSlotContentPresence(selector: string): boolean {
      if (this[slotContentIsPresent].has(selector)) {
        return this[slotContentIsPresent].get(selector) || false;
      }

      throw new Error("The provided selector `` is not being observed.");
    }

    constructor(...args: any[]) {
      super(...args);
    }

    managePresenceObservedSlot = (): void => {
      lightDomSelectors.forEach((selector) => {
        this[slotContentIsPresent].set(selector, !!this.querySelector(selector));
      });

      this.requestUpdate();
    };

    private [startObserving](): void {
      const config = { childList: true, subtree: true };

      if (!this[slotElementObserver]) {
        this[slotElementObserver] = new MutationObserver(this.managePresenceObservedSlot);
      }

      this[slotElementObserver].observe(this, config);
      this.managePresenceObservedSlot();
    }

    connectedCallback(): void {
      super.connectedCallback();
      this[startObserving]();
    }

    disconnectedCallback(): void {
      this[slotElementObserver].disconnect();
      super.disconnectedCallback();
    }
  }

  return SlotPresenceObservingElement;
}
