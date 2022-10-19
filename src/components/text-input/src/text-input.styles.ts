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

  :host .adc-text-input__input {
    appearance: none;
  }

  :host(.focus-visible),
  :host(:focus-within) {
    outline: 0;
  }

  :host(.focus-visible) .adc-text-input__input,
  :host(:focus-within) .adc-text-input__input,
  :host([invalid].focus-visible) .adc-text-input__input,
  :host([invalid]:focus-within) .adc-text-input__input {
    border-color: var(--color-light-mode-border-border-interactive);
  }

  :host(.focus-visible) .adc-text-input--focused .adc-text-input__input,
  :host(:focus-within) .adc-text-input--focused .adc-text-input__input,
  :host([invalid].focus-visible) .adc-text-input--focused .adc-text-input__input,
  :host([invalid]:focus-within) .adc-text-input--focused .adc-text-input__input {
    border-radius: var(--radius-sm);
    outline-offset: 2px;
    outline: 2px solid var(--color-light-mode-interactive-focus-outline-focus);
  }

  :host([required]) .adc-text-input__label::after {
    background: var(--color-light-mode-icon-icon-status-error);
    border-radius: 50%;
    content: "";
    height: 6px;
    margin-left: var(--spacing-4);
    width: 6px;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  :host([disabled]) .adc-text-input__input {
    border-color: var(--color-light-mode-interactive-disabled-disabled-on-border-interactive);
    background: var(--color-light-mode-interactive-disabled-disabled-on-container-interactive);
  }

  :host([readonly]) .adc-text-input,
  :host([readonly]) .adc-text-input__input {
    background: var(--color-light-mode-background-container-tertiary);
  }

  :host([readonly]) .adc-text-input__input {
    cursor: default;
  }

  :host([invalid]) .adc-text-input__input {
    border-color: var(--color-light-mode-border-border-status-error);
  }

  :host([invalid]) .adc-text-input__helper-text {
    display: none;
  }

  :host([invalid]) .adc-text-input--form-requirement {
    color: var(--color-light-mode-text-text-status-error);
    display: block;
    font-family: var(--typography-390-helper-caption-font-family);
    font-size: calc(var(--typography-390-helper-caption-font-size) * 1px);
    font-weight: var(--typography-390-helper-caption-font-weight);
    line-height: calc(var(--typography-390-helper-caption-line-height) * 1px);
    overflow: visible;
  }

  .adc-text-input__button-container {
    display: flex;
    gap: 6px;
    pointer-events: auto;
    position: absolute;
  }

  .adc-text-input__button-container:last-child {
    right: 6px;
  }

  .adc-text-input--container {
    align-items: center;
    display: flex;
    flex-wrap: nowrap;
    pointer-events: none;
    position: relative;
  }

  .adc-text-input__input {
    background: var(--color-light-mode-background-container-default);
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-light-mode-border-border-default);
    color: var(--color-light-mode-text-text-default);
    font-family: var(--typography-390-body-paragraph-font-family);
    font-size: calc(var(--typography-390-body-paragraph-font-size) * 1px);
    font-weight: var(--typography-390-body-paragraph-font-weight);
    line-height: calc(var(--typography-390-body-paragraph-line-height) * 1px);
    padding: var(--spacing-12) var(--spacing-16);
    pointer-events: auto;
    transition: background var(--animation-speed) var(--animation-easing),
      border var(--animation-speed) var(--animation-easing);
    width: 100%;
  }

  .adc-text-input__input::placeholder {
    color: var(--color-light-mode-text-text-disabled);
  }

  .adc-text-input__input:hover {
    background: var(--color-light-mode-interactive-hover-hover-on-container-default);
  }

  .adc-text-input__input:active {
    background: var(--color-light-mode-interactive-pressed-pressed-on-container-default);
  }

  .adc-text-input--container.adc-text-input--can-clear .adc-text-input__input,
  .adc-text-input--container.adc-text-input--has-button .adc-text-input__input {
    padding-right: 58px;
  }

  .adc-text-input--container.adc-text-input--has-button.adc-text-input--can-clear
    .adc-text-input__input {
    padding-right: 116px;
  }

  .adc-text-input__label {
    align-items: center;
    color: var(--color-light-mode-text-text-secondary);
    display: inline-flex;
    font-family: var(--typography-390-label-label-font-family);
    font-size: calc(var(--typography-390-label-label-font-size) * 1px);
    font-weight: var(--typography-390-label-label-font-weight);
    line-height: calc(var(--typography-390-label-label-line-height) * 1px);
    margin-bottom: var(--spacing-8);
  }

  .adc-text-input--readonly {
    background: var(--color-light-mode-background-container-tertiary);
  }

  .adc-text-input__icon-error {
    --icon-fill: var(--color-light-mode-icon-icon-status-error);

    margin-right: var(--spacing-4);
    margin-top: calc(var(--spacing-4) * -1);
  }

  .adc-text-input__helper-text {
    color: var(--color-light-mode-text-text-default);
    font-family: var(--typography-390-helper-caption-font-family);
    font-size: calc(var(--typography-390-helper-caption-font-size) * 1px);
    font-weight: var(--typography-390-helper-caption-font-weight);
    line-height: calc(var(--typography-390-helper-caption-line-height) * 1px);
    margin-top: var(--spacing-8);
  }

  .adc-text-input--form-requirement {
    display: none;
    overflow: hidden;
    margin: var(--spacing-8) 0 0;
  }
`;
