import type { DatePicker } from "../date-picker.component";
import type { Instance as FlatpickrInstance } from "flatpickr/dist/types/instance";
import type { Plugin } from "flatpickr/dist/types/options";

/**
 * @param config Plugin configuration.
 * @returns A Flatpickr plugin to handshake states with `<adc-date-picker>`.
 */
export default (datePicker: DatePicker): Plugin =>
  (fp: FlatpickrInstance) => {
    /**
     * Sets open state.
     */
    const setOpen = () => {
      datePicker.open = true;
    };

    /**
     * Sets closed state.
     */
    const setClosed = () => {
      datePicker.open = false;
    };

    /**
     * Propagates Flatpickr's `onChange` event to `<adc-date-picker>`.
     * @param selectedDates The latest selected dates.
     */
    const handleChange = (selectedDates: Date[]) => {
      const { eventChange } = datePicker.constructor as typeof DatePicker;
      datePicker.dispatchEvent(
        new CustomEvent(eventChange, {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            selectedDates
          }
        })
      );
    };

    /**
     * Registers this Flatpickr plugin.
     * @param calendar The Flatpickr instance.
     */
    const register = (_selectedDates, _value, calendar: FlatpickrInstance) => {
      datePicker.calendar = calendar;
      fp.loadedPlugins.push("carbonFlatpickrStateHandshakePlugin");
    };

    return {
      onOpen: setOpen,
      onClose: setClosed,
      onChange: handleChange,
      onReady: [register]
    };
  };
