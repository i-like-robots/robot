var fs = require('fs');
var path = require('path');
var assert = require('assert');
var Resources = require('../../lib/robot/resources.js');

describe('Resources', function() {

  var mocks = path.join(__dirname, '../mocks');
  var resources = new Resources(mocks);

  describe('Data', function() {

    var files = {
      js: path.join(mocks, 'data/foo.js'),
      json: path.join(mocks, 'data/bar.json'),
      yaml: path.join(mocks, 'data/baz.yaml'),
      ignore: path.join(mocks, 'data/ignore.xml')
    };

    describe('Scan data', function() {
      it('Should find .json, .yaml and .js files but ignore others', function(done) {
        resources.scanData(function(err, data) {
          assert.equal(err, null);
          assert.equal(data.indexOf(files.js) > -1, true);
          assert.equal(data.indexOf(files.yaml) > -1, true);
          assert.equal(data.indexOf(files.json) > -1, true);
          assert.equal(data.indexOf(files.ignore) > -1, false);
          done();
        });
      });
    });

    describe('Load data', function() {

      var load = [files.js, files.yaml, files.json];

      it('Should read an array of files and register each', function(done) {
        resources.loadData(load, function(err) {
          var data = resources.getData();
          assert.equal(err, null);
          assert.equal(data.hasOwnProperty('foo'), true);
          assert.equal(data.hasOwnProperty('bar'), true);
          assert.equal(data.hasOwnProperty('baz'), true);
          done();
        });
      });

      it('Should return error attempting to load invalid file', function(done) {
        resources.loadData([files.ignore], function(err) {
          assert.ok(err instanceof Error);
          done();
        });
      });

    });

    describe('Add data', function() {

      it('Should read JavaScript file', function() {
        var result = resources.addData(files.js);
        var data = resources.getData();
        assert.equal(result, null);
        assert.equal(data.hasOwnProperty('foo'), true);
        assert.equal(data.foo.data, 1);
      });

      it('Should read JSON file', function() {
        var result = resources.addData(files.json);
        var data = resources.getData();
        assert.equal(result, null);
        assert.equal(data.hasOwnProperty('bar'), true);
        assert.equal(data.bar.data, 1);
      });

      it('Should read YAML file', function() {
        var result = resources.addData(files.yaml);
        var data = resources.getData();
        assert.equal(result, null);
        assert.equal(data.hasOwnProperty('baz'), true);
        assert.equal(data.baz.data, 1);
      });

      it('Should return error reading invalid file', function() {
        var result = resources.addData(files.ignore);
        assert.equal(result instanceof Error, true);
      });

    });

  });

  describe('Partials', function() {

    var files = {
      html: path.join(mocks, 'partials/foo.html'),
      ignore: path.join(mocks, 'partials/ignore.xml')
    };

    describe('Scan partials', function() {
      it ('Should find .html files but ignore others', function(done) {
        resources.scanPartials(function(err, data) {
          assert.equal(err, null);
          assert.equal(data.indexOf(files.html) > -1, true);
          assert.equal(data.indexOf(files.ignore) > -1, false);
          done();
        });
      });
    });

    describe('Load partials', function() {
      it('Should read an array of files and register each', function(done) {
        resources.loadPartials([files.html], function(err) {
          var data = resources.getPartials();
          assert.equal(err, null);
          assert.equal(data.hasOwnProperty('foo'), true);
          assert.equal(typeof data.foo, 'function');
          done();
        });
      });
    });

    describe('Add partial', function() {
      it('Should register file contents against file base name', function() {
        var contents = fs.readFileSync(files.html, 'utf-8');
        var result = resources.addPartial(files.html, contents);
        var data = resources.getPartials();
        assert.equal(data.hasOwnProperty('foo'), true);
        assert.equal(typeof data.foo, 'function');
      });
    });

  });

  describe('Layouts', function() {

    var files = {
      html: path.join(mocks, 'layouts/foo.html'),
      ignore: path.join(mocks, 'layouts/ignore.xml')
    };

    describe('Scan layouts', function() {
      it('Should find .html files but ignore others', function(done) {
        resources.scanLayouts(function(err, data) {
          assert.equal(err, null);
          assert.equal(data.indexOf(files.html) > -1, true);
          assert.equal(data.indexOf(files.ignore) > -1, false);
          done();
        });
      });
    });

    describe('Load layouts', function() {
      it('Should read an array of files and register each', function(done) {
        resources.loadLayouts([files.html], function(err) {
          var data = resources.getLayouts();
          assert.equal(err, null);
          assert.equal(data.hasOwnProperty('foo'), true);
          assert.equal(typeof data.foo, 'function');
          done();
        });
      });
    });

    describe('Add layout', function() {
      it('Should register file contents against file base name', function() {
        var contents = fs.readFileSync(files.html, 'utf-8');
        var result = resources.addLayout(files.html, contents);
        var data = resources.getLayouts();
        assert.equal(data.hasOwnProperty('foo'), true);
        assert.equal(typeof data.foo, 'function');
      });
    });

  });

  describe('Pages', function() {

    var files = {
      html: path.join(mocks, 'pages/foo.html'),
      ignore: path.join(mocks, 'pages/ignore.xml'),
      invalid: path.join(mocks, 'pages/invalid.html')
    };

    describe('Scan pages', function() {
      it('Should find .html files but ignore others', function(done) {
        resources.scanPages(function(err, data) {
          assert.equal(err, null);
          assert.equal(data.indexOf(files.html) > -1, true);
          assert.equal(data.indexOf(files.ignore) > -1, false);
          done();
        });
      });
    });

    describe('Load pages', function() {
      it('Should read and array of files and register each', function(done) {
        resources.loadPages([files.html], function(err) {
          var data = resources.getPages();
          assert.equal(err, null);
          assert.equal(data.hasOwnProperty('foo.html'), true);
          assert.equal(typeof data['foo.html'].getData(), 'object');
          assert.equal(typeof data['foo.html'].getTemplate(), 'function');
          done();
        });
      });
    });

    describe('Add page', function() {
      it('Should register file contents against relative file path', function() {
        var contents = fs.readFileSync(files.html, 'utf-8');
        var result = resources.addPage(files.html, contents);
        var data = resources.getPages();
        assert.equal(data.hasOwnProperty('foo.html'), true);
        assert.equal(typeof data['foo.html'].getData(), 'object');
        assert.equal(typeof data['foo.html'].getTemplate(), 'function');
      });
    });

  });

});