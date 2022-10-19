import "@aileron/content-switcher";
import "@aileron/grid";
import "@aileron/text-input";
import { html } from "lit-html";
import { userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "Components/Content Switcher",
  component: "adc-content-switcher",
  subcomponents: ["adc-content-switch", "adc-content-switch-panel"]
};

const Template = () => {
  return html`
    <adc-grid>
      <adc-row>
        <adc-column col-desktop="12">
          <adc-content-switcher>
            <adc-content-switch selected value="first">first</adc-content-switch>
            <adc-content-switch value="second">really really really long second</adc-content-switch>
            <adc-content-switch-panel selected value="first">
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
            </adc-content-switch-panel>
            <adc-content-switch-panel value="second">Second Panel</adc-content-switch-panel>
          </adc-content-switcher>
        </adc-column>
      </adc-row>
    </adc-grid>
  `;
};

export const Default = () => Template();

Default.parameters = {
  jest: "content-switcher.test.ts"
};

Default.play = async ({ canvasElement }) => {
  const contentSwitcher = canvasElement.querySelector("adc-content-switcher");

  const firstContentSwitchComponent = canvasElement.querySelector(
    'adc-content-switch[value="first"]'
  );
  const firstContentButton = firstContentSwitchComponent.shadowRoot.querySelector("label");
  const firstContentPanel = canvasElement.querySelector('adc-content-switch-panel[value="first"]');

  let secondContentSwitchComponent = canvasElement.querySelector(
    'adc-content-switch[value="second"]'
  );
  const secondContentButton = secondContentSwitchComponent.shadowRoot.querySelector("label");
  const secondContentPanel = canvasElement.querySelector(
    'adc-content-switch-panel[value="second"]'
  );

  // 🔧  Assert - First Button/Content is selected
  // Content switcher is correct
  await expect(contentSwitcher).toHaveAttribute("selected", "first");
  // Content is correct
  await expect(firstContentPanel).toHaveAttribute("selected");

  // 👇 Simulate - Click second button
  await userEvent.click(secondContentButton);

  // 🔧  Assert - First Button/Content is NOT selected
  // Content switcher is correct
  await expect(contentSwitcher).toHaveAttribute("selected", "second");
  // Content is correct
  await expect(firstContentPanel).not.toHaveAttribute("selected");
  await expect(secondContentPanel).toHaveAttribute("selected");

  // 👇 Simulate - Click first button
  await userEvent.click(firstContentButton);

  // 🔧  Assert - First Button/Content is NOT selected
  // Content switcher is correct
  await expect(contentSwitcher).toHaveAttribute("selected", "first");
  // Content is correct
  await expect(firstContentPanel).toHaveAttribute("selected");
  await expect(secondContentPanel).not.toHaveAttribute("selected");
};
