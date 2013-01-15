var path = require('path');
var _ = require('underscore');

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
  this.read(function() {
    console.log("Read complete.");
    self.write(function(file) {
      console.log("Write complete");
    });
  });
};

/**
 * Read
 * @param {Function} callback
 */
Robot.prototype.read = function(callback) {
  var self = this;
  var waiting = 2;

  function cycle() {
    waiting--;

    if (!waiting) {
      callback();
    }
  }

  this.sitemap = new Sitemap(this.options);
  this.sitemap.scan(path.join(this.source, 'pages'), cycle);

  this.dataset = new Dataset(self.options);
  this.dataset.scan(path.join(self.source, 'data'), cycle);
};

/**
 * Write
 * @param {Function} callback
 */
Robot.prototype.write = function(callback) {
  var renderer = new Renderer(this.source);

  var environment = {
    datetime: new Date()
  };

  for (var name in this.sitemap.documents) {

    var doc = this.sitemap.documents[name];
    var saveto = path.join(this.output, name);
    var output = renderer.render(doc.meta.path, {
      env: environment,
      data: this.dataset,
      site: this.options.site,
      page: doc.meta
    });

    renderer.save(saveto, output, function(err) {
      if (err) {
        // TODO: throw
      }

      callback();
    });
  }
};