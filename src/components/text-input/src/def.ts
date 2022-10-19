/* eslint-disable no-unused-vars */
export type TextInputNativeInputElement = Pick<
  HTMLInputElement,
  "disabled" | "maxLength" | "minLength" | "type" | "value" | "required"
> & {
  validity: Pick<ValidityState, "badInput" | "valid">;
};

export enum INPUT_TYPE {
  EMAIL = "email",
  PASSWORD = "password",
  TEL = "tel",
  TEXT = "text",
  URL = "url"
}
