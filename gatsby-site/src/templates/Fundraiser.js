import React from 'react';
import SEO from '../components/seo';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import {
  FundraiserProfile,
  FundraiserHeader,
  FundraiserOverview,
  FundraiserForm,
  FunderBoard,
} from '../components/Fundraiser';
import Box from '../components/system/Box';

const Fundraiser = props => {
  console.log('Fundraiser props:', props);

  const profileInfo = props.pageContext;

  return (
    <Layout>
      <SEO title="Fundraiser" />

      <FundraiserHeader />

      <Box mt="-5vw" className="bottom-clip-down relative z-3" bg="white" height="1000px">
        <Box flex>
          <FundraiserProfile {...profileInfo} />
          <FunderBoard />
        </Box>
      </Box>

      <FundraiserOverview />

      <Box mt="-5vw" className="relative z-2" height="1000px">
        <Box p={'10vw'}>
          <FundraiserForm />
        </Box>
      </Box>
    </Layout>
  );
};

// This populates the `data` prop

// import { graphql } from 'gatsby';

// export const query = graphql`
//   query($id: String) {
//     fundraisersJson(id: { eq: $id }) {
//       id
//       firstName
//       lastName
//       story
//       teamInfo
//     }
//   }
// `;

export default Fundraiser;
