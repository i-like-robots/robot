var fs = require('fs');
var path = require('path');
var assert = require('assert');
var handlebars = require('handlebars');
var instance = require('../../lib/robot/resources.js');

describe('Resources', function() {

  var mocks = path.join(__dirname, '../mocks/');

  describe('Data', function() {

    var files = {
      js: path.join(mocks, 'data/test-js.js'),
      xml: path.join(mocks, 'data/ignore-xml.xml'),
      yaml: path.join(mocks, 'data/test-yaml.yml'),
      json: path.join(mocks, 'data/test-json.json')
    };

    describe('Scan data', function() {

      it('Should find .json, .yaml and .js files but ignore others', function(done) {
        instance.scanData(mocks, function(err, data) {
          assert.equal(err, null);
          assert.equal(data.length, 3);
          assert.ok(data.indexOf(files.js) > -1);
          assert.ok(data.indexOf(files.yaml) > -1);
          assert.ok(data.indexOf(files.json) > -1);
          assert.ok(data.indexOf(files.xml) == -1);

          done();
        });
      });

    });

    describe('Load data', function() {

      var load = [files.js, files.yaml, files.json];

      it('Should load and parse .json, .yaml and .js files', function(done) {
        instance.loadData(load, function(err) {
          var data = instance.getData();

          assert.equal(err, null);
          assert.equal(data.hasOwnProperty('test-js'), true);
          assert.equal(data.hasOwnProperty('test-json'), true);
          assert.equal(data.hasOwnProperty('test-yaml'), true);

          done();
        });
      });

      it('Should return error attempting to load invalid file', function(done) {
        instance.loadData([files.xml, files.js], function(err) {
          var data = instance.getData();

          assert.ok(err instanceof Error);
          assert.equal(data.hasOwnProperty('ignore-xml'), false);

          done();
        });
      });

    });

    describe('Add data', function() {

      it('Should read JSON file', function() {
        var err = instance.addData(files.json);
        var data = instance.getData();

        assert.equal(err, null);
        assert.ok(data.hasOwnProperty('test-json'));
        assert.ok(data['test-json']['data']);
      });

      it('Should read YAML file', function() {
        var err = instance.addData(files.yaml);
        var data = instance.getData();

        assert.equal(err, null);
        assert.ok(data.hasOwnProperty('test-yaml'));
        assert.ok(data['test-yaml']['data']);
      });

      it('Should read JavaScript file', function() {
        var err = instance.addData(files.js);
        var data = instance.getData();

        assert.equal(err, null);
        assert.ok(data.hasOwnProperty('test-json'));
        assert.ok(data['test-json']['data']);
      });

      it('Should return error reading invalid file', function() {
        var err = instance.addData(files.xml);
        assert.ok(err instanceof Error);
      });

    });

  });

  describe('Partials', function() {

    var files = {
      html: path.join(mocks, 'partials/partial.html'),
      xml: path.join(mocks, 'partials/ignore.xml')
    };

    describe('Scan partials', function() {

      it ('Should find .html files but ignore others', function(done) {
        instance.scanPartials(mocks, function(err, data) {
          assert.equal(err, null);
          assert.equal(data.length, 1);
          assert.ok(data.indexOf(files.html) > -1);
          assert.ok(data.indexOf(files.xml) === -1);
          done();
        });
      });

    });

    describe('Load partials', function() {

        it('Should use reader.js module to load files and register', function(done) {
          instance.loadPartials([files.html], function(err) {
            assert.equal(err, null);
            assert.equal(handlebars.partials.hasOwnProperty('partial'), true);
            done();
          });
        });

    });


    describe('Add partial', function() {
      it('Should register partial with Handlebars', function() {
        var contents = fs.readFileSync(files.html, 'utf-8');

        instance.addPartial(files.html, contents);
        assert.equal(handlebars.partials.hasOwnProperty('partial'), true);
        assert.equal(handlebars.partials.partial, contents);
      });
    });

  });

//  describe('Layouts', function() {
//
//    describe('Load partials', function(done) {
//
//    });
//
//  });
//
//  describe('Pages', function() {
//
//    describe('Load pages', function(done) {
//
//    });
//
//  });

});