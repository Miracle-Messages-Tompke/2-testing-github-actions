import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host {
    display: flex;
    flex-direction: column;
    position: relative;
    user-select: none;
    width: 100%;
  }

  :host(:hover) .adc-select__input {
    background: var(--color-light-mode-interactive-hover-hover-on-container-default);
  }

  :host(:active) .adc-select__input {
    background: var(--color-light-mode-interactive-pressed-pressed-on-container-default);
  }

  :host .adc-select {
    position: relative;
  }

  :host(:focus-within) {
    outline: none;
  }

  :host(:focus-within) .adc-select__input,
  :host(:focus-visible) .adc-select__input {
    border-radius: var(--radius-sm);
    outline-offset: 2px;
    outline: 2px solid var(--color-light-mode-interactive-focus-outline-focus);
    border-color: var(--color-light-mode-interactive-focus-outline-focus);
  }

  :host([disabled]) .adc-select__input {
    background: var(--color-light-mode-background-container-tertiary);
    color: var(--color-light-mode-text-text-disabled);
    border-color: var(--color-light-mode-interactive-disabled-disabled-on-border-interactive);
    pointer-events: none;
  }

  :host([disabled]) .adc-select--helper-text {
    color: var(--color-light-mode-text-text-disabled);
  }

  :host([disabled]) .adc-select__arrow {
    color: var(--color-light-mode-text-text-disabled);
  }

  :host([invalid]) .adc-select__input {
    border-color: var(--color-light-mode-border-border-status-error);
  }

  :host([invalid]) .adc-select__label--invalid {
    --icon-fill: var(--color-light-mode-text-text-status-error);
  }

  :host([invalid]) .adc-select {
    border-color: var(--color-light-mode-border-border-status-error);
  }

  :host([invalid]) .adc-select ~ .adc-select--form-requirement {
    font-family: var(--typography-1440-helper-caption-font-family);
    font-size: calc(var(--typography-1440-helper-caption-font-size) * 1px);
    font-weight: var(--typography-1440-helper-caption-font-weight);
    letter-spacing: var(--typography-1440-helper-caption-letter-spacing);
    line-height: calc(var(--typography-1440-helper-caption-line-height) * 1px);
    color: var(--color-light-mode-text-text-status-error);
    display: block;
    overflow: visible;
  }

  :host([invalid]:hover) .adc-select__input,
  :host([invalid]:focus-within) .adc-select__input {
    border-color: var(--color-light-mode-border-border-interactive);
  }

  .adc-select__input {
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: var(--typography-1440-body-paragraph-letter-spacing);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    color: var(--color-light-mode-text-text-interactive);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--spacing-16);
    height: var(--spacing-48);
    background: var(--color-light-mode-background-container-default);
    cursor: pointer;
    border: 1px solid var(--color-light-mode-border-border-default);
    border-radius: var(--radius-sm);
    appearance: none;
    width: 100%;
    transition: border 180ms ease;
  }

  .adc-select-optgroup,
  .adc-select-option {
    color: var(--color-light-mode-text-text-secondary);
  }

  .adc-select__arrow {
    color: var(--color-light-mode-icon-icon-interactive);
    display: flex;
    position: absolute;
    top: var(--spacing-12);
    right: var(--spacing-16);
    pointer-events: none;
  }

  .adc-select__label {
    font-family: var(--typography-1440-label-label-font-family);
    font-size: calc(var(--typography-1440-label-label-font-size) * 1px);
    font-weight: var(--typography-1440-label-label-font-weight);
    letter-spacing: var(--typography-1440-label-label-letter-spacing);
    align-items: center;
    color: var(--color-light-mode-text-text-secondary);
    display: inline-flex;
    line-height: var(--spacing-16);
    height: var(--spacing-16);
    margin-bottom: var(--spacing-8);
  }

  .adc-select__label--required {
    appearance: auto;
    background-color: var(--color-light-mode-background-container-status-error);
    border-radius: 50%;
    height: 0.375rem;
    margin-left: var(--spacing-4);
    width: 0.375rem;
  }

  .adc-select__helper-text {
    font-family: var(--typography-1440-helper-caption-font-family);
    font-size: calc(var(--typography-1440-helper-caption-font-size) * 1px);
    font-weight: var(--typography-1440-helper-caption-font-weight);
    letter-spacing: var(--typography-1440-helper-caption-letter-spacing);
    line-height: calc(var(--typography-1440-helper-caption-line-height) * 1px);
    color: var(--color-light-mode-text-text-default);
    text-transform: inherit;
    padding-top: var(--spacing-8);
  }

  .adc-select__label--invalid {
    margin-right: var(--spacing-4);
    margin-top: calc(var(--spacing-4) * -1);
  }

  .adc-select--form-requirement {
    display: none;
    overflow: hidden;
    margin: var(--spacing-8) 0 0;
  }
`;
