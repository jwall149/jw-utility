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
  static validate(..._args) {
    // http://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
    // The first null is required to reserved bind syntactical reason
    const args = [null].concat(_args || []);
    return new (this.bind.apply(this, args));
  }
}

export default BaseValidator;
