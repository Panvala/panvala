import React from 'react';
import vivekS from '../../img/fundraisers/vivek.png';
import { ProfileCopy } from '.';
import Box from '../system/Box';

export function FundraiserProfile(props) {
  return (
    <Box mt="-5vw" className="bottom-clip-down relative z-3" bg="white" height="1000px">
      <Box p={'10vw'} flex column>
        <Box>
          <img src={vivekS} />
        </Box>
        <ProfileCopy {...props} />
      </Box>
    </Box>
  );
}
