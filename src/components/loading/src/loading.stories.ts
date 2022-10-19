import "@aileron/loading";
import "@aileron/text-input";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

export default {
  title: "Components/Loading",
  component: "adc-inline-loading",
  args: {
    state: "active",
    "label-text": "Loading..."
  },
  argTypes: {
    state: {
      type: {
        name: "text",
        required: true
      },
      description: "State of the loading component.",
      table: {
        type: {
          summary: "string"
        },
        defaultValue: { summary: "" }
      },
      options: ["active", "success", "error"],
      control: { type: "select" }
    },
    "label-text": {
      type: {
        name: "text",
        required: false
      },
      description: "Label Text for the loading component.",
      table: {
        type: {
          summary: "string"
        },
        defaultValue: { summary: '""' }
      },
      control: {
        type: "text"
      }
    },
    labelText: {
      table: { disable: true },
      control: { disable: true }
    }
  }
};

export const Loading = (args) => {
  return html`
    <div style="display: flex; flex-direction: column; align-items: center;">
      <img role="img" alt="background" src="https://placeimg.com/1000/768/nature" />
      <adc-loading
        state=${ifDefined(args?.state)}
        label-text=${ifDefined(args?.labelText)}
      ></adc-loading>
    </div>
  `;
};

Loading.args = {
  state: "active",
  labelText: "Loading message..."
};

Loading.storyName = "Default";
Loading.parameters = {
  jest: "loading.test.ts"
};
