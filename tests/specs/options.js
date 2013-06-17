var path = require('path');
var assert = require('assert');
var Options = require('../../lib/robot/options.js');

describe('Config', function() {

  var mocks = path.join(__dirname, '../mocks');
  var config = require(path.join(mocks, 'options/robot.json'));
  var options = new Options(mocks, config);

  describe('Set options', function() {

    it('Should calculate correct source and output paths', function() {
      assert.equal(options.sourcePath, path.join(mocks, 'source/'));
      assert.equal(options.outputPath, path.join(mocks, 'output/'));
    });

  });

});