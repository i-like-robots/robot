var path = require('path');
var assert = require('assert');
var Datasets = require('../lib/datasets');

var source = __dirname + '/test-data';
var dataPath = path.join(source, 'data');

suite('Dataset', function() {

  var instance;

  setup(function() {
    instance = new Datasets(source);
  });

  teardown(function() {
    instance = null;
  });

  test('Constructor should calculate correct path', function() {
    assert.equal(instance.datasetsPath, dataPath);
  });

  test('Should find foo.json', function(done) {
    instance.scanDirectory(function() {
      assert.equal(!!instance.datasets['foo'], true);
      done();
    });
  });

  test('Should ignore bar.jsonx', function(done) {
    instance.scanDirectory(function() {
      assert.equal(!!instance.datasets['bar'], false);
      done();
    });
  });

  test('Should read and parse foo.json', function() {
    instance.addDocument(dataPath + '/foo.json', 'foo');
    assert.ok(instance.datasets.hasOwnProperty('foo'));
    assert.equal(instance.datasets['foo'].foo, 'bar');
  });

  test('Should throw an error attempting to parse invalid JSON', function() {
    assert.throws(function() {
      instance.addDocument(dataPath + '/bar.jsonx', 'bar');
    });
    assert.equal(instance.datasets.hasOwnProperty('bar'), false);
  });

});