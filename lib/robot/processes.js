var async = require('async');
var Resources = require('./resources');

/**
 * Read resources
 * @param {String} root
 * @param {Function} callback
 */
exports.readResources = function(root, callback) {

  var resources = new Resources(root);

  async.series([
    function(step) {
      resources.scanData(function(err, files) {
        if (err) {
          step(err);
        }
        else {
          resources.loadData(files, step);
        }
      });
    },
    function(step) {
      resources.scanPartials(function(err, files) {
        if (err) {
          step(err);
        }
        else {
          resources.loadPartials(files, step);
        }
      });
    },
    function(step) {
      resources.scanLayouts(function(err, files) {
        if (err) {
          step(err);
        }
        else {
          resources.loadLayouts(files, step);
        }
      });
    },
    function(step) {
      resources.scanPages(function(err, files) {
        if (err) {
          step(err);
        }
        else {
          resources.loadPages(files, step);
        }
      });
    }
  ], function(err) {
    callback(err, resources);
  });
};

/**
 * Write output
 * @param {Object} data
 * @param {Function} callback
 */
exports.writeOutput = function(data, callback) {
};