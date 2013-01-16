var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var mkdirp = require('mkdirp');

var Sitemap = require('./sitemap');
var Dataset = require('./dataset');
var Renderer = require('./renderer');

/**
 * Robot
 * @constructor
 * @param {String} rootPath
 * @param {Object} CLIConfig
 */
var Robot = module.exports = function(rootPath, CLIConfig) {
  var defaultConfig = require('../default.config.json');
  var localConfig = require( path.join(rootPath, 'config.json') );
  this.options = _.extend({}, defaultConfig, localConfig, CLIConfig);

  this.sourcePath = path.join(rootPath, this.options.source);
  this.outputPath = path.join(rootPath, this.options.output);
};

/**
 * Build
 */
Robot.prototype.build = function(options) {
  var self = this;

  this.readSource(function() {
    console.log("Read complete.");
    self.writeOutput(function(file) {
      console.log("Write complete.");
    });
  });
};

/**
 * Read Source
 * @param {Function} callback
 */
Robot.prototype.readSource = function(callback) {
  var waiting = 0;

  function cycle() {
    waiting--;

    if (!waiting) {
      callback();
    }
  }

  waiting++;
  this.sitemap = new Sitemap(this.sourcePath);
  this.sitemap.scanDirectory(cycle);

  waiting++;
  this.dataset = new Dataset(this.sourcePath);
  this.dataset.scanDirectory(cycle);
};

/**
 * Write Output
 * @param {Function} callback
 */
Robot.prototype.writeOutput = function(callback) {
  var waiting = 0;

  function cycle() {
    waiting--;

    if (!waiting) {
      callback();
    }
  }

  this.renderer = new Renderer(this.sourcePath);

  for (var doc in this.sitemap.documents) {
    waiting++;
    this.renderDocument(this.sitemap.documents[doc], cycle);
  }
};

/**
 * Render Document
 * @param {Document} doc
 * @param {Function} callback
 */
Robot.prototype.renderDocument = function(doc, callback) {
  var renderedOutput = this.renderer.renderTemplate(doc.meta.file, {
    data: this.dataset.documents
    // TODO: sitemap data access
  });

  var target = path.join(this.outputPath, doc.meta.path);

  this.saveFile(target, renderedOutput, function(err) {
    if (err) {
      // TODO: throw
    }

    callback();
  });
};

/**
 * Save File
 * @param {String} target
 * @param {String} data
 * @param {Function} callback
 */
Robot.prototype.saveFile = function(target, data, callback) {
  var dirname = path.dirname(target);

  mkdirp(dirname, function(err) {
    if (err) {
      // TODO: throw
    }

    fs.writeFile(target, data, callback);
  });
};