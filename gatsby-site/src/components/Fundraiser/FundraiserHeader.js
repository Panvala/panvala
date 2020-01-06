import React from 'react';
import Box from '../system/Box';
import Nav from '../Nav';

export function FundraiserHeader() {
  return (
    <Box className="bg-gradient bottom-clip-up relative z-5" height="350px">
      <Nav />
      <Box textAlign="center" color="white" bold fontSize={5} mt={3}>
        Fundraiser Leagues
      </Box>
      <Box flex justifyContent="center">
        <Box
          textAlign="center"
          width="50vw"
          fontSize={2}
          lineHeight={1.5}
          opacity="0.6"
          color="white"
          mt={3}
        >
          Donating to Panvala sustains the whole Ethereum ecosystem while
          increasing the next grant for the team you support. Donations are matched by Panvala's
          token supply.
        </Box>
      </Box>
    </Box>
  );
}
