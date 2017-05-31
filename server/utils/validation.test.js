const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    expect(isRealString(undefined)).toBeFalsy();
    expect(isRealString(null)).toBeFalsy();
    expect(isRealString(12345)).toBeFalsy();
    expect(isRealString({param: 'value'})).toBeFalsy();
  });
  it('should reject strings with only spaces', () => {
    expect(isRealString('   ')).toBeFalsy();
  });
  it('should allow strings with non-space characters', () => {
    expect(isRealString('  username  ')).toBeTruthy();
  });
});
