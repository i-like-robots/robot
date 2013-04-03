var path = require('path');
var assert = require('assert');
var datasets = require('../lib/datasets');

//
// Test data
//
var testData  = {};
testData.mocks = path.join(__dirname, 'mocks/test-datasets');
testData.path = path.join(testData.mocks, 'data');

//
// Test suite
//
suite('Dataset', function() {

  var instance;

  setup(function() {
    instance = datasets;
  });

  teardown(function() {
    instance = null;
  });

  suite('Scan directory', function() {

    test('Should find .json, .yaml and .js data', function(done) {
      instance.scanDirectory(testData.mocks, function() {
        assert.ok(instance.datasets.hasOwnProperty('json'));
        assert.ok(instance.datasets.hasOwnProperty('yaml'));
        assert.ok(instance.datasets.hasOwnProperty('javascript'));
        done();
      });
    });

    test('Should ignore none js/json/yaml and invalid data', function(done) {
      instance.scanDirectory(testData.mocks, function() {
        assert.equal(instance.datasets.hasOwnProperty('ignore'), false);
        assert.equal(instance.datasets.hasOwnProperty('invalid'), false);
        done();
      });
    });

  });

  suite('Read and parse', function() {

    test('Should read JSON file', function() {
      instance.addDocument(path.join(testData.path, 'json.json'), 'json');
      assert.ok(instance.datasets.hasOwnProperty('json'));
      assert.ok(instance.datasets['json']['data']);
    });

    test('Should read YAML file', function() {
      instance.addDocument(path.join(testData.path, 'yaml.yml'), 'yaml');
      assert.ok(instance.datasets.hasOwnProperty('yaml'));
      assert.ok(instance.datasets['yaml']['data']);
    });

    test('Should read JavaScript file', function() {
      instance.addDocument(path.join(testData.path, 'javascript.js'), 'javascript');
      assert.ok(instance.datasets.hasOwnProperty('javascript'));
      assert.ok(instance.datasets['javascript']['data']);
    });

    test('Should return error reading invalid JSON', function() {
      assert.ok(instance.addDocument(path.join(testData.path, 'invalid.json'), 'invalid') instanceof Error);
    });

  });

});
