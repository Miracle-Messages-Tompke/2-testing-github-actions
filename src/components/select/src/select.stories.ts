import "@aileron/select";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "Forms/Select",
  component: "adc-select",
  args: {
    disabled: false,
    required: false,
    invalid: false,
    labelText: "Select",
    placeholder: "-- Pick an option --",
    helperText: "",
    value: "",
    requiredValidityMessage: "Please fill out this field.",
    validityMessage: ""
  },
  argTypes: {
    disabled: {
      name: "disabled",
      type: {
        name: "boolean",
        required: false
      },
      description: "Disable the select component.",
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
      description: "Invalidate the select component.",
      table: {
        type: {
          summary: "boolean"
        },
        defaultValue: { summary: false }
      },
      control: { type: "boolean" }
    },
    required: {
      name: "required",
      type: {
        name: "boolean",
        required: false
      },
      description: "Set required for the Select.",
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
      description: "Label for select.",
      table: {
        type: {
          summary: "text"
        },
        defaultValue: { summary: false }
      },
      control: { type: "text" }
    },
    requiredValidityMessage: {
      name: "required-validity-message",
      type: {
        name: "text",
        required: false
      },
      description: "Message when a select is invalid.",
      table: {
        type: {
          summary: "text"
        },
        defaultValue: { summary: false }
      },
      control: { type: "text" }
    },
    validityMessage: {
      name: "validity-message",
      type: {
        name: "text",
        required: false
      },
      description: "Message when a select is invalid.",
      table: {
        type: {
          summary: "text"
        },
        defaultValue: { summary: false }
      },
      control: { type: "text" }
    },
    placeholder: {
      name: "placeholder",
      type: {
        name: "text",
        required: false
      },
      description: "Placeholder text.",
      table: {
        type: {
          summary: "text"
        },
        defaultValue: { summary: false }
      },
      control: { type: "text" }
    },
    helperText: {
      name: "helper-text",
      type: {
        name: "text",
        required: false
      },
      description: "Helper text.",
      table: {
        type: {
          summary: "text"
        },
        defaultValue: { summary: false }
      },
      control: { type: "text" }
    },
    value: {
      name: "value",
      type: {
        name: "text",
        required: false
      },
      description: "value text.",
      table: {
        type: {
          summary: "text"
        },
        defaultValue: { summary: "" }
      },
      control: { type: "text" }
    }
  }
};

const Template = (
  {
    disabled,
    required,
    invalid,
    helperText,
    labelText,
    placeholder,
    value,
    validityMessage,
    requiredValidityMessage
  } = {
    disabled: false,
    required: false,
    invalid: false,
    helperText: "",
    labelText: "",
    placeholder: "",
    value: "",
    validityMessage: "",
    requiredValidityMessage: "Please fill out this field."
  }
) => html`
  <adc-select
    ?disabled="${disabled}"
    ?required="${required}"
    ?invalid="${invalid}"
    name="select"
    helper-text="${ifDefined(helperText)}"
    label-text="${ifDefined(labelText)}"
    placeholder="${ifDefined(placeholder)}"
    validity-message="${ifDefined(validityMessage)}"
    required-validity-message="${ifDefined(requiredValidityMessage)}"
    value="${ifDefined(value)}"
    style="width: 352px;"
  >
    <adc-select-item-group label-text="test">
      <adc-select-item label-text="Option 1" value="option_01"></adc-select-item>
      <adc-select-item label-text="Option 2" value="option_02"></adc-select-item>
    </adc-select-item-group>
    <adc-select-item label-text="Option 3" value="option_03"></adc-select-item>
    <adc-select-item label-text="Option 4" value="option_04"></adc-select-item>
  </adc-select>
`;

export const Default = (args) => Template(args);
Default.parameters = {
  jest: "select.test.ts"
};
Default.play = async ({ canvasElement }) => {
  const selectComponent = canvasElement.querySelector("adc-select");
  const selectInput = selectComponent.shadowRoot
    .querySelector(".adc-select.adc-select__input-wrapper")
    .querySelector("#input");

  // 🔧  Assert - Nothing selected
  await expect(selectInput.value).toBe("");

  // 👇 Simulate - Select Option 4
  await userEvent.selectOptions(selectInput, "option_04");

  // 🔧  Assert - Option 4 selected
  await expect(selectInput.value).toBe("option_04");

  // 👇 Simulate - Select Option 3
  await userEvent.selectOptions(selectInput, "option_03");

  // 🔧  Assert - Option 3 selected
  await expect(selectInput.value).toBe("option_03");

  // 👇 Simulate - Select Option 2
  await userEvent.selectOptions(selectInput, "option_02");

  // 🔧  Assert - Option 2 selected
  await expect(selectInput.value).toBe("option_02");

  // 👇 Simulate - Select Option 1
  await userEvent.selectOptions(selectInput, "option_01");

  // 🔧  Assert - Option 1 selected
  await expect(selectInput.value).toBe("option_01");
};
