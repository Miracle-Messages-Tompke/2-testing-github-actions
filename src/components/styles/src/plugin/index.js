/* eslint-disable no-undef */
import setupTrackingContext from "./lib/setup-tracking-context.js";
import processAileronFeatures from "./process-aileron-features.js";

module.exports = (configOrPath) => ({
  postcssPlugin: "@aileron/styles",
  plugins: [
    function (root, result) {
      const context = setupTrackingContext(configOrPath);

      if (root.type === "document") {
        const roots = root.nodes.filter((node) => node.type === "root");

        for (const r of roots) {
          if (r.type === "root") {
            processAileronFeatures(context)(r, result);
          }
        }

        return;
      }

      processAileronFeatures(context)(root, result);
    }
  ].filter(Boolean)
});

module.exports.postcss = true;
