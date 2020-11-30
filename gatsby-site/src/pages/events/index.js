import React, { useEffect } from 'react';

import Button from '../../components/Button';
import Layout from '../../components/Layout';
import Nav from '../../components/Nav';
import SEO from '../../components/seo';
import Box from '../../components/system/Box';


const Join = () => {
  useEffect(() => {
    if (window.eventCalendarAppUtilities) {
      window.eventCalendarAppUtilities.init("03dbe142-b422-445d-84c4-da3efe3c0aae");
      window.eventCalendarAppUtilities.init("082eff3d-2688-4677-a1f7-d4aa18b7a644");
    }
  });

  return (
    <Layout>
      <SEO title="Events" />

      <section className="bg-gradient bottom-clip-hero pb5">
        <Nav />
        {/* <!-- Hero --> */}
        <div className="w-70-l w-80-m w-90 center tc pv5">
          <h1 className="white f1-5 b ma0 mb4 w-80-l w-100 center">Events</h1>
          <p className="white-60 f5 fw4 lh-copy ma0 mb5 w-50-l w-100 center">
            The best way to dive into Panvala is to hang out with us! Here are calendars for Panvala-wide events,
            and events from communities in the Panvala League.
          </p>
        </div>
      </section>
      
      <div className="cf w-100 flex flex-column items-center">
        <section className="w-70-ns w-100 ph4 mb4">
          <h1 className="tc">Panvala Events</h1>
          <p className="tc ma0 f6 lh-text mb3">
            This calendar includes Panvala-wide events and events supported by Panvala's <a href="https://handbook.panvala.com/governance/activities-fund">Activities Fund</a>. You can earn PAN by attending most of these events! All times are U.S. Eastern time.
          </p>
          <div className="eca-app-container" data-widgetuuid="03dbe142-b422-445d-84c4-da3efe3c0aae"></div>
        </section>

        <section className="w-70-ns w-100 ph4 mb4">
          <h1 className="tc">Panvala League Events</h1>
          <p className="tc ma0 f6 lh-text mb3">
            This calendar includes events submitted by each Panvala League community. All times are U.S. Eastern time.
          </p>
          <div className="eca-app-container" data-widgetuuid="082eff3d-2688-4677-a1f7-d4aa18b7a644"></div>
        </section>
      </div>

      
    </Layout>
  );
};


export default Join;
