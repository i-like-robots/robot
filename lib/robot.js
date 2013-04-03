var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var mkdirp = require('mkdirp');
var utils = require('./utils');
var pages = require('./pages');
var layouts = require('./layouts');
var partials = require('./partials');
var datasets = require('./datasets');

/**
 * Read Source
 * @param {String} sourcePath
 * @param {Function} callback
 */
exports.readSource = function(sourcePath, callback) {
  var queue = new utils.Queue(callback);

  [datasets, partials, layouts, pages].forEach(function(type) {
    type.scanDirectory(sourcePath, queue.wait());
  });
};

/**
 * Template Data
 * @return {Object}
 */
exports.templateData = function() {
  var date = new Date();

  return {
    sitemap: {},
    data: datasets.datasets,
    env: {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      datetime: date.toLocaleString(),
      year: date.getFullYear()
    }
  };
};

/**
 * Generate Output
 * @param {String} outputPath
 * @param {Function} callback
 */
exports.generateOutput = function(outputPath, callback) {
  var queue = new utils.Queue(callback);

  var globalData = this.templateData();

  for (var page in pages.pages) {
    var item = pages.pages[page];
    var data = _.extend({}, globalData);
    var target = path.join(outputPath, item.path);
    var layout = layouts.layouts[item.data.layout];

    data.page = _.extend({}, item.data, {
      url: item.path,
      filename: item.filename
    });

    data.content = item.template(data);
    var render = layout.template(data);

    queue.wait();
    this.saveToDisk(render, target, queue.each);
  }
};

/**
 * Save To Disk
 * @param {String} data
 * @param {String} target
 * @param {Function} callback
 */
exports.saveToDisk = function(data, target, callback) {
  var dirname = path.dirname(target);

  mkdirp(dirname, function(err) {
    if (err) {
      // TODO: throw
    }

    fs.writeFile(target, data, callback);
  });
};