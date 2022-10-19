import type { Instance as FlatpickrInstance } from "flatpickr/dist/types/instance";
import type { Plugin } from "flatpickr/dist/types/options";

/**
 * The configuration for the Flatpickr plugin to put the calendar dropdown in shadow DOM.
 */
export interface DatePickerAppendToPluginConfig {
  /**
   * The floating menu container.
   */
  appendTo: HTMLElement;
}

/**
 * @param config Plugin configuration.
 * @returns A Flatpickr plugin to put the calendar dropdown in shadow DOM.
 */
export default (config: DatePickerAppendToPluginConfig): Plugin =>
  (fp: FlatpickrInstance) => {
    const handlePreCalendarPosition = async () => {
      await Promise.resolve();
      const { calendarContainer, config: fpConfig, _positionElement: positionElement } = fp;
      const { appendTo } = fpConfig;
      const { top: containerTop } = appendTo!.getBoundingClientRect();
      const { bottom: refBottom } = positionElement.getBoundingClientRect();
      const isRtl =
        appendTo!.ownerDocument
          .defaultView!.getComputedStyle(appendTo!)
          .getPropertyValue("direction") === "rtl";
      calendarContainer.style.top = `${refBottom - containerTop}px`;
      calendarContainer.style.left = !isRtl ? "0" : "auto";
      calendarContainer.style.right = !isRtl ? "auto" : "0";
    };

    /**
     * Registers this Flatpickr plugin.
     * @param calendar The Flatpickr instance.
     */
    const register = () => {
      fp.loadedPlugins.push("carbonFlatpickrAppendToPlugin");
    };

    return {
      appendTo: config.appendTo,
      onReady: register,
      onPreCalendarPosition: handlePreCalendarPosition
    };
  };
