import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host(.focus-visible),
  :host(:focus-within) {
    outline: 0;
  }

  :host(adc-grid) {
    display: block;
    flex-grow: 1;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
  }

  :host(adc-grid[reverse]) ::slotted(adc-row) {
    flex-direction: row-reverse;
  }

  :host(adc-grid[flush]) {
    margin-left: var(--spacing-16);
    margin-right: var(--spacing-16);
  }

  :host(adc-grid[form]) ::slotted(adc-row) {
    align-items: flex-start;
  }

  :host(adc-grid[position="start"]) {
    justify-content: flex-start;
  }

  :host(adc-grid[position="center"]) {
    justify-content: center;
  }

  :host(adc-grid[position="end"]) {
    justify-content: flex-end;
  }

  @media (min-width: 1440px) {
    :host(adc-grid) {
      max-width: 1216px;
      width: 100%;
      margin: 0 auto;
    }

    :host(adc-grid[nested]) {
      width: 100%;
    }
  }

  :host(adc-row) {
    display: flex;
    flex-wrap: wrap;
    margin-left: calc(var(--spacing-16) * -1);
    margin-right: calc(var(--spacing-16) * -1);
  }

  :host(adc-row[has-form]) ::slotted(adc-column) {
    margin-bottom: var(--spacing-32);
  }

  :host(adc-row[flush]) ::slotted(adc-column) {
    padding-left: 0;
    padding-right: 0;
  }

  :host(adc-column) {
    display: block;
    padding-left: var(--spacing-16);
    padding-right: var(--spacing-16);
    width: 100%;
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
    box-sizing: border-box;
  }

  :host(adc-column[col-phone="1"]) {
    display: block;
    flex: 0 0 calc(100% / (4 / 1));
    max-width: calc(100% / (4 / 1));
  }

  :host(adc-column[col-phone-offset="1"]) {
    margin-left: calc(100% / (4 / 1));
  }

  :host(adc-column[col-phone="2"]) {
    display: block;
    flex: 0 0 calc(100% / (4 / 2));
    max-width: calc(100% / (4 / 2));
  }

  :host(adc-column[col-phone-offset="2"]) {
    margin-left: calc(100% / (4 / 2));
  }

  :host(adc-column[col-phone="3"]) {
    display: block;
    flex: 0 0 calc(100% / (4 / 3));
    max-width: calc(100% / (4 / 3));
  }

  :host(adc-column[col-phone-offset="3"]) {
    margin-left: calc(100% / (4 / 3));
  }

  :host(adc-column[col-phone="4"]) {
    display: block;
    flex: 0 0 calc(100% / (4 / 4));
    max-width: calc(100% / (4 / 4));
  }

  :host(adc-column[col-phone-offset="4"]) {
    margin-left: calc(100% / (4 / 4));
  }

  @media (min-width: 800px) {
    :host(adc-column[col-tablet="1"]) {
      display: block;
      flex: 0 0 calc(100% / (8 / 1));
      max-width: calc(100% / (8 / 1));
    }

    :host(adc-column[col-tablet-offset="1"]) {
      margin-left: calc(100% / (8 / 1));
    }

    :host(adc-column[col-tablet="2"]) {
      display: block;
      flex: 0 0 calc(100% / (8 / 2));
      max-width: calc(100% / (8 / 2));
    }

    :host(adc-column[col-tablet-offset="2"]) {
      margin-left: calc(100% / (8 / 2));
    }

    :host(adc-column[col-tablet="3"]) {
      display: block;
      flex: 0 0 calc(100% / (8 / 3));
      max-width: calc(100% / (8 / 3));
    }

    :host(adc-column[col-tablet-offset="3"]) {
      margin-left: calc(100% / (8 / 3));
    }

    :host(adc-column[col-tablet="4"]) {
      display: block;
      flex: 0 0 calc(100% / (8 / 4));
      max-width: calc(100% / (8 / 4));
    }

    :host(adc-column[col-tablet-offset="4"]) {
      margin-left: calc(100% / (8 / 4));
    }

    :host(adc-column[col-tablet="5"]) {
      display: block;
      flex: 0 0 calc(100% / (8 / 5));
      max-width: calc(100% / (8 / 5));
    }

    :host(adc-column[col-tablet-offset="5"]) {
      margin-left: calc(100% / (8 / 5));
    }

    :host(adc-column[col-tablet="6"]) {
      display: block;
      flex: 0 0 calc(100% / (8 / 6));
      max-width: calc(100% / (8 / 6));
    }

    :host(adc-column[col-tablet-offset="6"]) {
      margin-left: calc(100% / (8 / 6));
    }

    :host(adc-column[col-tablet="7"]) {
      display: block;
      flex: 0 0 calc(100% / (8 / 7));
      max-width: calc(100% / (8 / 7));
    }

    :host(adc-column[col-tablet-offset="7"]) {
      margin-left: calc(100% / (8 / 7));
    }

    :host(adc-column[col-tablet="8"]) {
      display: block;
      flex: 0 0 calc(100% / (8 / 8));
      max-width: calc(100% / (8 / 8));
    }

    :host(adc-column[col-tablet-offset="8"]) {
      margin-left: calc(100% / (8 / 8));
    }
  }

  @media (min-width: 1280px) {
    :host(adc-column[col-desktop="1"]) {
      display: block;
      flex: 0 0 calc(100% / (12 / 1));
      max-width: calc(100% / (12 / 1));
    }

    :host(adc-column[col-desktop-offset="1"]) {
      margin-left: calc(100% / (12 / 1));
    }

    :host(adc-column[col-desktop="2"]) {
      display: block;
      flex: 0 0 calc(100% / (12 / 2));
      max-width: calc(100% / (12 / 2));
    }

    :host(adc-column[col-desktop-offset="2"]) {
      margin-left: calc(100% / (12 / 2));
    }

    :host(adc-column[col-desktop="3"]) {
      display: block;
      flex: 0 0 calc(100% / (12 / 3));
      max-width: calc(100% / (12 / 3));
    }

    :host(adc-column[col-desktop-offset="3"]) {
      margin-left: calc(100% / (12 / 3));
    }

    :host(adc-column[col-desktop="4"]) {
      display: block;
      flex: 0 0 calc(100% / (12 / 4));
      max-width: calc(100% / (12 / 4));
    }

    :host(adc-column[col-desktop-offset="4"]) {
      margin-left: calc(100% / (12 / 4));
    }

    :host(adc-column[col-desktop="5"]) {
      display: block;
      flex: 0 0 calc(100% / (12 / 5));
      max-width: calc(100% / (12 / 5));
    }

    :host(adc-column[col-desktop-offset="5"]) {
      margin-left: calc(100% / (12 / 5));
    }

    :host(adc-column[col-desktop="6"]) {
      display: block;
      flex: 0 0 calc(100% / (12 / 6));
      max-width: calc(100% / (12 / 6));
    }

    :host(adc-column[col-desktop-offset="6"]) {
      margin-left: calc(100% / (12 / 6));
    }

    :host(adc-column[col-desktop="7"]) {
      display: block;
      flex: 0 0 calc(100% / (12 / 7));
      max-width: calc(100% / (12 / 7));
    }

    :host(adc-column[col-desktop-offset="7"]) {
      margin-left: calc(100% / (12 / 7));
    }

    :host(adc-column[col-desktop="8"]) {
      display: block;
      flex: 0 0 calc(100% / (12 / 8));
      max-width: calc(100% / (12 / 8));
    }

    :host(adc-column[col-desktop-offset="8"]) {
      margin-left: calc(100% / (12 / 8));
    }

    :host(adc-column[col-desktop="9"]) {
      display: block;
      flex: 0 0 calc(100% / (12 / 9));
      max-width: calc(100% / (12 / 9));
    }

    :host(adc-column[col-desktop-offset="9"]) {
      margin-left: calc(100% / (12 / 9));
    }

    :host(adc-column[col-desktop="10"]) {
      display: block;
      flex: 0 0 calc(100% / (12 / 10));
      max-width: calc(100% / (12 / 10));
    }

    :host(adc-column[col-desktop-offset="10"]) {
      margin-left: calc(100% / (12 / 10));
    }

    :host(adc-column[col-desktop="11"]) {
      display: block;
      flex: 0 0 calc(100% / (12 / 11));
      max-width: calc(100% / (12 / 11));
    }

    :host(adc-column[col-desktop-offset="11"]) {
      margin-left: calc(100% / (12 / 11));
    }

    :host(adc-column[col-desktop="12"]) {
      display: block;
      flex: 0 0 calc(100% / (12 / 12));
      max-width: calc(100% / (12 / 12));
    }

    :host(adc-column[col-desktop-offset="12"]) {
      margin-left: calc(100% / (12 / 12));
    }
  }
`;
