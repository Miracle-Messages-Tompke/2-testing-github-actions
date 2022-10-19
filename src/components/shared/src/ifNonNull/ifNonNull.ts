import { ifDefined } from "lit/directives/if-defined.js";

export const ifNonNull = (value: any) => ifDefined(value ?? undefined);
