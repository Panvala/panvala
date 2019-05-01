import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Stepper from '../Stepper';
import Image from '../Image';
import StepperMetamaskDialog from '../StepperMetamaskDialog';
import MetamaskButton from '../MetamaskButton';

function handleClick() {
  console.log('click');
}
function handleCancel() {
  console.log('cancel');
}

const StepperDialog = styled.div`
  font-size: 1.2rem;
  line-height: 2rem;
`;

storiesOf('Stepper', module)
  .add('Step 1/2: sign message', () => (
    <Stepper isOpen={true} steps={2} handleCancel={handleCancel}>
      <StepperDialog>
        To prove you are the account owner, please sign this message. This is similar to signing in
        with a password.
      </StepperDialog>
      <StepperMetamaskDialog />

      <Image src="/static/signature-request-tip.svg" alt="signature request tip" wide />
      <MetamaskButton handleClick={handleClick} text="Sign Message" />
    </Stepper>
  ))
  .add('Step 2/2: approve 500 pan', () => {
    return (
      <Stepper isOpen={true} step={2} steps={2} handleCancel={handleCancel}>
        <StepperDialog>
          Waiting to confirm in MetaMask. By confirming this transaction, you approve to spend 500
          PAN tokens to stake for this slate.
        </StepperDialog>
        <StepperMetamaskDialog />

        <Image src="/static/signature-request-tip.svg" alt="signature request tip" wide />
        <MetamaskButton handleClick={handleClick} text="Approve 500 PAN" />
      </Stepper>
    );
  })
  .add('Step 2/2: approve all tokens', () => {
    const numTokens = 6789;
    const step = 2;
    return (
      <Stepper isOpen={true} step={step} steps={2} handleCancel={handleCancel}>
        <StepperDialog>
          Waiting to confirm in MetaMask. By confirming this transaction, you approve to vote with
          all your PAN tokens. You will not lose or gain any tokens regardless of outcome.
        </StepperDialog>
        <StepperMetamaskDialog />

        <Image src="/static/signature-request-tip.svg" alt="signature request tip" wide />
        <MetamaskButton handleClick={handleClick} text={`Approve ${numTokens} PAN`} />
      </Stepper>
    );
  });
