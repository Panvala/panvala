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
      "Hashing it Out is a podcast that dives into the weeds with tech innovators in blockchain technology. Its community of listeners, guests, and hosts aim to fund infrastructure and technical development advocacy.",
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
    categoryID: 16,
    title: 'DePo DAO',
    description:
      "DePo DAO funds and encourages open source projects to break down the political barriers that currently restrain us from real progress."
  },
  {
    categoryID: 17,
    title: 'WhalerDAO',
    description:
      "WhalerDAO is a community of builders, researchers, legal experts, and community influencers who are dedicated to help solve the plethora of problems that the world is facing, using the power of blockchain and decentralized finance (DeFi)."
  },
  {
    categoryID: 18,
    title: 'Matic Mitra',
    description:
      "Matic Mitra is a community of builders, researchers, legal experts, and community influencers who are dedicated to help solve the plethora of problems that the world is facing, using the power of blockchain and decentralized finance (DeFi).",
  },
  {
    categoryID: 19,
    title: 'FightPandemics',
    description:
      "FightPandemics is an open source altruistic platform that connects individuals and organizations that need help with those that can provide it at the local and global level.",
  },
  {
    categoryID: 20,
    title: 'lab10 collective',
    description:
      "lab10 collective is the cooperative behind the Minerva Wallet that aims to co-create a zero-carbon society. Their work uses a non-extractive business model: their clients pay for features they need in the wallet, which they build and release as open source software.",
  },
  {
    categoryID: 21,
    title: 'DeFi Safety',
    description:
      "DeFi Safety performs community funded Process and Quality Audits on DeFi contracts. They answer standard questions using the public artifacts (website, GitHub, documentation) to find the answers. The result is a simple % score.",
  },
  {
    categoryID: 22,
    title: 'Web3Bridge',
    description:
      "Web3Bridge (formerly 500NigeriaDevs4Eth) is designed to be a bridge connecting web2 developers in Africa into web3. The program runs an 8-week remote learning plan which has been in operation since October 2019.",
  },
  {
    categoryID: 23,
    title: 'Mol LeArt',
    description:
      "Mol LeArt is a DAO representing Web3 creative commons, where we create smart NFTs that work for creators.",
  },
  {
    categoryID: 24,
    title: 'Rotki',
    description:
      "Rotki is an open source portfolio tracking, accounting, analytics and tax reporting tool that protects your privacy. The mission of Rotki is to bring transparency into the crypto and financial sectors through the use of open source local-first tech.",
  },
  {
    categoryID: 25,
    title: 'BrightID',
    description:
      "BrightID is a social identity network that allows you to prove that you’re only using one account. It’s the holy grail of digital identity.",
  },
  {
    categoryID: 26,
    title: 'Ethereum France',
    description:
      "Ethereum France is a French non-profit organization mainstreaming blockchain and Ethereum in all French-speaking countries. It runs the Ethereum Community Conference (EthCC), the largest annual European Ethereum event focused on technology and community. Three intense days of conferences, networking, learning and (covid-free) partying.",
  },
  {
    categoryID: 27,
    title: 'Abridged',
    description:
      "Abridged creates delightful web3 experiences with the ability to onboard anyone to receive value from crypto. Recently, they created Collab.Land. This free service allows anyone to create a tokenized online community with existing social interfaces like Telegram and Discord.",
  },
  {
    categoryID: 28,
    title: 'NFThub',
    description:
      "NFThub is an upcoming community-driven platform with an extensive directory and analytics for all things NFT.",
  },
  {
    categoryID: 29,
    title: 'MetaGame',
    description:
      "MetaGame’s community aims to build a new world as a layer atop of the old one. They use SourceCred to track contributions from community members, and reward contributors with SEED tokens.",
  },
  {
    categoryID: 30,
    title: 'MetaSpace',
    description:
      "MetaSpace is a hub for exploring health and wellness in Web3 communities. Bringing professionals from many disciplines together to share their knowledge and experience through discussions, classes, and retreats while creating a bridge between healing practitioners and the Web3 community.",
  },
  {
    categoryID: 31,
    title: 'Trips Community',
    description:
      "Trips Community aims to build a completely decentralized vacation rental platform (think “Airbnb the platform, without Airbnb the company”), along with the tools to help users transition from today’s online marketplaces to Web 3 marketplaces.",
  },
  {
    categoryID: 32,
    title: 'Upala',
    description:
      "Upala is an anti-Sybil system for DApps and a decentralized digital identity. It provides a digital identity uniqueness score in dollars (price of forgery).",
  },
  {
    categoryID: 33,
    title: 'Bloom Network',
    description:
      "Bloom connects people and existing initiatives to build capacity together and inspire a billion acts of regeneration. We do direct actions to create food security, social equity, regional economies, art and more!",
  },
  {
    categoryID: 34,
    title: 'Handshake Development Fund',
    description:
      "Handshake is a completely community-run decentralized blockchain built to dismantle ICANN's monopoly on top-level domains (.com, .net, .org, .io, etc.) and improve internet security by replacing Certificate Authorities. This community run development fund is the only source of non-VC, non-dilutive, grants funding in the HNS community.",
  },
  {
    categoryID: 35,
    title: 'LexDAO',
    description:
      "LexDAO is a group of legal engineering professionals who are seeking to provide a trusted layer between the decentralized world of blockchains and a legal settlement layer in the real world. We are trying to bridge this layer to provide a working framework for organizations to work in a trustless and trusted manner using Ethereum, blockchains, smart contracts and decentralized organizations.",
  },
  {
    categoryID: 36,
    title: 'Grassroots Economics',
    description:
      "Grassroots Economics is a non-profit foundation that seeks to empower marginalized communities to take charge of their own livelihoods and economic future. We focus on community development through economic empowerment and community currency programs. Beneficiaries of our programs include small businesses and people living in informal settlements as well as rural areas.",
  },
  {
    categoryID: 37,
    title: 'Circles UBI',
    description: "Circles is a basic income made to promote local economy within your community.",
  },
  {
    categoryID: 38,
    title: 'Giveth',
    description: "Giveth is a community of makers building the future of giving.",
  },
  {
    categoryID: 39,
    title: 'Women of Crypto Art',
    description: "Women of Crypto Art (WOCA) is a new community group formed to highlight and promote, collaborate and support any artist who identifies as a woman in the crypto art space. As a community we come together to share ideas, information, tips and general support in all things crypto art.",
  },
  {
    categoryID: 40,
    title: 'Dandelion Collective',
    description: "Dandelion Collective is a UK-based not-for-profit worker co-op. Their flagship project is Dandelion (https://dandelion.earth), a web platform for ticketed events and co-created gatherings. They also put on a range of events themselves as the Psychedelic Society (http://psychedelicsociety.org.uk/).",
  },
  {
    categoryID: 41,
    title: 'Shenanigan',
    description: "Shenanigan provides a competitive and motivating platform for athletes of all types utilizing fiscal incentives to drive personal improvement.",
  },
  {
    categoryID: 42,
    title: "Peoples' Collective",
    description: "People’s Cooperative pools funds to help support each other and families in need especially with the growing impact of the pandemic. We also support and advance the benefit of blockchain to the general community in Nigeria.",
  },
  {
    categoryID: 43,
    title: 'Marma J Foundation',
    description: "The Marma J Foundation was founded in mid-2019 with the simple goal of being an altruistic foundation with an efficient ability to spread love and positivity throughout the world. In September of the same year, the foundation moved to Antigua and Barbuda to start their very first hands-on projects.",
  },
  {
    categoryID: 44,
    title: 'Pool-Party',
    description: "Pool-Party is a smart contract-based platform where people can pool and manage crypto currencies together. Pool-Parties are set up by groups looking to combine their crypto in order to jointly invest in a project or series of other tokens all while earning interest and tokens on the pooled crypto that remains in their pool-party.",
  },
  {
    categoryID: 45,
    title: 'PrimeDAO',
    description: "PrimeDAO is a collective of Web 3 builders and creators committed to enabling the DeFi space’s systemic innovation. We’re collectively building and governing protocols that support DAO 2 DAO value creation.",
  },
  {
    categoryID: 46,
    title: 'Senary Commonwealth',
    description: "Senary Commonwealth supports web-based public utilities that democratize opportunity, more justly accrue and distribute value, and promote our greater humanity.",
  },
  {
    categoryID: 47,
    title: 'Kolektivo Labs',
    description: "Kolektivo Labs is a systems innovation lab committed to unleashing the full potential of human coordination. We do this by implementing Web 3 primitives in a real-world setting. We’ve launched CuraDAO, a social-impact DAO in Curacao, in 2019.",
  },
  {
    categoryID: 48,
    title: 'Austin Meetups Fund',
    description: "The Austin Meetups Fund is a donation-based fund shared by all local meetup groups who choose to participate. The goal of the fund is to build community, reward outstanding meetup contributors, and use new technology at the same time.",
  },
  {
    categoryID: 49,
    title: 'DoinGud',
    description: "DoinGud is a community of over +1800 individuals creating an NFT marketplace and social platform fully focused on doing good by empowering artist, creators, collectors, curators and social organizations to support one another and become self-owned, self-sustained and self-governed.",
  },
  {
    categoryID: 50,
    title: 'Gitcoin',
    description: "Gitcoin’s mission is to enable anyone to work on the open internet. We want to build a world in which everyone has the financial leverage to leave their job, and where it’s as easy to find work in software as it is for an Uber driver to find a ride today.",
  },
  {
    categoryID: 51,
    title: 'RaidGuild',
    description: "RaidGuild is the premier design and dev agency of the Web3 ecosystem. Our decentralized collective is deeply entrenched in the bleeding edge of DAOs, DeFi, dApps and everything else in between. Hailing from the MetaCartel network, our team consists of a diverse group of talent with over 9000 years of combined experience.",
  },
  {
    categoryID: 52,
    title: 'DAOhaus',
    description: "DAOhaus is a no-code platform for launching and running DAOs. Is it owned and operated by the community itself. Our mission is to foster a diverse, open economy of transparent collaboration.",
  },
  {
    categoryID: 53,
    title: 'Blockchain Education Network',
    description: "The Blockchain Education Network (BEN) is a seven-year-old 501©3 nonprofit network of blockchain clubs, students, professors, and alumni around the world. BEN provides free educational resources, conference tickets, travel scholarships, jobs and internship opportunities, and an online and offline community for all its members. BEN has had 2,350+ students go through its program across 1,000+ universities in 95+ countries.",
  },
  {
    categoryID: 54,
    title: 'DAOSquare',
    description: "DAOSquare originated from the most celebrated DAO community MetaCartel in the west and inspired by MetaCartel and MolochDAO. Since DAOSquare was founded on December 5th, 2019, it grew rapidly from a We-Media to the most influential DAO in China, or even in all Chinese-speaking areas. Different from other DAOs which focus on specific products or services, DAOSquare devotes itself to the construction of a global DAO.",
  },
];

const EMPTY_PERCENTAGES = {};
categories.forEach(x => EMPTY_PERCENTAGES[x.categoryID] = '');

const stakingResults = {
  "7": {
    "id": 7,
    "name": "Hashing it Out",
    "weight": "988500.53845029546157261"
  },
  "8": {
    "id": 8,
    "name": "Commons Stack",
    "weight": "3275728.301328624554980677"
  },
  "9": {
    "id": 9,
    "name": "DAppNode",
    "weight": "1021841.56735926393757"
  },
  "10": {
    "id": 10,
    "name": "MetaCartel",
    "weight": "44995.697767315207261213"
  },
  "11": {
    "id": 11,
    "name": "DXdao",
    "weight": "151629.33435257833530413"
  },
  "12": {
    "id": 12,
    "name": "Meta Gamma Delta",
    "weight": "249378.6064111879817"
  },
  "13": {
    "id": 13,
    "name": "KERNEL",
    "weight": "206513.591652157749240137"
  },
  "14": {
    "id": 14,
    "name": "future modern",
    "weight": "56132.598504182609061681"
  },
  "15": {
    "id": 15,
    "name": "SheFi",
    "weight": "0.0"
  },
  "16": {
    "id": 16,
    "name": "DePo DAO",
    "weight": "2162.635070868748260579"
  },
  "17": {
    "id": 17,
    "name": "WhalerDAO",
    "weight": "84524.563845741383590826"
  },
  "18": {
    "id": 18,
    "name": "Matic Mitra",
    "weight": "42998.198271661328514152"
  },
  "19": {
    "id": 19,
    "name": "FightPandemics",
    "weight": "43024.332529281741792857"
  },
  "20": {
    "id": 20,
    "name": "lab10 collective",
    "weight": "31447.502444434022897931"
  },
  "21": {
    "id": 21,
    "name": "DeFi Safety",
    "weight": "10596.557214579855715582"
  },
  "22": {
    "id": 22,
    "name": "Web3Bridge",
    "weight": "14886.564293220989370634"
  },
  "23": {
    "id": 23,
    "name": "Mol LeArt",
    "weight": "15710.4705"
  },
  "24": {
    "id": 24,
    "name": "Rotki",
    "weight": "31112.081794276275443489"
  },
  "25": {
    "id": 25,
    "name": "BrightID",
    "weight": "403144.020785298307730122"
  },
  "26": {
    "id": 26,
    "name": "Ethereum France",
    "weight": "100.0"
  },
  "27": {
    "id": 27,
    "name": "Abridged",
    "weight": "0.0"
  },
  "28": {
    "id": 28,
    "name": "NFThub",
    "weight": "55799.206896348935143044"
  },
  "29": {
    "id": 29,
    "name": "MetaGame",
    "weight": "95032.694006133437972786"
  },
  "30": {
    "id": 30,
    "name": "MetaSpace",
    "weight": "141746.945642000000720896"
  },
  "31": {
    "id": 31,
    "name": "Trips Community",
    "weight": "10896.184652086348543597"
  },
  "32": {
    "id": 32,
    "name": "Upala",
    "weight": "43549.200268292268860635"
  },
  "33": {
    "id": 33,
    "name": "Bloom Network",
    "weight": "9609.8805"
  },
  "34": {
    "id": 34,
    "name": "Handshake Development Fund",
    "weight": "199076.09332562732794055"
  },
  "35": {
    "id": 35,
    "name": "LexDAO",
    "weight": "47509.8805"
  },
  "36": {
    "id": 36,
    "name": "Grassroots Economics",
    "weight": "86486.837092976665413123"
  },
  "37": {
    "id": 37,
    "name": "Circles UBI",
    "weight": "171990.712330683031708739"
  },
  "38": {
    "id": 38,
    "name": "Giveth",
    "weight": "54363.391254332301501706"
  },
  "39": {
    "id": 39,
    "name": "Women of Crypto Art",
    "weight": "32207.143748117637984588"
  },
  "40": {
    "id": 40,
    "name": "Dandelion Collective",
    "weight": "140249.115554201233778505"
  },
  "41": {
    "id": 41,
    "name": "Shenanigan",
    "weight": "33352.140333889028718874"
  },
  "42": {
    "id": 42,
    "name": "Peoples' Cooperative",
    "weight": "22155.108934720126580928"
  },
  "43": {
    "id": 43,
    "name": "Marma J Foundation",
    "weight": "1471.961"
  },
  "44": {
    "id": 44,
    "name": "Pool-Party",
    "weight": "10806.07073"
  },
  "45": {
    "id": 45,
    "name": "PrimeDAO",
    "weight": "396.75"
  },
  "46": {
    "id": 46,
    "name": "Senary Commonwealth",
    "weight": "0.0"
  },
  "47": {
    "id": 47,
    "name": "Kolektivo Labs",
    "weight": "3534.1305"
  },
  "48": {
    "id": 48,
    "name": "Austin Meetups Fund",
    "weight": "421.076164434103620669"
  },
  "49": {
    "id": 49,
    "name": "DoinGud",
    "weight": "57231.8305"
  },
  "50": {
    "id": 50,
    "name": "Gitcoin",
    "weight": "0.0"
  },
  "51": {
    "id": 51,
    "name": "RaidGuild",
    "weight": "0.0"
  },
  "52": {
    "id": 52,
    "name": "DAOhaus",
    "weight": "0.0"
  },
  "53": {
    "id": 53,
    "name": "Blockchain Education Network",
    "weight": "10698.027711543422299589"
  },
  "54": {
    "id": 54,
    "name": "DAOSquare",
    "weight": "2175.9"
  }
};

categories.sort((a, b) => {
  const stakedA = stakingResults[a.categoryID] ? parseFloat(stakingResults[a.categoryID].weight) : 0;
  const stakedB = stakingResults[b.categoryID] ? parseFloat(stakingResults[b.categoryID].weight) : 0;
  if (stakedA === stakedB) {
    // Since we're rendering React on the server and hydrating on the client, we need to guarantee that the order is the same
    // in both places. To achieve this, we can't allow categories to ever be equal. If the staked amounts are equal, sort by unique id.
    // https://reactjs.org/docs/react-dom.html#hydrate
    return a.categoryID < b.categoryID ? -1 : 1;
  }
  // Sort from greatest to least.
  if (stakedA < stakedB) return 1;
  return -1;
});

const pollID = '6';
const snapshotsBeginOn = 'April 2';
const stakingTotalsUpdated = 'April 6';
const leagueBudget = 1266700.40;

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
              alert('The connected account has already staked for this quarter.');
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
              PAN holders stake their tokens to increase their community's donation matching multiplier. If you do not
              currently have a PAN balance but want to stake, or you would like to increase your stake,
              you can do so via Uniswap. Daily staking snapshots begin on <b>{snapshotsBeginOn}</b>.
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
          <Box width={[1, 1, 0.5]} px={['4', '4']}>
            <h1 className="white f1-5 b ma0 mb4 w-80-l w-100">Stake PAN for Your Community</h1>
            <div className="f5 lh-copy mb3">
              <p className="mb0 white b">
                Panvala's communities stake tokens to earn donation matching capacity from the PAN token's inflation.
              </p>
              <p className="white-60 fw4 ma0">
                The staked token amounts will be used for Panvala's next donation matching round on Gitcoin Grants
                from March 10 to 25. The total matching budget for all communities is {utils.commify(leagueBudget)} PAN.
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
      <section id="poll-form" ref={pollFormRef} className="pv6 mb4 bg-gray">
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
                      <Box>{`${allocations.length && allocations[i].points}%`}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
              <ModalSubTitle>{`Current voting weight: ${balance} PAN`}</ModalSubTitle>
              <Box color="#555" p={4} m={2} mx={5} textAlign="center" className="lh-copy">
                Even though your vote has been submitted, you have until <b>{snapshotsBeginOn}</b>{' '}
                to increase your stake by holding more PAN tokens. After that date, donation matching will
                be allocated through daily staking snapshots.
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
                <Box mt={1} mb={3} className="w-80 center tc lh-copy">
                  PAN holders stake their tokens to increase their community's donation matching multiplier. The Panvala League's
                  goal is for communities to own the same share of Panvala as the share of the budget they want to receive,
                  so we reward them for it with a higher matching multiplier. Stake more PAN to increase your
                  community's <strong>funding at capacity</strong>, the amount of funding you can receive this quarter
                  with the highest possible matching multiplier.
                </Box>
                <Box my={1} className="w-80 center tc lh-copy">
                  If you do not currently have a PAN balance but want to stake, or you would
                  like to increase your stake, you can do so via Uniswap. Daily staking snapshots begin on <b>{snapshotsBeginOn}</b>.
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
                      {categories.map((category) => {
                        const { description, title, categoryID, hidden } = category;
                        const staked = stakingResults[categoryID] !== undefined ? parseFloat(stakingResults[categoryID].weight) : 0;
                        const identifier = `poll-points-category-${categoryID}`;

                        const name = `categories.${categoryID}`;
                        const isSelected = percentages[categoryID] === '100';
                        const percentageStaked = staked / totalStaked * 100;
                        const matchingCapacity = staked / totalStaked * leagueBudget;

                        return (
                          <div key={identifier} className={`cf pa3 bb bw-2 b--black-10 ${identifier}`} style={ hidden ? { display: "none" } : {} }>
                            <div className="fl w-70 pa2 pr4">
                              <div className="f4 b">{title}</div>
                              <p>{description}</p>
                            </div>
                            <div className="fl w-30 pa2 f5 tr">
                              <div className="b ttu f6 o-50">Staked</div>
                              <div>{utils.commify(staked.toFixed(2))} PAN</div>
                              <div className="b ttu f6 o-50">Capacity</div>
                              <div>{percentageStaked.toFixed(2)}%</div>
                              <div className="b ttu f6 o-50">Funding at Capacity</div>
                              <div>{utils.commify(matchingCapacity.toFixed(2))} PAN</div>
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
                          The daily staking snapshots will be calculated using the balance of PAN tokens
                          in your account each day beginning on {snapshotsBeginOn}.
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
