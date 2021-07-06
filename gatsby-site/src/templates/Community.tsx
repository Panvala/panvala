import React, { useEffect, useState } from 'react';
import { utils } from 'ethers';
import moment from 'moment';

import Layout from '../components/Layout';
import Nav from '../components/Nav';
import SEO from '../components/seo';

import chevronRight from '../img/chevron-right.svg';
import matchingIcon from '../img/matching.png';
import supportersIcon from '../img/supporters.png';
import { ICommunityData, NetworkEnums } from '../data';
import { loadImage } from '../utils/images';
import { getFullyStakedAmount, getMatchingMultiplier, getMaxMatchingMultiplier, parseCommaFloat } from '../utils/calculations';

interface CommunityProps {
  pageContext: {
    communityName: string;
    ethereumAddress?: string;
    layer2Preference: string;
    layer2Address: string;
    scoreboard: any;
    scoreboardTotals: any;
    donorsList?: any[];
    ownersList?: any[];
  };
  [key: string]: any;
}

const Community = (props: CommunityProps) => {

  // TODO: pull real data for this
  const communityWebsite = props?.pageContext?.scoreboard?.communityWebsite || '';
  const communityTwitter = props?.pageContext?.scoreboard?.communityTwitter || '';
  const startDate = props?.pageContext?.scoreboard?.startDate || moment('2021-06-01');
  const donorsList = props?.pageContext?.donorsList || [];
  const ownersList = props?.pageContext?.ownersList || [];
  const usdDonated = '';

  function mapLayer2ToNetworkEnum(preference: string) {
    const testString = preference.toLowerCase();
    if ((/xdai/g).test(testString))
      return NetworkEnums.XDAI;
    else if ((/matic/g).test(testString))
      return NetworkEnums.MATIC;
    return '';
  }

  const getProgressBarWidth = (multiplier: number, max: number) => {
    const percent = ((multiplier - 1) / (max - 1)) * 100;
    return percent > 100 ? 100 : percent;
  };

  const {
    communityName,
    ethereumAddress,
    layer2Address,
    layer2Preference,
    scoreboard,
    scoreboardTotals,
  } = props.pageContext;

  const communityImage = loadImage(communityName);

  const [showSupportersCard, setShowSupportersCard] = useState<boolean>(false);

  const [fullyStakedAmount, setFullyStakedAmount] = useState<number>(0);
  const [matchingMultiplier, setMatchingMultiplier] = useState<number>(0);
  const [maxMatchingMultiplier, setMaxMatchingMultiplier] = useState<number>(0);

  useEffect(() => {
    if (scoreboard && scoreboardTotals) {
      setMatchingMultiplier(getMatchingMultiplier(scoreboard, scoreboardTotals));
      setMaxMatchingMultiplier(getMaxMatchingMultiplier(scoreboard, scoreboardTotals));
      const fullStake = getFullyStakedAmount(scoreboard, scoreboardTotals);
      let neededForFullStake = fullStake - parseCommaFloat(scoreboard.stakedTokens);
      if (neededForFullStake < 0) {
        neededForFullStake = 0;
      }
      setFullyStakedAmount(Math.round(neededForFullStake));
    }
  }, [scoreboard, scoreboardTotals]);


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

  const MatchingMultiplierInfo = () => (
    <>
      <div className="f6-ns f7 fw1">Matching</div>
      <div className="f2-ns f3 b pa1">{matchingMultiplier}x</div>
      <div className="f6-ns f7 fw1">Multiplier</div>
    </>
  );

  return (
    <Layout>
      <SEO title={communityName} />

      <section className="bg-gradient pb6">
        <Nav />
        <div className="bg-white flex flex-wrap flex-nowrap-ns">

          {/* Content Column */}
          <div className="w-60-l w-50-m w-100 mv5-ns mv4 flex-column">

            {/* Community Info (Mobile/Tablet) */}
            <div className="dn-l">
              <div className="w-80-l w-90-m w-100 center-m flex flex-wrap flex-column flex-nowrap-m relative static-m">
                <div className="w-80 center">
                  <div className="dt">
                    <div className="w-30 dtc v-mid">
                      <img className="br3" src={communityImage} />
                    </div>
                    <div className="w-70 dtc v-mid tc">
                      <h1 className="f3">{communityName}</h1>
                    </div>
                  </div>
                </div>
                <div className="w-80 center flex pt2">
                  {!!communityWebsite && <a href={communityWebsite} target="_blank" rel="noreferrer" className="w-50 tl blue link">www.test.com{communityWebsite}</a>}
                  {!!communityTwitter && <a href={`https://www.twitter.com/${communityTwitter}`} target="_blank" rel="noreferrer" className="w-50 tr blue link">@{communityTwitter}twittertest</a>}
                </div>
                <div className="w-80 center">
                  <p className="f5 fw1 tj lh-copy">{communityName} is a member of the Panvala League: we stake PAN tokens to earn matching for donations made using PAN.</p>
                </div>
              </div>
            </div>

            {/* Community Info (Desktop) */}
            <div className="dn db-l">
              <div className="w-90 pl4 center flex">
                <div className="w-30">
                  <img src={communityImage} className="br3" />
                </div>
                <div className="w-60 ml4">
                  <h1 className="f2 mb3">{communityName}</h1>
                  {(!!communityWebsite || !!communityTwitter) && (
                    <div className="flex pb2">
                      {!!communityWebsite && <a href={communityWebsite} target="_blank" rel="noreferrer" className="w-40 blue link">{communityWebsite}</a>}
                      {!!communityTwitter && <a href={`https://www.twitter.com/${communityTwitter}`} target="_blank" rel="noreferrer" className="w-40 blue link">@{communityTwitter}</a>}
                    </div>
                  )}
                  <div className="">
                    <p className="f4 fw1 lh-copy">{communityName} is a member of the Panvala League: we stake PAN tokens to earn matching for donations made using PAN.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Matching Info */}
            <div className="w-90-l w-80 center  pl4-l pl3-m flex-column">

              {/* Title */}
              <div className="mt5-ns mt4">

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
                  <div className="f5 blue absolute bottom-0 pb1 right-0">{maxMatchingMultiplier}x</div>
                </div>

                {/* Progress Bar */}
                <div className="relative h1">
                  <div className="br-pill w-100 absolute bottom-0 top-0 bg-light-gray"></div>
                  <div className="br-pill absolute bottom-0 top-0 bg-gradient" style={{ width: `${getProgressBarWidth(matchingMultiplier, maxMatchingMultiplier)}%` }}></div>
                </div>

                {/* Matching Explanation */}
                <p className="f4 tj tl-l lh-copy">Donation matching is earned from community members who are owners of Panvala. The more PAN we own, the matching we earn.</p>
              </div>

            </div>

            {/* Matching Statistics Info */}
            <div className="w-90-l w-80 mt5 pl4-l pl3-m center flex-l flex-column flex-row-l">
              <div className="w-50-l w-100">
                <div className="f5 teal">PAN owned by community members</div>
                <div className="f2 b mv3">{utils.commify(Math.round(parseCommaFloat(scoreboard.stakedTokens)))} PAN</div>
                <p className="f5 mv0 tj tl-l lh-copy">Our PAN holdings include any PAN we hold together as a community, plus any PAN held by individual community members to increase our matching multiplier.</p>
                <div className="w-70 bg-gray mv5 center">
                  <a href="/staking" className="w-100 dim dib pv3 ph4 bn tc br-pill white bg-teal f5 fw7 link pointer">Become a Holder</a>
                </div>
              </div>
              <div className="w-50-l w-100 pl4-l">
                <div className="f5 teal">PAN needed for maximum matching</div>
                <div className="f2 b mv3">{utils.commify(fullyStakedAmount)} PAN</div>
                <p className="f5 mv0 tj tl-l lh-copy">To increase {communityName}'s matching multiplier, community members can increase their PAN holdings by up to {utils.commify(fullyStakedAmount)} PAN.</p>
                <div className="w-70 mv5 center dn">
                  <a href="" className="w-100 dim dib pv3 ph4 tc br-pill teal b--teal ba bw1 f5 fw7 link pointer">Log in as a Holder</a>
                </div>
              </div>
            </div>

            {/* Supporters */}
            {showSupportersCard && <div className="w-80 mv5 br3 pa4 shadow-5 flex-column center">
              <div className="center dt">
                <div className="dtc v-mid">
                  <img src={supportersIcon} />
                </div>
                <div className="pl3 dtc v-mid">
                  <h2>Supporters</h2>
                </div>
              </div>
              <div className="flex center mv4 w-90 justify-between">
                <div className="w-40">
                  <h3>DONORS</h3>
                  <div className="flex-column">
                    {!!donorsList.length && donorsList.map(donor => <div key={donor} className="f4 pv2">{donor}</div>)}
                  </div>
                </div>
                <div className="w-40">
                  <h3>OWNERS</h3>
                  <div className="flex-column">
                  {!!ownersList.length && ownersList.map(owner => <div key={owner} className="f4 pv2">{owner}</div>)}
                  </div>
                </div>
              </div>
              <div className="flex mt5 mb4 pb2">
                <a href="" className="dt link pointer f4 b center blue">
                  <img className="dtc v-mid" src={chevronRight} alt=">" />
                  <span className="dtc v-mid pl2">View the full list of Supporters</span>
                </a>
              </div>
            </div>}

          </div>

          {/* Donation Call to Action */}
          <div className="w-40 w-50-m fixed right-0">
            <div className="w-100 w-80-ns mv5-ns ml2-m pa3 pa4-l pa3-m left-m flex-column bg-white fixed static-ns left-0 right-0 bottom-0 z-999 br3 shadow-5">
              <div className="flex flex-wrap flex-nowrap-ns">
                <div className="w-70-ns w-60 flex-column">
                  <div className="mt2-ns mb2-ns f5 fw1">Raised since {startDate ? moment(startDate).format('MMMM D') : ''}</div>
                  <div className="mv2-ns f2-ns f3 b">{utils.commify(Math.round(parseCommaFloat(scoreboard.pANDonated)))} PAN</div>
                  <div className="mb4-ns mb3 f4-ns f5 fw1 mid-gray">{usdDonated}</div>

                  <div className="mt2-ns mb2-ns f4-ns f5 fw1">Donors</div>
                  <div className="mt2-ns f2-ns f3 b">{utils.commify(parseCommaFloat(scoreboard.donationCount))}</div>
                </div>
                <div className="w-30-ns w-40 relative">
                  {/* Desktop */}
                  <div className="dib-l dn pa4 tc bg-blue white br-100 absolute" style={{ right: '-4.5rem' }}>
                    <MatchingMultiplierInfo />
                  </div>

                  {/* Tablet */}
                  <div className="dib-m dn pa4 tc bg-blue white br-100">
                    <MatchingMultiplierInfo />
                  </div>

                  {/* Mobile */}
                  <div className="dib dn-ns pa4 tc bg-blue white br-100 absolute" style={{ top: '-1.5rem' }}>
                    <MatchingMultiplierInfo />
                  </div>
                </div>
              </div>
              <p className="f4-ns f5 mid-gray">{communityName} earns more matching from Panvala with each additional donor!</p>
              <a
                href={`/${communityName.replace(/[' ']/g, '-').toLowerCase()}/donate`}
                className="w-100 dim dib mv2-ns pv3-ns ph4-ns pa3 bn tc br-pill white bg-gradient f4-ns f5 fw7 link pointer"
              >Donate</a>
            </div>
          </div>

        </div>
      </section>

    </Layout>
  );
};

export default Community;
