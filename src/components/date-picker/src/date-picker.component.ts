/* eslint-disable lit-a11y/anchor-is-valid */
/* eslint-disable lit-a11y/anchor-has-content */
import { FormMixin } from "@adc/shared/src/form";
import { HostListener, HostListenerMixin } from "@adc/shared/src/HostListener";
import flatpickr from "flatpickr";
import { html, LitElement } from "lit";
import { property, query } from "lit/decorators.js";
import styles from "./date-picker.styles";
import { DATE_PICKER_MODE } from "./defs";
import appendToPlugin from "./plugins/append-to-plugin";
import rangePlugin from "./plugins/range-plugin";
import shadowDOMEventPlugin from "./plugins/shadow-dom-events-plugin";
import stateHandshakePlugin from "./plugins/state-handshake-plugin";
import type { DatePickerInput } from "./date-picker-input.component";
import type { Instance as FlatpickrInstance } from "flatpickr/dist/types/instance";
import type { Locale as FlatpickrLocale } from "flatpickr/dist/types/locale";
import type {
  Options as FlatpickrOptions,
  Plugin as FlatpickrPlugin
} from "flatpickr/dist/types/options";

let calendarMonths = 2;

const getISODateString = (date: Date) =>
  new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    .toISOString()
    .split("T")[0];

const parseISODateString = (s: string) => {
  const utcDate = new Date(Date.parse(s));
  return new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate());
};

/**
 * Date picker
 * @element adc-date-picker
 * @fires adc-date-picker-changed - The custom event fired on this element when Flatpickr updates its value.
 */
export class DatePicker extends HostListenerMixin(FormMixin(LitElement)) {
  /**
   * The slotted `<adc-date-input kind="from">`.
   */
  private _dateInteractNode: DatePickerInput | null = null;

  /**
   * The element to put calendar dropdown in.
   */
  @query("#floating-menu-container")
  private readonly _floatingMenuContainerNode!: HTMLDivElement;

  /**
   * The internal placeholder for the `value` property.
   */
  private _value!: string;

  /**
   * @returns The effective date picker mode, determined by the child `<adc-date-picker-input>`.
   */
  private get _mode() {
    const { selectorInputFrom, selectorInputTo } = this.constructor as typeof DatePicker;
    if (this.querySelector(selectorInputTo)) {
      return DATE_PICKER_MODE.RANGE;
    }
    if (this.querySelector(selectorInputFrom)) {
      return DATE_PICKER_MODE.SINGLE;
    }
    return DATE_PICKER_MODE.SIMPLE;
  }

  /**
   * @returns The Flatpickr plugins to use.
   */
  private get _datePickerPlugins(): FlatpickrPlugin[] {
    const { selectorInputTo } = this.constructor as typeof DatePicker;
    const { _floatingMenuContainerNode: floatingMenuContainerNode, _mode: mode } = this;
    const inputTo = this.querySelector(selectorInputTo);
    const plugins = [
      appendToPlugin({ appendTo: floatingMenuContainerNode }),
      shadowDOMEventPlugin(),
      stateHandshakePlugin(this)
    ];
    if (mode === DATE_PICKER_MODE.RANGE) {
      // Flatpickr runs event handlers of last registered plugins first.
      // Ensures `onValueUpdate` of `rangePlugin` runs first
      // given Flatpickr puts `01/01/1970 to 01/02/1970` to from date
      // where `rangePlugin` overrides it to separate them to from/to dates.
      // We want to ensure our handler of `onValueUpdate` (notably one in `<adc-date-picker-input>`)
      // gets the `<input>` value set by `rangePlugin` instead of Flatpickr core.
      plugins.push(rangePlugin({ input: inputTo as HTMLInputElement }));
    }
    return plugins;
  }

  /**
   * @returns The options to instantiate Flatpickr with.
   */
  private get _datePickerOptions(): FlatpickrOptions {
    return {
      onValueUpdate: function (selectedDates) {
        selectedDates.map((date) => getISODateString(date)).join("/");
      },
      // onChange: function(selectedDates) {
      //   selectedDates.push(...selectedDates);
      // },
      // onChange: (...args) => {
      //   console.log(...args);
      // },
      disableMobile: true,
      showMonths: calendarMonths,
      dateFormat: "m/d/Y",
      minDate: "today",
      allowInput: true,
      locale: {
        weekdays: {
          shorthand: ["S", "M", "T", "W", "T", "F", "S"],
          longhand: ["S", "M", "T", "W", "T", "F", "S"]
        },
        /*
          firstDayOfWeek is set to Monday(1) by default.
          Change firstDayOfWeek to 0 to begin week with Sunday.
        */
        firstDayOfWeek: 1
      },
      onOpen: [
        () => {
          this.open = true;
          if (window.innerWidth < 768) {
            calendarMonths = 1;
            this.mobileView = true;
          } else {
            if (window.innerWidth > 768) {
              calendarMonths = 2;
              this.mobileView = false;
            }
          }
        }
      ],
      onClose: [
        () => {
          this.open = false;
          if (window.innerWidth < 768) {
            calendarMonths = 1;
          } else {
            if (window.innerWidth > 768) {
              calendarMonths = 2;
            }
          }
        }
      ],
      positionElement: this._dateInteractNode?.adcTextInput,
      plugins: this._datePickerPlugins
    };
  }

  /**
   * Handles adc-date-picker-changed event on this element.
   */
  @HostListener("eventChange")
  // @ts-expect-error: The decorator refers to this method but TS thinks this method is not referred to
  private readonly _handleChange = ({ detail }: CustomEvent) => {
    this._value = detail.selectedDates.map((date) => getISODateString(date)).join("/");
    const { value: oldValue } = this;
    this.value = this._value;
    this.requestUpdate("value", oldValue);
  };

  handleFormdata(event: Event) {
    const { formData } = event as any;
    const { disabled, name, value } = this;
    if (!disabled) {
      formData.append(name, value);
    }
  }

  /**
   * Handles `slotchange` event in the `<slot>`.
   */
  private _handleSlotChange({ target }: Event) {
    const { _dateInteractNode: oldDateInteractNode } = this;
    const dateInteractNode = (target as HTMLSlotElement)
      .assignedNodes()
      .find(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE &&
          (node as HTMLElement).matches((this.constructor as typeof DatePicker).selectorInputFrom)
      );
    if (oldDateInteractNode !== dateInteractNode) {
      this._dateInteractNode = dateInteractNode as DatePickerInput;
      this._instantiateDatePicker();
    }
  }

  /**
   * Instantiates Flatpickr.
   * @returns The Flatpickr instance.
   */
  private _instantiateDatePicker() {
    this._releaseDatePicker();
    const { _dateInteractNode: dateInteractNode } = this;

    if (dateInteractNode?.adcTextInput) {
      this.calendar = flatpickr(dateInteractNode as any, this._datePickerOptions);
    }
    return this.calendar;
  }

  /**
   * Releases Flatpickr instances.
   */
  private _releaseDatePicker() {
    if (this.calendar) {
      this.calendar.destroy();
      this.calendar = null;
    }
    return this.calendar;
  }

  /**
   * The Flatpickr instance.
   */
  calendar: FlatpickrInstance | null = null;

  /**
   * 'true' if calendar should display a single month view.
   */
  @property({ type: Boolean, reflect: true }) mobileView = false;

  /**
   * Controls the disabled state of the input.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * `true` if the date picker should be open.
   */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * The date format to let Flatpickr use.
   */
  @property({ type: String, attribute: "date-format" }) dateFormat = "";

  /**
   * Controls number of months displayed by calendar.
   */
  @property({ type: String, attribute: "show-months", reflect: true }) showMonths;

  /**
   * The localization data.
   */
  @property({ attribute: false }) locale!: FlatpickrLocale;

  /**
   * The date range that a user can pick in calendar dropdown.
   */
  @property({ attribute: "enabled-range" }) enabledRange!: string;

  /**
   * Name for the input in the `FormData`
   */
  @property() name = "";

  connectedCallback() {
    super.connectedCallback();
    this._instantiateDatePicker();
  }

  disconnectedCallback() {
    this._releaseDatePicker();
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    const { calendar, disabled, open } = this;
    const { selectorInputFrom, selectorInputTo } = this.constructor as typeof DatePicker;
    const inputFrom = this.querySelector(selectorInputFrom)!;
    const inputTo = this.querySelector(selectorInputTo)!;
    if (calendar && changedProperties.has("dateFormat")) {
      const { dateFormat } = this;
      calendar.set({ dateFormat });
    }
    if (changedProperties.has("enabledRange")) {
      const { enabledRange } = this;
      const dates = enabledRange
        .split("/")
        .map((item) => (!item ? undefined : parseISODateString(item))); // Allows empty start/end
      if (dates.some((item) => isNaN(parseFloat(item!.toString())))) {
        throw new Error(`Wrong date format found in \`enabledRange\` property: ${enabledRange}`);
      }
      const [minDate, maxDate] = dates;
      if (minDate && maxDate && minDate > maxDate) {
        throw new Error(
          `In \`enabledRange\` property, the end date shouldn't be smaller than the start date. You have: ${enabledRange}`
        );
      }
      if (calendar) {
        calendar.set({ minDate, maxDate });
      }
    }
    if (changedProperties.has("open") && calendar) {
      [inputFrom, inputTo].forEach((input: DatePickerInput) => {
        if (!input.readonly && open) {
          this.setAttribute("open", "true");
          calendar.open();
        } else {
          calendar.close();
        }
      });
    }
    if (changedProperties.has("disabled")) {
      [inputFrom, inputTo].forEach((input: DatePickerInput) => {
        if (input) {
          input.disabled = disabled;
        }
      });
    }
    if (changedProperties.has("value")) {
      const { value } = this;
      const dates = value
        .split("/")
        .filter(Boolean)
        .map((item) => parseISODateString(item));
      if (dates.some((item) => isNaN(parseFloat(item.toString())))) {
        throw new Error(`Wrong date format found in \`value\` property: ${value}`);
      }
      const [startDate, endDate] = dates;
      if (startDate && endDate && startDate > endDate) {
        throw new Error(
          `In \`value\` property, the end date shouldn't be smaller than the start date. You have: ${value}`
        );
      }
      if (calendar) {
        calendar.setDate(dates);
        [inputFrom, inputTo].forEach((input: DatePickerInput, i) => {
          if (input) {
            input.value = !dates[i]
              ? ""
              : calendar.formatDate(new Date(dates[i]), calendar.config.dateFormat);
          }
        });
      }
    }
  }

  /**
   * The date(s) in ISO8601 format (date portion only), for range mode, '/' is used for separate start/end dates.
   */
  @property()
  get value() {
    return this._value;
  }

  set value(value: string) {
    const { _value: oldValue } = this;
    this._value = value;
    this.requestUpdate("value", oldValue);
  }

  render() {
    const { _handleSlotChange: handleSlotChange } = this;
    return html`
      <a class="adc-date-picker-input--hidden" href="javascript:void 0" role="navigation"></a>
      <slot @slotchange="${handleSlotChange}"></slot>
      <div id="floating-menu-container"></div>
      <a class="adc-date-picker-input--hidden" href="javascript:void 0" role="navigation"></a>
    `;
  }

  /**
   * The CSS class applied to the "today" highlight if there are any dates selected.
   */
  static classNoBorder = "no-border";

  /**
   * The default date format.
   */
  static defaultDateFormat = "m/d/Y";

  /**
   * The default localization data.
   */
  static defaultLocale = flatpickr.l10ns.default;

  /**
   * A selector that will return the `<input>` to enter starting date.
   */
  static get selectorInputFrom() {
    return 'adc-date-picker-input[kind="single"],adc-date-picker-input[kind="from"]';
  }

  /**
   * A selector that will return the `<input>` to enter end date.
   */
  static get selectorInputTo() {
    return 'adc-date-picker-input[kind="to"]';
  }

  /**
   * The name of the custom event when Flatpickr throws an error.
   */
  static get eventFlatpickrError() {
    return "adc-date-picker-flatpickr-error";
  }

  /**
   * The name of the custom event fired on this element when Flatpickr updates its value.
   */
  static get eventChange() {
    return "adc-date-picker-changed";
  }

  /**
   * @private
   */
  static styles = styles;
}

try {
  customElements.define("adc-date-picker", DatePicker);
} catch (error) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-date-picker": DatePicker;
  }
}
