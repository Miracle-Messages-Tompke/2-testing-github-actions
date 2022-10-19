import "@aileron/date-picker";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "Components/Date Picker",
  component: "adc-date-picker",
  args: {
    readonly: false,
    invalid: false,
    open: false,
    dateFormat: "m/d/Y",
    placeholder: "mm/dd/yyyy",
    labelText: "Date Label",
    validityMessage: "Something went wrong.",
    value: ""
  },
  argTypes: {
    readonly: {
      name: "read-only",
      type: {
        name: "boolean",
        required: false
      },
      description: "Read only state for the Date Picker component.",
      table: {
        type: {
          summary: "boolean"
        },
        defaultValue: { summary: false }
      },
      control: { type: "boolean" }
    },
    open: {
      name: "open",
      type: {
        name: "boolean",
        required: false
      },
      description: "Set the Date Picker component as opened.",
      table: {
        type: {
          summary: "boolean"
        },
        defaultValue: { summary: false }
      },
      control: { type: "boolean" }
    },
    invalid: {
      name: "invalid",
      type: {
        name: "boolean",
        required: false
      },
      description: "Invalidate the radio button component.",
      table: {
        type: {
          summary: "boolean"
        },
        defaultValue: { summary: false }
      },
      control: { type: "boolean" }
    },
    labelText: {
      name: "label-text",
      type: {
        name: "text",
        required: false
      },
      description: "Label Text for the Date Picker component.",
      table: {
        type: {
          summary: "string"
        },
        defaultValue: { summary: "" }
      },
      control: {
        type: "text"
      }
    },
    dateFormat: {
      name: "date-format",
      type: {
        name: "text",
        required: true
      },
      description: "Formatting of the calendar dates for the Date Picker component.",
      table: {
        type: {
          summary: "string"
        },
        defaultValue: { summary: "m/d/Y" }
      },
      options: ["m/d/Y", "Y/m/d", "d/m/Y"],
      control: { type: "select" }
    },
    placeholder: {
      name: "placeholder",
      type: {
        name: "text",
        required: false
      },
      description: "The placeholder value for the Date Picker component.",
      table: {
        type: {
          summary: "string"
        },
        defaultValue: { summary: "mm/dd/yyyy" }
      },
      options: ["mm/dd/yyyy", "yyyy/mm/dd", "dd/mm/yyyy"],
      control: { type: "text" }
    },
    value: { control: { disable: true }, table: { disable: true } },
    mobileView: { control: { disable: true }, table: { disable: true } },
    disabled: { control: { disable: true }, table: { disable: true } },
    calendar: { control: { disable: true }, table: { disable: true } },
    shadowRootOptions: { control: { disable: true }, table: { disable: true } },
    showMonths: { control: { disable: true }, table: { disable: true } },
    locale: { control: { disable: true }, table: { disable: true } },
    classNoBorder: { control: { disable: true }, table: { disable: true } },
    defaultDateFormat: { control: { disable: true }, table: { disable: true } },
    defaultLocale: { control: { disable: true }, table: { disable: true } },
    styles: { control: { disable: true }, table: { disable: true } },
    enabledRange: { control: { disable: true }, table: { disable: true } }
  }
};

export const SinglePicker = (args) => {
  return html`
    <adc-date-picker dateFormat="${ifDefined(args?.dateFormat)}" ?open="${args?.open}">
      <adc-date-picker-input
        ?invalid=${args?.invalid}
        ?readonly=${args?.readonly}
        label-text="${ifDefined(args?.labelText)}"
        placeholder="${ifDefined(args?.placeholder)}"
        value="${ifDefined(args?.value)}"
        validity-message="${ifDefined(args?.validityMessage)}"
        kind="single"
      >
      </adc-date-picker-input>
    </adc-date-picker>
  `;
};

SinglePicker.args = {
  readonly: false,
  invalid: false,
  open: false,
  dateFormat: "m/d/Y",
  placeholder: "mm/dd/yyyy",
  labelText: "Date Label",
  validityMessage: "Something went wrong.",
  value: ""
};
SinglePicker.parameters = {
  docs: {
    source: {}
  },
  jest: "date-picker.test.ts"
};

SinglePicker.storyName = "Single Picker";

SinglePicker.play = async ({ canvasElement }) => {
  const textInput = canvasElement
    .querySelector("adc-date-picker-input")
    .shadowRoot.querySelector("adc-text-input")
    .shadowRoot.querySelector("input");

  // 🔧  Assert - Input field is empty
  await expect(textInput.value).toBe("");

  // 👇 Simulate - Type in Date
  await userEvent.type(textInput, "08/08/2022");

  // 🔧  Assert - Input field is filled with date
  await expect(textInput.value).toBe("08/08/2022");
};

export const RangePicker = (args) => {
  return html`
    <adc-date-picker dateFormat="${ifDefined(args?.dateFormat)}" ?open="${args?.open}">
      <adc-date-picker-input
        ?invalid=${args?.invalid}
        ?readonly=${args?.readonly}
        label-text="${ifDefined(args?.labelText)}"
        placeholder="${ifDefined(args?.placeholder)}"
        value="${ifDefined(args?.value)}"
        validity-message="${ifDefined(args?.validityMessage)}"
        kind="from"
      >
      </adc-date-picker-input>
      <adc-date-picker-input
        ?invalid=${args?.invalid}
        ?readonly=${args?.readonly}
        label-text="${ifDefined(args?.labelText)}"
        placeholder="${ifDefined(args?.placeholder)}"
        value="${ifDefined(args?.value)}"
        validity-message="${ifDefined(args?.validityMessage)}"
        kind="to"
      >
      </adc-date-picker-input>
    </adc-date-picker>
  `;
};
RangePicker.args = {
  readonly: false,
  invalid: false,
  open: false,
  dateFormat: "m/d/Y",
  placeholder: "mm/dd/yyyy",
  labelText: "Date Label",
  validityMessage: "Something went wrong.",
  value: ""
};
RangePicker.parameters = {
  docs: {
    source: {}
  },
  jest: "date-picker.test.ts"
};
RangePicker.storyName = "Range Picker";

RangePicker.play = async ({ canvasElement }) => {
  const textInputFrom = canvasElement
    .querySelector('adc-date-picker-input[kind="from"]')
    .shadowRoot.querySelector("adc-text-input")
    .shadowRoot.querySelector("input");
  const textInputTo = canvasElement
    .querySelector('adc-date-picker-input[kind="to"]')
    .shadowRoot.querySelector("adc-text-input")
    .shadowRoot.querySelector("input");

  // 🔧  Assert - From Date field is empty
  await expect(textInputFrom.value).toBe("");

  // 👇 Simulate - Type in Date
  await userEvent.type(textInputFrom, "08/08/2022");

  // 🔧  Assert - From Date field is filled
  await expect(textInputFrom.value).toBe("08/08/2022");

  // 🔧  Assert - To Date field is empty
  await expect(textInputTo.value).toBe("");

  // 👇 Simulate - Type in Date
  await userEvent.type(textInputTo, "08/23/2022");

  // 🔧  Assert - To Date field is filled
  await expect(textInputTo.value).toBe("08/23/2022");
};
