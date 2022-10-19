/* eslint-disable no-undef */

const path = require('path');
const kebabCase = require('lodash.kebabcase');

module.exports = {
  buildPath(name) {
    return path.join(name);
  },
  resolveFileName(name) {
    return kebabCase(name);
  },
  getTemplatePath(template) {
    return `../templates/${template}.txt`;
  }, baseAction() {
    return {
      type: 'add',
      skipIfExists: true,
      force: true
    };
  }
};
