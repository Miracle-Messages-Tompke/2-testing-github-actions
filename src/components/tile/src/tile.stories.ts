import "@aileron/tile";
import { html, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

export default {
  title: "Components/Tile",
  component: "adc-tile",
  args: {
    color: undefined,
    elevation: undefined,
    radius: undefined,
    "outline-color": undefined
  },
  argTypes: {
    color: {
      type: {
        name: "text",
        required: false
      },
      options: ["none", "default", "secondary", "tertiary"],
      mapping: { none: null },
      table: {
        type: {
          summary: "text"
        },
        defaultValue: { summary: undefined }
      },
      control: { type: "select" }
    },
    "outline-color": {
      type: {
        name: "text",
        required: false
      },
      options: ["none", "default", "secondary", "tertiary"],
      mapping: { none: null },
      table: {
        type: {
          summary: "text"
        },
        defaultValue: { summary: undefined }
      },
      control: { type: "select" }
    },
    outlineColor: {
      table: {
        disable: true
      }
    },
    styles: {
      table: {
        disable: true
      }
    },
    radius: {
      type: {
        name: "text",
        required: false
      },
      options: ["none", "sm", "lg"],
      mapping: { none: null },
      table: {
        type: {
          summary: "text"
        },
        defaultValue: { summary: undefined }
      },
      control: { type: "select" }
    },
    elevation: {
      type: {
        name: "text",
        required: false
      },
      options: ["none", 1, 2, 3, 4, 5],
      mapping: { none: null },
      table: {
        type: {
          summary: "number"
        },
        defaultValue: { summary: 0 }
      },
      control: { type: "select" }
    }
  }
};

type Properties = {
  radius?: string;
  elevation?: number;
  color?: string;
  "outline-color"?: string;
};

const Template = ({ radius, elevation, color, "outline-color": outlineColor }: Properties = {
    radius: "",
    elevation: 0,
    color: "",
    "outline-color": ""
  }
): TemplateResult => {
  return html`
    <adc-tile
      radius=${ifDefined(radius)}
      color=${ifDefined(color)}
      elevation=${ifDefined(elevation)}
      outline-color=${ifDefined(outlineColor)}
    >
      <p>This is slot text!</p>
    </adc-tile>
  `;
};

export const Default = (args?: Properties): TemplateResult => Template(args);
