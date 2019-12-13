import { toUSDCents } from './format';

describe('toUSDCents', () => {
  test('it should format a string', () => {
    const dollars = '5';
    const cents = toUSDCents(dollars);
    expect(cents).toBe('500');
  });

  test('it should reject decimal values', () => {
    const dollars = '5.1';
    expect(() => toUSDCents(dollars)).toThrow();
  });
});
