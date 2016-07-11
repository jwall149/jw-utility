import _ from '../utils/underscore';

class BaseValidator {
  constructor(fields) {
    this.values = {};
    this.valid = true;
    this.message = '';
    const ef = _.find(fields || [], (field, key) => {
      this.values[key] = field.value;
      return !field.valid;
    });
    if (ef) {
      this.valid = false;
      this.message = ef.message;
    }
  }
}

export default BaseValidator;
