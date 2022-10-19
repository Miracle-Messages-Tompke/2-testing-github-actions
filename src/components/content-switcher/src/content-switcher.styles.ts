import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host(adc-content-switcher) {
    display: inline-block;
    width: 100%;
  }

  :host(adc-content-switcher.focus-visible),
  :host(adc-content-switcher:focus-within) {
    outline: 0;
  }

  :host(adc-content-switcher.focus-visible),
  :host(adc-content-switcher:focus-within) adc-content-switch {
    border-radius: var(--radius-sm);
    outline-offset: 1px;
    outline: 2px solid var(--color-light-mode-interactive-focus-outline-focus);
  }

  :host ::slotted(*) {
    vertical-align: top;
  }

  :host .adc-content-switcher {
    display: flex;
    justify-content: start;
    margin: 0;
    position: relative;
    vertical-align: top;
    z-index: 0;
    align-items: stretch;
  }

  :host .adc-content-switcher--default {
    border-color: var(--color-light-mode-border-border-interactive);
    border-width: 1px;
  }

  ::slotted(adc-content-switch:first-of-type) {
    border-radius: var(--radius-sm) 0 0 var(--radius-sm);
  }

  ::slotted(adc-content-switch:last-of-type) {
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  }

  ::slotted(adc-content-switch:not(:first-of-type)) {
    margin-left: -1px;
  }

  :host([disabled]) ::slotted(adc-content-switch-panel) {
    display: none;
  }

  :host([disabled]) ::slotted(adc-content-switch) {
    background-color: var(--color-light-mode-background-container-tertiary) !important;
    border-color: var(--color-light-mode-border-border-tertiary) !important;
    color: var(--color-light-mode-text-text-disabled) !important;
  }

  :host([disabled]) .adc-content-switcher {
    pointer-events: none;
  }

  :host(adc-content-switch-panel[selected]) {
    display: block;
  }

  :host(adc-content-switch-panel) {
    color: --color-light-mode-text-text-default;
    font-family: var(
      --adc-typography-body1-font-family,
      var(--adc-typography-font-family, "American Sans", sans-serif)
    );
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: var(--typography-1440-body-paragraph-letter-spacing);
    display: none;
    box-sizing: border-box;
  }

  :host(adc-content-switch-panel)::after {
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

  :host(adc-content-switch) {
    align-items: center;
    box-sizing: border-box;
    border: 1px solid var(--color-light-mode-border-border-interactive);
    color: var(--color-light-mode-text-text-interactive);
    cursor: pointer;
    display: inline-flex;
    flex-shrink: 1;
    min-height: var(--spacing-32);
    justify-content: center;
    outline: none;
    padding: 0 var(--spacing-16);
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: background 150ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
    white-space: normal;
    z-index: 1;
  }

  :host(adc-content-switch:hover) {
    background: var(--color-light-mode-interactive-hover-hover-on-container-default);
    text-decoration: underline;
  }

  :host(adc-content-switch[disabled]) {
    cursor: default;
    pointer-events: none;
  }

  :host(adc-content-switch[disabled]) .adc-content-switcher__content-switch {
    cursor: default;
  }

  .adc-content-switcher__content-switch {
    cursor: pointer;
    display: inline-block;
    text-decoration: none;
    vertical-align: top;
  }

  .adc-content-switcher__content-switch:empty {
    display: none;
  }

  :host(adc-content-switch[selected]) {
    background-color: var(--color-light-mode-background-container-interactive);
    color: var(--color-light-mode-text-text-on-container-interactive);
  }

  :host(adc-content-switch[selected]:focus-visible) {
    text-decoration: underline;
  }

  .adc-content-switcher__content-switch[hidden] {
    display: none;
  }

  .adc-content-switcher__button {
    -webkit-font-smoothing: antialiased;
    font-family: var(--typography-390-label-label-font-family);
    font-size: calc(var(--typography-390-label-label-font-size) * 1px);
    line-height: calc(var(--typography-390-label-label-line-height) * 1px);
    font-weight: var(--typography-390-label-label-font-weight);
    letter-spacing: var(--typography-390-label-label-letter-spacing);
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    flex-grow: 1;
    justify-content: center;
    outline: none;
    position: relative;
    text-align: center;
    text-decoration: none;
    white-space: normal;
    z-index: 1;
  }

  .adc-content-switcher__button::first-letter {
    text-transform: capitalize;
  }

  @media (min-width: 1280px) {
    :host {
      white-space: nowrap;
    }
  }
`;
