import buildMediaQuery from "../util/build-media-query.js";
import { normalizeScreens } from "../util/normalize-screens.js";

export default function ({ aileronConfig: { theme } }) {
  return function (css) {
    css.walkAtRules("screen", (atRule) => {
      const screen = atRule.params;
      const screens = normalizeScreens(theme.screens);
      const screenDefinition = screens.find(({ name }) => name === screen);

      if (!screenDefinition) {
        throw atRule.error(`No \`${screen}\` screen found.`);
      }

      atRule.name = "media";
      atRule.params = buildMediaQuery(screenDefinition);
    });
  };
}
