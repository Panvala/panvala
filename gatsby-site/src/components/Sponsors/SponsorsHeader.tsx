import React from 'react';
import Box from '../system/Box';
import Nav from '../Nav';

export function SponsorsHeader() {
  return (
    <Box className="bg-gradient bottom-clip-up relative z-5" height="350px">
      <Nav />
      <Box textAlign="center" color="white" bold fontSize={5} mt={3}>
        Sponsorships
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
          Panvala's sponsors take their marketing budget and spend it on Ethereum infrastructure to
          earn your support instead of spending it on ads in Times Square. Panvala's token supply is
          currently matching their donations at 30.9x.
        </Box>
      </Box>
    </Box>
  );
}
