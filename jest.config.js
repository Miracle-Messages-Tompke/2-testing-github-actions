/* eslint-disable no-undef */

const base = require("./jest.config.base.js");

module.exports = {
  ...base,
  roots: ["<rootDir>"],
  projects: ["<rootDir>/src/components", "<rootDir>/src/internal", "<rootDir>/src/utilities"],
  testEnvironment: "jsdom"
};
