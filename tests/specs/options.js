var path = require('path');
var assert = require('assert');
var instance = require('../../lib/robot/options.js');

describe('Config', function() {

  var mocks = path.join(__dirname, '../mocks/options');
  var local = require( path.join(mocks, 'robot.json') );
  var cli = require( path.join(mocks, 'cli.json') );

  describe('Set options', function() {

    var result = instance.loadOptions(mocks, cli);
    var output = instance.getOptions();

    it('Should merge arguments with local options with default options', function() {
      assert.equal(output.hasOwnProperty('local'), true);
      assert.equal(output.hasOwnProperty('cli'), true);
      assert.equal(output.local, local.local);
      assert.equal(output.cli, cli.cli);
    });

    it('Should calculate correct source and output paths', function() {
      assert.equal(instance.getSource(), path.join(mocks, 'source'));
      assert.equal(instance.getOutput(), path.join(mocks, 'output'));
    });

  });

});