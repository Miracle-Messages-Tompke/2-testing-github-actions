import { componentStyles } from "@adc/styles/dist/styles.js";
import { css } from "lit";

export default css`
  ${componentStyles}

  #floating-menu-container {
    position: absolute;
    width: 100%;
  }

  :host {
    display: flex;
  }

  :host([readonly]) .adc-text-input--readonly {
    background: var(--color-light-mode-interactive-disabled-disabled-on-container-interactive);
    color: var(--color-light-mode-text-text-disabled);
    border-color: var(--color-light-mode-interactive-disabled-disabled-on-border-interactive);
  }

  :host([invalid]) .adc-date-picker--helper-text {
    color: var(--color-light-mode-text-text-status-error);
  }

  :host([invalid]) .adc-date-picker--label {
    color: var(--color-light-mode-text-text-status-error);
  }

  :host([invalid]) .adc-text-input {
    border-color: var(--color-light-mode-border-border-status-error);
  }

  :host([invalid]) .adc-date-picker__input {
    border-color: var(--color-light-mode-border-border-status-error);
  }

  :host([invalid]) .adc-date-picker__input ~ .adc-date-picker--form-requirement {
    font-family: var(--typography-1440-helper-1-caption-font-family);
    font-size: calc(var(--typography-1440-helper-1-caption-font-size) * 1px);
    line-height: calc(var(--typography-1440-helper-1-caption-line-height) * 1px);
    font-weight: var(--typography-1440-helper-1-caption-font-weight);
    letter-spacing: calc(var(--typography-1440-helper-1-caption-letter-spacing) * 1px);

    color: var(--color-light-mode-text-text-status-error);
    display: block;
    position: relative;
    bottom: var(--spacing-4);
    overflow: visible;
  }

  :host(adc-date-picker-input[kind="from"]) {
    margin-right: var(--spacing-16);
  }

  :host(adc-date-picker[mobileView]) .flatpickr-current-month .flatpickr-monthDropdown-months {
    font-family: var(--typography-390-heading-h5-font-family);
    font-size: calc(var(--typography-390-heading-h5-font-size) * 1px);
    line-height: calc(var(--typography-390-heading-h5-line-height) * 1px);
    font-weight: var(--typography-390-heading-h5-font-weight);
    letter-spacing: calc(var(--typography-390-heading-h5-letter-spacing) * 1px);

    background: transparent;
    border: 0;
    border-radius: 0;
    color: var(--color-light-mode-text-text-on-container-interactive);
    cursor: text;
    height: auto;
    margin: -1px 0 0;
    outline: 0;
    padding: 0 0 0 var(--spacing-8);
    position: relative;
    vertical-align: initial;
    box-sizing: border-box;
    appearance: inherit;
    pointer-events: none;
    width: auto;
  }

  :host(adc-date-picker[mobileView]) .flatpickr-current-month span.cur-month {
    font-family: var(--typography-390-heading-h5-font-family);
    font-size: calc(var(--typography-390-heading-h5-font-size) * 1px);
    line-height: calc(var(--typography-390-heading-h5-line-height) * 1px);
    font-weight: var(--typography-390-heading-h5-font-weight);
    letter-spacing: calc(var(--typography-390-heading-h5-letter-spacing) * 1px);

    color: var(--color-light-mode-text-text-on-container-interactive);
    display: inline-block;
    margin-left: var(--spacing-8);
    padding: 0;
  }

  :host(adc-date-picker[mobileView]) .flatpickr-current-month {
    font-size: inherit;
    position: relative;
    display: block;
    padding: var(--spacing-8) 0 0;
  }

  :host(adc-date-picker[mobileView]) .numInputWrapper span {
    width: 0;
  }

  :host(adc-date-picker[mobileView]) .flatpickr-months {
    grid-template-columns: repeat(1, 1fr);
  }

  :host(adc-date-picker[mobileView]) .flatpickr-weekdays {
    grid-template-columns: repeat(1, 1fr);
  }

  .adc-date-picker-input__wrapper {
    position: relative;
    user-select: none;
    width: 100%;
  }

  .adc-date-picker-icon--container {
    display: flex;
    position: absolute;
    right: 0;
    top: var(--spacing-24);
  }

  .adc-date-picker-icon--container .adc-date-picker__icon {
    appearance: none;
    background: none;
    border: 0;
    color: var(--color-light-mode-icon-icon-interactive);
    cursor: pointer;
    display: flex;
    padding: var(--spacing-8) var(--spacing-16);
  }

  .adc-date-picker__icon-error {
    color: var(--color-light-mode-text-text-status-error);
  }

  .adc-date-picker__label {
    font-family: var(--typography-1440-label-label-font-family);
    font-size: calc(var(--typography-1440-label-label-font-size) * 1px);
    font-weight: var(--typography-1440-label-label-font-weight);
    letter-spacing: calc(var(--typography-1440-label-label-letter-spacing) * 1px);

    color: var(--color-light-mode-text-text-secondary);
    line-height: var(--spacing-16);
  }

  .adc-date-picker__label--invalid {
    color: var(--color-light-mode-text-text-status-error);
  }

  .flatpickr-current-month span.cur-month {
    font-family: var(--typography-390-heading-h5-font-family);
    font-size: calc(var(--typography-390-heading-h5-font-size) * 1px);
    line-height: calc(var(--typography-390-heading-h5-line-height) * 1px);
    font-weight: var(--typography-390-heading-h5-font-weight);
    letter-spacing: calc(var(--typography-390-heading-h5-letter-spacing) * 1px);

    color: var(--color-light-mode-text-text-on-container-interactive);
    display: inline-block;
    margin-left: var(--spacing-8);
    padding: 0;
  }

  .flatpickr-months {
    background: var(--color-light-mode-background-container-interactive);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .flatpickr-months .flatpickr-month {
    background: transparent;
    height: var(--spacing-40);
    line-height: 1;
    text-align: center;
    position: relative;
    user-select: none;
    overflow: hidden;
    -webkit-box-flex: 1;
    flex: 1 1 0;
  }

  .flatpickr-current-month input.cur-year {
    font-family: var(--typography-390-heading-h5-font-family);
    font-size: calc(var(--typography-390-heading-h5-font-size) * 1px);
    line-height: calc(var(--typography-390-heading-h5-line-height) * 1px);
    font-weight: var(--typography-390-heading-h5-font-weight);
    letter-spacing: calc(var(--typography-390-heading-h5-letter-spacing) * 1px);

    background: transparent;
    box-sizing: border-box;
    color: var(--color-light-mode-text-text-on-container-interactive);
    cursor: text;
    padding: 0 0 0 var(--spacing-8);
    margin: 0;
    display: inline-block;
    height: auto;
    border: 0;
    border-radius: 0;
    vertical-align: initial;
    appearance: textfield;
  }

  .flatpickr-current-month .numInputWrapper span.arrowUp::after {
    border-bottom-color: var(--color-light-mode-border-border-tertiary);
    border-top-color: var(--color-light-mode-border-border-tertiary);
  }

  .flatpickr-current-month .numInputWrapper span.arrowDown::after {
    border-bottom-color: var(--color-light-mode-border-border-tertiary);
    border-top-color: var(--color-light-mode-border-border-tertiary);
  }

  .numInputWrapper span:hover {
    background: #00000061;
  }

  .flatpickr-prev-month,
  .flatpickr-next-month {
    pointer-events: visible;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--spacing-40) !important;
    height: var(--spacing-40) !important;
    padding: 0;
    line-height: var(--spacing-16);
    text-decoration: none;
    cursor: pointer;
    transition: background-color 70ms cubic-bezier(0.2, 0, 0.38, 0.9) 0s;
  }

  .flatpickr-prev-month:hover,
  .flatpickr-next-month:hover {
    background-color: #00000061;
  }

  .flatpickr-months .flatpickr-prev-month,
  .flatpickr-months .flatpickr-next-month {
    text-decoration: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    padding: 0;
    z-index: 3;
    color: var(--color-light-mode-text-text-on-container-interactive);
    fill: var(--color-light-mode-text-text-on-container-interactive);
  }

  .flatpickr-months .flatpickr-prev-month:hover svg,
  .flatpickr-months .flatpickr-next-month:hover svg {
    fill: var(--color-light-mode-text-text-on-container-interactive);
  }

  span.flatpickr-weekday {
    font-family: var(--typography-390-heading-h5-font-family);
    font-size: calc(var(--typography-390-heading-h5-font-size) * 1px);
    font-weight: var(--typography-390-heading-h5-font-weight);
    letter-spacing: calc(var(--typography-390-heading-h5-letter-spacing) * 1px);

    cursor: default;
    background: transparent;
    color: var(--color-light-mode-text-text-default);
    line-height: 1;
    margin: 0;
    text-align: center;
    display: block;
    -webkit-box-flex: 1;
    flex: 1 1 0;
  }

  .flatpickr-weekdays {
    background: transparent;
    text-align: center;
    overflow: hidden;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    -webkit-box-align: center;
    align-items: center;
    margin-top: var(--spacing-12);
  }

  .flatpickr-weekdaycontainer {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .flatpickr-calendar {
    line-height: 0;
    font-size: inherit;
    box-shadow: 0 var(--spacing-2) var(--spacing-2) rgb(0 0 0 / 0.301);
    top: 4.25rem !important;
  }

  .flatpickr-day {
    font-family: var(--typography-1440-label-label-font-family);
    font-size: calc(var(--typography-1440-label-label-font-size) * 1px);
    line-height: calc(var(--typography-1440-label-label-line-height) * 1px);
    font-weight: var(--typography-1440-label-label-font-weight);
    letter-spacing: calc(var(--typography-1440-label-label-letter-spacing) * 1px);

    background: none;
    border: none;
    border-radius: 0;
    box-sizing: border-box;
    color: var(--color-light-mode-text-text-default);
    cursor: pointer;
    margin: 0;
    width: var(--spacing-40);
    height: var(--spacing-40);
    display: flex;
    position: relative;
    -webkit-box-pack: center;
    justify-content: space-around;
    text-align: center;
    align-items: center;
    transition: all 100ms cubic-bezier(0, 0, 0.38, 0.9) 0s;
  }

  .flatpickr-day:hover {
    background: var(--color-light-mode-interactive-hover-hover-on-container-default);
    text-decoration: underline;
    border: none;
  }

  .dayContainer {
    grid-template-columns: repeat(7, var(--spacing-40));
    grid-template-rows: var(--spacing-40);
    align-self: start;
    opacity: 1;
    justify-content: space-evenly;
  }

  .flatpickr-days {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: var(--spacing-8) 0 var(--spacing-4) 0;
  }

  .flatpickr-day.today {
    border: var(--spacing-2) solid var(--color-light-mode-border-border-default);
    border-radius: var(--size-w8);
  }

  .flatpickr-day.today:hover {
    background: var(--color-light-mode-background-container-default);
    border-radius: var(--size-w8);
    text-decoration: underline;
  }

  .flatpickr-day.today.inRange {
    background-color: var(--color-light-mode-background-container-default);
    border-radius: 0;
  }

  .flatpickr-day.today.selected::after {
    display: none;
  }

  .flatpickr-day.inRange {
    color: var(--color-light-mode-text-text-default);
    background-color: var(--color-light-mode-background-container-tertiary);
    border: none;
    box-shadow: var(--color-light-mode-background-container-tertiary) -0.313rem 0,
      var(--color-light-mode-background-container-tertiary) 0.313rem 0;
  }

  .rangeMode .flatpickr-day {
    margin-top: 0;
  }

  .flatpickr-day.selected {
    color: var(--color-light-mode-text-text-on-container-interactive);
    background-color: var(--color-light-mode-background-container-default);
  }

  .flatpickr-day.selected:focus {
    outline: 1px solid var(--spacing-2);
    outline-offset: 0.188rem;
  }

  .flatpickr-day.startRange.selected {
    z-index: 2;
    box-shadow: none;
  }

  .flatpickr-day.startRange.inRange:not(.selected),
  .flatpickr-day.endRange.inRange {
    box-shadow: inset 0 0 0 var(--spacing-2) var(--color-light-mode-background-container-default);
    z-index: 3;
    background: var(--color-light-mode-background-container-default);
  }

  .flatpickr-day.endRange.inRange.selected {
    color: var(--color-light-mode-text-text-on-container-interactive);
    background: var(--color-light-mode-background-container-default);
  }

  .flatpickr-day.flatpickr-disabled {
    color: var(--color-light-mode-text-text-disabled);
    cursor: not-allowed;
  }

  .flatpickr-day.flatpickr-disabled:hover {
    background-color: transparent;
  }

  .flatpickr-calendar::before,
  .flatpickr-calendar::after {
    position: absolute;
    display: block;
    pointer-events: none;
    border: none;
    content: "";
    height: 0;
    width: 0;
    left: 0;
    top: 50px;
  }

  .flatpickr-calendar.multiMonth
    .flatpickr-days
    .dayContainer:nth-child(n + 2)
    .flatpickr-day.inRange:nth-child(7n + 1) {
    box-shadow: -1px 0 0 var(--color-light-mode-background-container-tertiary),
      var(--spacing-4) 0 0 var(--color-light-mode-background-container-tertiary);
  }

  .flatpickr-day.selected.startRange + .endRange:not(:nth-child(7n + 1)),
  .flatpickr-day.startRange.startRange + .endRange:not(:nth-child(7n + 1)),
  .flatpickr-day.endRange.startRange + .endRange:not(:nth-child(7n + 1)) {
    box-shadow: var(--color-light-mode-background-container-tertiary) -2px 0 0;
  }

  .flatpickr-weekwrapper .flatpickr-weeks {
    padding: 0 var(--spacing-12);
    box-shadow: 1px 0 0 var(--color-light-mode-background-container-tertiary);
  }

  .flatpickr-day.today:hover,
  .flatpickr-day.today:focus {
    border-color: var(--color-light-mode-border-border-default);
    background: transparent;
    color: var(--color-light-mode-text-text-default);
    text-decoration: underline;
  }

  .flatpickr-day.inRange,
  .flatpickr-day.prevMonthDay.inRange,
  .flatpickr-day.nextMonthDay.inRange,
  .flatpickr-day.today.inRange,
  .flatpickr-day.prevMonthDay.today.inRange,
  .flatpickr-day.nextMonthDay.today.inRange,
  .flatpickr-day:hover,
  .flatpickr-day.prevMonthDay:hover,
  .flatpickr-day.nextMonthDay:hover,
  .flatpickr-day:focus,
  .flatpickr-day.prevMonthDay:focus,
  .flatpickr-day.nextMonthDay:focus {
    cursor: pointer;
    outline: 0;
  }

  .flatpickr-day.endRange {
    background: var(--color-light-mode-background-container-default);
    box-shadow: none;
    color: var(--color-light-mode-text-text-on-container-interactive);
    border-color: var(--color-light-mode-border-border-default);
  }

  .flatpickr-day.endRange:hover {
    box-shadow: inset 0 0 0 var(--spacing-2) var(--color-light-mode-background-container-default);
    color: var(--color-light-mode-text-text-default);
    background: var(--color-light-mode-interactive-hover-hover-on-container-default);
    border-color: var(--color-light-mode-border-border-default);
  }

  .flatpickr-day.startRange,
  .flatpickr-day.startRange:hover {
    background: var(--color-light-mode-background-container-default);
    box-shadow: none;
    color: var(--color-light-mode-text-text-on-container-interactive);
    border-color: var(--color-light-mode-border-border-default);
  }

  .flatpickr-day.startRange,
  .flatpickr-day.selected.endRange {
    background: var(--color-light-mode-background-container-default);
    box-shadow: none;
    color: var(--color-light-mode-text-text-on-container-interactive);
    border-color: var(--color-light-mode-border-border-default);
  }

  .flatpickr-day.selected.startRange {
    background: var(--color-light-mode-background-container-default);
    box-shadow: none;
    color: var(--color-light-mode-text-text-on-container-interactive);
    border-color: var(--color-light-mode-border-border-default);
  }

  .flatpickr-day.selected.startRange,
  .flatpickr-day.startRange.startRange,
  .flatpickr-day.endRange.startRange {
    border-radius: 0;
  }

  .flatpickr-day.selected.endRange,
  .flatpickr-day.startRange.endRange,
  .flatpickr-day.endRange.endRange {
    border-radius: 0;
  }

  .adc-date-picker-input--hidden {
    min-width: 0;
    border: none;
    border-radius: 0;
    background: none;
    appearance: none;
    padding: 0;
  }
`;
