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

export const overview = () => <FundraiserOverview />;
export const form = () => <FundraiserForm />;

export const fullPage = () => <Fundraiser pageContext={profileProps} />;
