import "@aileron/action-drawer";
import "@aileron/button";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "Components/Action Drawer",
  component: "adc-action-drawer",
  args: {
    "drawer-position": "",
    open: false,
    transactional: false
  },
  argTypes: {
    drawerPosition: {
      table: { disable: true }
    },
    "drawer-position": {
      type: {
        name: "text",
        required: false
      },
      options: ["left", "right"],
      table: {
        type: { summary: ['"left"', '"right"'] },
        defaultValue: { summary: "" }
      },
      control: {
        type: "select"
      }
    },
    styles: {
      table: { disable: true },
      control: { disable: true }
    },
    containerClass: {
      table: { disable: true },
      control: { disable: true }
    },
    "adc-action-drawer-beingclosed": {
      table: { disable: true },
      control: { disable: true }
    },
    "adc-action-drawer-closed": {
      table: { disable: true },
      control: { disable: true }
    },
    "container-class": {
      table: { disable: true },
      control: { disable: true }
    }
  }
};

const PassiveDrawer = (
  { open, transactional, "drawer-position": drawerPosition } = {
    open: false,
    transactional: false,
    "drawer-position": ""
  }
) => {
  const handleOpen = () => {
    const drawer = document.getElementById("actiondrawer");

    drawer.open = true;
  };

  return html`
    <adc-button @click=${handleOpen}>Open Action Drawer</adc-button>
    <adc-action-drawer
      id="actiondrawer"
      ?open="${open}"
      ?transactional="${transactional}"
      drawer-position="${ifDefined(drawerPosition)}"
    >
      <adc-action-drawer-header>
        <adc-action-drawer-close-button></adc-action-drawer-close-button>
        <adc-action-drawer-heading>Heading</adc-action-drawer-heading>
      </adc-action-drawer-header>
      <adc-action-drawer-body>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </adc-action-drawer-body>
    </adc-action-drawer>
  `;
};

export const Passive = (args) => PassiveDrawer(args);

Passive.parameters = {
  jest: "action-drawer.test.ts"
};

Passive.play = async ({ canvasElement }) => {
  const drawerButton = canvasElement.querySelector("adc-button").shadowRoot.querySelector("button");
  const actionDrawer = canvasElement.querySelector("adc-action-drawer");
  const actionDrawerHeader = canvasElement.querySelector("adc-action-drawer-header");

  // 🔧  Asser - Drawer should be closed
  await expect(actionDrawer).not.toHaveAttribute("open");

  // 👇 Simulate - button click
  await userEvent.click(drawerButton);

  // 🔧 Assert - Drawer should be opened
  expect(actionDrawer).toHaveAttribute("open");

  // 👇 Simulate - close button
  const closeButton = actionDrawerHeader
    .querySelector("adc-action-drawer-close-button")
    .shadowRoot.querySelector(".adc-action-drawer__close");
  await userEvent.click(closeButton);

  // 🔧 Assert - Drawer should be closed
  expect(actionDrawer).not.toHaveAttribute("open");

  // 👇 Simulate - button click open drawer
  await userEvent.click(drawerButton);

  // 🔧 Assert - Drawer should be open
  expect(actionDrawer).toHaveAttribute("open");

  // 👇 Simulate - Escape key pressed
  await userEvent.keyboard("{esc}");

  // 🔧 Assert - Drawer should be closed
  expect(actionDrawer).not.toHaveAttribute("open");
};

const TransactionalDrawer = (
  { open, "drawer-position": drawerPosition } = {
    open: false,
    transactional: true,
    "drawer-position": ""
  }
) => {
  const handleOpen = () => {
    const drawer = document.getElementById("actiondrawer");

    drawer.open = true;
  };

  return html`
    <adc-button @click=${handleOpen}>Open Action Drawer</adc-button>
    <adc-action-drawer
      id="actiondrawer"
      ?open="${open}"
      transactional
      drawer-position="${ifDefined(drawerPosition)}"
    >
      <adc-action-drawer-header>
        <adc-action-drawer-close-button></adc-action-drawer-close-button>
        <adc-action-drawer-heading>Heading</adc-action-drawer-heading>
      </adc-action-drawer-header>
      <adc-action-drawer-body>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </adc-action-drawer-body>
      <adc-action-drawer-footer>
        <adc-button
          kind="secondary"
          position="left"
          size="fullwidth"
          style="margin-right: 16px; margin-top: 16px;"
          >Button</adc-button
        >
        <adc-button
          kind="primary"
          position="right"
          size="fullwidth"
          style="margin-top: 16px;"
          data-action-drawer-close
          >Button</adc-button
        >
      </adc-action-drawer-footer>
    </adc-action-drawer>
  `;
};

TransactionalDrawer.args = {
  transactional: true
};

export const Transactional = (args) => TransactionalDrawer(args);

Transactional.parameters = {
  jest: "action-drawer.test.ts"
};

Transactional.play = async ({ canvasElement }) => {
  const drawerButton = canvasElement.querySelector("adc-button").shadowRoot.querySelector("button");
  const actionDrawer = canvasElement.querySelector("adc-action-drawer");
  const actionDrawerHeader = canvasElement.querySelector("adc-action-drawer-header");
  const primaryButton = canvasElement.querySelector("adc-button[data-action-drawer-close]");
  const secondaryButton = canvasElement
    .querySelector("adc-action-drawer-footer")
    .querySelector('adc-button[kind="secondary"]');

  // 🔧  Assert - Drawer should be closed
  await expect(actionDrawer).not.toHaveAttribute("open");

  // 👇 Simulate - button click open drawer
  await userEvent.click(drawerButton);

  // 🔧 Assert - Drawer should be opened
  expect(actionDrawer).toHaveAttribute("open");

  // 👇 Simulate - close button
  const closeButton = actionDrawerHeader
    .querySelector("adc-action-drawer-close-button")
    .shadowRoot.querySelector(".adc-action-drawer__close");
  await userEvent.click(closeButton);

  // 🔧 Assert - Drawer should be closed
  expect(actionDrawer).not.toHaveAttribute("open");

  // 👇 Simulate - button click open drawer
  await userEvent.click(drawerButton);

  // 🔧 Assert - Drawer should be open
  expect(actionDrawer).toHaveAttribute("open");

  // 👇 Simulate - Footer Primary Close Button
  await userEvent.click(primaryButton);

  // 🔧 Assert - Drawer should be closed
  expect(actionDrawer).not.toHaveAttribute("open");

  // 👇 Simulate - button click open drawer
  await userEvent.click(drawerButton);

  // 🔧 Assert - Drawer should be open
  expect(actionDrawer).toHaveAttribute("open");

  // 👇 Simulate - Escape key pressed
  await userEvent.keyboard("{esc}");

  // 🔧 Assert - Drawer should be closed
  expect(actionDrawer).not.toHaveAttribute("open");

  // 👇 Simulate - button click open drawer
  await userEvent.click(drawerButton);

  // 🔧 Assert - Drawer should be open
  expect(actionDrawer).toHaveAttribute("open");

  // 👇 Simulate - Secondadry Footer button pressed (drawer stays open)
  await userEvent.click(secondaryButton);

  // 🔧 Assert - Drawer should be open
  expect(actionDrawer).toHaveAttribute("open");
};
