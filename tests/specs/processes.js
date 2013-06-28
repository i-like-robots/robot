var fs = require('fs');
var path = require('path');
var assert = require('assert');
var processes = require('../../lib/robot/processes.js');

describe('Processes', function() {

  var mocks = path.join(__dirname, '../mocks');

  describe('Read resources', function() {
    it('Should scan and load all resources in series', function(done) {
      processes.readResources(mocks, function(err, resources) {
        assert.equal(err, null);
        assert.equal(resources.getData().hasOwnProperty('foo'), true);
        assert.equal(resources.getPartials().hasOwnProperty('foo'), true);
        assert.equal(resources.getLayouts().hasOwnProperty('foo'), true);
        assert.equal(resources.getPages().hasOwnProperty('foo.html'), true);

        done();
      });
    });
  });

  describe('Write output', function() {

    var target = path.join(__dirname, '../temp');
    var output = path.join(__dirname, '../temp/bar.html');

    after(function() {
      fs.unlinkSync(output);
    });

    it('Should process pages and write to file', function(done) {
      var resources = require(path.join(mocks, 'processes/resources.js'));

      processes.writeOutput(target, resources, function(err) {
        assert.equal(err, null);
        assert.equal(fs.existsSync(output), true);
        assert.equal(fs.readFileSync(output, 'utf-8'), resources.getPages()['bar.html'].getTemplate());

        done();
      });

    });

  });

});