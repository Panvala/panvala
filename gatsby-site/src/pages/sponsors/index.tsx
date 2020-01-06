import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';

import Layout from '../../components/Layout';
import SEO from '../../components/seo';
import Nav from '../../components/Nav';
import Box from '../../components/system/Box';
import FieldText from '../../components/FieldText';
import { SponsorsHeader } from '../../components/Sponsors';

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

      <Box mt="-5vw" className="bottom-clip-up relative z-3" bg="white" height="520px">
        <Box textAlign="center" bold fontSize={5} mt={6}>
          Meet our Sponsors
        </Box>
      </Box>

      <Box
        mt="-5vw"
        className="bottom-clip-up relative z-2"
        bg="#F3F4F8"
        height={['1000px', '1000px', '700px']}
      >
        <Box p={'10vw'} flex flexWrap="wrap" justifyContent={['center', 'center', 'space-between']}>
          <Box bold maxWidth="250px" fontSize={5} mb={4}>
            MORE STUFF
          </Box>
        </Box>
      </Box>

      <Box mt="-5vw" className="bottom-clip-down relative z-2" bg="white" height="740px">
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
      </Box>

      {/* <Box mt="-5vw" className="relative" bg="grey" height="240px">
        <h2 className="f2-5 ma0 tc w-50-l center">Become a Sponsor</h2>
        <Box>
          Want your business to earn support from the Ethereum community? Submit your information
          and we'll help you become a Panvala sponsor.
        </Box>
      </Box> */}

      <section id="team-contact" className="bg-gray pv6 top-clip-down">
        <div className="w-50-l w-70-m w-90 center tc">
          <h2 className="f2-5 ma0 mb3 mt3 lh-copy">Become a Sponsor</h2>
          <p className="ma0 f6 lh-text mb3">
            Want your business to earn support from the Ethereum community? Submit your information
            and we'll help you become a Panvala sponsor.
          </p>
          <Formik
            initialValues={{ fullName: '', email: '', message: '' }}
            onSubmit={handleSubmit}
            validationSchema={ContactFormSchema}
          >
            {props => (
              <form
                className="w-70-l w-90-m w-100 center"
                name="team-contact"
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
                  id="team-contact-button"
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
