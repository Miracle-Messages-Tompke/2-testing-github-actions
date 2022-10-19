/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-bitwise */
import LRU from "quick-lru";
import bigSign from "../util/big-sign.js";
import cloneNodes from "../util/clone-nodes.js";
import log from "../util/log.js";
import { defaultExtractor } from "./default-extractor.js";
import { generateRules } from "./generate-rules.js";
import * as sharedState from "./shared-state.js";

const env = sharedState.env;

const builtInExtractors = {
  DEFAULT: defaultExtractor
};

const builtInTransformers = {
  DEFAULT: (content) => content,
  svelte: (content) => content.replace(/(?:^|\s)class:/g, " ")
};

function getExtractor(context, fileExtension) {
  const extractors = context.aileronConfig.content.extract;

  return (
    extractors[fileExtension] ||
    extractors.DEFAULT ||
    builtInExtractors[fileExtension] ||
    builtInExtractors.DEFAULT(context)
  );
}

function getTransformer(aileronConfig, fileExtension) {
  const transformers = aileronConfig.content.transform;

  return (
    transformers[fileExtension] ||
    transformers.DEFAULT ||
    builtInTransformers[fileExtension] ||
    builtInTransformers.DEFAULT
  );
}

const extractorCache = new WeakMap();

// Scans template contents for possible classes. This is a hot path on initial build but
// not too important for subsequent builds. The faster the better though — if we can speed
// up these regexes by 50% that could cut initial build time by like 20%.
function getClassCandidates(content, extractor, candidates, seen) {
  if (!extractorCache.has(extractor)) {
    extractorCache.set(extractor, new LRU({ maxSize: 25000 }));
  }

  for (let line of content.split("\n")) {
    line = line.trim();

    if (seen.has(line)) {
      continue;
    }
    seen.add(line);

    if (extractorCache.get(extractor).has(line)) {
      for (const match of extractorCache.get(extractor).get(line)) {
        candidates.add(match);
      }
    } else {
      const extractorMatches = extractor(line).filter((s) => s !== "!*");
      const lineMatchesSet = new Set(extractorMatches);

      for (const match of lineMatchesSet) {
        candidates.add(match);
      }

      extractorCache.get(extractor).set(line, lineMatchesSet);
    }
  }
}

function buildStylesheet(rules, context) {
  const sortedRules = rules.sort(([a], [z]) => bigSign(a - z));

  const returnValue = {
    base: new Set(),
    defaults: new Set(),
    components: new Set(),
    utilities: new Set(),
    variants: new Set(),

    // All the CSS that is not Aileron related can be put in this bucket. This
    // will make it easier to later use this information when we want to
    // `@apply` for example. The main reason we do this here is because we
    // still need to make sure the order is correct. Last but not least, we
    // will make sure to always re-inject this section into the css, even if
    // certain rules were not used. This means that it will look like a no-op
    // from the user's perspective, but we gathered all the useful information
    // we need.
    user: new Set()
  };

  for (const [sort, rule] of sortedRules) {
    if (sort >= context.minimumScreen) {
      returnValue.variants.add(rule);
      continue;
    }

    if (sort & context.layerOrder.base) {
      returnValue.base.add(rule);
      continue;
    }

    if (sort & context.layerOrder.defaults) {
      returnValue.defaults.add(rule);
      continue;
    }

    if (sort & context.layerOrder.components) {
      returnValue.components.add(rule);
      continue;
    }

    if (sort & context.layerOrder.utilities) {
      returnValue.utilities.add(rule);
      continue;
    }

    if (sort & context.layerOrder.user) {
      returnValue.user.add(rule);
      continue;
    }
  }

  return returnValue;
}

export default function expandAileronAtRules(context) {
  return (root) => {
    const layerNodes = {
      base: null,
      components: null,
      utilities: null,
      variants: null
    };

    root.walkAtRules((rule) => {
      // Make sure this file contains Aileron directives. If not, we can save
      // a lot of work and bail early. Also we don't have to register our touch
      // file as a dependency since the output of this CSS does not depend on
      // the source of any templates. Think Vue <style> blocks for example.
      if (rule.name === "aileron") {
        if (Object.keys(layerNodes).includes(rule.params)) {
          layerNodes[rule.params] = rule;
        }
      }
    });

    if (Object.values(layerNodes).every((n) => n === null)) {
      return root;
    }

    // ---

    // Find potential rules in changed files
    const candidates = new Set([sharedState.NOT_ON_DEMAND]);
    const seen = new Set();

    env.DEBUG && console.time("Reading changed files");

    for (const { content, extension } of context.changedContent) {
      const transformer = getTransformer(context.aileronConfig, extension);
      const extractor = getExtractor(context, extension);
      getClassCandidates(transformer(content), extractor, candidates, seen);
    }

    env.DEBUG && console.timeEnd("Reading changed files");

    // ---

    // Generate the actual CSS
    const classCacheCount = context.classCache.size;

    env.DEBUG && console.time("Generate rules");
    const rules = generateRules(candidates, context);
    env.DEBUG && console.timeEnd("Generate rules");

    // We only ever add to the classCache, so if it didn't grow, there is nothing new.
    env.DEBUG && console.time("Build stylesheet");
    if (context.stylesheetCache === null || context.classCache.size !== classCacheCount) {
      for (const rule of rules) {
        context.ruleCache.add(rule);
      }

      context.stylesheetCache = buildStylesheet([...context.ruleCache], context);
    }
    env.DEBUG && console.timeEnd("Build stylesheet");

    const {
      defaults: defaultNodes,
      base: baseNodes,
      components: componentNodes,
      utilities: utilityNodes,
      variants: screenNodes
    } = context.stylesheetCache;

    // ---

    // Replace any Aileron directives with generated CSS

    if (layerNodes.base) {
      layerNodes.base.before(
        cloneNodes([...baseNodes, ...defaultNodes], layerNodes.base.source, {
          layer: "base"
        })
      );
      layerNodes.base.remove();
    }

    if (layerNodes.components) {
      layerNodes.components.before(
        cloneNodes([...componentNodes], layerNodes.components.source, {
          layer: "components"
        })
      );
      layerNodes.components.remove();
    }

    if (layerNodes.utilities) {
      layerNodes.utilities.before(
        cloneNodes([...utilityNodes], layerNodes.utilities.source, {
          layer: "utilities"
        })
      );
      layerNodes.utilities.remove();
    }

    // We do post-filtering to not alter the emitted order of the variants
    const variantNodes = Array.from(screenNodes).filter((node) => {
      const parentLayer = node.raws.aileron?.parentLayer;

      if (parentLayer === "components") {
        return layerNodes.components !== null;
      }

      if (parentLayer === "utilities") {
        return layerNodes.utilities !== null;
      }

      return true;
    });

    if (layerNodes.variants) {
      layerNodes.variants.before(
        cloneNodes(variantNodes, layerNodes.variants.source, {
          layer: "variants"
        })
      );
      layerNodes.variants.remove();
    } else if (variantNodes.length > 0) {
      root.append(
        cloneNodes(variantNodes, root.source, {
          layer: "variants"
        })
      );
    }

    // If we've got a utility layer and no utilities are generated there's likely something wrong
    const hasUtilityVariants = variantNodes.some(
      (node) => node.raws.aileron?.parentLayer === "utilities"
    );

    if (layerNodes.utilities && utilityNodes.size === 0 && !hasUtilityVariants) {
      log.warn("content-problems", [
        "No utility classes were detected in your source files. If this is unexpected, double-check the `content` option in your Aileron CSS configuration.",
        "https://aileron.aa.com/docs/content-configuration"
      ]);
    }

    // ---

    if (env.DEBUG) {
      console.log("Potential classes: ", candidates.size);
      console.log("Active contexts: ", sharedState.contextSourcesMap.size);
    }

    // Clear the cache for the changed files
    context.changedContent = [];

    // Cleanup any leftover @layer atrules
    root.walkAtRules("layer", (rule) => {
      if (Object.keys(layerNodes).includes(rule.params)) {
        rule.remove();
      }
    });
  };
}
