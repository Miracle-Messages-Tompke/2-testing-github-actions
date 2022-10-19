import { ifDefined } from "lit/directives/if-defined.js";

export const ifNonEmpty = (value: string) =>
  ifDefined(value === "" ? undefined : value ?? undefined);
