var fs = require('fs');
var path = require('path');
var async = require('async');
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

  async.parallel([
    function(step) {
      datasets.scanDirectory(sourcePath, step);
    },
    function(step) {
      partials.scanDirectory(sourcePath, step);
    },
    function(step) {
      layouts.scanDirectory(sourcePath, step);
    },
    function(step) {
      pages.scanDirectory(sourcePath, step);
    }
  ], callback);

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
  var self = this;
  var queue = Object.keys(pages.pages);
  var globalData = this.templateData();

  async.each(queue, function(item, step) {
    var page = pages.pages[item];
    var data = _.extend({}, globalData);
    var target = path.join(outputPath, page.path);
    var layout = layouts.layouts[page.data.layout];

    data.page = _.extend({}, page.data, {
      url: page.path,
      filename: page.filename
    });

    data.content = page.template(data);
    var render = layout.template(data);

    self.saveToDisk(render, target, step);

  }, callback);
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
      callback(err);
    }
    else {
      fs.writeFile(target, data, callback);
    }
  });
};