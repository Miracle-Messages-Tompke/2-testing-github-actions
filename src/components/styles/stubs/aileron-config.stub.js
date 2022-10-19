/* eslint-disable no-undef */
/** @type {import('@aileron/styles').Config} */
module.exports = {
  content: [],
  presets: [],
  darkMode: "media",
  theme: {
    columns: {
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
      auto: "auto",
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
      "7xl": "80rem",
    },
    animation: {
      none: "none",
      spin: "spin 1s linear infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      bounce: "bounce 1s infinite",
    },
    aspectRatio: { auto: "auto", square: "1 \u002F 1", video: "16 \u002F 9" },
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
      top: "top",
    },
    backgroundSize: { auto: "auto", cover: "cover", contain: "contain" },
    borderColor: ({ theme }) => ({
      ...theme("colors"),
      DEFAULT: theme("colors.neutral.070", "currentColor"),
    }),
    borderSpacing: ({ theme }) => ({
      ...theme("spacing"),
    }),
    borderWidth: { 0: "0px", 2: "2px", 4: "4px", 8: "8px", DEFAULT: "1px" },
    boxShadowColor: ({ theme }) => theme("colors"),
    content: { none: "none" },
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
      "zoom-out": "zoom-out",
    },
    divideColor: ({ theme }) => theme("colors"),
    divideWidth: ({ theme }) => theme("borderWidth"),
    fill: ({ theme }) => theme("colors"),
    invert: { 0: "0", DEFAULT: "100%" },
    flex: { 1: "1 1 0%", auto: "1 1 auto", initial: "0 1 auto", none: "none" },
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
      full: "100%",
    }),
    flexGrow: { 0: "0", DEFAULT: "1" },
    flexShrink: { 0: "0", DEFAULT: "1" },
    fontWeight: {
      thin: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
    gap: ({ theme }) => theme("spacing"),
    gridAutoColumns: {
      auto: "auto",
      min: "min-content",
      max: "max-content",
      fr: "minmax(0, 1fr)",
    },
    gridAutoRows: {
      auto: "auto",
      min: "min-content",
      max: "max-content",
      fr: "minmax(0, 1fr)",
    },
    gridColumn: {
      auto: "auto",
      "span-1": "span 1 \u002F span 1",
      "span-2": "span 2 \u002F span 2",
      "span-3": "span 3 \u002F span 3",
      "span-4": "span 4 \u002F span 4",
      "span-5": "span 5 \u002F span 5",
      "span-6": "span 6 \u002F span 6",
      "span-7": "span 7 \u002F span 7",
      "span-8": "span 8 \u002F span 8",
      "span-9": "span 9 \u002F span 9",
      "span-10": "span 10 \u002F span 10",
      "span-11": "span 11 \u002F span 11",
      "span-12": "span 12 \u002F span 12",
      "span-full": "1 \u002F -1",
    },
    gridColumnEnd: {
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
      13: "13",
      auto: "auto",
    },
    gridColumnStart: {
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
      13: "13",
      auto: "auto",
    },
    gridRow: {
      auto: "auto",
      "span-1": "span 1 \u002F span 1",
      "span-2": "span 2 \u002F span 2",
      "span-3": "span 3 \u002F span 3",
      "span-4": "span 4 \u002F span 4",
      "span-5": "span 5 \u002F span 5",
      "span-6": "span 6 \u002F span 6",
      "span-full": "1 \u002F -1",
    },
    gridRowStart: {
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      auto: "auto",
    },
    gridRowEnd: {
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      auto: "auto",
    },
    gridTemplateColumns: {
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
      12: "repeat(12, minmax(0, 1fr))",
      none: "none",
    },
    gridTemplateRows: {
      1: "repeat(1, minmax(0, 1fr))",
      2: "repeat(2, minmax(0, 1fr))",
      3: "repeat(3, minmax(0, 1fr))",
      4: "repeat(4, minmax(0, 1fr))",
      5: "repeat(5, minmax(0, 1fr))",
      6: "repeat(6, minmax(0, 1fr))",
      none: "none",
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
      fit: "fit-content",
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
      full: "100%",
    }),
    listStyleType: { none: "none", disc: "disc", decimal: "decimal" },
    margin: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
    }),
    maxHeight: ({ theme }) => ({
      ...theme("spacing"),
      full: "100%",
      screen: "100vh",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
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
      ...breakpoints(theme("screens")),
    }),
    minHeight: {
      0: "0px",
      full: "100%",
      screen: "100vh",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
    },
    minWidth: {
      0: "0px",
      full: "100%",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
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
      top: "top",
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
      100: "1",
    },
    order: {
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
      first: "-9999",
      last: "9999",
      none: "0",
    },
    padding: ({ theme }) => theme("spacing"),
    placeholderColor: ({ theme }) => theme("colors"),
    outlineColor: ({ theme }) => theme("colors"),
    outlineOffset: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" },
    outlineWidth: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" },
    rotate: {
      0: "0deg",
      1: "1deg",
      2: "2deg",
      3: "3deg",
      6: "6deg",
      12: "12deg",
      45: "45deg",
      90: "90deg",
      180: "180deg",
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
      150: "1.5",
    },
    scrollMargin: ({ theme }) => ({
      ...theme("spacing"),
    }),
    scrollPadding: ({ theme }) => theme("spacing"),
    skew: {
      0: "0deg",
      1: "1deg",
      2: "2deg",
      3: "3deg",
      6: "6deg",
      12: "12deg",
    },
    space: ({ theme }) => ({
      ...theme("spacing"),
    }),
    stroke: ({ theme }) => theme("colors"),
    strokeWidth: { 0: "0", 1: "1", 2: "2" },
    textColor: ({ theme }) => theme("colors"),
    textDecorationColor: ({ theme }) => theme("colors"),
    textDecorationThickness: {
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px",
      auto: "auto",
      "from-font": "from-font",
    },
    textUnderlineOffset: {
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px",
      auto: "auto",
    },
    textIndent: ({ theme }) => ({
      ...theme("spacing"),
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
      "top-left": "top left",
    },
    transitionDelay: {
      75: "75ms",
      100: "100ms",
      150: "150ms",
      200: "200ms",
      300: "300ms",
      500: "500ms",
      700: "700ms",
      1000: "1000ms",
    },
    transitionDuration: {
      75: "75ms",
      100: "100ms",
      150: "150ms",
      200: "200ms",
      300: "300ms",
      500: "500ms",
      700: "700ms",
      1000: "1000ms",
      DEFAULT: "150ms",
    },
    transitionProperty: {
      none: "none",
      all: "all",
      DEFAULT:
        "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
      colors:
        "color, background-color, border-color, text-decoration-color, fill, stroke",
      opacity: "opacity",
      shadow: "box-shadow",
      transform: "transform",
    },
    transitionTimingFunction: {
      DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      linear: "linear",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    translate: ({ theme }) => ({
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      full: "100%",
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
      fit: "fit-content",
    }),
    willChange: {
      auto: "auto",
      scroll: "scroll-position",
      contents: "contents",
      transform: "transform",
    },
    zIndex: {
      0: "0",
      10: "10",
      20: "20",
      30: "30",
      40: "40",
      50: "50",
      auto: "auto",
    },
    screens: { xs: "390px", sm: "800px", md: "1280px", lg: "1440px" },
    spacing: {
      0: "0px",
      2: "0.125rem",
      4: "0.25rem",
      8: "0.5rem",
      12: "0.75rem",
      16: "1rem",
      24: "1.5rem",
      32: "2rem",
      36: "2.25rem",
      40: "2.5rem",
      48: "3rem",
      64: "4rem",
      80: "5rem",
      96: "6rem",
      180: "11.25rem",
      px: "1px",
    },
    borderRadius: {
      none: "0px",
      full: "9999px",
      DEFAULT: "0.25rem",
      lg: "0.5rem",
    },
    colors: {
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
      neutral: {
        100: "#e6eaef",
        110: "#eceff3",
        120: "#f3f5f7",
        130: "#f9fafb",
        140: "#ffffff",
        "090": "#b4c1cf",
        "080": "#8398af",
        "070": "#637e9c",
        "060": "#50657c",
        "050": "#405164",
        "040": "#303d4b",
        "030": "#28323e",
        "020": "#202832",
        "010": "#181e25",
        "000": "#101419",
      },
      red: {
        100: "#fbe0e3",
        110: "#fbe4e7",
        120: "#fcedef",
        130: "#fef6f7",
        140: "#ffffff",
        "080": "#e96776",
        "070": "#e33b4e",
        "060": "#cd1d32",
        "040": "#74111c",
        "030": "#620e18",
        "020": "#500b14",
        "010": "#3e090f",
        "000": "#2d060b",
      },
      blue: {
        100: "#d8e9fd",
        110: "#e2effe",
        120: "#ecf4fe",
        130: "#f5faff",
        140: "#ffffff",
        "090": "#89befa",
        "080": "#3b93f7",
        "070": "#0a78f5",
        "060": "#0860c4",
        "050": "#074d9d",
        "040": "#053976",
        "030": "#043062",
        "020": "#03264e",
        "010": "#021d3c",
        "000": "#021327",
      },
      orange: {
        100: "#fbe4da",
        110: "#fceae3",
        120: "#fdf1ed",
        130: "#fef8f6",
        140: "#ffffff",
        "080": "#ea6f3e",
        "070": "#dc5018",
        "060": "#ae3f13",
        "040": "#6e280c",
        "030": "#5c210a",
        "020": "#491b08",
        "010": "#371406",
        "000": "#250d04",
      },
      green: {
        100: "#dcefdd",
        110: "#e3f2e4",
        120: "#eaf5eb",
        130: "#f1f8f1",
        140: "#ffffff",
        "080": "#52ad55",
        "070": "#418b44",
        "060": "#316833",
        "040": "#244c25",
        "030": "#1d3e1e",
        "020": "#173118",
        "010": "#102311",
        "000": "#0a150a",
      },
    },
    boxShadow: {
      none: "none",
      sm: "0px 3px 1px 0px rgba(0 0 0 \u002F 0.12), 0px 2px 2px 0px rgba(0 0 0 \u002F 0.14), 0px 1px 5px 0px rgba(0 0 0 \u002F 0.2)",
      DEFAULT:
        "0px 1px 18px 0px rgba(0 0 0 \u002F 0.12), 0px 6px 10px 0px rgba(0 0 0 \u002F 0.14), 0px 3px 5px -1px rgba(0 0 0 \u002F 0.2)",
      md: "0px 3px 14px 2px rgba(0 0 0 \u002F 0.12), 0px 8px 10px 1px rgba(0 0 0 \u002F 0.14), 0px 5px 5px -3px rgba(0 0 0 \u002F 0.2)",
      lg: "0px 5px 22px 4px rgba(0 0 0 \u002F 0.12), 0px 12px 17px 2px rgba(0 0 0 \u002F 0.14), 0px 7px 8px -4px rgba(0 0 0 \u002F 0.2)",
      xl: "0px 9px 46px 8px rgba(0 0 0 \u002F 0.12), 0px 24px 38px 3px rgba(0 0 0 \u002F 0.14), 0px 11px 15px -7px rgba(0 0 0 \u002F 0.2)",
    },
  },
  variantOrder: [
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
    "disabled",
  ],
  plugins: [],
};
