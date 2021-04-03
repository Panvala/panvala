import React, { useEffect, useRef, useState } from 'react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

import FieldText from '../FieldText';
import Label from '../Label';
import DownArrow from '../Form/DownArrow';
import { FormError } from '../Form/FormError';
import closeIcon from '../../img/close.svg';
import copyIcon from '../../img/copy.svg';
import linkArrow from '../../img/link-arrow.svg';
import swapIcon from '../../img/swap.png';
import successIcon from '../../img/status-good.svg';
import errorIcon from '../../img/error.svg';
import { TokenEnums, networks, NetworkEnums } from '../../data';
import { getExplorerUrl, shortenString } from '../../utils/format';
import Spinner from '../Spinner';

export interface ICommunityDonationFormFields {
  paymentToken: string;
  tokenAmount: number;
  fiatAmount: number;
  firstName: string;
  lastName: string;
  email: string;
}

const CommunityDonationFormSchema: yup.ObjectSchema<ICommunityDonationFormFields> = yup.object().shape({
  paymentToken: yup
    .string()
    .trim(),
  tokenAmount: yup
    .number()
    .moreThan(0, 'Please select a donation amount.'),
  fiatAmount: yup
    .number()
    .moreThan(0, 'Please select a donation amount in USD.'),
  firstName: yup
    .string()
    .trim()
    .required('Please enter your first name.'),
  lastName: yup
    .string()
    .trim()
    .required('Please enter your last name.'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .required('Please enter an email address.'),
});

interface CommunityDonationFormProps {
  initialValues: any;
  walletAddresses: {
    [chainId: string]: string;
  };
  selectedToken: string;
  activeAccount: string;
  error: string;
  step: number | null;
  message: string;
  isDonating: boolean;
  transactionHash: any;
  onSubmit(values: any, actions: any): Promise<string>;
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
    error,
    message,
    isDonating,
    transactionHash,
    onSubmit,
    onChangePaymentToken,
    onChangeTokenAmount,
    onChangeFiatAmount,
    connectWallet,
  } = props;

  const [showPersonalInfo, _] = useState<boolean>(true);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const transactionHashRef = useRef(null);

  useEffect(() => {
    if (!showInfoModal && (isDonating)) {
      setShowInfoModal(true);
    }
  }, [showInfoModal, isDonating]);

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
      {({ values, handleSubmit, handleChange, setFieldValue, resetForm, isSubmitting }) => {

        useEffect(() => {
          if (!showInfoModal && window.onclick !== null) {
            window.onclick = null;
            resetForm();
          }
          else if (showInfoModal && window.onclick === null) {
            window.onclick = (e) => {
              let el = e.target;
              
              while (el) {
                if (el.id === 'info-modal')
                  break;
                el = el.parentNode;
              }

              if (el?.id !== 'info-modal')
                setShowInfoModal(false);
            };
          }
        }, [showInfoModal]);

        useEffect(() => {
          if (values.paymentToken === '' && selectedToken !== '')
            setFieldValue('paymentToken', selectedToken);
        }, [selectedToken]);

        const handleChangePaymentToken = (e: React.ChangeEvent<any>) => {
          onChangePaymentToken(e.target.value);
          // TODO: recalculate instead of clear
          setFieldValue('tokenAmount', '');
          setFieldValue('fiatAmount', '');
          handleChange(e);
        };

        const handleChangeTokenAmount = (e: React.ChangeEvent<any>) => {
          onChangeTokenAmount(e.target.value, values.paymentToken).then((val) => {
            setFieldValue('fiatAmount', val || '');
          });
          handleChange(e);
        };

        const handleChangeFiatAmount = (e: React.ChangeEvent<any>) => {
          onChangeFiatAmount(e.target.value, values.paymentToken).then((val) => {
            setFieldValue('tokenAmount', val || '');
          });
          handleChange(e);
        };

        return (
          <form
            data-testid="community-donation-form"
            onSubmit={handleSubmit}
            name="community-donation"
            className="relative" 
          >
            {showInfoModal && (
              <>
                <div className="absolute left-0 right-0 bottom-0 top-0 bg-white o-80 z-0" />
                <div className="absolute left-0 right-0 bottom-0 top-0 flex items-center">
                  <div className="w-90 h-40 center tc pa4 mb5 b--black-10 br3-ns bn-ns bt z-9999 bg-white shadow-5 flex-column relative" id="info-modal">
                    <img className="absolute w1 h1 top-0 right-0 mr3 mt3 pointer mid-gray" onClick={() => setShowInfoModal(false)} src={closeIcon} />
                    {isDonating && (
                      <>
                        <Spinner className="pa2" width="3rem" height="3rem" />
                        {!!message && <div className="pa2">{message}</div>}
                      </>
                    )}
                    {!isDonating && (
                      <>
                        {!!transactionHash && (
                          <>
                            <img className="pa2" style={{ width: '3rem', height: '3rem' }} src={successIcon} />
                            <h3>Thank You!</h3>
                            {!!message && <div className="pa2">{message}</div>}
                            <div className="ph2 mt3 b bg-light-gray br3 flex justify-between items-center">
                              <div className="w-80 pv2 mv1 pre mid-gray">
                                {transactionHash}
                              </div>
                              <textarea readOnly ref={transactionHashRef} className="absolute" style={{ zIndex: -1, height: 0 }} value={transactionHash}></textarea>
                              {document.queryCommandSupported('copy') && (
                                <div className="h1 w1 dt" onClick={() => {
                                  const hashText: any = transactionHashRef.current;
                                  if (hashText) {
                                    hashText.select();
                                    document.execCommand('copy');
                                  }
                                }}>
                                  <img alt="Copy Address" className="dtc v-mid pointer link" src={copyIcon} />
                                </div>
                              
                              )}
                              <a className="h1 w1 dt" target="_blank" rel="noreferrer" href={getExplorerUrl(values, transactionHash)}>
                                <img alt="View Transaction" className="dtc v-mid pointer link" src={linkArrow} />
                              </a>
                            </div>
                          </>
                        )}
                        {!!!transactionHash && (
                          <>
                            <img className="pa2" style={{ width: '3rem', height: '3rem' }} src={errorIcon} />
                            <div className="pa2">There was an error sending your donation! Please try again.</div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}

            <Label className="f5 b">Payment Method</Label>
            <FormError name="paymentToken" className="pt2" />
            <Field
              as="select"
              name="paymentToken"
              required
              className="f6 input-reset b--black-10 pv3 ph2 db center w-100 br3 mt2 bg-white black-50"
              value={values.paymentToken}
              onChange={handleChangePaymentToken}
              disabled={!activeAccount}
              id="payment-token-select"
            >
              {walletAddresses && Object.keys(walletAddresses).map(chainId =>
                <option key={networks[chainId].token} value={networks[chainId].token}>{networks[chainId].token}</option>)}
              <option value={TokenEnums.PAN}>{TokenEnums.PAN}</option>
            </Field>
            <DownArrow />

            {!!error && (
              <>
                <p className="red lh-copy">{error}</p>
                {(/please connect metamask to the/g).test(error.toLowerCase()) && getAddNetworkHelpText(values.paymentToken)}
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
                  disabled={!activeAccount}
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
                  disabled={!activeAccount}
                  className="f6 input-reset b--black-10 pv3 ph2 db center w-100 br3 mt2"
                />
                <div className="fr mr4 o-50" style={{ marginTop: '-35px' }}>USD</div>
              </div>
            </div>
  
            <div>
              {!!!activeAccount &&
                <p className="f5"><span className="teal pointer" onClick={connectWallet}>Connect wallet</span> to proceed. If you don't have a wallet, <a className="teal link" href="">install MetaMask</a> or select the credit card payment method.</p>}
              {!!activeAccount &&
                <p className="f5">Connected to MetaMask wallet <a href={getExplorerUrl(values, activeAccount)} target="_blank" rel="noreferrer" className="link teal">{shortenString(activeAccount)}</a>.</p>}
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
                className={`f5 link pointer dim bn br-pill pv3 ph4 white bg-teal fw7 mt4-ns mt2 w-100 w-auto-ns`}
                disabled={isSubmitting}
                value="Donate"
              />
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default CommunityDonationForm;
