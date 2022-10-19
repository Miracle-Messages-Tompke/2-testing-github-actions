import "@aileron/button";
import "@aileron/modal";
import { html } from "lit-html";

export default {
  title: "Components/modal",
  component: "adc-modal",
  args: {
    open: false,
    spacing: "12"
  },
  argTypes: {
    open: {
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
    }
  }
};

const Template = (
  { open } = {
    open: false
  }
) => {
  const handleOpen = () => {
    const modal = document.getElementById("modal") as any;

    modal.open = true;
  };
  return html`<adc-button @click=${handleOpen}>Open Action Drawer</adc-button>
    <adc-modal id="modal" ?open="${open}">
      <adc-modal-header>
        <adc-modal-close-button></adc-modal-close-button>
        <adc-modal-heading>Modal Heading</adc-modal-heading>
      </adc-modal-header>
      <adc-modal-body>
        Ut consequatur adipisci magnam quis vitae quos fuga deleniti. Porro molestiae id voluptas
        qui et. Molestias architecto modi exercitationem dolores rerum iste velit voluptate.
        Inventore adipisci et non qui. Eos velit deserunt dolorem ipsum et voluptatem voluptatem rem
        unde.
      </adc-modal-body>
      <adc-modal-footer> Modal Footer Content </adc-modal-footer>
    </adc-modal>`;
};

export const Default = () => Template();
Default.parameters = {
  docs: {
    source: {
      code: "<adc-modal></adc-modal>"
    }
  },
  jest: "modal.test.ts"
};
