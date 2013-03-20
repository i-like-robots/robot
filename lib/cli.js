var ncp = require('ncp');
var Robot = require('./robot');

/**
 * Scratch
 * @param {String} path
 */
module.exports.scratch = function(path) {
  ncp('../skeleton/', path, function(err) {
    if (err) {
      // TODO: throw
    }

    console.log('Project skeleton copied to %s', path);
  });
};

/**
 * Compile
 * @param {String} path
 * @param {Object} opts
 */
module.exports.compile = function(path, opts) {
  new Robot(path, opts).compile();
};