var assert = require('assert');
var Sitemap = require('../../../lib/robot/collections/sitemap');

describe('Sitemap', function() {

  var instance;

  beforeEach(function() {
    instance = new Sitemap;
  });

  describe('Traverse', function() {

    it('Should create a tree for the given path string', function() {
      instance.traverse('section/category-1/item-1', true);
      instance.traverse('section/category-1/item-2', true);
      instance.traverse('section/category-2', true);

      assert.equal(instance._tree.length, 1);
      assert.equal(instance._tree[0].id, 'section');
      assert.equal(instance._tree[0].children.length, 2);
      assert.equal(instance._tree[0].children[0].id, 'category-1');
      assert.equal(instance._tree[0].children[0].children.length, 2);
      assert.equal(instance._tree[0].children[0].children[0].id, 'item-1');
    });

    it('Should return the payload for a given path string', function() {
      var path = 'section/category-1/item-1';
      var payload = 'Hello World';

      instance.traverse(path, payload);

      assert.equal(instance.traverse(path).data, payload);
    });

    it('Should return null when the given path string does not exist', function() {
      assert.equal(instance.traverse('this/does/not/exist'), null);
    });

  });

});
