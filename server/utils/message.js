var generateMessage = (from, content) => {
  return {from, content, createdAt: Date.now()};
};

module.exports = {generateMessage};
