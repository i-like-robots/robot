var fs = require('fs');
var path = require('path');
var utils = require('./utils');
var walkdir = require('walkdir');
var handlebars = require('handlebars');

/**
 * Layouts
 * @constructor
 * @param {String} rootPath
 */
var Layouts = module.exports = function(rootPath) {
  this.layouts = {};
  this.layoutsPath = path.join(rootPath, 'layouts');
};

/**
 * Scan Directory
 * @param {Function} callback
 */
Layouts.prototype.scanDirectory = function(callback) {
  var self = this;
  var queue = new utils.Queue(callback);
  var walker = walkdir(this.layoutsPath);

  walker.on('file', function(file) {
    var ext = path.extname(file);
    var basename = path.basename(file, ext);

    if (['.htm', '.html'].indexOf(ext) >= 0) {
      queue.wait();
      self.readLayout.call(self, file, basename, queue.each);
    }
  });
};

/**
 * Read Layout
 * @param {String} file
 * @param {String} basename
 * @param {Function} callback
 */
Layouts.prototype.readLayout = function(file, basename, callback) {
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