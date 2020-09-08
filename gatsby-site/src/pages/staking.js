import React, { useRef, useEffect, useState } from 'react';
import { providers, Contract, utils } from 'ethers';
import styled from 'styled-components';
import { layout, space } from 'styled-system';
import panUtils from 'panvala-utils';
import * as yup from 'yup';
import { Formik } from 'formik';

import Box from '../components/system/Box';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Nav from '../components/Nav';
import Button from '../components/Button';
import pollOne from '../img/poll-1.png';
import pollTwo from '../img/poll-2.png';
import { calculateTotalPercentage } from '../utils/poll';
import { sliceDecimals } from '../utils/format';
import { getEnvironment, Environment } from '../utils/env';
import {
  ModalBody,
  ModalOverlay,
  ModalTitle,
  ModalCopy,
  ModalSubTitle,
} from '../components/WebsiteModal';
import FieldText from '../components/FieldText';

const categories = [
  {
    categoryID: 7,
    title: 'Hashing it Out',
    description:
      "Hashing it Out is a podcast that dives into the weeds with tech innovators in blockchain technology. Its community of listeners, guests, and hosts aim to subsidize groundbreaking work in the field.",
  },
  {
    categoryID: 8,
    title: 'Commons Stack',
    description:
      "Commons Stack is a community of prosocial blockchain enthusiasts striving to create circular economies to fund public goods."
  },
  {
    categoryID: 9,
    title: 'DAppNode',
    description:
      "The DAppNode community works to make sure that all users can conveniently host P2P clients so we can decentralize the internet.",
  },
  {
    categoryID: 10,
    title: 'MetaCartel',
    description:
      "MetaCartel is a community that helps launch and grow DAOs."
  },
  {
    categoryID: 11,
    title: 'DXdao',
    description:
      "The DXdao community works to develop a DeFi ecosystem that is truly decentralized."
  },
  {
    categoryID: 12,
    title: 'Meta Gamma Delta',
    description:
      "Meta Gamma Delta is an inclusive and empowering society supporting women-led projects ✨"
  },
  {
    categoryID: 13,
    title: 'KERNEL',
    description:
      "KERNEL is an 8-week, invite-only program for top tech talent looking to build relationships, products, and companies in blockchain and Web 3."
  },
  {
    categoryID: 14,
    title: 'future modern',
    description:
      "future modern is a network of cooperatives liberating our community through tech, art, culture, and service."
  },
  {
    categoryID: 15,
    title: 'SheFi',
    description:
      "SheFi is a DeFi educational program that doubles as a vehicle to donate funds to nonprofits that focus on educating women in STEM."
  },
  {
    categoryID: 16,
    title: 'DePo DAO',
    description:
      "DePo DAO funds and encourages open source projects to break down the political barriers that currently restrain us from real progress."
  },
];

const EMPTY_PERCENTAGES = {
  7: '',
  8: '',
  9: '',
  10: '',
  11: '',
  12: '',
  13: '',
  14: '',
  15: '',
  16: '',
};

const stakingResults = {
  "7": {
    "id": 7,
    "name": "Hashing it Out",
    "weight": "837570.198094446261118931"
  },
  "8": {
    "id": 8,
    "name": "Commons Stack",
    "weight": "1692594.417733256604948306"
  },
  "9": {
    "id": 9,
    "name": "DAppNode",
    "weight": "1525500.436243333879674026"
  },
  "10": {
    "id": 10,
    "name": "MetaCartel",
    "weight": "113197.985669645681359291"
  },
  "11": {
    "id": 11,
    "name": "DXdao",
    "weight": "192469.145364741130071882"
  },
  "12": {
    "id": 12,
    "name": "Meta Gamma Delta",
    "weight": "0.0"
  },
  "13": {
    "id": 13,
    "name": "KERNEL",
    "weight": "0.0"
  },
  "14": {
    "id": 14,
    "name": "future modern",
    "weight": "4942.297094431035931722"
  },
  "15": {
    "id": 15,
    "name": "SheFi",
    "weight": "0.0"
  },
  "16": {
    "id": 16,
    "name": "DePo DAO",
    "weight": "62961.760700735256367771"
  }
};

categories.sort((a, b) => {
  const stakedA = parseFloat(stakingResults[a.categoryID].weight);
  const stakedB = parseFloat(stakingResults[b.categoryID].weight);
  if (stakedA === stakedB) return 0;
  // Sort from greatest to least.
  if (stakedA < stakedB) return 1;
  return -1;
});

const pollID = '4';
const pollDeadline = 'October 30';
const stakingTotalsUpdated = 'September 7';

const ClipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${layout};
  ${space};
`;

const Poll = () => {
  const pollFormRef = useRef(null);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(true);
  const [ptsRemaining, setPtsRemaining] = useState(100);
  const [provider, setProvider] = useState();
  const [allocations, setAllocations] = useState([]);
  const [percentages, setPercentages] = useState(EMPTY_PERCENTAGES);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      // Listen for network changes -> reload page
      window.ethereum.on('networkChanged', network => {
        console.log('MetaMask network changed:', network);
        window.location.reload();
      });
    }
  }, []);

  function handleViewPollClick() {
    pollFormRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }

  async function setSelectedAccount() {
    let selectedAccount = (await provider.listAccounts())[0];
    // user not enabled for this app
    if (!selectedAccount) {
      try {
        selectedAccount = (await window.ethereum.enable())[0];
      } catch (error) {
        if (error.stack.includes('User denied account authorization')) {
          alert(
            'MetaMask not enabled. In order to respond to the poll, you must authorize this app.'
          );
        }
      }
    }
    await setAccount(selectedAccount);
    return selectedAccount;
  }

  useEffect(() => {
    async function getBalance() {
      const tokenAbi = panUtils.contractABIs.BasicToken;
      const token = new Contract(
        '0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44',
        tokenAbi.abi,
        provider
      );

      let acct = (await provider.listAccounts())[0];

      // User has not enabled the app. Trigger metamask pop-up.
      if (!acct) {
        acct = await setSelectedAccount();
      }

      // Do not proceed with callback (setSelectedAccount)
      if (!acct) {
        return false;
      }

      const bal = await token.balanceOf(acct);
      const balance = utils.formatUnits(bal, 18);
      setBalance(sliceDecimals(balance.toString()));
      return balance;
    }

    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined' &&
      typeof provider !== 'undefined'
    ) {
      // Only set selectedAccount if user is connected to the app
      // (works even with 0 balance)
      getBalance().then(bal => bal && setSelectedAccount());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  async function connectWallet() {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      if (typeof provider === 'undefined') {
        const p = new providers.Web3Provider(window.ethereum);
        const network = await p.getNetwork();
        if (network.chainId !== 1) {
          alert('Please connect to the Main Ethereum Network to continue.');
          return;
        }

        setProvider(p);
        const acct = (await p.listAccounts())[0];
        return acct;
      } else if (!account) {
        return setSelectedAccount();
      }
    } else {
      alert('MetaMask not found. Please download MetaMask @ metamask.io');
    }
  }

  // Validate individual form field
  function validatePercentage(value) {
    let error;
    if (value < 0 || value > 100) {
      error = 'Invalid percentage';
    }
    return error;
  }

  // Validate the whole form
  const PollFormSchema = yup.object({
    categories: yup.object(),
    firstName: yup.string().trim(),
    lastName: yup.string().trim(),
    email: yup.string().email('Please enter a valid email address'),
  });

  // User changes a poll value - update state
  function updatePercentages(value, categoryID) {
    setPercentages({
      ...percentages,
      [categoryID]: value,
    });
  }

  // Change the display amount of points remaining
  // Triggered by change in values
  useEffect(() => {
    const subtotal = calculateTotalPercentage(percentages);
    setPtsRemaining(100 - subtotal);
  }, [percentages]);

  // User submits the poll
  async function handleFormSubmit(values, actions) {
    setSubmitted(true);

    if (!provider) {
      const acct = await connectWallet();
      if (!acct) {
        return;
      }
    }
    if (!account) {
      await connectWallet();
    }

    // transform the allocations for submission
    // Format allocations
    const chosenAllocations = categories.map(c => {
      const cid = c.categoryID;
      let points = percentages[cid];
      if (points === '') {
        points = 0;
      }
      return {
        categoryID: cid,
        points: parseInt(points),
      };
    });

    // console.log('allocations:', allocations);

    // Update allocations for display after voting
    await setAllocations(chosenAllocations);

    // post form
    await sendPollData(chosenAllocations);

    actions.setSubmitting(false);
  }

  function sendPollData(allocations) {
    if (account && allocations.length > 0 && !alreadyVoted) {
      return postPoll(allocations);
    } else {
      // Should never get here
      alert('Problem submitting poll');
    }
  }

  function updateVotingStatus() {
    if (account) {
      const { endpoint, headers } = getEndpoint('GET');
      console.log('endpoint:', endpoint);
      fetch(endpoint, {
        method: 'GET',
        headers,
      })
        .then(res => {
          console.log('res:', res);
          if (res.status === 200) {
            return res.json();
          }
        })
        .then(json => {
          console.log('json:', json);
          // Already voted, show alert
          if (json.responded) {
            setAlreadyVoted(true);
            if (submitted) {
              alert('The connected account has already voted in this poll.');
            }
          }
        });
    }
  }

  useEffect(() => {
    // Do this every time the account changes
    updateVotingStatus();

    if (account !== '') {
      window.ethereum.on('accountsChanged', network => {
        console.log('MetaMask account changed:', network);
        window.location.reload();
      });
    }
  }, [account]);

  function getEndpoint(method) {
    const environment = getEnvironment();
    const apiHost =
      environment === Environment.production
        ? 'https://api.panvala.com'
        : environment === Environment.staging
        ? 'https://staging-api.panvala.com'
        : 'http://localhost:5001';

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': apiHost,
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type',
    };
    if (method === 'POST') {
      return { endpoint: `${apiHost}/api/polls/${pollID}`, headers };
    } else {
      return { endpoint: `${apiHost}/api/polls/${pollID}/status/${account}`, headers };
    }
  }

  // Posts poll to database
  async function postPoll(allocations) {
    function generateMessage(account, pollID) {
      // Always use checksum address in the message
      return `Response from ${account} for poll ID ${pollID}`;
    }

    console.log('panUtils:', panUtils);
    const message = generateMessage(account, pollID);

    const signer = provider.getSigner();
    let signature;
    try {
      signature = await signer.signMessage(message);
    } catch (error) {
      alert('Message signature rejected. Vote was not submitted to poll.');
      return;
    }

    const data = {
      response: {
        account,
        allocations,
      },
      signature,
    };

    console.log('data:', data);

    const { endpoint, headers } = getEndpoint('POST');

    const res = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers,
    }).catch(err => {
      if (err.message.includes('Failed to fetch')) {
        alert(
          'Uh oh! Failed to submit the poll. Please verify each field and try again, or contact the Panvala team at info@panvala.com'
        );
      }
    });

    // Response errors
    if (res && res.status !== 200) {
      console.log('res:', res);
      const json = await res.json();
      console.log('json:', json);
      if (json.hasOwnProperty('errors') && json.errors.length > 0) {
        console.log('ERROR:', json.errors);
      }
      if (json.hasOwnProperty('msg')) {
        if (json.msg.includes('Invalid poll response request data')) {
          alert(
            'Poll form validation failed. Please verify each field and try again, or contact the Panvala team @ info@panvala.com'
          );
        }
        if (json.msg.includes('Signature does not match account')) {
          alert(
            'Message signature did not match the signing account. Vote was not submitted to poll.'
          );
        }
        if (json.msg.includes('Validation error')) {
          if (json.errors[1].message === 'account must be unique') {
            alert('Each account may only vote once per poll. Vote was not submitted to poll.');
          }
        }
      }
    } else {
      setModalOpen(true);
      setPtsRemaining(100);
      setPercentages(EMPTY_PERCENTAGES);
      setAlreadyVoted(true);
    }
  }

  const totalStaked = Object.keys(stakingResults).reduce((sum, categoryID) => sum + parseFloat(stakingResults[categoryID].weight), 0);

  return (
    <Layout>
      <SEO title="Staking" />

      {welcomeModalOpen && !account && (
        <div className="flex justify-center h5 absolute top-0 left-0 right-0">
          <ModalOverlay handleClick={() => setWelcomeModalOpen(false)} />
          <ModalBody>
            <ModalTitle>Stake PAN for Your Community</ModalTitle>
            <ModalCopy>
              PAN holders stake their tokens to earn donation matching capacity for their community. If you do not
              currently have a PAN balance but want to stake, or you would
              like to increase your stake before the <b>{pollDeadline}</b> deadline, you can
              do so via Uniswap.
            </ModalCopy>
            <Box flex justifyContent="center">
              <a
                href="https://app.uniswap.org/#/swap?outputCurrency=0xd56dac73a4d6766464b38ec6d91eb45ce7457c44"
                target="_blank"
                rel="noopener noreferrer"
                className="link b dim blue"
              >
                <Button p={3} mr={3} text="Get PAN Tokens" bg="#F5F6F9" color="black" />
              </a>
              <Button p={3} ml={3} text="Connect Wallet" onClick={connectWallet} />
            </Box>
          </ModalBody>
        </div>
      )}

      <section className="bg-gradient bottom-clip-up-1">
        <Nav account={account} balance={balance} handleClick={connectWallet} />

        {/* <!-- Instructions --> */}
        <ClipContainer p={['1rem 0 4rem', '2rem 3rem 4rem', '2rem 5rem 5rem', '5rem 10rem 8rem']}>
          <Box width={[1, 1, 0.5]} px={['4', '0']}>
            <h1 className="white f1-5 b ma0 mb4 w-80-l w-100">Stake PAN for Your Community</h1>
            <div className="f5 lh-copy mb3">
              <p className="w-60 mb0 white b">
                Panvala's communities stake tokens to earn donation matching capacity from the PAN token's inflation.
              </p>
              <p className="white-60 fw4 ma0 w-50-l w-100">
                The staked token amounts will be used for Panvala's next donation matching round on Gitcoin Grants
                from September 14 to 28. The total matching budget for all communities is 1,369,935 PAN.
              </p>
            </div>
            <div className="mv3 b">
              <button
                className="f6 link dim bn br-pill white bg-teal fw7 pointer pv3 ph4"
                onClick={handleViewPollClick}
              >
                View Communities
              </button>
            </div>
            <div className="dib v-top mr3-ns mr2 mv2">
              <a href="https://forum.panvala.com/t/stake-pan-for-your-community/186">
                <button className="f6 link dim ba b--white br-pill white bg-transparent fw7 pointer pv3 ph4">
                  Learn More
                </button>
              </a>
            </div>
          </Box>
          <Box width={[1, 1, 0.5]} p={[4, 2]} display={['none', 'none', 'block']}>
            <img alt="" src={pollOne} className="w-100 center" />
          </Box>
        </ClipContainer>
      </section>

      {/* Fund work that matters */}
      <section className="cf w-100 bottom-clip-down bg-white flex justify-between items-center">
        <Box
          p={['3rem', '2rem']}
          mb={['1rem', '0']}
          flex
          alignItems="center"
          justifyContent="space-around"
        >
          <div className="w-100 w-25-ns dn dib-ns">
            <img alt="" src={pollTwo} className="center" />
          </div>
          <div className="w-100 w-50-ns dib">
            <h2>Fund work that matters</h2>
            <p className="lh-copy">
              PAN tokens have been granted to teams that the whole Ethereum community depends on.
              The more tokens you acquire to stake, the more work those teams can fund with their
              tokens.
            </p>
            <Button
              handleClick={connectWallet}
              bg={account ? '#2138B7' : '#46B0AA'}
              text={account ? 'Wallet connected!' : 'Connect your wallet'}
            />
          </div>
        </Box>
      </section>

      {/* Ballot */}
      <section id="poll-form" ref={pollFormRef} className="pv6 mb4 bg-gray full-clip-down-lg">
        <div className="w-100 w-60-ns center">
          {modalOpen ? (
            <Box flex flexDirection="column" justifyContent="center" alignItems="center">
              <ModalTitle>Thank you for staking!</ModalTitle>
              <Box color="#555" p={4} m={2} mx={5} textAlign="center" className="lh-copy">
                Thank you for staking tokens for the current batch. Your staked PAN helps your community match
                more donations. Here is what you staked for:
              </Box>
              <Box width="75%" mt="3">
                <Box display="flex" flexDirection="column">
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    pb="2"
                    px="2"
                    fontWeight="bold"
                    color="black"
                  >
                    <Box>Category</Box>
                    <Box>Allocation</Box>
                  </Box>
                  {categories.map((c, i) => (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      key={c.categoryID}
                      bg={i % 2 === 0 && '#F5F6F9'}
                      p={2}
                    >
                      <Box>{c.title}</Box>
                      {/* TODO: Index the allocations structure by categoryID instead of index so we don't have to subtract 7 */}
                      <Box>{`${allocations.length && allocations[c.categoryID - 7].points}%`}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
              <ModalSubTitle>{`Current voting weight: ${balance} PAN`}</ModalSubTitle>
              <Box color="#555" p={4} m={2} mx={5} textAlign="center" className="lh-copy">
                Even though your vote has been submitted, you have until the <b>{pollDeadline}</b>{' '}
                deadline to increase your stake by holding more PAN tokens.
              </Box>
              <a
                href="https://app.uniswap.org/#/swap?outputCurrency=0xd56dac73a4d6766464b38ec6d91eb45ce7457c44"
                target="_blank"
                rel="noopener noreferrer"
                className="link b dim blue"
              >
                <Button p={3} text="Increase Voting Weight" />
              </a>
            </Box>
          ) : alreadyVoted ? (
            <Box flex flexDirection="column" justifyContent="center" alignItems="center">
              <ModalTitle>Thank you for staking!</ModalTitle>
              <ModalSubTitle>{`Current voting weight: ${balance} PAN`}</ModalSubTitle>
              <Box color="#555" p={4} m={2} mx={5} textAlign="center" className="lh-copy">
                Thank you for staking tokens for the current batch. Even though your vote has
                been submitted you can increase your stake by holding more PAN
                tokens.
              </Box>
              <a
                href="https://app.uniswap.org/#/swap?outputCurrency=0xd56dac73a4d6766464b38ec6d91eb45ce7457c44"
                target="_blank"
                rel="noopener noreferrer"
                className="link b dim blue"
              >
                <Button p={3} text="Increase Voting Weight" />
              </a>
            </Box>
          ) : (
            <>
              <div className="tc pv4">
                <h2>Stake PAN for Your Community</h2>
                <Box my={1} className="w-80 center tc lh-copy">
                  PAN holders stake their tokens to earn donation matching capacity for their community. If you do not
                  currently have a PAN balance but want to stake, or you would
                  like to increase your stake before the <b>{pollDeadline}</b> deadline, you can
                  do so via Uniswap.
                  <Box flex justifyContent="center" my={3}>
                    <a
                      href="https://app.uniswap.org/#/swap?outputCurrency=0xd56dac73a4d6766464b38ec6d91eb45ce7457c44"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link b dim blue"
                    >
                      <Button text="Get PAN Tokens" />
                    </a>
                  </Box>
                </Box>
              </div>

              <Box flex justifyContent="center" my={3} p={3}>
                Select your community:
              </Box>

              <div className="bg-white shadow lh-copy black">
                <Formik
                  initialValues={{
                    categories: categories.reduce((prev, current) => {
                      return { ...prev, [current.categoryID]: '' };
                    }, {}),
                    firstName: '',
                    lastName: '',
                    email: '',
                  }}
                  validate={values => {
                    return PollFormSchema.validate(values).then(() => {
                      // validate the sum of points
                      const totalPercentage = calculateTotalPercentage(percentages);
                      if (totalPercentage < 100) {
                        return { poll: 'Please allocate all 100 points' };
                      } else if (totalPercentage > 100) {
                        return { poll: 'Please allocate no more than 100 points' };
                      }
                    }).catch(error => {
                      return { [error.path]: error.message }
                    });
                  }}
                  validateOnBlur={true}
                  validateOnChange={false}
                  onSubmit={handleFormSubmit}
                >
                  {props => (
                    <form onSubmit={props.handleSubmit}>
                      {categories.map((category, index) => {
                        const { description, title, categoryID } = category;
                        const staked = stakingResults[categoryID] !== undefined ? parseFloat(stakingResults[categoryID].weight) : 0;
                        const identifier = `poll-points-category-${categoryID}`;

                        const name = `categories.${categoryID}`;
                        const isSelected = percentages[categoryID] === '100';
                        const percentageStaked = staked / totalStaked * 100;

                        return (
                          <div key={identifier} className="cf pa3 bb bw-2 b--black-10">
                            <div className="fl w-80 pa2 pr4">
                              <div className="f4 b">{title}</div>
                              <p dangerouslySetInnerHTML={{ __html: description }}></p>
                            </div>
                            <div className="fl w-20 pa2 f5 tr">
                              <div className="b ttu f6 o-50">Staked</div>
                              <div>{utils.commify(staked.toFixed(2))} PAN ({percentageStaked.toFixed(2)}%)</div>
                              <div className="i f7 o-40 pb3">last updated {stakingTotalsUpdated}</div>
                              <div>
                                <Button type="button" width="100%" p={3} ml={3} bg={isSelected ? "#F5F6F9" : ""} color={isSelected ? "black" : ""} text={isSelected ? "Selected" : "Select"} onClick={e => {
                                  setPercentages({
                                    ...EMPTY_PERCENTAGES,
                                    [categoryID]: isSelected ? '' : '100',
                                  });
                                }} />
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* <-- name and email --> */}
                      <div className="pa4 bb bw-2 b--black-10 black-60">
                        <Box color="black" display="none" justifyContent="flex-end" mb={4}>
                          Points Remaining:&nbsp;<b>{ptsRemaining}</b>
                        </Box>
                        <div className="cf pv2">
                          <div className="fl w-50 pr3">
                            <FieldText
                              type="text"
                              id="firstName"
                              name="firstName"
                              label="First name (Optional)"
                              placeholder="Enter your first name"
                              className="w-100 pa2"
                              value={props.values.firstName}
                              onChange={props.handleChange}
                            />
                          </div>
                          <div className="fl w-50">
                            <FieldText
                              type="text"
                              id="lastName"
                              name="lastName"
                              label="Last Name (Optional)"
                              placeholder="Enter your last name"
                              className="w-100 pa2"
                              value={props.values.lastName}
                              onChange={props.handleChange}
                            />
                          </div>
                        </div>
                        <div className="pv2">
                          <FieldText
                            type="text"
                            id="email"
                            name="email"
                            label="Email (Optional)"
                            placeholder="Enter your email"
                            className="w-100 pa2"
                            value={props.values.email}
                            onChange={props.handleChange}
                          />
                        </div>
                      </div>

                      <div className="cf pa4">
                        <div className="f5 tl pb3 lh-copy">
                          The final staking amounts will be calculated using the balance of PAN tokens
                          in your account on {pollDeadline}.
                        </div>
                        <div className="f5 tl pb4 lh-copy">
                          <b>
                            Reminder: You will not lose any tokens or ETH by staking for your community.
                          </b>
                        </div>
                        {/* Form-level error messages */}
                        <div>
                          {props.errors.poll ? (
                            <div className="red pb2">{props.errors.poll}</div>
                          ) : null}
                        </div>
                        <div className="fr w-100 w-70-l flex-column items-end">
                          <div className="flex justify-end">
                            <input
                              type="submit"
                              name="submit"
                              className="f6 link dim bn br-pill pv3 ph4 bg-teal white fw7"
                              value="Stake Tokens"
                              disabled={props.isSubmitting}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Poll;
