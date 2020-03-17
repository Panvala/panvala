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
import philanthropistsAnimation from '../img/philanthropists-animation.gif';
import teamGnosis from '../img/external/team-gnosis.png';
import teamStatus from '../img/external/team-status.png';
import teamLevelK from '../img/external/team-levelk.png';
import teamSigma from '../img/external/team-sigma.png';
import teamTenderly from '../img/external/team-tenderly.png';
import simon from '../img/simon.png';
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
        style={{ height: '760px' }}
      >
        <Nav />
        {/* <!-- Hero --> */}
        <div className="w-70-l w-80-m w-90 dt center pv5-ns pv4">
          <div className="dtc-l db v-mid w-50-l w-80-m w-90 pr5-ns">
            <h1 className="white f1-ns f2 b ma0 mb3">Hodlers are philanthropists.</h1>
            <p className="white-60 f4-ns f5 fw4 lh-copy ma0 mb4">
              Bitcoin subsidizes its own security by inflating the money supply. Panvala generalizes those
              economics to <b className="white fw6"> subsidize whatever we want</b>.
              Panvala is run by our grantees and people like <b className="white fw6"> you</b>.
            </p>
            <div className="">
              <div className="dib v-top mr3-ns mr2 mv2">
                <a href="/join">
                  <button className="f6 link dim bn br-pill white bg-teal fw7 pointer pv3 ph4">
                    Join Panvala
                  </button>
                </a>
              </div>
              <div className="dib v-top mr3-ns mr2 mv2">
                <a href="/sponsors">
                  <button className="f6 link dim ba b--white br-pill white bg-transparent fw7 pointer pv3 ph4">
                    Support our Sponsors
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
            <img alt="" src={philanthropistsAnimation} className="full-clip-up-sm relative z-1" />
          </div>
          <img alt="" src={home1p1} className="absolute db-l dn z-2 nl6 mt4" />
        </div>
      </section>

      {!!budgets.epochNumber && (
        <BudgetBar
          budgetText={`Batch ${budgets.epochNumber + 1} grants budget:`}
          panValue={budgets.epochPAN}
          usdValue={budgets.epochUSD}
        />
      )}

      {/* <!-- Comparison Section --> */}
      {/* <section
        id="home-comparison"
        className="bg-white w-70-l w-80-m w-90 center br4 shadow relative z-1 top-0-ns top-14 pa5-ns pa4"
        style={{ marginTop: '-450px' }}
      >
        <h2 className="f2-5 ma0 tc">Sustainable Funding</h2>
        <div className="dt mt5-ns mt4">
          <div className="dtc-ns db tc w-50-ns w-100 v-top pr4-ns pr0">
            <img alt="" src={sustFund1} className="center w-75-ns" />
            <h3 className="f4 ma0 mt5-ns mt3 mb2">The old way</h3>
            <p className="ma0 f6 lh-text">
              Raise money with an ICO, then spend it until one day, it all runs out. Oops!
            </p>
          </div>
          <div className="dtc-ns db tc w-50-ns w-100 v-top pl4-ns pl0 mt0-ns mt4">
            <img alt="" src={sustFund2} className="center w-75-ns" />
            <h3 className="f4 ma0 mt5-ns mt3 mb2">The new way</h3>
            <p className="ma0 f6 lh-text">
              Fund work with grants of PAN, the token of Panvala. Since donations are made in PAN as
              well, we all have an incentive to recruit more donors!
            </p>
          </div>
        </div>
      </section> */}
      
      <section className="center tc">
        <h1 class="tc">How Panvala Works</h1>
        <div className="dt mt6-ns mt5 w-70-l w-80-m w-90 center">
          <div className="dtc-ns db w-50-ns w-100 v-mid tl pr4-ns pr0 mt0-ns mt4">
            <h2 className="f2-5 ma0 mv3 lh-copy">BTC and ETH hodlers aren't just investors</h2>
            <p className="ma0 f6 lh-text mb3">
              Hodlers dilute their share of the currency supply to subsidize the security of the network. The security
              of a blockchain is a public good we can all share without degrading security for anyone else.
              People don't think of hodlers as philanthropists because they've made so much money over the years,
              but that's the breakthrough! Since Bitcoin was launched in 2009, people have been outlandishly rewarded
              for subsidizing public goods.
            </p>
          </div>
          <div className="dtc-ns w-50-ns v-mid">
            <img alt="" src={howItWorks1} className="full-clip-up-sm relative z-1" />
          </div>
          <img
            alt=""
            src={home2p1}
            className="absolute nl6 nt5-l nt0-m mt5 w-auto-ns w-10 db-ns dn"
          />
        </div>
        <div className="bg-gray pv6 full-clip-up mv6-ns mv4">
          <div className="dt w-70-l w-80-m w-90 center">
            <img alt="" src={home3p1} className="absolute w-auto-ns w-10-ns db nl5-ns mt6-ns" />
            <div className="dtc-ns w-50-ns v-mid">
              <img alt="" src={howItWorks2} className="full-clip-up-sm relative z-1" />
            </div>
            <div className="dtc-ns w-50-ns v-mid tl pl4-ns pl0 mt0-ns mt4">
              <h2 className="f2-5 ma0 mv3 lh-copy">Bitcoin matches at 60x</h2>
              <p className="ma0 f6 lh-text mb3">
                In Q4 of 2019, Bitcoin users spent 2500 BTC on transaction fees. BTC hodlers diluted their
                holdings to fund 150,000 BTC of block reward subsidies. They're matching contributions to
                Bitcoin's security at 60x. In the normal world, people get excited when a rich person offers
                to match contributions at 2x: if we give a dollar, they'll match with a dollar. But Bitcoin
                is matching at 60x! They’re the most generous philanthropists in the world.
              </p>
            </div>
          </div>
        </div>
        <div className="dt mt6-ns mt5 w-70-l w-80-m w-90 center">
          <div className="dtc-ns db w-50-ns w-100 v-mid tl pr4-ns pr0 mt0-ns mt4">
            <h2 className="f2-5 ma0 mv3 lh-copy">Panvala matches like Bitcoin</h2>
            <p className="ma0 f6 lh-text mb3">
              If we can generalize Bitcoin's model to subsidize more broadly useful things than blockchain security,
              it could have a giant impact on the world. That's what we're doing with Panvala. In the quarter
              that ended on January 31, Panvala matched donations from our sponsors at 11.2x. For each token
              that came into the token supply as a donation, 11.2 PAN went out as grants. We believe that like Bitcoin,
              high levels of matching can be sustained for over a decade, and that Panvala's matching can be shared
              among as many communities as want to use it.
            </p>
          </div>
          <div className="dtc-ns w-50-ns v-mid">
            <img alt="" src={howItWorks3} className="full-clip-up-sm relative z-1" />
          </div>
          <img
            alt=""
            src={home2p1}
            className="absolute nl6 nt5-l nt0-m mt5 w-auto-ns w-10 db-ns dn"
          />
        </div>
      </section>

      {/* <!-- Donation CTA --> */}
      <div className="mv6-ns mv5 pv6-ns pv4 relative" style={{ top: '100px' }}>
        <img alt="" src={donateShapes} className="absolute z-0 db-ns dn" />
        <section className="w-70-l w-80-m w-90 center tc relative z-1">
          <h2 className="f2-5 ma0 mb3 mt0-ns mt6 pt6-ns pt5">Our Mission</h2>
          <p className="ma0 f6 lh-text w-50-ns w-100 center mb4">
            We can create an incredible decade-long window when any community in the world can have their
            funding for public goods amplified at attractive rates. Think about all
            the Bitcoin mining operations that have sprung up out of nowhere since 2009 to earn rewards
            from Satoshi’s decision to subsidize security, and imagine that Satoshi had decided to subsidize
            other public goods instead. Firms would pop up all over the world—not to rack up power bills
            mining blocks, but to provide public goods that we’ve all wanted but couldn’t coordinate to fund.
          </p>
          
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
      </div>

      {epochDates.length > 0 && (
        <Section>
          <img src={eventsBg} className="absolute z-0 nt0-m db-ns dn" />
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

      {/* <!-- Our Launch Partners--> */}
      <section className="w-70-l w-80-m w-90 center tc mv6-ns mb5 mt6">
        <h2 className="f2-5 ma0 mb3-ns mb0">Our launch partners</h2>
        <div className="flex flex-wrap items-center justify-center tc center w-100">
          <img
            alt=""
            src={teamGnosis}
            className="w-20-l w-30 dib v-mid grayscale o-40 animate pa4"
          />
          <img
            alt=""
            src={teamStatus}
            className="w-20-l w-30 dib v-mid grayscale o-20 animate pa4"
          />
          <img
            alt=""
            src={teamLevelK}
            className="w-20-l w-30 dib v-mid grayscale o-50 animate pa4"
          />
          <img
            alt=""
            src={teamSigma}
            className="w-20-l w-30 dib v-mid grayscale o-20 animate pa4"
          />
          <img
            alt=""
            src={teamTenderly}
            className="w-20-l w-30 dib v-mid grayscale o-20 animate pa4"
          />
        </div>
      </section>

      {/* <!-- Quote Section --> */}
      <section className="full-clip-down-blue pv6 mv6-ns mv5">
        <div className="dt w-70-l w-80-m w-90 center">
          <div className="dtc-ns db w-50-ns w-100 v-mid tl pr4-ns pr0">
            <h2 className="f2-5 ma0 mv3 lh-copy white">
              Our supporters care about the future of Ethereum
            </h2>
            <p className="ma0 f4 white-60 lh-text mb3">
              “I'm donating to Panvala because new socially driven organisations could be the key to
              avoiding a tragedy of the commons for maintaining public networks like Ethereum.”
            </p>
          </div>
          <div className="dtc-ns db w-50-ns w-100 v-btm tr-ns tl pb0-ns pb5 pt0-ns pt3">
            <img
              alt=""
              src={simon}
              className="relative br-top shadow bottom-clip-down w-90-ns w-100"
            />
            <h3 className="f4 ma0 mt5-ns mt0 mb2 white">Simon de la Rouviere</h3>
            <p className="ma0 f6 lh-text white-60">Token Engineering Pioneer</p>
          </div>
        </div>
      </section>

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
            <a href="/join">
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
