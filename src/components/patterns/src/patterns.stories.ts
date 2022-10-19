import "@aileron/patterns";
import { html } from "lit-html";
import type { TemplateResult } from "lit-html";

const sampleConfig = [
  [
    {
      component: "radio",
      required: true,
      "label-text": "Radio Buttons",
      name: "radios",
      "default-value": "test",
      value: [
        { value: "test", "label-text": "test 1" },
        { value: "test 2", "label-text": "test 2" }
      ]
    },
    {
      component: "text",
      value: "test",
      helper: "tester",
      helperPersistent: true,
      required: true,
      "label-text": "test"
    },
    { component: "text", value: "test", "label-text": "test 2" }
  ],
  [
    {
      component: "text",
      "label-text": "omg another row",
      value: "row 2 value"
    },
    {
      component: "select",
      "label-text": "Card type",
      required: true,
      "default-value": "Value",
      value: [
        {
          "label-text": "Main 1",
          value: [{ "label-text": "Sub 1", value: "Value" }]
        },
        { "label-text": "Main 2", value: "Value" }
      ],
      placeholder: "Select card type"
    },
    {
      component: "button",
      "label-text": "submit",
      size: "field fullwidth",
      type: "submit"
    }
  ],
  [
    {
      component: "checkbox",
      name: "checkbox_name",
      "label-text": "checkbox test",
      value: "checkbox",
      visible: false
    }
  ]
];

export default {
  title: "Patterns/Form Generator",
  args: { config: sampleConfig },
  argTypes: {
    config: {
      name: "config",
      type: { name: "object", required: true },
      description: "Configuration for how to build the form",
      table: {
        type: {
          summary: "string"
        },
        defaultValue: { summary: "" }
      },
      control: { type: "object" }
    }
  }
};

interface Properties {
  config: string;
}

const Template = (
  { config }: Properties = {
    config: ""
  }
): TemplateResult => {
  return html`<adc-form-generator config="${JSON.stringify(config)}"></adc-form-generator>`;
};

export const Default = (args?: Properties): TemplateResult => Template(args);
