import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Slate, { SlateSidebar, SlateHeader } from '../../pages/slates/slate';
import { ISlate } from '../../interfaces';
import { currentBallot, unstakedSlate } from './data';
import { MainContext } from '../MainProvider';

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
  status: 1,
  staker,
};

const stakedVerified: ISlate = {
  ...unstakedSlate,
  status: 1,
  verifiedRecommender: true,
  staker,
};

const acceptedSlate: ISlate = {
  ...stakedSlate,
  status: 3,
  staker,
};

const rejectedSlate: ISlate = {
  ...stakedSlate,
  status: 2,
  staker,
};

storiesOf('SlateHeader', module)
  .add('unstaked', () => <SlateHeader slate={unstakedSlate} currentBallot={currentBallot} />)
  .add('staked', () => <SlateHeader slate={stakedSlate} currentBallot={currentBallot} />);

storiesOf('SlateSidebar', module)
  .add('unstaked', () => <SlateSidebar slate={unstakedSlate} />)
  .add('unstaked verified', () => <SlateSidebar slate={unstakedVerified} />)
  .add('staked', () => <SlateSidebar slate={stakedSlate} />)
  .add('staked verified', () => <SlateSidebar slate={stakedVerified} />);

storiesOf('Slate', module)
  .add('unstaked', () => (
    <MainContext.Provider
      value={{
        currentBallot,
        slates: [unstakedSlate],
      }}
    >
      <Slate query={{ id: '0' }} />
    </MainContext.Provider>
  ))
  .add('unstaked incumbent', () => (
    <MainContext.Provider
      value={{
        currentBallot,
        slates: [unstakedIncumbent],
      }}
    >
      <Slate query={{ id: '0' }} />
    </MainContext.Provider>
  ))
  .add('staked unverified', () => (
    <MainContext.Provider
      value={{
        currentBallot,
        slates: [stakedSlate],
      }}
    >
      <Slate query={{ id: '0' }} />
    </MainContext.Provider>
  ))
  .add('staked verified', () => (
    <MainContext.Provider
      value={{
        currentBallot,
        slates: [stakedVerified],
      }}
    >
      <Slate query={{ id: '0' }} />
    </MainContext.Provider>
  ))
  .add('accepted', () => (
    <MainContext.Provider
      value={{
        currentBallot,
        slates: [acceptedSlate],
      }}
    >
      <Slate query={{ id: '0' }} />
    </MainContext.Provider>
  ))
  .add('rejected', () => (
    <MainContext.Provider
      value={{
        currentBallot,
        slates: [rejectedSlate],
      }}
    >
      <Slate query={{ id: '0' }} />
    </MainContext.Provider>
  ));
