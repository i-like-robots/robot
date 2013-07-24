var path = require('path');
var assert = require('assert');
var Options = require('../../lib/robot/options.js');

describe('Options', function() {

  var mocks = path.join(__dirname, '../mocks/options');

  describe('Set options', function() {

    it('Should calculate correct paths based on user given options', function() {
      var instance = new Options(mocks, {
        source: 'baz/',
        output: 'qux/'
      });

      assert.equal(instance.sourcePath, path.join(mocks, 'baz/'));
      assert.equal(instance.outputPath, path.join(mocks, 'qux/'));
    });

    it('Should calculate correct paths based on project options', function() {
      var input = require(path.join(mocks, 'robot.json'));
      var instance = new Options(mocks, {});

      assert.equal(instance.sourcePath, path.join(mocks, input.source));
      assert.equal(instance.outputPath, path.join(mocks, input.output));
    });

  });

//  describe('Load project options', function() {
//
//    it('Should load the project options file', function() {
//
//    });
//
//  });

});