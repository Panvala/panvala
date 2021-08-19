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
            you get to influence Panvala's budget each quarter.
          </p>
        </div>
      </section>
      
      <div className="cf">
        <section className="fl w-50-l w-100 ph4">
            <h1 className="tc">Individuals</h1>
            <section className="flex flex-wrap">
              <Box className="w-50-ns w-100" bold fontSize={4} textAlign="center">
                Step 1: Get Tokens
              </Box>
              <Box className="w-50-ns w-100 pa3">
                <Box maxWidth="365px" lineHeight="1.7">
                  In order to influence Panvala's budget each quarter, you need to have PAN tokens.
                  <Box flex justifyContent="center" className="mv4">
                    <a
                      href="https://app.uniswap.org/#/swap?outputCurrency=0xd56dac73a4d6766464b38ec6d91eb45ce7457c44"
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

            <section className="flex flex-wrap">
              <Box className="w-50-ns w-100" bold fontSize={4} textAlign="center">
                Step 2: Get Connected
              </Box>
              <Box className="w-50-ns w-100 pa3">
                <Box maxWidth="365px" lineHeight="1.7">
                  The best way to keep up to date with Panvala is to follow us on Twitter! We also post to the
                  Token Holders Association (THA) forum with more detailed updates for the community to discuss.
                  <Box flex justifyContent="center" className="mv4">
                    <a
                      href="https://twitter.com/PanvalaHQ"
                      className="link b dim blue"
                    >
                      <Button p={3} mr={3} text="Follow @PanvalaHQ" bg="#F5F6F9" color="black" />
                    </a>
                  </Box>
                  <Box flex justifyContent="center" className="mv4">
                    <a
                      href="https://tha.panvala.com"
                      className="link b dim blue"
                    >
                      <Button p={3} mr={3} text="Sign Up for the Forum" bg="#F5F6F9" color="black" />
                    </a>
                  </Box>
                </Box>
              </Box>
            </section>

            <section className="flex flex-wrap">
              <Box className="w-50-ns w-100" bold fontSize={4} textAlign="center">
                Step 3: Join the Token Holders Association
              </Box>
              <Box className="w-50-ns w-100 pa3">
                <Box maxWidth="365px" lineHeight="1.7">
                  Want to be even more involved? Join the Panvala Token Holders Association (THA)! The THA is where
                  individual token holders come together to make Panvala succeed.
                  We need all the help we can get from active PAN holders to help Panvala achieve its mission.
                  <Box flex justifyContent="center" className="mv4">
                    <a
                      href="https://tha.panvala.com/"
                      target="_blank"
                      className="link b dim blue"
                    >
                      <Button p={3} mr={3} text="Join the THA" bg="#F5F6F9" color="black" />
                    </a>
                  </Box>
                </Box>
              </Box>
            </section>
        </section>
        
        <section className="fl w-50-l w-100 ph4">
            <h1 className="tc">Communities</h1>
            <section className="flex flex-wrap">
              <Box className="w-50-ns w-100" bold fontSize={4} textAlign="center">
                Step 1: Join the Panvala League
              </Box>
              <Box className="w-50-ns w-100 pa3">
                <Box maxWidth="365px" lineHeight="1.7">
                  Communities in the Panvala League stake PAN tokens to earn donation matching capacity from Panvala's inflation.
                  The existing communities in the League have a strong influence over which communities to add to the League.
                  <Box flex justifyContent="center" className="mv4">
                    <a
                      href="mailto:membership@panvala.com?subject=We want to join the Panvala League!"
                      target="_blank"
                      className="link b dim blue"
                    >
                      <Button p={3} mr={3} text="Apply to Join" bg="#F5F6F9" color="black" />
                    </a>
                  </Box>
                </Box>
              </Box>
            </section>

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
                      <Button p={3} mr={3} text="Stake Tokens" bg="#F5F6F9" color="black" />
                    </a>
                  </Box>
                </Box>
              </Box>
            </section>
          
        </section>
      </div>

      
    </Layout>
  );
};


export default Join;
