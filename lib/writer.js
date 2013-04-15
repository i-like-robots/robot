var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
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
 * Write to disk
 * @param {String} target
 * @param {String} data
 * @param {Function} callback
 */
exports.writeToDisk = function(target, data, callback) {
  mkdirp(path.dirname(target), function(err) {
    if (err) {
      callback(err);
    }
    else {
      fs.writeFile(target, data, callback);
    }
  });
};