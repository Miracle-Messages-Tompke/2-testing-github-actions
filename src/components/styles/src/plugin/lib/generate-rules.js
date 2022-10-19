/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-bitwise */
import postcss from "postcss";
import selectorParser from "postcss-selector-parser";
import { flagEnabled } from "../feature-flags.js";
import { normalize } from "../util/data-types.js";
import { formatVariantSelector, finalizeSelector } from "../util/format-variant-selector.js";
import isPlainObject from "../util/is-plain-object.js";
import isValidArbitraryValue from "../util/is-valid-arbitrary-value.js";
import log from "../util/log.js";
import { asClass } from "../util/name-class.js";
import parseObjectStyles from "../util/parse-object-styles.js";
import { updateAllClasses } from "../util/plugin-utils.js";
import prefixSelector from "../util/prefix-selector.js";
import { splitAtTopLevelOnly } from "../util/split-at-top-level-only.js";
import { isValidVariantFormatString, parseVariant } from "./setup-context-utils.js";
import * as sharedState from "./shared-state.js";

const classNameParser = selectorParser((selectors) => {
  return selectors.first.filter(({ type }) => type === "class").pop().value;
});

function getClassNameFromSelector(selector) {
  return classNameParser.transformSync(selector);
}

function* candidatePermutations(candidate) {
  let lastIndex = Infinity;

  while (lastIndex >= 0) {
    let dashIdx;

    if (lastIndex === Infinity && candidate.endsWith("]")) {
      const bracketIdx = candidate.indexOf("[");

      // If character before `[` isn't a dash or a slash, this isn't a dynamic class
      // eg. string[]
      dashIdx = ["-", "/"].includes(candidate[bracketIdx - 1]) ? bracketIdx - 1 : -1;
    } else {
      dashIdx = candidate.lastIndexOf("-", lastIndex);
    }

    if (dashIdx < 0) {
      break;
    }

    const prefix = candidate.slice(0, dashIdx);
    const modifier = candidate.slice(dashIdx + 1);

    yield [prefix, modifier];

    lastIndex = dashIdx - 1;
  }
}

function applyPrefix(matches, context) {
  if (matches.length === 0 || context.aileronConfig.prefix === "") {
    return matches;
  }

  for (const match of matches) {
    const [meta] = match;
    if (meta.options.respectPrefix) {
      const container = postcss.root({ nodes: [match[1].clone()] });
      const classCandidate = match[1].raws.aileron.classCandidate;

      container.walkRules((r) => {
        const shouldPrependNegative = classCandidate.startsWith("-");

        r.selector = prefixSelector(
          context.aileronConfig.prefix,
          r.selector,
          shouldPrependNegative
        );
      });

      match[1] = container.nodes[0];
    }
  }

  return matches;
}

function applyImportant(matches, classCandidate) {
  if (matches.length === 0) {
    return matches;
  }
  const result = [];

  for (const [meta, rule] of matches) {
    const container = postcss.root({ nodes: [rule.clone()] });
    container.walkRules((r) => {
      r.selector = updateAllClasses(r.selector, (className) => {
        if (className === classCandidate) {
          return `!${className}`;
        }
        return className;
      });
      r.walkDecls((d) => (d.important = true));
    });
    result.push([{ ...meta, important: true }, container.nodes[0]]);
  }

  return result;
}

// Takes a list of rule tuples and applies a variant like `hover`, sm`,
// whatever to it. We used to do some extra caching here to avoid generating
// a variant of the same rule more than once, but this was never hit because
// we cache at the entire selector level further up the tree.
//
// Technically you can get a cache hit if you have `hover:focus:text-center`
// and `focus:hover:text-center` in the same project, but it doesn't feel
// worth the complexity for that case.

function applyVariant(variant, matches, context) {
  if (matches.length === 0) {
    return matches;
  }

  let args;
  let isArbitraryVariant = false;

  // Find partial arbitrary variants
  if (variant.endsWith("]") && !variant.startsWith("[")) {
    args = variant.slice(variant.lastIndexOf("[") + 1, -1);
    variant = variant.slice(0, variant.indexOf(args) - 1 /* - */ - 1 /* [ */);
  }

  // Register arbitrary variants
  if (isArbitraryValue(variant) && !context.variantMap.has(variant)) {
    const selector = normalize(variant.slice(1, -1));

    if (!isValidVariantFormatString(selector)) {
      return [];
    }

    isArbitraryVariant = true;

    const fn = parseVariant(selector);

    const sort = Array.from(context.variantOrder.values()).pop() << 1n;
    context.variantMap.set(variant, [[sort, fn]]);
    context.variantOrder.set(variant, sort);
  }

  if (context.variantMap.has(variant)) {
    const variantFunctionTuples = context.variantMap.get(variant).slice();
    const result = [];

    for (const [meta, rule] of matches) {
      // Don't generate variants for user css
      if (meta.layer === "user") {
        continue;
      }

      const container = postcss.root({ nodes: [rule.clone()] });

      for (const [variantSort, variantFunction, containerFromArray] of variantFunctionTuples) {
        const clone = containerFromArray ?? container.clone();
        const collectedFormats = [];

        function prepareBackup() {
          // Already prepared, chicken out
          if (clone.raws.neededBackup) {
            return;
          }
          clone.raws.neededBackup = true;
          clone.walkRules((rule) => (rule.raws.originalSelector = rule.selector));
        }

        function modifySelectors(modifierFunction) {
          prepareBackup();
          clone.each((rule) => {
            if (rule.type !== "rule") {
              return;
            }

            rule.selectors = rule.selectors.map((selector) => {
              return modifierFunction({
                get className() {
                  return getClassNameFromSelector(selector);
                },
                selector
              });
            });
          });

          return clone;
        }

        const ruleWithVariant = variantFunction({
          // Public API
          get container() {
            prepareBackup();
            return clone;
          },
          separator: context.aileronConfig.separator,
          modifySelectors,

          // Private API for now
          wrap(wrapper) {
            const nodes = clone.nodes;
            clone.removeAll();
            wrapper.append(nodes);
            clone.append(wrapper);
          },
          format(selectorFormat) {
            collectedFormats.push(selectorFormat);
          },
          args
        });

        if (Array.isArray(ruleWithVariant)) {
          for (const [idx, variantFunction] of ruleWithVariant.entries()) {
            variantFunctionTuples.push([
              variantSort | BigInt(idx << ruleWithVariant.length),
              variantFunction,
              clone.clone()
            ]);
          }
          continue;
        }

        if (typeof ruleWithVariant === "string") {
          collectedFormats.push(ruleWithVariant);
        }

        if (ruleWithVariant === null) {
          continue;
        }

        if (clone.raws.neededBackup) {
          delete clone.raws.neededBackup;
          clone.walkRules((rule) => {
            const before = rule.raws.originalSelector;
            if (!before) return;
            delete rule.raws.originalSelector;
            if (before === rule.selector) return; // No mutation happened

            const modified = rule.selector;
            const rebuiltBase = selectorParser((selectors) => {
              selectors.walkClasses((classNode) => {
                classNode.value = `${variant}${context.aileronConfig.separator}${classNode.value}`;
              });
            }).processSync(before);

            collectedFormats.push(modified.replace(rebuiltBase, "&"));
            rule.selector = before;
          });
        }

        clone.nodes[0].raws.aileron = { ...clone.nodes[0].raws.aileron, parentLayer: meta.layer };

        const withOffset = [
          {
            ...meta,
            sort: variantSort | meta.sort,
            collectedFormats: (meta.collectedFormats ?? []).concat(collectedFormats),
            isArbitraryVariant
          },
          clone.nodes[0]
        ];
        result.push(withOffset);
      }
    }

    return result;
  }

  return [];
}

function parseRules(rule, cache, options = {}) {
  // PostCSS node
  if (!isPlainObject(rule) && !Array.isArray(rule)) {
    return [[rule], options];
  }

  // Tuple
  if (Array.isArray(rule)) {
    return parseRules(rule[0], cache, rule[1]);
  }

  // Simple object
  if (!cache.has(rule)) {
    cache.set(rule, parseObjectStyles(rule));
  }

  return [cache.get(rule), options];
}

const IS_VALID_PROPERTY_NAME = /^[a-z_-]/;

function isValidPropName(name) {
  return IS_VALID_PROPERTY_NAME.test(name);
}

/**
 * @param {string} declaration
 * @returns {boolean}
 */
function looksLikeUri(declaration) {
  // Quick bailout for obvious non-urls
  // This doesn't support schemes that don't use a leading // but that's unlikely to be a problem
  if (!declaration.includes("://")) {
    return false;
  }

  try {
    const url = new URL(declaration);
    return url.scheme !== "" && url.host !== "";
  } catch (err) {
    // Definitely not a valid url
    return false;
  }
}

function isParsableNode(node) {
  let isParsable = true;

  node.walkDecls((decl) => {
    if (!isParsableCssValue(decl.name, decl.value)) {
      isParsable = false;
      return false;
    }
  });

  return isParsable;
}

function isParsableCssValue(property, value) {
  // We don't want to to treat [https://example.com] as a custom property
  // Even though, according to the CSS grammar, it's a totally valid CSS declaration
  // So we short-circuit here by checking if the custom property looks like a url
  if (looksLikeUri(`${property}:${value}`)) {
    return false;
  }

  try {
    postcss.parse(`a{${property}:${value}}`).toResult();
    return true;
  } catch (err) {
    return false;
  }
}

function extractArbitraryProperty(classCandidate, context) {
  const [, property, value] = classCandidate.match(/^\[([a-zA-Z0-9-_]+):(\S+)\]$/) ?? [];

  if (value === undefined) {
    return null;
  }

  if (!isValidPropName(property)) {
    return null;
  }

  if (!isValidArbitraryValue(value)) {
    return null;
  }

  const normalized = normalize(value);

  if (!isParsableCssValue(property, normalized)) {
    return null;
  }

  return [
    [
      { sort: context.arbitraryPropertiesSort, layer: "utilities" },
      () => ({
        [asClass(classCandidate)]: {
          [property]: normalized
        }
      })
    ]
  ];
}

function* resolveMatchedPlugins(classCandidate, context) {
  if (context.candidateRuleMap.has(classCandidate)) {
    yield [context.candidateRuleMap.get(classCandidate), "DEFAULT"];
  }

  yield* (function* (arbitraryPropertyRule) {
    if (arbitraryPropertyRule !== null) {
      yield [arbitraryPropertyRule, "DEFAULT"];
    }
  })(extractArbitraryProperty(classCandidate, context));

  let candidatePrefix = classCandidate;
  let negative = false;

  const adcConfigPrefix = context.aileronConfig.prefix;

  const adcConfigPrefixLen = adcConfigPrefix.length;

  const hasMatchingPrefix =
    candidatePrefix.startsWith(adcConfigPrefix) || candidatePrefix.startsWith(`-${adcConfigPrefix}`);

  if (candidatePrefix[adcConfigPrefixLen] === "-" && hasMatchingPrefix) {
    negative = true;
    candidatePrefix = adcConfigPrefix + candidatePrefix.slice(adcConfigPrefixLen + 1);
  }

  if (negative && context.candidateRuleMap.has(candidatePrefix)) {
    yield [context.candidateRuleMap.get(candidatePrefix), "-DEFAULT"];
  }

  for (const [prefix, modifier] of candidatePermutations(candidatePrefix)) {
    if (context.candidateRuleMap.has(prefix)) {
      yield [context.candidateRuleMap.get(prefix), negative ? `-${modifier}` : modifier];
    }
  }
}

function splitWithSeparator(input, separator) {
  if (input === sharedState.NOT_ON_DEMAND) {
    return [sharedState.NOT_ON_DEMAND];
  }

  return Array.from(splitAtTopLevelOnly(input, separator));
}

function* recordCandidates(matches, classCandidate) {
  for (const match of matches) {
    match[1].raws.aileron = {
      ...match[1].raws.aileron,
      classCandidate,
      preserveSource: match[0].options?.preserveSource ?? false
    };

    yield match;
  }
}

function* resolveMatches(candidate, context, original = candidate) {
  const separator = context.aileronConfig.separator;
  let [classCandidate, ...variants] = splitWithSeparator(candidate, separator).reverse();
  let important = false;

  if (classCandidate.startsWith("!")) {
    important = true;
    classCandidate = classCandidate.slice(1);
  }

  if (flagEnabled(context.aileronConfig, "variantGrouping")) {
    if (classCandidate.startsWith("(") && classCandidate.endsWith(")")) {
      const base = variants.slice().reverse().join(separator);
      for (const part of splitAtTopLevelOnly(classCandidate.slice(1, -1), ",")) {
        yield* resolveMatches(base + separator + part, context, original);
      }
    }
  }

  // TODO: Reintroduce this in ways that doesn't break on false positives
  // function sortAgainst(toSort, against) {
  //   return toSort.slice().sort((a, z) => {
  //     return bigSign(against.get(a)[0] - against.get(z)[0])
  //   })
  // }
  // let sorted = sortAgainst(variants, context.variantMap)
  // if (sorted.toString() !== variants.toString()) {
  //   let corrected = sorted.reverse().concat(classCandidate).join(':')
  //   throw new Error(`Class ${candidate} should be written as ${corrected}`)
  // }

  for (const matchedPlugins of resolveMatchedPlugins(classCandidate, context)) {
    let matches = [];
    const typesByMatches = new Map();

    const [plugins, modifier] = matchedPlugins;
    const isOnlyPlugin = plugins.length === 1;

    for (const [sort, plugin] of plugins) {
      const matchesPerPlugin = [];

      if (typeof plugin === "function") {
        for (const ruleSet of [].concat(plugin(modifier, { isOnlyPlugin }))) {
          const [rules, options] = parseRules(ruleSet, context.postCssNodeCache);
          for (const rule of rules) {
            matchesPerPlugin.push([{ ...sort, options: { ...sort.options, ...options } }, rule]);
          }
        }
      }
      // Only process static plugins on exact matches
      else if (modifier === "DEFAULT" || modifier === "-DEFAULT") {
        const ruleSet = plugin;
        const [rules, options] = parseRules(ruleSet, context.postCssNodeCache);
        for (const rule of rules) {
          matchesPerPlugin.push([{ ...sort, options: { ...sort.options, ...options } }, rule]);
        }
      }

      if (matchesPerPlugin.length > 0) {
        typesByMatches.set(matchesPerPlugin, sort.options?.type);
        matches.push(matchesPerPlugin);
      }
    }

    if (isArbitraryValue(modifier)) {
      // When generated arbitrary values are ambiguous, we can't know
      // which to pick so don't generate any utilities for them
      if (matches.length > 1) {
        const typesPerPlugin = matches.map(
          (match) => new Set([...(typesByMatches.get(match) ?? [])])
        );

        // Remove duplicates, so that we can detect proper unique types for each plugin.
        for (const pluginTypes of typesPerPlugin) {
          for (const type of pluginTypes) {
            let removeFromOwnGroup = false;

            for (const otherGroup of typesPerPlugin) {
              if (pluginTypes === otherGroup) continue;

              if (otherGroup.has(type)) {
                otherGroup.delete(type);
                removeFromOwnGroup = true;
              }
            }

            if (removeFromOwnGroup) pluginTypes.delete(type);
          }
        }

        const messages = [];

        for (const [idx, group] of typesPerPlugin.entries()) {
          for (const type of group) {
            const rules = matches[idx]
              .map(([, rule]) => rule)
              .flat()
              .map((rule) =>
                rule
                  .toString()
                  .split("\n")
                  .slice(1, -1) // Remove selector and closing '}'
                  .map((line) => line.trim())
                  .map((x) => `      ${x}`) // Re-indent
                  .join("\n")
              )
              .join("\n\n");

            messages.push(
              `  Use \`${candidate.replace("[", `[${type}:`)}\` for \`${rules.trim()}\``
            );
            break;
          }
        }

        log.warn([
          `The class \`${candidate}\` is ambiguous and matches multiple utilities.`,
          ...messages,
          `If this is content and not a class, replace it with \`${candidate
            .replace("[", "&lsqb;")
            .replace("]", "&rsqb;")}\` to silence this warning.`
        ]);
        continue;
      }

      matches = matches.map((list) => list.filter((match) => isParsableNode(match[1])));
    }

    matches = matches.flat();
    matches = Array.from(recordCandidates(matches, classCandidate));
    matches = applyPrefix(matches, context);

    if (important) {
      matches = applyImportant(matches, classCandidate);
    }

    for (const variant of variants) {
      matches = applyVariant(variant, matches, context);
    }

    for (const match of matches) {
      match[1].raws.aileron = { ...match[1].raws.aileron, candidate };

      // Apply final format selector
      if (match[0].collectedFormats) {
        const finalFormat = formatVariantSelector("&", ...match[0].collectedFormats);
        const container = postcss.root({ nodes: [match[1].clone()] });
        container.walkRules((rule) => {
          if (inKeyframes(rule)) return;

          rule.selector = finalizeSelector(finalFormat, {
            selector: rule.selector,
            candidate: original,
            base: candidate
              .split(new RegExp(`\\${context?.aileronConfig?.separator ?? ":"}(?![^[]*\\])`))
              .pop(),
            isArbitraryVariant: match[0].isArbitraryVariant,

            context
          });
        });
        match[1] = container.nodes[0];
      }

      yield match;
    }
  }
}

function inKeyframes(rule) {
  return rule.parent && rule.parent.type === "atrule" && rule.parent.name === "keyframes";
}

function generateRules(candidates, context) {
  const allRules = [];

  for (const candidate of candidates) {
    if (context.notClassCache.has(candidate)) {
      continue;
    }

    if (context.classCache.has(candidate)) {
      allRules.push(context.classCache.get(candidate));
      continue;
    }

    const matches = Array.from(resolveMatches(candidate, context));

    if (matches.length === 0) {
      context.notClassCache.add(candidate);
      continue;
    }

    context.classCache.set(candidate, matches);
    allRules.push(matches);
  }

  // Strategy based on `aileronConfig.important`
  const strategy = ((important) => {
    if (important === true) {
      return (rule) => {
        rule.walkDecls((d) => {
          if (d.parent.type === "rule" && !inKeyframes(d.parent)) {
            d.important = true;
          }
        });
      };
    }

    if (typeof important === "string") {
      return (rule) => {
        rule.selectors = rule.selectors.map((selector) => {
          return `${important} ${selector}`;
        });
      };
    }
  })(context.aileronConfig.important);

  return allRules.flat(1).map(([{ sort, layer, options }, rule]) => {
    if (options.respectImportant) {
      if (strategy) {
        const container = postcss.root({ nodes: [rule.clone()] });
        container.walkRules((r) => {
          if (inKeyframes(r)) {
            return;
          }

          strategy(r);
        });
        rule = container.nodes[0];
      }
    }

    return [sort | context.layerOrder[layer], rule];
  });
}

function isArbitraryValue(input) {
  return input.startsWith("[") && input.endsWith("]");
}

export { resolveMatches, generateRules };
