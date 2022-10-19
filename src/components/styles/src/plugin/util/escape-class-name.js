import parser from "postcss-selector-parser";
import escapeCommas from "./escape-commas.js";

export default function escapeClassName(className) {
  const node = parser.className();
  node.value = className;
  return escapeCommas(node?.raws?.value ?? node.value);
}
