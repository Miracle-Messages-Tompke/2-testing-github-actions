import "@aileron/checkbox";
import { expect } from "@storybook/jest";
import { userEvent } from "@storybook/testing-library";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

export default {
  title: "Forms/Checkbox",
  component: "adc-checkbox",
  args: {
    checked: false,
    disabled: false,
    "hide-label": false,
    indeterminate: false,
    name: "checkbox",
    value: "checkbox-value",
    "label-text": "Checkbox Label",
    "label-position": "right"
  }
};

const Template = (
  {
    checked,
    disabled,
    "hide-label": hideLabel,
    indeterminate,
    name,
    "label-position": labelPosition,
    "label-text": labelText,
    value
  } = {
    checked: false,
    disabled: false,
    "hide-label": false,
    indeterminate: false,
    name: "",
    value: "",
    "label-text": "",
    "label-position": "right"
  }
) => {
  return html`
    <adc-checkbox
      ?checked="${checked}"
      ?disabled=${disabled}
      ?hide-label="${hideLabel}"
      ?indeterminate="${indeterminate}"
      label-position="${ifDefined(labelPosition)}"
      label-text="${ifDefined(labelText)}"
      name="${ifDefined(name)}"
      value="${ifDefined(value)}"
    ></adc-checkbox>
  `;
};

export const Default = (args) => Template(args);
Default.parameters = {
  docs: {
    source: {
      code: '<adc-checkbox name="checkbox" value="false" label-text="Checkbox Label" />'
    }
  },
  jest: "checkbox.test.ts"
};

Default.play = async ({ canvasElement }) => {
  const checkboxContainer = canvasElement.querySelector("adc-checkbox");
  const checkbox = checkboxContainer.shadowRoot
    .querySelector(".adc-checkbox__label")
    .querySelector("input");

  // 🔧  Assert - Unchecked
  await expect(checkboxContainer).not.toHaveAttribute("checked");

  // 👇 Simulate - Click checkbox
  await userEvent.click(checkbox);

  // 🔧  Assert - Checked
  await expect(checkboxContainer).toHaveAttribute("checked");

  // 👇 Simulate - Click checkbox
  await userEvent.click(checkbox);

  // 🔧  Assert - Unchecked
  await expect(checkboxContainer).not.toHaveAttribute("checked");
};

export const Group = () => {
  return html`
    <adc-checkbox-group label-text="Checkbox Group Label">
      <adc-checkbox
        name="checkboxOne"
        value="checkbox_01"
        label-text="Checkbox Label One"
      ></adc-checkbox>
      <adc-checkbox
        name="checkboxTwo"
        value="checkbox_02"
        label-text="Checkbox Label Two"
      ></adc-checkbox>
    </adc-checkbox-group>
  `;
};
Group.parameters = {
  docs: {
    source: {
      code: '<adc-checkbox name="checkbox" value="false" label-text="Checkbox Label" />'
    }
  },
  jest: "checkbox.test.ts"
};

Group.play = async ({ canvasElement }) => {
  const allCheckboxContainer = canvasElement.querySelectorAll("adc-checkbox");

  const checkboxContainer1 = allCheckboxContainer[0];
  const checkbox1 = checkboxContainer1.shadowRoot
    .querySelector(".adc-checkbox__label")
    .querySelector("input");

  const checkboxContainer2 = allCheckboxContainer[1];
  const checkbox2 = checkboxContainer2.shadowRoot
    .querySelector(".adc-checkbox__label")
    .querySelector("input");

  // 🔧  Assert - All Unchecked
  await expect(checkboxContainer1).not.toHaveAttribute("checked");
  await expect(checkboxContainer2).not.toHaveAttribute("checked");

  // 👇 Simulate - Click checkbox1
  await userEvent.click(checkbox1);

  // 🔧  Assert - Checkbox 1 checked
  await expect(checkboxContainer1).toHaveAttribute("checked");
  await expect(checkboxContainer2).not.toHaveAttribute("checked");

  // 👇 Simulate - Click checkbox2
  await userEvent.click(checkbox2);

  // 🔧  Assert - All Checked
  await expect(checkboxContainer1).toHaveAttribute("checked");
  await expect(checkboxContainer2).toHaveAttribute("checked");

  // 👇 Simulate - Click checkbox1
  await userEvent.click(checkbox1);

  // 🔧  Assert - Checkbox 2 checked
  await expect(checkboxContainer1).not.toHaveAttribute("checked");
  await expect(checkboxContainer2).toHaveAttribute("checked");

  // 👇 Simulate - Click checkbox2
  await userEvent.click(checkbox2);

  // 🔧  Assert - All Unchecked
  await expect(checkboxContainer1).not.toHaveAttribute("checked");
  await expect(checkboxContainer2).not.toHaveAttribute("checked");
};
