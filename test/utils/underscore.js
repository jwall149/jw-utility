/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import _ from '../../src/utils/underscore';
import { expect } from 'chai';

describe('./utils/underscore.js rget', function () {

  let obj = {foo: 1, bar: {foo: 1, bar: 0}, foofoo: {foobar: {foo: 'bar'}}, boofoo: false, boobar: true};

  it('should return null when key is empty', function () {
    expect(_.rget('', obj)).to.be.null;
    expect(_.rget(null, obj)).to.be.null;
  });

  it('should return correct 1 layer key', function () {
    expect(_.rget('foo', obj)).to.equal(1);
    expect(_.rget('foobar', obj)).to.be.null;
    expect(_.rget('bar', obj)).to.deep.equal({foo: 1, bar: 0});
  });

  it('should return correct 2 layer key', function() {
    expect(_.rget('bar.foo', obj)).to.equal(1);
    expect(_.rget('bar.bar', obj)).to.equal(0);
    expect(_.rget('foo.bar', obj)).to.be.null;
    expect(_.rget('foofoo.foobar', obj)).to.deep.equal({foo: 'bar'});
  });

  it('should return correct 3 layer key', function() {
    expect(_.rget('foofoo.foobar.foo', obj)).to.equal('bar');
    expect(_.rget('foofoo.foobar.bar', obj)).to.be.null;
  })

  it('should return correct boolean value', function() {
    expect(_.rget('boobar', obj)).to.be.ok;
    expect(_.rget('boofoo', obj)).to.not.be.ok;
  })
});

describe('./utils/underscore.js collect', function () {
  let obj = {foo: 1, bar: {foo: 1, bar: 0}, foofoo: {foobar: {foo: 'bar'}}, boofoo: false, boobar: true};
  it('should return null when target is not object', function () {
    expect(_.collect(null, 'foo')).to.be.null;
    expect(_.collect(1, 'foo')).to.be.null;
    expect(_.collect('asdf', 'foo')).to.be.null;
  });

  it('should return null with empty key', () => {
    expect(_.collect(obj)).to.be.null;
    expect(_.collect(obj, '')).to.be.null;
    expect(_.collect(obj, [])).to.be.null;
    expect(_.collect(obj, {})).to.be.null;
  })

  it('should return null with key other than string, array or object', function () {
    expect(_.collect(obj, 1)).to.be.null;
    expect(_.collect(obj, NaN)).to.be.null;
    expect(_.collect(obj, true)).to.be.null;
    expect(_.collect(obj, 1.2)).to.be.null;
    expect(_.collect(obj, () => null)).to.be.null;
  });

  it('should return right value when key is a string', () => {
    expect(_.collect(obj, 'foo')).to.equal(1);
    expect(_.collect(obj, 'bar')).to.deep.equal({foo: 1, bar: 0});
    expect(_.collect(obj, 'foofoo')).to.deep.equal({foobar: {foo: 'bar'}});
    expect(_.collect(obj, 'boofoo')).to.not.be.ok;
    expect(_.collect(obj, 'boobar')).to.be.ok;
  });

  it('should return value when key is an array', () => {
    expect(_.collect(obj, ['foo', 'bar'])).to.deep.equal({foo: 1, bar: {foo: 1, bar: 0}})
    expect(_.collect(obj, ['foo', 'boofoo'])).to.deep.equal({foo: 1, boofoo: false});
  });

  it('should return value when key is an object', () => {
    expect(_.collect(obj, {bar: ['foo']})).to.deep.equal({bar: {foo: 1}});
    expect(_.collect(obj, {bar: ['bar']})).to.deep.equal({bar: {bar: 0}});
    expect(_.collect(obj, {bar: 'bar'})).to.deep.equal({bar: 0});
    expect(_.collect(obj, {bar: ['foo', 'bar']})).to.deep.equal({bar: {foo: 1, bar: 0}});
    expect(_.collect(obj, {foofoo: { foobar: ['foo']}})).to.deep.equal({foofoo: {foobar: {foo: 'bar'}}});
  });

  it('should return null when key does not exist', () => {
    expect(_.collect(obj, ['foo', 'nofoo'])).to.deep.equal({foo: 1, nofoo: undefined});
  });

  it('should return value of combination of key', () => {
    expect(_.collect(obj, ['foo', {bar: ['bar']}], ['foofoo', 'foobar'])).to.deep.equal({foo: 1, bar: {bar: 0}});
  });
});
