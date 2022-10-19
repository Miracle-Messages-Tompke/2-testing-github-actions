import log from "../util/log.js";

export default function normalizeAileronDirectives(root) {
  const aileronDirectives = new Set();
  const layerDirectives = new Set();
  const applyDirectives = new Set();

  root.walkAtRules((atRule) => {
    if (atRule.name === "apply") {
      applyDirectives.add(atRule);
    }

    if (atRule.name === "import") {
      if (atRule.params === '"aileron/base"' || atRule.params === "'aileron/base'") {
        atRule.name = "aileron";
        atRule.params = "base";
      } else if (
        atRule.params === '"aileron/components"' ||
        atRule.params === "'aileron/components'"
      ) {
        atRule.name = "aileron";
        atRule.params = "components";
      } else if (
        atRule.params === '"aileron/utilities"' ||
        atRule.params === "'aileron/utilities'"
      ) {
        atRule.name = "aileron";
        atRule.params = "utilities";
      } else if (
        atRule.params === '"aileron/screens"' ||
        atRule.params === "'aileron/screens'" ||
        atRule.params === '"aileron/variants"' ||
        atRule.params === "'aileron/variants'"
      ) {
        atRule.name = "aileron";
        atRule.params = "variants";
      }
    }

    if (atRule.name === "aileron") {
      if (atRule.params === "screens") {
        atRule.params = "variants";
      }
      aileronDirectives.add(atRule.params);
    }

    if (["layer", "responsive", "variants"].includes(atRule.name)) {
      if (["responsive", "variants"].includes(atRule.name)) {
        log.warn(`${atRule.name}-at-rule-deprecated`, [
          `The \`@${atRule.name}\` directive has been deprecated in aileron CSS v3.0.`,
          `Use \`@layer utilities\` or \`@layer components\` instead.`,
          "https://aileron.aa.com/docs/upgrade-guide#replace-variants-with-layer"
        ]);
      }
      layerDirectives.add(atRule);
    }
  });

  if (
    !aileronDirectives.has("base") ||
    !aileronDirectives.has("components") ||
    !aileronDirectives.has("utilities")
  ) {
    for (const rule of layerDirectives) {
      if (rule.name === "layer" && ["base", "components", "utilities"].includes(rule.params)) {
        if (!aileronDirectives.has(rule.params)) {
          throw rule.error(
            `\`@layer ${rule.params}\` is used but no matching \`@aileron ${rule.params}\` directive is present.`
          );
        }
      } else if (rule.name === "responsive") {
        if (!aileronDirectives.has("utilities")) {
          throw rule.error("`@responsive` is used but `@aileron utilities` is missing.");
        }
      } else if (rule.name === "variants") {
        if (!aileronDirectives.has("utilities")) {
          throw rule.error("`@variants` is used but `@aileron utilities` is missing.");
        }
      }
    }
  }

  return { aileronDirectives, applyDirectives };
}
