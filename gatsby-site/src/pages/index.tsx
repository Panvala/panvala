import * as React from 'react';
import { graphql } from 'gatsby';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import findIndex from 'lodash/findIndex';

import home1p1 from '../img/home-1.1.png';
import home1p2 from '../img/home-1.2.png';
import home2p1 from '../img/home-2.1.png';
import home3p1 from '../img/home-3.1.png';
import howItWorks1 from '../img/how-it-works-1.jpeg';
import howItWorks2 from '../img/how-it-works-2.png';
import howItWorks3 from '../img/how-it-works-3.png';
import donateShapes from '../img/donate-shapes.svg';
import extLevelK from '../img/external/level-k.png';
import extPlasmaGroup from '../img/external/plasma-group.png';
import extPrysmatic from '../img/external/prysmatic-labs.png';
import extConnext from '../img/external/connext.png';
import extConsensys from '../img/external/consensys.png';
import communityDonating from '../img/community-donating.png';
import leagueCommonsStack from '../img/league/commonsstack.png';
import leagueDAppNode from '../img/league/dappnode.png';
import leagueDePoDAO from '../img/league/depodao.jpg';
import leagueDXdao from '../img/league/dxdao.png';
import leagueFutureModern from '../img/league/futuremodern.jpg';
import leagueHashingItOut from '../img/league/hashingitout.jpg';
import leagueKERNEL from '../img/league/kernel.png';
import leagueMetaCartel from '../img/league/metacartel.png';
import leagueMetaGammaDelta from '../img/league/metagammadelta.jpg';
import leagueSheFi from '../img/league/shefi.jpg';
import leagueWhalerDAO from '../img/league/whalerdao.png';
import leagueMaticMitra from '../img/league/maticmitra.jpg';
import leagueFightPandemics from '../img/league/fightpandemics.jpg';
import leagueLab10Collective from '../img/league/lab10collective.png';
import leagueDeFiSafety from '../img/league/defisafety.jpg';
import leagueWeb3Bridge from '../img/league/web3bridge.jpg';
import leagueMolLeArt from '../img/league/molleart.jpg';
import leagueRotki from '../img/league/rotki.jpg';
import leagueBrightID from '../img/league/brightid.jpg';
import leagueEthereumFrance from '../img/league/ethereumfrance.jpg';
import leagueAbridged from '../img/league/abridged.jpg';
import leagueNFTHub from '../img/league/nfthub.jpg';
import leagueMetaGame from '../img/league/metagame.jpg';
import leagueMetaSpace from '../img/league/metaspace.jpg';
import leagueTripsCommunity from '../img/league/tripscommunity.jpg';
import leagueUpala from '../img/league/upala.png';
import leagueBloomNetwork from '../img/league/bloomnetwork.jpg';
import leagueHandshakeDevelopmentFund from '../img/league/handshakedevelopmentfund.png';
import leagueLexDAO from '../img/league/lexdao.jpg';
import leagueGrassrootsEconomics from '../img/league/grassrootseconomics.jpg';
import leagueCirclesUBI from '../img/league/circles-ubi.jpg';
import leagueGiveth from '../img/league/giveth.jpg';
import leagueWOCA from '../img/league/women-of-crypto-art.jpg';
import leagueDandelionCollective from '../img/league/dandelion-collective.png';
import leagueShenanigan from '../img/league/shenanigan.jpg';
import leaguePeoplesDAO from '../img/league/peoples--cooperative.png';
import leagueMarmaJ from '../img/league/marma-j-foundation.jpg';
import leaguePoolParty from '../img/league/pool-party.png';
import leaguePrimeDAO from '../img/league/primedao.jpg';
import leagueSenaryCommonwealth from '../img/league/senary-commonwealth.png';
import leagueKolektivo from '../img/league/kolektivo-labs.png';
import leagueAustinMeetups from '../img/league/austin-meetups-fund.png';
import leagueDoinGud from '../img/league/doingud.jpg';
import leagueGitcoin from '../img/league/gitcoin.png';
import leagueRaidGuild from '../img/league/raidguild.jpg';
import leagueDAOhaus from '../img/league/daohaus.png';
import leagueBEN from '../img/league/blockchain-education-network.jpg';
import leagueDAOSquare from '../img/league/daosquare.jpg';
import leagueMyCrypto from '../img/league/mycrypto.jpg';
import leagueNfDAO from '../img/league/nfdao.jpg';
import leagueNjombe from '../img/league/njombe-innovation-academy.png';
import leagueThinkBetter from '../img/league/think-better.png';
import leagueGuerrillaMusic from '../img/league/guerrilla-music.jpg';
import leagueAkashaHubBarcelona from '../img/league/akasha-hub-barcelona.jpg';
import leagueEthersJs from '../img/league/ethers-js.png';
import leagueRektNews from '../img/league/rekt-news.jpg';
import leagueUmbra from '../img/league/umbra.jpg';
import leagueCivichub from '../img/league/civichub.png';
import leagueWeb3Designers from '../img/league/web3-designers.png';
import leagueJovian from '../img/league/jovian-network.png';
import leagueIrlArt from '../img/league/irl-art.png';
import leagueCryptoKidsCamp from '../img/league/crypto-kids-camp.jpg';
import leagueManaVox from '../img/league/mana-vox.jpg';
import leagueFreedomInTechAlliance from '../img/league/freedom-in-tech-alliance.jpg';
import leagueBiggerPie from '../img/league/the-bigger-pie.jpg';


import eventsBg from '../img/events-bg.png';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import Nav from '../components/Nav';
import Modal from '../components/Modal';
import Section from '../components/Section';
import Box from '../components/system/Box';
import EventCard from '../components/EventCard';
import { FormError } from '../components/Form/FormError';
import { BudgetContext } from '../components/BudgetProvider';
import BudgetBar from '../components/BudgetBar';

import { getEpochDates } from '../utils/api';
import { formatDates } from '../utils/format';

const NewsletterFormSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
});

const IndexPage = () => {
  const budgets = React.useContext(BudgetContext);
  const [isOpen, setModalOpen] = React.useState(false);
  const [epochDates, setEpochDates] = React.useState([]);

  function handleSubmit(values, actions) {
    // console.log('submit', values);

    actions.setSubmitting(false);
    setModalOpen(true);

    actions.resetForm();
  }

  function handleClose(e) {
    e.preventDefault();
    setModalOpen(false);
    const em = document.getElementById('email-subscribe-input');
    em.value = '';
  }

  React.useEffect(() => {
    async function getData() {
      // Get dates from api
      const epDates = await getEpochDates();
      // console.log('epDates:', epDates);
      let dates = formatDates(epDates.epochDates);
      let nextDates = formatDates(epDates.nextEpochDates);
      console.log('dates:', dates);
      console.log('nextDates:', nextDates);

      // Find the next event
      const indexOfNext = findIndex(dates, date => !date.expired);

      if (indexOfNext !== -1) {
        dates[indexOfNext].nextEvent = true;
        // Clip off the expired events, only displaying the latest expired event
        dates = dates.slice(indexOfNext - 1);
      }

      // Set state
      setEpochDates(dates.concat(nextDates).slice(0, 5));
    }

    getData();
  }, []);

  return (
    <Layout>
      <SEO title="Home" />

      <section
        className="bg-gradient bottom-clip-up relative z-0 mb4-ns"
        style={{ minHeight: '760px' }}
      >
        <Nav />
        {/* <!-- Hero --> */}
        <div className="w-70-l w-80-m w-90 dt center pv5-ns pv4">
          <div className="dtc-l db v-mid w-50-l w-80-m w-90 pr5-ns">
            <h1 className="white f1-ns f2 b ma0 mb3">Powering communities</h1>
            <p className="white-60 f4-ns f5 fw4 lh-copy ma0 mb4">
            Panvala is a network of communities who cooperate and earn perks from Panvala's shared endowment.
            Panvala is run by our communities and people like you.
            </p>
            <div className="">
              <div className="dib v-top mr3-ns mr2 mv2">
                <a href="https://calendly.com/panvala-membership/meet-with-panvala">
                  <button className="f6 link dim bn br-pill white bg-teal fw7 pointer pv3 ph4">
                    Join Panvala
                  </button>
                </a>
              </div>
              <div className="dib v-top mr3-ns mr2 mv2">
                <a href="/staking">
                  <button className="f6 link dim ba b--white br-pill white bg-transparent fw7 pointer pv3 ph4">
                    Stake Tokens
                  </button>
                </a>
              </div>
              {/* <div className="dib v-top mv2">
                <a href="/poll">
                  <button className="f6 link dim bn br-pill white bg-teal fw7 pointer pv3 ph4">
                    Participate in our first poll
                  </button>
                </a>
              </div> */}
            </div>
          </div>
          <div className="dtc-l dn w-50 v-mid mt0-ns mt4">
            <img alt="" src={home1p2} className="absolute db-ns dn o-30 w-30 nl4 mt5" />
            <img alt="" src={communityDonating} className="full-clip-up-sm relative z-1" />
          </div>
          <img alt="" src={home1p1} className="absolute db-l dn z-2 nl6 mt4" />
        </div>
      </section>

      {!!budgets.epochNumber && (
        <BudgetBar
          budgetText={`Batch ${budgets.epochNumber + 1} Inflation:`}
          panValue={budgets.epochPAN}
          usdValue={budgets.epochUSD}
        />
      )}

      {/* <!-- Panvala League --> */}
      <section id="league" className="w-70-l w-80-m w-90 center tc mv6-ns mb5 mt6">
        <h2 className="f2-5 ma0 mb3-ns mb0">The Panvala League</h2>
        <p className="ma0 f6 lh-text mb3">
          The Panvala League's communities stake PAN tokens to earn donation matching from Panvala's quarterly inflation. Your community can join them! Today we have 59 communities—we're aiming for thousands.
        </p>
        <div className="flex flex-wrap items-top justify-center tc center w-100">
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueCommonsStack}
            />
            <a className="link dim near-black" href="/commons-stack">
              <h3>Commons Stack</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueDAppNode}
            />
            <a className="link dim near-black" href="/dappnode">
              <h3>DAppNode</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueMetaCartel}
            />
            <a className="link dim near-black" href="/metacartel">
              <h3>MetaCartel</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueDXdao}
            />
            <a className="link dim near-black" href="/dxdao">
              <h3>DXdao</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueHashingItOut}
            />
            <a className="link dim near-black" href="/hashing-it-out">
              <h3>Hashing it Out</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueMetaGammaDelta}
            />
            <a className="link dim near-black" href="/meta-gamma-delta">
              <h3>Meta Gamma Delta</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueKERNEL}
            />
            <a className="link dim near-black" href="/kernel">
              <h3>KERNEL</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueFutureModern}
            />
            <a className="link dim near-black" href="/future-modern">
              <h3>future modern</h3>
            </a>
          </div>
          {/*
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueSheFi}
            />
            <a className="link dim near-black" href="https://www.shefi.org/">
              <h3>SheFi</h3>
            </a>
          </div>
          */}
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueDePoDAO}
            />
            <a className="link dim near-black" href="/depo-dao">
              <h3>DePo DAO</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueWhalerDAO}
            />
            <a className="link dim near-black" href="/whalerdao">
              <h3>WhalerDAO</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueMaticMitra}
            />
            <a className="link dim near-black" href="/matic-mitra">
              <h3>Matic Mitra</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueFightPandemics}
            />
            <a className="link dim near-black" href="/fightpandemics">
              <h3>Fight Pandemics</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueLab10Collective}
            />
            <a className="link dim near-black" href="/lab10-collective">
              <h3>lab10 collective</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueDeFiSafety}
            />
            <a className="link dim near-black" href="/defi-safety">
              <h3>DeFi Safety</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueWeb3Bridge}
            />
            <a className="link dim near-black" href="/web3bridge">
              <h3>Web3Bridge</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueMolLeArt}
            />
            <a className="link dim near-black" href="/mol-leart">
              <h3>Mol LeArt</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueRotki}
            />
            <a className="link dim near-black" href="/rotki">
              <h3>Rotki</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueBrightID}
            />
            <a className="link dim near-black" href="/brightid">
              <h3>BrightID</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueEthereumFrance}
            />
            <a className="link dim near-black" href="/ethereum-france">
              <h3>EthCC by Ethereum France</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueAbridged}
            />
            <a className="link dim near-black" href="/abridged">
              <h3>Abridged</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueNFTHub}
            />
            <a className="link dim near-black" href="/nfthub">
              <h3>NFThub</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueMetaGame}
            />
            <a className="link dim near-black" href="/metagame">
              <h3>MetaGame</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueMetaSpace}
            />
            <a className="link dim near-black" href="/metaspace">
              <h3>MetaSpace</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueTripsCommunity}
            />
            <a className="link dim near-black" href="/trips-community">
              <h3>Trips Community</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueUpala}
            />
            <a className="link dim near-black" href="/upala">
              <h3>Upala</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueBloomNetwork}
            />
            <a className="link dim near-black" href="/bloom-network">
              <h3>Bloom Network</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueHandshakeDevelopmentFund}
            />
            <a className="link dim near-black" href="/handshake-development-fund">
              <h3>Handshake Development Fund</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueLexDAO}
            />
            <a className="link dim near-black" href="/lexdao">
              <h3>LexDAO</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueGrassrootsEconomics}
            />
            <a className="link dim near-black" href="/grassroots-economics">
              <h3>Grassroots Economics</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueCirclesUBI}
            />
            <a className="link dim near-black" href="/circles-ubi">
              <h3>Circles UBI</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueGiveth}
            />
            <a className="link dim near-black" href="/giveth">
              <h3>Giveth</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueWOCA}
            />
            <a className="link dim near-black" href="/women-of-crypto-art">
              <h3>WOCA (Women of Crypto Art)</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueDandelionCollective}
            />
            <a className="link dim near-black" href="/dandelion-collective">
              <h3>Dandelion Collective</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueShenanigan}
            />
            <a className="link dim near-black" href="/shenanigan">
              <h3>Shenanigan</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leaguePeoplesDAO}
            />
            <a className="link dim near-black" href="/peoples--cooperative">
              <h3>Peoples' Cooperative</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueMarmaJ}
            />
            <a className="link dim near-black" href="/marma-j-foundation">
              <h3>Marma J Foundation</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leaguePoolParty}
            />
            <a className="link dim near-black" href="/pool-party">
              <h3>Pool-Party</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leaguePrimeDAO}
            />
            <a className="link dim near-black" href="/primedao">
              <h3>PrimeDAO</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueSenaryCommonwealth}
            />
            <a className="link dim near-black" href="/senary-commonwealth">
              <h3>Senary Commonwealth</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueKolektivo}
            />
            <a className="link dim near-black" href="/kolektivo-labs">
              <h3>Kolektivo Labs</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueAustinMeetups}
            />
            <a className="link dim near-black" href="/austin-meetups-fund">
              <h3>Austin Meetups Fund</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueDoinGud}
            />
            <a className="link dim near-black" href="/doingud">
              <h3>DoinGud</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueGitcoin}
            />
            <a className="link dim near-black" href="/gitcoin">
              <h3>Gitcoin</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueRaidGuild}
            />
            <a className="link dim near-black" href="/raidguild">
              <h3>RaidGuild</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueDAOhaus}
            />
            <a className="link dim near-black" href="/daohaus">
              <h3>DAOhaus</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueBEN}
            />
            <a className="link dim near-black" href="/blockchain-education-network">
              <h3>Blockchain Education Network</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueDAOSquare}
            />
            <a className="link dim near-black" href="/daosquare">
              <h3>DAOSquare</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueMyCrypto}
            />
            <a className="link dim near-black" href="/mycrypto">
              <h3>MyCrypto</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueNfDAO}
            />
            <a className="link dim near-black" href="/nfdao">
              <h3>nfDAO</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueNjombe}
            />
            <a className="link dim near-black" href="/njombe-innovation-academy">
              <h3>Njombe Innovation Academy</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueThinkBetter}
            />
            <a className="link dim near-black" href="https://www.thinkbetter.ca/">
              <h3>ThinkBetter</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueGuerrillaMusic}
            />
            <a className="link dim near-black" href="/guerrilla-music">
              <h3>Guerrilla Music</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueAkashaHubBarcelona}
            />
            <a className="link dim near-black" href="/akasha-hub-barcelona">
              <h3>Akasha Hub Barcelona</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueEthersJs}
            />
            <a className="link dim near-black" href="/ethers-js">
              <h3>Ethers.js</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueRektNews}
            />
            <a className="link dim near-black" href="/rekt-news">
              <h3>Rekt.news</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueUmbra}
            />
            <a className="link dim near-black" href="/umbra">
              <h3>Umbra</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueCivichub}
            />
            <a className="link dim near-black" href="/civichub">
              <h3>Civichub</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueWeb3Designers}
            />
            <a className="link dim near-black" href="/web3-designers">
              <h3>Web3 Designers</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueJovian}
            />
            <a className="link dim near-black" href="/jovian-network">
              <h3>Jovian Network</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueIrlArt}
            />
            <a className="link dim near-black" href="/irl-art">
              <h3>IRL Art</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueCryptoKidsCamp}
            />
            <a className="link dim near-black" href="/crypto-kids-camp">
              <h3>Crypto Kids Camp</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueManaVox}
            />
            <a className="link dim near-black" href="/mana-vox">
              <h3>MANA VOX</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueFreedomInTechAlliance}
            />
            <a className="link dim near-black" href="/freedom-in-tech-alliance">
              <h3>Freedom in Tech Alliance</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueBiggerPie}
            />
            <a className="link dim near-black" href="/the-bigger-pie">
              <h3>The Bigger Pie</h3>
            </a>
          </div>

        </div>

        <div className="dib v-top mr3-ns mr2 mv2">
          <a href="/staking">
          <button className="f6 link dim bn br-pill white bg-teal fw7 pointer pv3 ph4">
              Stake PAN
            </button>
          </a>
        </div>
        <div className="dib v-top mr3-ns mr2 mv2">
          <a href="https://gitcoin.co/grants/?keyword=panvala+league">
          <button className="f6 link dim bn br-pill white bg-teal fw7 pointer pv3 ph4">
              Donate PAN
            </button>
          </a>
        </div>
        <div className="dib v-top mr3-ns mr2 mv2">
          <a href="mailto:membership@panvala.com?subject=We want to join the Panvala League!">
            <button className="f6 link dim bn br-pill white bg-teal fw7 pointer pv3 ph4">
              Submit A New Community
            </button>
          </a>
        </div>
      </section>

      {/* <!-- Donation CTA --> */}
      <section className="full-clip-down-blue pv6 mv6-ns mv5">
        <div className="w-50-l w-70-m w-90 center relative z-1">
          <h2 className="f2-5 ma0 mb4 mt0-ns mt6 pt6-ns pt5 white tc">Elevate Community Life</h2>
          <p className="ma0 f4 lh-text mb4 white-60">
            Panvala's treasury is a new kind of community-managed endowment—like a university endowment. PAN tokens
            are designed to build this endowment from scratch: the more we share Panvala's treasury, the stronger it gets.
            By giving communities an economic tool that rivals corporate equity and national currencies, we can shift our
            society's focus away from corporate life and political life. Let's focus on community life instead.
          </p>
          <p className="ma0 f4 lh-text mb4 white-60">
            <strong className="white">Today's society systematically rewards the people who make prosperity scarce. Together, let's be the light that
            produces abundance for our communities.</strong>
          </p>
        </div>
      </section>

      <section>
        <div className="relative">
          {/* <!-- Newsletter CTA --> */}
          <Formik
            initialValues={{ email: '' }}
            onSubmit={handleSubmit}
            validationSchema={NewsletterFormSchema}
          >
            {props => (
              <form
                className="w-70-l w-80-m w-90 center tc mv5 pv5"
                name="email-subscribe"
                onSubmit={props.handleSubmit}
              >
                <h2 className="f2-5 ma0 mb4">Join our mailing list</h2>
                <div className="cf ph5">
                  <div className="fl w-70 pa2 mr3">
                    <Field
                      name="email"
                      id="email-subscribe-input"
                      placeholder="Enter your email address"
                      className="f5 dib input-reset border-input bb b--black-20 pv2 pl2 w-100 v-mid bg-pink-20"
                      onChange={props.handleChange}
                      value={props.values.email}
                    />
                    <FormError name="email" />
                  </div>

                  {/* TODO: use the Button component */}
                  <input
                    type="submit"
                    name="submit"
                    value="Sign Up"
                    className="fl w-20-ns f6 link dim bn br-pill pv3 white bg-teal fw7 dib v-mid h-50"
                    id="email-subscribe-button"
                    disabled={props.isSubmitting}
                  />
                </div>
              </form>
            )}
          </Formik>

          {/* <!-- Modal --> */}
          <Modal
            isOpen={isOpen}
            handleClose={handleClose}
            title="Form Submitted"
            copy="Thank you. We'll be in touch!"
          />
        </div>
      </section>

      {epochDates.length > 0 && (
        <Section>
          <img src={eventsBg} className="absolute z-0 nt0-m db-ns dn"  style={{ left: '50%', transform: 'translateX(-50%)' }} />
          <Box flex justifyContent="space-around" flexWrap="wrap">
            <Box flex column zIndex={40} color="white" my={['4rem', '7rem', '180px']}>
              <Box fontSize={5} bold>
                Key dates
              </Box>
              <Box width="350px">
                Keep up to date with what is happening within the system and beyond.
              </Box>
            </Box>

            <Box flex column alignItems="flex-start">
              {epochDates.map((epochDate: any) => (
                <EventCard
                  key={`${epochDate.date}${epochDate.eventName}`}
                  date={epochDate.date}
                  eventName={epochDate.eventName}
                  eventDescription={epochDate.eventDescription}
                  expired={epochDate.expired}
                  nextEvent={epochDate.nextEvent}
                />
              ))}
            </Box>
          </Box>
        </Section>
      )}

      {/* <!-- ConsenSys  --> */}
      <div className="dt w-80-ns w-100 center-ns mb5">
        <section className="w-40-ns w-90 dtc-ns relative center">
          <section className="bg-transparent ph5-ns ph0 pv6-ns pt5 pb3">
            <img alt="" src={extConsensys} className="w-60" />
            <p className="ma0 f6 lh-text mb3 mt4">
              Panvala was launched by ConsenSys. ConsenSys is a global blockchain
              technology company building the infrastructure, applications, and practices that
              enable a decentralized world.
            </p>
            <a
              href="https://consensys.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="link dim blue f6 fw7"
            >
              Learn about ConsenSys
            </a>
          </section>
        </section>

        {/* <!-- Join CTA  --> */}
        <section className=" w-40-ns w-100 dtc-ns">
          <section className="bg-gray full-clip-up-sm ph5-ns ph5 pv6-ns pv5">
            <h2 className="f2-5 ma0 mb4 lh-copy">
              Join Panvala today and help communities amplify their contributions
            </h2>
            <a href="https://calendly.com/panvala-membership/meet-with-panvala">
              <button className="f6 link dim bn br-pill pv3 ph4 white bg-blue fw7 pointer">
                Join Panvala
              </button>
            </a>
          </section>
        </section>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
