import namedColors from "color-name";

const HEX = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
const SHORT_HEX = /^#([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
const VALUE = /(?:\d+|\d*\.\d+)%?/;
const SEP = /(?:\s*,\s*|\s+)/;
const ALPHA_SEP = /\s*[,/]\s*/;
const CUSTOM_PROPERTY = /var\(--(?:[^ )]*?)\)/;

const RGB = new RegExp(
  `^(rgb)a?\\(\\s*(${VALUE.source}|${CUSTOM_PROPERTY.source})(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${ALPHA_SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?\\s*\\)$`
);
const HSL = new RegExp(
  `^(hsl)a?\\(\\s*((?:${VALUE.source})(?:deg|rad|grad|turn)?|${CUSTOM_PROPERTY.source})(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${ALPHA_SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?\\s*\\)$`
);

// In "loose" mode the color may contain fewer than 3 parts, as long as at least
// one of the parts is variable.
export function parseColor(value, { loose = false } = {}) {
  if (typeof value !== "string") {
    return null;
  }

  value = value.trim();
  if (value === "transparent") {
    return { mode: "rgb", color: ["0", "0", "0"], alpha: "0" };
  }

  if (value in namedColors) {
    return { mode: "rgb", color: namedColors[value].map((v) => v.toString()) };
  }

  const hex = value
    .replace(SHORT_HEX, (_, r, g, b, a) => ["#", r, r, g, g, b, b, a ? a + a : ""].join(""))
    .match(HEX);

  if (hex !== null) {
    return {
      mode: "rgb",
      color: [parseInt(hex[1], 16), parseInt(hex[2], 16), parseInt(hex[3], 16)].map((v) =>
        v.toString()
      ),
      alpha: hex[4] ? (parseInt(hex[4], 16) / 255).toString() : undefined
    };
  }

  const match = value.match(RGB) ?? value.match(HSL);

  if (match === null) {
    return null;
  }

  const color = [match[2], match[3], match[4]].filter(Boolean).map((v) => v.toString());

  if (!loose && color.length !== 3) {
    return null;
  }

  if (color.length < 3 && !color.some((part) => /^var\(.*?\)$/.test(part))) {
    return null;
  }

  return {
    mode: match[1],
    color,
    alpha: match[5]?.toString?.()
  };
}

export function formatColor({ mode, color, alpha }) {
  const hasAlpha = alpha !== undefined;
  return `${mode}(${color.join(" ")}${hasAlpha ? ` / ${alpha}` : ""})`;
}
