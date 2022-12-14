import defaultConfig from "../../../stubs/aileron-config.stub.js";
import { flagEnabled } from "../feature-flags.js";

export default function getAllConfigs(config) {
  const configs = (config?.presets ?? [defaultConfig])
    .slice()
    .reverse()
    .flatMap((preset) => getAllConfigs(preset instanceof Function ? preset() : preset));

  const features = {
    // Add experimental configs here...
    respectDefaultRingColorOpacity: {
      theme: {
        ringColor: {
          DEFAULT: "#3b82f67f"
        }
      }
    }
  };

  const experimentals = Object.keys(features)
    .filter((feature) => flagEnabled(config, feature))
    .map((feature) => features[feature]);

  return [config, ...experimentals, ...configs];
}
