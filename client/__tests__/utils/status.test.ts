import { convertEVMSlateStatus } from '../../utils/status';

describe('Status', () => {
  test('should return the correct status for each EVM slate status', () => {
    const unstaked = convertEVMSlateStatus(0);
    expect(unstaked).toBe('PENDING TOKENS');
    const staked = convertEVMSlateStatus(1);
    expect(staked).toBe('PENDING VOTE');
    const rejected = convertEVMSlateStatus(2);
    expect(rejected).toBe('REJECTED');
    const accepted = convertEVMSlateStatus(3);
    expect(accepted).toBe('ACCEPTED');
  });

  test('should throw an error if given an invalid status', () => {
    const invalid = convertEVMSlateStatus(7483921);
    expect(invalid).toBe(undefined);
  });
});
