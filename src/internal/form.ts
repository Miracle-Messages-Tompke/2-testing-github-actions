import "./formdata-event-polyfill";
import type { ReactiveController, ReactiveControllerHost } from "lit";

export interface FormSubmitControllerOptions {
  form: (input: unknown) => HTMLFormElement | null;
  name: (input: unknown) => string;
  value: (input: unknown) => unknown | unknown[];
  disabled: (input: unknown) => boolean;
  reportValidity: (input: unknown) => boolean;
}

export class FormSubmitController implements ReactiveController {
  host?: ReactiveControllerHost & Element;
  form?: HTMLFormElement | null;
  options: FormSubmitControllerOptions;

  constructor(
    host: ReactiveControllerHost & Element,
    options?: Partial<FormSubmitControllerOptions>
  ) {
    (this.host = host).addController(this);
    this.options = {
      form: (input: HTMLInputElement) => this.closestElement("form", input),
      name: (input: HTMLInputElement) => input.name,
      value: (input: HTMLInputElement) => input.value,
      disabled: (input: HTMLInputElement) => input.disabled,
      reportValidity: (input: HTMLInputElement) => {
        return typeof input.reportValidity === "function" ? input.reportValidity() : true;
      },
      ...options
    };

    if (this.options.form(this.host)) {
      this.options.form(this.host)!.noValidate = true;
    }

    this.handleFormData = this.handleFormData.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  hostConnected() {
    this.form = this.options.form(this.host);

    if (this.form) {
      this.form.addEventListener("formdata", this.handleFormData);
      this.form.addEventListener("submit", this.handleFormSubmit);
    }
  }

  hostDisconnected() {
    if (this.form) {
      this.form.removeEventListener("formdata", this.handleFormData);
      this.form.removeEventListener("submit", this.handleFormSubmit);
      this.form = undefined;
    }
  }

  handleFormData(event: FormDataEvent) {
    const disabled = this.options.disabled(this.host);
    const name = this.options.name(this.host);
    const value = this.options.value(this.host);

    if (!disabled && typeof name === "string" && typeof value !== "undefined") {
      if (Array.isArray(value)) {
        (value as unknown[]).forEach((v) => {
          event.formData.append(name, (v as string | number | boolean).toString());
        });
      } else {
        event.formData.append(name, (value as string | number | boolean).toString());
      }
    }
  }

  handleFormSubmit(event: Event) {
    const disabled = this.options.disabled(this.host);

    if (this.form && !disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  submit(submitter?: HTMLInputElement | unknown) {
    if (this.form) {
      const button = document.createElement("button");
      button.type = "submit";
      button.style.position = "absolute";
      button.style.width = "0";
      button.style.height = "0";
      button.style.clipPath = "inset(50%)";
      button.style.overflow = "hidden";
      button.style.whiteSpace = "nowrap";

      if (submitter) {
        ["formaction", "formmethod", "formnovalidate", "formtarget"].forEach((attr) => {
          if ((submitter as any).hasAttribute(attr)) {
            button.setAttribute(attr, (submitter as any).getAttribute(attr)!);
          }
        });
      }

      this.form.append(button);
      button.click();
      button.remove();
    }
  }

  closestElement(selector: string, baseElement: Element) {
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
}
