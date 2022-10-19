import "@aileron/divider";
import "@aileron/icon";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

export default {
  title: "Components/Divider",
  component: "adc-divider",
  args: {
    dashed: false,
    spacing: "12"
  },
  argTypes: {
    dashed: {
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
    spacing: {
      type: {
        name: "text",
        required: false
      },
      table: {
        type: {
          summary: ['"12"', '"16"', '"24"', '"32"', '"40"', '"48"', '"64"']
        },
        defaultValue: { summary: '"12"' }
      },
      options: ["12", "16", "24", "32", "40", "48", "64"],
      control: {
        type: "select"
      }
    }
  }
};

const Template = (
  { dashed, spacing } = {
    dashed: false,
    spacing: "spacing-12"
  }
) => {
  return html` <adc-divider ?dashed=${dashed} spacing="${ifDefined(spacing)}"> </adc-divider> `;
};

const TemplateLabel = (
  { dashed, spacing } = {
    dashed: false,
    spacing: "spacing-12"
  }
) => {
  return html`
    <adc-divider ?dashed=${dashed} spacing="${ifDefined(spacing)}"
      ><label>Divider</label>
    </adc-divider>
  `;
};

const TemplateIcon = (
  { dashed, spacing } = {
    dashed: false,
    spacing: "spacing-12"
  }
) => {
  return html`
    <adc-divider ?dashed=${dashed} spacing="${ifDefined(spacing)}">
      <label>Divider</label>
      <adc-icon icon="small:information"></adc-icon>
    </adc-divider>
  `;
};

export const Default = (args) => Template(args);
Default.parameters = {
  docs: {
    source: {
      code: "<adc-divider></adc-divider>"
    }
  },
  jest: "divider.test.ts"
};

export const Label = (args) => TemplateLabel(args);
Label.parameters = {
  jest: "divider.test.ts"
};

export const Icon = (args) => TemplateIcon(args);
Icon.parameters = {
  jest: "divider.test.ts"
};
