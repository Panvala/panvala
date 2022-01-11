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
  {
    categoryID: 55,
    title: 'MyCrypto',
    description: "MyCrypto is an open-source, client-side tool for interacting with the blockchain. Developed by and for the community beginning in 2015, we’re focused on building awesome products that put the power in people’s hands.",
  },
  {
    categoryID: 56,
    title: 'nfDAO',
    description: "nfDAO is a community DAO whose primary mission is to support and fund NFT projects, that we believe will unlock a new era of mass adoption from NFTs. We operate by supporting and helping NFT projects grow, from their earlier stages of operation. When passionate and knowledgeable community members support the Blockchain ecosystem, we can achieve greater adoption and value for the whole industry.",
  },
  {
    categoryID: 57,
    title: 'Njombe Innovation Academy',
    description: "Njombe region's main economic activities are agriculture (76.3% of GDP) and livestock keeping. Local youth have few employment opportunities. Could we create an environment where local youth gain the tools and mindset to transform the challenges that surround them into social enterprises? The Social Innovation Academy model has proven that through a cost-effective and “freesponsible” community approach, marginalized youth can become self-reliant and can create a future for themselves through social enterprises, which in turn disrupt the root causes of social problems.",
  },
  {
    categoryID: 58,
    title: 'ThinkBetter',
    description: "ThinkBetter is a Toronto based not-for-profit group that teaches advanced thinking skills and evidence based self-improvement techniques. The rationality concepts we teach assist people to accelerate their personal growth. We believe that excellent critical thinking skills are necessary for a happy and healthy society.",
  },
  {
    categoryID: 59,
    title: 'Guerrilla Music',
    description: "Guerrilla Music was founded by Sourav Deb, and Sky Hayward with the intention of doing things differently. We wanted to create a “for the artist, by the artist” type of company. Our goal from the beginning has been to empower artists of all disciplines. Currently we’re working on raising money for artists and musicians in Accra, Ghana.",
  },
  {
    categoryID: 60,
    title: 'Akasha Hub Barcelona',
    description: "The AKASHA Barcelona hub, founded by Lorenzo Patuzzo, is imagined as a physical space for meetups, workshops, project development, and perhaps the creation of the next big thing. Our 280 sqm space includes desk workspaces, a hardware hacklab, a meeting room, a chilling zone, and a multipurpose social area for gatherings and meetups. The AKASHA Foundation encourages collaboration and supports great ideas. With this in mind, the hub is a physical complement to all of our digital interactions. And we hope it will be the first of many.",
  },
  {
    categoryID: 61,
    title: 'Ethers.js',
    description: "The ethers.js library is a complete and compact library for interacting with the Ethereum Blockchain and its ecosystem.",
  },
  {
    categoryID: 62,
    title: 'rekt.news',
    description: "Rekt.news is the dark web of DeFi journalism. At rekt.news, we aim to argue both sides of the story whilst also educating and entertaining our readers. Our content is unfiltered and authentic - an anonymous platform for whistleblowers and DeFi detectives to present their findings to the community. No other DeFi media company is as close to the ground as we are. We are not spectators; we report with experience from the inside of the industry.",
  },
  {
    categoryID: 63,
    title: 'Umbra',
    description: "As a protocol, Umbra defines a simple set of standards, coupled with a singleton smart contract instance, to enable stealth addresses on Ethereum. With a stealth address, a payer can send Ether or ERC20 tokens to an address controlled by the receiver, but no one except the two parties know who that receiver is.",
  },
  {
    categoryID: 64,
    title: 'Civichub',
    description: "Civichub is a pre-acceleration program which has taken place twice so far. The first iteration in 2018 consisted of 6 in-person weekend sprints in the volcanic region of La Garrotxa (Girona, Catalonia), the second version of the course took place in 2020-21 online. During these two sessions, more than 40 startups, social movements, cyber activists, corporate and government teams came together to boost and cross-pollinate their civic innovation, distributed governance and decentralized technology projects.",
  },
  {
    categoryID: 65,
    title: 'Web3 Designers',
    description: "To evolve the beauty and usability of products in this ecosystem, we believe every project in the web3 realm needs and deserves access to a skilled product designer. As a collective of working design professionals, we're perfectly attuned to identify candidates who can add maximum value to a specific project or problem space. We boldly aim to cut out traditional recruiting firms and use our profits to fund educational programs which onboard skilled web2 designers into web3.",
  },
  {
    categoryID: 66,
    title: 'Jovian Network',
    description: "We are a network of research professionals, technologists, speakers, and activists empowering communities in radical new ways. Whether shepherding a community to originate a DAO for the first time, or helping an existing DAO overcome a specific challenge, we serve these communities reaching their highest good. All primary research findings will be open-source so that learnings may benefit the entire ecosystem.",
  },
  {
    categoryID: 67,
    title: 'IRL Art',
    description: "The IRL Art team is a grassroots, woman-owned, diverse, hard working group based in Denver, Colorado. Our team both individually manage independant large scale creative projects, and collectively create IRL projects leveraging each others’ resources, talents and tools. Together we’ve worked with over 1300 artists on an unquantifiable amount of projects. We program art, large events, education opportunities, build and strengthen art communities through a wide array of different vertices and industries.",
  },
  {
    categoryID: 68,
    title: 'Crypto Kids Camp',
    description: "Crypto Kids Camp combines emerging technology with financial literacy to create a unique educational experience that not only improves upon these conventional S.T.E.M. and S.T.E.A.M. programs, but stands in a lane of its own. Our campers get an introduction to emerging technologies like drones, cyber security, NFTs, and online gaming so they can decide what interests them while learning the fundamentals of each discipline.",
  },
  {
    categoryID: 69,
    title: 'MANA VOX',
    description: "MANA is an NGO based in Paris, France, that builds the MANA-Vox solution, an AI-enhanced platform that can monitor individual corporations’ involvement in local ecological controversies based on real-time information compiled from social media. It is the first crowdsourced index that tracks negative impact on forest made by corporations.",
  },
  {
    categoryID: 70,
    title: 'Freedom in Tech Alliance',
    description: "The Freedom in Tech Alliance was founded in 2018 with the ultimate goal of shaping the culture shared by entrepreneurs, founders, and those working in the technology industry in such a way that ensures the maximum benefit to the people around the world.",
  },
  {
    categoryID: 71,
    title: 'The Bigger Pie',
    description: "The Bigger Pie has a thriving and active global community whose members share their experience and learn from each other. The community is open to women and gender minorities interested in blockchain, crypto, DeFi and emerging tech. Its purpose is to connect and support the incredible women who are already in the space, shine a light on the work they do to highlight these role models.",
  },
  {
    categoryID: 72,
    title: '1Hive',
    description: "1Hive is a DAO that issues and distributes a digital currency called Honey. Honey holders stake on proposals using Conviction Voting to determine how issuance is distributed. By supporting proposals which increase the value of Honey, a positive feedback loop drives growth and sustainability.",
  },
  {
    categoryID: 73,
    title: 'Breadchain Cooperative',
    description: "Breadchain is a cooperative of blockchain projects working to advance a progressive vision for the technology and its effect on society.",
  },
  {
    categoryID: 74,
    title: 'ArtFan',
    description: "An Interactive Art Marketplace and Virtual Gallery making more art more accessible to more people by giving artists emerging, digital tools and technologies.",
  },
  {
    categoryID: 75,
    title: 'Microsolidarity',
    description: "Microsolidarity is a community-building methodology supporting people to find belonging & meaningful work. We're a network of practitioners creating small mutual aid communities where people can do a kind of personal development, in good company, for social benefit. In the past year, about 200 practitioners have been trained in this methodology, and we're having our first physical gatherings in Europe & the US in 2022.",
  },
  {
    categoryID: 76,
    title: 'Humanetics Workshop',
    description: "The Proof of Personhood field is still small enough that most members can be gathered in one room. We think this offers a unique opportunity for knowledge exchange, risk mitigation, and cross-collaboration. The Humanetics Workshop is a group that aspires to execute on this opportunity. Our aim is to create a common channel that creates spaces for important ideas to be discussed, new connections to be made, and, above all, ignite a collaborative atmosphere in our emerging field.",
  },
  {
    categoryID: 77,
    title: 'Geo Web',
    description: "The Geo Web is a set of open protocols for anchoring digital content to physical locations. It uses a partial common ownership property rights system to administer its digital land market and create a positive feedback loop for public goods funding.",
  },
  {
    categoryID: 78,
    title: 'GenerousAF Foundation',
    description: "Our mission is to lead the next generation of Social Philanthropy, through connecting donors to STEAM initiatives and community programs that improve the local economy. We connect local groups to develop educational workshops and we give micro-grants to support community-driven initiatives.",
  },
  {
    categoryID: 79,
    title: 'Socialstack',
    description: "Socialstack is a Web3 platform empowering and rewarding communities to collaborate towards a common good.",
  },
  {
    categoryID: 80,
    title: 'Delicious Democracy',
    description: "Delicious Democracy is a Washington, DC-based collective that intersects culture, politics, & tech to build community power.",
  },
  {
    categoryID: 81,
    title: 'Akorn',
    description: "Akorn is a global community-driven marketplace for regenerative projects.",
  },
  {
    categoryID: 82,
    title: 'PizzaDAO',
    description: "PizzaDAO formed to promote pizza in all forms. That means we're a pizza-focused community that operates with transparency and communal governance over its treasury. The proceeds from the sale of our pizza NFTs are used to buy pizza for people all over the world on Bitcoin Pizza Day, 5/22.",
  },
  {
    categoryID: 83,
    title: 'AYOWECCA Uganda',
    description: "AYOWECCA UGANDA is s a community founded non governmental organization in Uganda East Africa, working on environment and social development.",
  },

];

const EMPTY_PERCENTAGES = {};
categories.forEach(x => EMPTY_PERCENTAGES[x.categoryID] = '');

const stakingResults = {
  "7": {
    "id": 7,
    "name": "Hashing it Out",
    "weight": "998135.607284484001121676"
  },
  "8": {
    "id": 8,
    "name": "Commons Stack",
    "weight": "1614724.480734485524711812"
  },
  "9": {
    "id": 9,
    "name": "DAppNode",
    "weight": "1130831.15260769382757"
  },
  "10": {
    "id": 10,
    "name": "MetaCartel",
    "weight": "19250.765954436254039283"
  },
  "11": {
    "id": 11,
    "name": "DXdao",
    "weight": "170234.927489139877424239"
  },
  "12": {
    "id": 12,
    "name": "Meta Gamma Delta",
    "weight": "182049.031476323352118125"
  },
  "13": {
    "id": 13,
    "name": "KERNEL",
    "weight": "226321.678977229389018165"
  },
  "14": {
    "id": 14,
    "name": "future modern",
    "weight": "49750.091935098916767228"
  },
  "15": {
    "id": 15,
    "name": "SheFi",
    "weight": "0.0"
  },
  "16": {
    "id": 16,
    "name": "DePo DAO",
    "weight": "754.292167926103981482"
  },
  "17": {
    "id": 17,
    "name": "WhalerDAO",
    "weight": "1688.157552894125958431"
  },
  "18": {
    "id": 18,
    "name": "Matic Mitra",
    "weight": "21236.874020705358893968"
  },
  "19": {
    "id": 19,
    "name": "FightPandemics",
    "weight": "65413.278016215389041007"
  },
  "20": {
    "id": 20,
    "name": "lab10 collective",
    "weight": "300.0"
  },
  "21": {
    "id": 21,
    "name": "DeFi Safety",
    "weight": "10596.557214579855715582"
  },
  "22": {
    "id": 22,
    "name": "Web3Bridge",
    "weight": "12019.327400692007338869"
  },
  "23": {
    "id": 23,
    "name": "Mol LeArt",
    "weight": "23861.7557617"
  },
  "24": {
    "id": 24,
    "name": "Rotki",
    "weight": "65080.640261548999961134"
  },
  "25": {
    "id": 25,
    "name": "BrightID",
    "weight": "402439.598610556490447487"
  },
  "26": {
    "id": 26,
    "name": "Ethereum France",
    "weight": "338.48480753"
  },
  "27": {
    "id": 27,
    "name": "Abridged",
    "weight": "0.0"
  },
  "28": {
    "id": 28,
    "name": "NFThub",
    "weight": "56348.048014354595308547"
  },
  "29": {
    "id": 29,
    "name": "MetaGame",
    "weight": "42492.104772816061405369"
  },
  "30": {
    "id": 30,
    "name": "MetaSpace",
    "weight": "174603.416819000000720896"
  },
  "31": {
    "id": 31,
    "name": "Trips Community",
    "weight": "20346.821375212701851097"
  },
  "32": {
    "id": 32,
    "name": "Upala",
    "weight": "26644.920268292268860635"
  },
  "33": {
    "id": 33,
    "name": "Bloom Network",
    "weight": "40516.075949150232809302"
  },
  "34": {
    "id": 34,
    "name": "Handshake Development Fund",
    "weight": "173945.235892972808025321"
  },
  "35": {
    "id": 35,
    "name": "LexDAO",
    "weight": "12083.812495"
  },
  "36": {
    "id": 36,
    "name": "Grassroots Economics",
    "weight": "78792.070002027795653063"
  },
  "37": {
    "id": 37,
    "name": "Circles UBI",
    "weight": "171990.712330683031708739"
  },
  "38": {
    "id": 38,
    "name": "Giveth",
    "weight": "339462.949364537005156103"
  },
  "39": {
    "id": 39,
    "name": "Women of Crypto Art",
    "weight": "137594.138991229960280401"
  },
  "40": {
    "id": 40,
    "name": "Dandelion Collective",
    "weight": "430225.564957639515358623"
  },
  "41": {
    "id": 41,
    "name": "Shenanigan",
    "weight": "27204.621743657761013532"
  },
  "42": {
    "id": 42,
    "name": "Peoples' Cooperative",
    "weight": "83224.014919320126580928"
  },
  "43": {
    "id": 43,
    "name": "Marma J Foundation",
    "weight": "6802.517435773600551648"
  },
  "44": {
    "id": 44,
    "name": "Pool-Party",
    "weight": "85694.320975933165781328"
  },
  "45": {
    "id": 45,
    "name": "PrimeDAO",
    "weight": "2942.27292462"
  },
  "46": {
    "id": 46,
    "name": "Senary Commonwealth",
    "weight": "0.0"
  },
  "47": {
    "id": 47,
    "name": "Kolektivo Labs",
    "weight": "13248.6245461"
  },
  "48": {
    "id": 48,
    "name": "Austin Meetups Fund",
    "weight": "112026.078367567031068664"
  },
  "49": {
    "id": 49,
    "name": "DoinGud",
    "weight": "95219.094343"
  },
  "50": {
    "id": 50,
    "name": "Gitcoin",
    "weight": "459363.940278535309067262"
  },
  "51": {
    "id": 51,
    "name": "RaidGuild",
    "weight": "26525.88181287895322193"
  },
  "52": {
    "id": 52,
    "name": "DAOhaus",
    "weight": "5998.341120198206584212"
  },
  "53": {
    "id": 53,
    "name": "Blockchain Education Network",
    "weight": "25620.077311343422299589"
  },
  "54": {
    "id": 54,
    "name": "DAOSquare",
    "weight": "115080.566073067559830054"
  },
  "55": {
    "id": 55,
    "name": "MyCrypto",
    "weight": "10451.2085"
  },
  "56": {
    "id": 56,
    "name": "nfDAO",
    "weight": "13476.811414214248679964"
  },
  "57": {
    "id": 57,
    "name": "Njombe Innovation Academy",
    "weight": "9011.093895730444370406"
  },
  "58": {
    "id": 58,
    "name": "ThinkBetter",
    "weight": "0.0"
  },
  "59": {
    "id": 59,
    "name": "Guerrilla Music",
    "weight": "2638.964242279194460941"
  },
  "60": {
    "id": 60,
    "name": "Akasha Hub Barcelona",
    "weight": "1595.17"
  },
  "61": {
    "id": 61,
    "name": "ethers.js",
    "weight": "26589.1377428452605"
  },
  "62": {
    "id": 62,
    "name": "rekt.news",
    "weight": "6592.47423"
  },
  "63": {
    "id": 63,
    "name": "Umbra",
    "weight": "1731.7665"
  },
  "64": {
    "id": 64,
    "name": "Civichub",
    "weight": "498.2"
  },
  "65": {
    "id": 65,
    "name": "Web3 Designers",
    "weight": "15873.29115"
  },
  "66": {
    "id": 66,
    "name": "Jovian Network",
    "weight": "49151.936080707197402188"
  },
  "67": {
    "id": 67,
    "name": "IRL Art",
    "weight": "5044.22475447746606094"
  },
  "68": {
    "id": 68,
    "name": "Crypto Kids Camp",
    "weight": "0.0"
  },
  "69": {
    "id": 69,
    "name": "MANA VOX",
    "weight": "9753.476946132001074161"
  },
  "70": {
    "id": 70,
    "name": "Freedom in Tech Alliance",
    "weight": "0.0"
  },
  "71": {
    "id": 71,
    "name": "The Bigger Pie",
    "weight": "0.0"
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

const pollID = '9';
const snapshotsBeginOn = 'January 14';
const tokensReleasedOn = 'January 28';
const stakingTotalsUpdated = 'January 10';
const leagueBudget = 1157921.58;

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
                href="https://app.uniswap.org/#/swap?outputCurrency=0xd56dac73a4d6766464b38ec6d91eb45ce7457c44&use=V2"
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
                The staked token amounts will be used for Panvala's next quarter of endowment distributions
                beginning on {tokensReleasedOn}. The total matching budget for all communities is {utils.commify(leagueBudget)} PAN.
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
                href="https://app.uniswap.org/#/swap?outputCurrency=0xd56dac73a4d6766464b38ec6d91eb45ce7457c44&use=V2"
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
                href="https://app.uniswap.org/#/swap?outputCurrency=0xd56dac73a4d6766464b38ec6d91eb45ce7457c44&use=V2"
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
                  Stake your PAN tokens to increase your community's donation matching multiplier. The Panvala League's
                  goal is for communities to own the same share of Panvala as the share of the budget they want to receive,
                  so we reward them for it with a higher matching multiplier until they max out.
                </Box>
                <Box my={1} className="w-80 center tc lh-copy">
                  If you do not currently have a PAN balance but want to stake, or you would
                  like to increase your stake, you can do so via Uniswap. Daily staking snapshots begin on <b>{snapshotsBeginOn}</b>.
                  <Box flex justifyContent="center" my={3}>
                    <a
                      href="https://app.uniswap.org/#/swap?outputCurrency=0xd56dac73a4d6766464b38ec6d91eb45ce7457c44&use=V2"
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
                              <div className="b ttu f6 o-50">% of Total</div>
                              <div>{percentageStaked.toFixed(2)}%</div>
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
