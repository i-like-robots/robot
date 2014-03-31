var fs = require('fs-extra');
var handlebars = require('handlebars');

/**
 * Prepare template
 * @param {String} template
 * @returns {Object}
 */
exports.prepareTemplate = function(template) {
  return handlebars.compile(template);
};

/**
 * Compile template
 * @param {String|Function} template
 * @param {Object} data
 * @returns {String}
 */
exports.compileTemplate = function(template, data) {
  if (typeof template === 'string') {
    template = this.prepareTemplate(template);
  }

  return template(data);
};

/**
 * Compile page
 * @param  {String|Function} pageTemplate
 * @param  {String|Function} layoutTemplate
 * @param  {Object} data
 * @return {String}
 */
exports.compilePage = function(pageTemplate, layoutTemplate, data) {
  data = data || {};

  var compiled = this.compileTemplate(pageTemplate, data);

  if (layoutTemplate) {
    data.content = compiled;
    compiled = this.compileTemplate(layoutTemplate, data);
  }

  return compiled;
};

/**
 * Write to disk
 * @param {String} target
 * @param {String} data
 * @param {Function} callback
 */
exports.writeToDisk = function(target, data, callback) {
  fs.outputFile(target, data, callback);
};