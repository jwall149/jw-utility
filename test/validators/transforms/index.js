/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import Transforms from '../../../src/validators/transforms';
import { expect } from 'chai';

describe('./validators/transforms/index.js', function () {
  it('should has trim method and lowerCase', function () {
    expect(Transforms.trim).to.be.not.null;
    expect(Transforms.lowerCase).to.be.not.null;
  });
});
