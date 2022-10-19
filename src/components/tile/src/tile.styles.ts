import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from 'lit';

export default css`
  ${componentStyles}

  :host {
    display: flex;
  }

  .adc-tile {
    display: flex;
    position: relative;
    margin: 0;
    padding: 0;
  }

  :host([color="default"]) .adc-tile--background {
    background-color: var(--color-light-mode-background-container-default);
  }

  :host([color="secondary"]) .adc-tile--background {
    background-color: var(--color-light-mode-background-container-secondary);
  }

  :host([color="tertiary"]) .adc-tile--background {
    background-color: var(--color-light-mode-background-container-tertiary);
  }

  :host([radius="sm"]) .adc-tile--radius {
    border-radius: var(--radius-sm);
  }

  :host([radius="lg"]) .adc-tile--radius {
    border-radius: var(--radius-lg);
  }

  :host([elevation="1"]) .adc-tile--elevation {
    box-shadow: var(--elevation-01);
  }

  :host([elevation="2"]) .adc-tile--elevation {
    box-shadow: var(--elevation-02);
  }

  :host([elevation="3"]) .adc-tile--elevation {
    box-shadow: var(--elevation-03);
  }

  :host([elevation="4"]) .adc-tile--elevation {
    box-shadow: var(--elevation-04);
  }

  :host([elevation="5"]) .adc-tile--elevation {
    box-shadow: var(--elevation-05);
  }

  :host([outline-color="default"]) .adc-tile--outline {
    border: 1px solid var(--color-light-mode-border-border-default);
  }

  :host([outline-color="secondary"]) .adc-tile--outline {
    border: 1px solid var(--color-light-mode-border-border-secondary);
  }

  :host([outline-color="tertiary"]) .adc-tile--outline {
    border: 1px solid var(--color-light-mode-border-border-tertiary);
  }
`;
