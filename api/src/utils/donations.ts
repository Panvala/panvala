const { Donation } = require('../models');

// Base transaction info -- all required
export interface IDonationTx {
  txHash: string;
  metadataHash: string;
  sender: string;
  donor: string;
  tokens: string;
}

// Donation data that is public
export interface IPublicDonation extends IDonationTx {
  metadataVersion?: string;
  memo?: string;
  usdValueCents?: string;
  ethValue?: string;
  pledgeMonthlyUSDCents?: number;
  pledgeTerm?: number;
}

export interface IDonation extends IPublicDonation {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  fundraiser?: string;
}

export function addDonation(donation: IDonation) {
  return Donation.create(donation);
}

const publicFields = [
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
];

export function getPublicDonations(): Promise<IPublicDonation[]> {
  return Donation.findAll({
    attributes: publicFields,
  });
}

export function getDonationsForFundraiser(fundraiser: string): Promise<IPublicDonation[]> {
  return Donation.findAll({
    attributes: publicFields,
    where: {
      fundraiser,
    },
  });
}
