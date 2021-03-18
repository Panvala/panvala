import React from 'react';

import CommunityDonation from '../components/Community/CommunityDonation';
import Layout from '../components/Layout';
import Nav from '../components/Nav';
import SEO from '../components/seo';

import leftArrowIcon from '../img/left-arrow.svg';
import gitcoinIcon from '../img/gitcoin.png';
import givethIcon from '../img/giveth.png';
import { DonationMethodEnums, ICommunityData, NetworkEnums, networks, tokens } from '../data';
import { MatchingMultiplierInfo } from '../components/Community/InfoCards';
import { loadImage } from '../utils/images';

interface CommunityDonateProps {
  pageContext: {
    campaignName: string;
    communityName: string;
    ethereumAddress?: string;
    layer2Preference?: string;
    layer2Address?: string;
    primaryDonationMethod?: string;
    donationURL?: string;
  };
  [key: string]: any;
}

const CommunityDonate = (props: CommunityDonateProps) => {
  const data = { networks, tokens };
  
  // TODO: pull real data for this
  const matchingMultiplier = '6.1';

  function mapDonationMethodToEnum(donationMethod: string) {
    const testString = donationMethod.toLowerCase();
    if ((/gitcoin/g).test(testString))
      return DonationMethodEnums.GITCOIN;
    else if ((/giveth/g).test(testString))
      return DonationMethodEnums.GIVETH;
    return '';
  }

  function mapLayer2ToNetworkEnum(preference: string) {
    const testString = preference.toLowerCase();
    if ((/xdai/g).test(testString))
      return NetworkEnums.XDAI;
    else if ((/matic/g).test(testString))
      return NetworkEnums.MATIC;
    return '';
  }

  const {
    communityName,
    ethereumAddress,
    layer2Address,
    layer2Preference,
    primaryDonationMethod,
    donationURL,
  } = props.pageContext;

  const communityImage = loadImage(communityName);

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

  let donationMethod = '';

  if (primaryDonationMethod && donationURL)
    donationMethod = mapDonationMethodToEnum(primaryDonationMethod);

  const Spacer = ({ width }) => <div className={`w-${width}-l w-${width}-m w-${width} pv5`} />;

  const ExternalDonationLink = ({ image }) => (
    <a className="blue link flex mv4" href={donationURL} target="_blank" rel="noreferrer">
      <img className="w2" src={image} alt={donationMethod} />
      <div className="f5 ml3">Donate on {donationMethod}</div>
    </a>
  );

  return (
    <Layout>
      <SEO title="Donate" />
      <section className="bg-gradient pb6">
        <Nav />
        <div className="bg-white bottom-clip-hero pb6 flex">
          <Spacer width="10" />

          {/* Donation Form */}
          <div className="w-40-l w-40-m w-70 pv5">
            <div className="w-90-l w-90-m w-100 center">
              <a
                href={`/${communityName.replace(/[' ']/g, '-').toLowerCase()}`}
                className="dib mb4 teal link pointer"
              >
                <img src={leftArrowIcon} /> Back to Community
              </a>
              <h1 className="f1-5 b ma0 mb4 pb2">Make a Donation</h1>
              <CommunityDonation data={data} community={community} />
            </div>
          </div>

          {/* Matching Multiplier Info */}
          <div className="w-50-l w-50-m w-20 pv5 flex-column fixed right-0">
            <MatchingMultiplierInfo
              image={communityImage}
              title={communityName}
              multiplier={matchingMultiplier}
            />
            <div className="w-60-l bg-white ml5 mt4 flex-column">
              <div className="f4 b">Other ways to support with PAN</div>
              {!!donationMethod && !!donationURL && (
                <>
                  {donationMethod === DonationMethodEnums.GITCOIN && <ExternalDonationLink image={gitcoinIcon} />}
                  {donationMethod === DonationMethodEnums.GIVETH && <ExternalDonationLink image={givethIcon} />}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CommunityDonate;
