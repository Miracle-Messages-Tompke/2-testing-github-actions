import "@aileron/tooltip";
import "@aileron/button";
import { expect } from "@storybook/jest";
import { userEvent } from "@storybook/testing-library";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import type { Placement } from "@floating-ui/dom";
import type { TemplateResult } from "lit-html";

export default {
  title: "Components/Tooltip",
  component: "adc-tooltip",
  parameters: {
    actions: {
      handles: ["adc-show", "adc-hide", "adc-close-tooltip"]
    }
  },
  args: {
    placement: "bottom",
    type: "",
    heading: "This is a Heading",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit eu pellentesque egestas adipiscing vel viverra posuere ipsum. Ut vulputate risus amet id et proin.",
    toggle: false
  },
  argTypes: {
    placement: {
      type: {
        name: "placement",
        required: false
      },
      table: {
        type: {
          summary: "string"
        },
        defaultValue: { placement: "" }
      },
      control: { type: "text" }
    },
    type: {
      type: {
        name: "type",
        required: false
      },
      table: {
        type: {
          type: "string"
        }
      },
      control: { type: "text" }
    },
    content: {
      type: {
        name: "content",
        required: false
      },
      table: {
        type: {
          label: "string"
        },
        defaultValue: {
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit eu pellentesque egestas adipiscing vel viverra posuere ipsum. Ut vulputate risus amet id et proin."
        }
      },
      control: { type: "text" }
    },
    toggle: {
      type: {
        name: "toggle",
        required: false
      },
      table: {
        type: {
          toggle: "boolean"
        },
        defaultValue: { toggle: false }
      },
      control: { type: "boolean" }
    }
  }
};

interface Properties {
  heading?: string;
  placement?: Placement;
  type?: string;
  content?: string;
  toggle?: boolean;
}

const Template = (
  { placement, type, heading, content, toggle }: Properties = {
    placement: "right",
    type: "",
    heading: "Test Heading",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit eu pellentesque egestas adipiscing vel viverra posuere ipsum. Ut vulputate risus amet id et proin.",
    toggle: false
  }
): TemplateResult => {
  return html`
    <adc-button-icon icon="action:show"> </adc-button-icon>
    <adc-tooltip
      ?toggle=${toggle}
      heading=${ifDefined(heading)}
      type=${ifDefined(type)}
      placement=${ifDefined(placement)}
    >
      ${content}
    </adc-tooltip>
  `;
};

export const Default = (args?: Properties): TemplateResult => Template(args);
Default.parameters = {
  jest: "tooltip.test.ts"
};
Default.play = async ({ canvasElement, args }) => {
  const buttonElement = canvasElement.querySelector("adc-button-icon");
  const tooltip = canvasElement.querySelector("adc-tooltip");
  const closeTooltipButton = tooltip.shadowRoot.querySelector("adc-button-icon");

  if (args.toggle) {
    // Toggle is enabled

    // 🔧  Assert - Tooltip is NOT showing
    await expect(tooltip).not.toHaveAttribute("showing");

    // 👇 Simulate - Hover over element
    await userEvent.hover(buttonElement);

    // 🔧  Assert - Tooltip is NOT showing
    await expect(tooltip).not.toHaveAttribute("showing");

    // 👇 Simulate - Click element
    await userEvent.click(buttonElement);

    // 🔧  Assert - Tooltip is showing
    await expect(tooltip).toHaveAttribute("showing");

    // 👇 Simulate - Close tooltip
    await userEvent.click(closeTooltipButton);

    // 🔧  Assert - Tooltip is NOT showing
    await expect(tooltip).not.toHaveAttribute("showing");
  } else {
    // Toggle is NOT enabled

    // 🔧  Assert - Tooltip is NOT showing
    await expect(tooltip).not.toHaveAttribute("showing");

    //  Simulate - Hover over element
    await userEvent.hover(buttonElement);

    // 🔧  Assert - Tooltip is showing
    await expect(tooltip).toHaveAttribute("showing");

    // 👇 Simulate - Stop hovering over element
    await userEvent.unhover(buttonElement);

    // 🔧  Assert - Tooltip is NOT showing
    await expect(tooltip).not.toHaveAttribute("showing");
  }
};

const LabelTemplate = (
  { placement, type, heading, content }: Properties = {
    placement: "right",
    type: "",
    heading: "Test Heading",
    content: "Hello Tooltip"
  }
): TemplateResult => {
  return html`
    <adc-button-icon icon="action:show"> </adc-button-icon>
    <adc-tooltip
      heading=${ifDefined(heading)}
      type=${ifDefined(type)}
      placement=${ifDefined(placement)}
    >
      ${content}
    </adc-tooltip>
  `;
};

export const Label = (args?: Properties): TemplateResult => LabelTemplate(args);

Label.args = {
  placement: "bottom",
  type: "label",
  heading: "This is a Heading",
  content: "Hello Tooltip"
};

Label.argTypes = {
  heading: {
    type: {
      name: "heading",
      required: false
    },
    table: {
      type: {
        heading: "string"
      },
      defaultValue: { heading: "This is a test heading" }
    },
    control: { type: "text" }
  },
  content: {
    type: {
      name: "content",
      required: false
    },
    table: {
      type: {
        content: "string"
      },
      defaultValue: { content: "Hello Tooltip" }
    },
    control: { type: "text" }
  }
};
Label.parameters = {
  jest: "tooltip.test.ts"
};
Label.play = async ({ canvasElement }) => {
  const buttonElement = canvasElement.querySelector("adc-button-icon");
  const tooltip = canvasElement.querySelector("adc-tooltip");

  // 🔧  Assert - Tooltip is NOT showing
  await expect(tooltip).not.toHaveAttribute("showing");

  // 👇 Simulate - Hover over element
  await userEvent.hover(buttonElement);

  // 🔧  Assert - Tooltip is showing
  await expect(tooltip).toHaveAttribute("showing");

  // 👇 Simulate - Stop hovering over element
  await userEvent.unhover(buttonElement);

  // 🔧  Assert - Tooltip is NOT showing
  await expect(tooltip).not.toHaveAttribute("showing");
};
