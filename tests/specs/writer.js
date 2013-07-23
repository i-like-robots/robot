var fs = require('fs');
var path = require('path');
var assert = require('assert');
var writer = require('../../lib/robot/writer.js');

describe('Writer', function() {

  var mocks = path.join(__dirname, '../mocks');

  describe('Prepare template', function() {

    it('Should return a Handlebars template instance', function() {
      var output = writer.prepareTemplate('{{foo}}');

      assert.equal(typeof output, 'function');
    });

  });

  describe('Compile template', function() {

    it('Should return a compiled string when given a template and data', function() {
      var input = 'bar';
      var template = '{{foo}}';

      assert.equal(writer.compileTemplate(template, { foo: input }), input);
    });

  });

  describe('Compile page with layout', function() {

    var inputPage = 'page content';
    var inputLayout = '<layout>{{{content}}}</layout>';

    it('Should return a compiled string', function() {
      var result = writer.compilePageWithLayout(inputPage, inputLayout, {});

      assert.equal(result, '<layout>page content</layout>');
    });

  });


  describe('Write file to disk', function() {

    var input = 'foo';
    var output = path.join(__dirname, '../temp/test.html');

    after(function() {
      fs.unlinkSync(output);
    });

    it('Should write a file with contents to disk', function(done) {
      writer.writeToDisk(output, input, function(err) {

        assert.equal(err, null);
        assert.equal(fs.readFileSync(output, 'utf-8'), input);

        done();
      });

    });

  });

});