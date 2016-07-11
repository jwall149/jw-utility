import isEmail from 'validator/lib/isEmail';
import _ from '../../utils/underscore';

import BaseField from './base';

class EmailField extends BaseField {
  constructor(email) {
    super(email, {
      transforms: [{ action: 'trim' }, { action: 'lowerCase' }],
      rules: [
        { checker: (obj) => !_.isEmpty(obj), name: 'empty' },
        { checker: isEmail, name: 'invalid' },
      ],
    });
  }
}

export default EmailField;
