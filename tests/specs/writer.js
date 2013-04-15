var fs = require('fs');
var assert = require('assert');
var instance = require('../../lib/writer.js');

describe('Writer', function() {

  describe('Prepare template', function() {

    it('Should return a Handlebars template instance', function() {
      var output = instance.prepareTemplate('{{foo}}');
      assert.equals(typeof output, 'function');
    });

  });

  describe('Compile template', function() {

    it('Should return a compiled string when given a template and data', function() {
      var input = 'bar';
      var output = instance.compileTemplate('{{foo}}', { foo: input });
      assert.equals(output, input);
    });

  });

  describe('Write file to disk', function() {
    var input = 'foo';
    var output = 'temp/test.html';

    it('Should write a file with contents to disk', function(done) {
      instance.writeFile('', output, function(err) {
        assert.equals(err, null);
        assert.equals(fs.readFileSync(output), input);
        done();
      });
    })

  });

});