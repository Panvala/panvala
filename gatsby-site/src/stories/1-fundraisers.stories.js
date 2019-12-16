import React from 'react';
import {
  FundraiserForm,
  FundraiserHeader,
  FundraiserProfile,
  ProfileCopy,
  ProfileLink,
} from '../components/Fundraiser';
import Fundraiser from '../templates/Fundraiser';

export default {
  title: 'Fundraisers',
};

const profileProps = {
  firstName: 'First',
  lastName: 'Last',
  story: 'Fundraiser story',
  teamInfo: 'Team information',
};

export const fundraiserHeader = () => <FundraiserHeader />;

export const profileCopy = () => <ProfileCopy {...profileProps} />;
export const profileLink = () => <ProfileLink />;
export const fundraiserProfile = () => <FundraiserProfile {...profileProps} />;

export const fundraiserForm = () => <FundraiserForm />;

export const fundraiserPage = () => <Fundraiser pageContext={profileProps} />;
