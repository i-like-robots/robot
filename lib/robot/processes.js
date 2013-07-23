var path = require('path');
var async = require('async');
var writer = require('./writer');
var Resources = require('./resources');

/**
 * Read resources
 * @param {String} root
 * @param {Function} callback
 */
exports.readResources = function(root, callback) {

  var resources = new Resources(root);

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
  var pages = resources.getPages();
  var layouts = resources.getLayouts();
  var queue = Object.keys(pages);
  var sharedData = {
    sitemap: {},
    data: resources.getData()
  };

  async.each(queue, function(item, step) {
    var page = pages[item];

    // Assemble data
    var pageData = Object.create(sharedData);
    pageData.page = page.getData();

    // Compile page
    var compiled = writer.compileTemplate(page.getTemplate(), layouts[pageData.page.layout], pageData);

    // Write string to disk
    var pagePath = path.join(target, item);
    writer.writeToDisk(pagePath, compiled, step);

  }, callback);

};