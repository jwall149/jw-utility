import _ from '../../utils/underscore';
import isLength from 'validator/lib/isLength';
import isAscii from 'validator/lib/isAscii';

import BaseField from './base';

class PasswordField extends BaseField {
  constructor(password) {
    super(password, {
      transforms: [{ action: 'trim' }, { action: 'lowerCase' }],
      rules: [
        { checker: (obj) => !_.isEmpty(obj), name: 'empty' },
        { checker: isAscii, name: 'invalid' },
        { checker: isLength, name: 'length', params: { length: { min: 6, max: 30 } } },
      ],
    });
  }
}

export default PasswordField;
