import React from 'react';
import styled from 'styled-components';
import Actions from '../../components/Actions';
import Button from '../../components/Button';
import CenteredTitle from '../../components/CenteredTitle';
import CenteredWrapper from '../../components/CenteredWrapper';
import { EthereumContext } from '../../components/EthereumProvider';
import Image from '../../components/Image';
import Modal, { ModalTitle, ModalDescription } from '../../components/Modal';
import SectionLabel from '../../components/SectionLabel';
import { Separator } from '../../components/Separator';
import { IEthereumContext } from '../../interfaces';
import { getAllSlates } from '../../utils/api';
import Stepper, { StepperDialog } from '../../components/Stepper';
import StepperMetamaskDialog from '../../components/StepperMetamaskDialog';
import MetamaskButton from '../../components/MetamaskButton';

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

const Stake: React.SFC<any> = ({ query }) => {
  // modal opener
  const [modalIsOpen, toggleOpenModal] = React.useState(false);
  const [stepperIsOpen, toggleOpenStepper] = React.useState(false);
  const { account, contracts, onConnectEthereum }: IEthereumContext = React.useContext(
    EthereumContext
  );
  React.useEffect(() => {
    onConnectEthereum();
  }, []);
  console.log('contracts:', contracts);

  async function handleStakeTokens() {
    const { slateID } = query;
    console.log('slateID:', slateID);
    if (account) {
      // await contracts.gateKeeper.functions.stakeTokens(slateID);
    }
  }

  const steps = [
    <StepperDialog>
      To prove you are the account owner, please sign this message. This is similar to signing in
      with a password.
    </StepperDialog>,
    <StepperDialog>
      Waiting to confirm in MetaMask. By confirming this transaction, you approve to spend 500 PAN
      tokens to stake for this slate.
    </StepperDialog>,
  ];

  return (
    <>
      <Stepper isOpen={stepperIsOpen} step={1} steps={steps} handleClick={null} handleCancel={null}>
        <StepperMetamaskDialog />
        <Image src="/static/signature-request-tip.svg" alt="signature request tip" wide />
        <MetamaskButton handleClick={handleStakeTokens} text="Approve 500 PAN" />
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
            handleClick={handleStakeTokens}
            handleBack={null}
            actionText={'Confirm and Deposit PAN'}
          />
        </CenteredWrapper>
      </Wrapper>
    </>
  );
};

Stake.getInitialProps = ({ query }) => {
  return { query };
};

export default Stake;
