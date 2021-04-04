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
  error: string;
  isDonating: boolean;
  isSuccess: boolean;
  transactionHash: string;
  onCancel(): void;
  onDonate(data: any, actions: any): Promise<string>;
  onChangePaymentToken(newToken: string): Promise<void>;
  onChangeFiatAmount(newFiatAmount: number, paymentToken: string): Promise<number>;
  onChangeTokenAmount(newTokenAmount: number, paymentToken: string): Promise<number>;
  connectWallet(): void;
}

const CommunityDonation = (props: CommunityDonationProps) => {
  const {
    community,
    onDonate,
    onChangePaymentToken,
    onChangeFiatAmount,
    onChangeTokenAmount,
    connectWallet,
    ...passedInProps
  } = props;

  return (
    <div data-testid="community-donation-container">
      <CommunityDonationForm
        onSubmit={onDonate}
        connectWallet={connectWallet}
        onChangePaymentToken={onChangePaymentToken}
        onChangeFiatAmount={onChangeFiatAmount}
        onChangeTokenAmount={onChangeTokenAmount}
        walletAddresses={community.addresses}
        {...passedInProps}
      />
    </div>
  );
};

const PoweredCommunityDonation = withCommunityDonationFlow(CommunityDonation);

export default PoweredCommunityDonation;
