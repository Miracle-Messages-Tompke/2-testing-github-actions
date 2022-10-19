import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host {
    display: flex;
    flex-direction: column;
    outline: none;
    width: 100%;
  }

  :host(.focus-visible),
  :host(:focus-within) {
    outline: 0;
  }

  :host([invalid]) .adc-number-input__input,
  :host([required]) .adc-number-input__input {
    border-color: var(--color-light-mode-border-border-status-error);
  }

  :host([invalid]:hover) .adc-number-input__input,
  :host([required]:hover) .adc-number-input__input,
  :host([invalid]:focus-within) .adc-number-input__input {
    border-color: var(--color-light-mode-border-border-interactive);
  }

  :host([disabled]) {
    pointer-events: none;
  }

  :host([disabled]) .adc-number-input__input {
    background: var(--color-light-mode-interactive-disabled-disabled-on-container-interactive);
    border: 1px solid var(--color-light-mode-interactive-disabled-disabled-on-border-interactive);
    color: var(--color-light-mode-text-text-disabled);
  }

  :host([disabled]) .adc-number-input__control {
    border: 1px solid var(--color-light-mode-interactive-disabled-disabled-on-border-interactive);
    color: var(--color-light-mode-text-text-disabled);
  }

  .adc-number-input__wrapper {
    display: inline-flex;
  }

  .adc-number-input__input {
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: var(--typography-1440-body-paragraph-letter-spacing);

    border-radius: var(--radius-sm);

    border: 1px solid var(--color-light-mode-border-border-default);
    color: var(--color-light-mode-text-text-default);
    height: var(--spacing-48);
    width: 100%;
    padding: 0 !important;
    outline: none;
    text-align: center;
    margin: 0 var(--spacing-16);
  }

  .adc-number-input__input:focus {
    border: 1px solid var(--color-light-mode-interactive-focus-outline-focus);
    outline: none;
  }

  .adc-number-input__input::-webkit-outer-spin-button {
    appearance: none;
  }

  .adc-number-input__input::-webkit-inner-spin-button {
    appearance: none;
  }

  .adc-number-input__input::placeholder {
    color: var(--color-light-mode-text-text-secondary);
  }

  .adc-number-input--exceed-min,
  .adc-number-input--exceed-max {
    border: 1px solid var(--color-light-mode-border-border-status-error) !important;
  }

  .adc-number-input__control {
    border-radius: var(--radius-sm);

    background: transparent;
    border: 1px solid var(--color-light-mode-border-border-interactive);
    color: var(--color-light-mode-text-text-interactive);
    min-width: var(--spacing-48);
    max-width: var(--spacing-48);
    min-height: var(--spacing-48);
    max-height: var(--spacing-48);
  }

  .adc-number-input__control:hover {
    background: var(--color-light-mode-interactive-hover-hover-on-container-default);
    cursor: pointer;
  }

  .adc-number-input__control:focus-visible {
    background: var(--color-light-mode-interactive-hover-hover-on-container-default);
    border: 1px solid var(--color-light-mode-interactive-focus-outline-focus);
    outline: none;
  }

  .adc-number-input__control--min,
  .adc-number-input__control--max {
    border-radius: var(--radius-sm);

    background: transparent;
    border: 1px solid var(--color-light-mode-interactive-disabled-disabled-on-border-interactive);
    color: var(--color-light-mode-text-text-disabled);
    min-width: var(--spacing-48);
    max-width: var(--spacing-48);
    min-height: var(--spacing-48);
    max-height: var(--spacing-48);
  }

  .adc-number-input--form-requirement {
    font-family: var(--typography-390-helper-caption-font-family);
    font-size: calc(var(--typography-390-helper-caption-font-size) * 1px);
    line-height: calc(var(--typography-390-helper-caption-line-height) * 1px);
    font-weight: var(--typography-390-helper-caption-font-weight);
    letter-spacing: var(--typography-390-helper-caption-letter-spacing);

    color: var(--color-light-mode-text-text-status-error);
    overflow: hidden;
    margin: var(--spacing-8) var(--spacing-64);
  }
`;
