var path = require('path');
var assert = require('assert');
var Options = require('../../lib/robot/options.js');

describe('Options', function() {

  var mocks = path.join(__dirname, '../mocks/options');

  it('Should return user options when provided', function() {
    var instance = new Options(mocks, {
      source: 'baz/',
      output: 'qux/'
    });

    assert.equal(instance.sourcePath, path.join(mocks, 'baz/'));
    assert.equal(instance.outputPath, path.join(mocks, 'qux/'));
  });

  it('Should return options file values if no user options were given', function() {
    var input = require(path.join(mocks, 'robot.json'));
    var instance = new Options(mocks, {});

    assert.equal(instance.sourcePath, path.join(mocks, input.source));
    assert.equal(instance.outputPath, path.join(mocks, input.output));
  });

  it('Should return defaults when no user options were given and options file was not found', function() {
    var instance = new Options('', {});
    var defaults = instance.getDefaultOptions();

    assert.equal(instance.sourcePath, path.join('', defaults.source));
    assert.equal(instance.outputPath, path.join('', defaults.output));
  });

});