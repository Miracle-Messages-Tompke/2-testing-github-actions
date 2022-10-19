import "@aileron/card";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import StoryDoc from "./card.mdx";

export default {
  title: "Components/Card",
  component: "adc-card",
  parameters: {
    docs: {
      page: StoryDoc
    }
  },
  args: {
    elevation: 0,
    orientation: "vertical",
    size: "regular"
  },
  argTypes: {
    elevation: {
      type: {
        name: "text",
        required: false
      },
      options: [0, 1, 2, 3, 4, 5],
      table: {
        type: {
          summary: "number"
        },
        defaultValue: { summary: 0 }
      },
      control: { type: "select" }
    },
    orientation: {
      type: {
        name: "text",
        required: false
      },
      options: ["vertical", "horizontal"],
      table: {
        defaultValue: { summary: '"vertical"' }
      },
      control: { type: "select" }
    },
    size: {
      type: {
        name: "text",
        required: false
      },
      table: {
        defaultValue: { summary: '""' }
      },
      options: ["lg", "regular"],
      mapping: { regular: "" },
      control: {
        type: "select"
      }
    },
    media: { table: { disable: true } }
  }
};

const Template = (
  { elevation, size, orientation } = {
    elevation: 0,
    orientation: "vertical",
    size: ""
  }
) => {
  return html`
    <adc-card
      elevation="${ifDefined(elevation)}"
      orientation="${ifDefined(orientation)}"
      size="${ifDefined(size)}"
    >
      <p>
        lorem Repellat iste porro quidem tempore cupiditate et. Et incidunt eum quidem laboriosam
        unde dolor sunt harum non. Quas animi eos.
      </p>
      <p>
        Repellendus qui iste reprehenderit aut perspiciatis. Eaque ipsam corporis doloremque. At
        facilis temporibus voluptatem at. Mollitia et sit et eveniet ea aliquam numquam. Nemo cumque
        odio sed dicta.
      </p>
      <p>
        Soluta eius perspiciatis culpa occaecati necessitatibus laudantium sunt. Ut non qui.
        Excepturi exercitationem qui. Pariatur enim at ut dolor quis odio ducimus et.
      </p>
    </adc-card>
  `;
};

export const Default = (args) => Template(args);
Default.parameters = {
  docs: { source: { code: '<adc-card elevation="0">...</adc-card>' } },
  jest: "card.test.ts"
};

export const Media = (args) => {
  return html`
    <adc-card
      elevation="${ifDefined(args?.elevation)}"
      orientation="${ifDefined(args?.orientation)}"
      size="${ifDefined(args?.size)}"
      style="width: 40rem;"
    >
      <adc-card-media
        src="${ifDefined(args?.src)}"
        ratio="${ifDefined(args?.ratio)}"
      ></adc-card-media>
      <p>
        lorem Repellat iste porro quidem tempore cupiditate et. Et incidunt eum quidem laboriosam
        unde dolor sunt harum non. Quas animi eos.
      </p>
      <p>
        Repellendus qui iste reprehenderit aut perspiciatis. Eaque ipsam corporis doloremque. At
        facilis temporibus voluptatem at. Mollitia et sit et eveniet ea aliquam numquam. Nemo cumque
        odio sed dicta.
      </p>
      <p>
        Soluta eius perspiciatis culpa occaecati necessitatibus laudantium sunt. Ut non qui.
        Excepturi exercitationem qui. Pariatur enim at ut dolor quis odio ducimus et.
      </p>
    </adc-card>
  `;
};
Media.subcomponents = {
  "adc-card-media": "adc-card-media"
};
Media.args = {
  src: "https://placeimg.com/120/120/any",
  ratio: "16-9",
  orientation: "horizontal"
};
Media.argTypes = {
  src: {
    description: "Sets the source of the media.",
    table: {
      type: {
        summary: "string"
      },
      defaultValue: { summary: '""' }
    }
  },
  ratio: {
    description: "Sets the aspect ratio of the media.",
    options: ["16-9", "square"],
    table: {
      type: {
        summary: ['"16-9"', '"square"']
      },
      defaultValue: {
        summary: '"16-9"'
      }
    },
    control: {
      type: "select"
    }
  }
};
Media.parameters = {
  docs: { source: { code: '<adc-card elevation="0">...</adc-card>' } },
  jest: "card.test.ts"
};
