/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
/* eslint-disable no-bitwise */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-shadow */
import fs from "fs";
import url from "url";
import dlv from "dlv";
import postcss from "postcss";
import selectorParser from "postcss-selector-parser";
import { variantPlugins, corePlugins } from "../core-plugins.js";
import { flagEnabled } from "../feature-flags.js";
import bigSign from "../util/big-sign.js";
import escapeClassName from "../util/escape-class-name.js";
import isPlainObject from "../util/is-plain-object.js";
import isValidArbitraryValue from "../util/is-valid-arbitrary-value.js";
import log from "../util/log.js";
import nameClass, { formatClass } from "../util/name-class.js";
import negateValue from "../util/negate-value.js";
import parseObjectStyles from "../util/parse-object-styles.js";
import { coerceValue } from "../util/plugin-utils.js";
import prefixSelector from "../util/prefix-selector.js";
import { toPath } from "../util/to-path.js";
import transformThemeValue from "../util/transform-theme-value.js";
import { hasContentChanged } from "./cache-invalidation.js";
import { generateRules } from "./generate-rules.js";
import { env } from "./shared-state.js";
import * as sharedState from "./shared-state.js";

const MATCH_VARIANT = Symbol();

function prefix(context, selector) {
  const prefix = context.aileronConfig.prefix;
  return typeof prefix === "function" ? prefix(selector) : prefix + selector;
}

function parseVariantFormatString(input) {
  if (input.includes("{")) {
    if (!isBalanced(input)) throw new Error(`Your { and } are unbalanced.`);

    return input
      .split(/{(.*)}/gim)
      .flatMap((line) => parseVariantFormatString(line))
      .filter(Boolean);
  }

  return [input.trim()];
}

function isBalanced(input) {
  let count = 0;

  for (const char of input) {
    if (char === "{") {
      count++;
    } else if (char === "}") {
      if (--count < 0) {
        return false; // unbalanced
      }
    }
  }

  return count === 0;
}

function insertInto(list, value, { before = [] } = {}) {
  before = [].concat(before);

  if (before.length <= 0) {
    list.push(value);
    return;
  }

  let idx = list.length - 1;
  for (const other of before) {
    const iidx = list.indexOf(other);
    if (iidx === -1) continue;
    idx = Math.min(idx, iidx);
  }

  list.splice(idx, 0, value);
}

function parseStyles(styles) {
  if (!Array.isArray(styles)) {
    return parseStyles([styles]);
  }

  return styles.flatMap((style) => {
    const isNode = !Array.isArray(style) && !isPlainObject(style);
    return isNode ? style : parseObjectStyles(style);
  });
}

function getClasses(selector, mutate) {
  const parser = selectorParser((selectors) => {
    const allClasses = [];

    if (mutate) {
      mutate(selectors);
    }

    selectors.walkClasses((classNode) => {
      allClasses.push(classNode.value);
    });

    return allClasses;
  });
  return parser.transformSync(selector);
}

function extractCandidates(node, state = { containsNonOnDemandable: false }, depth = 0) {
  const classes = [];

  // Handle normal rules
  if (node.type === "rule") {
    // Ignore everything inside a :not(...). This allows you to write code like
    // `div:not(.foo)`. If `.foo` is never found in your code, then we used to
    // not generated it. But now we will ignore everything inside a `:not`, so
    // that it still gets generated.
    function ignoreNot(selectors) {
      selectors.walkPseudos((pseudo) => {
        if (pseudo.value === ":not") {
          pseudo.remove();
        }
      });
    }

    for (const selector of node.selectors) {
      const classCandidates = getClasses(selector, ignoreNot);
      // At least one of the selectors contains non-"on-demandable" candidates.
      if (classCandidates.length === 0) {
        state.containsNonOnDemandable = true;
      }

      for (const classCandidate of classCandidates) {
        classes.push(classCandidate);
      }
    }
  }

  // Handle at-rules (which contains nested rules)
  else if (node.type === "atrule") {
    node.walkRules((rule) => {
      for (const classCandidate of rule.selectors.flatMap((selector) => getClasses(selector))) {
        classes.push(classCandidate);
      }
    });
  }

  if (depth === 0) {
    return [state.containsNonOnDemandable || classes.length === 0, classes];
  }

  return classes;
}

function withIdentifiers(styles) {
  return parseStyles(styles).flatMap((node) => {
    const nodeMap = new Map();
    const [containsNonOnDemandableSelectors, candidates] = extractCandidates(node);

    // If this isn't "on-demandable", assign it a universal candidate to always include it.
    if (containsNonOnDemandableSelectors) {
      candidates.unshift(sharedState.NOT_ON_DEMAND);
    }

    // However, it could be that it also contains "on-demandable" candidates.
    // E.g.: `span, .foo {}`, in that case it should still be possible to use
    // `@apply foo` for example.
    return candidates.map((c) => {
      if (!nodeMap.has(node)) {
        nodeMap.set(node, node);
      }
      return [c, nodeMap.get(node)];
    });
  });
}

export function isValidVariantFormatString(format) {
  return format.startsWith("@") || format.includes("&");
}

export function parseVariant(variant) {
  variant = variant
    .replace(/\n+/g, "")
    .replace(/\s{1,}/g, " ")
    .trim();

  const fns = parseVariantFormatString(variant)
    .map((str) => {
      if (!str.startsWith("@")) {
        return ({ format }) => format(str);
      }

      const [, name, params] = /@(.*?)( .+|[({].*)/g.exec(str);
      return ({ wrap }) => wrap(postcss.atRule({ name, params: params.trim() }));
    })
    .reverse();

  return (api) => {
    for (const fn of fns) {
      fn(api);
    }
  };
}

function buildPluginApi(aileronConfig, context, { variantList, variantMap, offsets, classList }) {
  function getConfigValue(path, defaultValue) {
    return path ? dlv(aileronConfig, path, defaultValue) : aileronConfig;
  }

  function applyConfiguredPrefix(selector) {
    return prefixSelector(aileronConfig.prefix, selector);
  }

  function prefixIdentifier(identifier, options) {
    if (identifier === sharedState.NOT_ON_DEMAND) {
      return sharedState.NOT_ON_DEMAND;
    }

    if (!options.respectPrefix) {
      return identifier;
    }

    return context.aileronConfig.prefix + identifier;
  }

  function resolveThemeValue(path, defaultValue, opts = {}) {
    const [pathRoot, ...subPaths] = toPath(path);
    const value = getConfigValue(["theme", pathRoot, ...subPaths], defaultValue);
    return transformThemeValue(pathRoot)(value, opts);
  }

  const theme = Object.assign(
    (path, defaultValue = undefined) => resolveThemeValue(path, defaultValue),
    {
      withAlpha: (path, opacityValue) => resolveThemeValue(path, undefined, { opacityValue })
    }
  );

  const api = {
    postcss,
    prefix: applyConfiguredPrefix,
    e: escapeClassName,
    config: getConfigValue,
    theme,
    corePlugins: (path) => {
      if (Array.isArray(aileronConfig.corePlugins)) {
        return aileronConfig.corePlugins.includes(path);
      }

      return getConfigValue(["corePlugins", path], true);
    },
    variants: () => {
      // Preserved for backwards compatibility but not used in v3.0+
      return [];
    },
    addBase(base) {
      for (const [identifier, rule] of withIdentifiers(base)) {
        const prefixedIdentifier = prefixIdentifier(identifier, {});
        const offset = offsets.base++;

        if (!context.candidateRuleMap.has(prefixedIdentifier)) {
          context.candidateRuleMap.set(prefixedIdentifier, []);
        }

        context.candidateRuleMap
          .get(prefixedIdentifier)
          .push([{ sort: offset, layer: "base" }, rule]);
      }
    },
    /**
     * @param {string} group
     * @param {Record<string, string | string[]>} declarations
     */
    addDefaults(group, declarations) {
      const groups = {
        [`@defaults ${group}`]: declarations
      };

      for (const [identifier, rule] of withIdentifiers(groups)) {
        const prefixedIdentifier = prefixIdentifier(identifier, {});

        if (!context.candidateRuleMap.has(prefixedIdentifier)) {
          context.candidateRuleMap.set(prefixedIdentifier, []);
        }

        context.candidateRuleMap
          .get(prefixedIdentifier)
          .push([{ sort: offsets.base++, layer: "defaults" }, rule]);
      }
    },
    addComponents(components, options) {
      const defaultOptions = {
        preserveSource: false,
        respectPrefix: true,
        respectImportant: false
      };

      options = { ...defaultOptions, ...(Array.isArray(options) ? {} : options)};

      for (const [identifier, rule] of withIdentifiers(components)) {
        const prefixedIdentifier = prefixIdentifier(identifier, options);

        classList.add(prefixedIdentifier);

        if (!context.candidateRuleMap.has(prefixedIdentifier)) {
          context.candidateRuleMap.set(prefixedIdentifier, []);
        }

        context.candidateRuleMap
          .get(prefixedIdentifier)
          .push([{ sort: offsets.components++, layer: "components", options }, rule]);
      }
    },
    addUtilities(utilities, options) {
      const defaultOptions = {
        preserveSource: false,
        respectPrefix: true,
        respectImportant: true
      };

      options = { ...defaultOptions, ...(Array.isArray(options) ? {} : options)};

      for (const [identifier, rule] of withIdentifiers(utilities)) {
        const prefixedIdentifier = prefixIdentifier(identifier, options);

        classList.add(prefixedIdentifier);

        if (!context.candidateRuleMap.has(prefixedIdentifier)) {
          context.candidateRuleMap.set(prefixedIdentifier, []);
        }

        context.candidateRuleMap
          .get(prefixedIdentifier)
          .push([{ sort: offsets.utilities++, layer: "utilities", options }, rule]);
      }
    },
    matchUtilities: function (utilities, options) {
      const defaultOptions = {
        respectPrefix: true,
        respectImportant: true
      };

      options = { ...defaultOptions, ...options };

      const offset = offsets.utilities++;

      for (const identifier in utilities) {
        const prefixedIdentifier = prefixIdentifier(identifier, options);
        const rule = utilities[identifier];

        classList.add([prefixedIdentifier, options]);

        function wrapped(modifier, { isOnlyPlugin }) {
          let { type = "any" } = options;
          type = [].concat(type);
          const [value, coercedType] = coerceValue(type, modifier, options, aileronConfig);

          if (value === undefined) {
            return [];
          }

          if (!type.includes(coercedType) && !isOnlyPlugin) {
            return [];
          }

          if (!isValidArbitraryValue(value)) {
            return [];
          }

          const ruleSets = []
            .concat(rule(value))
            .filter(Boolean)
            .map((declaration) => ({
              [nameClass(identifier, modifier)]: declaration
            }));

          return ruleSets;
        }

        const withOffsets = [{ sort: offset, layer: "utilities", options }, wrapped];

        if (!context.candidateRuleMap.has(prefixedIdentifier)) {
          context.candidateRuleMap.set(prefixedIdentifier, []);
        }

        context.candidateRuleMap.get(prefixedIdentifier).push(withOffsets);
      }
    },
    matchComponents: function (components, options) {
      const defaultOptions = {
        respectPrefix: true,
        respectImportant: false
      };

      options = { ...defaultOptions, ...options };

      const offset = offsets.components++;

      for (const identifier in components) {
        const prefixedIdentifier = prefixIdentifier(identifier, options);
        const rule = components[identifier];

        classList.add([prefixedIdentifier, options]);

        function wrapped(modifier, { isOnlyPlugin }) {
          let { type = "any" } = options;
          type = [].concat(type);
          const [value, coercedType] = coerceValue(type, modifier, options, aileronConfig);

          if (value === undefined) {
            return [];
          }

          if (!type.includes(coercedType)) {
            if (isOnlyPlugin) {
              log.warn([
                `Unnecessary typehint \`${coercedType}\` in \`${identifier}-${modifier}\`.`,
                `You can safely update it to \`${identifier}-${modifier.replace(
                  `${coercedType  }:`,
                  ""
                )}\`.`
              ]);
            } else {
              return [];
            }
          }

          if (!isValidArbitraryValue(value)) {
            return [];
          }

          const ruleSets = []
            .concat(rule(value))
            .filter(Boolean)
            .map((declaration) => ({
              [nameClass(identifier, modifier)]: declaration
            }));

          return ruleSets;
        }

        const withOffsets = [{ sort: offset, layer: "components", options }, wrapped];

        if (!context.candidateRuleMap.has(prefixedIdentifier)) {
          context.candidateRuleMap.set(prefixedIdentifier, []);
        }

        context.candidateRuleMap.get(prefixedIdentifier).push(withOffsets);
      }
    },
    addVariant(variantName, variantFunctions, options = {}) {
      variantFunctions = [].concat(variantFunctions).map((variantFunction) => {
        if (typeof variantFunction !== "string") {
          // Safelist public API functions
          return (api) => {
            const { args, modifySelectors, container, separator, wrap, format } = api;
            const result = variantFunction(
              {
                modifySelectors, container, separator,
                ...variantFunction[MATCH_VARIANT] && { args, wrap, format }
              }
            );

            if (typeof result === "string" && !isValidVariantFormatString(result)) {
              throw new Error(
                `Your custom variant \`${variantName}\` has an invalid format string. Make sure it's an at-rule or contains a \`&\` placeholder.`
              );
            }

            if (Array.isArray(result)) {
              return result
                .filter((variant) => typeof variant === "string")
                .map((variant) => parseVariant(variant));
            }

            // result may be undefined with legacy variants that use APIs like `modifySelectors`
            // result may also be a postcss node if someone was returning the result from `modifySelectors`
            return result && typeof result === "string" && parseVariant(result)(api);
          };
        }

        if (!isValidVariantFormatString(variantFunction)) {
          throw new Error(
            `Your custom variant \`${variantName}\` has an invalid format string. Make sure it's an at-rule or contains a \`&\` placeholder.`
          );
        }

        return parseVariant(variantFunction);
      });

      insertInto(variantList, variantName, options);
      variantMap.set(variantName, variantFunctions);
    }
  };

  if (flagEnabled(aileronConfig, "matchVariant")) {
    api.matchVariant = function (variants, options) {
      for (const variant in variants) {
        for (const [k, v] of Object.entries(options?.values ?? {})) {
          api.addVariant(`${variant}-${k}`, variants[variant](v));
        }

        api.addVariant(
          variant,
          Object.assign(({ args }) => variants[variant](args), { [MATCH_VARIANT]: true }),
          options
        );
      }
    };
  }

  return api;
}

const fileModifiedMapCache = new WeakMap();
export function getFileModifiedMap(context) {
  if (!fileModifiedMapCache.has(context)) {
    fileModifiedMapCache.set(context, new Map());
  }
  return fileModifiedMapCache.get(context);
}

function trackModified(files, fileModifiedMap) {
  let changed = false;

  for (const file of files) {
    if (!file) continue;

    const parsed = url.parse(file);
    let pathname = parsed.hash ? parsed.href.replace(parsed.hash, "") : parsed.href;
    pathname = parsed.search ? pathname.replace(parsed.search, "") : pathname;
    const newModified = fs.statSync(decodeURIComponent(pathname), { throwIfNoEntry: false })?.mtimeMs;
    if (!newModified) {
      // It could happen that a file is passed in that doesn't exist. E.g.:
      // postcss-cli will provide you a fake path when reading from stdin. This
      // path then looks like /path-to-your-project/stdin In that case we just
      // want to ignore it and don't track changes at all.
      continue;
    }

    if (!fileModifiedMap.has(file) || newModified > fileModifiedMap.get(file)) {
      changed = true;
    }

    fileModifiedMap.set(file, newModified);
  }

  return changed;
}

function extractVariantAtRules(node) {
  node.walkAtRules((atRule) => {
    if (["responsive", "variants"].includes(atRule.name)) {
      extractVariantAtRules(atRule);
      atRule.before(atRule.nodes);
      atRule.remove();
    }
  });
}

function collectLayerPlugins(root) {
  const layerPlugins = [];

  root.each((node) => {
    if (node.type === "atrule" && ["responsive", "variants"].includes(node.name)) {
      node.name = "layer";
      node.params = "utilities";
    }
  });

  // Walk @layer rules and treat them like plugins
  root.walkAtRules("layer", (layerRule) => {
    extractVariantAtRules(layerRule);

    if (layerRule.params === "base") {
      for (const node of layerRule.nodes) {
        layerPlugins.push(({ addBase }) => {
          addBase(node, { respectPrefix: false });
        });
      }
      layerRule.remove();
    } else if (layerRule.params === "components") {
      for (const node of layerRule.nodes) {
        layerPlugins.push(({ addComponents }) => {
          addComponents(node, { respectPrefix: false, preserveSource: true });
        });
      }
      layerRule.remove();
    } else if (layerRule.params === "utilities") {
      for (const node of layerRule.nodes) {
        layerPlugins.push(({ addUtilities }) => {
          addUtilities(node, { respectPrefix: false, preserveSource: true });
        });
      }
      layerRule.remove();
    }
  });

  return layerPlugins;
}

function resolvePlugins(context, root) {
  const corePluginList = Object.entries({ ...variantPlugins, ...corePlugins })
    .map(([name, plugin]) => {
      if (!context.aileronConfig.corePlugins.includes(name)) {
        return null;
      }

      return plugin;
    })
    .filter(Boolean);

  const userPlugins = context.aileronConfig.plugins.map((plugin) => {
    if (plugin.__isOptionsFunction) {
      plugin = plugin();
    }

    return typeof plugin === "function" ? plugin : plugin.handler;
  });

  const layerPlugins = collectLayerPlugins(root);

  // TODO: This is a workaround for backwards compatibility, since custom variants
  // were historically sorted before screen/stackable variants.
  const beforeVariants = [
    variantPlugins["pseudoElementVariants"],
    variantPlugins["pseudoClassVariants"]
  ];
  const afterVariants = [
    variantPlugins["directionVariants"],
    variantPlugins["reducedMotionVariants"],
    variantPlugins["prefersContrastVariants"],
    variantPlugins["darkVariants"],
    variantPlugins["printVariant"],
    variantPlugins["screenVariants"],
    variantPlugins["orientationVariants"]
  ];

  return [...corePluginList, ...beforeVariants, ...userPlugins, ...afterVariants, ...layerPlugins];
}

function registerPlugins(plugins, context) {
  const variantList = [];
  const variantMap = new Map();
  const offsets = {
    defaults: 0n,
    base: 0n,
    components: 0n,
    utilities: 0n,
    user: 0n
  };

  const classList = new Set();

  const pluginApi = buildPluginApi(context.aileronConfig, context, {
    variantList,
    variantMap,
    offsets,
    classList
  });

  for (const plugin of plugins) {
    if (Array.isArray(plugin)) {
      for (const pluginItem of plugin) {
        pluginItem(pluginApi);
      }
    } else {
      plugin?.(pluginApi);
    }
  }

  const highestOffset = ((args) => args.reduce((m, e) => (e > m ? e : m)))([
    offsets.base,
    offsets.defaults,
    offsets.components,
    offsets.utilities,
    offsets.user
  ]);
  let reservedBits = BigInt(highestOffset.toString(2).length);

  // A number one less than the top range of the highest offset area
  // so arbitrary properties are always sorted at the end.
  context.arbitraryPropertiesSort = ((1n << reservedBits) << 0n) - 1n;

  context.layerOrder = {
    defaults: (1n << reservedBits) << 0n,
    base: (1n << reservedBits) << 1n,
    components: (1n << reservedBits) << 2n,
    utilities: (1n << reservedBits) << 3n,
    user: (1n << reservedBits) << 4n
  };

  reservedBits += 5n;

  let offset = 0;
  context.variantOrder = new Map(
    variantList
      .map((variant, i) => {
        const variantFunctions = variantMap.get(variant).length;
        const bits = (1n << BigInt(i + offset)) << reservedBits;
        offset += variantFunctions - 1;
        return [variant, bits];
      })
      .sort(([, a], [, z]) => bigSign(a - z))
  );

  context.minimumScreen = [...context.variantOrder.values()].shift();

  // Build variantMap
  for (const [variantName, variantFunctions] of variantMap.entries()) {
    const sort = context.variantOrder.get(variantName);
    context.variantMap.set(
      variantName,
      variantFunctions.map((variantFunction, idx) => [sort << BigInt(idx), variantFunction])
    );
  }

  const safelist = (context.aileronConfig.safelist ?? []).filter(Boolean);
  if (safelist.length > 0) {
    const checks = [];

    for (const value of safelist) {
      if (typeof value === "string") {
        context.changedContent.push({ content: value, extension: "html" });
        continue;
      }

      if (value instanceof RegExp) {
        log.warn("root-regex", [
          "Regular expressions in `safelist` work differently in aileron CSS v3.0.",
          "Update your `safelist` configuration to eliminate this warning.",
          "https://aileron.aa.com/docs/content-configuration#safelisting-classes"
        ]);
        continue;
      }

      checks.push(value);
    }

    if (checks.length > 0) {
      const patternMatchingCount = new Map();
      const prefixLength = context.aileronConfig.prefix.length;

      for (const util of classList) {
        const utils = Array.isArray(util)
          ? (() => {
              const [utilName, options] = util;
              const values = Object.keys(options?.values ?? {});
              let classes = values.map((value) => formatClass(utilName, value));

              if (options?.supportsNegativeValues) {
                // This is the normal negated version
                // e.g. `-inset-1` or `-adc-inset-1`
                classes = [...classes, ...classes.map((cls) => `-${  cls}`)];

                // This is the negated version *after* the prefix
                // e.g. `adc--inset-1`
                // The prefix is already attached to util name
                // So we add the negative after the prefix
                classes = [
                  ...classes,
                  ...classes.map(
                    (cls) => `${cls.slice(0, prefixLength)  }-${  cls.slice(prefixLength)}`
                  )
                ];
              }

              return classes;
            })()
          : [util];

        for (const util of utils) {
          for (const { pattern, variants = [] } of checks) {
            // RegExp with the /g flag are stateful, so let's reset the last
            // index pointer to reset the state.
            pattern.lastIndex = 0;

            if (!patternMatchingCount.has(pattern)) {
              patternMatchingCount.set(pattern, 0);
            }

            if (!pattern.test(util)) continue;

            patternMatchingCount.set(pattern, patternMatchingCount.get(pattern) + 1);

            context.changedContent.push({ content: util, extension: "html" });
            for (const variant of variants) {
              context.changedContent.push({
                content: variant + context.aileronConfig.separator + util,
                extension: "html"
              });
            }
          }
        }
      }

      for (const [regex, count] of patternMatchingCount.entries()) {
        if (count !== 0) continue;

        log.warn([
          `The safelist pattern \`${regex}\` doesn't match any aileron CSS classes.`,
          "Fix this pattern or remove it from your `safelist` configuration.",
          "https://aileron.aa.com/docs/content-configuration#safelisting-classes"
        ]);
      }
    }
  }

  // A list of utilities that are used by certain aileron CSS utilities but
  // that don't exist on their own. This will result in them "not existing" and
  // sorting could be weird since you still require them in order to make the
  // host utitlies work properly. (Thanks Biology)
  const parasiteUtilities = new Set([prefix(context, "group"), prefix(context, "peer")]);
  context.getClassOrder = function getClassOrder(classes) {
    const sortedClassNames = new Map();
    for (const [sort, rule] of generateRules(new Set(classes), context)) {
      if (sortedClassNames.has(rule.raws.aileron.candidate)) continue;
      sortedClassNames.set(rule.raws.aileron.candidate, sort);
    }

    return classes.map((className) => {
      let order = sortedClassNames.get(className) ?? null;

      if (order === null && parasiteUtilities.has(className)) {
        // This will make sure that it is at the very beginning of the
        // `components` layer which technically means 'before any
        // components'.
        order = context.layerOrder.components;
      }

      return [className, order];
    });
  };

  // Generate a list of strings for autocompletion purposes, e.g.
  // ['uppercase', 'lowercase', ...]
  context.getClassList = function getClassList() {
    const output = [];

    for (const util of classList) {
      if (Array.isArray(util)) {
        const [utilName, options] = util;
        const negativeClasses = [];

        for (const [key, value] of Object.entries(options?.values ?? {})) {
          output.push(formatClass(utilName, key));
          if (options?.supportsNegativeValues && negateValue(value)) {
            negativeClasses.push(formatClass(utilName, `-${key}`));
          }
        }

        output.push(...negativeClasses);
      } else {
        output.push(util);
      }
    }

    return output;
  };
}

export function createContext(aileronConfig, changedContent = [], root = postcss.root()) {
  const context = {
    disposables: [],
    ruleCache: new Set(),
    classCache: new Map(),
    applyClassCache: new Map(),
    notClassCache: new Set(),
    postCssNodeCache: new Map(),
    candidateRuleMap: new Map(),
    aileronConfig,
    changedContent: changedContent,
    variantMap: new Map(),
    stylesheetCache: null
  };

  const resolvedPlugins = resolvePlugins(context, root);

  registerPlugins(resolvedPlugins, context);

  return context;
}

const contextMap = sharedState.contextMap;
const configContextMap = sharedState.configContextMap;
const contextSourcesMap = sharedState.contextSourcesMap;

export function getContext(
  root,
  result,
  aileronConfig,
  userConfigPath,
  aileronConfigHash,
  contextDependencies
) {
  const sourcePath = result.opts.from;
  const isConfigFile = userConfigPath !== null;

  env.DEBUG && console.log("Source path:", sourcePath);

  let existingContext;

  if (isConfigFile && contextMap.has(sourcePath)) {
    existingContext = contextMap.get(sourcePath);
  } else if (configContextMap.has(aileronConfigHash)) {
    const context = configContextMap.get(aileronConfigHash);
    contextSourcesMap.get(context).add(sourcePath);
    contextMap.set(sourcePath, context);

    existingContext = context;
  }

  const cssDidChange = hasContentChanged(sourcePath, root);

  // If there's already a context in the cache and we don't need to
  // reset the context, return the cached context.
  if (existingContext) {
    const contextDependenciesChanged = trackModified(
      [...contextDependencies],
      getFileModifiedMap(existingContext)
    );
    if (!contextDependenciesChanged && !cssDidChange) {
      return [existingContext, false];
    }
  }

  // If this source is in the context map, get the old context.
  // Remove this source from the context sources for the old context,
  // and clean up that context if no one else is using it. This can be
  // called by many processes in rapid succession, so we check for presence
  // first because the first process to run this code will wipe it out first.
  if (contextMap.has(sourcePath)) {
    const oldContext = contextMap.get(sourcePath);
    if (contextSourcesMap.has(oldContext)) {
      contextSourcesMap.get(oldContext).delete(sourcePath);
      if (contextSourcesMap.get(oldContext).size === 0) {
        contextSourcesMap.delete(oldContext);
        for (const [aileronConfigHash, context] of configContextMap) {
          if (context === oldContext) {
            configContextMap.delete(aileronConfigHash);
          }
        }
        for (const disposable of oldContext.disposables.splice(0)) {
          disposable(oldContext);
        }
      }
    }
  }

  env.DEBUG && console.log("Setting up new context...");

  const context = createContext(aileronConfig, [], root);

  trackModified([...contextDependencies], getFileModifiedMap(context));

  // ---

  // Update all context tracking state

  configContextMap.set(aileronConfigHash, context);
  contextMap.set(sourcePath, context);

  if (!contextSourcesMap.has(context)) {
    contextSourcesMap.set(context, new Set());
  }

  contextSourcesMap.get(context).add(sourcePath);

  return [context, true];
}
