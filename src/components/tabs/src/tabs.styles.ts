import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host ::slotted(*) {
    vertical-align: top;
  }

  :host([disabled]) ::slotted(adc-tab) {
    color: var(--color-light-mode-text-text-disabled);
    pointer-events: none;

    border-color: var(--color-light-mode-interactive-disabled-disabled-on-border-interactive);
  }

  :host([disabled]) ::slotted(adc-tab-panel) {
    display: none;
  }

  :host([disabled]) .adc-tabs__indicator {
    background-color: var(
      --color-light-mode-interactive-disabled-disabled-on-container-interactive
    );
  }

  .adc-tabs {
    display: flex;
    justify-content: center;
    margin: 0;
    position: relative;
    vertical-align: top;
    z-index: 0;
    align-items: center;
  }

  .adc-tabs__indicator {
    position: absolute;
    width: 1px;
    left: 0;
    z-index: 0;
  }

  .adc-tabs__indicator.adc-tabs__indicator--first-position {
    pointer-events: none;
  }

  :host(adc-tab-panel) {
    color: var(--color-light-mode-text-text-default);

    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: var(--typography-1440-body-paragraph-letter-spacing);

    display: none;
    box-sizing: border-box;
  }

  :host(adc-tab-panel[selected]) {
    display: block;
  }

  :host(adc-tab-panel)::after {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border: 1px solid transparent;
    border-radius: inherit;
    content: "";
    pointer-events: none;
  }

  :host(adc-tab) {
    border-bottom: var(--spacing-2) solid var(--color-light-mode-border-border-default);
    box-sizing: border-box;
    color: var(--color-light-mode-text-text-default);
    cursor: pointer;
    display: inline-flex;
    flex-grow: 1;
    justify-content: center;
    outline: none;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-transform: capitalize;
    transition: background 150ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
    white-space: nowrap;
    z-index: 1;

    padding: var(--spacing-16);
  }

  :host(adc-tab:hover) {
    color: var(--color-light-mode-text-text-interactive);
    background: var(--color-light-mode-interactive-hover-hover-on-container-default);
  }

  :host(adc-tab:focus-visible) {
    color: var(--color-light-mode-text-text-interactive);
    outline: 2px solid var(--color-light-mode-interactive-focus-outline-focus);
  }

  :host(adc-tab[selected]:focus-visible) {
    color: var(--color-light-mode-text-text-interactive);
    outline: 2px solid var(--color-light-mode-interactive-focus-outline-focus);
    background: var(--color-light-mode-interactive-hover-hover-on-container-default);
  }

  :host(adc-tab[selected]) {
    color: var(--color-light-mode-text-text-interactive);
    border-color: var(--color-light-mode-border-border-selected);
  }

  :host(adc-tab[disabled]) {
    cursor: default;
    pointer-events: none;
  }

  .adc-tabs__tab {
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: var(--typography-1440-body-paragraph-letter-spacing);

    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    flex-grow: 1;
    justify-content: center;
    outline: none;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    white-space: nowrap;
    z-index: 1;
    vertical-align: top;
  }

  :host(adc-tab[disabled]) .adc-tabs__tab {
    cursor: default;
  }

  .adc-tabs__tab:empty {
    display: none;
  }

  .adc-tabs__tab[hidden] {
    display: none;
  }
`;
