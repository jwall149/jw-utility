import _ from 'underscore';

// recursive get from object
// Example: _.rget('foo.bar', {foo: {bar: 1, far: 2}}) => 1
_.rget = (deepKey, _obj) => {
  if (_.isEmpty(deepKey) || !_obj) return null;

  let obj = _obj;
  for (let i = 0, path = deepKey.split('.'), len = path.length; i < len; i++) {
    if (typeof(obj) === 'undefined' || typeof(obj[path[i]]) === 'undefined') return null;
    obj = obj[path[i]];
  }

  return obj;
};

_.collect = (target, keyObj) => {
  if (!_.isObject(target) || _.isEmpty(keyObj)) return null;
  if (_.isString(keyObj)) return target[keyObj];
  if (_.isArray(keyObj)) {
    const res = {};
    _.each(keyObj, (key) => {
      if (_.isString(key)) {
        res[key] = _.collect(target, key)
      } else {
        _.extend(res, _.collect(target, key));
      }
    });
    return res;
  }
  if (_.isObject(keyObj)) {
    const res = {};
    _.each(keyObj, (val, key) => (res[key] = _.collect(target[key], val)));
    return res;
  }
  return null;
}

export default _;
