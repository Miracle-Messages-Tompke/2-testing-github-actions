/* eslint-disable func-style */
/* eslint-disable no-shadow */
import defaultConfig from "../../../stubs/aileron-config.stub.js";
import corePluginList from "../core-plugin-list.js";
import colors from "../public/colors.js";
import { cloneDeep } from "./clone-deep.js";
import configurePlugins from "./configure-plugins.js";
import { defaults } from "./defaults.js";
import isPlainObject from "./is-plain-object.js";
import negateValue from "./negate-value.js";
import { normalizeConfig } from "./normalize-config.js";
import { parseColorFormat } from "./plugin-utils.js";
import toColorValue from "./to-color-value.js";
import { toPath } from "./to-path.js";
import { withAlphaValue } from "./with-alpha-variable.js";

function isFunction(input) {
  return typeof input === "function";
}

function isObject(input) {
  return typeof input === "object" && input !== null;
}

function mergeWith(target, ...sources) {
  const customizer = sources.pop();

  for (const source of sources) {
    for (const k in source) {
      const merged = customizer(target[k], source[k]);

      if (merged === undefined) {
        if (isObject(target[k]) && isObject(source[k])) {
          target[k] = mergeWith(target[k], source[k], customizer);
        } else {
          target[k] = source[k];
        }
      } else {
        target[k] = merged;
      }
    }
  }

  return target;
}

const configUtils = {
  colors,
  negative(scale) {
    // TODO: Log that this function isn't really needed anymore?
    return Object.keys(scale)
      .filter((key) => scale[key] !== "0")
      .reduce((negativeScale, key) => {
        const negativeValue = negateValue(scale[key]);

        if (negativeValue !== undefined) {
          negativeScale[`-${key}`] = negativeValue;
        }

        return negativeScale;
      }, {});
  },
  breakpoints(screens) {
    return Object.keys(screens)
      .filter((key) => typeof screens[key] === "string")
      .reduce(
        (breakpoints, key) => ({
          ...breakpoints,
          [`screen-${key}`]: screens[key]
        }),
        {}
      );
  }
};

function value(valueToResolve, ...args) {
  return isFunction(valueToResolve) ? valueToResolve(...args) : valueToResolve;
}

function collectExtends(items) {
  return items.reduce((merged, { extend }) => {
    return mergeWith(merged, extend, (mergedValue, extendValue) => {
      if (mergedValue === undefined) {
        return [extendValue];
      }

      if (Array.isArray(mergedValue)) {
        return [extendValue, ...mergedValue];
      }

      return [extendValue, mergedValue];
    });
  }, {});
}

function mergeThemes(themes) {
  return {
    ...themes.reduce((merged, theme) => defaults(merged, theme), {}),

    // In order to resolve n config objects, we combine all of their `extend` properties
    // into arrays instead of objects so they aren't overridden.
    extend: collectExtends(themes)
  };
}

function mergeExtensionCustomizer(merged, value) {
  // When we have an array of objects, we do want to merge it
  if (Array.isArray(merged) && isObject(merged[0])) {
    return merged.concat(value);
  }

  // When the incoming value is an array, and the existing config is an object, prepend the existing object
  if (Array.isArray(value) && isObject(value[0]) && isObject(merged)) {
    return [merged, ...value];
  }

  // Override arrays (for example for font-families, box-shadows, ...)
  if (Array.isArray(value)) {
    return value;
  }

  // Execute default behaviour
  return undefined;
}

function mergeExtensions({ extend, ...theme }) {
  return mergeWith(theme, extend, (themeValue, extensions) => {
    // The `extend` property is an array, so we need to check if it contains any functions
    if (!isFunction(themeValue) && !extensions.some(isFunction)) {
      return mergeWith({}, themeValue, ...extensions, mergeExtensionCustomizer);
    }

    return (resolveThemePath, utils) =>
      mergeWith(
        {},
        ...[themeValue, ...extensions].map((e) => value(e, resolveThemePath, utils)),
        mergeExtensionCustomizer
      );
  });
}

/**
 *
 * @param {string} key
 * @return {Iterable<string[] & {alpha: string | undefined}>}
 */
function* toPaths(key) {
  const path = toPath(key);

  if (path.length === 0) {
    return;
  }

  yield path;

  if (Array.isArray(key)) {
    return;
  }

  const pattern = /^(.*?)\s*\/\s*([^/]+)$/;
  const matches = key.match(pattern);

  if (matches !== null) {
    const [, prefix, alpha] = matches;

    const newPath = toPath(prefix);
    newPath.alpha = alpha;

    yield newPath;
  }
}

function resolveFunctionKeys(object) {
  // theme('colors.red.500 / 0.5') -> ['colors', 'red', '500 / 0', '5]

  const resolvePath = (key, defaultValue) => {
    for (const path of toPaths(key)) {
      let index = 0;
      let val = object;

      while (val !== undefined && val !== null && index < path.length) {
        val = val[path[index++]];

        const shouldResolveAsFn =
          isFunction(val) && (path.alpha === undefined || index < path.length - 1);

        val = shouldResolveAsFn ? val(resolvePath, configUtils) : val;
      }

      if (val !== undefined) {
        if (path.alpha !== undefined) {
          const normalized = parseColorFormat(val);

          return withAlphaValue(normalized, path.alpha, toColorValue(normalized));
        }

        if (isPlainObject(val)) {
          return cloneDeep(val);
        }

        return val;
      }
    }

    return defaultValue;
  };

  Object.assign(resolvePath, {
    theme: resolvePath,
    ...configUtils
  });

  return Object.keys(object).reduce((resolved, key) => {
    resolved[key] = isFunction(object[key]) ? object[key](resolvePath, configUtils) : object[key];

    return resolved;
  }, {});
}

function extractPluginConfigs(configs) {
  let allConfigs = [];

  configs.forEach((config) => {
    allConfigs = [...allConfigs, config];

    const plugins = config?.plugins ?? [];

    if (plugins.length === 0) {
      return;
    }

    plugins.forEach((plugin) => {
      if (plugin.__isOptionsFunction) {
        plugin = plugin();
      }
      allConfigs = [...allConfigs, ...extractPluginConfigs([plugin?.config ?? {}])];
    });
  });

  return allConfigs;
}

function resolveCorePlugins(corePluginConfigs) {
  const result = [...corePluginConfigs].reduceRight((resolved, corePluginConfig) => {
    if (isFunction(corePluginConfig)) {
      return corePluginConfig({ corePlugins: resolved });
    }
    return configurePlugins(corePluginConfig, resolved);
  }, corePluginList);

  return result;
}

function resolvePluginLists(pluginLists) {
  const result = [...pluginLists].reduceRight((resolved, pluginList) => {
    return [...resolved, ...pluginList];
  }, []);

  return result;
}

export default function resolveConfig(configs) {
  const allConfigs = [
    ...extractPluginConfigs(configs),
    {
      prefix: "",
      important: false,
      separator: ":",
      variantOrder: defaultConfig.variantOrder
    }
  ];

  return normalizeConfig(
    defaults(
      {
        theme: resolveFunctionKeys(
          mergeExtensions(mergeThemes(allConfigs.map((t) => t?.theme ?? {})))
        ),
        corePlugins: resolveCorePlugins(allConfigs.map((c) => c.corePlugins)),
        plugins: resolvePluginLists(configs.map((c) => c?.plugins ?? []))
      },
      ...allConfigs
    )
  );
}
