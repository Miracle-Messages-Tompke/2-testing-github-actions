import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host {
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: var(--typography-1440-body-paragraph-letter-spacing);
    display: flex;
  }

  :host(.focus-visible),
  :host(:focus-within) {
    outline: 0;
  }

  :host(.focus-visible),
  :host(:focus-within) .adc-link {
    border-radius: var(--radius-sm);
    outline: 1px solid var(--color-light-mode-interactive-focus-outline-focus);
  }

  :host([visited]) .adc-link {
    color: var(--color-light-mode-text-text-secondary);
  }

  :host([active]) .adc-link {
    color: var(--color-light-mode-interactive-hover-hover-on-interactive);
  }

  :host([disabled]) .adc-link {
    color: var(--color-light-mode-text-text-disabled);
    cursor: pointer;
    outline: none;
    pointer-events: none;
  }

  :host([inline]) {
    display: inline-block;
  }

  :host([inline]) .adc-link:not(:disabled) {
    text-decoration: underline;
  }

  :host([inline]) .adc-link:not(:disabled):hover {
    text-decoration: none;
  }

  :host([inline]) .adc-link:not(:disabled):hover::after {
    text-decoration: none;
  }

  .adc-link {
    color: var(--color-light-mode-text-text-interactive);
    display: inline-block;
    text-decoration: none;
  }

  .adc-link:hover {
    color: var(--color-light-mode-interactive-hover-hover-on-interactive);
    text-decoration: underline;
  }

  .adc-link:hover::after {
    text-decoration: none;
  }

  .adc-link:focus {
    outline: none;
  }

  .adc-link__icon {
    display: inline-flex;
    position: relative;
  }

  :host([visited]) adc-icon::part(icon) {
    --icon-fill: var(--color-light-mode-text-text-secondary);
  }

  :host([active]) adc-icon::part(icon) {
    --icon-fill: var(--color-light-mode-interactive-hover-hover-on-interactive);
  }

  :host([disabled]) adc-icon::part(icon) {
    --icon-fill: var(--color-light-mode-text-text-disabled);
  }

  .adc-link:hover adc-icon::part(icon) {
    --icon-fill: var(--color-light-mode-interactive-hover-hover-on-interactive);
  }

  .adc-link:focus adc-icon::part(icon) {
    --icon-fill: var(--color-light-mode-interactive-focus-outline-focus);
  }

  .adc-link__chevron {
    display: inline-block;
    font-family: var(--typography-1440-heading-h5-font-family);
    font-size: calc(var(--typography-1440-heading-h5-font-size) * 1px);
    line-height: calc(var(--typography-1440-heading-h5-line-height) * 1px);
    font-weight: var(--typography-1440-heading-h5-font-weight);
    letter-spacing: var(--typography-1440-heading-h5-letter-spacing);
  }

  .adc-link:hover .adc-link__chevron {
    text-decoration: none;
  }
`;
