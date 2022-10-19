const locks = new Set();

export function lockBodyScrolling(lockingEl: HTMLElement) {
  locks.add(lockingEl);

  document.body.classList.add("adc-scroll-lock");
  document.body.style.overflow = "hidden";
}

export function unlockBodyScrolling(lockingEl: HTMLElement) {
  locks.delete(lockingEl);

  if (locks.size === 0) {
    document.body.classList.remove("adc-scroll-lock");
    document.body.removeAttribute("style");
  }
}
