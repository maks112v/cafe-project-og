const path = require('path');

const relativeAliases = [
  ['@base', './'],
  ['@components', './components/'],
  ['@hooks', './hooks/'],
  ['@enums', './enums/'],
  ['@types', './types/'],
  ['@public', './public/'],
  ['@styles', './styles/'],
  ['@services', './services/'],
];

const absoluteAliases = {};
relativeAliases.map((alias) => {
  absoluteAliases[alias[0]] = path.resolve(__dirname, alias[1]);
  return null;
});

module.exports.relativeAliases = relativeAliases;
module.exports.absoluteAliases = absoluteAliases;
