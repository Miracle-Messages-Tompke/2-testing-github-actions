/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { computePosition, offset, shift, flip, arrow } from "@floating-ui/dom";
import type { Placement } from "@floating-ui/dom";

export class Float {
  element: HTMLElement;
  target: Element | null;
  arrow: HTMLElement;

  constructor(element: HTMLElement, target: Element | null, domArrow: HTMLElement) {
    this.element = element;
    this.target = target;
    this.arrow = domArrow;
  }

  activate(domPlacement: Placement) {
    computePosition(this.target!, this.element, {
      placement: domPlacement,
      middleware: [
        offset(10),
        shift({ padding: 5 }),
        flip(),
        arrow({ element: this.arrow })
        // autoPlacement({allowedPlacements: ['top', 'bottom']})
      ]
    }).then(
      ({
        x,
        y,
        placement,
        middlewareData
      }: {
        x: number;
        y: number;
        placement: any;
        middlewareData: any;
      }): void => {
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;

        // Placement of the Arrow

        const { x: arrowX, y: arrowY } = middlewareData.arrow;

        const staticSide = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right"
        }[placement.split("-")[0]];

        Object.assign(this.arrow.style, {
          left: arrowX !== (null || undefined) ? `${arrowX}px` : "",
          top: arrowY !== (null || undefined) ? `${arrowY}px` : "",
          right: "",
          bottom: "",
          [staticSide]: "-4px"
        });
      }
    );
  }
}
