/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions, max-len */

import EmailField from '../../../src/validators/fields/email';
import { expect } from 'chai';

describe('./validators/fields/email.js', function () {
  let field;

  it('empty email field should be invalid and raise empty error', function () {
    field = new EmailField();
    expect(field.valid).to.be.not.ok;
    expect(field.message).to.be.equal('form.EmailField.empty');

    field = new EmailField('   ');
    expect(field.valid).to.be.not.ok;
    expect(field.message).to.be.equal('form.EmailField.empty');
  });

  it('email should be trim', function () {
    field = new EmailField('   foo@btest.com  ');
    expect(field.valid).to.be.ok;
    expect(field.value).to.be.equal('foo@btest.com');
  });

  it('should validate valid email', function () {
    field = new EmailField('foo@btest.com');
    expect(field.valid).to.be.ok;
    field = new EmailField('foo.bar@b.test.com');
    expect(field.valid).to.be.ok;
  });

  it('should not validate invalid email', function () {
    field = new EmailField('foo@btest');
    expect(field.valid).to.be.not.ok;
    field = new EmailField('foobtest.com');
    expect(field.valid).to.be.not.ok;
    field = new EmailField('foo@bar@btest.com');
    expect(field.valid).to.be.not.ok;
  });
});
