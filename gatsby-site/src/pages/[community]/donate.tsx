import React from 'react';

import CommunityDonation from '../../components/Community/CommunityDonation';
import Layout from '../../components/Layout';
import Nav from '../../components/Nav';
import SEO from '../../components/seo';

interface CommunityDonateProps {
  params: {
    community: string;
  };
}

const CommunityDonate = ({ params }: CommunityDonateProps) => (
  <Layout>
    <SEO title="Donate" />

    <section className="bg-gradient pb6">
      <Nav />
      <div className="bg-white bottom-clip-hero pb6">
        <div className="w-60-l w-70-m w-80 left pv5">
          <h1 className="f1-5 b ma0 mb4 w-80-l w-100 center pb2">
            Make a Donation
          </h1>
          <CommunityDonation community={params.community} />
        </div>
      </div>
    </section>

  </Layout>
);

export default CommunityDonate;
