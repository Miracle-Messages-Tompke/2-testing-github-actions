import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}
  :host(adc-ordered-list) .adc-list--ordered.adc-list--nested {
    list-style-type: lower-latin;
  }

  :host(adc-unordered-list) .adc-list--unordered.adc-list--nested {
    list-style-type: circle;
  }

  :host(adc-list-item) {
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: calc(var(--typography-1440-body-paragraph-letter-spacing) * 1px);

    display: list-item;
    line-height: var(--spacing-24);
    color: var(--color-light-mode-text-text-default);
  }

  :host(adc-list-item) adc-icon {
    display: none;
    position: relative;
    top: -3px;
  }

  ol,
  ul {
    padding-inline-start: var(--spacing-24);
  }

  .adc-list--ordered,
  .adc-list--unordered {
    margin: 0;
  }

  :host(adc-list-item[kind="error"]) .icon-error,
  :host(adc-list-item[kind="success"]) .icon-success {
    display: inline;
  }

  :host(adc-list-item[kind="success"]) adc-icon::part(icon) {
    --icon-fill: var(--color-light-mode-icon-icon-status-success);
  }

  :host(adc-list-item[kind="error"]) adc-icon::part(icon) {
    --icon-fill: var(--color-light-mode-icon-icon-status-error);
  }

  :host(adc-list-item[kind="error"])::marker,
  :host(adc-list-item[kind="success"])::marker {
    content: "";
  }
`;
