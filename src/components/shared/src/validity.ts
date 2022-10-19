/* eslint-disable no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument */
import type { Constructor } from "./helpers";

export enum ValidationStatus {
  NoError = "",
  ErrorRequired = "required"
}

// eslint-disable-next-line func-style, @typescript-eslint/explicit-module-boundary-types
export const ValidityMixin = <T extends Constructor<HTMLElement>>(base: T) => {
  abstract class ValidityMixinImpl extends base {
    getValidityMessage(state: string): any {
      return {
        [ValidationStatus.NoError]: "",
        [ValidationStatus.ErrorRequired]: this.requiredValidityMessage
      }[state];
    }

    testValidity(): string {
      const { required, value } = this;
      return required && !value ? ValidationStatus.ErrorRequired : ValidationStatus.NoError;
    }

    abstract invalid: boolean;
    abstract required: boolean;
    abstract requiredValidityMessage: string;
    abstract validityMessage: string;
    abstract value: string;

    checkValidity() {
      const status = this.testValidity();
      if (status !== ValidationStatus.NoError) {
        if (
          this.dispatchEvent(
            new CustomEvent("invalid", {
              bubbles: false,
              cancelable: true,
              composed: false
            })
          )
        ) {
          this.invalid = true;
          this.validityMessage = this.getValidityMessage(status);
        }
        return false;
      }
      this.invalid = false;
      this.validityMessage = "";
      return true;
    }

    setCustomValidity(validityMessage: string) {
      this.invalid = !!validityMessage;
      this.validityMessage = validityMessage;
    }
  }

  return ValidityMixinImpl;
};
