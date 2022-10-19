import type { Constructor } from "../helpers";

export interface Handle {
  release: () => null;
}

function on(element: any, ...args: any) {
  element.addEventListener(...args);
  return {
    release() {
      element.removeEventListener(...args);
      return null;
    }
  };
}

const EVENT_NAME_FORMAT = /^((document|window|parentRoot|shadowRoot):)?([\w-]+)$/;

export function HostListenerMixin<T extends Constructor<HTMLElement>>(Base: T) {
  class HostListenerMixinImpl extends Base {
    _handles: Set<Handle> = new Set();

    constructor(...args: any[]) {
      super(...args);
    }

    connectedCallback() {
      // @ts-expect-error - connectedCallback does not exist in HTMLElement
      super.connectedCallback();

      const hostListeners = (this.constructor as typeof HostListenerMixinImpl)._hostListeners;
      Object.keys(hostListeners).forEach((listenerName) => {
        Object.keys(hostListeners[listenerName]).forEach((type) => {
          const tokens = EVENT_NAME_FORMAT.exec(type);

          if (!tokens) {
            throw new Error(`Could not parse the event name: ${listenerName}`);
          }

          const [, , targetName, unprefixedType] = tokens;
          const target: EventTarget =
            {
              document: this.ownerDocument,
              window: this.ownerDocument.defaultView,
              parentRoot: this.getRootNode(),
              shadowRoot: this.shadowRoot
            }[targetName] || this;
          const { options } = hostListeners[listenerName][type];

          this._handles.add(
            on(
              target,
              ((this.constructor as any)[unprefixedType] ??
                unprefixedType) as keyof HTMLElementEventMap,
              (this as any)[listenerName],
              options
            )
          );
        });
      });
    }

    disconnectedCallback() {
      this._handles.forEach((handle) => {
        handle.release();
        this._handles.delete(handle);
      });

      // @ts-expect-error - disconnectedCallback does not exist in HTMLElement
      super.disconnectedCallback();
    }

    static _hostListeners: {
      [listenerName: string]: {
        [type: string]: { options?: boolean | AddEventListenerOptions };
      };
    } = {};
  }

  return HostListenerMixinImpl;
}
