import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Vote from '../../pages/ballots/vote';
import Layout from '../Layout';
import NotificationsProvider from '../NotificationsProvider';
import { StoryWrapper } from './utils.stories';
import { ISlate } from '../../interfaces';
import { unstakedSlate } from './data';

const staker = '0xd115bffabbdd893a6f7cea402e7338643ced44a6';

const stakedSlate: ISlate = {
  ...unstakedSlate,
  status: 1,
  staker,
};

const slate0: ISlate = {
  ...stakedSlate,
  id: 0,
  category: 'GRANT',
};

const slate1: ISlate = {
  ...stakedSlate,
  id: 1,
  category: 'GRANT',
};
const slate2: ISlate = {
  ...stakedSlate,
  id: 2,
  category: 'GOVERNANCE',
  proposals: [],
};
const slate3: ISlate = {
  ...stakedSlate,
  id: 3,
  category: 'GOVERNANCE',
  proposals: [],
};

const slates = [slate0, slate1, slate2, slate3];
const grantSlates = [slate0, slate1];
const governanceSlates = [slate2, slate3];

storiesOf('Ballot', module)
  .add('Both categories', () => {
    return (
      <StoryWrapper slates={slates}>
        <NotificationsProvider>
          <Layout>
            <Vote />
          </Layout>
        </NotificationsProvider>
      </StoryWrapper>
    );
  })
  .add('Grants only', () => {
    return (
      <StoryWrapper slates={grantSlates}>
        <NotificationsProvider>
          <Layout>
            <Vote />
          </Layout>
        </NotificationsProvider>
      </StoryWrapper>
    );
  })
  .add('Governance only', () => {
    return (
      <StoryWrapper slates={governanceSlates}>
        <NotificationsProvider>
          <Layout>
            <Vote />
          </Layout>
        </NotificationsProvider>
      </StoryWrapper>
    );
  });
