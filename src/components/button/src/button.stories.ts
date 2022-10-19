import "@aileron/button";
import "@aileron/icon";
import { expect } from "@storybook/jest";
import { userEvent } from "@storybook/testing-library";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import Story from "./button.mdx";

export default {
  title: "Components/Button",
  component: "adc-button",
  parameters: {
    docs: {
      page: Story
    },
    actions: {
      handles: ["adc-blur", "adc-click", "adc-focus"]
    }
  },
  args: {
    autofocus: false,
    disabled: false,
    type: "button",
    kind: "primary",
    size: "regular",
    "label-text": "Button Text"
  },
  argTypes: {
    autofocus: {
      type: {
        name: "boolean",
        required: false
      },
      table: {
        type: {
          summary: "boolean"
        },
        defaultValue: { summary: false }
      },
      control: { type: "boolean" }
    },
    disabled: {
      type: {
        name: "boolean",
        required: false
      },
      table: {
        type: {
          summary: "boolean"
        },
        defaultValue: { summary: false }
      },
      control: { type: "boolean" }
    },
    type: {
      type: {
        name: "text",
        required: false
      },
      table: {
        defaultValue: { summary: '"button"' }
      },
      options: ["button", "submit"],
      control: {
        type: "select"
      }
    },
    kind: {
      type: {
        name: "text",
        required: false
      },
      table: {
        defaultValue: { summary: '"primary"' }
      },
      options: ["primary", "secondary", "ghost"],
      control: {
        type: "select"
      }
    },
    size: {
      type: {
        name: "text",
        required: false
      },
      table: {
        defaultValue: { summary: '""' }
      },
      options: ["sm", "sm fullwidth", "field", "fullwidth", "regular"],
      mapping: { regular: "" },
      control: {
        type: "select"
      }
    },
    labelText: {
      table: { disable: true },
      control: { disable: true }
    },
    "label-text": {
      type: {
        name: "text",
        required: false
      },
      table: {
        type: {
          summary: "string"
        },
        defaultValue: { summary: "" }
      },
      control: { type: "text" }
    }
  }
};

// Testing variable for counting button clicks
let buttonClicks;

const Template = (
  { autofocus, disabled, kind, "label-text": labelText, size, type } = {
    autofocus: false,
    disabled: false,
    kind: "primary",
    size: "regular",
    type: "button",
    "label-text": "Button Text"
  }
) => {
  return html`
    <adc-button
      ?autofocus="${autofocus}"
      ?disabled="${disabled}"
      kind="${ifDefined(kind)}"
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      @click="${() => buttonClicks++}"
    >
      ${ifDefined(labelText)}
    </adc-button>
  `;
};

export const Default = (args) => Template(args);

Default.parameters = {
  jest: "button.test.ts"
};

Default.play = async ({ canvasElement, args }) => {
  // To keep track of button clicks
  buttonClicks = 0;

  const button = canvasElement.querySelector("adc-button").shadowRoot.querySelector("button");

  if (!args.disabled) {
    // 🔧  Assert - Button has not been clicked
    await expect(buttonClicks).toBe(0);

    // 👇 Simulate - button click
    await userEvent.click(button);

    // 🔧  Assert - Button has been clicked once
    await expect(buttonClicks).toBe(1);
  } else {
    // Button is disabled

    // 🔧  Assert - Button has not been clicked
    await expect(buttonClicks).toBe(0);
  }
};

export const Icon = (
  { autofocus, disabled, kind, size, type } = {
    autofocus: false,
    disabled: false,
    kind: "primary",
    size: "regular",
    type: "button"
  }
) => {
  return html`
    <adc-button
      ?autofocus="${autofocus}"
      ?disabled="${disabled}"
      kind="${ifDefined(kind)}"
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      @click="${() => buttonClicks++}"
    >
      <adc-icon slot="leading-icon" icon="action:plus"></adc-icon>
    </adc-button>
  `;
};

Icon.parameters = {
  jest: "button.test.ts"
};

Icon.play = async ({ canvasElement, args }) => {
  // To keep track of button clicks
  buttonClicks = 0;

  const button = canvasElement.querySelector("adc-button").shadowRoot.querySelector("button");

  if (!args.disabled) {
    // 🔧  Assert - Button has not been clicked
    await expect(buttonClicks).toBe(0);

    // 👇 Simulate - button click
    await userEvent.click(button);

    // 🔧  Assert - Button has been clicked once
    await expect(buttonClicks).toBe(1);
  } else {
    // Button is disabled

    // 🔧  Assert - Button has not been clicked
    await expect(buttonClicks).toBe(0);
  }
};

export const TextWithIcon = (
  { autofocus, disabled, "label-text": labelText, kind, size, type } = {
    autofocus: false,
    disabled: false,
    kind: "primary",
    "label-text": "Button Text",
    size: "regular",
    type: "button"
  }
) => {
  return html`
    <adc-button
      ?autofocus="${autofocus}"
      ?disabled="${disabled}"
      kind="${ifDefined(kind)}"
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      @click="${() => buttonClicks++}"
    >
      ${labelText}
      <adc-icon icon="navigation:caret-down" slot="trailing-icon"></adc-icon>
    </adc-button>
  `;
};

TextWithIcon.parameters = {
  jest: "button.test.ts"
};

TextWithIcon.play = async ({ canvasElement, args }) => {
  // To keep track of button clicks
  buttonClicks = 0;

  const button = canvasElement.querySelector("adc-button").shadowRoot.querySelector("button");

  if (!args.disabled) {
    // 🔧  Assert - Button has not been clicked
    await expect(buttonClicks).toBe(0);

    // 👇 Simulate - button click
    await userEvent.click(button);

    // 🔧  Assert - Button has been clicked once
    await expect(buttonClicks).toBe(1);
  } else {
    // Button is disabled

    // 🔧  Assert - Button has not been clicked
    await expect(buttonClicks).toBe(0);
  }
};
