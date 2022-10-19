import "@aileron/search";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const config = [
  {
    name: "Chicago",
    code: "CHI",
    stateCode: "IL",
    countryCode: "US",
    countryName: "United States",
    displayName: "CHI - Chicago, IL",
    selectionName: "CHI"
  },
  {
    name: "Chiang Mai International",
    code: "CNX",
    stateCode: "",
    countryCode: "TH",
    countryName: "Thailand",
    displayName: "CNX - Chiang Mai International, Thailand",
    selectionName: "CNX"
  },
  {
    name: "Chicago OHare International",
    code: "ORD",
    stateCode: "IL",
    countryCode: "US",
    countryName: "United States",
    displayName: "ORD - Chicago OHare International, IL",
    selectionName: "ORD"
  },
  {
    name: "Chihuahua Gen Fierro Villalobos",
    code: "CUU",
    stateCode: "",
    countryCode: "MX",
    countryName: "Mexico",
    displayName: "CUU - Chihuahua Gen Fierro Villalobos, Mexico",
    selectionName: "CUU"
  },
  {
    name: "Ho Chi Minh City",
    code: "SGN",
    stateCode: "",
    countryCode: "VN",
    countryName: "Vietnam",
    displayName: "SGN - Ho Chi Minh City, Vietnam",
    selectionName: "SGN"
  },
  {
    name: "Antofagasta Cerro Moreno",
    code: "ANF",
    stateCode: "",
    countryCode: "CL",
    countryName: "Chile",
    displayName: "ANF - Antofagasta Cerro Moreno, Chile",
    selectionName: "ANF"
  },
  {
    name: "Arica Chacalluta",
    code: "ARI",
    stateCode: "",
    countryCode: "CL",
    countryName: "Chile",
    displayName: "ARI - Arica Chacalluta, Chile",
    selectionName: "ARI"
  },
  {
    name: "Beijing",
    code: "BJS",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "BJS - Beijing, China",
    selectionName: "BJS"
  },
  {
    name: "Beijing Capital Intl",
    code: "PEK",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "PEK - Beijing Capital Intl, China",
    selectionName: "PEK"
  },
  {
    name: "Beijing Daxing Intl",
    code: "PKX",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "PKX - Beijing Daxing Intl, China",
    selectionName: "PKX"
  },
  {
    name: "Changchun Longjia Intl",
    code: "CGQ",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "CGQ - Changchun Longjia Intl, China",
    selectionName: "CGQ"
  },
  {
    name: "Changsha Huanghua Intl",
    code: "CSX",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "CSX - Changsha Huanghua Intl, China",
    selectionName: "CSX"
  },
  {
    name: "Chengdu",
    code: "CTU",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "CTU - Chengdu, China",
    selectionName: "CTU"
  },
  {
    name: "Chongqing",
    code: "CKG",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "CKG - Chongqing, China",
    selectionName: "CKG"
  },
  {
    name: "Concepcion Carriel Sur",
    code: "CCP",
    stateCode: "",
    countryCode: "CL",
    countryName: "Chile",
    displayName: "CCP - Concepcion Carriel Sur, Chile",
    selectionName: "CCP"
  },
  {
    name: "Copiapo Chamonate",
    code: "CPO",
    stateCode: "",
    countryCode: "CL",
    countryName: "Chile",
    displayName: "CPO - Copiapo Chamonate, Chile",
    selectionName: "CPO"
  },
  {
    name: "Dalian",
    code: "DLC",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "DLC - Dalian, China",
    selectionName: "DLC"
  },
  {
    name: "Easter Island Mataveri Intl",
    code: "IPC",
    stateCode: "",
    countryCode: "CL",
    countryName: "Chile",
    displayName: "IPC - Easter Island Mataveri Intl, Chile",
    selectionName: "IPC"
  },
  {
    name: "Guangzhou Baiyun",
    code: "CAN",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "CAN - Guangzhou Baiyun, China",
    selectionName: "CAN"
  },
  {
    name: "Guilin Liangjiang Intl",
    code: "KWL",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "KWL - Guilin Liangjiang Intl, China",
    selectionName: "KWL"
  },
  {
    name: "Guiyang Longdongbao Intl",
    code: "KWE",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "KWE - Guiyang Longdongbao Intl, China",
    selectionName: "KWE"
  },
  {
    name: "Haikou Meilan Intl",
    code: "HAK",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "HAK - Haikou Meilan Intl, China",
    selectionName: "HAK"
  },
  {
    name: "Harbin Taiping Intl",
    code: "HRB",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "HRB - Harbin Taiping Intl, China",
    selectionName: "HRB"
  },
  {
    name: "Iquique Cavancha",
    code: "IQQ",
    stateCode: "",
    countryCode: "CL",
    countryName: "Chile",
    displayName: "IQQ - Iquique Cavancha, Chile",
    selectionName: "IQQ"
  },
  {
    name: "La Serena La Florida",
    code: "LSC",
    stateCode: "",
    countryCode: "CL",
    countryName: "Chile",
    displayName: "LSC - La Serena La Florida, Chile",
    selectionName: "LSC"
  },
  {
    name: "Osorno Canal Balo",
    code: "ZOS",
    stateCode: "",
    countryCode: "CL",
    countryName: "Chile",
    displayName: "ZOS - Osorno Canal Balo, Chile",
    selectionName: "ZOS"
  },
  {
    name: "Puerto Montt Tepual",
    code: "PMC",
    stateCode: "",
    countryCode: "CL",
    countryName: "Chile",
    displayName: "PMC - Puerto Montt Tepual, Chile",
    selectionName: "PMC"
  },
  {
    name: "Punta Arenas Pres Ibanez",
    code: "PUQ",
    stateCode: "",
    countryCode: "CL",
    countryName: "Chile",
    displayName: "PUQ - Punta Arenas Pres Ibanez, Chile",
    selectionName: "PUQ"
  },
  {
    name: "Santiago Arturo Merino Benitez",
    code: "SCL",
    stateCode: "",
    countryCode: "CL",
    countryName: "Chile",
    displayName: "SCL - Santiago Arturo Merino Benitez, Chile",
    selectionName: "SCL"
  },
  {
    name: "Sanya Phoenix Intl",
    code: "SYX",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "SYX - Sanya Phoenix Intl, China",
    selectionName: "SYX"
  },
  {
    name: "Shanghai Hongqiao International Airport",
    code: "SHA",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "SHA - Shanghai Hongqiao International Airport, China",
    selectionName: "SHA"
  },
  {
    name: "Shanghai Pudong international Airport",
    code: "PVG",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "PVG - Shanghai Pudong international Airport, China",
    selectionName: "PVG"
  },
  {
    name: "Shenyang",
    code: "SHE",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "SHE - Shenyang, China",
    selectionName: "SHE"
  },
  {
    name: "Shenzhen",
    code: "SZX",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "SZX - Shenzhen, China",
    selectionName: "SZX"
  },
  {
    name: "Temuco",
    code: "ZCO",
    stateCode: "",
    countryCode: "CL",
    countryName: "Chile",
    displayName: "ZCO - Temuco, Chile",
    selectionName: "ZCO"
  },
  {
    name: "Urumqi Diwopu Intl",
    code: "URC",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "URC - Urumqi Diwopu Intl, China",
    selectionName: "URC"
  },
  {
    name: "Valdivia Pichoy",
    code: "ZAL",
    stateCode: "",
    countryCode: "CL",
    countryName: "Chile",
    displayName: "ZAL - Valdivia Pichoy, Chile",
    selectionName: "ZAL"
  },
  {
    name: "Wuhan Tianhe Intl",
    code: "WUH",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "WUH - Wuhan Tianhe Intl, China",
    selectionName: "WUH"
  },
  {
    name: "Zhengzhou Xinzheng Intl",
    code: "CGO",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "CGO - Zhengzhou Xinzheng Intl, China",
    selectionName: "CGO"
  },
  {
    name: "Xi An Xianyang",
    code: "XIY",
    stateCode: "",
    countryCode: "CN",
    countryName: "China",
    displayName: "XIY - Xi An Xianyang, China",
    selectionName: "XIY"
  }
];

const Template = (
  {
    disabled,
    filterByDisplayName,
    required,
    "spell-check": spellCheck,
    args,
    labelText,
    validityMessage,
    placeholder,
    invalid,
    value,
    autofocus
  } = {
    disabled: false,
    filterByDisplayName: false,
    required: false,
    "spell-check": "false",
    labelText: "Label",
    invalid: false,
    autofocus: false,
    validityMessage: "",
    placeholder: "",
    value: ""
  }
) => {
  const { open, onClose } = args?.["adc-search"] ?? {};
  return html`
    <adc-search
      config="${JSON.stringify(config)}"
      @adc-search-closed=${onClose}
      ?open=${open}
      ?required="${required}"
      ?disabled="${disabled}"
      ?filterByDisplayName="${filterByDisplayName}"
      validity-message="${ifDefined(validityMessage)}"
      placeholder="${ifDefined(placeholder)}"
      ?invalid="${invalid}"
      ?autofocus="${autofocus}"
      value="${ifDefined(value)}"
      label-text="${ifDefined(labelText)}"
      spell-check="${spellCheck}"
    >
    </adc-search>
  `;
};
const Template2 = (
  {
    disabled,
    filterByDisplayName,
    required,
    "spell-check": spellCheck,
    args,
    labelText,
    validityMessage,
    placeholder,
    invalid,
    value,
    autofocus
  } = {
    disabled: false,
    filterByDisplayName: false,
    required: false,
    "spell-check": "false",
    labelText: "Label",
    invalid: false,
    autofocus: false,
    validityMessage: "",
    placeholder: "",
    value: ""
  }
) => {
  const { open, onClose } = args?.["adc-search"] ?? {};

  return html`
    <adc-search
      config="${JSON.stringify(config)}"
      @adc-search-closed=${onClose}
      ?open=${open}
      ?required="${required}"
      ?disabled="${disabled}"
      ?filterByDisplayName="${filterByDisplayName}"
      validity-message="${ifDefined(validityMessage)}"
      placeholder="${ifDefined(placeholder)}"
      ?invalid="${invalid}"
      ?autofocus="${autofocus}"
      value="${ifDefined(value)}"
      label-text="${ifDefined(labelText)}"
      spell-check="${spellCheck}"
    >
    </adc-search>
    <adc-search
      config="${JSON.stringify(config)}"
      @adc-search-closed=${onClose}
      ?open=${open}
      ?required="${required}"
      ?disabled="${disabled}"
      ?filterByDisplayName="${filterByDisplayName}"
      validity-message="${ifDefined(validityMessage)}"
      placeholder="${ifDefined(placeholder)}"
      ?invalid="${invalid}"
      ?autofocus="${autofocus}"
      value="${ifDefined(value)}"
      label-text="${ifDefined(labelText)}"
      spell-check="${spellCheck}"
    >
    </adc-search>
  `;
};

export default {
  title: "Components/Search",
  component: "adc-search",
  args: {
    open: false,
    disabled: false,
    filterByDisplayName: false,
    required: false,
    invalid: false,
    autofocus: false,
    labelText: "",
    value: "",
    placeholder: "",
    validityMessage: "",
    "spell-check": "false"
  },
  argTypes: {
    onInput: { action: "input", table: { disable: true } }
  }
};

export const Default = (args) => Template(args);
Default.args = {
  disabled: false,
  filterByDisplayName: true,
  required: false,
  spellcheck: false,
  labelText: "Label",
  placeholder: "City or Airport",
  value: ""
};
Default.parameters = {
  jest: "search.test.ts"
};

Default.play = async ({ canvasElement }) => {
  const textInput = canvasElement
    .querySelector("adc-search")
    .shadowRoot.querySelector("adc-text-input")
    .shadowRoot.querySelector(".adc-text-input--container")
    .querySelector("input");

  let clearButtonContainer = canvasElement
    .querySelector("adc-search")
    .shadowRoot.querySelector(".adc-search--search-input__wrapper")
    .querySelector(".adc-search--container");

  // 🔧  Assert - Input field is empty
  await expect(textInput.value).toBe("");

  // 🔧  Assert - Clear button is hidden
  await expect(clearButtonContainer).not.toBeInTheDocument();

  // 👇 Simulate - Type in City
  userEvent.type(textInput, "Seattle");

  // 🔧  Assert - Input field is filled with city
  await expect(textInput.value).toBe("Seattle");

  await timeout(1500);

  clearButtonContainer = canvasElement
    .querySelector("adc-search")
    .shadowRoot.querySelector(".adc-search--search-input__wrapper")
    .querySelector(".adc-search--container");
  // 🔧  Assert - Clear button is found
  await expect(clearButtonContainer).toBeInTheDocument();

  let clearButton = canvasElement
    .querySelector("adc-search")
    .shadowRoot.querySelector(".adc-search--search-input__wrapper")
    .querySelector(".adc-search--container")
    .querySelector("button");

  // 👇 Simulate - Click clear button
  userEvent.click(clearButton);

  await timeout(500);

  // 🔧  Assert - Input field is cleared
  await expect(textInput.value).toBe("");
};

export const Required = (args) => Template(args);
Required.args = {
  disabled: false,
  required: true,
  filterByDisplayName: false,
  spellcheck: false,
  invalid: true,
  validityMessage: "Validation Message",
  labelText: "Required Label",
  placeholder: "City or Airport"
};
Required.parameters = {
  jest: "search.test.ts"
};

Required.play = async ({ canvasElement }) => {
  const textInput = canvasElement
    .querySelector("adc-search")
    .shadowRoot.querySelector("adc-text-input")
    .shadowRoot.querySelector(".adc-text-input--container")
    .querySelector("input");

  let clearButtonContainer = canvasElement
    .querySelector("adc-search")
    .shadowRoot.querySelector(".adc-search--search-input__wrapper")
    .querySelector(".adc-search--container");

  // 🔧  Assert - Input field is empty
  await expect(textInput.value).toBe("");

  // 🔧  Assert - Clear button is hidden
  await expect(clearButtonContainer).not.toBeInTheDocument();

  // 👇 Simulate - Type in City
  userEvent.type(textInput, "Seattle");

  // 🔧  Assert - Input field is filled with city
  await expect(textInput.value).toBe("Seattle");

  await timeout(1500);

  clearButtonContainer = canvasElement
    .querySelector("adc-search")
    .shadowRoot.querySelector(".adc-search--search-input__wrapper")
    .querySelector(".adc-search--container");
  // 🔧  Assert - Clear button is found
  await expect(clearButtonContainer).toBeInTheDocument();

  let clearButton = canvasElement
    .querySelector("adc-search")
    .shadowRoot.querySelector(".adc-search--search-input__wrapper")
    .querySelector(".adc-search--container")
    .querySelector("button");

  // 👇 Simulate - Click clear button
  userEvent.click(clearButton);

  await timeout(500);

  // 🔧  Assert - Input field is cleared
  await expect(textInput.value).toBe("");
};

export const Disabled = (args) => Template(args);
Disabled.args = {
  disabled: true,
  filterByDisplayName: true,
  required: false,
  placeholder: "City or Airport",
  labelText: "Required Label"
};
Disabled.parameters = {
  jest: "search.test.ts"
};
export const Multiple = (args) => Template2(args);
Multiple.args = {
  disabled: false,
  filterByDisplayName: true,
  required: false,
  spellcheck: false,
  labelText: "Label",
  placeholder: "City or Airport",
  value: ""
};
Multiple.parameters = {
  jest: "search.test.ts"
};

Multiple.play = async ({ canvasElement }) => {
  const allTextInput = canvasElement.querySelectorAll("adc-search");
  const textInput1 = allTextInput[0].shadowRoot
    .querySelector("adc-text-input")
    .shadowRoot.querySelector(".adc-text-input--container")
    .querySelector("input");
  const textInput2 = allTextInput[1].shadowRoot
    .querySelector("adc-text-input")
    .shadowRoot.querySelector(".adc-text-input--container")
    .querySelector("input");

  let clearButtonContainer1 = allTextInput[0].shadowRoot
    .querySelector(".adc-search--search-input__wrapper")
    .querySelector(".adc-search--container");
  let clearButtonContainer2 = allTextInput[1].shadowRoot
    .querySelector(".adc-search--search-input__wrapper")
    .querySelector(".adc-search--container");

  // TESTING INPUT 1

  // 🔧  Assert - Input field is empty
  await expect(textInput1.value).toBe("");

  // 🔧  Assert - Clear button is hidden
  await expect(clearButtonContainer1).not.toBeInTheDocument();

  // 👇 Simulate - Type in City
  userEvent.type(textInput1, "Seattle");

  // 🔧  Assert - Input field is filled with city
  await expect(textInput1.value).toBe("Seattle");

  await timeout(1500);

  clearButtonContainer1 = allTextInput[0].shadowRoot
    .querySelector(".adc-search--search-input__wrapper")
    .querySelector(".adc-search--container");
  // 🔧  Assert - Clear button is found
  await expect(clearButtonContainer1).toBeInTheDocument();

  let clearButton = allTextInput[0].shadowRoot
    .querySelector(".adc-search--search-input__wrapper")
    .querySelector(".adc-search--container")
    .querySelector("button");

  // 👇 Simulate - Click clear button
  userEvent.click(clearButton);

  await timeout(500);

  // 🔧  Assert - Input field is cleared
  await expect(textInput1.value).toBe("");

  // TESTING INPUT 2

  // 🔧  Assert - Input field is empty
  await expect(textInput2.value).toBe("");

  // 🔧  Assert - Clear button is hidden
  await expect(clearButtonContainer2).not.toBeInTheDocument();

  // 👇 Simulate - Type in City
  userEvent.type(textInput2, "Chicago");

  // 🔧  Assert - Input field is filled with city
  await expect(textInput2.value).toBe("Chicago");

  await timeout(1500);

  clearButtonContainer2 = allTextInput[1].shadowRoot
    .querySelector(".adc-search--search-input__wrapper")
    .querySelector(".adc-search--container");
  // 🔧  Assert - Clear button is found
  await expect(clearButtonContainer2).toBeInTheDocument();

  let clearButton2 = allTextInput[1].shadowRoot
    .querySelector(".adc-search--search-input__wrapper")
    .querySelector(".adc-search--container")
    .querySelector("button");

  // 👇 Simulate - Click clear button
  userEvent.click(clearButton2);

  await timeout(500);

  // 🔧  Assert - Input field is cleared
  await expect(textInput2.value).toBe("");
};
