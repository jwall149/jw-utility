/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions, max-len */

import PasswordField from '../../../src/validators/fields/password';
import { expect } from 'chai';

describe('./validators/fields/password.js', function () {
  let field;

  it('empty password field should be invalid and raise empty error', function () {
    field = new PasswordField();
    expect(field.valid).to.be.not.ok;
    expect(field.message).to.be.equal('form.PasswordField.empty');
  });

  it('should validate valid password', function () {
    field = new PasswordField('anypasswordthing');
    expect(field.valid).to.be.ok;
  });

  it('should not validate invalid password', function () {
    field = new PasswordField('foo@btestå');
    expect(field.valid).to.be.not.ok;
  });
});
