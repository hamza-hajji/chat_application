const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage()', () => {
  it('should generate the correct message', () => {
    var result = generateMessage('Hamza', 'Hi, there!');
    expect(result).toInclude({from: 'Hamza', content: 'Hi, there!'});
    expect(result.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage()', () => {
  it('should generate the correct location message', () => {
    var result = generateLocationMessage('Hamza', 123, 456);
    expect(result).toInclude({from: 'Hamza', url: 'https://google.com/maps?123,456'});
    expect(result.createdAt).toBeA('number');
  });
});
