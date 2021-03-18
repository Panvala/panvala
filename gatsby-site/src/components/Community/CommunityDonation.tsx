import React from 'react';

import CommunityDonationForm from './CommunityDonationForm';
import { withCommunityDonationFlow } from './communityDonationFlow';
import { ICommunityData } from '../../data';
import { InfoPopup, ErrorPopup } from './Popups';

interface CommunityDonationProps {
  community: ICommunityData;
  step: number | null;
  message: string;
  errorMessage: string;
  infoPopupVisible: boolean;
  infoPopupLoading: boolean;
  infoPopupSuccess: boolean;
  errorPopupVisible: boolean;
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
    step,
    message,
    errorMessage,
    infoPopupVisible,
    infoPopupLoading,
    infoPopupSuccess,
    errorPopupVisible,
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
      />
      <InfoPopup
        step={step}
        message={message}
        isVisible={infoPopupVisible}
        isLoading={infoPopupLoading}
        isSuccess={infoPopupSuccess}
      />
      {/* <ErrorPopup message={errorMessage} isVisible={errorPopupVisible} /> */}
    </div>
  );
};

const PoweredCommunityDonation = withCommunityDonationFlow(CommunityDonation);

export default PoweredCommunityDonation;
