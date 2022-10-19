import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host(adc-modal) {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    content: "";
    background-color: rgba(0 0 0 / 0.4);
    opacity: 0;
    visibility: hidden;
    transition: background-color 240ms cubic-bezier(0.4, 0, 1, 1) 0ms,
      opacity 240ms cubic-bezier(0.4, 0, 1, 1) 0ms, z-index 240ms cubic-bezier(0.4, 0, 1, 1) 0ms,
      visibility 240ms cubic-bezier(0.4, 0, 1, 1) 0ms;
  }

  .adc-modal__container {
    border-radius: 0;

    display: flex;
    overflow: hidden;
    position: static;
    width: 100%;
    height: 100%;
    max-height: calc(100vh - var(--size-w4));
    top: 0;
    background-color: var(--color-light-mode-background-container-default);
    padding: var(--spacing-32);
    transform: translate3d(0, var(--spacing-24), 0);
    transform-origin: center top;
    transition: transform 240ms cubic-bezier(0.4, 0, 1, 1) 0ms,
      -webkit-transform 240ms cubic-bezier(0.4, 0, 1, 1) 0ms;
    flex-direction: column;
  }

  @media (min-width: 64em) {
    .adc-modal__container {
      border-radius: var(--spacing-8);

      height: auto;
    }

    :host(adc-modal:not([size="sm"])) .adc-modal__container {
      width: 52rem;
      max-height: 84%;
    }

    :host(adc-modal[size="sm"]) .adc-modal__container {
      width: 35rem;
      max-height: 72%;
    }
  }

  :host([open]) {
    opacity: 1;
    transition: opacity 240ms cubic-bezier(0, 0, 0.2, 1) 0ms, visibility 0ms linear 0s;
    visibility: inherit;
    z-index: 999;
  }

  :host([open]) .adc-modal__container {
    transform: translate3d(0, 0, 0);
    transition: transform 240ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      -webkit-transform 240ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  }

  :host(adc-modal-heading) {
    font-family: var(--typography-390-heading-h2-font-family);
    font-size: calc(var(--typography-390-heading-h2-font-size) * 1px);
    line-height: calc(var(--typography-390-heading-h2-line-height) * 1px);
    font-weight: calc(var(--typography-390-heading-h2-font-weight) * 1px);

    color: var(--color-light-mode-text-text-default);
    display: block;
  }

  :host(adc-modal-heading)::first-letter {
    text-transform: capitalize;
  }

  :host(adc-modal-body) {
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: var(--typography-1440-body-paragraph-letter-spacing);

    margin: var(--spacing-16) 0;
    overflow-y: auto;
    position: relative;
  }

  :host(adc-modal-footer) .adc-modal__footer {
    display: flex;
    justify-content: end;
  }

  :host(adc-modal-close-button) {
    display: flex;
    position: absolute;
    right: var(--spacing-12);
    top: var(--spacing-12);
  }

  :host(adc-modal-close-button) .adc-modal__close {
    appearance: none;
    background: none;
    border: 0;
    color: var(--color-light-mode-icon-icon-interactive);
    cursor: pointer;
    display: flex;
    padding: var(--spacing-12);
  }
`;
