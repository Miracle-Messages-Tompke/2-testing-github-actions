/* eslint-disable func-names, no-undef */

const fs = require('fs').promises;
const prettier = require("prettier");
const {
  buildPath,
  resolveFileName,
  baseAction,
  getTemplatePath
} = require('./base');


module.exports = function(plop) {
  const prefix = 'adc';
  const {version} = require('../../lerna.json');

  plop.setGenerator('component', {
    description: 'Create a new lit component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is the name of the component?',
    }],
    actions(data) {
      const {
        name
      } = data;

      const fileName = resolveFileName(name);

      return [{
        ...baseAction(),
        data: { prefix },
        path: buildPath(`../src/components/${fileName}/src/${fileName}.component.ts`),
        templateFile: getTemplatePath('component/component')
      }, {
        ...baseAction(),
        data: { prefix },
        path: buildPath(`../src/components/${fileName}/README.md`),
        templateFile: getTemplatePath('component/component.readme')
      }, {
        ...baseAction(),
        data: { prefix },
        path: buildPath(`../src/components/${fileName}/.stylelint.rc`),
        templateFile: getTemplatePath('component/component.stylelint.rc')
      }, {
        ...baseAction(),
        data: { prefix },
        path: buildPath(`../src/components/${fileName}/tsconfig.types.json`),
        templateFile: getTemplatePath('component/component.tsconfig')
      }, {
        ...baseAction(),
        data: { prefix },
        path: buildPath(`../src/components/${fileName}/rollup.cdn.config.js`),
        templateFile: getTemplatePath('component/component.rollup.cdn')
      }, {
        ...baseAction(),
        data: { prefix },
        path: buildPath(`../src/components/${fileName}/rollup.config.js`),
        templateFile: getTemplatePath('component/component.rollup')
      }, {
        ...baseAction(),
        data: { prefix },
        path: buildPath(`../src/components/${fileName}/jest.config.json`),
        templateFile: getTemplatePath('component/component.jest.config')
      }, {
        ...baseAction(),
        data: { prefix },
        path: buildPath(`../src/components/${fileName}/jest.styleliint.config.js`),
        templateFile: getTemplatePath('component/component.jest.stylelint')
      }, {
        ...baseAction(),
        path: buildPath(`../src/components/${fileName}/index.ts`),
        templateFile: getTemplatePath('component/component.index')
      }, {
        ...baseAction(),
        data: { version },
        path: buildPath(`../src/components/${fileName}/package.json`),
        templateFile: getTemplatePath('component/component.package')
      }, {
        ...baseAction(),
        data: { prefix },
        path: buildPath(`../src/components/${fileName}/src/${fileName}.stories.ts`),
        templateFile: getTemplatePath('component/component.stories')
      }, {
        ...baseAction(),
        data: { prefix },
        path: buildPath(`../src/components/${fileName}/src/${fileName}.test.ts`),
        templateFile: getTemplatePath('component/component.test')
      }, {
        ...baseAction(),
        path: buildPath(`../src/components/${fileName}/src/${fileName}.styles.ts`),
        templateFile: getTemplatePath('component/component.styles')
      },
      function writeWorkspaceJson() {
        fs.readFile('./workspace.json')
        .then(body => JSON.parse(body))
        .then(json => {
          const projects = {
            ...json.projects,
            [`@aileron/${fileName}`]: {
              root: `src/components/${fileName}`
            }
          };

          return { version: 2, "projects": projects };
        })
        .then(json => JSON.stringify(json))
        .then(body => fs.writeFile('./workspace.json', prettier.format(body, { parser: "json" })))
        .catch(err => console.warn(err));
      }];
    }
  });
};
