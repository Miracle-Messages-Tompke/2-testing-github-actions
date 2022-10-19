import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :root,
  :host {
    --spacing-36: 2.25rem;
    --color-light-mode-text-text-button-default: #ffffff;
  }

  :host {
    display: inline-flex;
    padding: 0 !important;
  }

  :host(:hover) .adc-button--primary {
    background: var(--color-light-mode-interactive-hover-hover-on-interactive);
  }

  :host(:hover) .adc-button--secondary {
    border-color: var(--color-light-mode-interactive-hover-hover-on-interactive);
  }

  :host(:hover) .adc-button--secondary,
  :host(:hover) .adc-button--ghost {
    background: var(--color-light-mode-interactive-hover-hover-on-container);
  }

  :host(:active) .adc-button--primary {
    background: var(--color-light-mode-interactive-pressed-pressed-on-interactive);
  }

  :host(:active) .adc-button--secondary {
    border-color: var(--color-light-mode-interactive-pressed-pressed-on-interactive);
  }

  :host(:active) .adc-button--secondary,
  :host(:active) .adc-button--ghost {
    background: var(--color-light-mode-interactive-pressed-pressed-on-container);
  }

  :host([size~="fullwidth"]) {
    display: flex;
    width: 100%;
  }

  :host([size~="field"]) {
    margin-top: var(--spacing-24);
  }

  ::slotted(adc-icon) {
    --icon-fill: var(--color-light-mode-text-text-button-default);
    margin-top: -2px;
  }

  :host([kind="secondary"]) ::slotted(adc-icon),
  :host([kind="ghost"]) ::slotted(adc-icon) {
    --icon-fill: var(--color-light-mode-text-text-interactive);
  }

  :host([size~="sm"]) ::slotted(adc-icon) {
    margin-top: -1px;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  :host([disabled]) .adc-button--primary {
    background: var(--color-light-mode-interactive-disabled);
  }

  :host([disabled]) .adc-button--secondary {
    color: var(--color-light-mode-interactive-disabled);
    border-color: var(--color-light-mode-interactive-disabled);
  }

  :host([disabled]) .adc-button--ghost {
    border-color: transparent;
  }

  .adc-button {
    border-radius: var(--radius-sm);
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: var(--typography-1440-body-paragraph-letter-spacing);
    gap: var(--spacing-12);
    text-decoration: inherit;
    text-transform: inherit;
    align-items: center;
    appearance: none;
    border: 0;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: var(--spacing-48);
    line-height: var(--spacing-48);
    padding: 0 var(--spacing-16);
    padding-top: 1px;
    transition: background var(--animation-speed) var(--animation-easing),
      border var(--animation-speed) var(--animation-easing);
  }

  .adc-button--sm {
    height: var(--spacing-36);
    line-height: var(--spacing-36);
  }

  .adc-button--is-fullwidth {
    width: 100%;
    justify-content: center;
  }

  .adc-button--has-only-icon {
    padding: 0 var(--spacing-12);
  }

  .adc-button--has-trailing-icon {
    padding-right: var(--spacing-12);
  }

  .adc-button--has-leading-icon {
    padding-left: var(--spacing-12);
  }

  .adc-button--has-only-icon.adc-button--sm {
    padding: 0 var(--spacing-6, 0.375rem);
  }

  .adc-button--primary {
    background: var(--color-light-mode-background-container-interactive);
    color: var(--color-light-mode-text-text-button-default);
  }

  .adc-button--secondary {
    background: transparent;
    border: 1px solid var(--color-light-mode-border-border-interactive);
    color: var(--color-light-mode-text-text-interactive);
  }

  .adc-button--ghost {
    background: transparent;
    border: 1px solid transparent;
    color: var(--color-light-mode-text-text-interactive);
  }
`;
