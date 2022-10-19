/* eslint-disable no-undef */
const prettier = require("prettier");
const serialize = require("serialize-javascript");
const StyleDictionary = require("style-dictionary");
const Color = require("tinycolor2");
const { fileHeader } = StyleDictionary.formatHelpers;

const tokenTheme = "light";
const fontSizeDEFAULT = 16;

function mapDictionaryToConfig(dictionary) {
  const dictionaryTokens = dictionary.allTokens;
  const configTheme = {};
  const screens = {};
  const spacing = {};
  spacing["px"] = "1px";
  spacing["0"] = "0px";
  const colorGroup = {};
  colorGroup["inherit"] = "inherit";
  colorGroup["current"] = "currentColor";
  colorGroup["transparent"] = "transparent";
  colorGroup["neutral"] = {};
  colorGroup["red"] = {};
  colorGroup["blue"] = {};
  colorGroup["orange"] = {};
  colorGroup["green"] = {};
  const shadowItem = {};
  const boxShadow = {};
  boxShadow["none"] = "none";
  const radii = {};
  radii["none"] = "0px";
  radii["full"] = "9999px";

  const defaultTheme = {
    columns: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      "3xs": "16rem",
      "2xs": "18rem",
      xs: "20rem",
      sm: "24rem",
      md: "28rem",
      lg: "32rem",
      xl: "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      "5xl": "64rem",
      "6xl": "72rem",
      "7xl": "80rem"
    },
    animation: {
      none: "none",
      spin: "spin 1s linear infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      bounce: "bounce 1s infinite"
    },
    aspectRatio: {
      auto: "auto",
      square: "1 / 1",
      video: "16 / 9"
    },
    backgroundColor: ({ theme }) => theme("colors"),
    backgroundPosition: {
      bottom: "bottom",
      center: "center",
      left: "left",
      "left-bottom": "left bottom",
      "left-top": "left top",
      right: "right",
      "right-bottom": "right bottom",
      "right-top": "right top",
      top: "top"
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain"
    },
    borderColor: ({ theme }) => ({
      ...theme("colors"),
      DEFAULT: theme("colors.neutral.070", "currentColor")
    }),
    borderSpacing: ({ theme }) => ({
      ...theme("spacing")
    }),
    borderWidth: {
      DEFAULT: "1px",
      0: "0px",
      2: "2px",
      4: "4px",
      8: "8px"
    },
    boxShadowColor: ({ theme }) => theme("colors"),
    content: {
      none: "none"
    },
    cursor: {
      auto: "auto",
      default: "default",
      pointer: "pointer",
      wait: "wait",
      text: "text",
      move: "move",
      help: "help",
      "not-allowed": "not-allowed",
      none: "none",
      "context-menu": "context-menu",
      progress: "progress",
      cell: "cell",
      crosshair: "crosshair",
      "vertical-text": "vertical-text",
      alias: "alias",
      copy: "copy",
      "no-drop": "no-drop",
      grab: "grab",
      grabbing: "grabbing",
      "all-scroll": "all-scroll",
      "col-resize": "col-resize",
      "row-resize": "row-resize",
      "n-resize": "n-resize",
      "e-resize": "e-resize",
      "s-resize": "s-resize",
      "w-resize": "w-resize",
      "ne-resize": "ne-resize",
      "nw-resize": "nw-resize",
      "se-resize": "se-resize",
      "sw-resize": "sw-resize",
      "ew-resize": "ew-resize",
      "ns-resize": "ns-resize",
      "nesw-resize": "nesw-resize",
      "nwse-resize": "nwse-resize",
      "zoom-in": "zoom-in",
      "zoom-out": "zoom-out"
    },
    divideColor: ({ theme }) => theme("colors"),
    divideWidth: ({ theme }) => theme("borderWidth"),
    fill: ({ theme }) => theme("colors"),
    invert: {
      0: "0",
      DEFAULT: "100%"
    },
    flex: {
      1: "1 1 0%",
      auto: "1 1 auto",
      initial: "0 1 auto",
      none: "none"
    },
    flexBasis: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      "1/12": "8.333333%",
      "2/12": "16.666667%",
      "3/12": "25%",
      "4/12": "33.333333%",
      "5/12": "41.666667%",
      "6/12": "50%",
      "7/12": "58.333333%",
      "8/12": "66.666667%",
      "9/12": "75%",
      "10/12": "83.333333%",
      "11/12": "91.666667%",
      full: "100%"
    }),
    flexGrow: {
      0: "0",
      DEFAULT: "1"
    },
    flexShrink: {
      0: "0",
      DEFAULT: "1"
    },
    fontWeight: {
      thin: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900"
    },
    gap: ({ theme }) => theme("spacing"),
    gridAutoColumns: {
      auto: "auto",
      min: "min-content",
      max: "max-content",
      fr: "minmax(0, 1fr)"
    },
    gridAutoRows: {
      auto: "auto",
      min: "min-content",
      max: "max-content",
      fr: "minmax(0, 1fr)"
    },
    gridColumn: {
      auto: "auto",
      "span-1": "span 1 / span 1",
      "span-2": "span 2 / span 2",
      "span-3": "span 3 / span 3",
      "span-4": "span 4 / span 4",
      "span-5": "span 5 / span 5",
      "span-6": "span 6 / span 6",
      "span-7": "span 7 / span 7",
      "span-8": "span 8 / span 8",
      "span-9": "span 9 / span 9",
      "span-10": "span 10 / span 10",
      "span-11": "span 11 / span 11",
      "span-12": "span 12 / span 12",
      "span-full": "1 / -1"
    },
    gridColumnEnd: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      13: "13"
    },
    gridColumnStart: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      13: "13"
    },
    gridRow: {
      auto: "auto",
      "span-1": "span 1 / span 1",
      "span-2": "span 2 / span 2",
      "span-3": "span 3 / span 3",
      "span-4": "span 4 / span 4",
      "span-5": "span 5 / span 5",
      "span-6": "span 6 / span 6",
      "span-full": "1 / -1"
    },
    gridRowStart: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7"
    },
    gridRowEnd: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7"
    },
    gridTemplateColumns: {
      none: "none",
      1: "repeat(1, minmax(0, 1fr))",
      2: "repeat(2, minmax(0, 1fr))",
      3: "repeat(3, minmax(0, 1fr))",
      4: "repeat(4, minmax(0, 1fr))",
      5: "repeat(5, minmax(0, 1fr))",
      6: "repeat(6, minmax(0, 1fr))",
      7: "repeat(7, minmax(0, 1fr))",
      8: "repeat(8, minmax(0, 1fr))",
      9: "repeat(9, minmax(0, 1fr))",
      10: "repeat(10, minmax(0, 1fr))",
      11: "repeat(11, minmax(0, 1fr))",
      12: "repeat(12, minmax(0, 1fr))"
    },
    gridTemplateRows: {
      none: "none",
      1: "repeat(1, minmax(0, 1fr))",
      2: "repeat(2, minmax(0, 1fr))",
      3: "repeat(3, minmax(0, 1fr))",
      4: "repeat(4, minmax(0, 1fr))",
      5: "repeat(5, minmax(0, 1fr))",
      6: "repeat(6, minmax(0, 1fr))"
    },
    height: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      full: "100%",
      screen: "100vh",
      min: "min-content",
      max: "max-content",
      fit: "fit-content"
    }),
    inset: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      full: "100%"
    }),
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal"
    },
    margin: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing")
    }),
    maxHeight: ({ theme }) => ({
      ...theme("spacing"),
      full: "100%",
      screen: "100vh",
      min: "min-content",
      max: "max-content",
      fit: "fit-content"
    }),
    maxWidth: ({ theme, breakpoints }) => ({
      none: "none",
      0: "0rem",
      xs: "20rem",
      sm: "24rem",
      md: "28rem",
      lg: "32rem",
      xl: "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      "5xl": "64rem",
      "6xl": "72rem",
      "7xl": "80rem",
      full: "100%",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
      prose: "65ch",
      ...breakpoints(theme("screens"))
    }),
    minHeight: {
      0: "0px",
      full: "100%",
      screen: "100vh",
      min: "min-content",
      max: "max-content",
      fit: "fit-content"
    },
    minWidth: {
      0: "0px",
      full: "100%",
      min: "min-content",
      max: "max-content",
      fit: "fit-content"
    },
    objectPosition: {
      bottom: "bottom",
      center: "center",
      left: "left",
      "left-bottom": "left bottom",
      "left-top": "left top",
      right: "right",
      "right-bottom": "right bottom",
      "right-top": "right top",
      top: "top"
    },
    opacity: {
      0: "0",
      5: "0.05",
      10: "0.1",
      20: "0.2",
      25: "0.25",
      30: "0.3",
      40: "0.4",
      50: "0.5",
      60: "0.6",
      70: "0.7",
      75: "0.75",
      80: "0.8",
      90: "0.9",
      95: "0.95",
      100: "1"
    },
    order: {
      first: "-9999",
      last: "9999",
      none: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12"
    },
    padding: ({ theme }) => theme("spacing"),
    placeholderColor: ({ theme }) => theme("colors"),
    outlineColor: ({ theme }) => theme("colors"),
    outlineOffset: {
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px"
    },
    outlineWidth: {
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px"
    },
    rotate: {
      0: "0deg",
      1: "1deg",
      2: "2deg",
      3: "3deg",
      6: "6deg",
      12: "12deg",
      45: "45deg",
      90: "90deg",
      180: "180deg"
    },
    scale: {
      0: "0",
      50: ".5",
      75: ".75",
      90: ".9",
      95: ".95",
      100: "1",
      105: "1.05",
      110: "1.1",
      125: "1.25",
      150: "1.5"
    },
    scrollMargin: ({ theme }) => ({
      ...theme("spacing")
    }),
    scrollPadding: ({ theme }) => theme("spacing"),
    skew: {
      0: "0deg",
      1: "1deg",
      2: "2deg",
      3: "3deg",
      6: "6deg",
      12: "12deg"
    },
    space: ({ theme }) => ({
      ...theme("spacing")
    }),
    stroke: ({ theme }) => theme("colors"),
    strokeWidth: {
      0: "0",
      1: "1",
      2: "2"
    },
    textColor: ({ theme }) => theme("colors"),
    textDecorationColor: ({ theme }) => theme("colors"),
    textDecorationThickness: {
      auto: "auto",
      "from-font": "from-font",
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px"
    },
    textUnderlineOffset: {
      auto: "auto",
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px"
    },
    textIndent: ({ theme }) => ({
      ...theme("spacing")
    }),
    transformOrigin: {
      center: "center",
      top: "top",
      "top-right": "top right",
      right: "right",
      "bottom-right": "bottom right",
      bottom: "bottom",
      "bottom-left": "bottom left",
      left: "left",
      "top-left": "top left"
    },
    transitionDelay: {
      75: "75ms",
      100: "100ms",
      150: "150ms",
      200: "200ms",
      300: "300ms",
      500: "500ms",
      700: "700ms",
      1000: "1000ms"
    },
    transitionDuration: {
      DEFAULT: "150ms",
      75: "75ms",
      100: "100ms",
      150: "150ms",
      200: "200ms",
      300: "300ms",
      500: "500ms",
      700: "700ms",
      1000: "1000ms"
    },
    transitionProperty: {
      none: "none",
      all: "all",
      DEFAULT:
        "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
      colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
      opacity: "opacity",
      shadow: "box-shadow",
      transform: "transform"
    },
    transitionTimingFunction: {
      DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      linear: "linear",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
    },
    translate: ({ theme }) => ({
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      full: "100%"
    }),
    width: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      "1/12": "8.333333%",
      "2/12": "16.666667%",
      "3/12": "25%",
      "4/12": "33.333333%",
      "5/12": "41.666667%",
      "6/12": "50%",
      "7/12": "58.333333%",
      "8/12": "66.666667%",
      "9/12": "75%",
      "10/12": "83.333333%",
      "11/12": "91.666667%",
      full: "100%",
      screen: "100vw",
      min: "min-content",
      max: "max-content",
      fit: "fit-content"
    }),
    willChange: {
      auto: "auto",
      scroll: "scroll-position",
      contents: "contents",
      transform: "transform"
    },
    zIndex: {
      auto: "auto",
      0: "0",
      10: "10",
      20: "20",
      30: "30",
      40: "40",
      50: "50"
    }
  };

  function isRadius(currentToken) {
    return currentToken.type === "custom-radius";
  }

  function isSpacing(currentToken) {
    return currentToken.type === "custom-spacing";
  }

  function isShadow(currentToken) {
    return currentToken.type === "custom-shadow";
  }

  function isReferenceColor(currentToken) {
    return currentToken.attributes.category === "color" && currentToken.attributes.type === "reference";
  }

  function isBreakpoint(currentToken) {
    return currentToken.attributes.category === "breakpoint";
  }

  // function isTypography(currentToken) {
  //   return currentToken.attributes.category === "typography";
  // }

  // eslint-disable-next-line array-callback-return
  dictionaryTokens.map((currentToken) => {
    if (isBreakpoint(currentToken)) {
      screens[currentToken.attributes.type] = `${currentToken.value}px`;
      configTheme.screens = screens;
    }

    if (isShadow(currentToken)) {
      if (currentToken.attributes.subitem === "0") {
        value = `${currentToken.value.offsetX}px ${currentToken.value.offsetY}px ${currentToken.value.radius}px ${currentToken.value.spread}px ${currentToken.value.color}, `;

        shadowItem.attributes = currentToken.attributes;
      } else if (
        currentToken.attributes.subitem === "1" &&
        shadowItem.attributes.item === currentToken.attributes.item
      ) {
        value += `${currentToken.value.offsetX}px ${currentToken.value.offsetY}px ${currentToken.value.radius}px ${currentToken.value.spread}px ${currentToken.value.color}, `;
        shadowItem.attributes = currentToken.attributes;
      } else if (
        currentToken.attributes.subitem === "2" &&
        shadowItem.attributes.item === currentToken.attributes.item
      ) {
        shadowItem.attributes = {};
        value += `${currentToken.value.offsetX}px ${currentToken.value.offsetY}px ${currentToken.value.radius}px ${currentToken.value.spread}px ${currentToken.value.color}`;

        const size = {
          "01": () => "sm",
          "02": () => "DEFAULT",
          "03": () => "md",
          "04": () => "lg",
          "05": () => "xl",
        }[currentToken.attributes.item]();

        boxShadow[size] = value;
        configTheme.boxShadow = boxShadow;
      }
    }

    if (isReferenceColor(currentToken)) {
      colorGroup[`${currentToken.attributes.item}`][`${currentToken.attributes.subitem.replace(/^([a-z]+)/ig, '')}`] = currentToken.value;

      configTheme.colors = colorGroup;
    }

    if (isSpacing(currentToken)) {
      spacing[currentToken.attributes.type] = `${currentToken.value.top / fontSizeDEFAULT}rem`;
      configTheme.spacing = spacing;
    }

    if(isRadius(currentToken)) {
      if (currentToken.attributes.type === "sm") {
        currentToken.attributes.type = "DEFAULT";
      }
      radii[currentToken.attributes.type] = `${currentToken.value.topLeft / fontSizeDEFAULT}rem`;
      configTheme.borderRadius = radii;
    }

    // if (isTypography(currentToken)) {

    // }
  });

  const config = { ...defaultTheme, ...configTheme }

  return serialize(config);
}

function mapDictionaryToCssVariables(dictionary) {
  let value;
  const previousToken = {};

  // eslint-disable-next-line consistent-return, array-callback-return
  return dictionary.allTokens.map((currentToken) => {
    if (currentToken.type === "color" && currentToken.attributes.type === "reference") {
      return `  --${currentToken.attributes.item}-${currentToken.attributes.subitem.replace(/^([a-z]+)/ig, '')}: ${currentToken.value};\n`;
    } else if (currentToken.type === "custom-shadow") {
      if (currentToken.attributes.subitem === "0") {
        value = `${currentToken.value.offsetX}px ${currentToken.value.offsetY}px ${currentToken.value.radius}px ${currentToken.value.spread}px ${currentToken.value.color}, `;

        previousToken.attributes = currentToken.attributes;
      } else if (
        currentToken.attributes.subitem === "1" &&
        previousToken.attributes.item === currentToken.attributes.item
      ) {
        value += `${currentToken.value.offsetX}px ${currentToken.value.offsetY}px ${currentToken.value.radius}px ${currentToken.value.spread}px ${currentToken.value.color}, `;
        previousToken.attributes = currentToken.attributes;
      } else if (
        currentToken.attributes.subitem === "2" &&
        previousToken.attributes.item === currentToken.attributes.item
      ) {
        previousToken.attributes = {};
        value += `${currentToken.value.offsetX}px ${currentToken.value.offsetY}px ${currentToken.value.radius}px ${currentToken.value.spread}px ${currentToken.value.color}`;

        return `  --elevation-${currentToken.attributes.item}: ${value};\n`;
      }
    } else if (currentToken.type === "custom-spacing") {
      value = currentToken.value.left;

      return `  --${currentToken.name}: ${value / 16}rem;\n`;
    } else if (currentToken.type === "custom-radius") {
      value = currentToken.value.topLeft;

      return `  --${currentToken.name}: ${value / 16}rem;\n`;
    } else if (currentToken.type === "custom-grid") {
      const columnGutterWidth = currentToken.value.gutterSize;
      const columnCount = currentToken.value.count;
      const columnMarginWidth = currentToken.value.offset;

      return `  --${currentToken.attributes.category}-${
        currentToken.attributes.type
      }-column-gutter-size: ${columnGutterWidth / 16}rem;
  --${currentToken.attributes.category}-${
        currentToken.attributes.type
      }-column-count: ${columnCount};
  --${currentToken.attributes.category}-${currentToken.attributes.type}-column-margin: ${
        currentToken.attributes.type === "1440" ? "auto" : `${columnMarginWidth / 16}rem`
      };\n`;
    } else {
      value = currentToken.value;

      return `  --${currentToken.name}: ${value};\n`;
    }
  });
}

StyleDictionary.registerTransform({
  name: "shadow/hex8ToRgba",
  transitive: true,
  type: "value",
  matcher: (token) => token.type === "custom-shadow",
  transformer: (token) => {
    const origValues = token.value || {};
    const color = Color(token.value.color);

    if (color.getAlpha() === 1) {
      return color.toHexString();
    }

    return {
      ...origValues,
      ...{
        color: color.toRgbString().replace(/^(rgba\(\d{1,3}), (\d{1,3}), (\d{1,3})(, )(.+\))$/g, "$1 $2 $3 / $5")
      }
    };
  }
});

StyleDictionary.registerFormat({
  name: "cssInTs",
  formatter: ({ dictionary, file }) => {
    return (
      `${fileHeader({ file })}import { css } from "lit";\n\n` +
      `export const lightThemeStyles = css\`\n` +
      `:root,\n` +
      `:host,\n` +
      `:host::after,\n` +
      `:host::before {\n${mapDictionaryToCssVariables(dictionary).join("")}}\`;\n`
    );
  }
});

StyleDictionary.registerFormat({
  name: "javascript/stub",
  formatter: ({ dictionary }) => {
    return prettier.format(
      `/* eslint-disable no-undef */\n/** @type {import('@aileron/styles').Config} */\n` +
      `module.exports = {\n` +
      `  content: [],\n` +
      `  presets: [],\n` +
      `  darkMode: "media",\n` +
      `  theme: ${mapDictionaryToConfig(dictionary)},\n` +
      `  variantOrder: [
    "first",
    "last",
    "odd",
    "even",
    "visited",
    "checked",
    "empty",
    "read-only",
    "group-hover",
    "group-focus",
    "focus-within",
    "hover",
    "focus",
    "focus-visible",
    "active",
    "disabled"
  ],\n` +
    `  plugins: [],\n` +
    `};\n`, {
      parser: "babel",
    });
  }
});

StyleDictionary.registerFormat({
  name: "css",
  formatter: ({ dictionary, file }) => {
    return `${fileHeader({ file })}:root {\n${mapDictionaryToCssVariables(dictionary).join("")}}\n`;
  }
});

module.exports = {
  source: ["./tokens/default.tokens.json"],
  platforms: {
    ts: {
      transformGroup: "js",
      transforms: [
        "attribute/cti",
        "attribute/color",
        "name/cti/camel",
        "color/css",
        "size/rem",
        "shadow/hex8ToRgba"
      ],
      buildPath: "./src/themes/",
      files: [
        {
          format: "javascript/es6",
          destination: `${tokenTheme}.tokens.ts`
        },
        {
          format: "typescript/es6-declarations",
          destination: `${tokenTheme}.tokens.d.ts`
        }
      ]
    },
    css: {
      transformGroup: "css",
      transforms: [
        "attribute/cti",
        "attribute/color",
        "name/cti/kebab",
        "color/css",
        "size/rem",
        "shadow/hex8ToRgba"
      ],
      buildPath: "./src/themes/",
      files: [
        {
          format: "cssInTs",
          destination: `${tokenTheme}.styles.ts`
        },
        {
          format: "css",
          destination: `../../dist/${tokenTheme}.styles.css`
        }
      ]
    },
    js: {
      transformGroup: "js",
      transforms: [
        "attribute/cti",
        "attribute/color",
        "name/cti/camel",
        "color/css",
        "size/rem",
        "shadow/hex8ToRgba"
      ],
      buildPath: "./stubs/",
      files: [
        {
          format: "javascript/stub",
          destination: "aileron-config.stub.js"
        }
      ]
    }
  }
};
