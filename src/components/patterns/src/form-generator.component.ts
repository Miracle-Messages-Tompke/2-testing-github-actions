/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import "@aileron/button";
import "@aileron/checkbox";
import "@aileron/divider";
import "@aileron/grid";
import "@aileron/radio-button";
import "@aileron/select";
import "@aileron/text-input";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { INPUT_COMPONENT } from "./defs";
import styles from "./form-generator.styles";
import type {
  ButtonElement,
  CheckboxElement,
  DividerElement,
  FormConfig,
  RadioButtonElement,
  Row,
  SelectElement,
  TextInputElement
} from "./defs";
import type { PropertyValues } from "lit";

@customElement("adc-form-generator")
export class FormGenerator extends LitElement {
  /**
   * The JSON parsed config string.
   */
  data!: FormConfig;

  /**
   * Stringified JSON configuration for the form.
   * @type {string}
   */
  @property({ type: String }) config = "";

  /**
   * If there is a data config, render the form.
   * @returns {Element}
   */
  render() {
    return this.data ? html`${this.renderGridContainer(this.data)}` : undefined;
  }

  /**
   * Creates a `adc-grid` container component and sets the form property to
   * true. Loops through the data to find rows, and appends them to the grid.
   * @param data
   * @returns {Element}
   */
  renderGridContainer(data: Row[]): Element {
    const el = document.createElement("adc-grid");
    el.setAttribute("form", "true");

    for (const row of data) {
      el.appendChild(this.renderGridRow(row));
    }

    return el;
  }

  /**
   * Creates an `adc-row` component and loops through the row to find form data.
   * @param data
   * @returns {Element}
   */
  renderGridRow(data: Row): Element {
    const el = document.createElement("adc-row");

    for (const input of data) {
      el.appendChild(this.renderGridColumn(input));
    }

    return el;
  }

  /**
   * Creates an `adc-column` component and sets the column width for
   * desktop, tablet and phone sizes. If the component is a divider,
   * set the columns to full width. If the showOnLoad property
   * is false, then hide the column. Append the input component to the column.
   * @param data
   * @returns {Element}
   */
  renderGridColumn(
    data:
      | CheckboxElement
      | TextInputElement
      | RadioButtonElement
      | SelectElement
      | ButtonElement
      | DividerElement
  ): Element {
    const el = document.createElement("adc-column");
    if (data.component === "divider") {
      el.setAttribute("col-desktop", "12");
      el.setAttribute("col-tablet", "8");
      el.setAttribute("col-phone", "4");
    } else {
      el.setAttribute("col-desktop", "3");
      el.setAttribute("col-tablet", "4");
      el.setAttribute("col-phone", "4");
    }

    if (data.showOnLoad === false) {
      el.style.display = "none";
    }

    el.appendChild(this.renderElement(data));

    return el;
  }

  /**
   * Create the specific input component
   * @param props
   * @returns {Element}
   */
  renderElement(
    props:
      | CheckboxElement
      | TextInputElement
      | RadioButtonElement
      | SelectElement
      | ButtonElement
      | DividerElement
  ): Element {
    const el = document.createElement(`${(INPUT_COMPONENT as any)[props.component.toUpperCase()]}`);

    /**
     * Loop through the properties of the input component and set them.
     */
    for (const prop in props) {
      if (Object.prototype.hasOwnProperty.call(props, prop)) {
        /**
         * If the value property is an array and the node is a radio component,
         * create the children `adc-radio-button` components, set properties and
         * append them to the `adc-radio-group` component.
         */
        if (
          el.nodeName.toLowerCase() === INPUT_COMPONENT.RADIO &&
          Array.isArray((props as RadioButtonElement).value) &&
          prop === "value"
        ) {
          (props as RadioButtonElement).value.map((attr) => {
            const radio = document.createElement("adc-radio-button");
            for (const key in attr) {
              if (Object.prototype.hasOwnProperty.call(attr, key)) {
                radio.setAttribute(key, (attr as any)[key]);
              }
            }
            el.appendChild(radio);
          });

          /**
           * If the value property is an array and the node is a select
           * component, iterate through the select properties and create the
           * child `adc-select-item` and `adc-select-item-group` components.
           * Append the select children to the parent `adc-select` component.
           */
        } else if (
          el.nodeName.toLowerCase() === INPUT_COMPONENT.SELECT &&
          Array.isArray((props as SelectElement).value) &&
          prop === "value"
        ) {
          (props as SelectElement).value.map((attr) => {
            const select = document.createElement("adc-select-item") as Element;
            const group = document.createElement("adc-select-item-group") as Element;

            /**
             * To catch whenever a property is set to false instead of not
             * included we check if our boolean properties are true or false and
             * set them if true, and do nothing if false. If the property,
             * value, is an array then append the `adc-select-item` DOM Node to
             * the `adc-select-item-group`.
             */
            for (const key in attr) {
              if (Object.prototype.hasOwnProperty.call(attr, key)) {
                if (key === "value" && Array.isArray(attr.value)) {
                  attr.value.map((leaf) => {
                    const leafDomNode = document.createElement("adc-select-item") as Element;
                    for (const k in leaf) {
                      if (Object.prototype.hasOwnProperty.call(leaf, k)) {
                        if (k === "selected" && leaf[k] === true) {
                          leafDomNode.setAttribute("selected", "");
                        } else if (k === "selected" && leaf[k] === false) {
                          // do nothing
                        } else if (k === "disabled" && leaf[k] === true) {
                          leafDomNode.setAttribute("disabled", "");
                        } else if (k === "disabled" && leaf[k] === false) {
                          // do nothing
                        } else if (k === "required" && (leaf as any)[k] === true) {
                          leafDomNode.setAttribute("required", "");
                        } else if (k === "required" && (leaf as any)[k] === false) {
                          // do nothing
                        } else {
                          leafDomNode.setAttribute(k, (leaf as any)[k]);
                        }
                      }
                    }
                    group.setAttribute("label-text", attr["label-text"]);
                    group.appendChild(leafDomNode);
                  });

                  /**
                   * To catch whenever a property is set to false instead of not
                   * included we check if our boolean properties are true or
                   * false and set them if true, and do nothing if false.
                   */
                } else {
                  if (key === "selected" && attr[key] !== false) {
                    select.setAttribute("selected", "");
                  } else if (key === "selected" && attr[key] === false) {
                    // do nothing
                  } else if (key === "disabled" && attr[key] === true) {
                    select.setAttribute("disabled", "");
                  } else if (key === "disabled" && attr[key] === false) {
                    // do nothing
                  } else if (key === "required" && (attr as any)[key] === true) {
                    select.setAttribute("required", "");
                  } else if (key === "required" && (attr as any)[key] === false) {
                    // do nothing
                  } else {
                    select.setAttribute(key, (attr as any)[key]);
                  }
                }
              }
            }

            /**
             * Append the group if it has children, otherwise append the select.
             */
            if ((group as HTMLElement).hasChildNodes()) {
              el.appendChild(group);
            } else {
              el.appendChild(select);
            }
          });

          /**
           * To catch whenever a property is set to false instead of not
           * included we check if our boolean properties are true or false and
           * set them if true, and do nothing if false.
           */
        } else {
          if (prop === "default-value") {
            el.setAttribute("value", (props as any)[prop]);
          } else if (prop === "disabled" && (props as any)[prop] === true) {
            el.setAttribute("disabled", "");
          } else if (prop === "disabled" && (props as any)[prop] === false) {
            // do nothing
          } else if (prop === "required" && (props as any)[prop] === true) {
            el.setAttribute("required", "");
          } else if (prop === "required" && (props as any)[prop] === false) {
            // do nothing
          } else {
            el.setAttribute(prop, (props as any)[prop]);
          }
        }
      }
    }

    if (props.showOnLoad === false) {
      el.setAttribute("disabled", "");
    }

    return el;
  }

  /**
   * Create the data property and populate it when the component is created.
   */
  connectedCallback() {
    super.connectedCallback();

    if (this.config !== undefined) {
      console.log(this.config);
      this.data = JSON.parse(this.config) as FormConfig;
    }
  }

  /**
   * If the config property is changed then update the data property.
   */
  update(changedProperties: PropertyValues) {
    if (changedProperties.has("config")) {
      console.log(this.config);
      this.data = JSON.parse(this.config) as FormConfig;
    }

    super.update(changedProperties);
  }

  /**
   * @private
   */
  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-form-generator": FormGenerator;
  }
}
