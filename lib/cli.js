var fs = require('fs-extra');
var Robot = require('./robot');

/**
 * Scratch
 * @param {String} path
 */
module.exports.scratch = function(path) {
  fs.copy('../skeleton/', path, function(err) {
    if (err) {
      // TODO: throw
    }

    console.log('Skeleton copied to ' + path);
  });
};

/**
 * Compile
 * @param {String} path
 * @param {Object} opts
 */
module.exports.compile = function(path, opts) {
  var robot = new Robot(path, opts).compile();
};