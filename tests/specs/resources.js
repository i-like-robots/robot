var fs = require('fs');
var path = require('path');
var assert = require('assert');
var instance = require('../../lib/robot/resources.js');

describe('Resources', function() {

  var mocks = path.join(__dirname, '../mocks/');

  describe('Data', function() {

    var files = {
      js: path.join(mocks, 'data/foo.js'),
      json: path.join(mocks, 'data/bar.json'),
      yaml: path.join(mocks, 'data/baz.yaml'),
      ignore: path.join(mocks, 'data/ignore.xml')
    };

    describe('Scan data', function() {
      it('Should find .json, .yaml and .js files but ignore others', function(done) {
        instance.scanData(mocks, function(err, data) {
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
        instance.loadData(load, function(err) {
          var data = instance.getData();
          assert.equal(err, null);
          assert.equal(data.hasOwnProperty('foo'), true);
          assert.equal(data.hasOwnProperty('bar'), true);
          assert.equal(data.hasOwnProperty('baz'), true);
          done();
        });
      });

      it('Should return error attempting to load invalid file', function(done) {
        instance.loadData([files.ignore], function(err) {
          assert.ok(err instanceof Error);
          done();
        });
      });

    });

    describe('Add data', function() {

      it('Should read JavaScript file', function() {
        var result = instance.addData(files.js);
        var data = instance.getData();
        assert.equal(result, null);
        assert.equal(data.hasOwnProperty('foo'), true);
        assert.equal(data.foo.data, 1);
      });

      it('Should read JSON file', function() {
        var result = instance.addData(files.json);
        var data = instance.getData();
        assert.equal(result, null);
        assert.equal(data.hasOwnProperty('bar'), true);
        assert.equal(data.bar.data, 1);
      });

      it('Should read YAML file', function() {
        var result = instance.addData(files.yaml);
        var data = instance.getData();
        assert.equal(result, null);
        assert.equal(data.hasOwnProperty('baz'), true);
        assert.equal(data.baz.data, 1);
      });

      it('Should return error reading invalid file', function() {
        var result = instance.addData(files.ignore);
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
        instance.scanPartials(mocks, function(err, data) {
          assert.equal(err, null);
          assert.equal(data.indexOf(files.html) > -1, true);
          assert.equal(data.indexOf(files.ignore) > -1, false);
          done();
        });
      });
    });

    describe('Load partials', function() {
      it('Should read an array of files and register each', function(done) {
        instance.loadPartials([files.html], function(err) {
          var contents = fs.readFileSync(files.html, 'utf-8');
          var data = instance.getPartials();
          assert.equal(err, null);
          assert.equal(data.hasOwnProperty('foo'), true);
          assert.equal(data.foo.raw, contents);
          done();
        });
      });
    });

    describe('Add partial', function() {
      it('Should register file contents against file base name', function() {
        var contents = fs.readFileSync(files.html, 'utf-8');
        var result = instance.addPartial(files.html, contents);
        var data = instance.getPartials();
        assert.equal(data.hasOwnProperty('foo'), true);
        assert.equal(data.foo.raw, contents);
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
        instance.scanLayouts(mocks, function(err, data) {
          assert.equal(err, null);
          assert.equal(data.indexOf(files.html) > -1, true);
          assert.equal(data.indexOf(files.ignore) > -1, false);
          done();
        });
      });
    });

    describe('Load layouts', function() {
      it('Should read an array of files and register each', function(done) {
        instance.loadLayouts([files.html], function(err) {
          var contents = fs.readFileSync(files.html, 'utf-8');
          var data = instance.getLayouts();
          assert.equal(err, null);
          assert.equal(data.hasOwnProperty('foo'), true);
          assert.equal(data.foo.raw, contents);
          done();
        });
      });
    });

    describe('Add layout', function() {
      it('Should register file contents against file base name', function() {
        var contents = fs.readFileSync(files.html, 'utf-8');
        var result = instance.addLayout(files.html, contents);
        var data = instance.getLayouts();
        assert.equal(data.hasOwnProperty('foo'), true);
        assert.equal(data.foo.raw, contents);
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
        instance.scanPages(mocks, function(err, data) {
          assert.equal(err, null);
          assert.equal(data.indexOf(files.html) > -1, true);
          assert.equal(data.indexOf(files.ignore) > -1, false);
          done();
        });
      });
    });

    describe('Load pages', function() {
      it('Should read and array of files and register each', function(done) {
        instance.loadPages([files.html], function(err) {
          var contents = fs.readFileSync(files.html, 'utf-8');
          var data = instance.getPages();
          assert.equal(err, null);
          assert.equal(data.hasOwnProperty('foo.html'), true);
          assert.equal(data['foo.html'].raw, contents);
          done();
        });
      });
    });

    describe('Add page', function() {
      it('Should register file contents against relative file path', function() {
        var contents = fs.readFileSync(files.html, 'utf-8');
        var result = instance.addPage(files.html, contents);
        var data = instance.getPages();
        assert.equal(data.hasOwnProperty('foo.html'), true);
        assert.equal(data['foo.html'].raw, contents);
      });
    });

//    describe('Parse front matter', function() {
//
//      var files = {
//        html: path.join(mocks, 'pages/foo.html'),
//        ignore: path.join(mocks, 'pages/ignore.xml'),
//        invalid: path.join(mocks, 'pages/invalid.html')
//      };
//
//      it ('Should parse front matter', function() {
//        var contents = fs.readFileSync(files.html, 'utf-8');
//        var result = instance.parseFrontMatter(contents);
//        assert.ok(result.data.hasOwnProperty('title'));
//      });
//
//      it('Should return error if front matter not found', function() {
//        var contents = '';
//        var result = instance.parseFrontMatter(contents);
//
//        assert.ok(result instanceof Error);
//      });
//
//      it('Should return error if front matter is invalid', function() {
//        var contents = fs.readFileSync(files.invalid, 'utf-8');
//        var result = instance.parseFrontMatter(contents);
//
//        assert.ok(result instanceof Error);
//      });
//
//    });

  });

});