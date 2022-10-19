import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host {
    --box-shadow-top: 0 0 10px rgb(0 0 0 / 0.14), 0 0 18px rgb(0 0 0 / 0.12),
      0 0 5px rgb(0 0 0 / 0.2);
  }

  :host(.focus-visible),
  :host(:focus-within) {
    outline: 0;
  }

  :host(.focus-visible),
  :host(:focus-within) adc-action-drawer-close-button {
    border-radius: var(--radius-sm);
    outline-offset: 1px;
    outline: 2px solid var(--color-light-mode-interactive-focus-outline-focus);
  }

  :host(adc-action-drawer) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    content: "";

    opacity: 0;
    visibility: hidden;
    transition: background-color 240ms cubic-bezier(0.4, 0, 1, 1) 0ms,
      opacity 240ms cubic-bezier(0.4, 0, 1, 1) 0ms, z-index 240ms cubic-bezier(0.4, 0, 1, 1) 0ms,
      visibility 240ms cubic-bezier(0.4, 0, 1, 1) 0ms;
  }

  :host(adc-action-drawer-close-button) {
    display: flex;
    position: absolute;
    right: var(--spacing-16);
    top: var(--spacing-16);
  }

  :host(adc-action-drawer-close-button) .adc-action-drawer__close {
    appearance: none;
    background: none;
    border: 0;
    color: var(--color-light-mode-icon-icon-interactive);
    cursor: pointer;
    display: flex;
    padding: var(--spacing-16);
  }

  .adc-action-drawer__container {
    border-radius: 0;
    display: flex;
    overflow: hidden;
    position: fixed;
    width: var(--size-w16);
    height: 100%;
    left: 0;
    top: 0;
    background-color: var(--color-light-mode-background-container-default);
    box-shadow: var(--elevation-02);
    padding: var(--spacing-16);
    transform: translate3d(-100%, 0, 0);
    transform-origin: center right;
    transition: transform 240ms cubic-bezier(0.4, 0, 1, 1) 0ms,
      -webkit-transform 240ms cubic-bezier(0.4, 0, 1, 1) 0ms;
    flex-direction: column;
  }

  .adc-action-drawer__container--right {
    border-radius: 0;
    display: flex;
    overflow: hidden;
    position: fixed;
    width: var(--size-w16);
    height: 100%;
    right: 0;
    top: auto;
    background-color: var(--color-light-mode-background-container-default);
    box-shadow: var(--elevation-02);
    padding: var(--spacing-16);
    transform: translate3d(100%, 0, 0);
    transform-origin: center right;
    transition: transform 240ms cubic-bezier(0.4, 0, 1, 1) 0ms,
      -webkit-transform 240ms cubic-bezier(0.4, 0, 1, 1) 0ms;
    flex-direction: column;
  }

  @media (max-width: 800px) {
    :host(adc-action-drawer) {
      position: fixed;
      bottom: 0 !important;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      content: "";

      opacity: 0;
      visibility: hidden;
      transition: background-color 240ms cubic-bezier(0.4, 0, 1, 1) 0ms,
        opacity 240ms cubic-bezier(0.4, 0, 1, 1) 0ms, z-index 240ms cubic-bezier(0.4, 0, 1, 1) 0ms,
        visibility 240ms cubic-bezier(0.4, 0, 1, 1) 0ms;
    }

    :host(adc-action-drawer) .adc-action-drawer__container--right {
      border-radius: 8px 8px 0 0;
      height: auto;
      width: auto;
      max-height: 48%;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: var(--color-light-mode-background-container-default);
      box-shadow: var(--box-shadow-top);
      padding: var(spacing-16);
      transform: translate3d(0, var(--spacing-16), 0);
      transform-origin: center bottom;
      transition: transform 240ms cubic-bezier(0.4, 0, 1, 1) 0ms,
        -webkit-transform 240ms cubic-bezier(0.4, 0, 1, 1) 0ms;
      flex-direction: column;
    }

    .adc-action-drawer__container {
      border-radius: var(--radius-lg) var(--radius-lg) 0 0;
      height: auto;
      width: auto;
      max-height: 48%;
      position: fixed;
      bottom: 0 !important;
      left: 0;
      top: auto;
      background-color: var(--color-light-mode-background-container-default);
      box-shadow: var(--box-shadow-top);
      padding: var(spacing-16);
      transform: translate3d(0, var(--spacing-16), 0);
      transform-origin: center bottom;
      transition: transform 240ms cubic-bezier(0.4, 0, 1, 1) 0ms,
        -webkit-transform 240ms cubic-bezier(0.4, 0, 1, 1) 0ms;
      flex-direction: column;
    }

    :host(adc-action-drawer-close-button) {
      display: flex;
      position: absolute;
      right: 1rem;
      top: 1rem;
    }

    :host(adc-action-drawer-close-button) .adc-action-drawer__close {
      appearance: none;
      background: none;
      border: 0;
      color: var(--color-light-mode-icon-icon-interactive);
      cursor: pointer;
      display: flex;
      padding: 0;
    }
  }

  :host([open]) {
    opacity: 1;
    transition: opacity 240ms cubic-bezier(0, 0, 0.2, 1) 0ms, visibility 0ms linear 0s;
    visibility: inherit;
  }

  :host([open]) .adc-action-drawer__container {
    transform: translate3d(0, 0, 0);
    transition: transform 240ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      -webkit-transform 240ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  }

  :host([open][drawer-position="left"]) {
    opacity: 1;
    transition: opacity 240ms cubic-bezier(0, 0, 0.2, 1) 0ms, visibility 0ms linear 0s;
    visibility: inherit;
  }

  :host([open][drawer-position="left"]) .adc-action-drawer__container {
    transform: translate3d(0, 0, 0);
    transform-origin: center right;
    transition: transform 240ms cubic-bezier(0.4, 0, 1, 1) 0ms,
      -webkit-transform 240ms cubic-bezier(0.4, 0, 1, 1) 0ms;
  }

  :host([open][drawer-position="right"]) {
    opacity: 1;
    transition: opacity 240ms cubic-bezier(0, 0, 0.2, 1) 0ms, visibility 0ms linear 0s;
    visibility: inherit;
  }

  :host([open][drawer-position="right"]) .adc-action-drawer__container--right {
    transform: translate3d(0, 0, 0);
    transform-origin: center left;
    transition: transform 240ms cubic-bezier(0.4, 0, 1, 1) 0ms,
      -webkit-transform 240ms cubic-bezier(0.4, 0, 1, 1) 0ms;
  }

  :host(adc-action-drawer-heading) {
    font-family: var(--typography-1440-heading-h3-font-family);
    font-size: calc(var(--typography-1440-heading-h3-font-size) * 1px);
    line-height: calc(var(--typography-1440-heading-h3-line-height) * 1px);
    font-weight: var(--typography-1440-heading-h3-font-weight);
    letter-spacing: var(--typography-1440-heading-h3-letter-spacing);

    color: var(--color-light-mode-text-text-default);
    display: block;
  }

  :host(adc-action-drawer-body) {
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: var(--typography-1440-body-paragraph-letter-spacing);

    margin-top: var(--spacing-16);
    overflow-y: auto;
    position: relative;
  }

  :host(adc-action-drawer-footer) .adc-action-drawer__footer {
    display: flex;
    justify-content: end;
  }
`;
