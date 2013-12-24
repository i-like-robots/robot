var path = require('path');
var reader = require('./reader');
var Page = require('./models/page');
var handlebars = require('handlebars');

/**
 * Resources
 * @constructor
 * @param {String} root
 */
var Resources = module.exports = function(root) {
  this.root = root;
  this._resources = {
    data: {},
    pages: {},
    layouts: {},
    partials: {}
  }
};

/**
 * Get data
 * @returns {Object}
 */
Resources.prototype.getData = function() {
  return this._resources.data;
};

/**
 * Scan data
 * @param {Function} callback
 */
Resources.prototype.scanData = function(callback) {
  var target = path.join(this.root, 'data');

  reader.scanDirectory(target, function(err, files) {
    if (err) {
      callback(err);
    }
    else {
      var filtered = reader.filterByFileType(files, ['.json', '.js', '.yaml', '.yml']);
      callback(null, filtered);
    }
  });
};

/**
 * Load data
 * @param {Array} files
 * @param {Function} callback
 */
Resources.prototype.loadData = function(files, callback) {
  var i, len;
  var fail = null;

  for (i = 0, len = files.length; i < len; i++) {
    fail = this.addData(files[i]);

    if (fail) {
      break;
    }
  }

  callback(fail);
};

/**
 * Add data
 * @param {String} file
 * @returns {Null|Error}
 */
Resources.prototype.addData = function(file) {
  var ext = path.extname(file);
  var basename = path.basename(file, ext);

  try {
    this._resources.data[basename] = require(file);
  }
  catch(err) {
    return err;
  }
};

/**
 * Get partials
 * @returns {Object}
 */
Resources.prototype.getPartials = function() {
  return this._resources.partials;
};

/**
 * Scan partials
 * @param {Function} callback
 */
Resources.prototype.scanPartials = function(callback) {
  var target = path.join(this.root, 'partials');

  reader.scanDirectory(target, function(err, files) {
    if (err) {
      callback(err);
    }
    else {
      var filtered = reader.filterByFileType(files, ['.html', '.htm']);
      callback(null, filtered);
    }
  });
};

/**
 * Load partials
 * @param {Array} files
 * @param {Function} callback
 */
Resources.prototype.loadPartials = function(files, callback) {
  reader.readFiles(files, this.addPartial.bind(this), callback);
};

/**
 * Add partial
 * @param {String} file
 * @param {String} contents
 */
Resources.prototype.addPartial = function(file, contents) {
  var ext = path.extname(file);
  var basename = path.basename(file, ext);
  var template = handlebars.compile(contents);

  this._resources.partials[basename] = template;
  handlebars.registerPartial(basename, template);
};

/**
 * Get layouts
 * @returns {Object}
 */
Resources.prototype.getLayouts = function() {
  return this._resources.layouts;
};

/**
 * Scan layouts
 * @param {Function} callback
 */
Resources.prototype.scanLayouts = function(callback) {
  var target = path.join(this.root, 'layouts');

  reader.scanDirectory(target, function(err, files) {
    if (err) {
      callback(err);
    }
    else {
      var filtered = reader.filterByFileType(files, ['.html', '.htm']);
      callback(null, filtered);
    }
  });
};

/**
 * Load layouts
 * @param {Array} files
 * @param {Function} callback
 */
Resources.prototype.loadLayouts = function(files, callback) {
  reader.readFiles(files, this.addLayout.bind(this), callback);
};

/**
 * Add layout
 * @param {String} file
 * @param {String} contents
 */
Resources.prototype.addLayout = function(file, contents) {
  var ext = path.extname(file);
  var basename = path.basename(file, ext);

  this._resources.layouts[basename] = handlebars.compile(contents);
};

/**
 * Get pages
 * @returns {Object}
 */
Resources.prototype.getPages = function() {
  return this._resources.pages;
};

/**
 * Scan pages
 * @param {Function} callback
 */
Resources.prototype.scanPages = function(callback) {
  var target = path.join(this.root, 'pages');

  reader.scanDirectory(target, function(err, files) {
    if (err) {
      callback(err);
    }
    else {
      var filtered = reader.filterByFileType(files, ['.html', '.htm']);
      callback(null, filtered);
    }
  });
};

/**
 * Load pages
 * @param {Array} files
 * @param {Function} callback
 */
Resources.prototype.loadPages = function(files, callback) {
  reader.readFiles(files, this.addPage.bind(this), callback);
};

/**
 * Add page
 * @param {String} file
 * @param {String} contents
 */
Resources.prototype.addPage = function(file, contents) {
  var pagePath = path.join(this.root, 'pages');
  var relativePath = path.relative(pagePath, file);
  this._resources.pages[relativePath] = new Page(relativePath, contents);
};