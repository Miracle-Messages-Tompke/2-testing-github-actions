/* eslint-disable lit-a11y/no-autofocus */

import "@aileron/button";
import "@aileron/dialog";
import "@aileron/text-input";
import { html } from "lit-html";
import { userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "Components/Dialog",
  parameters: {
    component: "adc-dialog",
    actions: {
      handles: [
        "adc-request-close",
        "adc-after-hide",
        "adc-after-show",
        "adc-initial-focus",
        "adc-hide",
        "adc-show"
      ]
    }
  },
  args: {
    variant: "message",
    open: false,
    "no-close-button": false,
    "label-text": "Dialog Title"
  },
  argTypes: {
    variant: {
      type: {
        name: "string",
        required: false
      },
      options: ["message", "fullscreen"],
      control: {
        type: "select"
      }
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
    noCloseButton: {
      table: { disable: true },
      control: { disable: true }
    },
    "no-close-button": {
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

const Template = (
  { open, variant, "no-close-button": noCloseButton, "label-text": labelText, handleClose } = {
    open: false,
    variant: "message",
    "label-text": "Dialog Title",
    "no-close-button": false,
    handleClose: () => {}
  }
) => {
  const handleClick = () => {
    const dialog = document.querySelector(".dialog-container");

    dialog.show();
  };

  const handleClickOnClose = () => {
    const dialog = document.querySelector(".dialog-container");

    dialog.hide();
  };

  return html`
    <adc-dialog
      id="dialog"
      label-text=${labelText}
      variant=${variant}
      ?no-close-button=${noCloseButton}
      class="dialog-container"
      ?open=${open}
      @adc-request-close=${handleClose}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
      <adc-button slot="footer" @click=${handleClickOnClose}>Cancel</adc-button>
    </adc-dialog>
    <adc-button id="button" @click=${handleClick}>Open Dialog</adc-button>
  `;
};

export const Default = (args) => Template(args);
Default.storyName = "Default";
Default.parameters = {
  jest: "dialog.test.ts"
};

Default.play = async ({ canvasElement, args }) => {
  const overlayElement = canvasElement
    .querySelector("adc-dialog")
    .shadowRoot.querySelector(".dialog__overlay");
  const button = canvasElement.querySelector('adc-button[id="button"]');
  const footerButton = canvasElement.querySelector('adc-button[slot="footer"]');
  const dialog = canvasElement.querySelector("adc-dialog");

  // Modal will start open if the "open" argument is set to true
  if (!args.open) {
    // 🔧 Assert - Dialog should be closed
    await expect(dialog).not.toHaveAttribute("open");

    // 👇 Simulate - Click Open Dialog button
    await userEvent.click(button);
  }

  // 🔧 Assert - Dialog should be open
  await expect(dialog).toHaveAttribute("open");

  // 👇 Simulate - Click overlayElement (cancel)
  await userEvent.click(overlayElement);

  // 🔧 Assert - Dialog should not be open
  await expect(dialog).not.toHaveAttribute("open");

  // 👇 Simulate - Click Open Dialog button
  await userEvent.click(button);

  // 🔧 Assert - Dialog should be open
  await expect(dialog).toHaveAttribute("open");

  // 👇 Simulate - Click Footer Button (cancel)
  await userEvent.click(footerButton);

  // 🔧 Assert - Dialog should be closed
  await expect(dialog).not.toHaveAttribute("open");

  // Modal will only be able to close if the "no-close-button" is false and the "label-text" is greater than 0 length
  if (!args["no-close-button"] && args["label-text"].length >= 1) {
    const closeButton = canvasElement
      .querySelector("adc-dialog")
      .shadowRoot.querySelector("adc-button-icon")
      .shadowRoot.querySelector("button");

    // 👇 Simulate - Click Open Dialog button
    await userEvent.click(button);

    // 🔧 Assert - Dialog should be open
    await expect(dialog).toHaveAttribute("open");

    // 👇 Simulate - Click Close button (x)
    await userEvent.click(closeButton);

    // 🔧 Assert - Dialog should be closed
    await expect(dialog).not.toHaveAttribute("open");
  }
};

export const NoHeading = (args) => Template(args);
NoHeading.storyName = "Shows dialog without heading";
NoHeading.args = { "label-text": "" };
NoHeading.parameters = {
  jest: "dialog.test.ts"
};

NoHeading.play = async ({ canvasElement, args }) => {
  const overlayElement = canvasElement
    .querySelector("adc-dialog")
    .shadowRoot.querySelector(".dialog__overlay");
  const button = canvasElement.querySelector('adc-button[id="button"]');
  const footerButton = canvasElement.querySelector('adc-button[slot="footer"]');
  const dialog = canvasElement.querySelector("adc-dialog");

  // Modal will start open if the "open" argument is set to true
  if (!args.open) {
    // 🔧 Assert - Dialog should be closed
    await expect(dialog).not.toHaveAttribute("open");

    // 👇 Simulate - Click Open Dialog button
    await userEvent.click(button);
  }

  // 🔧 Assert - Dialog should be open
  await expect(dialog).toHaveAttribute("open");

  // 👇 Simulate - Click overlayElement (cancel)
  await userEvent.click(overlayElement);

  // 🔧 Assert - Dialog should not be open
  await expect(dialog).not.toHaveAttribute("open");

  // 👇 Simulate - Click Open Dialog button
  await userEvent.click(button);

  // 🔧 Assert - Dialog should be open
  await expect(dialog).toHaveAttribute("open");

  // 👇 Simulate - Click Footer Button (cancel)
  await userEvent.click(footerButton);

  // 🔧 Assert - Dialog should be closed
  await expect(dialog).not.toHaveAttribute("open");

  // Modal will only be able to close if the "no-close-button" is false and the "label-text" is greater than 0 length
  if (!args["no-close-button"] && args["label-text"].length >= 1) {
    const closeButton = canvasElement
      .querySelector("adc-dialog")
      .shadowRoot.querySelector("adc-button-icon")
      .shadowRoot.querySelector("button");

    // 👇 Simulate - Click Open Dialog button
    await userEvent.click(button);

    // 🔧 Assert - Dialog should be open
    await expect(dialog).toHaveAttribute("open");

    // 👇 Simulate - Click Close button (x)
    await userEvent.click(closeButton);

    // 🔧 Assert - Dialog should be closed
    await expect(dialog).not.toHaveAttribute("open");
  }
};
const handleCloseFunction = (event) => {
  event.preventDefault();
};
export const Closing = (args) => Template(args);
Closing.args = {
  handleClose: handleCloseFunction
};
Closing.storyName = "Preventing the dialog from closing";
Closing.parameters = {
  jest: "dialog.test.ts"
};

Closing.play = async ({ canvasElement, args }) => {
  const overlayElement = canvasElement
    .querySelector("adc-dialog")
    .shadowRoot.querySelector(".dialog__overlay");
  const button = canvasElement.querySelector('adc-button[id="button"]');
  const footerButton = canvasElement.querySelector('adc-button[slot="footer"]');
  const dialog = canvasElement.querySelector("adc-dialog");

  // Modal will start open if the "open" argument is set to true
  if (!args.open) {
    // 🔧 Assert - Dialog should be closed
    await expect(dialog).not.toHaveAttribute("open");

    // 👇 Simulate - Click Open Dialog button
    await userEvent.click(button);
  }

  // 🔧 Assert - Dialog should be open
  await expect(dialog).toHaveAttribute("open");

  // Overlay & Close button are prevented
  if (args.handleClose === handleCloseFunction) {
    // 👇 Simulate - Click overlayElement (cancel)
    await userEvent.click(overlayElement);

    // 🔧 Assert - Dialog should still be open
    await expect(dialog).toHaveAttribute("open");

    // Overlay & Close button are NOT prevented
  } else {
    // 👇 Simulate - Click overlayElement (cancel)
    await userEvent.click(overlayElement);

    // 🔧 Assert - Dialog should not be open
    await expect(dialog).not.toHaveAttribute("open");

    // 👇 Simulate - Click Open Dialog button
    await userEvent.click(button);

    // 🔧 Assert - Dialog should be open
    await expect(dialog).toHaveAttribute("open");
  }

  // 👇 Simulate - Click Footer Button (cancel)
  await userEvent.click(footerButton);

  // 🔧 Assert - Dialog should be closed
  await expect(dialog).not.toHaveAttribute("open");

  // Modal will only be able to close if the "no-close-button" is false and the "label-text" is greater than 0 length
  if (!args["no-close-button"] && args["label-text"].length >= 1) {
    const closeButton = canvasElement
      .querySelector("adc-dialog")
      .shadowRoot.querySelector("adc-button-icon")
      .shadowRoot.querySelector("button");

    // 👇 Simulate - Click Open Dialog button
    await userEvent.click(button);

    // 🔧 Assert - Dialog should be open
    await expect(dialog).toHaveAttribute("open");

    // Overlay & Close button are prevented
    if (args.handleClose === handleCloseFunction) {
      // 👇 Simulate - Click Close button (x)
      await userEvent.click(closeButton);

      // 🔧 Assert - Dialog should be open
      await expect(dialog).toHaveAttribute("open");

      // 👇 Simulate - Click Footer Button (cancel)
      await userEvent.click(footerButton);

      // 🔧 Assert - Dialog should be closed
      await expect(dialog).not.toHaveAttribute("open");

      // Overlay & Close button are NOT prevented
    } else {
      // 👇 Simulate - Click Close button (x)
      await userEvent.click(closeButton);

      // 🔧 Assert - Dialog should be closed
      await expect(dialog).not.toHaveAttribute("open");
    }
  }
};

export const Scrolling = (
  { open, variant, "no-close-button": noCloseButton, "label-text": labelText, handleClose } = {
    open: false,
    variant: "message",
    "label-text": "Dialog Title",
    "no-close-button": true,
    handleClose: () => {}
  }
) => {
  const handleClick = () => {
    const dialog = document.querySelector(".dialog-container");

    dialog.show();
  };

  const handleClickOnClose = () => {
    const dialog = document.querySelector(".dialog-container");

    dialog.hide();
  };

  return html`
    <adc-dialog
      id="dialog"
      label-text=${labelText}
      variant=${variant}
      ?no-close-button=${noCloseButton}
      class="dialog-container"
      ?open=${open}
      @adc-request-close=${handleClose}
    >
      <div style="height: 150vh;">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <adc-button slot="footer" @click=${handleClickOnClose}>Cancel</adc-button>
    </adc-dialog>
    <adc-button id="button" @click=${handleClick}>Open Dialog</adc-button>
  `;
};
Scrolling.parameters = {
  jest: "dialog.test.ts"
};

Scrolling.play = async ({ canvasElement, args }) => {
  const overlayElement = canvasElement
    .querySelector("adc-dialog")
    .shadowRoot.querySelector(".dialog__overlay");
  const button = canvasElement.querySelector('adc-button[id="button"]');
  const footerButton = canvasElement.querySelector('adc-button[slot="footer"]');
  const dialog = canvasElement.querySelector("adc-dialog");

  // Modal will start open if the "open" argument is set to true
  if (!args.open) {
    // 🔧 Assert - Dialog should be closed
    await expect(dialog).not.toHaveAttribute("open");

    // 👇 Simulate - Click Open Dialog button
    await userEvent.click(button);
  }

  // 🔧 Assert - Dialog should be open
  await expect(dialog).toHaveAttribute("open");

  // 👇 Simulate - Click overlayElement (cancel)
  await userEvent.click(overlayElement);

  // 🔧 Assert - Dialog should not be open
  await expect(dialog).not.toHaveAttribute("open");

  // 👇 Simulate - Click Open Dialog button
  await userEvent.click(button);

  // 🔧 Assert - Dialog should be open
  await expect(dialog).toHaveAttribute("open");

  // 👇 Simulate - Click Footer Button (cancel)
  await userEvent.click(footerButton);

  // 🔧 Assert - Dialog should be closed
  await expect(dialog).not.toHaveAttribute("open");

  // Modal will only be able to close if the "no-close-button" is false and the "label-text" is greater than 0 length
  if (!args["no-close-button"] && args["label-text"].length >= 1) {
    const closeButton = canvasElement
      .querySelector("adc-dialog")
      .shadowRoot.querySelector("adc-button-icon")
      .shadowRoot.querySelector("button");

    // 👇 Simulate - Click Open Dialog button
    await userEvent.click(button);

    // 🔧 Assert - Dialog should be open
    await expect(dialog).toHaveAttribute("open");

    // 👇 Simulate - Click Close button (x)
    await userEvent.click(closeButton);

    // 🔧 Assert - Dialog should be closed
    await expect(dialog).not.toHaveAttribute("open");
  }
};

export const AutoFocus = (
  { open, variant, "no-close-button": noCloseButton, "label-text": labelText, handleClose } = {
    open: false,
    variant: "message",
    "label-text": "Dialog Title",
    "no-close-button": true,
    handleClose: () => {}
  }
) => {
  const handleClick = () => {
    const dialog = document.querySelector(".dialog-container");

    dialog.show();
  };

  const handleClickOnClose = () => {
    const dialog = document.querySelector(".dialog-container");

    dialog.hide();
  };

  return html`
    <adc-dialog
      id="dialog"
      label-text=${labelText}
      variant=${variant}
      ?no-close-button=${noCloseButton}
      class="dialog-container"
      ?open=${open}
      @adc-request-close=${handleClose}
    >
      <adc-text-input
        autofocus
        placeholder="I will have focus when the dialog is opened"
        label-text="Label"
      ></adc-text-input>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
      <adc-button slot="footer" @click=${handleClickOnClose}>Cancel</adc-button>
    </adc-dialog>
    <adc-button id="button" @click=${handleClick}>Open Dialog</adc-button>
  `;
};
AutoFocus.storyName = "Customizing Initial Focus";
AutoFocus.parameters = {
  jest: "dialog.test.ts"
};

AutoFocus.play = async ({ canvasElement, args }) => {
  const overlayElement = canvasElement
    .querySelector("adc-dialog")
    .shadowRoot.querySelector(".dialog__overlay");
  const button = canvasElement.querySelector('adc-button[id="button"]');
  const footerButton = canvasElement.querySelector('adc-button[slot="footer"]');
  const dialog = canvasElement.querySelector("adc-dialog");
  const textInputContainer = canvasElement
    .querySelector("adc-text-input")
    .shadowRoot.querySelector(".adc-text-input--container");
  const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // Modal will start open if the "open" argument is set to true
  if (!args.open) {
    // 🔧 Assert - Dialog should be closed
    await expect(dialog).not.toHaveAttribute("open");

    // 👇 Simulate - Click Open Dialog button
    await userEvent.click(button);
  }

  // 🔧 Assert - Dialog should be open
  await expect(dialog).toHaveAttribute("open");

  // 🔧 Assert - Text Input is focused on open
  await timeout(500);
  await expect(
    canvasElement
      .querySelector("adc-text-input")
      .shadowRoot.querySelector(".adc-text-input--container")
  ).toHaveClass("adc-text-input--focused");

  // 👇 Simulate - Click overlayElement (cancel)
  await userEvent.click(overlayElement);

  // 🔧 Assert - Dialog should not be open
  await expect(dialog).not.toHaveAttribute("open");

  // 👇 Simulate - Click Open Dialog button
  await userEvent.click(button);

  // 🔧 Assert - Dialog should be open
  await expect(dialog).toHaveAttribute("open");

  // 👇 Simulate - Click Footer Button (cancel)
  await userEvent.click(footerButton);

  // 🔧 Assert - Dialog should be closed
  await expect(dialog).not.toHaveAttribute("open");

  // Modal will only be able to close if the "no-close-button" is false and the "label-text" is greater than 0 length
  if (!args["no-close-button"] && args["label-text"].length >= 1) {
    const closeButton = canvasElement
      .querySelector("adc-dialog")
      .shadowRoot.querySelector("adc-button-icon")
      .shadowRoot.querySelector("button");

    // 👇 Simulate - Click Open Dialog button
    await userEvent.click(button);

    // 🔧 Assert - Dialog should be open
    await expect(dialog).toHaveAttribute("open");

    // 👇 Simulate - Click Close button (x)
    await userEvent.click(closeButton);

    // 🔧 Assert - Dialog should be closed
    await expect(dialog).not.toHaveAttribute("open");
  }
};
