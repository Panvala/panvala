import React, { useEffect, useState } from 'react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

import FieldText from '../FieldText';
import Label from '../Label';
import DownArrow from '../Form/DownArrow';
import { FormError } from '../Form/FormError';
import swapIcon from '../../img/swap.png';
import { TokenEnums, networks, NetworkEnums } from '../../data';
import { shortenString } from '../../utils/format';

export interface ICommunityDonationFormFields {
  paymentToken: string;
  tokenAmount: number;
  fiatAmount: number;
  firstName: string;
  lastName: string;
  email: string;
}

// TODO: add the 'required' tags back to the user metadata fields
// (they're currently commented out for quicker debugging)

const CommunityDonationFormSchema: yup.ObjectSchema<ICommunityDonationFormFields> = yup.object().shape({
  paymentToken: yup
    .string()
    .trim(),
    // .required('Please enter your payment method.'),
  tokenAmount: yup
    .number()
    .moreThan(0, 'Please select a donation amount.'),
  fiatAmount: yup
    .number()
    .moreThan(0, 'Please select a donation amount in USD.'),
  firstName: yup
    .string()
    .trim(),
  lastName: yup
    .string()
    .trim(),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address.'),
});

interface CommunityDonationFormProps {
  initialValues: any;
  walletAddresses: {
    [chainId: string]: string;
  };
  selectedToken: string;
  activeAccount: string;
  errorMessage: string;
  step: number | null;
  message: string;
  onSubmit(values: any, actions: any): void;
  onChangePaymentToken(newToken: string): Promise<void>;
  onChangeTokenAmount(newTokenAmount: number, paymentToken: string): Promise<number>;
  onChangeFiatAmount(newFiatAmount: number, paymentToken: string): Promise<number>;
  connectWallet(): void;
}

const CommunityDonationForm = (props: CommunityDonationFormProps) => {
  const {
    initialValues,
    walletAddresses,
    selectedToken,
    activeAccount,
    errorMessage,
    message,
    onSubmit,
    onChangePaymentToken,
    onChangeTokenAmount,
    onChangeFiatAmount,
    connectWallet,
  } = props;

  const [showPersonalInfo, setShowPersonalInfo] = useState<boolean>(false);

  function getAddNetworkHelpText(token: TokenEnums) {
    let helpUrl = '';
    let networkName = '';
    if (token === TokenEnums.XDAI) {
      networkName = networks[NetworkEnums.XDAI].name;
      helpUrl = 'https://www.xdaichain.com/for-users/wallets/metamask/metamask-setup#setting-up-metamask-for-xdai';
    }
    else if (token === TokenEnums.MATIC) {
      networkName = networks[NetworkEnums.MATIC].name;
      helpUrl = 'https://docs.matic.network/docs/develop/metamask/config-matic/';
    }

    return (
      <>
        {!!helpUrl && !!networkName && (
          <p className="f6 lh-copy">
            <a href={helpUrl} target="_blank" rel="noreferrer" className="teal link">Click here for instructions</a> on how to add the {networkName} network to MetaMask.
          </p>
        )}
      </>
    )
  }

  function handleDonate(values: any, actions: any) {
    onSubmit(values, actions);
    actions.setSubmitting(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CommunityDonationFormSchema}
      onSubmit={handleDonate}
    >
      {({ values, handleSubmit, handleChange, setFieldValue, isSubmitting }) => {

        useEffect(() => {
          if (values.paymentToken === '' && selectedToken !== '')
            setFieldValue('paymentToken', selectedToken);
        }, [selectedToken]);

        const handleChangePaymentToken = (e: React.ChangeEvent<any>) => {
          onChangePaymentToken(e.target.value);
          // TODO: recalculate instead of clear
          setFieldValue('tokenAmount', 0);
          setFieldValue('fiatAmount', 0);
          handleChange(e);
        };

        const handleChangeTokenAmount = (e: React.ChangeEvent<any>) => {
          onChangeTokenAmount(e.target.value, values.paymentToken).then((val) => {
            setFieldValue('fiatAmount', val);
          });
          handleChange(e);
        };

        const handleChangeFiatAmount = (e: React.ChangeEvent<any>) => {
          onChangeFiatAmount(e.target.value, values.paymentToken).then((val) => {
            setFieldValue('tokenAmount', val);
          });
          handleChange(e);
        };

        function getWalletExplorerUrl(walletAddress: string): string {
          if (values.paymentToken === TokenEnums.ETH)
            return `https://etherscan.io/address/${walletAddress}`;
          else if (values.paymentToken === TokenEnums.XDAI)
            return `https://blockscout.com/poa/xdai/address/${walletAddress}`;
          else if (values.paymentToken === TokenEnums.MATIC)
            return `https://explorer-mainnet.maticvigil.com/address/${walletAddress}`;
          return '';
        }

        return (  
          <form
            data-testid="community-donation-form"
            onSubmit={handleSubmit}
            name="community-donation"
          >

            <Label className="f5 b">Payment Method</Label>
            <FormError name="paymentToken" className="pt2" />
            <Field
              as="select"
              name="paymentToken"
              required
              className="f6 input-reset b--black-10 pv3 ph2 db center w-100 br3 mt2 bg-white black-50"
              value={values.paymentToken}
              onChange={handleChangePaymentToken}
              id="payment-token-select"
            >
              {walletAddresses && Object.keys(walletAddresses).map(chainId =>
                <option key={networks[chainId].token} value={networks[chainId].token}>{networks[chainId].token}</option>)}
            </Field>
            <DownArrow />

            {!!errorMessage && (
              <>
                <p className="red lh-copy">{errorMessage}</p>
                {(/please connect metamask to the/g).test(errorMessage.toLowerCase()) && getAddNetworkHelpText(values.paymentToken)}
              </>
            )}

            <Label className="f5 b">Amount</Label>
            <div className="flex-l justify-between-l">
              <div className="w-80-l w-100">
                <FieldText
                  type="text"
                  name="tokenAmount"
                  id="donate-amount"
                  placeholder="0.00"
                  value={values.tokenAmount}
                  onChange={handleChangeTokenAmount}
                  className="f6 input-reset b--black-10 pv3 ph2 db center w-100 br3 mt2"
                />
                <div className="fr mr4 o-50" style={{ marginTop: '-35px' }}>{values.paymentToken}</div>
              </div>
              <img alt="" src={swapIcon} className="ph3 mt3 self-center-l db center w-100" style={{ marginTop: '17.5px', width: '25px', height: '25px' }} />
              <div className="w-80-l w-100">
                <FieldText
                  type="text"
                  name="fiatAmount"
                  id="donate-amount-fiat"
                  placeholder="0.00"
                  value={values.fiatAmount}
                  onChange={handleChangeFiatAmount}
                  className="f6 input-reset b--black-10 pv3 ph2 db center w-100 br3 mt2"
                />
                <div className="fr mr4 o-50" style={{ marginTop: '-35px' }}>USD</div>
              </div>
            </div>
  
            <div>
              {!!!activeAccount &&
                <p className="f5"><span className="teal pointer" onClick={connectWallet}>Connect wallet</span> to proceed. If you don't have a wallet, <a className="teal link" href="">install MetaMask</a> or select the credit card payment method.</p>}
              {!!activeAccount &&
                <p className="f5">Connected to MetaMask wallet <a href={getWalletExplorerUrl(activeAccount)} target="_blank" rel="noreferrer" className="link teal">{shortenString(activeAccount)}</a>.</p>}
            </div>
  
            {showPersonalInfo && (
              <>
                <Label className="f5 b">Your Information</Label>
                <FieldText
                  type="text"
                  name="firstName"
                  id="donate-first-name"
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  className="f6 input-reset b--black-10 pv3 ph2 db center w-100 br3 mt2"
                />
      
                <FieldText
                  type="text"
                  name="lastName"
                  id="donate-last-name"
                  placeholder="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  className="f6 input-reset b--black-10 pv3 ph2 db center w-100 br3 mt2"
                />
      
                <FieldText
                  type="text"
                  name="email"
                  id="donate-email"
                  placeholder="Email address"
                  value={values.email}
                  onChange={handleChange}
                  className="f6 input-reset b--black-10 pv3 ph2 db center w-100 br3 mt2"
                />
              </>
            )}
  
            <div>
              <input
                type="submit"
                name="submit"
                onClick={handleSubmit as any}
                className="f5 link pointer dim bn br-pill pv3 ph4 white bg-teal fw7 mt4-ns mt2 w-100 w-auto-ns"
                disabled={isSubmitting}
                value="Donate"
              />
              {!!message && <span className="pl2 f6">{message}</span>}
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default CommunityDonationForm;
