var path = require('path');
var fs = require('fs-extra');
var assert = require('assert');
var writer = require('../../lib/robot/writer.js');

describe('Writer', function() {

  var mocks = path.join(__dirname, '../mocks');

  describe('Prepare template', function() {

    it('Should return a Handlebars template instance', function() {
      var output = writer.prepareTemplate('{{content}}');

      assert.equal(typeof output, 'function');
    });

  });

  describe('Compile template', function() {

    it('Should return a compiled string when given a template and data', function() {
      var inputContent = 'bar';
      var inputTemplate = '<p>{{content}}</p>';
      var result = writer.compileTemplate(inputTemplate, { content: inputContent });

      assert.equal(result, '<p>bar</p>');
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
    var inputContent = 'foo';
    var outputPath = path.join(__dirname, '../temp/test.html');

    after(function() {
      fs.removeSync(outputPath);
    });

    it('Should write a file with contents to disk', function(done) {
      writer.writeToDisk(outputPath, inputContent, function(err) {
        var result = fs.readFileSync(outputPath, 'utf-8');

        assert.equal(err, null);
        assert.equal(result, inputContent);

        done();
      });

    });

  });

});