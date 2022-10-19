import "@aileron/notification";
import { expect } from "@storybook/jest";
import { userEvent } from "@storybook/testing-library";
import { html, TemplateResult } from "lit-html";

export default {
  title: "Components/Notification",
  component: "adc-notification",
  parameters: {
    actions: {
      handles: ["adc-expand", "adc-collapse", "adc-close"]
    }
  },
  argTypes: {
    kind: {
      name: "kind",
      type: { name: "string", required: false },
      defaultValue: "information",
      description: "Determines the style of the notification component",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "information" }
      },
      control: {
        type: "select",
        options: ["information", "error", "warning", "success"]
      }
    },
    fullwidth: {
      name: "fullwidth",
      type: { name: "boolean", required: false },
      defaultValue: false,
      description: "Gives the notification full width styling",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" }
      },
      control: {
        type: "boolean"
      }
    },
    content: {
      name: "content",
      type: { name: "string", required: false },
      description: "Default slot text for body content.",
      defaultValue:
        "This is a sample section of body copy that spans more than one line. This was written to show an accurate representation of what this may look like when content is being added to the notification component. If you’re seeing this, thank you for reading. ",
      table: {
        type: { summary: "string" }
      },
      control: {
        type: "text"
      }
    },
    title: {
      name: "title",
      type: { name: "string", required: true },
      defaultValue: "This is an example of a short headline written just for you",
      description: "Header Title for the Notification Component",
      table: {
        type: { summary: "string" }
        // defaultValue: { summary: '' },
      },
      control: {
        type: "text"
      }
    },
    // open: {
    //   name: "open",
    //   type: { name: "boolean", required: false },
    //   defaultValue: false,
    //   description: "This value is controlled by the component, but is available to be set manually",
    //   table: {
    //     type: { summary: "boolean" }
    //   },
    //   control: {
    //     type: "boolean"
    //   }
    // },
    canClose: {
      name: "can-close",
      type: { name: "boolean", required: false },
      defaultValue: false,
      description: "Gives the ability to close and remove the notification from the dom",
      table: {
        type: { summary: "boolean" }
      },
      control: {
        type: "boolean"
      }
    },
    isCollapsible: {
      name: "is-collapsible",
      type: { name: "boolean", required: false },
      defaultValue: false,
      description: "Gives collapse/expand functionality",
      table: {
        type: { summary: "boolean" }
      },
      control: {
        type: "boolean"
      }
    }
  }
};

type Properties = {
  title?: string;
  kind?: string;
  canClose?: boolean;
  fullwidth?: boolean;
  content?: String;
  isCollapsible?: boolean;
};

const Template = ({
  title,
  kind,
  canClose,
  fullwidth,
  content,
  isCollapsible
}: Properties): TemplateResult => {
  return html`
    <adc-notification
      kind=${kind}
      ?fullwidth=${fullwidth}
      title=${title}
      ?can-close=${canClose}
      ?is-collapsible=${isCollapsible}
    >
      ${content}

      <a slot="link" target="_blank" href="https://www.google.com">Make sure to go here!</a>

      <a slot="link" target="_blank" href="https://www.google.com">Read important facts here.</a>
    </adc-notification>
  `;
};

export const Default = (argTypes?: Properties): TemplateResult => Template(argTypes);

Default.parameters = {
  jest: "notification.test.ts"
};

const NoLinkTemplate = ({
  title,
  kind,
  canClose,
  fullwidth,
  content,
  isCollapsible
}: Properties): TemplateResult => {
  return html`
    <adc-notification
      kind=${kind}
      ?fullwidth=${fullwidth}
      title=${title}
      ?can-close=${canClose}
      ?is-collapsible=${isCollapsible}
    >
      ${content}
    </adc-notification>
  `;
};

export const NoLinkNotification = (argTypes?: Properties): TemplateResult =>
  NoLinkTemplate(argTypes);

const OnlyTitleTemplate = ({
  title,
  kind,
  canClose,
  fullwidth,
  content,
  isCollapsible
}: Properties): TemplateResult => {
  return html`
    <adc-notification
      kind=${kind}
      ?fullwidth=${fullwidth}
      title=${title}
      ?can-close=${canClose}
      ?is-collapsible=${isCollapsible}
    >
      ${content}
    </adc-notification>
  `;
};

NoLinkNotification.parameters = {
  jest: "notification.test.ts"
};

export const OnlyTitle = (argTypes?: Properties): TemplateResult =>
  OnlyTitleTemplate({ ...argTypes });

OnlyTitle.argTypes = {
  content: {
    name: "content",
    type: { name: "string", required: false },
    description: "Default slot text for body content.",
    defaultValue: "",
    table: {
      type: { summary: "string" }
    },
    control: {
      type: "text"
    }
  }
};

OnlyTitle.parameters = {
  jest: "notification.test.ts"
};

Default.play = async ({ canvasElement, args, ...props }) => {
  const mainContent = canvasElement.querySelector("#main-content");
  const notification = canvasElement.querySelector("adc-notification");
  const collapseExpandButton = notification.shadowRoot.querySelector("#collapse-expand");
  const contentWrapper = notification.shadowRoot.querySelector(
    ".adc-notification__content-wrapper"
  );
  const collapseButton = notification.shadowRoot.querySelector("#collapse-button");
  const dismissButton = notification.shadowRoot.querySelector("#dismiss-button");
  const closeIcon = notification.shadowRoot.querySelector("#closeNotification");

  // 🔧 Assert - Component is found
  await expect(notification).toBeInTheDocument();

  if (args.isCollapsible) {
    // 🔧 Assert - Dialog should be closed
    await expect(contentWrapper.hasAttribute("open")).toBe(false);

    // 👇 Simulate - Click Expand/Collapse button
    await userEvent.click(collapseExpandButton);

    // 🔧 Assert - Dialog should be open
    await expect(contentWrapper.hasAttribute("open")).toBe(true);

    // 👇 Simulate - Click Expand/Collapse button
    await userEvent.click(collapseExpandButton);

    // 🔧 Assert - Dialog should be closed
    await expect(contentWrapper.hasAttribute("open")).toBe(false);

    // 👇 Simulate - Click Expand/Collapse button
    await userEvent.click(collapseExpandButton);

    // 🔧 Assert - Dialog should be open
    await expect(contentWrapper.hasAttribute("open")).toBe(true);

    // 👇 Simulate - Click Expand/Collapse button
    await userEvent.click(collapseButton);

    // 🔧 Assert - Dialog should be closed
    await expect(contentWrapper.hasAttribute("open")).toBe(false);

    // 👇 Simulate - Click Expand/Collapse button
    await userEvent.click(collapseExpandButton);

    // 🔧 Assert - Dialog should be open
    await expect(contentWrapper.hasAttribute("open")).toBe(true);

    if (args.canClose) {
      // 👇 Simulate - Click dismiss Button
      await userEvent.click(dismissButton);

      // 🔧 Assert - Component is NOT found
      await expect(notification).not.toBeInTheDocument();

      // Place element back into DOM
      mainContent.append(notification);
    }
    // 👇 Simulate - Click Expand/Collapse button
    await userEvent.click(collapseExpandButton);

    // 🔧 Assert - Dialog should be closed
    await expect(contentWrapper.hasAttribute("open")).toBe(false);
  } else {
    if (args.canClose) {
      // 👇 Simulate - Click dismiss Button
      await userEvent.click(closeIcon);

      // 🔧 Assert - Component is NOT found
      await expect(notification).not.toBeInTheDocument();

      // Place element back into DOM
      mainContent.append(notification);
    }
  }
};
