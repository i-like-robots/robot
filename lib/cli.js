var ncp = require('ncp');
var path = require('path');
var Robot = require('./robot');

/**
 * Scratch
 * @param {String} target
 */
module.exports.scratch = function(target) {
  var source = path.join(__dirname, '/../skeleton/');

  ncp(source, target, function(err) {
    if (err) {
      console.log('Project skeleton could not be copied, Error %s', Array.isArray(err) ? err.pop().errno : err.errno );
    }
    else {
        console.log('Project skeleton copied to %s', target);
    }
  });
};

/**
 * Compile
 * @param {String} target
 * @param {Object} opts
 */
module.exports.compile = function(target, opts) {
  new Robot(target, opts).compile();
};