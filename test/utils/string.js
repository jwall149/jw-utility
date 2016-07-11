/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions, max-len */

import '../../src/utils/string';
import { expect } from 'chai';

describe('./utils/string.js', function () {
  it('should break to chunks correctly', function () {
    const chunks = '123456789'.breakTo([3, 2, 3]);
    expect(chunks.length).to.be.equal(3);
    expect(chunks[0]).to.be.equal('123');
    expect(chunks[1]).to.be.equal('45');
    expect(chunks[2]).to.be.equal('678');
  });
});
