var path = require('path');

/**
 * Default options
 * @type {Object}
 */
var defaultOptions = {
  source: 'source/',
  output: 'output/'
};

/**
 * Options
 * @constructor
 * @param {String} targetPath
 * @param {Object} userOptions
 */
var Options = module.exports = function(targetPath, userOptions) {
  var projectOptions = this.loadProjectOptions(targetPath);

  var mergedOptions = {
    source: userOptions.source || projectOptions.source || defaultOptions.source,
    output: userOptions.output || projectOptions.output || defaultOptions.output
  };

  this.sourcePath = path.join(targetPath, mergedOptions.source);
  this.outputPath = path.join(targetPath, mergedOptions.output);
};

/**
 * Load project options
 * @param {String} targetPath
 * @returns {Object}
 */
Options.prototype.loadProjectOptions = function(targetPath) {
  var options = {};

  try {
    options = require(path.join(targetPath, 'robot.json'));
  }
  catch(err) {
    console.error('Project options could not be loaded.');
  }

  return options;
};

/**
 * Get default options
 * @returns {Object}
 */
Options.prototype.getDefaultOptions = function() {
  return defaultOptions;
};