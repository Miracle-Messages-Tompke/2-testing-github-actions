import { componentStyles } from '@adc/styles/dist/styles.js';
import { css } from 'lit';

export default css`
  ${componentStyles}

  :host {
    display: inline-block;
    position: absolute;
    padding: var(--spacing-16);
    border-radius: var(--spacing-4);

    /* Token not ready yet for background color */
    background: #00467f;
    opacity: 0;
    transform: scale(0.75);
    transition: opacity, transform;
    transition-duration: 0.33s;
    width: 352px;
    gap: var(--spacing-16);

    box-shadow: var(--elevation-04);
    text-align: left;
  }

  :host([type="label"]) {
    width: auto;
  }

  :host([showing]) {
    opacity: 1;
    transform: scale(1);
  }

  :host #arrow {
    position: absolute;

    /* Token not ready yet for background color */
    background: #00467f;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
  }

  :host .adc-tooltip--header {
    font-family: var(--typography-1440-heading-h5-font-family);
    font-style: var(--typography-1440-heading-h5-font-style);
    font-weight: var(--typography-1440-heading-h5-font-weight);
    font-size: calc(var(--typography-1440-heading-h5-font-size) * 1px);
    line-height: calc(var(--typography-1440-heading-h5-line-height) * 1px);
    color: var(--color-light-mode-text-text-on-container-interactive);
    text-align: left;
    margin: 0 0 var(--spacing-12) 0;
  }

  :host .adc-tooltip--text-content {
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-style: var(--typography-1440-body-paragraph-font-style);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    letter-spacing: calc(var(--typography-1440-body-paragraph-letter-spacing) * 1px);

    color: var(--color-light-mode-text-text-on-container-interactive);
    text-align: left;
  }

  :host .adc-tooltip--header-container {
    display: flex;
    justify-content: space-between;
  }
`;
