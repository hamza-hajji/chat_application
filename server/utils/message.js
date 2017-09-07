var generateMessage = (from, content) => {
  return {from, content, createdAt: Date.now()};
};

var generateLocationMessage = (from, lat, lon) => {
  return {
    from,
    url: `https://google.com/maps?${lat},${lon}`,
    createdAt: Date.now()
  };
};

module.exports = {generateMessage, generateLocationMessage};
