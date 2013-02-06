var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');
var utils = require('./utils');
var walkdir = require('walkdir');
var mustache = require('mustache');

/**
 * Pages
 * @constructor
 * @param {String} rootPath
 */
var Pages = module.exports = function(rootPath) {
  this.pages = {};
  this.pagesPath = path.join(rootPath, 'pages');
};

/**
 * Scan Directory
 * @param {Function} callback
 */
Pages.prototype.scanDirectory = function(callback) {
  var self = this;
  var queue = new utils.Queue(callback);
  var walker = walkdir(this.pagesPath);

  walker.on('file', function(file) {
    var ext = path.extname(file);
    var relPath = path.relative(self.pagesPath, file);

    if (['.htm', '.html'].indexOf(ext) >= 0) {
      queue.wait();
      self.readPage.call(self, file, relPath, queue.each);
    }
  });
};

/**
 * Read Page
 * @param {String} file
 * @param {String} relPath
 * @param {Function} callback
 */
Pages.prototype.readPage = function(file, relPath, callback) {
  var self = this;

  fs.readFile(file, 'utf-8', function(err, data) {
    if (err) {
      // TODO: throw
    }

    var dataParts = self.parseFrontMatter(data);

    self.pages[relPath] = {
      raw: data,
      path: relPath,
      data: dataParts.data,
      filename: path.basename(relPath),
      template: mustache.compile(dataParts.template)
    };

    callback();
  });
};

/**
 * Parse Front Matter
 * @param {String} template
 * @return {Object}
 */
Pages.prototype.parseFrontMatter = function(template) {
  var split = template.trim().match(/^\-{3,}([\w\W]+)\-{3,}([\w\W]+)$/);

  if (!split.length || split.length !== 3) {
    // TODO: throw
  }

  return {
    data: yaml.load(split[1]),
    template: split[2]
  };
};