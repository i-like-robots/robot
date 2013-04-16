var fs = require('fs');
var path = require('path');
var assert = require('assert');
var instance = require('../../lib/writer.js');

describe('Writer', function() {

  describe('Prepare template', function() {

    it('Should return a Handlebars template instance', function() {
      var output = instance.prepareTemplate('{{foo}}');
      assert.equal(typeof output, 'function');
    });

  });

  describe('Compile template', function() {

    it('Should return a compiled string when given a template and data', function() {
      var input = 'bar';
      var template = '{{foo}}';
      var compiled = instance.prepareTemplate(template);
      assert.equal(instance.compileTemplate(template, { foo: input }), input);
      assert.equal(instance.compileTemplate(compiled, { foo: input }), input);
    });

  });

  describe('Write file to disk', function() {

    var input = 'foo';
    var output = path.join(__dirname, '../temp/test.html');

    it('Should write a file with contents to disk', function(done) {
      instance.writeToDisk(output, input, function(err) {
        assert.equal(err, null);
        assert.equal(fs.readFileSync(output), input);
        done();
      });
    })

  });

});