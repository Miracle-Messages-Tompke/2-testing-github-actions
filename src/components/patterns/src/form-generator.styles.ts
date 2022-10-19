import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host {
    display: flex;
    width: 100%;
  }

  :host(.focus-visible),
  :host(:focus-within) {
    outline: 0;
  }
`;
