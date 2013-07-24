var ncp = require('ncp');
var path = require('path');
var async = require('async');
var Options = require('./robot/options');
var processes = require('./robot/processes');

/**
 * Scratch
 * @param {String} target
 */
module.exports.scratch = function(target) {
  var source = path.join(__dirname, '../skeleton/');

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
 * @param {Object} userOptions
 */
module.exports.compile = function(target, userOptions) {
  var options = new Options(target, userOptions);

  async.waterfall([
    function(step) {
      processes.readResources(options.sourcePath, step);
    },
    function(resources, step) {
      processes.writeOutput(options.outputPath, resources, step);
    }
  ],
  function(err) {
    if (err) {
      console.error('Compile quit due to "%s"', err.message);
      process.exit(1);
    }
    else {
      console.log('Compile finished.');
      process.exit();
    }
  });
};