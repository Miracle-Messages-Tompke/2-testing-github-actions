import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host(adc-carousel) {
    --adc-carousel-overflow-hint-size: 1rem;
    --adc-carousel-page-size: 1;

    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: calc(100% + var(--spacing-16));
    margin-right: calc(-1 * var(--spacing-16));
    padding-left: var(--spacing-16);
    padding-right: var(--spacing-32);
  }

  :host(adc-carousel) ::slotted(:not([name])) {
    flex: 0 0
      calc(
        (100% - (var(--adc-carousel-page-size, 1) - 1) * var(--spacing-16)) /
          var(--adc-carousel-page-size, 1)
      );
    height: auto;
    margin-right: var(--spacing-16);
    vertical-align: middle;
  }

  :host(adc-carousel) .bx--carousel__scroll-container {
    grid-area: body;
    position: relative;
    overflow: hidden;
    margin-right: calc(-1 * var(--spacing-32));
  }

  :host(adc-carousel) .bx--carousel__scroll-contents {
    align-items: stretch;
    display: flex;
    margin-right: var(--spacing-32);
    position: relative;
    transition: left 400ms cubic-bezier(0.2, 0, 0.38, 0.9) 0s;
  }

  :host(adc-carousel) .bx--carousel__navigation {
    grid-area: navigation;
    display: grid;
    grid-template-columns: auto auto auto auto;
    justify-content: flex-end;
    align-items: center;
    gap: var(--spacing-16);
    margin-top: var(--spacing-16);
    font-family: sans-serif;
  }

  :host(adc-carousel) .bx--btn.bx--carousel__navigation__btn {
    background-color: transparent;
    border: none;
    padding: 0;
    min-height: var(--spacing-24);
    width: var(--spacing-24);
    height: var(--spacing-24);
  }

  :host(adc-carousel) .bx--btn.bx--carousel__navigation__btn:disabled {
    color: var(--color-light-mode-text-text-disabled);
  }

  :host(adc-carousel) .bx--btn.bx--carousel__navigation__btn:hover,
  :host(adc-carousel) .bx--btn.bx--carousel__navigation__btn:focus {
    background-color: var(--color-light-mode-interactive-hover-hover-on-container-default);
  }

  :host(adc-carousel) .bx--btn.bx--carousel__navigation__btn:focus {
    border: 1px solid var(--color-light-mode-interactive-focus-outline-focus);
  }

  :host(adc-carousel) .bx--btn.bx--carousel__navigation__btn svg {
    margin: auto;
  }

  @media all and (min-width: 64em) {
    :host(adc-carousel) {
      --adc-carousel-page-size: 2;
    }
  }

  @media all and (min-width: 82em) {
    :host(adc-carousel) {
      --adc-carousel-page-size: 3;
    }
  }

  @media (min-width: 98em) {
    :host(adc-carousel) {
      --adc-carousel-page-size: 4;
    }
  }

  @media print {
    :host(adc-carousel) {
      --adc-carousel-page-size: 4;

      flex-flow: row wrap;
      margin: 0;
      padding: 0;
      max-width: 100%;
      width: 100%;
    }

    :host(adc-carousel) .bx--carousel__scroll-container {
      margin: 0;
      overflow: visible;
    }

    :host(adc-carousel) .bx--carousel__scroll-contents {
      flex-wrap: wrap;
      gap: var(--spacing-16);
      margin: 0;
      position: initial;
    }

    :host(adc-carousel) .bx--carousel__navigation {
      display: none;
    }

    :host(adc-carousel) ::slotted(:not([name])) {
      margin: 0;
    }
  }
`;
