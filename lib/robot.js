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
 * @param {String} dir
 */
var Robot = module.exports = function(dir, opts) {
  this.dir = path.normalize(dir);

  var defaults = require('./defaults.json');
  var projects = require( path.join(this.dir, 'config.json') );
  this.options = _.extend({}, defaults, projects, opts);

  this.source = path.join(this.dir, this.options.source);
  this.output = path.join(this.dir, this.options.output);
};

/**
 * Build
 * @param {Object} options
 */
Robot.prototype.build = function(options) {
  var self = this;

  // TODO: merge options from CLI
  this.readSource(function() {
    console.log("Read complete.");
    self.writeOutput(function(file) {
      console.log("Write complete.");
    });
  });
};

/**
 * Read source
 * @param {Function} callback
 */
Robot.prototype.readSource = function(callback) {
  var self = this;
  var waiting = 0;

  function cycle() {
    waiting--;

    if (!waiting) {
      callback();
    }
  }

  waiting++;
  this.sitemap = new Sitemap(this.options);
  this.sitemap.scan(path.join(this.source, 'pages'), cycle);

  waiting++;
  this.dataset = new Dataset(self.options);
  this.dataset.scan(path.join(self.source, 'data'), cycle);
};

/**
 * Write output
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

  for (var doc in this.sitemap.documents) {
    waiting++;
    this.renderDocument(this.sitemap.documents[doc], cycle);
  }
};

/**
 * Render document
 * @param {Document} doc
 * @param {Function} callback
 */
Robot.prototype.renderDocument = function(doc, callback) {

  if (!this.renderer) {
    this.renderer = new Renderer(this.source);
  }

  var data = this.renderer.renderOutput(doc.meta.file, {
    data: this.dataset.documents,
    site: this.options.site,
    page: doc.meta
  });
  var target = path.join(this.output, doc.meta.path);

  this.saveFile(target, data, function(err) {
    if (err) {
      // TODO: throw
    }

    callback();
  });
};

/**
 * Save file
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