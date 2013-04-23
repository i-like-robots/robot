var fs = require('fs');
var path = require('path');
var assert = require('assert');
var instance = require('../../lib/robot/process.js');
var resources = require('../../lib/robot/resources.js');

describe('Process', function() {

  var mocks = path.join(__dirname, '../mocks/');

  describe('Read resources', function() {
    it('Should use async package to scan and load all resources in series', function(done) {
      instance.readResources(mocks, function(err) {
        assert.equal(err, null);
        assert.equal(resources.getData().hasOwnProperty('foo'), true);
        assert.equal(resources.getPartials().hasOwnProperty('foo'), true);
        assert.equal(resources.getLayouts().hasOwnProperty('foo'), true);
        assert.equal(resources.getPages().hasOwnProperty('foo.html'), true);
        done();
      });
    });
  });

//  describe('Write all pages', function() {
//
//    var output = path.join(__dirname, '../temp/');
//
//    after(function() {
//      fs.unlinkSync(path.join(output, 'foo.html'));
//    });
//
//    it('Should take process templates and write to file', function(done) {
//      instance.writeOutput(function(err) {
//        assert.equal(err, null);
//        assert.equal(fs.existsSync(output), true);
//        done();
//      });
//    });
//  });

});