import * as request from 'supertest';
import { bigNumberify, hashMessage } from 'ethers/utils';

import app from '..';
import { migrate } from '../migrate';
import { sequelize } from '../models';
import { IDonation, addDonation, getPublicDonations, IPublicDonation } from '../utils/donations';
import { someTxHash, someCID, someAddress, expectFields, toBaseTokens } from './utils';

const { Donation } = require('../models');

beforeAll(() => {
  sequelize.options.logging = false;
  return migrate();
});

afterAll(() => {
  const q = sequelize.getQueryInterface();
  return q.dropAllTables().then(() => sequelize.close());
});

beforeEach(async () => {
  return Donation.truncate();
});

const requiredFields = ['txHash', 'metadataHash', 'sender', 'donor', 'tokens'];

describe('API endpoints', () => {
  const route = '/api/donations';

  describe('POST /api/donations', () => {
    test('it should create a new basic donation', async () => {
      const data: IDonation = {
        txHash: someTxHash,
        metadataHash: someCID,
        sender: someAddress,
        donor: someAddress,
        tokens: bigNumberify(1000).toString(),
      };
      const result = await request(app)
        .post(route)
        .send(data);

      // console.log('RESULT', result.body);
      expect(result.ok).toBe(true);

      const created = result.body;
      expect(created).toHaveProperty('createdAt');
      expect(created).toHaveProperty('updatedAt');

      expectFields(created, data);
    });

    test('it should create a donation with extra data', async () => {
      const data: IDonation = {
        txHash: someTxHash,
        metadataHash: someCID,
        sender: someAddress,
        donor: someAddress,
        tokens: toBaseTokens(1000),
        metadataVersion: '1',
        memo: 'A donation',
        usdValue: '4500',
        ethValue: toBaseTokens(1.337),
        pledgeMonthlyUSD: 1500,
        pledgeTerm: 3,
      };

      const result = await request(app)
        .post(route)
        .send(data);

      // console.log('RESULT', result.body);
      expect(result.ok).toBe(true);
    });

    describe('Field validation', () => {
      let data: IDonation;
      beforeEach(() => {
        data = {
          txHash: someTxHash,
          metadataHash: someCID,
          sender: someAddress,
          donor: someAddress,
          tokens: bigNumberify(1000).toString(),
        };
      });

      describe('missing required fields', () => {
        test.each(requiredFields)('it should fail if %s is null', async field => {
          data[field] = null;

          const result = await request(app)
            .post(route)
            .send(data);

          expect(result.status).toBe(400);
        });

        test.each(requiredFields)('it should fail if %s is undefined', async field => {
          data[field] = undefined;

          const result = await request(app)
            .post(route)
            .send(data);

          expect(result.status).toBe(400);
        });

        test.each(requiredFields)('it should fail if %s is empty', async field => {
          data[field] = '';

          const result = await request(app)
            .post(route)
            .send(data);

          expect(result.status).toBe(400);
        });
      });

      // values that must be non-zero integers
      const integerFields = ['pledgeMonthlyUSD', 'pledgeTerm'];
      test.each(integerFields)('it should return 400 if %s is not an integer', async field => {
        data[field] = 10.5;

        const result = await request(app)
          .post(route)
          .send(data);

        expect(result.status).toBe(400);
      });

      test.each(integerFields)('is should return 400 if %s is less than 1', async field => {
        data[field] = 0.9;

        const result = await request(app)
          .post(route)
          .send(data);

        // console.log('RESULT', result.body);
        expect(result.status).toBe(400);
      });

      // values that must be in dollars
      const dollarFields = ['usdValue', 'pledgeMonthlyUSD'];
      test.each(dollarFields)('it should return 400 if %s is less than a dollar', async field => {
        data[field] = 99;
        const result = await request(app)
          .post(route)
          .send(data);

        // console.log('RESULT', result.body);
        expect(result.status).toBe(400);
      });

      test.each(dollarFields)('it should return 400 if %s is not an integer', async field => {
        data[field] = 1.0;
        const result = await request(app)
          .post(route)
          .send(data);

        expect(result.status).toBe(400);
      });

      const tokenFields = ['tokens', 'ethValue'];
      test.each(tokenFields)(
        'it should return 400 if %s does not parse to an integer (bigNumber)',
        async field => {
          data[field] = '1.0';

          const result = await request(app)
            .post(route)
            .send(data);

          console.log('RESULT', result.body);
          expect(result.status).toBe(400);
        }
      );

      // reject invalid emails
      test('it should return 400 if the email is invalid', async () => {
        data.email = 'notanemail';

        const result = await request(app)
          .post(route)
          .send(data);

        expect(result.status).toBe(400);
      });
    });
  });

  describe('GET /api/donations', () => {
    let data: IDonation;

    beforeEach(() => {
      data = {
        txHash: someTxHash,
        metadataHash: someCID,
        sender: someAddress,
        donor: someAddress,
        tokens: toBaseTokens(1000),
        metadataVersion: '1',
        memo: 'A donation',
        usdValue: '4500',
        ethValue: toBaseTokens(1.337),
        pledgeMonthlyUSD: 1500,
        pledgeTerm: 3,
        firstName: 'Jane',
        lastName: 'Crypto',
        email: 'jane@example.com',
        company: 'Example Company',
      };
    });

    test('it should retrieve donations', async () => {
      // Add a couple donations
      const d2 = {
        ...data,
        txHash: hashMessage('d2'),
        firstName: 'John',
        lastName: 'Ether',
        email: 'john@example.com',
      };
      await addDonation(data);
      await addDonation(d2);

      // Retrieve them
      const result = await request(app)
        .get(route)
        .send(data);

      expect(result.ok).toBe(true);
      expect(result.body).toHaveLength(2);
    });

    test('it should return an empty list if there are no donations', async () => {
      const result = await request(app)
        .get(route)
        .send(data);

      expect(result.ok).toBe(true);
      expect(result.body).toHaveLength(0);
    });
  });
});

describe('donation utilities', () => {
  test('it should create a new donation', async () => {
    const data: IDonation = {
      txHash: '0x',
      metadataHash: '',
      sender: '0x',
      donor: '0x',
      tokens: '0x',
    };
    const donation = await addDonation(data);
    Object.keys(data).forEach(key => {
      expect(donation[key]).toBe(data[key]);
    });
    // console.log(donation);
  });

  test('it should get public donation information', async () => {
    const data: IDonation = {
      txHash: '0x',
      metadataHash: '',
      sender: '0x',
      donor: '0x',
      tokens: '0x',
    };
    await addDonation(data);

    const donations: IPublicDonation[] = await getPublicDonations();
    expect(donations.length).toBe(1);

    // Skip user fields
    const userFields = ['firstName', 'lastName', 'email', 'company'];
    userFields.forEach(field => {
      expect(data[field]).toBeUndefined();
    });
  });

  describe('missing required fields', () => {
    let data: IDonation;

    beforeEach(() => {
      data = {
        txHash: '0x',
        metadataHash: '',
        sender: '0x',
        donor: '0x',
        tokens: '0x',
      };
    });

    const requiredFields = ['txHash', 'metadataHash', 'sender', 'donor', 'tokens'];
    test.each(requiredFields)('it should fail if %s is null', async field => {
      data[field] = null;

      await expect(addDonation(data)).rejects.toThrow();
    });
  });
});
