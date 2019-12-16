import React from 'react';
import Box from '../system/Box';

export function ProfileCopy({ firstName, lastName, story, teamInfo }) {
  return (
    <>
      <Box flex column maxWidth={'500px'}>
        <Box fontSize={4} bold mb={4}>
          {`${firstName} ${lastName}`}
        </Box>
        <Box bold mb={4}>
          {story}
        </Box>
        <Box>{teamInfo}</Box>
      </Box>
    </>
  );
}
