import "@aileron/link";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import Story from "./link.mdx";

export default {
  title: "Components/Link",
  component: "adc-link",
  parameters: {
    docs: {
      page: Story
    }
  },
  args: {
    disabled: false,
    inline: false,
    linkText: "",
    target: "",
    rel: "",
    href: "#",
    icon: "",
    ariaHidden: "Hidden Aria Text"
  },
  argTypes: {
    disabled: {
      name: "disabled",
      type: {
        name: "boolean",
        required: false
      },
      description: "Disabled state for the Link component.",
      table: {
        type: {
          summary: "boolean"
        },
        defaultValue: { summary: false }
      },
      control: { type: "boolean" }
    },
    inline: {
      name: "inline",
      type: {
        name: "boolean",
        required: false
      },
      description: "Property set when link is on the same line as normal text.",
      table: {
        type: {
          summary: "boolean"
        },
        defaultValue: { summary: false }
      },
      control: { type: "boolean" }
    },
    linkText: {
      name: "link-text",
      type: {
        name: "text",
        required: true
      },
      description: "Link text that is visible to the user.",
      table: {
        type: {
          summary: "string"
        },
        defaultValue: { summary: "" }
      },
      control: {
        type: "text"
      }
    },
    target: {
      name: "target",
      type: {
        name: "text",
        required: true
      },
      description: "Attribute that specifies where to open the linked document.",
      table: {
        type: {
          summary: "string"
        },
        defaultValue: { summary: "" }
      },
      control: {
        type: "text"
      }
    },
    rel: {
      name: "rel",
      type: {
        name: "text",
        required: false
      },
      description:
        "Attribute that defines relationship between linked resource and current document.",
      table: {
        type: {
          summary: "string"
        },
        defaultValue: { summary: "" }
      },
      control: {
        type: "text"
      }
    },
    href: {
      name: "href",
      type: {
        name: "text",
        required: true
      },
      description: "The URL that the hyperlink points to.",
      table: {
        type: {
          summary: "string"
        },
        defaultValue: { summary: "#" }
      },
      control: {
        type: "text"
      }
    },
    icon: {
      name: "icon",
      type: {
        name: "text",
        required: false
      },
      description: "Used when specifying an icon to be used with the Link component.",
      table: {
        type: {
          summary: "string"
        },
        defaultValue: { summary: "" }
      },
      control: {
        type: "text"
      }
    },
    ariaHidden: {
      name: "aria-hidden",
      type: {
        name: "text",
        required: false
      },
      description: "Hidden aria text to be read by screen readers.",
      table: {
        type: {
          summary: "string"
        },
        defaultValue: { summary: "Hidden Aria Text" }
      },
      control: {
        type: "text"
      }
    }
  }
};

export const DefaultLink = (args) => {
  return html`
    <p>
      Sapiente itaque laborum officia debitis et voluptatum.
      <adc-link
        target="${ifDefined(args?.target)}"
        rel="${ifDefined(args?.rel)}"
        href="${ifDefined(args?.href)}"
        ?disabled="${args?.disabled}"
        ?inline="${args?.inline}"
        icon="${ifDefined(args?.icon ? args?.icon : "")}"
        hiddenLabelText="${ifDefined(args?.ariaHidden)}"
        >${args?.linkText ? args?.linkText : "Default Link"}
      </adc-link>
    </p>
  `;
};

DefaultLink.args = {
  disabled: false,
  inline: false,
  linkText: "",
  target: "_self",
  rel: "",
  href: "#",
  icon: "",
  ariaHidden: "Hidden Aria Text"
};

DefaultLink.storyName = "Default";

DefaultLink.parameters = {
  docs: {
    source: {
      code: '<adc-link target="_self" href="#" hiddenLabelText="Hidden Aria Text">Insert Link Text Here</adc-link>'
    }
  },
  jest: "link.test.ts"
};

export const ChevronLink = (args) => {
  return html`
    <p>
      Sapiente itaque laborum officia debitis et voluptatum.
      <adc-link
        target="${ifDefined(args?.target)}"
        rel="${ifDefined(args?.rel)}"
        href="${ifDefined(args?.href)}"
        ?disabled="${args?.disabled}"
        ?inline="${args?.inline}"
        icon="${ifDefined(args?.icon ? args?.icon : "")}"
        hiddenLabelText="${ifDefined(args?.ariaHidden)}"
        >${args.linkText ? args.linkText : "Default Link with trailing Chevron icon"}
      </adc-link>
    </p>
  `;
};

ChevronLink.args = {
  disabled: false,
  inline: false,
  linkText: "",
  target: "_self",
  rel: "",
  href: "#",
  icon: "chevron",
  ariaHidden: "Hidden Aria Text"
};

ChevronLink.storyName = "Default Chevron";

ChevronLink.parameters = {
  docs: {
    source: {
      code: '<adc-link target="_self" href="#" hiddenLabelText="Hidden Aria Text" icon="chevron">Insert Link Text Here</adc-link>'
    }
  },
  jest: "link.test.ts"
};

export const NewTabWindowLink = (args) => {
  return html`
    <p>
      Sapiente itaque laborum officia debitis et voluptatum.
      <adc-link
        target="${ifDefined(args?.target)}"
        rel="${ifDefined(args?.rel)}"
        href="${ifDefined(args?.href)}"
        ?disabled="${args?.disabled}"
        ?inline="${args?.inline}"
        icon="${ifDefined(args?.icon ? args?.icon : "")}"
        hiddenLabelText="${ifDefined(args?.ariaHidden)}"
        >${args?.linkText ? args?.linkText : "Default Link with trailing New Tab/Window icon"}
      </adc-link>
    </p>
  `;
};

NewTabWindowLink.args = {
  disabled: false,
  inline: false,
  linkText: "",
  target: "_blank",
  rel: "",
  href: "#",
  icon: "new-window",
  ariaHidden: "Hidden Aria Text"
};

NewTabWindowLink.storyName = "Default New Tab/Window";

NewTabWindowLink.parameters = {
  docs: {
    source: {
      code: '<adc-link target="_self" href="#" hiddenLabelText="Hidden Aria Text" icon="new-window">Insert Link Text Here</adc-link>'
    }
  },
  jest: "link.test.ts"
};
