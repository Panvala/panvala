import React from 'react';
import { Formik, Field, } from 'formik';
import * as yup from 'yup';

import DonateButton from '../DonateButton';
import FieldText from '../FieldText';
import Label from '../Label';
import DownArrow from '../Form/DownArrow';
import { FormError } from '../Form/FormError';
import swapIcon from '../../img/swap.png';

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
    .trim()
    .required('Please enter your payment method.'),
  tokenAmount: yup
    .number(),
    // .moreThan(0, 'Please select a donation amount.'),
  fiatAmount: yup
    .number(),
    // .moreThan(0, 'Please select a donation amount in USD.'),
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
  onChangePaymentToken(newToken: string): Promise<void>;
  onChangeTokenAmount(newTokenAmount: number, paymentToken: string): Promise<number>;
  onChangeFiatAmount(newFiatAmount: number, paymentToken: string): Promise<number>;
  connectWallet(): void;
}

const CommunityDonationForm = (props: CommunityDonationFormProps) => {
  const {
    initialValues,
    onSubmit,
    onChangePaymentToken,
    onChangeTokenAmount,
    onChangeFiatAmount,
    connectWallet,
  } = props;

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

        const handleChangePaymentToken = (e: React.ChangeEvent<any>) => {
          onChangePaymentToken(e.target.value);
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
              onChange={handleChangePaymentToken}
              id="payment-token-select"
            >
              <option value="XDAI">XDAI</option>
              <option value="MATIC">MATIC</option>
            </Field>
            <DownArrow />

            <Label className="f5 b">Amount</Label>
            <div className="flex justify-between">
              <div className="w-80">
                <FieldText
                  type="number"
                  name="tokenAmount"
                  id="donate-amount"
                  placeholder="0.00"
                  value={values.tokenAmount}
                  onChange={handleChangeTokenAmount}
                  className="f6 input-reset b--black-10 pv3 ph2 db center w-100 br3 mt2"
                />
                <div className="fr mr4 o-50" style={{ marginTop: '-35px' }}>{values.paymentToken}</div>
              </div>
              <img alt="" src={swapIcon} className="mh3 mt3 self-center" style={{ marginTop: '17.5px', width: '25px', height: '25px' }} />
              <div className="w-80">
                <FieldText
                  type="number"
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
