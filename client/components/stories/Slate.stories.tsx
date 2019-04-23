import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { SlateSidebar, SlateDetail, SlateHeader } from '../../pages/DetailedView';
import { ISlate } from '../../interfaces';
import { currentBallot, unstakedSlate, mockedRouter } from './data';
import { statuses } from '../../utils/status';

const unstakedIncumbent: ISlate = {
  ...unstakedSlate,
  incumbent: true,
};

const unstakedVerified: ISlate = {
  ...unstakedSlate,
  verifiedRecommender: true,
};

const staker = '0xd115bffabbdd893a6f7cea402e7338643ced44a6';
const noStaker = undefined;

const stakedSlate: ISlate = {
  ...unstakedSlate,
  status: statuses.PENDING_VOTE,
  staker,
};

const stakedVerified: ISlate = {
  ...unstakedSlate,
  status: statuses.PENDING_VOTE,
  verifiedRecommender: true,
  staker,
};

const acceptedSlate: ISlate = {
  ...stakedSlate,
  status: statuses.SLATE_ACCEPTED,
  staker,
};

const rejectedSlate: ISlate = {
  ...stakedSlate,
  status: statuses.SLATE_REJECTED,
  staker,
};

storiesOf('SlateHeader', module)
  .add('unstaked', () => (
    <SlateHeader slate={unstakedSlate} router={mockedRouter} currentBallot={currentBallot} />
  ))
  .add('staked', () => (
    <SlateHeader slate={stakedSlate} router={mockedRouter} currentBallot={currentBallot} />
  ));

storiesOf('SlateSidebar', module)
  .add('unstaked', () => <SlateSidebar slate={unstakedSlate} />)
  .add('unstaked verified', () => <SlateSidebar slate={unstakedVerified} />)
  .add('staked', () => <SlateSidebar slate={stakedSlate} />)
  .add('staked verified', () => <SlateSidebar slate={stakedVerified} />);

storiesOf('Slate', module)
  .add('unstaked', () => (
    <SlateDetail slate={unstakedSlate} router={mockedRouter} currentBallot={currentBallot} />
  ))
  .add('unstaked incumbent', () => (
    <SlateDetail slate={unstakedIncumbent} router={mockedRouter} currentBallot={currentBallot} />
  ))
  .add('staked unverified', () => (
    <SlateDetail slate={stakedSlate} router={mockedRouter} currentBallot={currentBallot} />
  ))
  .add('staked verified', () => (
    <SlateDetail slate={stakedVerified} router={mockedRouter} currentBallot={currentBallot} />
  ))
  .add('accepted', () => (
    <SlateDetail slate={acceptedSlate} router={mockedRouter} currentBallot={currentBallot} />
  ))
  .add('rejected', () => (
    <SlateDetail slate={rejectedSlate} router={mockedRouter} currentBallot={currentBallot} />
  ));
