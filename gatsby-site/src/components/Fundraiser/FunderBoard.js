import React from 'react';
import { ProfileLink } from '.';
import Box from '../system/Box';
import DonateButton from '../DonateButton';

export function FunderBoard(props) {
  const { goal, firstName, profileLink } = props;

  return (
    <>
      <Box p={'8vw'} flex column>
        <Box>$300 of ${goal} goal by March 1</Box>
        <Box>Raised by 5 people since December 1</Box>

        <Box flex column>
          <Box>Funder 1</Box>
          <Box>Funder 2</Box>
          <Box>Funder 3</Box>
        </Box>

        <DonateButton disabled={false} text="Test Text Donate" handleClick={() => null} />

        <Box>Share {firstName}'s fundraiser link</Box>
        <ProfileLink href={profileLink} />
      </Box>
    </>
  );
}
