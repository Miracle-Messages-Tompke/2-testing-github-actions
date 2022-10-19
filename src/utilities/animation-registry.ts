interface ElementAnimation {
  keyframes: Keyframe[];
  options?: KeyframeAnimationOptions;
}

interface ElementAnimationMap {
  [animationName: string]: ElementAnimation;
}

const defaultAnimationRegistry = new Map<string, ElementAnimation>();
const customAnimationRegistry = new WeakMap<Element, ElementAnimationMap>();

function ensureAnimation(animation: ElementAnimation | null) {
  return animation ?? { keyframes: [], options: { duration: 0 } };
}

export function setDefaultAnimation(animationName: string, animation: ElementAnimation | null) {
  defaultAnimationRegistry.set(animationName, ensureAnimation(animation));
}

export function setAnimation(el: Element, animationName: string, animation: ElementAnimation | null) {
  customAnimationRegistry.set(el, { ...customAnimationRegistry.get(el), [animationName]: ensureAnimation(animation) });
}

export function getAnimation(el: Element, animationName: string) {
  const customAnimation = customAnimationRegistry.get(el);

  if (customAnimation?.[animationName]) {
    return customAnimation[animationName];
  }

  const defaultAnimation = defaultAnimationRegistry.get(animationName);
  if (defaultAnimation) {
    return defaultAnimation;
  }

  return {
    keyframes: [],
    options: { duration: 0 }
  };
}
