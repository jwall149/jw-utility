import _ from './underscore';

const Moment = require('moment');

_.extend(Date.prototype, {
  getMoment() {
    return new Moment(this);
  },
  format(...args) {
    const m = this.getMoment();
    return m.format.apply(m, args);
  },
  addDays(d) {
    this.setTime(this.getTime() + (d * 24 * 60 * 60 * 1000));
    return this;
  },
  addMinutes(m) {
    this.setTime(this.getTime() + (m * 60 * 1000));
    return this;
  },
  round(hour = 0, minute = 0, second = 0, minisecond = 0) {
    this.setUTCHours(hour);
    this.setUTCMinutes(minute);
    this.setUTCSeconds(second);
    this.setUTCMilliseconds(minisecond);
    return this;
  },
});
