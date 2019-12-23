import React from 'react';
import { ProfileLink } from '.';
import Box from '../system/Box';
import DonateButton from '../DonateButton';

export function FunderBoard(props) {
  return (
    <>
      <Box p={'8vw'} flex column>
        <Box>$300 of $500 goal by March 1</Box>
        <Box>Raised by 5 people since December 1</Box>

        <Box flex column>
          <Box>Funder 1</Box>
          <Box>Funder 2</Box>
          <Box>Funder 3</Box>
        </Box>

        <DonateButton disabled={false} text="Test Text Donate" handleClick={() => null} />

        <Box>Share Person 0's fundraiser link</Box>
        <ProfileLink />
      </Box>
    </>
  );
}
