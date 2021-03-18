import React from 'react';
// import path from 'path';

import Layout from '../components/Layout';
import Nav from '../components/Nav';
import SEO from '../components/seo';

// import hashingItOut from '../img/communities/hashing-it-out.png';
import matchingIcon from '../img/matching.png';
import supportersIcon from '../img/supporters.png';
import { ICommunityData, NetworkEnums } from '../data';
import { loadImage } from '../utils/images';

interface CommunityProps {
  pageContext: {
    communityName: string;
    ethereumAddress?: string;
    layer2Preference: string;
    layer2Address: string;
  };
  communityWebsite?: string;
  communityTwitter?: string;
  startDate?: Date;
  matchingMultiplier?: string;
  totalPanDonations?: number;
  totalDonors?: number;
  totalPanOwnership?: number;
  panForMaxMatch?: number;
  [key: string]: any;
}

const Community = (props: CommunityProps) => {

  // TODO: pull real data for this
  const communityWebsite = props.communityWebsite || 'hashingitout.com';
  const communityTwitter = props.communityTwitter || 'HashingItOutPod';
  const startDate = props.startDate || new Date('12/17/2020');
  const matchingMultiplier = props.matchingMultiplier || '6.1';
  const totalPanDonations = props.totalPanDonations || 300000;
  const totalDonors = props.totalDonors || 182;
  const totalPanOwnership = props.totalPanOwnership || 430300;
  const panForMaxMatch = props.panForMaxMatch || 510450;

  function mapLayer2ToNetworkEnum(preference: string) {
    const testString = preference.toLowerCase();
    if ((/xdai/g).test(testString))
      return NetworkEnums.XDAI;
    else if ((/matic/g).test(testString))
      return NetworkEnums.MATIC;
    return '';
  }

  const getProgressBarWidth = (multiplier: string) => {
    const percentString = (parseFloat(multiplier) / 12).toPrecision(2);
    return parseFloat(percentString) * 100;
  };

  const formatNumber = (input: string | number): string => {
    const inputStr = typeof input === 'number' ? input.toString() : input;
    const outputStr = new Array(inputStr.length);
    let counter = 1;
    for (let i = inputStr.length - 1; i >= 0; i -= 1) {
      if (counter % 3 === 0) {
          outputStr[i] = `${i - 1 >= 0 ? ',' : ''}${inputStr[i]}`;
          counter = 1;
      } else {
        outputStr[i] = inputStr[i];
        counter += 1;
      }
    }
    return outputStr.join('');
  };

  const { communityName, ethereumAddress, layer2Address, layer2Preference } = props.pageContext;

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

  return (
    <Layout>
      <SEO title="Donate" />
  
      <section className="bg-gradient pb6">
        <Nav />
        <div className="bg-white bottom-clip-hero pb6 flex">
          
          {/* Content Column */}
          <div className="w-60 mv5 flex-column">

            {/* Community Info */}
            <div className="w-90 pl4 center flex">
              <div className="w-30">
                <img src={communityImage} className="br3" />
              </div>
              <div className="w-60 ml4">
                <h1 className="f2 mb3">{communityName}</h1>
                <div className="flex pb2">
                  <a href={communityWebsite} target="_blank" rel="noreferrer" className="w-40 blue link">{communityWebsite}</a>
                  <a href={`https://www.twitter.com/${communityTwitter}`} target="_blank" rel="noreferrer" className="w-40 blue link">@{communityTwitter}</a>
                </div>
                <div className="">
                  <p className="f4 fw1 lh-copy">{communityName} is a member of the Panvala League: we stake PAN tokens to earn matching for donations made using PAN.</p>
                </div>
              </div>
            </div>

            {/* Matching Info */}
            <div className="w-90 center pl4 flex-column">

              {/* Title */}
              <div className="mt5">

                <div className="">
                  <img src={matchingIcon} alt="Matching Icon" />
                  <div className="relative">
                    <div className="f3 b absolute left-2 bottom-0 ml4 pb1">Matching</div>
                  </div>
                </div>

                {/* Progress Bar Header */}
                <div className="mv3 relative flex justify-between">
                  <div className="f5 blue absolute bottom-0 pb1 left-0">1x</div>
                  <div className="f2 b center">{matchingMultiplier}x</div>
                  <div className="f5 blue absolute bottom-0 pb1 right-0">12x</div>
                </div>

                {/* Progress Bar */}
                <div className="relative h1">
                  <div className="br-pill w-100 absolute bottom-0 top-0 bg-light-gray"></div>
                  <div className="br-pill absolute bottom-0 top-0 bg-gradient" style={{ width: `${getProgressBarWidth(matchingMultiplier)}%` }}></div>
                </div>

                {/* Matching Explanation */}
                <p className="f4 lh-copy">Donation matching is earned from community members who are owners of Panvala. The more PAN we own, the matching we earn.</p>
              </div>

            </div>

            {/* Matching Statistics Info */}
            <div className="w-90 mt5 pl4 center flex">
              <div className="w-50">
                <div className="f5 teal">PAN owned by community members</div>
                <div className="f2 b mv3">{formatNumber(totalPanOwnership)} PAN</div>
                <p className="f5 mv0 lh-copy">Donation matching is earned from community members who are owners of Panvala. The more PAN we own, the more matching we earn!</p>
                <div className="w-70 bg-gray mv5 center">
                  <a href="" className="w-100 dim dib pv3 ph4 bn tc br-pill white bg-teal f5 fw7 link pointer">Become an Owner</a>
                </div>
              </div>
              <div className="w-50 pl4">
                <div className="f5 teal">PAN needed for maximum matching</div>
                <div className="f2 b mv3">{formatNumber(panForMaxMatch)} PAN</div>
                <p className="f5 mv0 lh-copy">To increase {communityName}'s matching multiplier, community members can increase their ownership stake by up to {formatNumber(panForMaxMatch)} PAN.</p>
                <div className="w-70 mv5 center">
                  <a href="" className="w-100 dim dib pv3 ph4 tc br-pill teal b--teal ba bw1 f5 fw7 link pointer">Log in as an Owner</a>
                </div>
              </div>
            </div>

            {/* Supporters */}
            <div className="w-90 mt5 pl4 br3 pa4 shadow-5 flex-column center">
              <div className="flex center tc dt">
                <div className="dtc v-mid">
                  <img src={supportersIcon} />
                </div>
                <div className="dtc v-mid">
                  <h2>Supporters</h2>
                </div>
              </div>
            </div>

          </div>
          
          {/* Donation Call to Action */}
          <div className="w-40 fixed right-0">
            <div className="w-80 mv5 br3 pa4 shadow-5 flex-column">
              <div className="flex">
                <div className="w-70 flex-column">
                  <div className="mt2 mb2 f5 fw1">Raised since {startDate.toDateString()}</div>
                  <div className="mv2 f2 b">{formatNumber(totalPanDonations)} PAN</div>
                  <div className="mb4 f4 fw1 mid-gray">$12,2873.02</div>

                  <div className="mt2 mb2 f4 fw1">Donors</div>
                  <div className="mt2 f2 b">{totalDonors}</div>
                </div>
                <div className="w-30 relative">
                  <div className="pa4 tc bg-blue white dib br-100 absolute" style={{ right: '-4.5rem' }}>
                    <div className="f6 fw1">Matching</div>
                    <div className="f2 b pa1">{matchingMultiplier}x</div>
                    <div className="f6 fw1">Multiplier</div>
                  </div>
                </div>
              </div>
              <p className="f4 mid-gray">Community earns more matching from Panvala with additional donor!</p>
              <a
                href={`/${communityName.replace(/[' ']/g, '-').toLowerCase()}/donate`}
                className="w-100 dim dib mv2 pv3 ph4 bn tc br-pill white bg-gradient f4 fw7 link pointer"
              >Donate</a>
            </div>
          </div>
          
        </div>
      </section>
  
    </Layout>
  );
};

export default Community;
