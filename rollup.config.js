/* eslint-disable no-undef */
import path from "path";
import aileronStyles from "@aileron/styles";
import alias from "@rollup/plugin-alias";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import autoprefixer from "autoprefixer";
import postcss from "postcss";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import esbuild from "rollup-plugin-esbuild";
import litcss from "rollup-plugin-lit-css";
import nodePolyfills from "rollup-plugin-node-polyfills";

const workingDir = path.resolve(__dirname, "../../../");

const cssProcessor = postcss([
  aileronStyles(),
  autoprefixer({
    grid: "autoplace",
    overrideBrowserslist: [">0.2%", "not dead", "ie 11"]
  })
]);

const commonPlugins = [
  alias({
    entries: [
      { find: "@adc/internal", replacement: `${workingDir}/src/internal` },
      { find: "@adc/utilities", replacement: `${workingDir}/src/utilities` },
      { find: "@adc/shared", replacement: `${workingDir}/src/components/shared` },
      { find: "@adc/styles", replacement: `${workingDir}/src/components/styles` }
    ],
    customResolver: nodeResolve({
      extensions: [".ts", ".js"]
    })
  }),
  nodePolyfills(),
  nodeResolve({
    browser: true
  }),
  commonjs({
    include: [/node_modules/]
  }),
  json(),
  litcss({
    include: ["src/*.css"],
    transform: (data) => {
      return cssProcessor.process(data).css.toString();
    },
    uglify: true
  }),
  esbuild({
    include: /\.ts$/,
    exclude: /node_modules/,
    sourceMap: false,
    target: "es2017",
    tsconfig: path.resolve(workingDir, "tsconfig.json"),
    loaders: { ".ts": "ts" }
  }),
  babel({
    babelHelpers: "bundled",
    extensions: [".ts"],
    exclude: "node_modules/**"
  })
];

export function main(pkg, config = {}) {
  const defaultConfig = {
    input: ["index.ts"],
    preserveSymlinks: true,
    preserveEntrySignatures: false,
    output: [
      {
        file: pkg.module,
        format: "es",
        freeze: true,
        exports: "named",
        sourcemap: true
      }
    ],
    external: [
      ...Object.keys(pkg.dependencies || []).concat(Object.keys(pkg.peerDependencies || [])),
      "lit",
      "lit/decorators.js",
      "lit/directives/class-map.js",
      "lit/directives/if-defined.js",
      "lit/directives/live.js",
      "lit/directives/style-map.js",
      "lit/directives/unsafe-html.js"
    ],
    plugins: [...commonPlugins]
  };

  const combinedConfig = { ...defaultConfig, ...config };

  return [combinedConfig];
}

export function cdn(pkg, config = {}) {
  const cdnConfig = {
    input: ["index.ts"],
    preserveSymlinks: true,
    preserveEntrySignatures: false,
    output: [
      {
        file: path.resolve(
          workingDir,
          pkg.module.replace(/^dist\/([a-z-]+)\.js/, `dist/$1@${pkg.version}/$1.js`)
        ),
        format: "es",
        freeze: true,
        exports: "named",
        sourcemap: true
      }
    ],
    plugins: [
      del({
        targets: path.resolve(
          workingDir,
          pkg.module.replace(/^dist\/([a-z-]+)\.js/, `dist/$1@${pkg.version}`)
        ),
        force: true
      }),
      ...commonPlugins,
      copy({
        targets: [
          {
            src: ["dist/*", "!dist/*.js", "!dist/*.map"],
            dest: path.resolve(
              workingDir,
              pkg.module.replace(/^dist\/([a-z-]+)\.js/, `dist/$1@${pkg.version}`)
            )
          }
        ]
      })
    ]
  };

  const combinedConfig = { ...cdnConfig, ...config };

  return [combinedConfig];
}
