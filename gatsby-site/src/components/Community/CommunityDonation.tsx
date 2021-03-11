import React from 'react';

import Box from '../system/Box';
import CommunityDonationForm from './CommunityDonationForm';
import { withCommunityDonationFlow } from './communityDonationFlow';

type KeyValuePair = { [key: string]: any; };

interface CommunityDonationProps {
  community: string;
  step: number | null;
  message: string;
  initialValues: KeyValuePair;
  onCancel(): void;
  onDonate(data: KeyValuePair, actions: KeyValuePair): void;
  onChangePaymentToken(newToken: string): Promise<void>;
  onChangeFiatAmount(newFiatAmount: number, paymentToken: string): Promise<number>;
  onChangeTokenAmount(newTokenAmount: number, paymentToken: string): Promise<number>;
  connectWallet(): void;
}

const CommunityDonation = (props: CommunityDonationProps) => {
  const {
    initialValues,
    onDonate,
    onChangePaymentToken,
    onChangeFiatAmount,
    onChangeTokenAmount,
    connectWallet,
  } = props;

  return (
    <Box data-testid="community-donation-container">
      <CommunityDonationForm
        initialValues={initialValues}
        onSubmit={onDonate}
        connectWallet={connectWallet}
        onChangePaymentToken={onChangePaymentToken}
        onChangeFiatAmount={onChangeFiatAmount}
        onChangeTokenAmount={onChangeTokenAmount}
      />
    </Box>
  );
};

const PoweredCommunityDonation = withCommunityDonationFlow(CommunityDonation);

export default PoweredCommunityDonation;
