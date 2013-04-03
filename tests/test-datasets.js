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
        assert.ok(instance.datasets.hasOwnProperty('json-data'));
        assert.ok(instance.datasets.hasOwnProperty('yaml-data'));
        assert.ok(instance.datasets.hasOwnProperty('js-data'));
        done();
      });
    });

    test('Should ignore none js/json/yaml', function(done) {
      instance.scanDirectory(testData.mocks, function() {
        assert.equal(instance.datasets.hasOwnProperty('ignore-data'), false);
        done();
      });
    });

  });

  suite('Read and parse', function() {

    test('Should read json-data.json', function() {
      instance.addDocument(path.join(testData.path, 'json-data.json'), 'json-data');
      assert.ok(instance.datasets.hasOwnProperty('json-data'));
      assert.ok(instance.datasets['json-data']['data']);
    });

    test('Should read yaml-data.yml file', function() {
      instance.addDocument(path.join(testData.path, 'yaml-data.yml'), 'yaml-data');
      assert.ok(instance.datasets.hasOwnProperty('yaml-data'));
      assert.ok(instance.datasets['yaml-data']['data']);
    });

    test('Should read js-data.js file', function() {
      instance.addDocument(path.join(testData.path, 'js-data.js'), 'js-data');
      assert.ok(instance.datasets.hasOwnProperty('js-data'));
      assert.ok(instance.datasets['js-data']['data']);
    });

    // test invalid json error

    // test invalid yaml error

    // test invalid js error

  });

});
