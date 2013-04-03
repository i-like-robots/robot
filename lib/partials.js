var fs = require('fs');
var path = require('path');
var utils = require('./utils');
var walkdir = require('walkdir');
var handlebars = require('handlebars');

/**
 * Scan Directory
 * @param {String} rootPath
 * @param {Function} callback
 */
module.exports.scanDirectory = function(rootPath, callback) {
  var self = this;
  var queue = new utils.Queue(callback);
  var walker = walkdir(path.join(rootPath, 'partials'));

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
module.exports.readPartial = function(file, basename, callback) {
  fs.readFile(file, 'utf-8', function(err, data) {
    if (err) {
      // TODO: throw
    }

    handlebars.registerPartial(basename, data);
    callback();
  });
};