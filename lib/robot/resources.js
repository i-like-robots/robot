var fs = require('fs');
var path = require('path');
var async = require('async');
var jsyaml = require('js-yaml');
var reader = require('./reader');
var writer = require('./writer');

/**
 * Data library
 * @type {Object}
 * @private
 */
var __data = {};

/**
 * Get data
 * @returns {Object}
 */
exports.getData = function() {
  return __data;
};

/**
 * Add data
 * @param {String} file
 * @returns {Null|Error}
 */
exports.addData = function(file) {
  var ext = path.extname(file);
  var basename = path.basename(file, ext);

  try {
    var data = require(file);
  }
  catch(err) {
    return err;
  }

  __data[basename] = data;
};

/**
 * Scan data
 * @param {String} root
 * @param {Function} callback
 */
exports.scanData = function(root, callback) {
  var self = this;
  var target = path.join(root, 'data');

  reader.scanDirectory(target, function(err, files) {
    if (err) {
      callback(err);
    }
    else {
      var filtered = reader.filterByFileType(files, ['.json', '.js', '.yaml', '.yml']);
      callback(null, filtered);
    }
  });
};

/**
 * Load data
 * @param {Array} files
 * @param {Function} callback
 */
exports.loadData = function(files, callback) {
  var i, len;
  var fail = null;

  for (i = 0, len = files.length; i < len; i++) {
    fail = this.addData(files[i]);

    if (fail) {
      break;
    }
  }

  callback(fail);
};