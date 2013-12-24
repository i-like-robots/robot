var path = require('path');
var assert = require('assert');
var Sitemap = require('../../../lib/robot/collections/sitemap');

describe('Sitemap', function() {

  describe('Walk', function() {

    it('Should create a tree for the given path string', function() {
      var instance = new Sitemap();

      instance.addPage('section/category-1/item-1');
      instance.addPage('section/category-1/item-2');
      instance.addPage('section/category-2');

      assert.equal(instance._tree.length, 1);
      assert.equal(instance._tree[0].id, 'section');
      assert.equal(instance._tree[0].children.length, 2);
      assert.equal(instance._tree[0].children[0].id, 'category-1');
      assert.equal(instance._tree[0].children[0].children.length, 2);
      assert.equal(instance._tree[0].children[0].children[0].id, 'item-1');

    });

  });

});