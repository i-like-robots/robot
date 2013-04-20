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
 * Load data
 * @param {String} root
 * @param {Function} callback
 */
exports.loadData = function(root, callback) {
  var self = this;
  var target = path.join(root, 'data');

  reader.scanDirectory(target, function(err, files) {
    var i, len;
    var fail = null;

    if (err) {
      return callback(err);
    }

    var filtered = reader.filterByFileType(files, ['.json', '.js', '.yaml', '.yml']);

    for (i = 0, len = filtered.length; i < len; i++) {
      fail = self.addData(filtered[i]);

      if (fail) {
        break;
      }
    }

    callback(fail);
  });
};