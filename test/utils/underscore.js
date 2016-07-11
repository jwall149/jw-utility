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

})