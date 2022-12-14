import postcss from "postcss";
import selectorParser from "postcss-selector-parser";
import { flagEnabled } from "../feature-flags.js";

const getNode = {
  id(node) {
    return selectorParser.attribute({
      attribute: "id",
      operator: "=",
      value: node.value,
      quoteMark: '"'
    });
  }
};

function minimumImpactSelector(nodes) {
  let rest = nodes
    .filter((node) => {
      // Keep non-pseudo nodes
      if (node.type !== "pseudo") return true;

      // Keep pseudo nodes that have subnodes
      // E.g.: `:not()` contains subnodes inside the parentheses
      if (node.nodes.length > 0) return true;

      // Keep pseudo `elements`
      // This implicitly means that we ignore pseudo `classes`
      return (
        node.value.startsWith("::") ||
        [":before", ":after", ":first-line", ":first-letter"].includes(node.value)
      );
    })
    .reverse();

  const searchFor = new Set(["tag", "class", "id", "attribute"]);

  const splitPointIdx = rest.findIndex((n) => searchFor.has(n.type));
  if (splitPointIdx === -1) return rest.reverse().join("").trim();

  const node = rest[splitPointIdx];
  const bestNode = getNode[node.type] ? getNode[node.type](node) : node;

  rest = rest.slice(0, splitPointIdx);

  const combinatorIdx = rest.findIndex((n) => n.type === "combinator" && n.value === ">");
  if (combinatorIdx !== -1) {
    rest.splice(0, combinatorIdx);
    rest.unshift(selectorParser.universal());
  }

  return [bestNode, ...rest.reverse()].join("").trim();
}

export const elementSelectorParser = selectorParser((selectors) => {
  return selectors.map((s) => {
    const nodes = s.split((n) => n.type === "combinator" && n.value === " ").pop();
    return minimumImpactSelector(nodes);
  });
});

const cache = new Map();

function extractElementSelector(selector) {
  if (!cache.has(selector)) {
    cache.set(selector, elementSelectorParser.transformSync(selector));
  }

  return cache.get(selector);
}

export default function resolveDefaultsAtRules({ aileronConfig }) {
  return (root) => {
    const variableNodeMap = new Map();

    /** @type {Set<import('postcss').AtRule>} */
    const universals = new Set();

    root.walkAtRules("defaults", (rule) => {
      if (rule.nodes && rule.nodes.length > 0) {
        universals.add(rule);
        return;
      }

      const variable = rule.params;
      if (!variableNodeMap.has(variable)) {
        variableNodeMap.set(variable, new Set());
      }

      variableNodeMap.get(variable).add(rule.parent);

      rule.remove();
    });

    if (flagEnabled(aileronConfig, "optimizeUniversalDefaults")) {
      for (const universal of universals) {
        /** @type {Map<string, Set<string>>} */
        const selectorGroups = new Map();

        const rules = variableNodeMap.get(universal.params) ?? [];

        for (const rule of rules) {
          for (const selector of extractElementSelector(rule.selector)) {
            // If selector contains a vendor prefix after a pseudo element or class,
            // we consider them separately because merging the declarations into
            // a single rule will cause browsers that do not understand the
            // vendor prefix to throw out the whole rule
            const selectorGroupName =
              selector.includes(":-") || selector.includes("::-") ? selector : "__DEFAULT__";

            const selectors = selectorGroups.get(selectorGroupName) ?? new Set();
            selectorGroups.set(selectorGroupName, selectors);

            selectors.add(selector);
          }
        }

        if (flagEnabled(aileronConfig, "optimizeUniversalDefaults")) {
          if (selectorGroups.size === 0) {
            universal.remove();
            continue;
          }

          for (const [, selectors] of selectorGroups) {
            const universalRule = postcss.rule({
              source: universal.source
            });

            universalRule.selectors = [...selectors];

            universalRule.append(universal.nodes.map((node) => node.clone()));
            universal.before(universalRule);
          }
        }

        universal.remove();
      }
    } else if (universals.size) {
      const universalRule = postcss.rule({
        selectors: ["*", "::before", "::after"]
      });

      for (const universal of universals) {
        universalRule.append(universal.nodes);

        if (!universalRule.parent) {
          universal.before(universalRule);
        }

        if (!universalRule.source) {
          universalRule.source = universal.source;
        }

        universal.remove();
      }

      const backdropRule = universalRule.clone({
        selectors: ["::backdrop"]
      });

      universalRule.after(backdropRule);
    }
  };
}
