/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions, max-len */

import Settings from '../../src/settings';
import { expect } from 'chai';

describe('./src/settings.js', function () {
  let settings;

  beforeEach(function(){
    settings = new Settings([{a: 1, foo: 'bar', boot: true, boof: false}, {a: 2, b: 3}, {foo: {foo: 1, bar: {foobar: 1}}}]);
  });

  it('should return null when key is empty', function () {
    expect(settings.get('')).to.be.null;
    expect(settings.get(null)).to.be.null;
  });

  it('should contains initialized layers', function() {
    expect(settings.settingLayers.length).to.equal(3);
    expect(settings.settingLayers[0]).to.deep.equal({a: 1, foo: 'bar', boot: true, boof: false});
    expect(settings.settingLayers[1]).to.deep.equal({a: 2, b: 3});
    expect(settings.settingLayers[2]).to.deep.equal({foo: {foo: 1, bar: {foobar: 1}}});
  });

  it('should return correct 1 obj', function () {
    expect(settings.get('a')).to.equal(1);
    expect(settings.get('foo')).to.equal('bar');
  });

  it('should return correct boolean', function() {
    expect(settings.get('boot')).to.be.ok;
    expect(settings.get('boof')).to.not.be.ok;
  })

  it('should return correct 2nd obj', function() {
    expect(settings.get('b')).to.equal(3);
  });

  it('should return correct 3rd obj', function() {
    expect(settings.get('foo.foo')).to.equal(1);
    expect(settings.get('foo.bar')).to.deep.equal({foobar: 1});
    expect(settings.get('foo.bar.foobar')).to.equal(1);
  })

})