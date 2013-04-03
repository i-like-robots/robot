var fs = require('fs');
var path = require('path');
var utils = require('./utils');
var walkdir = require('walkdir');
var handlebars = require('handlebars');

/**
 * Partials
 * @constructor
 * @param {String} rootPath
 */
var Partials = module.exports = function(rootPath) {
  this.partialsPath = path.join(rootPath, 'partials');
};

/**
 * Scan Directory
 * @param {Function} callback
 */
Partials.prototype.scanDirectory = function(callback) {
  var self = this;
  var queue = new utils.Queue(callback);
  var walker = walkdir(this.partialsPath);

  walker.on('file', function(file) {
    var ext = path.extname(file);
    var basename = path.basename(file, ext);

    if (['.htm', '.html'].indexOf(ext) >= 0) {
      self.readPartial.call(self, file, basename, queue.wait());
    }
  });
};

/**
 * Read Partial
 * @param {String} file
 * @param {String} basename
 * @param {Function} callback
 */
Partials.prototype.readPartial = function(file, basename, callback) {
  fs.readFile(file, 'utf-8', function(err, data) {
    if (err) {
      // TODO: throw
    }

    handlebars.registerPartial(basename, data);
    callback();
  });
};