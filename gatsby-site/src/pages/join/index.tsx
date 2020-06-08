import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';

import Button from '../../components/Button';
import Layout from '../../components/Layout';
import Nav from '../../components/Nav';
import SEO from '../../components/seo';
import Box from '../../components/system/Box';


const Join = () => {

  return (
    <Layout>
      <SEO title="Join" />

      <section className="bg-gradient bottom-clip-hero pb5">
        <Nav />
        {/* <!-- Hero --> */}
        <div className="w-70-l w-80-m w-90 center tc pv5">
          <h1 className="white f1-5 b ma0 mb4 w-80-l w-100 center">Join Panvala</h1>
          <p className="white-60 f5 fw4 lh-copy ma0 mb5 w-50-l w-100 center">
            Panvala is run by our grantees and people like you. When you hold PAN tokens,
            you get to influence Panvala's grants each quarter.
          </p>
        </div>
      </section>

      <Box className="bottom-clip-down relative z-3 pv4" bg="white">
        <section className="flex flex-wrap">
          <Box className="w-50-ns w-100" bold fontSize={4} textAlign="center">
            Step 1: Get Tokens
          </Box>
          <Box className="w-50-ns w-100 pa3">
            <Box maxWidth="365px" lineHeight="1.7">
              In order to influence Panvala's grants each quarter, you need to have PAN tokens.
              <Box flex justifyContent="center" className="mv4">
                <a
                  href="https://uniswap.exchange?outputCurrency=0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link b dim blue"
                >
                  <Button p={3} mr={3} text="Get PAN Tokens" bg="#F5F6F9" color="black" />
                </a>
              </Box>
            </Box>
          </Box>
        </section>
      </Box>

      <Box
        mt="-5vw"
        className="bottom-clip-down relative z-2 pv6-ns pv4"
        bg="#F3F4F8"
      >
        {/* <Box bold maxWidth="250px" fontSize={5} mb={4}>
            MORE STUFF
          </Box> */}
        <section className="flex flex-wrap">
          <Box className="w-50-ns w-100" bold fontSize={4} textAlign="center">
            Step 2: Stake Tokens
          </Box>
          <Box className="w-50-ns w-100 pa3">
            <Box maxWidth="365px" lineHeight="1.7">
              Panvala's communities earn a matching budget based on the donations they raise,
              but their matching is constrained by the community's share of the staked tokens.
              To increase the amount of donations that your community can match, stake more PAN
              tokens in your community's staking cluster.
              <Box flex justifyContent="center" className="mv4">
                <a
                  href="/staking"
                  className="link b dim blue"
                >
                  <Button p={3} mr={3} text="Stake Tokens" bg="white" color="black" />
                </a>
              </Box>
            </Box>
          </Box>
        </section>
      </Box>
      
      <Box mt="-5vw" className="pv6-ns pv4">
        <section className="flex flex-wrap">
          <Box className="w-50-ns w-100" bold fontSize={4} textAlign="center">
            Step 3: Join the Caucus
          </Box>
          <Box className="w-50-ns w-100 pa3">
            <Box maxWidth="365px" lineHeight="1.7">
              Want to be even more involved? Join the Panvala Caucus! The Caucus is Panvala’s
              version of Ethereum’s Core Devs: we make recommendations that Panvala can accept or reject.
              We need all the help we can get from active PAN holders to help Panvala achieve its mission.
              <Box flex justifyContent="center" className="mv4">
                <a
                  href="mailto:caucus@panvala.com?subject=I%20want%20to%20join%20the%20Panvala%20Caucus!"
                  target="_blank"
                  className="link b dim blue"
                >
                  <Button p={3} mr={3} text="Email the Caucus" bg="#F5F6F9" color="black" />
                </a>
              </Box>
            </Box>
          </Box>
        </section>
      </Box>

      
    </Layout>
  );
};


export default Join;
