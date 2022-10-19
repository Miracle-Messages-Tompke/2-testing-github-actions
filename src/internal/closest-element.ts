export function closestElement(selector: string, baseElement: Element) {
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
    return closestFrom(baseElement) as HTMLFormElement | null;
}
