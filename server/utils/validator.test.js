const expect = require('expect');
const {isValidString} = require('./validator');

describe('isValidString()', () => {
  it('should return true if string is valid', () => {
    expect(isValidString('string  ')).toBe(true);
  });

  it('should return false if string is invalid', () => {
    expect(isValidString('  ')).toBe(false);
  });

  it('should return false if value is not a string', () => {
    expect(isValidString(12)).toBe(false);
  });
});
