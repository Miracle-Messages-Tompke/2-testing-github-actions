/* eslint-disable prefer-const */
/* eslint-disable default-param-last */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import selectorParser from "postcss-selector-parser";
import {
  normalize,
  length,
  number,
  percentage,
  url,
  color as validateColor,
  genericName,
  familyName,
  image,
  absoluteSize,
  relativeSize,
  position,
  lineWidth,
  shadow
} from "./data-types.js";
import escapeCommas from "./escape-commas.js";
import negateValue from "./negate-value.js";
import { withAlphaValue } from "./with-alpha-variable.js";

export function updateAllClasses(selectors, updateClass) {
  const parser = selectorParser((selectors) => {
    selectors.walkClasses((sel) => {
      const updatedClass = updateClass(sel.value);
      sel.value = updatedClass;
      if (sel.raws && sel.raws.value) {
        sel.raws.value = escapeCommas(sel.raws.value);
      }
    });
  });

  const result = parser.processSync(selectors);

  return result;
}

function resolveArbitraryValue(modifier, validate) {
  if (!isArbitraryValue(modifier)) {
    return undefined;
  }

  const value = modifier.slice(1, -1);

  if (!validate(value)) {
    return undefined;
  }

  return normalize(value);
}

function asNegativeValue(modifier, lookup = {}, validate) {
  const positiveValue = lookup[modifier];

  if (positiveValue !== undefined) {
    return negateValue(positiveValue);
  }

  if (isArbitraryValue(modifier)) {
    const resolved = resolveArbitraryValue(modifier, validate);

    if (resolved === undefined) {
      return undefined;
    }

    return negateValue(resolved);
  }
}

export function asValue(modifier, options = {}, { validate = () => true } = {}) {
  const value = options.values?.[modifier];

  if (value !== undefined) {
    return value;
  }

  if (options.supportsNegativeValues && modifier.startsWith("-")) {
    return asNegativeValue(modifier.slice(1), options.values, validate);
  }

  return resolveArbitraryValue(modifier, validate);
}

function isArbitraryValue(input) {
  return input.startsWith("[") && input.endsWith("]");
}

function splitAlpha(modifier) {
  const slashIdx = modifier.lastIndexOf("/");

  if (slashIdx === -1 || slashIdx === modifier.length - 1) {
    return [modifier];
  }

  return [modifier.slice(0, slashIdx), modifier.slice(slashIdx + 1)];
}

export function parseColorFormat(value) {
  if (typeof value === "string" && value.includes("<alpha-value>")) {
    const oldValue = value;

    return ({ opacityValue = 1 }) => oldValue.replace("<alpha-value>", opacityValue);
  }

  return value;
}

export function asColor(modifier, options = {}, { aileronConfig = {} } = {}) {
  if (options.values?.[modifier] !== undefined) {
    return parseColorFormat(options.values?.[modifier]);
  }

  const [color, alpha] = splitAlpha(modifier);

  if (alpha !== undefined) {
    let normalizedColor =
      options.values?.[color] ?? (isArbitraryValue(color) ? color.slice(1, -1) : undefined);

    if (normalizedColor === undefined) {
      return undefined;
    }

    normalizedColor = parseColorFormat(normalizedColor);

    if (isArbitraryValue(alpha)) {
      return withAlphaValue(normalizedColor, alpha.slice(1, -1));
    }

    if (aileronConfig.theme?.opacity?.[alpha] === undefined) {
      return undefined;
    }

    return withAlphaValue(normalizedColor, aileronConfig.theme.opacity[alpha]);
  }

  return asValue(modifier, options, { validate: validateColor });
}

export function asLookupValue(modifier, options = {}) {
  return options.values?.[modifier];
}

function guess(validate) {
  return (modifier, options) => {
    return asValue(modifier, options, { validate });
  };
}

const typeMap = {
  any: asValue,
  color: asColor,
  url: guess(url),
  image: guess(image),
  length: guess(length),
  percentage: guess(percentage),
  position: guess(position),
  lookup: asLookupValue,
  "generic-name": guess(genericName),
  "family-name": guess(familyName),
  number: guess(number),
  "line-width": guess(lineWidth),
  "absolute-size": guess(absoluteSize),
  "relative-size": guess(relativeSize),
  shadow: guess(shadow)
};

const supportedTypes = Object.keys(typeMap);

function splitAtFirst(input, delim) {
  const idx = input.indexOf(delim);
  if (idx === -1) return [undefined, input];
  return [input.slice(0, idx), input.slice(idx + 1)];
}

export function coerceValue(types, modifier, options, aileronConfig) {
  if (isArbitraryValue(modifier)) {
    const arbitraryValue = modifier.slice(1, -1);
    let [explicitType, value] = splitAtFirst(arbitraryValue, ":");

    // It could be that this resolves to `url(https` which is not a valid
    // identifier. We currently only support "simple" words with dashes or
    // underscores. E.g.: family-name
    if (!/^[\w-_]+$/g.test(explicitType)) {
      value = arbitraryValue;
    }

    //
    else if (explicitType !== undefined && !supportedTypes.includes(explicitType)) {
      return [];
    }

    if (value.length > 0 && supportedTypes.includes(explicitType)) {
      return [asValue(`[${value}]`, options), explicitType];
    }
  }

  // Find first matching type
  for (const type of [].concat(types)) {
    const result = typeMap[type](modifier, options, { aileronConfig });
    if (result !== undefined) return [result, type];
  }

  return [];
}
