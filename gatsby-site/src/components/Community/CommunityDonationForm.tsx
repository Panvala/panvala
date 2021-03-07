import React from 'react';
import { Formik, Field, } from 'formik';
import * as yup from 'yup';

import DonateButton from '../DonateButton';
import FieldText from '../FieldText';
import Label from '../Label';
import DownArrow from '../Form/DownArrow';
import { FormError } from '../Form/FormError';
import { networks, tokens } from '../../data';

export interface CommunityDonationFormFields {
  paymentToken: string;
  paymentNetwork: string;
  tokenAmount: number;
  fiatAmount: number;
  firstName: string;
  lastName: string;
  email: string;
}

// TODO: add the 'required' tags back to the user metadata fields
// (they're currently commented out for quicker debugging)

const CommunityDonationFormSchema: yup.ObjectSchema<CommunityDonationFormFields> = yup.object({
  paymentToken: yup
    .string()
    .trim()
    .required('Please enter your payment method.'),
  paymentNetwork: yup
    .string()
    .trim()
    .required('Please enter a payment network.'),
  tokenAmount: yup
    .number()
    .moreThan(0, 'Please select a donation amount.'),
  fiatAmount: yup
    .number()
    .moreThan(0, 'Please select a donation amount in USD.'),
  firstName: yup
    .string()
    .trim(),
    // .required('Please enter your first name.'),
  lastName: yup
    .string()
    .trim(),
    // .required('Please enter your last name.'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address.'),
    // .required('Please enter your email.'),
});

interface CommunityDonationFormProps {
  initialValues: any;
  onSubmit(values: any, actions: any): void;
  onChangePaymentNetwork(newToken: string): Promise<void>;
  onChangeFiatAmount(newFiatAmount: number, paymentToken: string): Promise<number>;
  onChangeTokenAmount(newTokenAmount: number, paymentToken: string): Promise<number>;
  connectWallet(): void;
}

const CommunityDonationForm = (props: CommunityDonationFormProps) => {
  const {
    initialValues,
    onSubmit,
    onChangePaymentNetwork,
    onChangeTokenAmount,
    onChangeFiatAmount,
    connectWallet,
  } = props;

  function handleDonate(values: any, actions: any) {
    console.log('CommunityDonationForm:', 'submit', values);

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

        // NOTE: we need to intercept these input changes here and call any methods
        // we need to; e.g. to recalculate ETH when USD changes, and vice versa
        // (we only have access to the formik context here within the <Formik> element)

        const handleChangePaymentNetwork = (e: React.ChangeEvent<any>) => {
          onChangePaymentNetwork(e.target.value);
          handleChange(e);
        };

        const handleChangeTokenAmount = (e: React.ChangeEvent<any>) => {
          onChangeTokenAmount(e.target.value, values.paymentToken).then((val) => {
            setFieldValue('fiatAmount', val);
          });
          handleChange(e);
        };

        const handleChangeFiatAmount = (e: React.ChangeEvent<any>) => {
          console.log('Fiat amount changed: ', e.target.value);
          onChangeFiatAmount(e.target.value, values.paymentToken).then((val) => {
            setFieldValue('tokenAmount', val);
          });
          handleChange(e);
        };

        return (  
          <form
            data-testid="community-donation-form"
            onSubmit={handleSubmit}
            className="w-80-l w-90-m w-100 center"
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
              onChange={handleChange}
              id="payment-token-select"
            >
              {Object.keys(tokens).map(tokenName => <option key={tokenName}>{tokenName}</option>)}
            </Field>
            <DownArrow />

            <Label className="f5 b">Payment Network</Label>
            <FormError name="paymentNetwork" className="pt2" />
            <Field
              as="select"
              name="paymentNetwork"
              required
              className="f6 input-reset b--black-10 pv3 ph2 db center w-100 br3 mt2 bg-white black-50"
              value={values.paymentNetwork}
              onChange={handleChangePaymentNetwork}
              id="payment-token-select"
            >
              <option value="">Select network...</option>
              {Object.keys(networks).map(chainId =><option key={chainId} value={chainId}>{networks[chainId].name}</option>)}
            </Field>
            <DownArrow />
  
            <Label className="f5 b">Amount</Label>
            <div className="flex">
              <div className="w-90 mr2 left">
                <FieldText
                  type="number"
                  name="tokenAmount"
                  id="donate-amount"
                  label={values.paymentToken}
                  placeholder="0"
                  value={values.tokenAmount}
                  onChange={handleChangeTokenAmount}
                  className="f6 input-reset b--black-10 pv3 ph2 db center w-90 br3 mt2"
                />
              </div>
              <div className="w-90 ml2 right">
                <FieldText
                  type="number"
                  name="fiatAmount"
                  id="donate-amount-fiat"
                  label="USD"
                  placeholder="0.00"
                  value={values.fiatAmount}
                  onChange={handleChangeFiatAmount}
                  className="f6 input-reset b--black-10 pv3 ph2 db center w-90 br3 mt2"
                />
              </div>
            </div>
  
            <div>
              <p><span className="teal pointer" onClick={connectWallet}>Connect wallet</span> to proceed. If you don't have a wallet, <a className="teal link" href="">install MetaMask</a> or select the credit card payment method.</p>
            </div>
  
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
  
            <DonateButton disabled={isSubmitting} handleClick={handleSubmit} />
          </form>
        );
      }}
    </Formik>
  );
};

export default CommunityDonationForm;
