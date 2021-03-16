import React from 'react';

import Box from '../system/Box';
import CommunityDonationForm from './CommunityDonationForm';
import { withCommunityDonationFlow } from './communityDonationFlow';
import { ICommunityData } from '../../data';

interface CommunityDonationProps {
  community: ICommunityData;
  step: number | null;
  message: string;
  initialValues: any;
  selectedToken: string;
  activeAccount: string;
  onCancel(): void;
  onDonate(data: any, actions: any): void;
  onChangePaymentToken(newToken: string): Promise<void>;
  onChangeFiatAmount(newFiatAmount: number, paymentToken: string): Promise<number>;
  onChangeTokenAmount(newTokenAmount: number, paymentToken: string): Promise<number>;
  connectWallet(): void;
}

const CommunityDonation = (props: CommunityDonationProps) => {
  const {
    initialValues,
    community,
    selectedToken,
    activeAccount,
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
        activeAccount={activeAccount}
        onChangePaymentToken={onChangePaymentToken}
        onChangeFiatAmount={onChangeFiatAmount}
        onChangeTokenAmount={onChangeTokenAmount}
        walletAddresses={community.addresses}
        selectedToken={selectedToken}
      />
    </Box>
  );
};

const PoweredCommunityDonation = withCommunityDonationFlow(CommunityDonation);

export default PoweredCommunityDonation;
