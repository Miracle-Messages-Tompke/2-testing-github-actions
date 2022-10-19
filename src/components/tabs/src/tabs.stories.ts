import "@aileron/grid";
import "@aileron/tabs";
import "@aileron/text-input";
import { html } from "lit-html";

export default {
  title: "Components/Tabs",
  component: "adc-tabs",
  subcomponents: ["adc-tab", "adc-tab-panel"]
};

const Template = () => {
  return html`
    <adc-grid>
      <adc-row>
        <adc-column col-desktop="12">
          <adc-tabs>
            <adc-tab selected label="first" value="first">first</adc-tab>
            <adc-tab label="second" value="second">really really really long second</adc-tab>
            <adc-tab-panel selected value="first" id="first">
              <adc-grid>
                <adc-row has-form>
                  <adc-column col-desktop="4">
                    <adc-text-input label-text="test"></adc-text-input>
                  </adc-column>
                  <adc-column col-desktop="4">
                    <adc-text-input label-text="test 2"></adc-text-input>
                  </adc-column>
                  <adc-column col-desktop="4">
                    <adc-text-input label-text="test 3"></adc-text-input>
                  </adc-column>
                </adc-row>
              </adc-grid>
            </adc-tab-panel>
            <adc-tab-panel value="second" id="second">Second Panel</adc-tab-panel>
          </adc-tabs>
        </adc-column>
      </adc-row>
    </adc-grid>
  `;
};

export const Default = () => Template();
Default.parameters = {
  jest: "tabs.test.ts"
};
