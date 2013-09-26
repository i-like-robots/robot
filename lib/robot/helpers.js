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
 * Do helpers exist
 * @param {String} target
 */
exports.loadHelpers = function(target) {
  var helpers = {};

  try {
    helpers = require(target);
  }
  catch(e) {
    return;
  }

  for (var method in helpers) {
    if (helpers.hasOwnProperty(method)) {
        this.registerHelper(method, helpers[method]);
    }
  }
};