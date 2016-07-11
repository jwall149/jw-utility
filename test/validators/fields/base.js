/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions, max-len */

import BaseField from '../../../src/validators/fields/base';
import Transforms from '../../../src/validators/transforms';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
const expect = chai.expect;

describe('./validators/fields/base.js', function () {
  let field;
  const sandbox = sinon.sandbox.create();

  beforeEach(function () {
    field = new BaseField('foo');
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('new field should not has error', function () {
    expect(field.valid).to.be.ok;
    expect(field.message).to.equal('');
  });

  it('should assign value if no transform option passed', function () {
    expect(field.value).to.equal('foo');
  });

  it('should be invalid after call error with default', function () {
    field.error();
    expect(field.valid).to.be.not.ok;
    expect(field.message).to.equal('form.BaseField.default');
  });

  it('should be invalid after call error with key', function () {
    field.error('tmpkey');
    expect(field.valid).to.be.not.ok;
    expect(field.message).to.equal('form.BaseField.tmpkey');
  });

  it('should return null when transform null data', function () {
    expect(field.transform()).to.be.undefined;
  });

  it('should return same data with empty transforms', function () {
    field.transform([]);
    expect(field.value).to.equal('foo');
    field.transform();
    expect(field.value).to.equal('foo');
  });

  it('should run transforms if transform option is given', function () {
    Transforms.repeat = () => {};
    const stTransformsRepeat = sandbox.stub(Transforms, 'repeat');
    stTransformsRepeat.returns('repeat_return');
    const f = new BaseField('bar', { transforms: [{ action: 'repeat' }] });
    expect(f.value).to.equal('repeat_return');
    expect(stTransformsRepeat).to.have.been.calledWith('bar');
  });

  it('should call all transforms left to right', function () {
    Transforms.first = () => {};
    Transforms.second = () => {};
    Transforms.third = () => {};

    const stTransformsFirst = sandbox.stub(Transforms, 'first');
    const stTransformsSecond = sandbox.stub(Transforms, 'second');
    const stTransformsThird = sandbox.stub(Transforms, 'third');
    stTransformsFirst.returns('first_return');
    stTransformsSecond.returns('second_return');
    stTransformsThird.returns('third_return');
    field.orgValue = 'start_data';
    field.transform([{
      action: 'first',
    }, {
      action: 'second',
      args: [],
    }, {
      action: 'third',
      args: [{ foo: 'bar' }, 'foo', 'bar'],
    }]);

    expect(field.value).to.equal('third_return');
    expect(stTransformsFirst).to.have.been.calledWith('start_data');
    expect(stTransformsSecond).to.have.been.calledWith('first_return');
    expect(stTransformsThird).to.have.been.calledWith('second_return', { foo: 'bar' }, 'foo', 'bar');
  });

  it('should transform with function when given', function () {
    const trans = { foo: () => 'bar' };
    const spyFoo = sandbox.spy(trans, 'foo');
    const f = new BaseField('foo', { transforms: [{ action: trans.foo }]});
    expect(f.value).to.equal('bar');
    expect(spyFoo).to.have.been.calledWith('foo');
  })

  it('should run validate if rule option is given', function () {
    const testRule = { checker: () => true, name: 'testRule' };
    const stRuleTrue = sandbox.stub(testRule, 'checker');
    stRuleTrue.returns(true);
    const f = new BaseField('bar', { rules: [testRule] });
    expect(f).to.not.be.null;
    expect(stRuleTrue).to.have.been.called;
  });

  it('should validate with empty rule', function () {
    expect(field.valid).to.be.ok;
    field.validate();
    expect(field.valid).to.be.ok;
    field.validate([]);
    expect(field.valid).to.be.ok;
  });

  it('should validate with true rule', function () {
    const testRule = { checker: () => true, name: 'testRule' };
    const stRuleTrue = sandbox.stub(testRule, 'checker');
    stRuleTrue.returns(true);
    const f = new BaseField('bar', { rules: [testRule] });
    expect(f.valid).to.be.ok;
    expect(stRuleTrue).to.be.calledWith('bar');
  });

  it('should not validate with false rule', function () {
    const testRule = { checker: () => true, name: 'testRule' };
    const stRuleFalse = sandbox.stub(testRule, 'checker');
    stRuleFalse.returns(false);
    const f = new BaseField('bar', { rules: [testRule] });
    expect(f.valid).to.not.be.ok;
    expect(stRuleFalse).to.be.calledWith('bar');
  });

  it('should not continue checking after false rule', function () {
    const testRule1 = { checker: () => true, name: 'testRule1' };
    const testRule2 = { checker: () => false, name: 'testRule2' };
    const testRule3 = { checker: () => false, name: 'testRule3' };
    const stTestRule1 = sandbox.stub(testRule1, 'checker');
    stTestRule1.returns(true);
    const stTestRule2 = sandbox.stub(testRule2, 'checker');
    stTestRule2.returns(false);
    const stTestRule3 = sandbox.stub(testRule3, 'checker');
    stTestRule3.returns(true);
    const f = new BaseField('bar', { rules: [testRule1, testRule2, testRule3] });
    expect(f.valid).to.be.not.ok;
    expect(stTestRule1).to.be.calledWith('bar');
    expect(stTestRule2).to.be.calledWith('bar');
    expect(stTestRule3).to.not.be.called;
  });
});
