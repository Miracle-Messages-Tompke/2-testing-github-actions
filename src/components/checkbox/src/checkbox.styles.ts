import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host(.focus-visible),
  :host(:focus-within) {
    outline: 0;
  }

  :host(.focus-visible),
  :host(:focus-within) .adc-checkbox__input {
    border-radius: var(--radius-sm);
    outline-offset: 1px;
    outline: 2px solid var(--color-light-mode-interactive-focus-outline-focus);
  }

  :host(adc-checkbox-group) {
    font-family: var(--typography-1440-label-label-font-family);
    font-size: calc(var(--typography-1440-label-label-font-size) * 1px);
    line-height: calc(var(--typography-1440-label-label-line-height) * 1px);
    font-weight: var(--typography-1440-label-label-font-weight);
    letter-spacing: calc(var(--typography-1440-label-label-letter-spacing) * 1px);

    color: var(--color-light-mode-text-text-secondary);
    display: block;
  }

  :host(adc-checkbox[label-position="right"]) .adc-checkbox__input {
    margin-right: var(--spacing-8);
    margin-left: 0;
  }

  :host(adc-checkbox[label-position="left"]) .adc-checkbox__label {
    flex-direction: row-reverse;
  }

  :host(adc-checkbox[label-position="left"]) .adc-checkbox__input {
    margin-left: var(--spacing-8);
    margin-right: 0;
  }

  :host(adc-checkbox[orientation="horizontal"]) {
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

  :host([orientation="vertical"]) .adc-checkbox-group__label-text {
    margin-bottom: var(--spacing-8);
  }

  :host(adc-checkbox[orientation="vertical"]) {
    display: flex;
    flex-direction: column;
    height: auto;
    margin-bottom: var(--spacing-8);
  }

  :host([orientation="vertical"]:last-child),
  :host(adc-checkbox-group[orientation="vertical"]) {
    margin-bottom: 0;
  }

  :host(adc-checkbox) {
    align-items: center;
    cursor: pointer;
    display: inline-flex;
    grid-auto-flow: column;
    height: var(--spacing-48);
    outline: none;
  }

  :host(adc-checkbox:hover) .adc-checkbox__input::before {
    border-radius: 50%;

    background: var(--color-light-mode-interactive-hover-hover-on-container-default);
    height: var(--spacing-40);
    transition: width 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      height 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: var(--spacing-40);
  }

  :host(adc-checkbox:focus-visible) .adc-checkbox__input::before,
  :host(:focus-within) .adc-checkbox__input::before {
    border-radius: 50%;

    background: rgba(0 120 210 / 0.24);
    height: var(--spacing-40);
    transition: width 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      height 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: var(--spacing-40);
  }

  :host(adc-checkbox[checked]) .adc-checkbox__input {
    background: var(--color-light-mode-background-container-interactive);
    border: 1px solid var(--color-light-mode-border-border-interactive);
    transition: background 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  :host(adc-checkbox[checked]) .adc-checkbox__input::after {
    content: url('data:image/svg+xml,<svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 1L6 12L1 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    transition: content 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    margin-top: var(--spacing-2);
  }

  :host(adc-checkbox[disabled]) {
    pointer-events: none;
  }

  :host(adc-checkbox[disabled]) .adc-checkbox__input {
    border: 1px solid var(--color-light-mode-interactive-disabled-disabled-on-border-interactive);
  }

  :host(adc-checkbox[disabled]) .adc-checkbox__label {
    color: var(--color-light-mode-text-text-disabled);
  }

  :host(adc-checkbox[disabled][checked]) .adc-checkbox__input {
    background: var(--color-light-mode-interactive-disabled-disabled-on-container-interactive);
    border: 1px solid var(--color-light-mode-interactive-disabled-disabled-on-border-interactive);
  }

  :host(adc-checkbox[invalid]) .adc-checkbox__input {
    border: 1px solid var(--color-light-mode-border-border-status-error);
  }

  .adc-checkbox-group__label-text {
    align-items: center;
    display: flex;
    margin-bottom: var(--spacing-8);
  }

  .adc-checkbox-group__label-text--required::after {
    border-radius: 50%;

    background: var(--color-light-mode-background-container-status-error);
    content: "";
    height: 6px;
    margin-left: var(--spacing-4);
    width: 6px;
  }

  .adc-checkbox-group__label-text--invalid {
    color: var(--color-light-mode-text-text-status-error);
  }

  .adc-checkbox-group__icon-error {
    margin-right: var(--spacing-4);
  }

  .adc-checkbox__input {
    border-radius: var(--radius-sm);

    align-items: center;
    appearance: none;
    background: var(--color-light-mode-background-container-default);
    border: 1px solid var(--color-light-mode-border-border-default);
    cursor: pointer;
    display: inline-flex;
    height: var(--spacing-24);
    justify-content: center;
    margin: 0;
    outline: none;
    transition: background 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: var(--spacing-24);
  }

  .adc-checkbox__input::before {
    border-radius: 50%;

    content: "";
    height: 0;
    position: absolute;
    width: 0;
    z-index: -1;
  }

  .adc-checkbox__label {
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: calc(var(--typography-1440-body-paragraph-letter-spacing) * 1px);

    align-items: center;
    color: var(--color-light-mode-text-text-default);
    cursor: pointer;
    display: inline-flex;
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
