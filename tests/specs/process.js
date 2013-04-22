var fs = require('fs');
var path = require('path');
var assert = require('assert');
var handlebars = require('handlebars');
var instance = require('../../lib/robot/process.js');
var resources = require('../../lib/robot/resources.js');

define('Process', function() {

  var mocks = path.join(__dirname, '../mocks/');
  var output = path.join(__dirname, '../temp/');

  define('Read all resources', function() {
    it('Should read all valid data, partials, layouts and pages', function(done) {
      instance.readResources(mocks, function(err) {
        assert.equal(err, null);
        assert.equal(resources.getData().hasOwnProperty('foo'), true);
        assert.equal(handlebars.partials.hasOwnProperty('foo'), true);
        assert.equal(resources.getLayouts().hasOwnProperty('foo'), true);
        assert.equal(resources.getPages().hasOwnProperty('foo.html'), true);
        done();
      });
    });
  });

  define('Write all pages', function() {

    after(function() {
      fs.unlinkSync(path.join(output, 'foo.html'));
    });

    it('Should take process templates and write to file', function(done) {
      instance.writeOutput(function(err) {
        assert.equal(err, null);
        assert.equal(fs.existsSync(output), true);
        done();
      });
    });
  });

});