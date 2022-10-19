/* eslint-disable no-undef */

module.exports = function(plop) {
  const generators = ['component'];

  for (const g of generators) {
    require(`${__dirname}/generators/${g}`)(plop);
  }
};
