import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host(adc-divider) {
    display: flex;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    vertical-align: top;
    width: 100%;
  }

  hr {
    display: flex;
    box-sizing: border-box;
    border: 1;
    border-top: 1px solid;
    overflow: visible;
    width: 100%;
    flex: 1;
  }

  .adc-divider {
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;
    -webkit-font-smoothing: antialiased;
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: var(--typography-1440-body-paragraph-letter-spacing);
  }

  .adc-divider::before,
  .adc-divider::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid rgb(98 122 136);
  }

  .adc-divider--text::before {
    margin-right: var(--spacing-8);
  }

  .adc-divider--text::after {
    margin-left: var(--spacing-8);
  }

  .adc-divider--dashed::before,
  .adc-divider--dashed::after {
    border-bottom: 1px dashed var(--color-light-mode-border-border-default);

  }

  .adc-divider--x-small {
    margin: var(--spacing-8) 0;
  }

  .adc-divider--small {
    margin: var(--spacing-16) 0;
  }

  .adc-divider--medium {
    margin: var(--spacing-24) 0;
  }

  .adc-divider--large {
    margin: var(--spacing-32) 0;
  }

  .adc-divider--spacing-12 {
    margin: var(--spacing-12) 0;
  }

  .adc-divider--spacing-16 {
    margin: var(--spacing-16) 0;
  }

  .adc-divider--spacing-24 {
    margin: var(--spacing-24) 0;
  }

  .adc-divider--spacing-32 {
    margin: var(--spacing-32) 0;
  }

  .adc-divider--spacing-40 {
    margin: var(--spacing-40) 0;
  }

  .adc-divider--spacing-48 {
    margin: var(--spacing-48) 0;
  }

  .adc-divider--spacing-64 {
    margin: var(--spacing-64) 0;
  }

  ::slotted(*:not(:first-child)) {
    margin-left: var(--spacing-4) !important;
  }

  ::slotted(*:not(:last-child)) {
    margin-right: var(--spacing-4) !important;
  }
`;
