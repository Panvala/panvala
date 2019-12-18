import React from 'react';
import {
  FundraiserForm,
  FundraiserHeader,
  FundraiserProfile,
  ProfileCopy,
  ProfileLink,
  FundraiserOverview,
} from '../components/Fundraiser';
import Fundraiser from '../templates/Fundraiser';
import { ReasonToContribute } from '../components/Fundraiser/FundraiserOverview';
import flag from '../img/fundraisers/flag.png';

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
export const profileLink = () => <ProfileLink />;
export const profile = () => <FundraiserProfile {...profileProps} />;

export const reasonToContribute = () => (
  <ReasonToContribute iconSrc={flag} title="Prioritized Grants">
    When you donate to Vivek Singh’s fundraiser, the Gitcoin team moves up Panvala’s leaderboard for
    grant application priority. View the leaderboard.
  </ReasonToContribute>
);

export const overview = () => <FundraiserOverview />;
export const form = () => <FundraiserForm />;

export const fullPage = () => <Fundraiser pageContext={profileProps} />;
