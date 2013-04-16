var path = require('path');
var assert = require('assert');
var instance = require('../../lib/datasets.js');

describe('Datasets', function() {

  var mocks = path.join(__dirname, '../mocks/');

  describe('Read datasets', function() {

    it('Should find .json, .yaml and .js data', function(done) {
      instance.read(mocks, function(err) {
        var data = instance.getAll();
        assert.equal(err, null);
        assert.equal(data.hasOwnProperty('test-js'), true);
        assert.equal(data.hasOwnProperty('test-json'), true);
        assert.equal(data.hasOwnProperty('test-yaml'), true);
        assert.equal(data.hasOwnProperty('ignore-xml'), false);
        done();
      });
    });

  });

//  describe('Read and parse', function() {
//
//    it('Should read JSON file', function() {
//      instance.addData(mocks + '/test-json.json', 'json');
//      assert.ok(instance.datasets.hasOwnProperty('json'));
//      assert.ok(instance.datasets['json']['data']);
//    });
//
//    it('Should read YAML file', function() {
//      instance.addData(path.join(testData.path, 'yaml.yml'), 'yaml');
//      assert.ok(instance.datasets.hasOwnProperty('yaml'));
//      assert.ok(instance.datasets['yaml']['data']);
//    });
//
//    it('Should read JavaScript file', function() {
//      instance.addData(path.join(testData.path, 'javascript.js'), 'javascript');
//      assert.ok(instance.datasets.hasOwnProperty('javascript'));
//      assert.ok(instance.datasets['javascript']['data']);
//    });
//
//    it('Should return error reading invalid JSON', function() {
//      assert.ok(instance.addDocument(path.join(testData.path, 'invalid.json'), 'invalid') instanceof Error);
//    });
//
//  });

});