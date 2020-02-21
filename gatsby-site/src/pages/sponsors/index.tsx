import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';

import Layout from '../../components/Layout';
import SEO from '../../components/seo';
import Box from '../../components/system/Box';
import FieldText from '../../components/FieldText';
import { SponsorsHeader } from '../../components/Sponsors';
import helium from '../../img/sponsors/helium.png';
import mythx from '../../img/sponsors/mythx.png';
import unstoppableDomains from '../../img/sponsors/unstoppable-domains.png';
import Modal from '../../components/Modal';

const ContactFormSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required('Please enter your full name'),
  email: yup
    .string()
    .trim()
    .email()
    .required('Please enter your email'),
  message: yup
    .string()
    .trim()
    .required('Please include a message')
    .min(10, 'Your message must be at least 10 characters'),
});

const Sponsors = () => {
  const [isOpen, setModalOpen] = useState(false);

  function handleSubmit(values, actions) {
    // console.log('submit', values);
    setModalOpen(true);
    actions.setSubmitting(false);

    actions.resetForm();
  }

  function handleClose(e) {
    e.preventDefault();
    setModalOpen(false);
  }

  return (
    <Layout>
      <SEO title="Sponsorships" />

      <SponsorsHeader />

      <Box className="bottom-clip-up relative z-3 pv6-ns pv4" bg="white">
        <section className="flex flex-wrap">
          <Box className="w-50-ns w-100" bold fontSize={4} textAlign="center">
            Silver - $15,000/year
          </Box>
          <Box className="w-50-ns w-100 pa3">
            <Box mb={4}>
              <a href="https://unstoppabledomains.com/">
                <img src={unstoppableDomains} />
              </a>
            </Box>
            <Box maxWidth="365px" lineHeight="1.7">
              With Unstoppable Domains, you can replace cryptocurrency addresses with a human
              readable name or launch uncensorable websites. Use your .crypto domain on any
              blockchain.
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
            Base - $7,500/year
          </Box>
          <Box className="w-50-ns w-100 pa3">
            <Box mb={4}>
              <a href="https://bit.ly/panvala-helium">
                <img src={helium} />
              </a>
            </Box>
            <Box maxWidth="365px" lineHeight="1.7">
              With a Helium Hotspot, anyone can earn cryptocurrency by building a wireless network
              in their city and creating a more connected future.
            </Box>
            <Box my={4} ml={'-20px'}>
              <a href="https://mythx.io/">
                <img src={mythx} />
              </a>
            </Box>
            <Box maxWidth="365px" lineHeight="1.7">
              MythX is the premier security analysis service for Ethereum smart contracts. Their
              mission is to ensure development teams avoid costly errors and make Ethereum a more
              secure and trustworthy platform.
            </Box>
          </Box>
        </section>
      </Box>

      {/* <Box mt="-5vw" className="bottom-clip-down relative z-2" bg="white" height="740px">
        <Box textAlign="center" bold fontSize={5} mt={6}>
          Sponsorship Levels
        </Box>

        <Box flex justifyContent="center" mt={5}>
          <LevelCard mr={4}>
            <Box>Base - $7500</Box>
            <Box>Includes:</Box>
            <Box>
              • “Founding Sponsor” status for sponsors who commit before Jan 1 • Active loyalty from
              the Panvala community • Tiered logo placement on website • Social Media and Newslatter
              mentions quarterly
            </Box>
          </LevelCard>
          <LevelCard>
            <Box>Base - $7500</Box>
            <Box>Includes:</Box>
            <Box>
              • “Founding Sponsor” status for sponsors who commit before Jan 1 • Active loyalty from
              the Panvala community • Tiered logo placement on website • Social Media and Newslatter
              mentions quarterly
            </Box>
          </LevelCard>
        </Box>
      </Box> */}

      <Box mt="-5vw">
        <section id="sponsors-contact" className="bg-gray pv6 top-clip-down">
          <div className="w-50-l w-70-m w-90 center tc">
            <h2 className="f2-5 ma0 mb3 mt3 lh-copy">Become a Sponsor</h2>
            <p className="ma0 f6 lh-text mb3">
              Want your business to earn support from the Ethereum community? Submit your
              information and we'll help you become a Panvala sponsor.
            </p>
            <Formik
              initialValues={{ fullName: '', email: '', message: '' }}
              onSubmit={handleSubmit}
              validationSchema={ContactFormSchema}
            >
              {props => (
                <form
                  className="w-70-l w-90-m w-100 center"
                  name="sponsors-contact"
                  onSubmit={props.handleSubmit}
                >
                  <FieldText
                    type="text"
                    id="contact-full-name"
                    name="fullName"
                    label="Full Name"
                    placeholder="Enter your full name"
                    onChange={props.handleChange}
                    required
                  />

                  <FieldText
                    type="email"
                    id="contact-email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email address"
                    onChange={props.handleChange}
                    required
                  />

                  <FieldText
                    component="textarea"
                    name="message"
                    id="contact-message"
                    label="Message"
                    rows="5"
                    placeholder="Let us know what you would like to chat about"
                    onChange={props.handleChange}
                    required
                  />

                  <input
                    id="sponsors-contact-button"
                    type="submit"
                    name="submit"
                    className="f6 link dim bn br-pill pv3 ph4 white bg-teal fw7 mt4 tj"
                    value="Get in touch"
                    disabled={props.isSubmitting}
                  />
                </form>
              )}
            </Formik>
          </div>
        </section>
      </Box>

      {/* <!-- Modal --> */}
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        title="Form Submitted"
        copy="Thank you. We'll be in touch!"
      />
    </Layout>
  );
};

const LevelCard = styled(Box)`
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  width: 408px;
  padding: 1rem;
`;

export default Sponsors;
