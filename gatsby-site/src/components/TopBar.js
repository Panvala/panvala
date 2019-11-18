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
          <a href="/poll" className="link dim blue">
            <Box fontWeight="bold">Vote now! The Panvala Poll ends this Friday.</Box>
          </a>
        </Box>
      )}
    </>
  );
};

export default TopBar;
