import React from 'react';
import Box from '../system/Box';
import matching from '../../img/fundraisers/matching.png';
import flag from '../../img/fundraisers/flag.png';
import support from '../../img/fundraisers/support.png';

const Image = ({ src }) => (
  <Box height="100%">
    <img src={src} alt="" />
  </Box>
);

export function FundraiserOverview() {
  return (
    <Box mt="-5vw" className="relative z-2 bottom-clip-down" bg="#F3F4F8" height="700px">
      <Box p={'10vw'} flex justifyContent="space-between">
        <Box bold maxWidth="210px" fontSize={4}>
          Why contribute to Panvala:
        </Box>

        <Box flex column maxWidth="220px">
          <Box mb={5}>
            <Image src={flag} />
            <Box bold mb={2}>
              Prioritized Grants
            </Box>
            <Box>
              When you donate to Vivek Singh’s fundraiser, the Gitcoin team moves up Panvala’s
              leaderboard for grant application priority. View the leaderboard.
            </Box>
          </Box>

          <Box>
            <Image src={support} />
            <Box bold mb={2}>
              Show Your Support
            </Box>
            <Box>
              Your name will be listed on this page as Vivek Singh's supporter. Our whole community
              values our donors!
            </Box>
          </Box>
        </Box>

        <Box maxWidth="220px">
          <Image src={matching} />
          <Box flex bold mb={2}>
            30.9x Matching
          </Box>
          <Box>
            Panvala’s token supply has been matching donations at 30.9x over the past three months.
            Read more about why voters hold on to PAN, which lets more grantees sell their tokens to
            donors like you.
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
