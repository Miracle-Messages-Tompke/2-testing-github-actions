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

  :host([size~="field"]) {
    margin-top: var(--spacing-20);
  }

  .adc-button-icon__icon {
    --icon-fill: var(--color-light-mode-text-text-button-default);
  }

  :host([kind="secondary"]) .adc-button-icon__icon,
  :host([kind="ghost"]) .adc-button-icon__icon {
    --icon-fill: var(--color-light-mode-text-text-interactive);
  }

  :host([size~="sm"]) .adc-button-icon__icon {
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

  .adc-button-icon {
    border-radius: var(--radius-sm);
    align-items: center;
    justify-content: center;
    appearance: none;
    border: 0;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: var(--spacing-48);
    width: var(--spacing-48);
    padding: 0;
    transition: background var(--animation-speed) var(--animation-duration) var(--animation-easing),
      border var(--animation-speed) var(--animation-duration) var(--animation-easing);
  }

  .adc-button--sm {
    height: var(--spacing-36);
    width: var(--spacing-36);
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

  .sr-only {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    width: 1px;
    overflow: hidden;
    padding: 0;
    border: 0;
    margin: -1px;
  }
`;
