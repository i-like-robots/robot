var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');
var utils = require('./utils');
var walkdir = require('walkdir');
var handlebars = require('handlebars');

/**
 * Pages
 * @type {Object}
 */
this.pages = {};

/**
 * Scan Directory
 * @param {String} rootPath
 * @param {Function} callback
 */
module.exports.scanDirectory = function(rootPath, callback) {
  var self = this;
  var queue = new utils.Queue(callback);
  var pagePath = path.join(rootPath, 'pages');
  var walker = walkdir(pagePath);

  walker.on('file', function(file) {
    var ext = path.extname(file);
    var relPath = path.relative(pagePath, file);

    if (['.htm', '.html'].indexOf(ext) >= 0) {
      self.readPage.call(self, file, relPath, queue.wait());
    }
  });
};

/**
 * Read Page
 * @param {String} file
 * @param {String} relPath
 * @param {Function} callback
 */
module.exports.readPage = function(file, relPath, callback) {
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
      template: handlebars.compile(dataParts.template)
    };

    callback();
  });
};

/**
 * Parse Front Matter
 * @param {String} template
 * @return {Object}
 */
module.exports.parseFrontMatter = function(template) {
  var split = template.trim().match(/^\-{3,}([\w\W]+)\-{3,}([\w\W]+)$/);

  if (!split.length || split.length !== 3) {
    // TODO: throw
  }

  return {
    data: yaml.load(split[1]),
    template: split[2]
  };
};