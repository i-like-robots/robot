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
 * Compile page with layout
 * @param  {String|Function} pageTemplate
 * @param  {String|Function} layoutTemplate
 * @param  {Object} data
 * @return {String}
 */
exports.compilePageWithLayout = function(pageTemplate, layoutTemplate, data) {
  data = data || {};

  data.content = this.compileTemplate(pageTemplate, data);
  return this.compileTemplate(layoutTemplate, data);
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