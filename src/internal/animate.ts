export function animateTo(el: HTMLElement, keyframes: Keyframe[], options?: KeyframeAnimationOptions) {
  return new Promise(resolve => {
    if (options?.duration === Infinity) {
      throw new Error("Promise-based animation must be finite");
    }

    const animation = el.animate(keyframes, {
      ...options,
      duration: prefersReduceMotion() ? 0 : options!.duration
    });

    animation.addEventListener("cancel", resolve, { once: true });
    animation.addEventListener("finish", resolve, { once: true });
  });
}

export function prefersReduceMotion() {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");

  return query.matches;
}

export function stopAnimations(el: HTMLElement) {
  return Promise.all(
    el.getAnimations().map(animation => {
      return new Promise(resolve => {
        const handleAnimationEvent = requestAnimationFrame(resolve);

        animation.addEventListener("cancel", () => handleAnimationEvent, { once: true });
        animation.addEventListener("finish", () => handleAnimationEvent, { once: true });
        animation.cancel();
      });
    })
  );
}
