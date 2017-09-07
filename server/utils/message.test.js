const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage()', () => {
  it('should generate the correct message', () => {
    var result = generateMessage('Hamza', 'Hi, there!');
    expect(result).toInclude({from: 'Hamza', content: 'Hi, there!'});
    expect(result.createdAt).toBeA('number');
  });
});
