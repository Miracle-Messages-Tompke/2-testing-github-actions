import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host {
    display: block;
  }

  .adc-layout {
    display: block;
    padding: 0;
    box-sizing: border-box;
    margin: 0 auto;
  }

  @media (min-width: 80em) {
    .adc-layout {
      max-width: calc(68em);
    }
  }

  @media (min-width: 64em) {
    .adc-layout {
      max-width: calc(100% - (2 * 4em));
    }
  }

  @media (min-width: 42em) {
    .adc-layout {
      max-width: calc(100% - (2 * 2em));
    }
  }

  @media (min-width: 20em) {
    .adc-layout {
      max-width: calc(100% - (2 * 0.5em));
    }
  }
`;
