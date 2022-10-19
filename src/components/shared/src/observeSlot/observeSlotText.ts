/* eslint-disable @typescript-eslint/no-unused-expressions */
import { property, queryAssignedNodes } from "lit/decorators.js";
import type { Constructor } from "../helpers";
import type { PropertyValues, ReactiveElement } from "lit";

const slotElementObserver = Symbol("slotElementObserver");
const assignedNodesList = Symbol("assignedNodes");
const startObserving = Symbol("startObserving");

export interface SlotTextObservingInterface {
  slotHasContent: boolean;
  manageTextObservedSlot: () => void;
}

export function ObserveSlotText<T extends Constructor<ReactiveElement>>(
  constructor: T,
  slotSelector?: string
): T & Constructor<SlotTextObservingInterface> {
  class SlotTextObservingElement extends constructor implements SlotTextObservingInterface {
    private [slotElementObserver]: MutationObserver;

    @property({ type: Boolean, attribute: false }) slotHasContent = false;

    @queryAssignedNodes(slotSelector, true)
    private [assignedNodesList]!: NodeListOf<HTMLElement>;

    constructor(...args: any[]) {
      super(...args);
    }

    manageTextObservedSlot(): void {
      if (!this[assignedNodesList]) {
        return;
      }

      const assignedNodes: any = [...(this[assignedNodesList] as any)].filter((node) => {
        if ((node as HTMLElement).tagName) {
          return true;
        }

        return node.textContent ? node.textContent.trim() : false;
      });

      this.slotHasContent = assignedNodes.length > 0;
    }

    protected firstUpdated(changedProperties: PropertyValues): void {
      super.firstUpdated(changedProperties);

      this.manageTextObservedSlot();
    }

    private [startObserving](): void {
      const config = { CharacterData: true, subtree: true };

      if (!this[slotElementObserver]) {
        const callback = (mutationList: MutationRecord[]): void => {
          for (const mutation of mutationList) {
            if (mutation.type === "characterData") {
              this.manageTextObservedSlot();
            }
          }
        };

        this[slotElementObserver] = new MutationObserver(callback);
      }

      this[slotElementObserver].observe(this, config);
    }

    connectedCallback(): void {
      super.connectedCallback();

      this[startObserving];
    }

    disconnectedCallback(): void {
      if (this[slotElementObserver]) {
        this[slotElementObserver].disconnect();
      }

      super.disconnectedCallback();
    }
  }

  return SlotTextObservingElement;
}
