/* eslint-disable no-undef */

const base = require("../../../jest.config.base.js");
const packageJson = require("./package.json");

module.exports = {
  ...base,
  testEnvironment: "jsdom",
  displayName: packageJson.name,
  testMatch: ["**/*.test.ts"]
};
