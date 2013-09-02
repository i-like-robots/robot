var path = require('path');
var fs = require('fs-extra');
var async = require('async');
var writer = require('./writer');
var Resources = require('./resources');

/**
 * Read resources
 * @param {String} source
 * @param {Function} callback
 */
exports.readResources = function(source, callback) {

  var resources = new Resources(source);

  async.series([
    function(step) {
      resources.scanData(function(err, files) {
        if (err) {
          step(err);
        }
        else {
          resources.loadData(files, step);
        }
      });
    },
    function(step) {
      resources.scanPartials(function(err, files) {
        if (err) {
          step(err);
        }
        else {
          resources.loadPartials(files, step);
        }
      });
    },
    function(step) {
      resources.scanLayouts(function(err, files) {
        if (err) {
          step(err);
        }
        else {
          resources.loadLayouts(files, step);
        }
      });
    },
    function(step) {
      resources.scanPages(function(err, files) {
        if (err) {
          step(err);
        }
        else {
          resources.loadPages(files, step);
        }
      });
    }
  ],
  function(err) {
    callback(err, resources);
  });
};

/**
 * Write output
 * @param {String} target
 * @param {Resources} resources
 * @param {Function} callback
 */
exports.writeOutput = function(target, resources, callback) {
  var layouts = resources.getLayouts();
  var pages = resources.getPages();
  var queue = Object.keys(pages);
  var date = new Date();
  var sharedData = {
    sitemap: {},
    data: resources.getData(),
    env: {
      year: date.getFullYear(),
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      datetime: date.toLocaleString()
    }
  };

  async.each(queue, function(item, step) {
    var page = pages[item];
    var outputPath = path.join(target, item);

    // Assemble data
    var data = Object.create(sharedData);
    data.page = page.getData();

    // Compile page
    var layout = layouts[data.page.layout];
    var compiled = writer.compilePageWithLayout(page.getTemplate(), layout, data);

    writer.writeToDisk(outputPath, compiled, step);

  }, callback);

};

/**
 * Append includes
 * @param {String} sourcePath
 * @param {String} targetPath
 * @param {Array} includes
 * @param {Function} callback
 */
exports.appendIncludes = function(sourcePath, targetPath, includes, callback) {
  async.each(includes, function(item, step) {
    var source = path.join(sourcePath, item);
    var target = path.join(targetPath, item);
    fs.copy(source, target, step);
  }, callback);
};