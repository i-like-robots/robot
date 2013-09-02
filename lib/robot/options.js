var path = require('path');

/**
 * Default options
 * @type {Object}
 */
var defaultOptions = {
  source: 'source/',
  output: 'output/',
  append: []
};

/**
 * Options
 * @constructor
 * @param {String} targetPath
 * @param {Object} userOptions
 */
var Options = module.exports = function(targetPath, userOptions) {
  var projectOptions = this.loadProjectOptions(targetPath);

  this.source = userOptions.source || projectOptions.source || defaultOptions.source;
  this.output = userOptions.output || projectOptions.output || defaultOptions.output;
  this.append = userOptions.append || projectOptions.append || defaultOptions.append;

  this.sourcePath = path.join(targetPath, this.source);
  this.outputPath = path.join(targetPath, this.output);
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