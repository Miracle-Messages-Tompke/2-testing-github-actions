import "@aileron/text-input";
import { expect } from "@storybook/jest";
import { userEvent } from "@storybook/testing-library";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

export default {
  title: "Forms/Text Input",
  component: "adc-text-input",
  parameters: {
    actions: {
      handles: ["adc-change", "adc-input", "adc-focus", "adc-blur", "adc-clear"]
    }
  },
  args: {
    autocomplete: "off",
    autofocus: false,
    disabled: false,
    labelText: "Label",
    name: "input",
    type: "text",
    invalid: false,
    helperText: "Helper text",
    "live-validation": true,
    validityMessage: "Validity message",
    value: "",
    placeholder: "Placeholder",
    readonly: false,
    required: false,
    spellcheck: false
  },
  argTypes: {
    onInput: { action: "input", table: { disable: true } }
  }
};

const Template = (
  {
    autocomplete,
    autofocus,
    disabled,
    helperText,
    labelText,
    name,
    readonly,
    required,
    spellcheck,
    placeholder,
    type,
    invalid,
    "live-validation": liveValidation,
    validityMessage,
    value,
    onInput
  } = {
    autocomplete: "off",
    autofocus: false,
    disabled: false,
    helperText: "",
    labelText: "Label",
    name: "input",
    invalid: false,
    placeholder: "Placeholder",
    readonly: false,
    required: true,
    spellcheck: false,
    type: "text",
    "live-validation": true,
    validityMessage: "Validity message",
    value: "",
    onInput: () => {}
  }
) => html`
  <form>
    <adc-text-input
      autocomplete="${ifDefined(autocomplete)}"
      ?autofocus="${autofocus}"
      ?disabled="${disabled}"
      helper-text="${ifDefined(helperText)}"
      label-text="${ifDefined(labelText)}"
      name="${ifDefined(name)}"
      placeholder="${ifDefined(placeholder)}"
      ?invalid=${invalid}
      ?readOnly="${readonly}"
      ?required="${required}"
      ?spellcheck=${spellcheck}
      ?live-validation=${liveValidation}
      type="${ifDefined(type)}"
      validity-message="${ifDefined(validityMessage)}"
      value="${ifDefined(value)}"
      @input="${onInput}"
    ></adc-text-input>
  </form>
`;

export const Default = (args) => Template(args);
Default.args = {
  required: true
};
Default.parameters = {
  docs: {
    source: {
      code: '<adc-text-input name="input" placeholder="Placeholder" label-text="label" helper-text="Helper text" validity-message="Validity message"></adc-text-input>'
    }
  },
  jest: "text-input.test.ts"
};
Default.play = async ({ canvasElement }) => {
  const inputContainer = canvasElement.querySelector("adc-text-input");
  const input = inputContainer.shadowRoot
    .querySelector(".adc-text-input--container")
    .querySelector("input");

  // 🔧  Assert - Input field is empty
  await expect(input.value).toBe("");

  // 👇 Simulate - Type in Date
  await userEvent.type(input, "Testing this component");

  // 🔧  Assert - Input field has correct text
  await expect(input.value).toBe("Testing this component");
};

const TemplateWithButtonIcon = (
  {
    autocomplete,
    autofocus,
    disabled,
    helperText,
    labelText,
    name,
    readonly,
    required,
    spellcheck,
    placeholder,
    type,
    invalid,
    "live-validation": liveValidation,
    validityMessage,
    value,
    onInput
  } = {
    autocomplete: "off",
    autofocus: false,
    disabled: false,
    helperText: "",
    labelText: "Label",
    name: "input",
    invalid: false,
    placeholder: "Placeholder",
    readonly: false,
    required: true,
    spellcheck: false,
    type: "text",
    "live-validation": true,
    validityMessage: "Validity message",
    value: "",
    onInput: () => {}
  }
) => html`
  <form>
    <adc-text-input
      autocomplete="${ifDefined(autocomplete)}"
      ?autofocus="${autofocus}"
      ?disabled="${disabled}"
      helper-text="${ifDefined(helperText)}"
      label-text="${ifDefined(labelText)}"
      name="${ifDefined(name)}"
      placeholder="${ifDefined(placeholder)}"
      ?invalid=${invalid}
      ?readOnly="${readonly}"
      ?required="${required}"
      ?spellcheck=${spellcheck}
      ?live-validation=${liveValidation}
      type="${ifDefined(type)}"
      validity-message="${ifDefined(validityMessage)}"
      value="${ifDefined(value)}"
      @input="${onInput}"
    >
      <adc-button-icon slot="button-icon" icon="navigation:chevron-right"></adc-button-icon>
    </adc-text-input>
  </form>
`;
export const WithButtonIcon = (args) => TemplateWithButtonIcon(args);
WithButtonIcon.parameters = {
  jest: "text-input.test.ts"
};
