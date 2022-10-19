/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import fs from "fs";
import path from "path";
import fastGlob from "fast-glob";
import normalizePath from "normalize-path";
import LRU from "quick-lru";
import resolveConfig from "../public/resolve-config.js";
import hash from "../util/hash-config.js";
import parseDependency from "../util/parse-dependency.js";
import resolveConfigPath from "../util/resolve-config-path.js";
import { validateConfig } from "../util/validate-config.js";
import getModuleDependencies from "./get-module-dependencies.js";
import { getContext, getFileModifiedMap } from "./setup-context-utils.js";
import { env } from "./shared-state.js";

const configPathCache = new LRU({ maxSize: 100 });

const candidateFilesCache = new WeakMap();

function getCandidateFiles(context, aileronConfig) {
  if (candidateFilesCache.has(context)) {
    return candidateFilesCache.get(context);
  }

  const candidateFiles = aileronConfig.content.files
    .filter((item) => typeof item === "string")
    .map((contentPath) => normalizePath(contentPath));

  return candidateFilesCache.set(context, candidateFiles).get(context);
}

// Get the config object based on a path
function getAileronConfig(configOrPath) {
  const userConfigPath = resolveConfigPath(configOrPath);

  if (userConfigPath !== null) {
    const [prevConfig, prevConfigHash, prevDeps, prevModified] =
      configPathCache.get(userConfigPath) || [];

    const newDeps = getModuleDependencies(userConfigPath).map((dep) => dep.file);

    let modified = false;
    const newModified = new Map();
    for (const file of newDeps) {
      const time = fs.statSync(file).mtimeMs;
      newModified.set(file, time);
      if (!prevModified || !prevModified.has(file) || time > prevModified.get(file)) {
        modified = true;
      }
    }

    // It hasn't changed (based on timestamps)
    if (!modified) {
      return [prevConfig, userConfigPath, prevConfigHash, prevDeps];
    }

    // It has changed (based on timestamps), or first run
    for (const file of newDeps) {
      delete require.cache[file];
    }
    let newConfig = resolveConfig(require(userConfigPath));
    newConfig = validateConfig(newConfig);
    const newHash = hash(newConfig);
    configPathCache.set(userConfigPath, [newConfig, newHash, newDeps, newModified]);
    return [newConfig, userConfigPath, newHash, newDeps];
  }

  // It's a plain object, not a path
  let newConfig = resolveConfig(
    configOrPath.config === undefined ? configOrPath : configOrPath.config
  );

  newConfig = validateConfig(newConfig);

  return [newConfig, null, hash(newConfig), []];
}

function resolvedChangedContent(context, candidateFiles, fileModifiedMap) {
  const changedContent = context.aileronConfig.content.files
    .filter((item) => typeof item.raw === "string")
    .map(({ raw, extension = "html" }) => ({ content: raw, extension }));

  for (const changedFile of resolveChangedFiles(candidateFiles, fileModifiedMap)) {
    const content = fs.readFileSync(changedFile, "utf8");
    const extension = path.extname(changedFile).slice(1);
    changedContent.push({ content, extension });
  }
  return changedContent;
}

function resolveChangedFiles(candidateFiles, fileModifiedMap) {
  const changedFiles = new Set();
  env.DEBUG && console.time("Finding changed files");
  const files = fastGlob.sync(candidateFiles);
  for (const file of files) {
    const prevModified = fileModifiedMap.has(file) ? fileModifiedMap.get(file) : -Infinity;
    const modified = fs.statSync(file).mtimeMs;

    if (modified > prevModified) {
      changedFiles.add(file);
      fileModifiedMap.set(file, modified);
    }
  }
  env.DEBUG && console.timeEnd("Finding changed files");
  return changedFiles;
}

// DISABLE_TOUCH = TRUE

// Retrieve an existing context from cache if possible (since contexts are unique per
// source path), or set up a new one (including setting up watchers and registering
// plugins) then return it
export default function setupTrackingContext(configOrPath) {
  return ({ aileronDirectives, registerDependency }) => {
    return (root, result) => {
      const [aileronConfig, userConfigPath, aileronConfigHash, configDependencies] =
        getAileronConfig(configOrPath);

      const contextDependencies = new Set(configDependencies);

      // If there are no @aileron or @apply rules, we don't consider this CSS
      // file or its dependencies to be dependencies of the context. Can reuse
      // the context even if they change. We may want to think about `@layer`
      // being part of this trigger too, but it's tough because it's impossible
      // for a layer in one file to end up in the actual @aileron rule in
      // another file since independent sources are effectively isolated.
      if (aileronDirectives.size > 0) {
        // Add current css file as a context dependencies.
        contextDependencies.add(result.opts.from);

        // Add all css @import dependencies as context dependencies.
        for (const message of result.messages) {
          if (message.type === "dependency") {
            contextDependencies.add(message.file);
          }
        }
      }

      const [context] = getContext(
        root,
        result,
        aileronConfig,
        userConfigPath,
        aileronConfigHash,
        contextDependencies
      );

      const candidateFiles = getCandidateFiles(context, aileronConfig);

      // If there are no @aileron or @apply rules, we don't consider this CSS file or it's
      // dependencies to be dependencies of the context. Can reuse the context even if they change.
      // We may want to think about `@layer` being part of this trigger too, but it's tough
      // because it's impossible for a layer in one file to end up in the actual @aileron rule
      // in another file since independent sources are effectively isolated.
      if (aileronDirectives.size > 0) {
        const fileModifiedMap = getFileModifiedMap(context);

        // Add template paths as postcss dependencies.
        for (const fileOrGlob of candidateFiles) {
          const dependency = parseDependency(fileOrGlob);
          if (dependency) {
            registerDependency(dependency);
          }
        }

        for (const changedContent of resolvedChangedContent(
          context,
          candidateFiles,
          fileModifiedMap
        )) {
          context.changedContent.push(changedContent);
        }
      }

      for (const file of configDependencies) {
        registerDependency({ type: "dependency", file });
      }

      return context;
    };
  };
}
