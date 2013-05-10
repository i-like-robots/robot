var path = require('path');
var _ = require('underscore');

/**
 * Project paths
 * @type {String}
 * @private
 */
var __project, __source, __output;

/**
 * Default options
 * @type {Object}
 * @private
 */
var __default = {
  source: 'source',
  output: 'output'
};

/**
 * Options
 * @type {Object}
 * @private
 */
var __options = {};

/**
 * Load options
 * @param {String} projectPath
 * @param {Object} CLIOpts
 */
exports.loadOptions = function(projectPath, CLIOpts) {
  var local = require(path.join(projectPath, 'robot.json'));
  __options = _.extend({}, __default, local, CLIOpts);
  __project = projectPath;
  __source = path.join(projectPath, __options.source);
  __output = path.join(projectPath, __options.output);
};

/**
 * Get options
 * @returns {Object}
 */
exports.getOptions = function() {
  return __options;
};

/**
 * Get source path
 * @returns {String}
 */
exports.getSource = function() {
  return __source;
};

/**
 * Get output path
 * @returns {String}
 */
exports.getOutput = function() {
  return __output;
};