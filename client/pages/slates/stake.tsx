import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import Actions from '../../components/Actions';
import Button from '../../components/Button';
import CenteredTitle from '../../components/CenteredTitle';
import CenteredWrapper from '../../components/CenteredWrapper';
import { EthereumContext } from '../../components/EthereumProvider';
import Image from '../../components/Image';
import { MainContext } from '../../components/MainProvider';
import MetamaskButton from '../../components/MetamaskButton';
import Modal, { ModalTitle, ModalDescription } from '../../components/Modal';
import SectionLabel from '../../components/SectionLabel';
import { Separator } from '../../components/Separator';
import { IEthereumContext, StatelessPage } from '../../interfaces';
import Stepper, { StepperDialog } from '../../components/Stepper';
import StepperMetamaskDialog from '../../components/StepperMetamaskDialog';
import { sendAndWaitForTransaction } from '../../utils/transaction';

const Wrapper = styled.div`
  font-family: 'Roboto';
  /* margin: 2rem 10rem; */
`;

const CenteredSection = styled.div`
  padding: 2rem;
`;

const SectionStatement = styled.div`
  font-size: 1.3rem;
`;

const P = styled.p`
  font-size: 1.2rem;
  line-height: 1.75;
`;

const BlackSeparator = styled.div`
  margin-bottom: 1rem;
  border-bottom: 3px solid #606060;
`;

const Stake: StatelessPage<any> = ({ query: { slateID } }) => {
  // modal opener
  const [modalIsOpen, toggleOpenModal] = React.useState(false);
  const [stepperIsOpen, toggleOpenStepper] = React.useState(false);
  const {
    account,
    contracts,
    onConnectEthereum,
    ethProvider,
    onRefreshBalances,
    panBalance,
    gkAllowance,
    slateStakeAmount,
  }: IEthereumContext = React.useContext(EthereumContext);
  const { onRefreshSlates } = React.useContext(MainContext);
  console.log('contracts:', contracts);

  // runs once, on first load
  // connect to metamask
  React.useEffect(() => {
    if (!account) {
      onConnectEthereum();
    }
  }, []);

  let steps = [
    <StepperDialog>
      By confirming this transaction, you approve to spend 500 PAN tokens to stake for this slate.
      {/* To prove you are the account owner, please sign this message. This is similar to signing in
      with a password. */}
    </StepperDialog>,
    <StepperDialog>
      Waiting to confirm in MetaMask. By confirming this transaction, you are spending 500 PAN
      tokens to stake for this slate.
    </StepperDialog>,
  ];

  // if gatekeeper allowance is less that the staking requirement, send approve tx first
  steps = gkAllowance.lt(slateStakeAmount) ? steps : [steps[1]];
  const [stepNumber, setStepNumber] = React.useState(1);

  async function approveOrStakeTokens() {
    if (!account) {
      return false;
    }

    // TODO: handle errors gracefully

    // step 1: approve
    if (gkAllowance.lt(slateStakeAmount)) {
      // TODO: customize numTokens
      const numTokens = panBalance;

      await sendAndWaitForTransaction(ethProvider, contracts.token, 'approve', [
        contracts.gateKeeper.address,
        numTokens,
      ]);
      toast.success('approve tx mined');
      // refresh balances, increment the step, exit out of function
      onRefreshBalances();
      return setStepNumber(2);
    }

    // step 2: stakeTokens
    await sendAndWaitForTransaction(ethProvider, contracts.gateKeeper, 'stakeTokens', [
      parseInt(slateID),
    ]);
    toast.success(`stakeTokens tx mined.`);
    // refresh balances, refresh slates, change -> Success Modal
    onRefreshBalances();
    onRefreshSlates();
    toggleOpenModal(true);
    return toggleOpenStepper(false);
  }

  return (
    <>
      <Stepper
        isOpen={stepperIsOpen}
        step={stepNumber}
        steps={steps}
        handleCancel={() => toggleOpenStepper(false)}
      >
        {steps[stepNumber - 1]}
        <StepperMetamaskDialog />
        <Image src="/static/signature-request-tip.svg" alt="signature request tip" wide />
        <MetamaskButton
          handleClick={approveOrStakeTokens}
          text={gkAllowance.lt(slateStakeAmount) ? 'Approve 500 PAN' : 'Stake Tokens'}
        />
      </Stepper>

      <Modal handleClick={() => toggleOpenModal(false)} isOpen={modalIsOpen}>
        <Image src="/static/check.svg" alt="tokens staked" />
        <ModalTitle>{'Tokens staked.'}</ModalTitle>
        <ModalDescription className="flex flex-wrap">
          Now that you have staked tokens on this slate the Panvala token holding community will
          have the ability to vote for or against the slate when the voting period begins.
        </ModalDescription>
        <Button type="default" onClick={() => toggleOpenModal(false)}>
          {'Done'}
        </Button>
      </Modal>

      <Wrapper>
        <CenteredTitle title="Stake Tokens on a Slate" />
        <CenteredWrapper>
          <CenteredSection>
            <SectionLabel>TOKEN DEPOSIT</SectionLabel>
            <SectionStatement>
              A deposit of <strong>{500} PAN</strong> tokens is required.
            </SectionStatement>
            <P>
              After a slate has tokens staked, the Panvala token holding community will have the
              ability to vote for or against the slate when the voting period begins. If the slate
              that you stake tokens on is successful, you will receive a supporter reward of 500
              PAN. If the slate that you stake tokens on is unsuccessful, you will lose your token
              deposit.
            </P>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5rem' }}>
              <div>Total token deposit</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>500 PAN</div>
            </div>
            <BlackSeparator />
          </CenteredSection>

          <Separator />
          <Actions
            handleClick={() => toggleOpenStepper(true)}
            handleBack={null}
            actionText={'Confirm and Deposit PAN'}
          />
        </CenteredWrapper>
      </Wrapper>
    </>
  );
};

Stake.getInitialProps = async ({ query }) => {
  return { query };
};

export default Stake;
