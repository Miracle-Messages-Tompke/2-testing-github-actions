import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host {
    --ribbon-ltr: url("data:image/svg+xml,%3Csvg width='20' height='24' viewBox='0 0 20 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.224 15.8835L20 0.000922377L0 0V24C3.17767 23.5418 7.90462 21.8819 11.224 15.8835Z' fill='currentcolor' /%3E%3C/svg%3E%0A");
    --ribbon-rtl: url("data:image/svg+xml,%3Csvg width='20' height='24' viewBox='0 0 20 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.776 15.8835L0 0.000922377L20 0V24C16.8223 23.5418 12.0954 21.8819 8.776 15.8835Z' fill='currentcolor'/%3E%3C/svg%3E%0A");

    align-items: center;
    color: var(--color-light-mode-text-text-default);
    display: inline-flex;
    height: var(--spacing-24);
    padding: 0 var(--spacing-8);
    position: relative;
    font-family: var(--typography-1440-label-label-font-family);
    font-size: calc(var(--typography-1440-label-label-font-size) * 1px);
    line-height: calc(var(--typography-1440-label-label-line-height) * 1px);
    font-weight: var(--typography-1440-label-label-caps-font-weight);
    letter-spacing: calc(var(--typography-1440-label-label-letter-spacing) * 1px);
    text-decoration: inherit;
    text-transform: var(--typography-1440-label-label-caps-text-case);
  }

  :host ::slotted(*) {
    display: flex;
    align-self: center;
  }

  ::slotted([slot="icon"]) {
    padding-right: var(--spacing-4);
  }

  :host([position="rtl"]) {
    flex-direction: row-reverse;
  }

  :host([position="rtl"]) ::slotted([slot="icon"]) {
    padding-left: var(--spacing-4);
    padding-right: 0;
  }

  :host(:not([variant="ribbon"])) {
    background-color: var(--color-light-mode-background-container-tertiary);

    border-radius: var(--radius-sm);
  }

  :host([variant="ribbon"]) {
    left: 0;
    padding-left: var(--spacing-16);
    padding-right: 0;
    position: absolute;
  }

  :host([variant="ribbon"])::after {
    display: block;
    height: var(--spacing-24);
    left: 100%;
    position: absolute;
    top: 0;
    width: 1.25rem;
    mask-image: var(--ribbon-ltr);
    content: " ";
  }

  :host([variant="ribbon"][position="rtl"]) {
    left: initial;
    right: 0;
    padding-left: 0;
    padding-right: var(--spacing-16);
  }

  :host([variant="ribbon"][position="rtl"])::after {
    left: initial;
    right: 100%;
    mask-image: var(--ribbon-rtl);
    content: " ";
  }

  :host([kind="success"]),
  :host([kind="information"]),
  :host([kind="warning"]),
  :host([kind="error"]) {
    color: var(--color-light-mode-text-text-on-container-interactive);
  }

  :host([kind="success"]),
  :host([variant="ribbon"][kind="success"])::after,
  :host([variant="ribbon"][position="rtl"][kind="success"])::after {
    background-color: var(--color-light-mode-background-container-status-success);
  }

  :host([kind="information"]),
  :host([variant="ribbon"][kind="information"])::after,
  :host([variant="ribbon"][position="rtl"][kind="information"])::after {
    background-color: var(--color-light-mode-background-container-status-information);
  }

  :host([kind="warning"]),
  :host([variant="ribbon"][kind="warning"])::after,
  :host([variant="ribbon"][position="rtl"][kind="warning"])::after {
    background-color: var(--color-light-mode-background-container-status-warning);
  }

  :host([kind="error"]),
  :host([variant="ribbon"][kind="error"])::after,
  :host([variant="ribbon"][position="rtl"][kind="error"])::after {
    background-color: var(--color-light-mode-background-container-status-error);
  }
`;
