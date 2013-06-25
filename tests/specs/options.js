var path = require('path');
var assert = require('assert');
var Options = require('../../lib/robot/options.js');

describe('Config', function() {

  var mocks = path.join(__dirname, '../mocks');

  describe('Set options', function() {

    it('Should calculate correct source and output paths', function() {
      var input = require(path.join(mocks, 'options/robot.json'));
      var instance = new Options(mocks, input);

      assert.equal(instance.sourcePath, path.join(mocks, 'source/'));
      assert.equal(instance.outputPath, path.join(mocks, 'output/'));
    });

  });

});