import "@aileron/grid";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

export default {
  title: "Components/Grid",
  component: "adc-grid",
  subcomponents: ["adc-row", "adc-column"],
  args: {
    form: false,
    flush: false,
    reverse: false,
    position: "none"
  },
  argTypes: {
    position: {
      type: {
        name: "select"
      },
      table: {
        defaultValue: { summary: '""' }
      },
      options: ["none", "start", "center", "end"],
      mapping: { none: "" }
    }
  }
};

const Template = (
  { form, flush, position, reverse } = {
    form: true,
    flush: false,
    reverse: false,
    position: ""
  }
) => html`
  <adc-grid ?form=${form} ?flush=${flush} ?reverse=${reverse} position="${ifDefined(position)}">
    <adc-row>
      <adc-column col-desktop="1" col-tablet="4" col-phone="4"
        ><div class="box">12</div></adc-column
      >
      <adc-column col-desktop="1" col-tablet="4" col-phone="4"
        ><div class="box">12</div></adc-column
      >
      <adc-column col-desktop="1" col-tablet="4" col-phone="4"
        ><div class="box">12</div></adc-column
      >
      <adc-column col-desktop="1" col-tablet="4" col-phone="4"
        ><div class="box">12</div></adc-column
      >
      <adc-column col-desktop="1" col-tablet="4" col-phone="4"
        ><div class="box">12</div></adc-column
      >
      <adc-column col-desktop="1" col-tablet="4" col-phone="4"
        ><div class="box">12</div></adc-column
      >
      <adc-column col-desktop="1" col-tablet="4" col-phone="4"
        ><div class="box">12</div></adc-column
      >
      <adc-column col-desktop="1" col-tablet="4" col-phone="4"
        ><div class="box">12</div></adc-column
      >
      <adc-column col-desktop="1" col-tablet="4" col-phone="4"
        ><div class="box">12</div></adc-column
      >
      <adc-column col-desktop="1" col-tablet="4" col-phone="4"
        ><div class="box">12</div></adc-column
      >
      <adc-column col-desktop="1" col-tablet="4" col-phone="4"
        ><div class="box">12</div></adc-column
      >
      <adc-column col-desktop="1" col-tablet="4" col-phone="4"
        ><div class="box">12</div></adc-column
      >
    </adc-row>
    <adc-row>
      <adc-column col-desktop="2" col-tablet="2" col-phone="1"><div class="box">6</div></adc-column>
      <adc-column col-desktop="2" col-tablet="2" col-phone="2"><div class="box">6</div></adc-column>
      <adc-column col-desktop="2" col-tablet="2" col-phone="1"><div class="box">6</div></adc-column>
      <adc-column col-desktop="6" col-tablet="2">
        <adc-grid>
          <adc-row>
            <adc-column col-desktop="6" col-tablet="4"><div class="box">nested 3</div></adc-column>
            <adc-column col-desktop="6" col-tablet="4"><div class="box">nested 3</div></adc-column>
          </adc-row>
        </adc-grid>
      </adc-column>
    </adc-row>
    <adc-row>
      <adc-column col-desktop="3" col-tablet="2"><div class="box">1</div></adc-column>
      <adc-column col-desktop="3" col-tablet="2"><div class="box">2</div></adc-column>
      <adc-column col-desktop="3" col-tablet="2"><div class="box">3</div></adc-column>
      <adc-column col-desktop="3" col-tablet="2"><div class="box">4</div></adc-column>
    </adc-row>
    <adc-row>
      <adc-column col-desktop="4" col-tablet="2"><div class="box">1</div></adc-column>
      <adc-column col-desktop="4" col-tablet="4"><div class="box">2</div></adc-column>
      <adc-column col-desktop="4" col-tablet="2"><div class="box">3</div></adc-column>
    </adc-row>
    <adc-row>
      <adc-column col-desktop="6" col-tablet="4"><div class="box">1</div></adc-column>
      <adc-column col-desktop="6" col-tablet="4"><div class="box">2</div></adc-column>
    </adc-row>
    <adc-row>
      <adc-column col-desktop="12" col-tablet="8"><div class="box">1</div></adc-column>
    </adc-row>
  </adc-grid>
`;

export const Default = (args) => Template(args);
Default.parameters = {
  jest: "grid.test.ts"
};

const TemplateOffset = (
  { flush, position, reverse } = {
    flush: false,
    reverse: false,
    position: ""
  }
) => html`
  <adc-grid ?flush=${flush} ?reverse=${reverse} position="${ifDefined(position)}">
    <adc-row>
      <adc-column col-desktop="3" col-tablet="4" col-phone="4">
        <div class="box">1</div>
      </adc-column>
      <adc-column col-desktop="3" col-tablet="4" col-phone="4">
        <div class="box">2</div>
      </adc-column>
      <adc-column col-desktop="3" col-tablet="4" col-phone="4">
        <div class="box">3</div>
      </adc-column>
      <adc-column col-desktop="3" col-tablet="4" col-phone="4">
        <div class="box">4</div>
      </adc-column>
    </adc-row>
    <adc-row>
      <adc-column
        col-desktop="3"
        col-desktop-offset="9"
        col-tablet="4"
        col-tablet-offset="4"
        col-phone="4"
      >
        <div class="box">4</div>
      </adc-column>
    </adc-row>
  </adc-grid>
`;

export const Offset = (args) => TemplateOffset(args);
Offset.parameters = {
  jest: "grid.test.ts"
};
