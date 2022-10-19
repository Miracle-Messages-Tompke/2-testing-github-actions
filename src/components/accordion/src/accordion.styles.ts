import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host(.focus-visible),
  :host(:focus-within) {
    outline: 0;
  }

  :host(adc-accordion) {
    display: flex;
    flex-direction: column;
  }

  :host(adc-accordion) ::slotted(adc-accordion-item) {
    border-top: 1px solid var(--color-light-mode-border-border-default) !important;
  }

  :host(adc-accordion) ::slotted(adc-accordion-item[open]) {
    border-top: 1px solid var(--color-light-mode-border-border-selected) !important;
  }

  :host(adc-accordion) ::slotted(adc-accordion-item:last-child) {
    border-bottom: 1px solid var(--color-light-mode-border-border-default) !important;
  }

  :host(adc-accordion-item) {
    display: flex;
    flex-direction: column;
    border: 1px solid transparent;
  }

  :host(adc-accordion-item) .adc-accordion__icon {
    display: flex;
    fill: currentcolor;
    margin: 0 var(--spacing-16);
    transition: transform 370ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      -webkit-transform 370ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transform: rotate3d(1, 0, 0, 0deg);
    transform-origin: center;
  }

  :host(adc-accordion-item.focus-visible) {
    border-radius: var(--radius-sm);
    outline-offset: -2px;
    outline: 2px solid var(--color-light-mode-interactive-focus-outline-focus);
  }

  :host(adc-accordion-item[label-position="left"]) .adc-accordion__heading {
    justify-content: space-between;
  }

  :host(adc-accordion-item:not([disabled])) .adc-accordion__heading {
    cursor: pointer;
  }

  :host(adc-accordion-item:not([disabled])) .adc-accordion__heading:hover {
    text-decoration: underline;
  }

  :host(adc-accordion-item[disabled]) .adc-accordion__heading {
    color: var(--color-light-mode-text-text-disabled);
  }

  :host(adc-accordion-item[open]) .adc-accordion__icon {
    transform: rotate3d(1, 0, 0, 180deg);
  }

  :host(adc-accordion-item[open]) .adc-accordion__content--wrapper {
    max-height: 200vh;
    transition: max-height 240ms cubic-bezier(0.4, 0, 1, 1) 100ms;
  }

  .adc-accordion__heading {
    font-family: var(--typography-1440-heading-h5-font-family);
    font-size: calc(var(--typography-1440-heading-h5-font-size) * 1px);
    line-height: calc(var(--typography-1440-heading-h5-line-height) * 1px);
    font-weight: var(--typography-1440-heading-h5-font-weight);
    letter-spacing: var(--typography-1440-heading-h5-letter-spacing);

    background-color: var(--color-light-mode-background-container-default);
    align-items: center;
    display: flex;
    padding: var(--spacing-16) 0;
    color: var(--color-light-mode-icon-icon-interactive);
    appearance: none;
    height: 58px;
    border: none;
  }

  .adc-accordion__heading:focus {
    outline: 0;
  }

  .adc-accordion__content--wrapper {
    background: var(--color-light-mode-background-container-default);
    max-height: 0;
    overflow: hidden;
    transition: max-height 240ms cubic-bezier(0, 0, 0.2, 1) 100ms;
  }

  .adc-accordion__content {
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: var(--typography-1440-body-paragraph-letter-spacing);

    color: var(--color-light-mode-text-text-default);
    padding: 0 var(--spacing-16) var(--spacing-16);
  }
`;
