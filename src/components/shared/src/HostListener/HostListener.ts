const setHostListener = (
  type: string,
  options: boolean | AddEventListenerOptions,
  Clazz: any,
  name: string
) => {
  const hostListeners = Clazz._hostListeners;
  if (!hostListeners) {
    throw new Error(
      "The method `@HostListener()` is defined on has to be of a class that has `HostListerMixin`."
    );
  }
  if (!hostListeners[name]) {
    hostListeners[name] = {};
  }
  hostListeners[name][type] = { options };
};

const HostListenerStandard = (
  type: string,
  options: boolean | AddEventListenerOptions,
  descriptor: any
) => {
  const { kind, key, placement } = descriptor;
  if (
    !((kind === "method" && placement === "prototype") || (kind === "field" && placement === "own"))
  ) {
    throw new Error(
      "`@HostListener()` must be defined on instance methods, but you may have defined it on static, field, etc."
    );
  }
  return {
    ...descriptor,
    finisher(Clazz: any) {
      setHostListener(type, options, Clazz, key);
    }
  };
};

export const HostListener =
  (type: string, options?: boolean | AddEventListenerOptions) =>
  (targetOrDescriptor: any, name: string) =>
    typeof name !== "undefined"
      ? setHostListener(type, options!, targetOrDescriptor.constructor, name)
      : HostListenerStandard(type, options!, targetOrDescriptor);
