import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host {
    align-items: center;
    background-color: rgba(255 255 255 / 0.8);
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
    position: absolute;
  }

  :host(.focus-visible),
  :host(:focus-within) {
    outline: 0;
  }

  .adc-loading-success--icon,
  .adc-loading-error--icon {
    display: inline-flex;
  }

  .adc-loading-success--icon adc-icon::part(icon) {
    --icon-fill: var(--color-light-mode-icon-icon-status-success);
  }

  .adc-loading-error--icon adc-icon::part(icon) {
    --icon-fill: var(--color-light-mode-icon-icon-status-error);
  }

  .adc-inline-loading--label {
    font-family: var(--typography-1440-label-label-font-family);
    font-size: calc(var(--typography-1440-label-label-font-size) * 1px);
    line-height: calc(var(--typography-1440-label-label-line-height) * 1px);
    font-weight: var(--typography-1440-label-label-font-weight);
    letter-spacing: calc(var(--typography-1440-label-label-letter-spacing) * 1px);

    align-items: center;
    color: var(--color-light-mode-text-text-default);
    display: inline-flex;
    margin: 0;
    position: relative;
    vertical-align: middle;
    white-space: nowrap;
  }

  .adc-inline-loading--label:focus {
    outline: var(--color-light-mode-border-border-selected) solid 1px;
  }

  .adc-loading--label {
    font-family: var(--typography-390-body-lead-font-family);
    font-size: calc(var(--typography-390-body-lead-font-size) * 1px);
    line-height: calc(var(--typography-390-body-lead-line-height) * 1px);
    font-weight: var(--typography-390-body-lead-font-weight);
    letter-spacing: calc(var(--typography-390-body-lead-letter-spacing) * 1px);
    align-items: center;
    color: var(--color-light-mode-text-text-default);
    display: inline-flex;
    position: relative;
    vertical-align: middle;
    white-space: nowrap;

    margin: var(--spacing-16);
  }

  .adc-loading--label:focus {
    outline: var(--color-light-mode-border-border-selected) solid 1px;
  }

  .adc-inline-loading__container {
    display: inline-flex;
    margin-right: var(--spacing-4);
  }

  .adc-loading__wrapper {
    align-items: center;
    text-align: center;
  }

  .adc-loading--active {
    margin-bottom: var(--spacing-16);
  }
`;
