import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ProposalHeader, ProposalSidebar, ProposalDetail } from '../../pages/DetailedView';
import { ISlate, IProposal } from '../../interfaces';
import { currentBallot, unstakedSlate, proposals, mockedRouter } from './data';
import { statuses } from '../../utils/status';

const proposal: IProposal = proposals[0];

const acceptedSlate: ISlate = {
  ...unstakedSlate,
  status: statuses.SLATE_ACCEPTED,
};

const rejectedSlate: ISlate = {
  ...unstakedSlate,
  status: statuses.SLATE_REJECTED,
};

storiesOf('ProposalHeader', module)
  .add('not in a slate', () => (
    <ProposalHeader
      proposal={proposal}
      includedInSlates={[]}
      router={mockedRouter}
      currentBallot={currentBallot}
    />
  ))
  .add('accepted', () => (
    <ProposalHeader
      proposal={proposal}
      includedInSlates={[acceptedSlate]}
      router={mockedRouter}
      currentBallot={currentBallot}
    />
  ))
  .add('not accepted', () => (
    <ProposalHeader
      proposal={proposal}
      includedInSlates={[rejectedSlate]}
      router={mockedRouter}
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
    <ProposalDetail
      proposal={proposal}
      includedInSlates={[]}
      router={mockedRouter}
      currentBallot={currentBallot}
    />
  ))
  .add('accepted', () => (
    <ProposalDetail
      proposal={proposal}
      includedInSlates={[acceptedSlate]}
      router={mockedRouter}
      currentBallot={currentBallot}
    />
  ))
  .add('not accepted', () => (
    <ProposalDetail
      proposal={proposal}
      includedInSlates={[rejectedSlate]}
      router={mockedRouter}
      currentBallot={currentBallot}
    />
  ));
