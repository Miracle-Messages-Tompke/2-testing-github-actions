/* eslint-disable no-undef */

const base = require("../../jest.config.base.js");

module.exports = {
  ...base,
  roots: ["<rootDir>"],
  testEnvironment: "jsdom"
};
