var path = require('path');
var handlebars = require('handlebars');

/**
 * Register helper
 * @param {String} name
 * @param {Function} definition
 */
exports.registerHelper = function(name, definition) {
  //name = /^robot/.exec(name) ? name : 'robot_' + name;
  handlebars.registerHelper(name, definition);
};

/**
 * Load helpers
 * @param {String} target
 * @param {Function} callback
 */
exports.loadHelpers = function(target, callback) {
  var helpers = {};
  var file = path.join(target, 'helpers.js');

  try {
    helpers = require(file);
  }
  catch(e) {
    return callback();
  }

  for (var method in helpers) {
    if (helpers.hasOwnProperty(method)) {
      this.registerHelper(method, helpers[method]);
    }
  }

  callback();
};