import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Proposal, { ProposalHeader, ProposalSidebar } from '../../pages/proposals/proposal';
import { ISlate, IProposal } from '../../interfaces';
import { currentBallot, unstakedSlate, proposals } from './data';
import { MainContext } from '../MainProvider';
import { SlateStatus } from '../../utils/status';

const proposal: IProposal = proposals[0];

const acceptedSlate: ISlate = {
  ...unstakedSlate,
  status: SlateStatus.Accepted,
};

const rejectedSlate: ISlate = {
  ...unstakedSlate,
  status: SlateStatus.Rejected,
};

storiesOf('ProposalHeader', module)
  .add('not in a slate', () => (
    <ProposalHeader proposal={proposal} includedInSlates={[]} currentBallot={currentBallot} />
  ))
  .add('accepted', () => (
    <ProposalHeader
      proposal={proposal}
      includedInSlates={[acceptedSlate]}
      currentBallot={currentBallot}
    />
  ))
  .add('not accepted', () => (
    <ProposalHeader
      proposal={proposal}
      includedInSlates={[rejectedSlate]}
      currentBallot={currentBallot}
    />
  ));

storiesOf('ProposalSidebar', module)
  .add('not in a slate', () => <ProposalSidebar proposal={proposal} includedInSlates={[]} />)
  .add('in a slate', () => (
    <ProposalSidebar proposal={proposal} includedInSlates={[unstakedSlate]} />
  ));

storiesOf('Proposal', module)
  .add('not in a slate', () => (
    <MainContext.Provider
      value={{
        currentBallot,
        slates: [],
        proposals: [proposal],
      }}
    >
      <Proposal query={{ id: '0' }} />
    </MainContext.Provider>
  ))
  .add('accepted', () => (
    <MainContext.Provider
      value={{
        currentBallot,
        slates: [acceptedSlate],
        proposals: [proposal],
      }}
    >
      <Proposal query={{ id: '0' }} />
    </MainContext.Provider>
  ))
  .add('not accepted', () => (
    <MainContext.Provider
      value={{
        currentBallot,
        slates: [rejectedSlate],
        proposals: [proposal],
      }}
    >
      <Proposal query={{ id: '0' }} />
    </MainContext.Provider>
  ));
