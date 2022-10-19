/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
export default function (_context) {
  return (root, result) => {
    let found = false;

    root.walkAtRules("aileron", (node) => {
      if (found) return false;

      if (node.parent && node.parent.type !== "root") {
        found = true;
        node.warn(
          result,
          [
            "Nested @aileron rules were detected, but are not supported.",
            "Consider using a prefix to scope Aileron's classes: https://aileron.aa.com/docs/configuration#prefix",
            "Alternatively, use the important selector strategy: https://aileron.aa.com/docs/configuration#selector-strategy"
          ].join("\n")
        );
        return false;
      }
    });

    root.walkRules((rule) => {
      if (found) return false;

      rule.walkRules((nestedRule) => {
        found = true;
        nestedRule.warn(
          result,
          [
            "Nested CSS was detected, but CSS nesting has not been configured correctly.",
            "Please enable a CSS nesting plugin *before* Aileron in your configuration.",
            "See how here: https://aileron.aa.com/docs/using-with-preprocessors#nesting"
          ].join("\n")
        );
        return false;
      });
    });
  };
}
