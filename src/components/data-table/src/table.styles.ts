import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  :host(adc-table.focus-visible),
  :host(adc-table:focus-within),
  :host(adc-table-body.focus-visible),
  :host(adc-table-body:focus-within) {
    outline: 0;
  }

  :host(adc-table) {
    width: 100%;
    border-spacing: 0;
    display: table;
    border-collapse: collapse;
    box-sizing: border-box;
  }

  :host(adc-table) ::slotted(adc-table-body) {
    width: 100%;
    display: table-row-group;
  }

  :host(adc-table) ::slotted(adc-table-head) {
    font-family: var(--typography-390-body-paragraph-bold-font-family);
    font-size: calc(var(--typography-390-body-paragraph-bold-font-size) * 1px);
    line-height: calc(var(--typography-390-body-paragraph-bold-line-height) * 1px);
    font-weight: var(--typography-390-body-paragraph-bold-font-weight);
    letter-spacing: var(--typography-390-body-paragraph-bold-letter-spacing);

    background-color: var(--color-light-mode-background-container-tertiary);
    display: table-header-group;
    border-color: inherit;
  }

  :host(adc-table-row) ::slotted(adc-table-cell) {
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: var(--typography-1440-body-paragraph-letter-spacing);

    display: table-cell;
  }

  :host(adc-table-expand-row) ::slotted(adc-table-cell) {
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: var(--typography-1440-body-paragraph-letter-spacing);

    display: table-cell;
  }

  :host(adc-table-row),
  :host(adc-table-expand-row) {
    background-color: var(--color-light-mode-background-container-default);
    display: table-row;
    height: var(--spacing-48);
    width: 100%;
  }

  :host(adc-table-row) ::slotted(adc-table-cell),
  :host(adc-table-expand-row) ::slotted(adc-table-cell),
  :host(adc-table-row) .adc-table-expand-button--wrapper,
  :host(adc-table-expand-row) .adc-table-expand-button--wrapper,
  :host(adc-table-row) .adc--table-column-checkbox,
  :host(adc-table-expand-row) .adc--table-column-checkbox {
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: var(--typography-1440-body-paragraph-letter-spacing);

    color: var(--color-light-mode-text-text-default);
    vertical-align: middle;
  }

  :host(adc-table-expand-row:hover) {
    background: var(--color-light-mode-interactive-hover-hover-on-container-default);
  }

  :host(adc-table-row) ::slotted(adc-table-cell:first-of-type) {
    padding-left: var(--spacing-16);
  }

  :host(adc-table-row) ::slotted(adc-table-cell:last-of-type) {
    padding-right: var(--spacing-16);
  }

  :host(adc-table-expand-row) ::slotted(adc-table-cell:first-of-type) {
    padding-left: var(--spacing-16);
  }

  :host(adc-table-expand-row) ::slotted(adc-table-cell:last-of-type) {
    padding-right: var(--spacing-16);
  }

  :host(adc-table-header-expand-row) ::slotted(adc-table-header-cell:first-of-type) {
    padding-left: var(--spacing-16);
  }

  /**
    table-header-expand-row
**/

  :host(adc-table-header-expand-row),
  :host(adc-table-expand-row) {
    border: 1px solid transparent;
  }

  :host(adc-table-header-expand-row) .adc-table-expand-button--wrapper,
  :host(adc-table-expand-row) .adc-table-expand-button--wrapper {
    display: table-cell;
    width: var(--spacing-40);
    height: inherit;
    vertical-align: middle;
    padding: 0;
    transition: transform 240ms cubic-bezier(0.2, 0, 0.38, 0.9) 0s;
  }

  :host(adc-table-header-expand-row) .adc-table-expand-button--wrapper:focus-visible,
  :host(adc-table-expand-row) .adc-table-expand-button--wrapper:focus-visible {
    outline: 0;
    border: 1px solid var(--color-light-mode-interactive-focus-outline-focus) !important;
  }

  :host(adc-table-header-expand-row[expanded])
    .adc-table-expand-button--wrapper
    .adc--table-expand__svg,
  :host(adc-table-expand-row[expanded]) .adc-table-expand-button--wrapper .adc--table-expand__svg {
    transform: rotate(270deg);
  }

  :host(adc-table-header-expand-row) .adc-table-expand--button,
  :host(adc-table-expand-row) .adc-table-expand--button {
    transition: transform 370ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      -webkit-transform 370ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transform: rotate3d(1, 0, 0, 0deg);
    transform-origin: center;
  }

  :host(adc-table-header-expand-row) .adc-table-expand--button:focus-visible,
  :host(adc-table-expand-row) .adc-table-expand--button:focus-visible {
    outline: 0;
    border: none;
  }

  :host(adc-table-head) ::slotted(adc-table-header-expand-row) {
    color: var(--color-light-mode-text-text-default);
    text-align: left;
    display: table-cell;
  }

  :host(adc-table-head) ::slotted(adc-table-header-row),
  :host(adc-table-head) ::slotted(adc-table-header-expand-row) {
    height: var(--spacing-48);
    display: table-row;
  }

  :host(adc-table-header-expand-row.focus-visible),
  :host(adc-table-expand-row.focus-visible) {
    outline: 1px solid var(--color-light-mode-interactive-focus-outline-focus);
  }

  :host(adc-table-expand-row[expanded]) .adc-table-expand--button,
  :host(adc-table-header-expand-row[expanded]) .adc-table-expand--button {
    transform: rotate3d(1, 0, 0, 180deg);
  }

  :host(adc-table-expanded-row[expanded]) .adc-expanded-row__wrapper,
  :host(adc-table-header-expanded-row[expanded]) .adc-expanded-row__wrapper {
    max-height: 200vh;
    transition: max-height 240ms cubic-bezier(0.4, 0, 1, 1) 100ms;
  }

  :host(adc-table-header-expand-row:hover) {
    background: var(--color-light-mode-interactive-hover-hover-on-container-tertiary);
  }

  :host(adc-table-header-expand-row:hover):focus-visible {
    background: var(--color-light-mode-interactive-hover-hover-on-container-tertiary);
  }

  :host(adc-table-expanded-row) {
    font-family: var(--typography-1440-body-paragraph-font-family);
    font-size: calc(var(--typography-1440-body-paragraph-font-size) * 1px);
    line-height: calc(var(--typography-1440-body-paragraph-line-height) * 1px);
    font-weight: var(--typography-1440-body-paragraph-font-weight);
    letter-spacing: var(--typography-1440-body-paragraph-letter-spacing);

    background: var(--color-light-mode-background-container-default);
    display: table-row;
    transition: height 240ms cubic-bezier(0.2, 0, 0.38, 0.9) 0s,
      background-color 110ms cubic-bezier(0.2, 0, 0.38, 0.9) 0s;
  }

  :host(adc-table-expanded-row)[expanded] {
    height: auto;
    padding-left: var(--spacing-48);
  }

  :host(adc-table-expanded-row[expanded]) td adc-expanded-row__wrapper {
    height: auto;
  }

  :host(adc-table-expanded-row) td {
    padding: 0 var(--spacing-16);
    vertical-align: middle;
    height: 0;
    transition: all 110ms cubic-bezier(0.2, 0, 0.38, 0.9) 0s;
  }

  :host(adc-table-expanded-row[expanded]) td {
    border-bottom: 1px solid var(--color-light-mode-border-border-default);
    padding-top: 0.875rem;
    padding-bottom: 0.8125rem;
    height: auto;
  }

  :host(adc-table-expanded-row[expanded]) td:hover {
    background: var(--color-light-mode-interactive-hover-hover-on-container-default);
  }

  :host(adc-table-expanded-row) .adc-expanded-row__wrapper {
    overflow: hidden;
    height: 0;
  }

  :host(adc-table-expanded-row[expanded]) .adc-expanded-row__wrapper {
    height: auto;
  }

  :host(adc-table-body) ::slotted(adc-table-expanded-row) .adc-expanded-row__wrapper {
    height: 0;
  }

  :host(adc-table-body) ::slotted(adc-table-expanded-row[expanded]) .adc-expanded-row__wrapper {
    height: auto;
  }

  /**
    table-expand-row-button
**/

  .adc-table-expand--button {
    color: var(--color-light-mode-icon-icon-interactive);
    box-sizing: border-box;
    margin: 0;
    font-family: inherit;
    font-size: 100%;
    border: 0;
    appearance: none;
    background: none;
    cursor: pointer;
    display: inline-flex;
    width: 100%;
    height: calc(100% + 1px);
    align-items: center;
    justify-content: center;
    padding: 0 var(--spacing-16);
    vertical-align: inherit;
  }

  .adc-table-expand--slotted {
    display: table-cell;
    vertical-align: middle;
  }

  .adc-table-expand--slotted-rtl {
    display: table-cell;
    vertical-align: middle;
  }

  /**
    divider styling
**/

  :host(adc-table-row[divider]) {
    border-bottom: 1px solid var(--color-light-mode-border-border-default) !important;
  }

  :host(adc-table-header-expand-row[divider]) {
    border-bottom: 1px solid var(--color-light-mode-border-border-default) !important;
  }

  :host(adc-table-head[divider]) {
    border-bottom: 1px solid var(--color-light-mode-border-border-default) !important;
  }

  :host(adc-table-header-row[divider]) {
    border-bottom: 1px solid var(--color-light-mode-border-border-default) !important;
  }

  :host(adc-table-row) ::slotted(adc-table-cell[divider]),
  :host(adc-table-body) ::slotted(adc-table-expand-row[divider]) {
    border-bottom: 1px solid var(--color-light-mode-border-border-default);
  }

  /**
    row size styling
**/

  :host(adc-table-body) ::slotted(adc-table-row[size="short"]),
  :host(adc-table-body) ::slotted(adc-table-expand-row[size="short"]),
  :host(adc-table-head) ::slotted(adc-table-header-row[size="short"]),
  :host(adc-table-head) ::slotted(adc-table-header-expand-row[size="short"]) {
    height: var(--spacing-32);
  }

  :host(adc-table-body) ::slotted(adc-table-row[size="default"]),
  :host(adc-table-body) ::slotted(adc-table-expand-row[size="default"]),
  :host(adc-table-head) ::slotted(adc-table-header-row[size="default"]),
  :host(adc-table-head) ::slotted(adc-table-header-expand-row[size="default"]) {
    height: var(--spacing-40);
  }

  :host(adc-table-body) ::slotted(adc-table-row[size="tall"]),
  :host(adc-table-body) ::slotted(adc-table-expand-row[size="tall"]),
  :host(adc-table-head) ::slotted(adc-table-header-row[size="tall"]),
  :host(adc-table-head) ::slotted(adc-table-header-expand-row[size="tall"]) {
    height: 3.5rem;
  }

  /**
    Common style for table cell and table header cell
  **/

  :host(adc-table-header-row) ::slotted(adc-table-header-cell),
  :host(adc-table-header-row) ::slotted(adc-table-header-cell-skeleton),
  :host(adc-table-header-row) .adc--table-column-checkbox,
  :host(adc-table-header-expand-row) ::slotted(adc-table-header-cell),
  :host(adc-table-header-expand-row) ::slotted(adc-table-header-cell-skeleton),
  :host(adc-table-header-expand-row) .adc-table-expand-button--wrapper,
  :host(adc-table-header-expand-row) .adc--table-column-checkbox,
  :host(adc-table-row) ::slotted(adc-table-cell),
  :host(adc-table-row) ::slotted(adc-table-cell-skeleton),
  :host(adc-table-row) .adc--table-column-checkbox,
  :host(adc-table-expand-row) ::slotted(adc-table-cell),
  :host(adc-table-expand-row) ::slotted(adc-table-cell-skeleton),
  :host(adc-table-expand-row) .adc-table-expand-button--wrapper,
  :host(adc-table-expand-row) .adc--table-column-checkbox {
    display: table-cell;
  }

  :host(adc-table-header-row) ::slotted(adc-table-header-cell),
  :host(adc-table-header-expand-row) ::slotted(adc-table-header-cell),
  :host(adc-table-header-row) .adc-table-expand-button--wrapper,
  :host(adc-table-header-expand-row) .adc-table-expand-button--wrapper,
  :host(adc-table-header-row) .adc--table-column-checkbox,
  :host(adc-table-header-expand-row) .adc--table-column-checkbox {
    vertical-align: middle;
  }

  :host(adc-table-header-row) ::slotted(adc-table-header-cell),
  :host(adc-table-header-expand-row) ::slotted(adc-table-header-cell) {
    color: var(--color-light-mode-text-text-default);
    text-align: left;
    display: table-cell;
  }

  :host(adc-table-header-row) ::slotted(adc-table-header-cell:last-of-type),
  :host(adc-table-header-expand-row) ::slotted(adc-table-header-cell:last-of-type) {
    position: relative;
    width: auto;
  }

  :host(adc-table-header-row) ::slotted(adc-table-header-cell:first-of-type) {
    padding-left: var(--spacing-16);
  }
`;
