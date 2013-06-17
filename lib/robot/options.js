var path = require('path');

/**
 * Default options
 * @type {Object}
 */
var defaults = {
  source: 'source',
  output: 'output'
};

/**
 * Options
 * @constructor
 * @param {String} targetPath
 * @param {Object} options
 */
var Options = module.exports = function(targetPath, options) {
  this.options = {
    source: options.source || defaults.source,
    output: options.output || defaults.output
  };

  this.targetPath = targetPath;
  this.sourcePath = path.join(targetPath, this.options.source);
  this.outputPath = path.join(targetPath, this.options.output);
};