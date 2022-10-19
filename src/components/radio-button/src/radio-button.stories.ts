import "@aileron/radio-button";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "Forms/Radio Button",
  component: "adc-radio-button",
  parameters: {
    actions: {
      handles: ["adc-radio-group-changed", "adc-blur", "adc-focus", "adc-change"]
    }
  },
  args: {
    disabled: false,
    required: false,
    "hide-label": false,
    "label-text": "Radio Button Group",
    "label-position": "right",
    invalid: false,
    orientation: "horizontal",
    name: "radio_button",
    value: "radio_button_01"
  },
  argTypes: {
    disabled: {
      name: "disabled",
      type: {
        name: "boolean",
        required: false
      },
      description: "Disable the radio button component.",
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
      description: "Set the radio button component as required.",
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
      description: "Set the radio button component as invalid.",
      table: {
        type: {
          summary: "boolean"
        },
        defaultValue: { summary: false }
      },
      control: { type: "boolean" }
    },
    "hide-label": {
      name: "hide-label",
      type: {
        name: "boolean",
        required: false
      },
      description: "Hide labels from view.",
      table: {
        type: {
          summary: "boolean"
        },
        defaultValue: { summary: false }
      },
      control: { type: "boolean" }
    },
    "label-position": {
      name: "label-position",
      type: {
        name: "text",
        required: false
      },
      description: "Label positioned in relation to input.",
      table: {
        type: {
          summary: "string"
        },
        defaultValue: { summary: "right" }
      },
      options: ["left", "right"],
      control: { type: "select" }
    },
    orientation: {
      name: "orientation",
      type: {
        name: "text",
        required: false
      },
      description: "Orientation of the radio button group.",
      table: {
        type: {
          summary: "string"
        },
        defaultValue: { summary: "horizontal" }
      },
      control: { type: "select", options: ["horizontal", "vertical"] }
    },
    value: {
      name: "value",
      type: {
        name: "text",
        required: false
      },
      description: "The set value of the selected/checked radio button.",
      table: {
        type: {
          summary: "string"
        },
        defaultValue: { summary: "radio_button_01" }
      },
      control: {
        type: "select",
        options: ["radio_button_01", "radio_button_02", "radio_button_03"]
      }
    },
    name: {
      name: "name",
      type: {
        name: "text",
        required: false
      },
      description: "Name of radio buttons for form.",
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
    checked: { control: { disable: true }, table: { disable: true } },
    hideLabel: { control: { disable: true }, table: { disable: true } },
    labelPosition: { control: { disable: true }, table: { disable: true } },
    labelText: { control: { disable: true }, table: { disable: true } }
  }
};

const Template = (
  {
    disabled,
    "label-position": labelPosition,
    "hide-label": hideLabel,
    "label-text": labelText,
    required,
    name,
    orientation,
    value
  } = {
    disabled: false,
    required: false,
    "label-position": "right",
    orientation: "horizontal",
    "label-text": "Radio Button Group",
    "hide-label": false,
    name: "radio_button",
    value: "radio_button_01"
  }
) => {
  return html`
    <form>
      <adc-radio-group
        ?disabled=${disabled}
        ?required=${required}
        label-text="${ifDefined(labelText)}"
        label-position="${ifDefined(labelPosition)}"
        orientation="${ifDefined(orientation)}"
        name="${ifDefined(name)}"
        value="${ifDefined(value)}"
      >
        <adc-radio-button
          ?hide-label="${hideLabel}"
          label-text="Radio Button 1"
          value="radio_button_01"
        ></adc-radio-button>
        <adc-radio-button
          ?hide-label="${hideLabel}"
          label-text="Radio Button 2"
          value="radio_button_02"
        ></adc-radio-button>
        <adc-radio-button
          ?hide-label="${hideLabel}"
          label-text="Radio Button 3"
          value="radio_button_03"
        ></adc-radio-button>
      </adc-radio-group>
    </form>
  `;
};

export const Default = (args) => Template(args);
Default.parameters = {
  jest: "radio-button.test.ts"
};
Default.play = async ({ canvasElement }) => {
  const radioGroup = canvasElement.querySelector("adc-radio-group");
  const allRadio = canvasElement.querySelectorAll("adc-radio-button");

  const radio1 = allRadio[0];
  const radio1Button = radio1.shadowRoot.querySelector("input");

  const radio2 = allRadio[1];
  const radio2Button = radio2.shadowRoot.querySelector("input");

  const radio3 = allRadio[2];
  const radio3Button = radio3.shadowRoot.querySelector("input");

  // 🔧  Assert - Radio 1 is selected
  await expect(radioGroup).toHaveAttribute("value", "radio_button_01");
  await expect(radio1).toHaveAttribute("checked");
  await expect(radio2).not.toHaveAttribute("checked");
  await expect(radio3).not.toHaveAttribute("checked");

  // 👇 Simulate - Click radio 2
  await userEvent.click(radio2Button);

  // 🔧  Assert - Radio 2 is selected
  await expect(radioGroup).toHaveAttribute("value", "radio_button_02");
  await expect(radio1).not.toHaveAttribute("checked");
  await expect(radio2).toHaveAttribute("checked");
  await expect(radio3).not.toHaveAttribute("checked");

  // 👇 Simulate - Click radio 3
  await userEvent.click(radio3Button);

  // 🔧  Assert - Radio 3 is selected
  await expect(radioGroup).toHaveAttribute("value", "radio_button_03");
  await expect(radio1).not.toHaveAttribute("checked");
  await expect(radio2).not.toHaveAttribute("checked");
  await expect(radio3).toHaveAttribute("checked");

  // 👇 Simulate - Click radio 1
  await userEvent.click(radio1Button);

  // 🔧  Assert - Radio 1 is selected
  await expect(radioGroup).toHaveAttribute("value", "radio_button_01");
  await expect(radio1).toHaveAttribute("checked");
  await expect(radio2).not.toHaveAttribute("checked");
  await expect(radio3).not.toHaveAttribute("checked");
};
