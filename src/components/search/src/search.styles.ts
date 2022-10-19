import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host {
    display: flex;
  }

  :host(.focus-visible),
  :host(:focus-within) {
    outline: 0;
  }

  .adc-search--container {
    display: flex;
    position: absolute;
    right: 0;
    top: var(--spacing-24);
  }

  .adc-search--container .adc-search__clear {
    appearance: none;
    background: none;
    border: 0;
    color: var(--color-light-mode-icon-icon-interactive);
    cursor: pointer;
    display: flex;
    padding: var(--spacing-8);
  }

  .adc-search {
    color: var(--color-light-mode-text-text-default);
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: var(--typography-1440-body-paragraph-letter-spacing);

    max-width: 100%;
  }

  .adc-search--search-input__wrapper {
    position: relative;
    user-select: none;
    width: 100%;
  }

  .adc-search--search {
    color: var(--color-light-mode-text-text-default);
    display: flex;
    flex-direction: column;
  }

  .adc-search--options {
    position: absolute;
    flex: 1 0 auto;
    border-radius: 0 0 var(--radius-sm) var(--radius-sm);
    background: var(--color-light-mode-background-container-default);
    transition: all 0.5s;
    z-index: 2;
    box-shadow: 0 var(--spacing-2) var(--spacing-2) rgb(0 0 0 / 0.3);
    margin-top: 0;
    padding: 0;
    list-style-type: none;
    width: 100%;
    top: 4.5rem;
  }

  .adc-search--options li.active {
    background: var(--color-light-mode-interactive-hover-hover-on-container-default);
    color: var(--color-light-mode-text-text-default);
  }

  .adc-search--list {
    font-family: var(--typography-1440-label-label-font-family);
    font-size: calc(var(--typography-1440-label-label-font-size) * 1px);
    font-weight: var(--typography-1440-label-label-font-weight);
    letter-spacing: var(--typography-1440-label-label-letter-spacing);
    color: var(--color-light-mode-text-text-secondary);
    align-items: center;
    line-height: 1;
    padding: 16px;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .adc-search--list:hover {
    background: var(--color-light-mode-interactive-hover-hover-on-container-default);
    color: var(--color-light-mode-text-text-default);
    border-radius: 0 0 var(--radius-sm) var(--radius-sm);
  }

  .a11y-atomic-message {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin-bottom: -1px;
    margin-right: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;
