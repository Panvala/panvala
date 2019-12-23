import { formatDonation } from './donate';

describe('formatDonation', () => {
  test('it should have the correct fields', () => {
    const txInfo = {
      txHash: '',
      metadataHash: '',
      sender: '',
      donor: '',
      tokens: '',
    };

    const ipfsMetadata = {
      version: '1',
      memo: '',
      usdValue: '100',
      ethValue: '10',
      pledgeMonthlyUSD: 100,
      pledgeTerm: 1,
    };

    const userInfo = {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
    };

    const formatted = formatDonation(txInfo, ipfsMetadata, userInfo);

    const expectedFields = [
      'txHash',
      'metadataHash',
      'sender',
      'donor',
      'tokens',
      'metadataVersion',
      'memo',
      'usdValueCents',
      'ethValue',
      'pledgeMonthlyUSDCents',
      'pledgeTerm',
      'firstName',
      'lastName',
      'email',
      'company',
    ];

    const actualFields = Object.keys(formatted);
    expect(actualFields.sort()).toStrictEqual(expectedFields.sort());
  });
});
