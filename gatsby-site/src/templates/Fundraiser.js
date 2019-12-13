import React from 'react';
import Box from '../components/system/Box';
import SEO from '../components/seo';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import FundraiserHeader from '../components/FundraiserHeader';
import SponsorshipForm from '../components/SponsorshipForm';
import vivekS from '../img/fundraisers/vivek.png';
import copySvg from '../img/copy.svg';

function copyT() {
  var copyText = document.querySelector('#input-copy');
  copyText.select();
  document.execCommand('copy');

  console.log('copyText:', copyText);
}

export const ProfileCopy = ({ firstName, lastName, story, teamInfo }) => (
  <>
    <Box flex column maxWidth={'500px'}>
      <Box fontSize={4} bold mb={4}>
        {`${firstName} ${lastName}`}
      </Box>
      <Box bold mb={4}>
        {story}
      </Box>
      <Box>{teamInfo}</Box>
    </Box>
  </>
);

export function ProfileLink() {
  const link = 'https://link.io';
  return (
    <>
      <input readOnly id="input-copy" value={link} />
      <img src={copySvg} onClick={copyT} />
    </>
  );
}

export function FundraiserProfile(props) {
  return (
    <Box mt="-5vw" className="bottom-clip-down relative z-3" bg="white" height="1000px">
      <Box p={'10vw'} flex column>
        <Box>
          <img src={vivekS} />
        </Box>
        <ProfileCopy {...props} />
      </Box>

      <ProfileLink />
    </Box>
  );
}

export function FundraiserForm() {
  return (
    <Box mt="-5vw" className="relative z-2" bg="#F3F4F8" height="1000px">
      {/* Main Section */}
      <Box p={'10vw'}>
        <SponsorshipForm />
      </Box>
    </Box>
  );
}

const Fundraiser = props => {
  console.log('Fundraiser props:', props);

  const { firstName, lastName, teamInfo, story } = props.pageContext;

  return (
    <Layout>
      <SEO title="Fundraiser" />

      <FundraiserHeader />

      <FundraiserProfile
        firstName={firstName}
        lastName={lastName}
        story={story}
        teamInfo={teamInfo}
      />

      <FundraiserForm />

      <Footer />
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
