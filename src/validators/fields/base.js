import Transforms from '../transforms';
import _ from '../../utils/underscore';

class BaseField {
  constructor(value, options) {
    this.orgValue = value;
    this.valid = true;
    this.message = '';
    if (options && options.transforms) {
      this.transform(options.transforms);
    } else {
      this.value = value;
    }
    if (options && options.rules) this.validate(options.rules);
  }
  transform(transArray) {
    let value = _.clone(this.orgValue);
    if (!value || _.isEmpty(transArray)) return;
    value = _.reduce(transArray, (_value, trans) => {
      const args = [_value].concat(trans.args || []);
      if (trans && typeof(trans.action) === 'function') {
        return trans.action.apply(_value, args);
      } else if (trans && trans.action && (typeof(trans.action) === 'string') &&
        Transforms[trans.action] && typeof(Transforms[trans.action]) === 'function') {
        return Transforms[trans.action].apply(_value, args);
      }
      return _value;
    }, value);
    this.value = value;
  }
  validate(rules) {
    if (!rules || _.isEmpty(rules)) return;
    const err = _.find(rules, (rule) => {
      const params = [this.value].concat(rule.params || []);
      return !rule.checker.apply(this, params);
    });
    if (err) this.error(err.name);
  }
  error(key) {
    this.valid = false;
    this.message = `form.${this.constructor.name}.${key || 'default'}`;
  }
}

export default BaseField;
