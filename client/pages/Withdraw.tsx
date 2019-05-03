import * as React from 'react';
import styled from 'styled-components';

import CenteredWrapper from '../components/CenteredWrapper';
import CenteredTitle from '../components/CenteredTitle';
import SectionLabel from '../components/SectionLabel';
import { Separator } from '../components/Separator';
import Actions from '../components/Actions';
import { StatelessPage, IMainContext, IEthereumContext } from '../interfaces';
import { EthereumContext } from '../components/EthereumProvider';
import { MainContext } from '../components/MainProvider';
import { sendAndWaitForTransaction } from '../utils/transaction';

const CenteredSection = styled.div`
  padding: 2rem;
`;

const SectionDialog = styled.div`
  margin-bottom: 2rem;
  line-height: 1.5;
`;

interface IProps {
  query: any;
}

const Withdraw: StatelessPage<IProps> = ({ query }) => {
  const { slates }: IMainContext = React.useContext(MainContext);
  const {
    contracts,
    account,
    votingRights,
    onConnectEthereum,
    ethProvider,
    onRefreshBalances,
  }: IEthereumContext = React.useContext(EthereumContext);

  // runs once, on first load
  // connect to metamask
  React.useEffect(() => {
    if (!account) {
      onConnectEthereum();
    }
  }, []);

  const slate = (slates as any[]).find(s => s.id === parseInt(query.id));
  console.log('slate:', slate);

  async function handleWithdraw() {
    try {
      if (ethProvider && contracts) {
        await sendAndWaitForTransaction(ethProvider, contracts.gateKeeper, 'withdrawVoteTokens', [
          votingRights,
        ]);
        onRefreshBalances();
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      <CenteredTitle title="Withdraw Tokens" />
      <CenteredWrapper>
        <CenteredSection>
          <SectionLabel>HOW WITHDRAWING TOKENS WORKS</SectionLabel>
          <SectionDialog>
            The tokens you previously deposited for voting on the ballot can be withdrawn. Upon
            selecting Confirm and Withdraw, you'll be prompted to confirm in you MetaMask wallet.
          </SectionDialog>
          <SectionDialog>
            Contact us at <a href="mailto:help@panvala.com">help@panvala.com</a> if you have any
            questions.
          </SectionDialog>
        </CenteredSection>

        <Separator />
        <Actions
          handleClick={handleWithdraw}
          handleBack={null}
          actionText={'Confirm and Withdraw'}
        />
      </CenteredWrapper>
    </>
  );
};

Withdraw.getInitialProps = async ({ query }) => {
  return { query };
};

export default Withdraw;
