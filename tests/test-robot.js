var should = require('should');
var Robot = require('../lib/robot');

var __instance;
var __source = __dirname + '/../skeleton/';
var __config = {
  default: require('../default.config.json'),
  local: require('../skeleton/config.json'),
  test: require('./test.config.json')
}

beforeEach(function() {
  __instance = new Robot(__source, __config.test);
});

afterEach(function() {
  __instance = null;
});

describe('Constructor and Options', function() {

  describe('Instance', function() {
    it('Should return an instance of robot', function() {
      __instance.should.be.an.instanceOf(Robot);
    });

    it('Should return a new instance of robot', function() {
      var instanceB = new Robot(__source); // no test config
      __instance.should.not.equal(instanceB);
    });
  });

  describe('Options', function() {
    it('Should have default.config.json options', function() {
      should.exist(__instance.options.verbose);
      __instance.options.verbose.should.equal(__config.default.verbose);
    });

    it('Should have local config.json options', function() {
      should.exist(__instance.options.source);
      __instance.options.source.should.equal(__config.local.source);
    });

    it('Should have test.config.json options', function() {
      should.exist(__instance.options.output);
      __instance.options.output.should.equal(__config.test.output);
    });
  });

});