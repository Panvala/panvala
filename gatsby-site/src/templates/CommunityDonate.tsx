import React from 'react';

import CommunityDonation from '../components/Community/CommunityDonation';
import Layout from '../components/Layout';
import Nav from '../components/Nav';
import SEO from '../components/seo';

import { ICommunityData, NetworkEnums, networks, tokens } from '../data';

interface CommunityDonateProps {
  pageContext: {
    communityName: string;
    ethereumAddress?: string;
    layer2Preference: string;
    layer2Address: string;
  };
  [key: string]: any;
}

const CommunityDonate = (props: CommunityDonateProps) => {
  const data = {
    networks,
    tokens,
  };

  function mapLayer2ToNetworkEnum(preference: string) {
    const testString = preference.toLowerCase();
    if ((/xdai/g).test(testString))
      return NetworkEnums.XDAI;
    else if ((/matic/g).test(testString))
      return NetworkEnums.MATIC;
    return '';
  }

  const { communityName, ethereumAddress, layer2Address, layer2Preference } = props.pageContext;

  const community: ICommunityData = {
    name: communityName,
    addresses: {}
  };

  if (ethereumAddress)
    community.addresses[NetworkEnums.MAINNET] = ethereumAddress;

  if (layer2Preference && layer2Address) {
    const chainId = mapLayer2ToNetworkEnum(layer2Preference);
    if (chainId !== '')
     community.addresses[chainId] = layer2Address;
  }

  return (
    <Layout>
      <SEO title="Donate" />
  
      <section className="bg-gradient pb6">
        <Nav />
        <div className="bg-white bottom-clip-hero pb6">
          <div className="w-60-l w-70-m w-80 left pv5">
            <h1 className="f1-5 b ma0 mb4 w-80-l w-100 center pb2">
              Make a Donation
            </h1>
            <CommunityDonation data={data} community={community} />
          </div>
        </div>
      </section>
  
    </Layout>
  );
};

export default CommunityDonate;
