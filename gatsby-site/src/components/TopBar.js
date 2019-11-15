import React, { useEffect, useState } from 'react';
import Box from './system/Box';

const TopBar = () => {
  const [route, setRoute] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!window.location.href.includes('poll')) {
        setRoute('POLL');
      }
    }
  }, [route]);

  return (
    <>
      {route === 'POLL' && (
        <Box height={64} bg="white" color="blue" flex justifyContent="center" alignItems="center">
          <Box>Want to participate in our upcoming poll?</Box>
          <a href="/poll" className="link dim blue">
            <Box fontWeight="bold">&nbsp;Learn More ></Box>
          </a>
        </Box>
      )}
    </>
  );
};

export default TopBar;
