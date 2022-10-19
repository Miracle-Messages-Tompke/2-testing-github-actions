import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host(.focus-visible),
  :host(:focus-within) {
    outline: 0;
  }

  :host(adc-radio-group) {
    font-family: var(--typography-1440-label-label-font-family);
    font-size: calc(var(--typography-1440-label-label-font-size) * 1px);
    line-height: calc(var(--typography-1440-label-label-line-height) * 1px);
    font-weight: var(--typography-1440-label-label-font-weight);
    letter-spacing: calc(var(--typography-1440-label-label-letter-spacing) * 1px);

    color: var(--color-light-mode-text-text-secondary);
    display: block;
    margin-bottom: var(--spacing-4);
  }

  :host(adc-radio-button) {
    display: inline-flex;
    outline: none;
  }

  :host(:focus-visible) .adc-radio-button__control,
  :host(:focus-within) .adc-radio-button__control {
    border: 1px solid var(--color-light-mode-border-border-interactive);
  }

  :host(:focus-visible) .adc-radio-button__control::after,
  :host(:focus-within) .adc-radio-button__control::after {
    border-radius: 50%;

    background: rgba(0 120 210 / 0.24);
    height: var(--spacing-32);
    transition: background 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      width 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, height 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: var(--spacing-32);
  }

  :host(adc-radio-button:hover) .adc-radio-button__control {
    border: 1px solid var(--color-light-mode-text-text-secondary);
  }

  :host(adc-radio-button:hover) .adc-radio-button__control::after {
    border-radius: 50%;

    background: var(--color-light-mode-interactive-hover-hover-on-container-default);
    height: var(--spacing-32);
    transition: background 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      width 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, height 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: var(--spacing-32);
  }

  :host([label-position="left"]) .adc-radio-button__label {
    flex-direction: row-reverse;
  }

  :host([label-position="left"]) .adc-radio-button__control {
    margin-left: var(--spacing-8);
    margin-right: 0;
  }

  :host([orientation="horizontal"]) {
    margin-right: var(--spacing-16);
  }

  :host([orientation="horizontal"]:last-child) {
    margin-right: 0;
  }

  :host([orientation="horizontal"][label-position="left"]) {
    margin-left: var(--spacing-16);
    margin-right: 0;
  }

  :host([orientation="horizontal"][label-position="left"]:first-child) {
    margin-left: 0;
  }

  :host(adc-radio-group[orientation="vertical"]) .adc-radio-group__label-text {
    margin-bottom: var(--spacing-8);
  }

  :host(adc-radio-button[orientation="vertical"]) {
    display: flex;
    margin-bottom: var(--spacing-16);
  }

  :host(adc-radio-button[orientation="vertical"]) .adc-radio-button__label {
    height: auto;
  }

  :host([orientation="vertical"]:last-child) {
    margin-bottom: 0;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  :host([disabled]) .adc-radio-button__control {
    border-color: var(--color-light-mode-interactive-disabled-disabled-on-border-interactive);
  }

  :host([disabled]) .adc-radio-button__control::before {
    border-color: var(--color-light-mode-interactive-disabled-disabled-on-border-interactive);
  }

  :host([disabled]) .adc-radio-button__label {
    color: var(--color-light-mode-text-text-disabled);
  }

  :host([invalid]) .adc-radio-button__control {
    border: 1px solid var(--color-light-mode-border-border-status-error);
  }

  :host([invalid]) .adc-radio-group--form-requirement {
    font-family: var(
      --adc-typography-helper-font-family,
      var(--adc-typography-font-family, "American Sans", sans-serif)
    );
    font-size: var(--adc-typography-helper-font-size, 0.75rem);
    line-height: var(--adc-typography-helper-line-height, 1rem);
    font-weight: var(--adc-typography-helper-font-weight, 400);

    color: var(--color-light-mode-text-text-status-error);
    display: block;
    overflow: visible;
  }

  :host([checked]) .adc-radio-button__control {
    border-color: var(--color-light-mode-border-border-interactive);
  }

  :host([checked]) .adc-radio-button__control:hover {
    border-color: var(--color-light-mode-border-border-interactive);
  }

  :host([checked]) .adc-radio-button__control::before {
    background: var(--color-light-mode-background-container-interactive);
    border-color: var(--color-light-mode-border-border-interactive);
  }

  :host([checked][disabled]) .adc-radio-button__control {
    border-color: var(--color-light-mode-interactive-disabled-disabled-on-border-interactive);
  }

  :host([checked][disabled]) .adc-radio-button__control::before {
    background: var(--color-light-mode-interactive-disabled-disabled-on-container-interactive);
    border-color: var(--color-light-mode-interactive-disabled-disabled-on-border-interactive);
  }

  .adc-radio-group {
    margin: 0;
    padding: 0;
    border: 0;
  }

  .adc-radio-group__label-text {
    align-items: center;
    display: flex;
    margin-bottom: var(--spacing-8);
  }

  .adc-radio-group__label-text--required::after {
    border-radius: 50%;

    background: var(--color-light-mode-background-container-status-error);
    content: "";
    height: 6px;
    margin-left: var(--spacing-4);
    width: 6px;
  }

  .adc-radio-group__label-text--invalid {
    color: var(--color-light-mode-text-text-status-error);
  }

  .adc-radio-group__icon-error {
    margin-right: var(--spacing-4);
  }

  .adc-radio-button__control {
    border-radius: 50%;

    align-items: center;
    background: var(--color-light-mode-background-container-default);
    border: 1px solid var(--color-light-mode-border-border-default);
    box-sizing: border-box;
    display: flex;
    height: var(--spacing-24);
    justify-content: center;
    margin-right: var(--spacing-8);
    position: relative;
    transition: border 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      background 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      height 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, width 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: var(--spacing-24);
    white-space: nowrap;
  }

  .adc-radio-button__control::before,
  .adc-radio-button__control::after {
    position: absolute;
  }

  .adc-radio-button__control::before {
    border-radius: 50%;

    border: 1px solid var(--color-light-mode-border-border-default);
    box-sizing: border-box;
    content: "";
    display: flex;
    height: var(--spacing-16);
    width: var(--spacing-16);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .adc-radio-button__control::after {
    border-radius: 50%;

    box-sizing: border-box;
    content: "";
    display: flex;
    height: var(--spacing-12);
    transition: background 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      height 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, width 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: var(--spacing-12);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  .adc-radio-button__control:disabled {
    pointer-events: none;
  }

  .adc-radio-button__label {
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: var(--typography-1440-body-paragraph-letter-spacing);

    align-items: center;
    color: var(--color-light-mode-text-text-default);
    cursor: pointer;
    display: flex;
    height: var(--spacing-48);
    justify-content: start;
    margin: 0;
    position: relative;
    vertical-align: middle;
    white-space: nowrap;
    width: 100%;
  }

  .adc-radio-button__label:hover .adc-radio-button__control {
    border: 1px solid var(--color-light-mode-border-border-default);
  }

  .adc-radio-button__label:hover .adc-radio-button__control::after {
    background: var(--color-light-mode-interactive-hover-hover-on-container-default);
  }

  .adc-radio-button__label--hidden .adc-radio-button__control {
    margin: var(--spacing-4) 0 !important;
  }

  .adc-radio-group--form-requirement {
    display: none;
    overflow: hidden;
    margin: var(--spacing-8) 0 0;
  }

  .visually-hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;
