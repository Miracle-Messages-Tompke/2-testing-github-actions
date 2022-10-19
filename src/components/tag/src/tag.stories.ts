import "@aileron/icon";
import "@aileron/tag";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

export default {
  title: "Components/Tag",
  component: "adc-tag",
  args: {
    "label-text": "Tag Label",
    position: "ltr",
    kind: "",
    variant: ""
  },
  argTypes: {
    "label-text": {
      name: "label-text",
      type: {
        name: "text",
        required: true
      },
      description: "Display label for tag.",
      table: {
        type: {
          summary: "text"
        },
        defaultValue: { summary: "Tag Label" }
      },
      control: { type: "text" }
    },
    position: {
      name: "position",
      type: {
        name: "text",
        required: false
      },
      description: "The position that the tag is arranged by.",
      table: {
        type: {
          summary: "text"
        },
        defaultValue: { summary: "ltr" }
      },
      options: ["ltr", "rtl"],
      control: { type: "select" }
    },
    kind: {
      name: "kind",
      type: {
        name: "text",
        required: false
      },
      description: "The kind of tag that is being shown.",
      table: {
        type: {
          summary: "text"
        },
        defaultValue: { summary: "" }
      },
      options: ["", "error", "information", "success", "warning"],
      control: { type: "select", labels: { "": "default" } }
    },
    variant: {
      name: "variant",
      type: {
        name: "text",
        required: false
      },
      description: "Selected variant for tags.",
      table: {
        type: {
          summary: "text"
        },
        defaultValue: { summary: "" }
      },
      options: ["", "ribbon"],
      control: { type: "select", labels: { "": "default" } }
    },
    labelText: {
      table: { disable: true },
      control: { disable: true }
    }
  }
};

const Template = (
  { "label-text": label, position, kind, variant } = {
    "label-text": "Tag Label",
    position: "ltr",
    kind: "",
    variant: ""
  }
) => {
  return html`<adc-tag
    label-text="${label}"
    position="${position}"
    kind="${ifDefined(kind)}"
    variant="${ifDefined(variant)}"
  ></adc-tag>`;
};

const IconTemplate = (
  { "label-text": label, position, kind, variant } = {
    "label-text": "Tag Label",
    position: "ltr",
    kind: "",
    variant: ""
  }
) => {
  return html` <adc-tag
    label-text="${label}"
    position="${position}"
    kind="${ifDefined(kind)}"
    variant="${ifDefined(variant)}"
  >
    <adc-icon icon="small:information" slot="icon"></adc-icon>
  </adc-tag>`;
};

export const Default = (args) => Template(args);
Default.args = {
  "label-text": "Tag Label"
};
Default.parameters = {
  jest: "tag.test.ts"
};

export const InformationTag = (args) => Template(args);
InformationTag.args = {
  "label-text": "Information Label",
  kind: "information"
};
InformationTag.parameters = {
  jest: "tag.test.ts"
};

export const ErrorTag = (args) => Template(args);
ErrorTag.args = {
  "label-text": "Error Label",
  kind: "error"
};
ErrorTag.parameters = {
  jest: "tag.test.ts"
};

export const WarningTag = (args) => Template(args);
WarningTag.args = {
  "label-text": "Warning Label",
  kind: "warning"
};
WarningTag.parameters = {
  jest: "tag.test.ts"
};

export const SuccessTag = (args) => Template(args);
SuccessTag.args = {
  "label-text": "Success Label",
  kind: "success"
};
SuccessTag.parameters = {
  jest: "tag.test.ts"
};

export const LeadingIcon = (args) => IconTemplate(args);
LeadingIcon.args = {
  "label-text": "Icon Label"
};
LeadingIcon.parameters = {
  jest: "tag.test.ts"
};

export const TrailingIcon = (args) => IconTemplate(args);
TrailingIcon.args = {
  "label-text": "Icon Label",
  position: "rtl"
};
TrailingIcon.parameters = {
  jest: "tag.test.ts"
};

export const Ribbon = (args) => Template(args);
Ribbon.args = {
  "label-text": "Ribbon Label",
  kind: "information",
  variant: "ribbon"
};

Ribbon.parameters = {
  jest: "tag.test.ts"
};
