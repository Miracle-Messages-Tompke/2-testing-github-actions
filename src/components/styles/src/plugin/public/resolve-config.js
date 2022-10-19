import getAllConfigs from "../util/get-all-configs.js";
import resolveConfigObjects from "../util/resolve-config.js";

export default function resolveConfig(...configs) {
  const [, ...defaultConfigs] = getAllConfigs(configs[0]);
  return resolveConfigObjects([...configs, ...defaultConfigs]);
}
