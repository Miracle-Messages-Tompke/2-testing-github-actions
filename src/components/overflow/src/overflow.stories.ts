import "@aileron/overflow";
import "@aileron/grid";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "Components/Overflow",
  component: "adc-overflow",
  parameters: {
    actions: {
      handles: ["adc-overflow-open", "adc-overflow-close"]
    }
  }
};

export const Overflow1 = (args) => {
  // create the page content including the starting content, then the overflow
  // container with arguments
  return html`
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    <adc-overflow
      ?disabled=${args?.disabled}
      readMoreButtonText="${ifDefined(args?.readMoreButtonText)}"
      readLessButtonText="${ifDefined(args?.readLessButtonText)}"
      ?hasReadLessButton="${args?.hasReadLessButton}"
    >
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <p>
        Duis Overflow aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>
      <img alt="" src="http://placekitten.com/g/200/300" />
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
      <img alt="" src="http://placekitten.com/g/400/300" />
    </adc-overflow>
  `;
};

Overflow1.args = {
  readMoreButtonText: "Read More",
  readLessButtonText: "Read Less",
  hasReadLessButton: true,
  disabled: false
};

Overflow1.storyName = "Default";
Overflow1.parameters = {
  jest: "overflow.test.ts"
};

Overflow1.play = async ({ canvasElement, args }) => {
  const adcOverflow = canvasElement.querySelector("adc-overflow");
  const buttonElement = adcOverflow.shadowRoot
    .querySelector("adc-button")
    .shadowRoot.querySelector("button");
  let overflowContent = adcOverflow.shadowRoot.querySelector(".overflow-content");

  // 🔧 Assert - Overflow content is not visible
  await expect(overflowContent).not.toBeInTheDocument();

  // check for disabled arg

  if (!args.disabled) {
    // 👇 Simulate - Click button
    await userEvent.click(buttonElement);

    overflowContent = adcOverflow.shadowRoot.querySelector(".overflow-content");
    // 🔧 Assert - Overflow content is visible
    await expect(overflowContent).toBeInTheDocument();

    // 👇 Simulate - Click button
    await userEvent.click(buttonElement);

    overflowContent = adcOverflow.shadowRoot.querySelector(".overflow-content");
    // 🔧 Assert - Overflow content is visible
    await expect(overflowContent).not.toBeInTheDocument();
  }
};

export const Overflow2 = (args) => {
  // instantiate a variable containin the overflow part of the content

  // create the page content including the starting content, then the overflow
  // container with arguments
  return html`
    <adc-grid>
      <adc-row>
        <adc-column col-desktop="1" col-tablet="4" col-phone="4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <adc-overflow
            readMoreButtonText="${ifDefined(args?.readMoreButtonText)}"
            readLessButtonText="${ifDefined(args?.readLessButtonText)}"
            ?hasReadLessButton="${ifDefined(args?.hasReadLessButton)}"
            ?disabled=${args?.disabled}
          >
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Duis Overflow aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <img alt="" src="http://placekitten.com/g/200/300" />
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
            <img alt="" src="http://placekitten.com/g/400/300" />
          </adc-overflow>
        </adc-column>
        <adc-column col-desktop="1" col-tablet="4" col-phone="4">
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </p>
          <adc-overflow
            readMoreButtonText="${ifDefined(args?.readMoreButtonText)}"
            readLessButtonText="${ifDefined(args?.readLessButtonText)}"
            ?hasReadLessButton="${ifDefined(args?.hasReadLessButton)}"
            ?disabled=${args?.disabled}
          >
            <img alt="" src="http://placekitten.com/g/300/200" />
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <p>
              Duis Overflow aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur.
            </p>

            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
            <img alt="" src="http://placekitten.com/g/400/200" />
          </adc-overflow>
        </adc-column>
      </adc-row>
    </adc-grid>
  `;
};

Overflow2.args = {
  readMoreButtonText: "Read More",
  readLessButtonText: "Read Less",
  hasReadLessButton: true,
  disabled: false
};

Overflow2.storyName = "Multiple Instances";
Overflow2.parameters = {
  jest: "overflow.test.ts"
};

Overflow2.play = async ({ canvasElement, args }) => {
  const allAdcOverflow = canvasElement.querySelectorAll("adc-overflow");

  const button1 = allAdcOverflow[0].shadowRoot
    .querySelector("adc-button")
    .shadowRoot.querySelector("button");
  const button2 = allAdcOverflow[1].shadowRoot
    .querySelector("adc-button")
    .shadowRoot.querySelector("button");

  let overflowContent1 = allAdcOverflow[0].shadowRoot.querySelector(".overflow-content");
  let overflowContent2 = allAdcOverflow[1].shadowRoot.querySelector(".overflow-content");

  // Testing overflow 1

  // 🔧 Assert - Overflow1 content is not visible
  await expect(overflowContent1).not.toBeInTheDocument();

  if (!args.disabled) {
    // 👇 Simulate - Click button
    await userEvent.click(button1);

    overflowContent1 = allAdcOverflow[0].shadowRoot.querySelector(".overflow-content");
    // 🔧 Assert - Overflow1 content is visible
    await expect(overflowContent1).toBeInTheDocument();

    // 👇 Simulate - Click button
    await userEvent.click(button1);

    overflowContent1 = allAdcOverflow[0].shadowRoot.querySelector(".overflow-content");
    // 🔧 Assert - Overflow content is visible
    await expect(overflowContent1).not.toBeInTheDocument();

    // Testing overflow 2

    // 🔧 Assert - Overflow2 content is not visible
    await expect(overflowContent2).not.toBeInTheDocument();

    // 👇 Simulate - Click button
    await userEvent.click(button2);

    overflowContent2 = allAdcOverflow[1].shadowRoot.querySelector(".overflow-content");
    // 🔧 Assert - Overflow1 content is visible
    await expect(overflowContent2).toBeInTheDocument();

    // 👇 Simulate - Click button
    await userEvent.click(button2);

    overflowContent2 = allAdcOverflow[1].shadowRoot.querySelector(".overflow-content");
    // 🔧 Assert - Overflow content is visible
    await expect(overflowContent2).not.toBeInTheDocument();
  }
};
