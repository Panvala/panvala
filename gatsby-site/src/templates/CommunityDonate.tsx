import React, { useEffect, useState } from 'react';

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
import { getMatchingMultiplier } from '../utils/calculations';

interface CommunityDonateProps {
  pageContext: {
    campaignName: string;
    communityName: string;
    ethereumAddress?: string;
    layer2Preference?: string;
    layer2Address?: string;
    primaryDonationMethod?: string;
    donationURL?: string;
    scoreboard: any,
  };
  [key: string]: any;
}

const CommunityDonate = (props: CommunityDonateProps) => {
  const data = { networks, tokens };

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
    scoreboard,
    scoreboardTotals,
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

  const [matchingMultiplier, setMatchingMultiplier] = useState<number>(0);

  useEffect(() => {
    if (scoreboard && scoreboardTotals) {
      setMatchingMultiplier(getMatchingMultiplier(scoreboard, scoreboardTotals));
    }
  }, [scoreboard]);
  

  const Spacer = ({ width }) => <div className={`w-${width}-l w-${width}-m w-${width} pv5-ns pv3 dn-m`} />;

  const ExternalDonationLink = ({ image }) => (
    <a className="blue link mv4 dt" href={donationURL} target="_blank" rel="noreferrer">
      <img className="w2 dtc v-mid" src={image} alt={donationMethod} />
      <div className="f5 pl3 ml3 dtc v-mid">Donate on {donationMethod}</div>
    </a>
  );

  return (
    <Layout>
      <SEO title="Donate" />

      <section className="bg-gradient pb6">
        <Nav />
        <div className="
          bg-white 
          pb2
          flex
          flex-wrap
          flex-nowrap-ns
        ">

          <Spacer width="10" />

          {/* Donation Form */}
          <div className="
            w-40-l
            w-50-m
            w-100
            pa4
            pv5-l
            ph0-ns
          ">
            <div className="w-90-l w-80-m w-100 center">
              <a
                href={`/${communityName.replace(/[' ']/g, '-').toLowerCase()}`}
                className="dt mb4 teal link pointer"
              >
                <img className="dtc v-mid" src={leftArrowIcon} />
                <span className="dtc pl1 v-mid">Back to Community</span>
              </a>
              <span className="f2-ns f2-5 b ma0 mb4 pb2">Make a Donation</span>
              <CommunityDonation data={data} community={community} />
            </div>
          </div>   

          {/* Matching Multiplier Info */}
          <div className="
            w-100
            w-50-l
            w-60-m
            pv5-ns
            mt3
            flex-column
            flex-column-reverse
            fixed
            static-ns
            left-0
            right-0
            bottom-0
            z-999
          ">
            <MatchingMultiplierInfo
              image={communityImage}
              title={communityName}
              multiplier={matchingMultiplier}
            />
            {!!donationMethod && !!donationURL && (
              <div className="w-60-l w-80-m w-100 bg-white ml5-l center-m mt4 flex-column dn db-ns">
                <div className="f4 b">Other ways to support with PAN</div>
                {donationMethod === DonationMethodEnums.GITCOIN && <ExternalDonationLink image={gitcoinIcon} />}
                {donationMethod === DonationMethodEnums.GIVETH && <ExternalDonationLink image={givethIcon} />}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CommunityDonate;
