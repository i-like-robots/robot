var path = require('path');
var fs = require('fs-extra');
var _ = require('underscore');
var utils = require('./utils');

// TODO: move following modules into a unified 'items' loader
var Datasets = require('./datasets');
var Partials = require('./partials');
var Layouts = require('./layouts');
var Pages = require('./pages');

/**
 * Robot
 * @constructor
 * @param {String} rootPath
 * @param {Object} CLIConfig
 */
var Robot = module.exports = function(rootPath, CLIConfig) {
  var defaultConfig = require('../defaults.json');
  var localConfig = require( path.join(rootPath, 'robot.json') );
  this.options = _.extend({}, defaultConfig, localConfig, CLIConfig);

  this.sourcePath = path.join(rootPath, this.options.source);
  this.outputPath = path.join(rootPath, this.options.output);
};

/**
 * Compile
 * @param {Object} options
 */
Robot.prototype.compile = function(options) {
  var self = this;

  this.readSource(function() {
    console.log('Source file read complete.');
    self.generateOutput(function(file) {
      console.log('Output file write complete.');
    });
  });
};

/**
 * Process
 * @param {Object} options
 */
Robot.prototype.process = function(options) {};

/**
 * Read Source
 * @private
 * @param {Function} callback
 */
Robot.prototype.readSource = function(callback) {
  var queue = new utils.Queue(callback, 4);

  this.datasets = new Datasets(this.sourcePath);
  this.datasets.scanDirectory(queue.each);

  this.partials = new Partials(this.sourcePath);
  this.partials.scanDirectory(queue.each);

  this.layouts = new Layouts(this.sourcePath);
  this.layouts.scanDirectory(queue.each);

  this.pages = new Pages(this.sourcePath);
  this.pages.scanDirectory(queue.each);

  // TODO: refactor this into abstracted, less repetitive chunks
};

/**
 * Template Data
 * @private
 * @return {Object}
 */
Robot.prototype.templateData = function() {
  var data = {};

  data.data = this.datasets.datasets;

  var date = new Date();

  data.env = {
    date: date.toLocaleDateString(),
    datetime: date.toLocaleString(),
    year: date.getFullYear(),
    time: date.toLocaleTimeString()
  };

  data.sitemap = {};

  return data;
};

/**
 * Generate Output
 * @private
 * @param {Function} callback
 */
Robot.prototype.generateOutput = function(callback) {
  var queue = new utils.Queue(callback);

  var globalData = this.templateData();

  for (var page in this.pages.pages) {
    var item = this.pages.pages[page];
    var data = _.extend({}, globalData);
    var target = path.join(this.outputPath, item.path);
    var layout = this.layouts.layouts[item.data.layout];

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
 * @private
 * @param {String} data
 * @param {String} target
 * @param {Function} callback
 */
Robot.prototype.saveToDisk = function(data, target, callback) {
  var dirname = path.dirname(target);

  fs.mkdirs(dirname, function(err) {
    if (err) {
      // TODO: throw
    }

    fs.writeFile(target, data, callback);
  });
};