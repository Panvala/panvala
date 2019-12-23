import React from 'react';
import Box from '../system/Box';
import matching from '../../img/fundraisers/matching.png';
import flag from '../../img/fundraisers/flag.png';
import support from '../../img/fundraisers/support.png';

const Icon = ({ src }) => (
  <Box mr={3}>
    <img src={src} alt="" />
  </Box>
);

export const ReasonToContribute = ({ iconSrc, title, children }) => (
  <Box flex mb={5}>
    <Icon src={iconSrc} />
    <Box>
      <Box bold mb={2} fontSize={3}>
        {title}
      </Box>
      <Box maxWidth="250px" lineHeight={2}>
        {children}
      </Box>
    </Box>
  </Box>
);

export function FundraiserOverview({ firstName }) {
  return (
    <Box
      mt="-5vw"
      pt={['5vw', '2vw']}
      className="relative z-2 bottom-clip-down"
      bg="#F3F4F8"
      height={['1000px', '1000px', '700px']}
    >
      <Box p={'10vw'} flex flexWrap="wrap" justifyContent={['center', 'center', 'space-between']}>
        <Box bold maxWidth="250px" fontSize={5} mb={4}>
          Why contribute to Panvala:
        </Box>

        <Box flex wrap justifyContent="center">
          <Box flex column wrap>
            <ReasonToContribute iconSrc={flag} title="Prioritized Grants">
              When you donate to {firstName}’s fundraiser, the Gitcoin team moves up Panvala’s
              leaderboard for grant application priority. View the leaderboard.
            </ReasonToContribute>

            <ReasonToContribute iconSrc={support} title="Show Your Support">
              Your name will be listed on this page as {firstName}'s supporter. Our whole community
              values our donors!
            </ReasonToContribute>
          </Box>
          <ReasonToContribute iconSrc={matching} title="30.9x Matching">
            Panvala’s token supply has been matching donations at 30.9x over the past three months.
            Read more about why voters hold on to PAN, which lets more grantees sell their tokens to
            donors like you.
          </ReasonToContribute>
        </Box>
      </Box>
    </Box>
  );
}
