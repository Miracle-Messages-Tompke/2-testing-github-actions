import "@aileron/button-icon";
import { expect } from "@storybook/jest";
import { userEvent } from "@storybook/testing-library";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import Story from "./button-icon.mdx";

export default {
  title: "Components/Button Icon",
  component: "adc-button-icon",
  parameters: {
    docs: {
      page: Story
    },
    actions: {
      handles: ["adc-focus", "adc-blur", "adc-click"]
    }
  },
  args: {
    autofocus: false,
    disabled: false,
    "label-text": "Button Icon",
    kind: "primary",
    size: "regular",
    icon: "action:close",
    outlined: false,
    filled: false
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
      options: ["small", "field", "regular"],
      mapping: { regular: "", small: "sm" },
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
    },
    type: {
      table: { disable: true },
      control: { disable: true }
    },
    buttonNode: {
      table: { disable: true },
      control: { disable: true }
    },
    "adc-click": {
      control: { disable: true }
    },
    "adc-focus": {
      control: { disable: true }
    },
    "adc-blur": {
      control: { disable: true }
    }
  }
};

// Testing variable for counting button clicks
let buttonClicks;

const Template = (
  { autofocus, disabled, kind, size, icon, outlined, filled, "label-text": labelText } = {
    autofocus: false,
    disabled: false,
    "label-text": "Button Icon",
    kind: "primary",
    size: "regular",
    icon: "action:close",
    outlined: false,
    filled: false
  }
) => {
  return html`
    <adc-button-icon
      ?autofocus=${autofocus}
      ?disabled=${disabled}
      kind=${kind}
      size=${ifDefined(size)}
      icon=${icon}
      ?outlined=${outlined}
      ?filled=${filled}
      @click="${() => buttonClicks++}"
    >
      ${labelText}
    </adc-button-icon>
  `;
};

export const Default = (args) => Template(args);
Default.parameters = {
  docs: {
    source: {
      // eslint-disable-next-line no-template-curly-in-string
      code: '<adc-button-icon @click="${_someClickHandler}"></adc-button-icon>'
    }
  },
  jest: "button-icon.test.ts"
};

Default.play = async ({ canvasElement, args }) => {
  // To keep track of button clicks
  buttonClicks = 0;

  const button = canvasElement.querySelector("adc-button-icon").shadowRoot.querySelector("button");

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
