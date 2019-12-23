import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Box from '../../components/system/Box';

const Fundraisers = (props) => {
  console.log("/fundraisers props:", props);
  // const data = useStaticQuery(
  //   graphql`
  //     query {
  //       allFundraisersJson {
  //         edges {
  //           node {
  //             id
  //             firstName
  //             lastName
  //             story
  //             teamInfo
  //           }
  //         }
  //       }
  //     }
  //   `
  // );
  // console.log('data:', data.allFundraisersJson);
  return (
    <div>
      <Box>fundraisers</Box>
    </div>
  );
};

export default Fundraisers;
