const moment = require('moment');

var now = moment().valueOf();

var generateMessage = (from, content) => {
  return {from, content, createdAt: now};
};

var generateLocationMessage = (from, lat, lon) => {
  return {
    from,
    url: `https://google.com/maps?${lat},${lon}`,
    createdAt: now
  };
};

module.exports = {generateMessage, generateLocationMessage};
