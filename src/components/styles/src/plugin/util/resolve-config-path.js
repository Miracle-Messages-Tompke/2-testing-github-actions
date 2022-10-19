/* eslint-disable no-empty */
import fs from "fs";
import path from "path";

function isObject(value) {
  return typeof value === "object" && value !== null;
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function isString(value) {
  return typeof value === "string" || value instanceof String;
}

export default function resolveConfigPath(pathOrConfig) {
  // require('@aileron/styles')({ theme: ..., variants: ... })
  if (isObject(pathOrConfig) && pathOrConfig.config === undefined && !isEmpty(pathOrConfig)) {
    return null;
  }

  // require('@aileron/styles')({ config: 'custom-config.js' })
  if (
    isObject(pathOrConfig) &&
    pathOrConfig.config !== undefined &&
    isString(pathOrConfig.config)
  ) {
    return path.resolve(pathOrConfig.config);
  }

  // require('@aileron/styles')({ config: { theme: ..., variants: ... } })
  if (
    isObject(pathOrConfig) &&
    pathOrConfig.config !== undefined &&
    isObject(pathOrConfig.config)
  ) {
    return null;
  }

  // require('@aileron/styles')('custom-config.js')
  if (isString(pathOrConfig)) {
    return path.resolve(pathOrConfig);
  }

  // require('@aileron/styles')
  for (const configFile of ["./aileron.config.js", "./aileron.config.cjs"]) {
    try {
      const configPath = path.resolve(configFile);
      fs.accessSync(configPath);
      return configPath;
    } catch (err) {}
  }

  return null;
}
