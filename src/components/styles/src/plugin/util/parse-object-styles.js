import postcss from "postcss";
import postcssJs from "postcss-js";
import postcssNested from "postcss-nested";

export default function parseObjectStyles(styles) {
  if (!Array.isArray(styles)) {
    return parseObjectStyles([styles]);
  }

  return styles.flatMap((style) => {
    return postcss([
      postcssNested({
        bubble: ["screen"]
      })
    ]).process(style, {
      parser: postcssJs
    }).root.nodes;
  });
}
