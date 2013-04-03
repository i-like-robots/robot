var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var mkdirp = require('mkdirp');
var utils = require('./utils');

/**
 * Robot
 * @constructor
 * @param {String} projectPath
 * @param {Object} CLIConfig
 */
var Robot = module.exports = function(projectPath, CLIConfig) {
  var defaultConfig = require('../defaults.json');
  var localConfig = require( path.join(projectPath, 'robot.json') );
  this.options = _.extend({}, defaultConfig, localConfig, CLIConfig);
  this.sourcePath = path.join(projectPath, this.options.source);
  this.outputPath = path.join(projectPath, this.options.output);
};

/**
 * Compile
 */
Robot.prototype.compile = function() {
  var self = this;

  this.readSource(function() {
    console.log('Source read from %s', self.sourcePath);
    self.generateOutput(function() {
      console.log('Output written to %s', self.outputPath);
    });
  });
};

/**
 * Read Source
 * @param {Function} callback
 */
Robot.prototype.readSource = function(callback) {
  var self = this;
  var queue = new utils.Queue(callback);

  ['datasets', 'partials', 'layouts', 'pages'].forEach(function(type) {
    self[type] = require('./' + type);
    self[type].scanDirectory(self.sourcePath, queue.wait());
  });
};

/**
 * Template Data
 * @return {Object}
 */
Robot.prototype.templateData = function() {
  var date = new Date();

  return {
    sitemap: {},
    data: this.datasets.datasets,
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
 * @param {String} data
 * @param {String} target
 * @param {Function} callback
 */
Robot.prototype.saveToDisk = function(data, target, callback) {
  var dirname = path.dirname(target);

  mkdirp(dirname, function(err) {
    if (err) {
      // TODO: throw
    }

    fs.writeFile(target, data, callback);
  });
};