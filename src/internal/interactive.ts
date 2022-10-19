import { lightThemeTokens } from "@adc/styles/dist/styles.js";
import type { ReactiveController, ReactiveControllerHost } from "lit";

export class InteractiveController implements ReactiveController {
  host?: ReactiveControllerHost & Element;

  hoverCssVariable = "--color-light-mode-interactive-hover-hover-on-container";
  pressedCssVariable = "--color-light-mode-interactive-pressed-pressed-on-container";

  hoverOnDefaultContainer: string =
    lightThemeTokens.colorLightModeInteractiveHoverHoverOnContainerDefault;
  pressedOnDefaultContainer: string =
    lightThemeTokens.colorLightModeInteractivePressedPressedOnContainerDefault;
  hoverOnSecondaryContainer: string =
    lightThemeTokens.colorLightModeInteractiveHoverHoverOnContainerSecondary;
  pressedOnSecondaryContainer: string =
    lightThemeTokens.colorLightModeInteractivePressedPressedOnContainerSecondary;
  hoverOnTertiaryContainer: string =
    lightThemeTokens.colorLightModeInteractiveHoverHoverOnContainerTertiary;
  pressedOnTertiaryContainer: string =
    lightThemeTokens.colorLightModeInteractivePressedPressedOnContainerTertiary;

  informationOnContainerDefault: string =
    lightThemeTokens.colorLightModeBackgroundContainerStatusInformationOnContainerDefault;
  informationOnContainerSecondary: string =
    lightThemeTokens.colorLightModeBackgroundContainerStatusInformationOnContainerSecondary;
  informationOnContainerTertiary: string =
    lightThemeTokens.colorLightModeBackgroundContainerStatusInformationOnContainerTertiary;

  successOnContainerDefault: string =
    lightThemeTokens.colorLightModeBackgroundContainerStatusSuccessOnContainerDefault;
  successOnContainerSecondary: string =
    lightThemeTokens.colorLightModeBackgroundContainerStatusSuccessOnContainerSecondary;
  successOnContainerTertiary: string =
    lightThemeTokens.colorLightModeBackgroundContainerStatusSuccessOnContainerTertiary;

  warningOnContainerDefault: string =
    lightThemeTokens.colorLightModeBackgroundContainerStatusWarningOnContainerDefault;
  warningOnContainerSecondary: string =
    lightThemeTokens.colorLightModeBackgroundContainerStatusWarningOnContainerSecondary;
  warningOnContainerTertiary: string =
    lightThemeTokens.colorLightModeBackgroundContainerStatusWarningOnContainerTertiary;

  errorOnContainerDefault: string =
    lightThemeTokens.colorLightModeBackgroundContainerStatusErrorOnContainerDefault;
  errorOnContainerSecondary: string =
    lightThemeTokens.colorLightModeBackgroundContainerStatusErrorOnContainerSecondary;
  errorOnContainerTertiary: string =
    lightThemeTokens.colorLightModeBackgroundContainerStatusErrorOnContainerTertiary;

  constructor(host: ReactiveControllerHost & Element) {
    (this.host = host).addController(this);
  }

  getBackgroundStylingForContainer(kind: string, containerType: string) {
    let styling;
    const kinds = {
      information: function () {
        let containerSpecificStyling;
        const containers = {
          default: function () {
            containerSpecificStyling =
              lightThemeTokens.colorLightModeBackgroundContainerStatusInformationOnContainerDefault;
          },
          secondary: function () {
            containerSpecificStyling =
              lightThemeTokens.colorLightModeBackgroundContainerStatusInformationOnContainerSecondary;
          },
          tertiary: function () {
            containerSpecificStyling =
              lightThemeTokens.colorLightModeBackgroundContainerStatusInformationOnContainerTertiary;
          }
        };
        containers[containerType]();
        styling = containerSpecificStyling;
      },
      success: function () {
        let containerSpecificStyling;
        const containers = {
          default: function () {
            containerSpecificStyling =
              lightThemeTokens.colorLightModeBackgroundContainerStatusSuccessOnContainerDefault;
          },
          secondary: function () {
            containerSpecificStyling =
              lightThemeTokens.colorLightModeBackgroundContainerStatusSuccessOnContainerSecondary;
          },
          tertiary: function () {
            containerSpecificStyling =
              lightThemeTokens.colorLightModeBackgroundContainerStatusSuccessOnContainerTertiary;
          }
        };
        containers[containerType]();
        styling = containerSpecificStyling;
      },
      warning: function () {
        let containerSpecificStyling;
        const containers = {
          default: function () {
            containerSpecificStyling =
              lightThemeTokens.colorLightModeBackgroundContainerStatusWarningOnContainerDefault;
          },
          secondary: function () {
            containerSpecificStyling =
              lightThemeTokens.colorLightModeBackgroundContainerStatusWarningOnContainerSecondary;
          },
          tertiary: function () {
            containerSpecificStyling =
              lightThemeTokens.colorLightModeBackgroundContainerStatusWarningOnContainerTertiary;
          }
        };
        containers[containerType]();
        styling = containerSpecificStyling;
      },
      error: function () {
        let containerSpecificStyling;
        const containers = {
          default: function () {
            containerSpecificStyling =
              lightThemeTokens.colorLightModeBackgroundContainerStatusErrorOnContainerDefault;
          },
          secondary: function () {
            containerSpecificStyling =
              lightThemeTokens.colorLightModeBackgroundContainerStatusErrorOnContainerSecondary;
          },
          tertiary: function () {
            containerSpecificStyling =
              lightThemeTokens.colorLightModeBackgroundContainerStatusErrorOnContainerTertiary;
          }
        };
        containers[containerType]();
        styling = containerSpecificStyling;
      }
    };

    kinds[kind]();

    return styling;
  }

  async addStyleByContainer() {
    this.host!.updateComplete.then(async () => {
      if (this.closestElement(".container-default", this.host!)) {
        if (this.host!.shadowRoot?.querySelector("[part=interactive]")) {
          this.host!.shadowRoot?.querySelector("[part*=interactive]")!.setAttribute(
            "style",
            `${this.hoverCssVariable}: ${this.hoverOnDefaultContainer}; ${this.pressedCssVariable}: ${this.pressedOnDefaultContainer};`
          );
        }

        if (
          this.host!.getAttribute("part") === "inline" &&
          this.host!.getAttribute("variant") !== "ghost"
        ) {
          const hostStyling: string = await this.getBackgroundStylingForContainer(
            this.host!.getAttribute("kind")!,
            "default"
          );
          this.host!.setAttribute("style", `background: ${hostStyling}`);
        }
      }

      if (this.closestElement(".container-secondary", this.host!)) {
        if (this.host!.shadowRoot?.querySelector("[part=interactive]")) {
          this.host!.shadowRoot?.querySelector("[part*=interactive]")!.setAttribute(
            "style",
            `${this.hoverCssVariable}: ${this.hoverOnSecondaryContainer}; ${this.pressedCssVariable}: ${this.pressedOnSecondaryContainer};`
          );
        }

        if (
          this.host!.getAttribute("part") === "inline" &&
          this.host!.getAttribute("variant") !== "ghost"
        ) {
          const hostStyling: string = await this.getBackgroundStylingForContainer(
            this.host!.getAttribute("kind")!,
            "secondary"
          );
          this.host!.setAttribute("style", `background: ${hostStyling}`);
        }
      }

        if (
          this.host!.getAttribute("part") === "inline" &&
          this.host!.getAttribute("variant") !== "ghost"
        ) {
          const hostStyling: string = await this.getBackgroundStylingForContainer(
            this.host!.getAttribute("kind")!,
            "secondary"
          );
          this.host!.setAttribute("style", `background: ${hostStyling}`);
        }
      })

      if (this.closestElement(".container-tertiary", this.host!)) {
        if (this.host!.shadowRoot?.querySelector("[part=interactive]")) {
          this.host!.shadowRoot?.querySelector("[part*=interactive]")!.setAttribute(
            "style",
            `${this.hoverCssVariable}: ${this.hoverOnTertiaryContainer}; ${this.pressedCssVariable}: ${this.pressedOnTertiaryContainer};`
          );
        }

        if (
          this.host!.getAttribute("part") === "inline" &&
          this.host!.getAttribute("variant") !== "ghost"
        ) {
          const hostStyling: string = await this.getBackgroundStylingForContainer(
            this.host!.getAttribute("kind")!,
            "tertiary"
          );
          this.host!.setAttribute("style", `background: ${hostStyling}`);
        }
      }
      }

  hostUpdated() {
    this.addStyleByContainer();
  }

  hostConnected() {
    this.addStyleByContainer();
  }

  hostDisconnected() {
    if (this.host!.shadowRoot?.querySelector("[part=interactive]")) {
      this.host!.shadowRoot?.querySelector("[part*=interactive]")!.removeAttribute("style");
    }
    if (
      this.host!.getAttribute("part") === "inline" &&
      this.host!.getAttribute("variant") !== "ghost"
    ) {
      this.host!.removeAttribute("style");
    }
  }

  closestElement(selector: string, baseElement: Element) {
    function closestFrom(el: Element | Window | Document): Element | null {
      if (!el || el === document || el === window) {
        return null;
      }

      if ((el as Slottable).assignedSlot) {
        (el as any) = (el as Slottable).assignedSlot;
      }

      const found = (el as Element).closest(selector);
      return found ? found : closestFrom(((el as Element).getRootNode() as ShadowRoot).host);
    }
    return closestFrom(baseElement) as HTMLFormElement | null;
  }
}
