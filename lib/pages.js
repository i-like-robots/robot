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
exports.pages = {};

/**
 * Scan Directory
 * @param {String} rootPath
 * @param {Function} callback
 */
exports.scanDirectory = function(rootPath, callback) {
  var self = this;
  var queue = new utils.Queue(callback);
  var pagePath = path.join(rootPath, 'pages');
  var walker = walkdir(pagePath);

  walker.on('file', function(file) {
    var ext = path.extname(file);
    var relPath = path.relative(pagePath, file);

    if (['.htm', '.html'].indexOf(ext) >= 0) {
      queue.wait();
      self.readPage.call(self, file, relPath, function(err) {
        if (err) {
          console.error('Error reading %s, "%s"', path.relative(rootPath, file), err.message);
        }

        queue.each();
      });
    }
  });
};

/**
 * Read Page
 * @param {String} file
 * @param {String} relPath
 * @param {Function} callback
 */
exports.readPage = function(file, relPath, callback) {
  var self = this;

  fs.readFile(file, 'utf-8', function(err, data) {
    if (err) {
      return callback(err);
    }

    var page = self.parseFrontMatter(data);

    if (page instanceof Error) {
      return callback(page);
    }

    self.pages[relPath] = {
      path: relPath,
      data: page.data,
      filename: path.basename(relPath),
      template: handlebars.compile(page.template)
    };

    callback();
  });
};

/**
 * Parse Front Matter
 * @param {String} template
 * @return {Object|Error}
 */
exports.parseFrontMatter = function(template) {
  var split = template.trim().match(/^\-{3,}([\w\W]+)\-{3,}([\w\W]+)$/);

  if (!split || split.length !== 3) {
    return new Error('Could not find front matter block');
  }

  try {
    var frontmatter = yaml.load(split[1]);
  }
  catch(err) {
    return new Error('Could not parse front matter data');
  }

  return {
    data: frontmatter,
    template: split[2]
  };
};