import React from 'react';
import Box from '../system/Box';
import Nav from '../Nav';

export function SponsorsHeader() {
  return (
    <section className="bg-gradient bottom-clip-hero pb5">
      <Nav />
      {/* <!-- Hero --> */}
      <div className="w-70-l w-80-m w-90 center tc pv5">
        <h1 className="white f1-5 b ma0 mb4 w-80-l w-100 center">Sponsors</h1>
        <p className="white-60 f5 fw4 lh-copy ma0 mb5 w-50-l w-100 center">
          Panvala's sponsors take their marketing budget and spend it on Ethereum infrastructure to
          earn your support instead of spending it on ads in Times Square. Panvala's token supply
          matched donations like these at 11.2x in January.
        </p>
      </div>
    </section>
  );
}
