var fs = require('fs');
var assert = require('assert');
var instance = require('../../lib/robot.js');

describe('Robot', function() {

  describe('Read source', function() {

    it('Should load all data, partials, layouts and pages', function(done) {

      var datasets = require('./datasets');
      var partials = require('./partials');
      var layouts = require('./layouts');
      var pages = require('./pages');

      instance.readSource('../mocks/', function(err) {
        assert.equals(err, null);
        assert.equals(isNaN(datasets.getAll().length), false);
        assert.equals(isNaN(partials.getAll().length), false);
        assert.equals(isNaN(layouts.getAll().length), false);
        assert.equals(isNaN(pages.getAll().length), false);
        done();
      });

    });

  });

  describe('Write page', function() {

    var input = 'bar';
    var template = '{{foo}}';
    var output = '../temp/test.html';

    it('Should render page content to a layout and save to disk', function(done) {
      instance.writePage(output, template, { foo: input }, function(err) {
        assert.equals(err, null);
        assert.equals(fs.readFileSync(output), input);
        done();
      });
    });

  });

});