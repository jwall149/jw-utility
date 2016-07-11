/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import Counter from '../../src/utils/counter';
import { expect } from 'chai';
describe('./utils/counter.js', function () {
  let counter;
  it('first count is alway 1', function () {
    counter = new Counter();
    expect(counter.get()).to.equal(1);
  });

  it('should increase after a call', function () {
    counter = new Counter();
    expect(counter.get()).to.equal(1);
    expect(counter.get()).to.equal(2);
    expect(counter.get()).to.equal(3);
  });
});
