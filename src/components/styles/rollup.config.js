import { main } from "../../../rollup.config.js";
import pkg from "./package.json";

pkg.module = pkg.module.replace("plugin/index", "styles");

export default main(pkg, {
  preserveEntrySignatures: true,
  treeshake: false
});
