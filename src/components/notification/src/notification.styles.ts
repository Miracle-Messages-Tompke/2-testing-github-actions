import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export const inlineNotificationStyles = css`
  ${componentStyles}

  :root,
  :host,
  :host::after,
  :host::before {
    --spacing-6: 0.375rem;
  }

  :host {
    background-color: var(--color-light-mode-background-container-default);
    display: inline-flex;
    padding: var(--spacing-6) 0;
    justify-content: left;
    align-items: flex-start;
    border-left-style: solid;
    border-width: 1px;
    border-left-width: var(--spacing-8);
    border-radius: var(--radius-sm);
  }

  :host(.focus-visible),
  :host(:focus-within) {
    outline: 0;
  }

  :host([variant="ghost"]) {
    border: none;
  }

  :host ::slotted(*) {
    vertical-align: top;
  }

  :host ::slotted(p) {
    font-family: var(--typography-390-body-paragraph-font-family);
    font-size: calc(var(--typography-390-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-390-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-390-body-paragraph-font-weight);
    letter-spacing: var(--typography-390-body-paragraph-letter-spacing);
    margin: 0;
  }

  :host([inline]) {
    padding: calc(var(--spacing-8) - 1px) var(--spacing-16);
  }

  :host([fullwidth]) {
    width: 100%;
  }

  :host([kind="success"]) {
    border-color: var(--color-light-mode-background-container-status-success);
  }

  :host([kind="success"]):host([variant="ghost"]) {
    color: var(--color-light-mode-background-container-status-success);
  }

  :host([kind="success"]) adc-icon::part(icon) {
    --icon-fill: var(--color-light-mode-background-container-status-success);
  }

  :host([kind="information"]) {
    border-color: var(--color-light-mode-background-container-status-information);
  }

  :host([kind="information"]):host([variant="ghost"]) {
    color: var(--color-light-mode-background-container-status-information);
  }

  :host([kind="information"]) adc-icon::part(icon) {
    --icon-fill: var(--color-light-mode-background-container-status-information);
  }

  :host([kind="warning"]) {
    border-color: var(--color-light-mode-background-container-status-warning);
  }

  :host([kind="warning"]):host([variant="ghost"]) {
    color: var(--color-light-mode-background-container-status-warning);
  }

  :host([kind="warning"]) adc-icon::part(icon) {
    --icon-fill: var(--color-light-mode-background-container-status-warning);
  }

  :host([kind="error"]) {
    border-color: var(--color-light-mode-background-container-status-error);
  }

  :host([kind="error"]):host([variant="ghost"]) {
    color: var(--color-light-mode-background-container-status-error);
  }

  :host([kind="error"]) adc-icon::part(icon) {
    --icon-fill: var(--color-light-mode-background-container-status-error);
  }

  .adc-notification__icon {
    display: inline-flex;
    margin-left: var(--spacing-16);
    margin-top: var(--spacing-2);
  }

  :host([variant="ghost"]) .adc-notification__icon {
    margin-left: 0;
  }

  .adc-notification__text-wrapper {
    font-family: var(--typography-390-body-paragraph-font-family);
    font-size: calc(var(--typography-390-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-390-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-390-body-paragraph-font-weight);
    letter-spacing: var(--typography-390-body-paragraph-letter-spacing);

    color: var(--color-light-mode-text-text-default);
    display: inline-flex;
    flex-flow: column wrap;
    flex-grow: 1;
    vertical-align: top;
  }

  .adc-notification__title {
    font-family: var(--typography-390-body-paragraph-bold-font-family);
    font-size: calc(var(--typography-390-body-paragraph-bold-font-size) * 1px);
    line-height: calc(var(--typography-390-body-paragraph-bold-line-height) * 1px);
    font-weight: var(--typography-390-body-paragraph-bold-font-weight);
    letter-spacing: var(--typography-390-body-paragraph-bold-letter-spacing);
    margin-top: var(--spacing-8);
    margin-bottom: var(--spacing-6);
    padding-left: var(--spacing-16);
    padding-right: var(--spacing-16);
  }

  :host([variant="ghost"]) .adc-notification__title {
    padding-right: 0;
  }

  :host([variant="ghost"][can-close]) .adc-notification__title {
    padding-right: var(--spacing-16);
  }

  .adc-notification__close {
    cursor: pointer;
    display: inline-flex;
    align-self: flex-start;
    border: none;
    background: none;
    padding: 0;
    margin-right: var(--spacing-6);
  }

  :host([variant="ghost"]) .adc-notification__close {
    margin-right: 0;
  }

  .adc-notification__close:focus {
    outline-color: var(--color-light-mode-interactive-focus-outline-focus);
  }
`;

export const notificationStyles = css`
  ${componentStyles}
  :root,
  :host,
  :host::after,
  :host::before {
    --spacing-6: 0.375rem;
  }

  :host {
    background-color: var(--color-light-mode-background-container-default);
    display: inline-flex;
    padding: var(--spacing-12) 0 0 0;
    justify-content: left;
    border-style: solid;
    border-width: 1px;
    border-left-width: var(--spacing-8);
    border-radius: var(--radius-sm);
  }

  :host ::slotted(*) {
    vertical-align: top;
  }

  :host ::slotted(p) {
    font-family: var(--typography-390-body-paragraph-font-family);
    font-size: calc(var(--typography-390-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-390-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-390-body-paragraph-font-weight);
    letter-spacing: var(--typography-390-body-paragraph-letter-spacing);
    margin: 0;
  }

  .adc-notification__content-wrapper[open] adc-button-icon::part(button-icon) {
    transform: rotate3d(1, 0, 0, 180deg);
    transition: transform 370ms cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
  }

  :host ::slotted([slot="link"]) {
    padding-top: var(--spacing-12) !important;
    width: fit-content;
  }

  :host adc-divider::part(divider)::before,
  :host adc-divider::part(divider)::after {
    border-color: var(--color-light-mode-border-border-secondary);
  }

  :host([fullwidth]) {
    width: 100%;
  }

  :host([kind="success"]) {
    border-color: var(--color-light-mode-background-container-status-success);
    color: var(--color-light-mode-background-container-status-success);
  }

  :host([kind="success"]) adc-icon::part(icon) {
    --icon-fill: var(--color-light-mode-background-container-status-success);
  }

  :host([kind="information"]) {
    border-color: var(--color-light-mode-background-container-status-information);
    color: var(--color-light-mode-background-container-status-information);
  }

  :host([kind="information"]) adc-icon::part(icon) {
    --icon-fill: var(--color-light-mode-background-container-status-information);
  }

  :host([kind="warning"]) {
    border-color: var(--color-light-mode-background-container-status-warning);
    color: var(--color-light-mode-background-container-status-warning);
  }

  :host([kind="warning"]) adc-icon::part(icon) {
    --icon-fill: var(--color-light-mode-background-container-status-warning);
  }

  :host([kind="error"]) {
    border-color: var(--color-light-mode-background-container-status-error);
    color: var(--color-light-mode-background-container-status-error);
  }

  :host([kind="error"]) adc-icon::part(icon) {
    --icon-fill: var(--color-light-mode-background-container-status-error);
  }

  .adc-notification__icon {
    display: inline-flex;
    margin: var(--spacing-2) var(--spacing-16) 0 var(--spacing-16);
  }

  .adc-notification__content-wrapper {
    width: 100%;
  }

  .adc-notification__text-wrapper {
    font-family: var(--typography-390-body-paragraph-font-family);
    font-size: calc(var(--typography-390-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-390-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-390-body-paragraph-font-weight);
    letter-spacing: var(--typography-390-body-paragraph-letter-spacing);

    color: var(--color-light-mode-text-text-default);
    display: flex;
    flex-flow: column wrap;
    flex-grow: 1;
    vertical-align: top;
    padding-right: var(--spacing-16);
  }

  .adc-notification__footer-buttons {
    padding: 0 0 var(--spacing-16) 0;
    display: flex;
    justify-content: flex-end;
  }

  .adc-notification__footer-buttons adc-button {
    margin-right: var(--spacing-16);
  }

  .adc-notification__title {
    font-family: var(--typography-390-body-paragraph-bold-font-family);
    font-size: calc(var(--typography-390-body-paragraph-bold-font-size) * 1px);
    line-height: calc(var(--typography-390-body-paragraph-bold-line-height) * 1px);
    font-weight: var(--typography-390-body-paragraph-bold-font-weight);
    letter-spacing: var(--typography-390-body-paragraph-bold-letter-spacing);
    margin-top: var(--spacing-8);
    margin-bottom: var(--spacing-6);
    margin-right: var(--spacing-16);
  }

  .adc-notification__close {
    margin: 0 var(--spacing-12) 0 0;
    cursor: pointer;
    display: inline-flex;
    align-self: flex-start;
    border: none;
    background: none;
    padding: 0;
  }

  :host adc-button-icon::part(button-icon) {
    transition: transform 370ms cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
    transform: rotate3d(1, 0, 0, 0deg);
  }

  .adc-notification__close:focus {
    outline-color: var(--color-light-mode-interactive-focus-outline-focus);
  }

  .adc-notification__content-wrapper[open] .adc-notification__expand-wrapper.adc-notification__no-footer {
    padding-bottom: var(--spacing-16);
  }

  .adc-notification__expand-wrapper {
    max-height: 0;
    overflow: hidden;
    transition: max-height 240ms 100ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .adc-notification__content-wrapper[open] .adc-notification__expand-wrapper {
    max-height: 200vh;
    transition: max-height 240ms 100ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .adc-notification__title-wrapper {
    color: var(--color-light-mode-text-text-default);
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    vertical-align: top;
    margin-bottom: var(--spacing-12);
    transition-property: margin-bottom;
    transition-delay: 100ms;
    transition-duration: 200ms;
  }

  .adc-notification__content-wrapper[open] .adc-notification__title-wrapper.adc-notification__has-content {
    margin-bottom: var(--spacing-6);
  }

  .adc-notification__divider {
    padding-right: var(--spacing-16);
  }
`;
