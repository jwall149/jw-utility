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

export default _;
