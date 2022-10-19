import "@aileron/accordion";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "Components/Accordion",
  component: "adc-accordion-item",
  args: {
    open: false,
    disabled: false,
    "label-position": "right",
    "label-text": "part 3"
  },
  argTypes: {
    "adc-accordion-item-beingtoggled": {
      control: {
        action: "beingtoggled"
      },
      table: { disable: true }
    },
    "adc-accordion-item-toggled": {
      control: {
        action: "closed"
      },
      table: { disable: true }
    },
    open: {
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
    labelPosition: {
      table: { disable: true }
    },
    "label-position": {
      type: {
        name: "text",
        required: false
      },
      options: ["left", "right"],
      table: {
        type: { summary: ['"left"', '"right"'] },
        defaultValue: { summary: '"right"' }
      },
      control: {
        type: "select"
      }
    },
    labelText: {
      table: { disable: true }
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
        defaultValue: { summary: '""' }
      },
      control: { type: "text" }
    },
    label: {
      table: { disable: true },
      control: { disable: true }
    },
    content: {
      table: { disable: true },
      control: { disable: true }
    },
    title: {
      table: { disable: true },
      control: { disable: true }
    },
    expando: {
      table: { disable: true },
      control: { disable: true }
    },
    "expando-icon": {
      table: { disable: true },
      control: { disable: true }
    }
  }
};

const Template = (
  { disabled, open, "label-position": labelPosition, "label-text": labelText } = {
    disabled: false,
    open: false,
    "label-position": "right",
    "label-text": "part 3"
  }
) => {
  return html`
    <adc-accordion>
      <adc-accordion-item
        label-position="${ifDefined(labelPosition)}"
        ?disabled=${disabled}
        label-text="part 1"
        >Consequat amet fugiat in officia sit cillum cupidatat fugiat incididunt reprehenderit minim
        deserunt voluptate mollit. Incididunt non aute pariatur laboris laborum est. Cillum
        adipisicing duis in deserunt anim sit id occaecat in et nisi. Magna sit nostrud officia
        ipsum reprehenderit consequat nulla officia eu ut incididunt. Qui non laboris esse sit
        consectetur nostrud velit labore eu ipsum nisi quis id eu. Fugiat do aute tempor labore et
        laborum deserunt aliquip. Nisi elit id exercitation veniam ex eu proident voluptate
        ipsum.</adc-accordion-item
      >
      <adc-accordion-item
        label-position="${ifDefined(labelPosition)}"
        ?open=${open}
        label-text="part 2"
        >Consequat amet fugiat in officia sit cillum cupidatat fugiat incididunt reprehenderit minim
        deserunt voluptate mollit. Incididunt non aute pariatur laboris laborum est. Cillum
        adipisicing duis in deserunt anim sit id occaecat in et nisi. Magna sit nostrud officia
        ipsum reprehenderit consequat nulla officia eu ut incididunt. Qui non laboris esse sit
        consectetur nostrud velit labore eu ipsum nisi quis id eu. Fugiat do aute tempor labore et
        laborum deserunt aliquip. Nisi elit id exercitation veniam ex eu proident voluptate
        ipsum.</adc-accordion-item
      >
      <adc-accordion-item
        label-position="${ifDefined(labelPosition)}"
        label-text="${ifDefined(labelText)}"
        >Consequat amet fugiat in officia sit cillum cupidatat fugiat incididunt reprehenderit minim
        deserunt voluptate mollit. Incididunt non aute pariatur laboris laborum est. Cillum
        adipisicing duis in deserunt anim sit id occaecat in et nisi. Magna sit nostrud officia
        ipsum reprehenderit consequat nulla officia eu ut incididunt. Qui non laboris esse sit
        consectetur nostrud velit labore eu ipsum nisi quis id eu. Fugiat do aute tempor labore et
        laborum deserunt aliquip. Nisi elit id exercitation veniam ex eu proident voluptate
        ipsum.</adc-accordion-item
      >
    </adc-accordion>
  `;
};

export const Default = (args) => Template(args);

Default.parameters = {
  jest: "accordion.test.ts"
};

Default.play = async ({ canvasElement }) => {
  // Starts querying the component from its root element
  const accordionContainer = canvasElement.querySelector("adc-accordion");
  const allAccordionItems = accordionContainer.querySelectorAll("adc-accordion-item");

  const firstItem = allAccordionItems[0];
  const secondItem = allAccordionItems[1];
  const thirdItem = allAccordionItems[2];

  // 🔧 Assert
  expect(firstItem).not.toHaveAttribute("open");
  expect(secondItem).not.toHaveAttribute("open");
  expect(thirdItem).not.toHaveAttribute("open");

  // 👇 Simulate Click on First dropdown
  await userEvent.click(firstItem.shadowRoot.querySelector("button"));
  // 🔧 Assert
  expect(firstItem).toHaveAttribute("open");
  expect(secondItem).not.toHaveAttribute("open");
  expect(thirdItem).not.toHaveAttribute("open");

  // 👇 Simulate Click on Second dropdown
  await userEvent.click(secondItem.shadowRoot.querySelector("button"));
  // 🔧 Assert
  expect(firstItem).toHaveAttribute("open");
  expect(secondItem).toHaveAttribute("open");
  expect(thirdItem).not.toHaveAttribute("open");

  // 👇 Simulate Click on Third dropdown
  await userEvent.click(thirdItem.shadowRoot.querySelector("button"));
  // 🔧 Assert
  expect(firstItem).toHaveAttribute("open");
  expect(secondItem).toHaveAttribute("open");
  expect(thirdItem).toHaveAttribute("open");

  // 👇 Simulate Click on Third dropdown
  await userEvent.click(thirdItem.shadowRoot.querySelector("button"));
  // 🔧 Assert
  expect(firstItem).toHaveAttribute("open");
  expect(secondItem).toHaveAttribute("open");
  expect(thirdItem).not.toHaveAttribute("open");

  // 👇 Simulate Click on Second dropdown
  await userEvent.click(secondItem.shadowRoot.querySelector("button"));
  // 🔧 Assert
  expect(firstItem).toHaveAttribute("open");
  expect(secondItem).not.toHaveAttribute("open");
  expect(thirdItem).not.toHaveAttribute("open");

  // 👇 Simulate Click on First dropdown
  await userEvent.click(firstItem.shadowRoot.querySelector("button"));
  // 🔧 Assert
  expect(firstItem).not.toHaveAttribute("open");
  expect(secondItem).not.toHaveAttribute("open");
  expect(thirdItem).not.toHaveAttribute("open");
};
