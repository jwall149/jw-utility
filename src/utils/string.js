import _ from './underscore';

_.extend(String.prototype, {
  breakTo(chunks) {
    if (!chunks || !_.isArray(chunks) || chunks.length === 0) return this;
    let str = this;
    return _.map(chunks, (num) => {
      const brIdx = parseInt(num, 10);
      const fc = str.substr(0, brIdx);
      str = str.substr(brIdx);
      return fc;
    });
  },
});
