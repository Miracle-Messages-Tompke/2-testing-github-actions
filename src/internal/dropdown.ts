import { computePosition, shift, flip, hide } from "@floating-ui/dom";

export class Dropdown {
  host: HTMLElement;
  source: HTMLElement;

  constructor(host: HTMLElement, source: HTMLElement) {
    this.host = host;
    this.source = source;
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  activate() {
    this.host.addEventListener("click", this.handleClick);
    this.host.addEventListener("blur", this.handleBlur);
  }

  deactivate() {
    this.host.removeEventListener("click", this.handleClick);
    this.host.removeEventListener("blur", this.handleBlur);
  }

  initialize() {
    computePosition(this.host, this.source, {
      middleware: [flip(), shift({ padding: 8 }), hide()]
    }).then(({x, y, middlewareData}) => {
      const { referenceHidden } = middlewareData.hide!;

      Object.assign(this.source.style, {
        left: `${x}px`,
        top: `${y}px`,
        visibility: referenceHidden ? "hidden" : "visible"
      });
    }).catch(() => {
      // do nothing
    });
  }

  handleClick() {
    this.source.style.display = "block";
    this.initialize();
  }

  handleBlur() {
    this.source.style.display = "none";
  }
}
