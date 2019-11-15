import * as React from 'react';
import Jazzicon from 'react-jazzicon';
import { utils } from 'ethers';
import Box from './system/Box';

function isAddress(address) {
  try {
    utils.getAddress(address);
    return true;
  } catch (error) {}
  return false;
}

const Identicon = ({ diameter, address }) => {
  const [seed, setSeed] = React.useState(0);

  React.useEffect(() => {
    // some leniency re: checksums using ethUtil.isValidAddress
    if (isAddress(address)) {
      const addr = address.slice(2, 10);
      const newSeed = parseInt(addr, 16);
      setSeed(newSeed);
    }
  }, [address]);

  return (
    <Box items="center" content="center" height={diameter} width={diameter} mx={1}>
      <Jazzicon diameter={diameter} seed={seed} />
    </Box>
  );
};

export default Identicon;
