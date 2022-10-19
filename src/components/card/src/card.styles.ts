import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host(adc-card), :host(adc-card-media) {
    display: inline-flex;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    vertical-align: top;
    width: 100%;
    flex-direction: column;
  }

  :host([orientation="horizontal"]) .adc-card__media {
    border-radius: var(--radius-sm) 0 0 var(--radius-sm);
  }

  .adc-card {
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: var(--typography-1440-body-paragraph-letter-spacing);
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    flex: 1 0 auto;
  }

  .adc-card::after {
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

  .adc-card.adc-card--horizontal {
    flex-direction: row;
  }

  .adc-card .adc-card__content {
    border-radius: inherit;
    height: calc(100% - var(--spacing-32));
  }

  .adc-card .adc-card__touch {
    position: absolute;
    top: 50%;
    right: 0;
    height: var(--spacing-48);
    left: 0;
    transform: translateY(-50%);
  }

  .adc-card--outlined {
    background-color: var(--color-light-mode-background-container-default);
    border-radius: var(--radius-sm, 4px);
    border: 1px solid var(--color-light-mode-border-border-default);
  }

  .adc-card__content {
    padding: var(--spacing-16) var(--spacing-16) 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  .adc-card__content:last-child {
    padding: var(--spacing-16);
  }

  .adc-card--outlined::after {
    border-radius: var(--radius-sm, 4px);
  }

  .adc-card--elevated-1 {
    background-color: var(--color-light-mode-background-container-default);
    box-shadow: var(--elevation-01);
    border-radius: var(--radius-sm, 4px);
  }

  .adc-card--elevated-2 {
    background-color: var(--color-light-mode-background-container-default);
    box-shadow: var(--elevation-02);
    border-radius: var(--radius-sm, 4px);
  }

  .adc-card--elevated-3 {
    background-color: var(--color-light-mode-background-container-default);
    box-shadow: var(--elevation-03);
    border-radius: var(--radius-sm, 4px);
  }

  .adc-card--elevated-4 {
    background-color: var(--color-light-mode-background-container-default);
    box-shadow: var(--elevation-04);
    border-radius: var(--radius-sm, 4px);
  }

  .adc-card--elevated-5 {
    background-color: var(--color-light-mode-background-container-default);
    box-shadow: var(--elevation-05);
    border-radius: var(--radius-sm, 4px);
  }

  .adc-card--size-lg {
    border-radius: var(--radius-lg, 8px);
  }

  .adc-card--size-lg .adc-card__content {
    padding: var(--spacing-24) var(--spacing-24) 0;
  }

  .adc-card--size-lg .adc-card__content:last-child {
    padding: var(--spacing-24);
  }

  .adc-card__media {
    position: relative;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    width: 100%;
    height: 100%;
    border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  }

  .adc-card__media::after {
    display: block;
    content: "";
    clear: both;
  }

  .adc-card__media--square::before {
    float: left;
    padding-top: 100%;
    content: "";
  }

  .adc-card__media--16-9::before {
    float: left;
    padding-top: 56.25%;
    content: "";
  }

  .adc-card__media-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
  }
`;
