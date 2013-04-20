var path = require('path');
var assert = require('assert');
var instance = require('../../lib/robot/resources.js');

describe('Resources', function() {

  var mocks = path.join(__dirname, '../mocks/');

  describe('Data', function() {

    describe('Load data', function() {

      it('Should find .json, .yaml and .js data', function(done) {
        instance.loadData(mocks, function(err) {
          var data = instance.getData();

          assert.equal(err, null);
          assert.equal(data.hasOwnProperty('test-js'), true);
          assert.equal(data.hasOwnProperty('test-json'), true);
          assert.equal(data.hasOwnProperty('test-yaml'), true);
          assert.equal(data.hasOwnProperty('ignore-xml'), false);

          done();
        });
      });

    });

    describe('Add data', function() {

      it('Should read JSON file', function() {
        var err = instance.addData(mocks + 'data/test-json.json');
        var data = instance.getData();

        assert.equal(err, null);
        assert.ok(data.hasOwnProperty('test-json'));
        assert.ok(data['test-json']['data']);
      });

      it('Should read YAML file', function() {
        var err = instance.addData(mocks + 'data/test-yaml.yml');
        var data = instance.getData();

        assert.equal(err, null);
        assert.ok(data.hasOwnProperty('test-yaml'));
        assert.ok(data['test-yaml']['data']);
      });

      it('Should read JavaScript file', function() {
        var err = instance.addData(mocks + 'data/test-js.js');
        var data = instance.getData();

        assert.equal(err, null);
        assert.ok(data.hasOwnProperty('test-json'));
        assert.ok(data['test-json']['data']);
      });

      it('Should return error reading invalid file', function() {
        var err = instance.addData(mocks + 'data/ignore-xml.xml');
        assert.ok(err instanceof Error);
      });

    });

  });

//  describe('Partials', function() {
//
//    describe('Load partials', function(done) {
//
//    });
//
//  });
//
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