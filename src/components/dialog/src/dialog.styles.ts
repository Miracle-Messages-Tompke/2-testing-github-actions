import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host {
    box-sizing: border-box;
    display: contents;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
  }

  .dialog__panel {
    box-shadow: var(--elevation-05);
    border-radius: var(--radius-lg);
    display: flex;
    width: auto;
    min-width: calc(100vw - 2rem);
    max-width: calc(100vw - 2rem);
    max-height: calc(100vh - 2rem);
    flex-direction: column;
    z-index: 2;
    background-color: var(--color-light-mode-background-container-default);
  }

  .dialog__panel.dialog__panel--fullscreen {
    height: 100%;
  }

  @media (min-width: 800px) {
    .dialog__panel {
      min-width: 356px;
      max-width: 546px;
      max-height: 50vh;
    }

    .dialog__panel.dialog__panel--fullscreen {
      max-width: calc(100vw - 4rem);
      max-height: 80vh;
    }
  }

  @media (min-width: 1280px) {
    .dialog__panel {
      min-width: 389px;
      max-width: 596px;
      max-height: 50vh;
    }
  }

  @media (min-width: 1440px) {
    .dialog__panel {
      max-height: 50vh;
    }

    .dialog__panel.dialog__panel--fullscreen {
      max-width: 1216px;
      max-height: 80vh;
    }
  }

  .dialog__title {
    font-family: var(--typography-1440-heading-h3-font-family);
    font-size: calc(var(--typography-1440-heading-h3-font-size) * 1px);
    line-height: calc(var(--typography-1440-heading-h3-line-height) * 1px);
    font-weight: var(--typography-1440-heading-h3-font-weight);
    letter-spacing: var(--typography-1440-heading-h3-letter-spacing);
    margin: 0;
  }

  .dialog__header,
  .dialog__footer {
    flex: 1 1 auto;
    padding: 0 var(--spacing-24);
    position: relative;
  }

  .dialog__header {
    padding-top: var(--spacing-24);
  }

  .dialog__footer {
    display: flex;
    flex: 0 1 auto;
    justify-content: flex-end;
    padding-bottom: var(--spacing-24);
  }

  .dialog__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .dialog__body {
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: var(--typography-1440-body-paragraph-letter-spacing);
    flex: 1 1 auto;
    padding: var(--spacing-24);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__panel:focus {
    outline: none;
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
    transform: none;
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0 0 0 / 0.4);
  }
`;
