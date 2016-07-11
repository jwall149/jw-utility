/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions, max-len */

import BaseValidator from '../../src/validators/base';
import _ from '../../src/utils/underscore';
import { expect } from 'chai';
import sinon from 'sinon';

describe('./validators/base.js', function () {
  let validator;

  it('should not do anything without fields', function () {
    validator = new BaseValidator();
    expect(_.isEmpty(validator.values)).to.be.ok;
    expect(validator.valid).to.be.ok;
    expect(validator.message).to.be.equal('');
  });

  it('should valid if all fields are valid', function () {
    validator = new BaseValidator({
      field1: { valid: true, value: 'val1' },
      field2: { valid: true, value: 'val2' },
      field3: { valid: true, value: 'val3' },
    });
    expect(validator.valid).to.be.ok;
    expect(validator.values).to.deep.equal({ field1: 'val1', field2: 'val2', field3: 'val3' });
  });

  it('should invalid if a field is invalid', function () {
    validator = new BaseValidator({
      field1: { valid: true, value: 'val1' },
      field2: { valid: false, value: 'val2', message: 'invalid' },
      field3: { valid: true, value: 'val2' },
    });
    expect(validator.valid).to.be.not.ok;
    expect(validator.message).to.equal('invalid');
  });
});

describe('./validator/TestBase.validate', function () {
  const tests = { gotit: () => true };
  const stub = sinon.stub(tests, 'gotit');

  class TestValidator extends BaseValidator {
    constructor(p1, p2) {
      tests.gotit(p1, p2);
      super({ field1: { valid: true, value: 'val1' } });
    }
  }

  it('should create TestBase validator', function () {
    const test = TestValidator.validate('params1', 'params2');
    expect(stub).have.been.calledWith('params1', 'params2');
  })

  after(function() {
    stub.restore();
  });
});
