import type { CHECKBOX_LABEL_POSITION } from "@aileron/checkbox";
import type {
  RADIO_BUTTON_LABEL_POSITION,
  RADIO_BUTTON_ORIENTATION
} from "@aileron/radio-button";

export enum INPUT_COMPONENT {
  TEXT = "adc-text-input",
  RADIO = "adc-radio-group",
  CHECKBOX = "adc-checkbox",
  BUTTON = "adc-button",
  SELECT = "adc-select",
  DIVIDER = "adc-divider"
}

export interface FormElement {
  component: FormKind;
  id?: string;
  autofocus?: boolean;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  name: string;
  ["label-text"]: string;
  showOnLoad?: boolean;
  value?: string | unknown;
}

export interface DividerElement {
  component: FormKind;
  id?: string;
  dashed?: boolean;
  showOnLoad?: boolean;
  value?: string;
}

export interface SelectValues {
  ["label-text"]: string;
  value: string | SelectValues[];
  selected?: boolean;
  disabled?: boolean;
}

export interface SelectElement extends FormElement {
  value: SelectValues[];
  ["default-value"]?: string;
  ["helper-text"]?: string;
  placeholder?: string;
  readonly?: boolean;
  ["validity-message"]?: string;
  ["required-validity-message"]?: string;
  autocomplete?: string;
}

export interface CheckboxElement extends FormElement {
  checked?: boolean;
  ["label-position"]?: CHECKBOX_LABEL_POSITION;
}

export interface ButtonElement {
  component: FormKind;
  size?: "field" | "fullwidth" | "field fullwidth" | "";
  kind?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  showOnLoad?: boolean;
}

export interface TextInputElement extends FormElement {
  pattern?: RegExp;
  placeholder?: string;
  readonly?: boolean;
  min?: number;
  max?: number;
  ["min-length"]?: number;
  ["max-length"]?: number;
  ["validity-message"]?: string;
  ["required-validity-message"]?: string;
  autocomplete?: string;
}

export interface RadioButtonValues {
  value: string;
  invalid?: boolean;
  required?: boolean;
  ["label-text"]: string;
  ["label-position"]?: RADIO_BUTTON_LABEL_POSITION;
  orientation?: RADIO_BUTTON_ORIENTATION;
  disabled?: boolean;
  checked?: boolean;
}

export interface RadioButtonElement extends FormElement {
  value: RadioButtonValues[];
  ["default-value"]?: string;
  ["label-position"]?: RADIO_BUTTON_LABEL_POSITION;
  orientation?: RADIO_BUTTON_ORIENTATION;
  invalid?: boolean;
  required?: boolean;
}

export type FormKind = "button" | "text" | "radio" | "checkbox" | "select" | "divider";

export type Row = (
  | CheckboxElement
  | TextInputElement
  | RadioButtonElement
  | SelectElement
  | ButtonElement
  | DividerElement
)[];
export type FormConfig = Row[];
