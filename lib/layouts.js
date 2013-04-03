var fs = require('fs');
var path = require('path');
var utils = require('./utils');
var walkdir = require('walkdir');
var handlebars = require('handlebars');

/**
 * Layouts
 * @type {Object}
 */
this.layouts = {};

/**
 * Scan Directory
 * @param {String} rootPath
 * @param {Function} callback
 */
module.exports.scanDirectory = function(rootPath, callback) {
  var self = this;
  var queue = new utils.Queue(callback);
  var walker = walkdir(path.join(rootPath, 'layouts'));

  walker.on('file', function(file) {
    var ext = path.extname(file);
    var basename = path.basename(file, ext);

    if (['.htm', '.html'].indexOf(ext) >= 0) {
      self.readLayout.call(self, file, basename, queue.wait());
    }
  });
};

/**
 * Read Layout
 * @param {String} file
 * @param {String} basename
 * @param {Function} callback
 */
module.exports.readLayout = function(file, basename, callback) {
  var self = this;

  fs.readFile(file, 'utf-8', function(err, data) {
    if (err) {
      // TODO: throw
    }

    self.layouts[basename] = {
      raw: data,
      template: handlebars.compile(data)
    };

    callback();
  });
};