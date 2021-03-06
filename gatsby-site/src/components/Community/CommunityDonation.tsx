import React from 'react';

import Box from '../system/Box';
import CommunityDonationForm from './CommunityDonationForm';
import { withCommunityDonationFlow } from './communityDonationFlow';

type KeyValuePair = { [key: string]: any; };

interface CommunityDonationProps {
  community: string;
  step: number | null;
  message: string;
  onCancel(): void;
  onDonate(data: KeyValuePair, actions: KeyValuePair): void;
  onChangePaymentNetwork(newToken: string): Promise<void>;
  onChangeFiatAmount(newFiatAmount: number, paymentToken: string): Promise<number>;
  onChangeTokenAmount(newTokenAmount: number, paymentToken: string): Promise<number>;
  connectWallet(): void;
}

const CommunityDonation = (props: CommunityDonationProps) => {
  const {
    onDonate,
    onChangePaymentNetwork,
    onChangeFiatAmount,
    onChangeTokenAmount,
    connectWallet,
  } = props;

  // Click handler for donations
  async function handleDonation(values: KeyValuePair, actions: KeyValuePair) {
    console.log('Donation:', 'handleDonation', values);

    const { firstName, lastName, email, fiatAmount, paymentToken, } = values;

    // Data needed for the donation flow
    const data = {
      userData: { firstName, lastName, email },
      donationMetadata: { paymentToken, fiatAmount },
    };

    try {
      onDonate(data, actions);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Box data-testid="community-donation-container">
      <CommunityDonationForm
        onSubmit={handleDonation}
        connectWallet={connectWallet}
        onChangePaymentNetwork={onChangePaymentNetwork}
        onChangeFiatAmount={onChangeFiatAmount}
        onChangeTokenAmount={onChangeTokenAmount}
      />
    </Box>
  );
};

const PoweredCommunityDonation = withCommunityDonationFlow(CommunityDonation);

export default PoweredCommunityDonation;
