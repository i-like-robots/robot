var path = require('path');
var yaml = require('js-yaml');
var reader = require('./reader');
var Page = require('./models/page');
var handlebars = require('handlebars');

/**
 * Data library
 * @type {Object}
 * @private
 */
var __data = {};

/**
 * Get data
 * @returns {Object}
 */
exports.getData = function() {
  return __data;
};

/**
 * Scan data
 * @param {String} root
 * @param {Function} callback
 */
exports.scanData = function(root, callback) {
  var target = path.join(root, 'data');

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
exports.loadData = function(files, callback) {
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
exports.addData = function(file) {
  var ext = path.extname(file);
  var basename = path.basename(file, ext);

  try {
    __data[basename] = require(file);
  }
  catch(err) {
    return err;
  }
};

/**
 * Partials
 * @type {Object}
 * @private
 */
var __partials = {};

/**
 * Get partials
 * @returns {Object}
 */
exports.getPartials = function() {
  return __partials;
};

/**
 * Scan partials
 * @param {String} root
 * @param {Function} callback
 */
exports.scanPartials = function(root, callback) {
  var target = path.join(root, 'partials');

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
exports.loadPartials = function(files, callback) {
  reader.readFiles(files, this.addPartial.bind(this), callback);
};

/**
 * Add partial
 * @param {String} file
 * @param {String} contents
 */
exports.addPartial = function(file, contents) {
  var ext = path.extname(file);
  var basename = path.basename(file, ext);
  var template = handlebars.compile(contents);

  __partials[basename] = template;
  handlebars.registerPartial(basename, template);
};

/**
 * Layouts library
 * @type {Object}
 * @private
 */
var __layouts = {};

/**
 * Get layouts
 * @returns {Object}
 */
exports.getLayouts = function() {
  return __layouts;
};

/**
 * Scan layouts
 * @param {String} root
 * @param {Function} callback
 */
exports.scanLayouts = function(root, callback) {
  var target = path.join(root, 'layouts');

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
exports.loadLayouts = function(files, callback) {
  reader.readFiles(files, this.addLayout.bind(this), callback);
};

/**
 * Add layout
 * @param {String} file
 * @param {String} contents
 */
exports.addLayout = function(file, contents) {
  var ext = path.extname(file);
  var basename = path.basename(file, ext);

  __layouts[basename] = handlebars.compile(contents);
};

/**
 * Pages library
 * @type {Object}
 * @private
 */
var __pages = {};

/**
 * Get pages
 * @returns {Object}
 */
exports.getPages = function() {
  return __pages;
};

/**
 * Scan pages
 * @param {String} root
 * @param {Function} callback
 */
exports.scanPages = function(root, callback) {
  var target = path.join(root, 'pages');

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
exports.loadPages = function(files, callback) {
  reader.readFiles(files, this.addPage.bind(this), callback);
};

/**
 * Add page
 * @param {String} file
 * @param {String} contents
 */
exports.addPage = function(file, contents) {
  // TODO: Requires access to pages source root
  //var relpath = path.relative(config.rootPath, file);
  var basename = path.basename(file);

  __pages[basename] = new Page(basename, contents);
};