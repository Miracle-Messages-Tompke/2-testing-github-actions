import "@aileron/number-input";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "Components/Number Input",
  component: "adc-number-input",
  args: {
    autofocus: false,
    disabled: false,
    required: false,
    invalid: false,
    min: "0",
    max: "100",
    step: "1",
    placeholder: "",
    name: "input",
    validityMessage: "Something went wrong.",
    requiredValidityMessage: "This field is required.",
    validityMessageMax: "Try a lower value, between FOO and BAR",
    validityMessageMin: "Try a greater value, between FOO and BAR"
  },
  argTypes: {
    onInput: { action: "input", table: { disable: true } },
    disabled: {
      name: "disabled",
      type: {
        name: "boolean",
        required: false
      },
      description: "Disable the number input component.",
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
      description: "Require the number input component.",
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
      description: "Invalidate the number input component.",
      table: {
        type: {
          summary: "boolean"
        },
        defaultValue: { summary: false }
      },
      control: { type: "boolean" }
    },
    validityMessage: {
      name: "validity-message",
      type: {
        name: "text",
        required: false
      },
      description: "Validation message when number input component is invalid.",
      table: {
        type: {
          summary: "text"
        },
        defaultValue: { summary: false }
      },
      control: { type: "text" }
    },
    requiredValidityMessage: {
      name: "required-validity-message",
      type: {
        name: "text",
        required: false
      },
      description: "Validation message when number input component is required.",
      table: {
        type: {
          summary: "text"
        },
        defaultValue: { summary: false }
      },
      control: { type: "text" }
    },
    placeholder: {
      name: "placeholder",
      type: {
        name: "text",
        required: false
      },
      description: "Placeholder text.",
      table: {
        type: {
          summary: "text"
        },
        defaultValue: { summary: false }
      },
      control: { type: "text" }
    },
    min: {
      name: "min",
      type: {
        name: "number",
        required: false
      },
      description: "Minimum value allowed.",
      table: {
        type: {
          summary: "number"
        },
        defaultValue: { summary: "0" }
      },
      control: { type: "number" }
    },
    max: {
      name: "max",
      type: {
        name: "number",
        required: false
      },
      description: "Maximum value allowed.",
      table: {
        type: {
          summary: "number"
        },
        defaultValue: { summary: "100" }
      },
      control: { type: "number" }
    },
    step: {
      name: "step",
      type: {
        name: "number",
        required: false
      },
      description: "Step increment desired.",
      table: {
        type: {
          summary: "number"
        },
        defaultValue: { summary: "1" }
      },
      control: { type: "number" }
    },
    autocomplete: { control: { disable: true }, table: { disable: true } },
    pattern: { control: { disable: true }, table: { disable: true } },
    value: { control: { disable: true }, table: { disable: true } },
    incrementButtonAssistiveText: {
      control: { disable: true },
      table: { disable: true }
    },
    decrementButtonAssistiveText: {
      control: { disable: true },
      table: { disable: true }
    },
    validityValue: { control: { disable: true }, table: { disable: true } },
    "increment-button-assistive-text": {
      control: { disable: true },
      table: { disable: true }
    },
    "decrement-button-assistive-text": {
      control: { disable: true },
      table: { disable: true }
    },
    "validity-message-min": {
      control: { disable: true },
      table: { disable: true }
    },
    "validity-message-max": {
      control: { disable: true },
      table: { disable: true }
    },
    "required-validity-message": {
      control: { disable: true },
      table: { disable: true }
    },
    "validity-message": {
      control: { disable: true },
      table: { disable: true }
    },
    "adc-number-input": {
      control: { disable: true },
      table: { disable: true }
    }
  }
};

const Template = (
  {
    autofocus,
    disabled,
    invalid,
    name,
    required,
    placeholder,
    validityMessage,
    requiredValidityMessage,
    validityMessageMax,
    validityMessageMin,
    min,
    max,
    step,
    onInput
  } = {
    autofocus: false,
    disabled: false,
    required: false,
    invalid: false,
    name: "input",
    placeholder: "",
    validityMessage: "",
    requiredValidityMessage: "",
    min: 0,
    max: 100,
    step: 1,
    onInput: () => {}
  }
) => {
  return html`
    <adc-number-input
      ?autofocus="${autofocus}"
      ?disabled="${disabled}"
      ?required="${required}"
      ?invalid="${invalid}"
      name="${ifDefined(name)}"
      placeholder="${ifDefined(placeholder)}"
      validity-message="${ifDefined(validityMessage)}"
      required-validity-message="${ifDefined(requiredValidityMessage)}"
      validity-message-max="${ifDefined(validityMessageMax)}"
      validity-message-min="${ifDefined(validityMessageMin)}"
      min="${ifDefined(min)}"
      max="${ifDefined(max)}"
      step="${ifDefined(step)}"
      @input="${onInput}"
    >
    </adc-number-input>
  `;
};

export const Default = (args) => Template(args);
Default.parameters = {
  jest: "number-input.test.ts"
};

Default.play = async ({ canvasElement, args }) => {
  const inputContainer = canvasElement.querySelector("adc-number-input");

  const numberInput = inputContainer.shadowRoot.querySelector(".adc-number-input__input");
  const increaseButton = inputContainer.shadowRoot.querySelector(
    'button[aria-label="increase number input"]'
  );
  const decreaseButton = inputContainer.shadowRoot.querySelector(
    'button[aria-label="decrease number input"]'
  );

  const maxMessage = inputContainer.shadowRoot.querySelector(".message-max");
  const minMessage = inputContainer.shadowRoot.querySelector(".message-min");
  const requiredMessage = inputContainer.shadowRoot.querySelector(".required");
  const validity = inputContainer.shadowRoot.querySelector(".validity");

  let currentNumber = await args.min;

  // 🔧  Assert - Min and Max messaging is hidden
  await expect(maxMessage).toHaveAttribute("hidden");
  await expect(minMessage).toHaveAttribute("hidden");

  // INPUT IS REQUIRED
  if (args.required) {
    // 🔧  Assert - Required message should be shown
    await expect(requiredMessage).not.toHaveAttribute("hidden");
  } else {
    // 🔧  Assert - Required message should Not be shown
    await expect(requiredMessage).toHaveAttribute("hidden");
  }

  // INPUT IS NOT VALID
  if (args.invalid) {
    // 🔧  Assert - Invalid message should be shown
    await expect(validity).not.toHaveAttribute("hidden");
  } else {
    // 🔧  Assert - Invalid message should Not be shown
    await expect(validity).toHaveAttribute("hidden");
  }

  // INPUT IS DISABLED
  if (args.disabled) {
    // 👇 Simulate - Type in number
    await userEvent.type(numberInput, String(currentNumber));

    // 🔧  Assert - Input field has correct number
    await expect(numberInput.value).toBe("");
  } else {
    // INPUT IS NOT DISABLED

    // 🔧  Assert - Input field is empty
    await expect(numberInput.value).toBe("");

    // 👇 Simulate - Type in number
    await userEvent.type(numberInput, String(currentNumber));

    // 🔧  Assert - Input field has correct number
    await expect(numberInput.value).toBe(String(currentNumber));

    // 👇 Simulate - click increase button
    await userEvent.click(increaseButton);

    // 🔧  Assert - Input field has correct number
    await expect(parseInt(numberInput.value, 10)).toEqual(
      parseInt(currentNumber + Number(args.step), 10)
    );
    currentNumber = currentNumber + Number(args.step);

    // 👇 Simulate - click decrease button
    await userEvent.click(decreaseButton);

    // 🔧  Assert - Input field has correct number
    await expect(numberInput.value).toBe(String(currentNumber - Number(args.step)));

    // 👇 Simulate - Type in number that is higher than expected
    const tooHigh = Number(args.max) + 1;
    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, String(tooHigh));

    // 🔧  Assert - Maximum Message is shown
    await expect(numberInput.value).toBe(String(tooHigh));
    await expect(maxMessage).not.toHaveAttribute("hidden");

    // 👇 Simulate - click decrease button
    await userEvent.click(decreaseButton);

    const highestValueMultipleOfStep = args.max - ((args.max - args.min) % args.step);

    // 🔧  Assert - Should jump to next valid value
    await expect(numberInput.value).toBe(String(highestValueMultipleOfStep));
    await expect(maxMessage).toHaveAttribute("hidden");

    // 👇 Simulate - Type in number that is lower than expected
    const tooLow = Number(args.min) - 1;
    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, String(tooLow));

    // 🔧  Assert - Minimum Message is shown
    await expect(numberInput.value).toBe(String(tooLow));
    await expect(minMessage).not.toHaveAttribute("hidden");

    // 👇 Simulate - click increase button
    await userEvent.click(increaseButton);

    // 🔧  Assert - Should jump to next valid value
    await expect(numberInput.value).toBe(String(args.min));
    await expect(minMessage).toHaveAttribute("hidden");

    // 👇 Simulate - clear input field
    await userEvent.clear(numberInput);

    // 🔧  Assert - Should be cleared
    await expect(numberInput.value).toBe("");
  }
};
