import React from 'react';
import Box from '../system/Box';
import SponsorshipForm from '../SponsorshipForm';

export function FundraiserForm() {
  return (
    <Box mt="-5vw" className="relative z-2" height="1000px">
      {/* Main Section */}
      <Box p={'10vw'}>
        <SponsorshipForm />
      </Box>
    </Box>
  );
}
