import React from 'react';

import CommunityDonationForm from './CommunityDonationForm';
import { withCommunityDonationFlow } from './communityDonationFlow';
import { ICommunityData } from '../../data';

interface CommunityDonationProps {
  initialValues: any;
  community: ICommunityData;
  selectedToken: string;
  activeAccount: string;
  step: number | null;
  message: string;
  errorMessage: string;
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
    step,
    message,
    errorMessage,
    onDonate,
    onChangePaymentToken,
    onChangeFiatAmount,
    onChangeTokenAmount,
    connectWallet,
  } = props;

  return (
    <div data-testid="community-donation-container">
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
        errorMessage={errorMessage}
        step={step}
        message={message}
      />
    </div>
  );
};

const PoweredCommunityDonation = withCommunityDonationFlow(CommunityDonation);

export default PoweredCommunityDonation;
