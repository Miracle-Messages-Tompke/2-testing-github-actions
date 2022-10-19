import log from "./log.js";

export function validateConfig(config) {
  if (config.content.files.length === 0) {
    log.warn("content-problems", [
      "The `content` option in your @aileron/styles configuration is missing or empty.",
      "Configure your content sources or your generated CSS will be missing styles.",
      "https://aileron.aa.com/docs/content-configuration"
    ]);
  }

  return config;
}
