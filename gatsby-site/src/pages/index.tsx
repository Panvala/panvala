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
import leagueWOCA from '../img/league/woca.jpg';
import leagueDandelionCollective from '../img/league/dandelion-collective.png';
import leagueShenanigan from '../img/league/shenanigan.jpg';
import leaguePeoplesDAO from '../img/league/peoplesdao.png';
import leagueMarmaJ from '../img/league/marma-j.jpg';
import leagueHackervilla from '../img/league/hackervilla.png';
import leaguePrimeDAO from '../img/league/primedao.jpg';
import leagueSenaryCommonwealth from '../img/league/senary-commonwealth.png';
import leagueKolektivo from '../img/league/kolektivo-labs.png';
import leagueAustinMeetups from '../img/league/austin-meetups-fund.png';
import leagueDoinGud from '../img/league/doingud.jpg';













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
            <h1 className="white f1-ns f2 b ma0 mb3">Money for communities</h1>
            <p className="white-60 f4-ns f5 fw4 lh-copy ma0 mb4">
              Panvala is a donation matching fund that we want to share with your community.
              Donations were matched at 7.5x last quarter using the PAN cryptocurrency that powers the system.
              Panvala is run by our communities and people like you.
            </p>
            <div className="">
              <div className="dib v-top mr3-ns mr2 mv2">
                <a href="https://handbook.panvala.com/join-panvala">
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
          The Panvala League's communities stake PAN tokens to earn donation matching capacity from Panvala's quarterly inflation. Your community can join them! Today we have 42 communities—we're aiming for thousands.
        </p>
        <div className="flex flex-wrap items-top justify-center tc center w-100">
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueCommonsStack}
            />
            <a class="link dim near-black" href="https://commonsstack.org/">
              <h3>Commons Stack</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueDAppNode}
            />
            <a class="link dim near-black" href="https://dappnode.io/">
              <h3>DAppNode</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueMetaCartel}
            />
            <a class="link dim near-black" href="https://www.metacartel.org/">
              <h3>MetaCartel</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueDXdao}
            />
            <a class="link dim near-black" href="https://dxdao.eth.link/">
              <h3>DXdao</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueHashingItOut}
            />
            <a class="link dim near-black" href="https://twitter.com/hashingitoutpod">
              <h3>Hashing it Out</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueMetaGammaDelta}
            />
            <a class="link dim near-black" href="https://metagammadelta.com/">
              <h3>Meta Gamma Delta</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueKERNEL}
            />
            <a class="link dim near-black" href="https://gitcoin.co/blog/announcing-kernel/">
              <h3>KERNEL</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueFutureModern}
            />
            <a class="link dim near-black" href="https://twitter.com/afuturemodern">
              <h3>future modern</h3>
            </a>
          </div>
          {/*
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueSheFi}
            />
            <a class="link dim near-black" href="https://www.shefi.org/">
              <h3>SheFi</h3>
            </a>
          </div>
          */}
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueDePoDAO}
            />
            <a class="link dim near-black" href="https://www.depodao.org/">
              <h3>DePo DAO</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueWhalerDAO}
            />
            <a class="link dim near-black" href="https://whalerdao.org/">
              <h3>WhalerDAO</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueMaticMitra}
            />
            <a class="link dim near-black" href="https://matic.network/matic-mitra/">
              <h3>Matic Mitra</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueFightPandemics}
            />
            <a class="link dim near-black" href="https://linktr.ee/fightpandemics">
              <h3>Fight Pandemics</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueLab10Collective}
            />
            <a class="link dim near-black" href="https://lab10.coop/">
              <h3>lab10 collective</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueDeFiSafety}
            />
            <a class="link dim near-black" href="https://defisafety.com/">
              <h3>DeFi Safety</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueWeb3Bridge}
            />
            <a class="link dim near-black" href="http://www.web3bridge.com/">
              <h3>Web3Bridge</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueMolLeArt}
            />
            <a class="link dim near-black" href="https://twitter.com/molleart">
              <h3>Mol LeArt</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueRotki}
            />
            <a class="link dim near-black" href="https://rotki.com/">
              <h3>Rotki</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueBrightID}
            />
            <a class="link dim near-black" href="https://www.brightid.org/">
              <h3>BrightID</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueEthereumFrance}
            />
            <a class="link dim near-black" href="https://www.ethereum-france.com/">
              <h3>EthCC by Ethereum France</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueAbridged}
            />
            <a class="link dim near-black" href="https://abridged.io/">
              <h3>Abridged</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueNFTHub}
            />
            <a class="link dim near-black" href="http://nfthub.xyz/">
              <h3>NFThub</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueMetaGame}
            />
            <a class="link dim near-black" href="https://metagame.wtf/">
              <h3>MetaGame</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueMetaSpace}
            />
            <a class="link dim near-black" href="https://metaspacenow.com/">
              <h3>MetaSpace</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueTripsCommunity}
            />
            <a class="link dim near-black" href="https://tripscommunity.com/en/">
              <h3>Trips Community</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueUpala}
            />
            <a class="link dim near-black" href="https://upala-docs.readthedocs.io/en/latest/">
              <h3>Upala</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueBloomNetwork}
            />
            <a class="link dim near-black" href="https://bloomnetwork.org/">
              <h3>Bloom Network</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueHandshakeDevelopmentFund}
            />
            <a class="link dim near-black" href="https://www.titansofdata.org/handshake/hns-development-fund/">
              <h3>Handshake Development Fund</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueLexDAO}
            />
            <a class="link dim near-black" href="https://lexdao.org/">
              <h3>LexDAO</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueGrassrootsEconomics}
            />
            <a class="link dim near-black" href="https://www.grassrootseconomics.org/">
              <h3>Grassroots Economics</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueCirclesUBI}
            />
            <a class="link dim near-black" href="https://joincircles.net/">
              <h3>Circles UBI</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueGiveth}
            />
            <a class="link dim near-black" href="https://giveth.io/">
              <h3>Giveth</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueWOCA}
            />
            <a class="link dim near-black" href="https://womenofcrypto.art/">
              <h3>WOCA (Women of Crypto Art)</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueDandelionCollective}
            />
            <a class="link dim near-black" href="https://dandelion.earth/">
              <h3>Dandelion Collective</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueShenanigan}
            />
            <a class="link dim near-black" href="https://she.energy/">
              <h3>Shenanigan</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leaguePeoplesDAO}
            />
            <a class="link dim near-black" href="https://www.peoplesdao.community/">
              <h3>Peoples' Cooperative</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueMarmaJ}
            />
            <a class="link dim near-black" href="https://www.marmaj.org/">
              <h3>Marma J Foundation</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueHackervilla}
            />
            <a class="link dim near-black" href="https://www.pool-party.club/hackervilla">
              <h3>Hackervilla</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leaguePrimeDAO}
            />
            <a class="link dim near-black" href="https://primedao.eth.link/#/">
              <h3>PrimeDAO</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueSenaryCommonwealth}
            />
            <a class="link dim near-black" href="https://sbv.io/">
              <h3>Senary Commonwealth</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueKolektivo}
            />
            <a class="link dim near-black" href="https://kolektivo.co/">
              <h3>Kolektivo Labs</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueAustinMeetups}
            />
            <a class="link dim near-black" href="https://www.meetup.com/ethereum-austin/events/">
              <h3>Austin Meetups Fund</h3>
            </a>
          </div>
          <div className="flex flex-column items-center w-20-l w-33 dib v-mid pa4">
            <img
              alt=""
              src={leagueDoinGud}
            />
            <a class="link dim near-black" href="https://linktr.ee/doingud">
              <h3>DoinGud</h3>
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
          <a href="mailto:caucus@panvala.com?subject=We want to join the Panvala League!">
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
            <strong class="white">Today's society systematically rewards the people who make prosperity scarce. Together, let's be the light that
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
            <a href="https://handbook.panvala.com/join-panvala">
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
