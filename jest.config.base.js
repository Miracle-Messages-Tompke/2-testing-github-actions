// eslint-disable-next-line no-undef
module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  transformIgnorePatterns: ["node_modules/(?!(lit-html|lit-element|lit|@lit|@web)/)"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": [
      "babel-jest",
      {
        presets: ["@babel/preset-env"],
        plugins: [["@babel/transform-runtime"]]
      }
    ]
  },
  collectCoverage: false,
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/", "jest-test-results.json"],
  coverageDirectory: "<rootDir>/coverage/",
  moduleNameMapper: {
    "@adc/styles": "<rootDir>/../styles",
    "@adc/internal(.*)$": "<rootDir>/../../internal/$1",
    "@adc/utilities(.*)$": "<rootDir>/../../utilities/$1",
    "@adc/shared/src(.*)$": "<rootDir>/../shared/src/$1"
  },
  verbose: true
};
