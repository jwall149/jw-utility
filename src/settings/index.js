import _ from '../utils/underscore';

class Settings {
  constructor(settingLayers = []) {
    this.settingLayers = settingLayers;
  }

  get(key) {
    if (_.isEmpty(key)) return null;
    let res = null;
    _.find(this.settingLayers, (layer) => {
      res = _.rget(key, layer);
      return res;
    });

    return res;
  }
}

export default Settings;
