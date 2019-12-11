import React from 'react';
import DonateButton from '../components/DonateButton';

export default {
  title: 'Donate Button',
};

function action(action) {
  console.log('action', action);
}

export const click = () => <DonateButton handleClick={action} text="Donate" />;
