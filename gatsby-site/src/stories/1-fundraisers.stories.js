import React from 'react';
import {
  FundraiserForm,
  FundraiserHeader,
  FundraiserProfile,
  ProfileCopy,
  ProfileLink,
  FundraiserOverview,
  FunderBoard,
} from '../components/Fundraiser';
import Fundraiser from '../templates/Fundraiser';
import { ReasonToContribute } from '../components/Fundraiser/FundraiserOverview';
import flag from '../img/fundraisers/flag.png';
import Layout from '../components/Layout';

export default {
  title: 'Fundraisers',
};

const profileProps = {
  firstName: 'First',
  lastName: 'Last',
  story:
    'Fundraiser story Fundraiser story Fundraiser story Fundraiser story Fundraiser story Fundraiser story Fundraiser story Fundraiser story ',
  teamInfo:
    'Team information Team information Team information Team information Team information Team information Team information Team information',
};

export const header = () => <FundraiserHeader />;

export const profileCopy = () => <ProfileCopy {...profileProps} />;
export const profile = () => <FundraiserProfile {...profileProps} />;
export const funderBoard = () => <FunderBoard />;
export const profileLink = () => <ProfileLink />;

export const reasonToContribute = () => (
  <ReasonToContribute iconSrc={flag} title="Prioritized Grants">
    When you donate to Vivek Singh’s fundraiser, the Gitcoin team moves up Panvala’s leaderboard for
    grant application priority. View the leaderboard.
  </ReasonToContribute>
);

export const overview = () => <FundraiserOverview />;
export const form = () => (
  <Layout>
    <FundraiserForm />
  </Layout>
);

export const fullPage = () => <Fundraiser pageContext={profileProps} />;
